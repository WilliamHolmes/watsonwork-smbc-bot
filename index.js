const _ = require('underscore');
// const del = require('delete');
const got = require('got');
const metascraper = require('metascraper');

// const fs = require('fs');
// const request = require('request');

const appFramework = require('watsonworkspace-bot');
appFramework.level('verbose');
appFramework.startServer();
const app = appFramework.create();

const UI = require('watsonworkspace-sdk').UI;


app.authenticate().then(() => app.uploadPhoto('./appicon.jpg'));

app.on('message-created', message => {
    const { content = '' } = message;
    _.each(content.match(constants.regex.SMBC), targetUrl => {
        const { body: html, url } = await got(targetUrl);
        const metadata = await metascraper({ html, url });
        const { image } = metadata;
        console.log('IMAGE', image);
    });
});

// app.on('actionSelected', (message, annotation) => {
// });
