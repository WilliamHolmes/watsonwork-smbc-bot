const _ = require('underscore');
const del = require('delete');
// const fetch = require('node-fetch');

const fs = require('fs');
const request = require('request');

const appFramework = require('watsonworkspace-bot');
appFramework.level('verbose');
appFramework.startServer();
const app = appFramework.create();

const UI = require('watsonworkspace-sdk').UI;


app.authenticate().then(() => app.uploadPhoto('./appicon.jpg'));

app.on('message-created', message => {
});

app.on('actionSelected', (message, annotation) => {
});
