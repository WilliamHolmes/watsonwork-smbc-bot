const _ = require('underscore');
// const del = require('delete');
const scrape = require('html-metadata');

// const fs = require('fs');
// const request = require('request');

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
        scrape(url, (err, data) => console.log('IMAGE', err, data));
    });
});

// app.on('actionSelected', (message, annotation) => {
// });
