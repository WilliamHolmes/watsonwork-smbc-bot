const _ = require('underscore');
const scrape = require('html-metadata');

const appFramework = require('watsonworkspace-bot');
appFramework.level('verbose');
appFramework.startServer();
const app = appFramework.create();

const UI = require('watsonworkspace-sdk').UI;

app.authenticate().then(() => app.uploadPhoto('./appicon.jpg'));

app.on('message-created', message => {
    console.log('message-created', message);
    const { content = '' } = message;
    _.each(content.match(constants.regex.SMBC), url => {
        console.log('URL', url);
        scrape(url).then(data => console.log('META', data));
    });
});
