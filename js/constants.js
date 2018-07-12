const _ = require('underscore');

const ID = _.now();

const constants = {
    ACTION_ID: `${ID}-smbc-share|`,
    COLOR_ERROR: '#516a92',
    regex: {
        SMBC: /(http|https):\/\/(www\.)?smbc-comics.com\/([0-9a-z][^\s]+)/gmi
    },
    TEMP_DIR: './temp_files',
    BUTTON_SHARE: 'Share With Space',
    NOT_FOUND: '404 - Comic Not Found',
    COMIC_SHARED: 'Shared With Space',
}

module.exports = constants;