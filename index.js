const _ = require('underscore');
const scrape = require('html-metadata');
const request = require('request');
const fs = require('fs');
const del = require('delete');
const feed = require('rss-to-json');

const appFramework = require('watsonworkspace-bot');
appFramework.level('verbose');
appFramework.startServer();
const app = appFramework.create();

const constants = require('./js/constants');
const strings = require('./js/strings');

const UI = require('watsonworkspace-sdk').UI;

app.authenticate().then(() => app.uploadPhoto('./appicon.jpg'));

const getName = url => _.last(url.split('/'));

const postComic =  ({ url }, spaceId) => {
    return scrape(url).then(data => {
        const { openGraph: { image: { url: img } } } = data;
        const dest = `${constants.TEMP_DIR}/${getName(img)}`;
        return new Promise((resolve, reject) => {
            request(img).pipe(fs.createWriteStream(dest)
            .on('error', reject)
            .on('finish', () => {
                app.sendFile(spaceId, dest);
                del.sync(dest, { force: true });
                resolve();
            })).on('error', reject);
        });
    });
}

const getCard = ({ title, created, description, url }) => {
    const cardTitle= strings.chompLeft(title, constants.TITLE);
    const cardBody = strings.between(description, constants.DESC_START, constants.DESC_END);
    const actionId = `${constants.ACTION_ID}${JSON.stringify({ url, title })}`;
    return UI.card(cardTitle, constants.SUB_TITLE, cardBody, [UI.cardButton(constants.BUTTON_SHARE, actionId)], created);
};

const getCards = ({ items }) => _.map(items, getCard);

const postCards = (message, annotation, data) => {
    app.sendTargetedMessage(message.userId, annotation, getCards(data));
};

const getFeed = () => {
    return new Promise((resolve, reject) => {
        feed.load(constants.FEED, (err, rss) => err ? reject(err) : resolve(rss));
    });
}

const postAnnotation = (message, annotation, title = '', description = '') => {
    app.sendTargetedMessage(message.userId, annotation, UI.generic(title, description));
}

const onComicError = (message, annotation, error) => {
    postAnnotation(message, annotation, constants.NOT_FOUND, error);
}

const onComicShared = (message, annotation, data) => {
    postAnnotation(message, annotation, `${data.title}`, constants.COMIC_SHARED);
}

app.on('message-created', message => {
    const { content = '', spaceId } = message;
    _.each(content.match(constants.regex.SMBC), url => postComic({ url }, spaceId));
});

app.on('actionSelected:/LATEST', (message, annotation) => {
    getFeed().then(data => postCards(message, annotation, data)).catch(error => onComicError(message, annotation, error))
});

app.on('actionSelected', (message, annotation) => {
    const { actionId = '' } = annotation;
    if (actionId.includes(constants.ACTION_ID)) {
        const data = JSON.parse(strings.chompLeft(actionId, constants.ACTION_ID));
        postComic(data, message.spaceId).then(() => onComicShared(message, annotation, data)).catch(error => onComicError(message, annotation, error));
    }
});
