const groups = require('./groups');
const browsers = require('./browsers');
const platforms = require('./platforms');
const operatingSystems = require('./operatingSystems');
const generateStatistics = require('./generateStatistics');

module.exports = {
    groups,
    browsers,
    platforms,
    'statistics': generateStatistics,
    'operating-systems': operatingSystems,
};
