const _ = require('underscore');

const ID = _.now();

const constants = {
    TITLE: 'Saturday Morning Breakfast Cereal - ',
    SUB_TITLE: 'smbc',
    ACTION_ID: `${ID}-smbc-share|`,
    COLOR_ERROR: '#516a92',
    FEED: 'https://www.smbc-comics.com/comic/rss',
    regex: {
        SMBC: /(http|https):\/\/(www\.)?smbc-comics.com\/([0-9a-z][^\s]+)/gmi,
        DESC: /<p>Hovertext:<br\/>(.*)<\/p>/gmi
    },
    TEMP_DIR: './temp_files',
    BUTTON_SHARE: 'Share With Space',
    NOT_FOUND: '404 - Comics Not Found',
    COMIC_SHARED: 'Shared With Space',
    DESC_START: 'Hovertext:<br/>',
    DESC_END: '</p>'
}

module.exports = constants;