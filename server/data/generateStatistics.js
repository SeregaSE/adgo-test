const browsers = require('./browsers');
const { URLSearchParams } = require('url');
const groups = require('./groups');
const operatingSystems = require('./operatingSystems');
const platforms = require('./platforms');
const random = require('../util/random');

const DAY_DURATION_MILLISECONDS = 86400 * 1000;
/* YYYY-MM-DD string to date object */
isDate = value => {
    if (value instanceof Date) {
        return;
    }
    
    throw new Error(`from and to params are required`);
}
/* YYYY-MM-DD string to date object */
toDate = value => new Date(value);
/* Array of strings to array of ints */
toInt = value => parseInt(value, 10);
toIntArray = value => value.map(toInt);

const filters = [
    {
        name: 'from',
        converter: toDate,
        validator: isDate,
    },
    {
        name: 'to',
        converter: toDate,
        validator: isDate,
    },
    {
        name: 'groupBy',
        validator: value => {
            if (groups.some(group => group.value === value)) {
                return;
            }
            
            throw new Error(`groupBy param is not valid or not specified`);
        },
    },
    {
        name: 'platform',
        converter: toInt,
        default: null,
    },
    {
        name: 'browsers[]',
        converter: toIntArray,
        default: [],
    },
    {
        name: 'operatingSystems[]',
        converter: toIntArray,
        default: [],
    },
    {
        name: 'limit',
        converter: toInt,
        default: 25,

    },
    {
        name: 'offset',
        converter: toInt,
        default: 0,
    },
];

const formatDay = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
}
const applyFilter = (statistics, filter) => {
    const { groupBy, platform, browsers, operatingSystems, limit, offset } = filter

    const filtered = statistics.reduce((acc, event) => {
        const group = groupBy === 'day' ? event[groupBy] : event[groupBy].label;

        if (platform && event.platform.value !== platform) {
            return acc;
        }

        if (browsers.length && !browsers.some(id => event.browser.value === id)) {
            return acc;
        }

        if (operatingSystems.length && !operatingSystems.some(id => event.operatingSystem.value === id)) {
            return acc;
        }

        return {
            ...acc,
            [group]: {
                [groupBy]: group,
                impressions: acc[group] && acc[group].impressions ? acc[group].impressions + 1 : 1,
                clicks: acc[group] && acc[group].clicks ? acc[group].clicks + event.click : event.click ? 1 : 0,
                money: acc[group] && acc[group].money ? acc[group].money + event.money : event.money,
            }
        }
    }, {});

    const rows = Object.keys(filtered).reduce((acc, row) => [
        ...acc,
        filtered[row],
    ], []);

    return {
        count: rows.length,
        rows: (limit !== null && offset !== null) ? rows.slice(offset * limit, offset * limit + limit) : rows,
        total: rows.reduce((acc, row) => ({
            impressions: acc.impressions + row.impressions,
            clicks: acc.clicks + row.clicks,
            money: acc.money + row.money,
        }), {
            impressions: 0,
            clicks: 0,
            money: 0,
        }),
    }
};

const cache = {};

const generateStatistics = url => {
    const params = new URLSearchParams(url.query);

    const query = filters.reduce((acc, { name, converter, default: defaultValue, validator }) => {
        const multi = name.slice(-2) === '[]';
        let value = params[multi ? 'getAll' : 'get'].call(params, name);

        if ((value === null || value === undefined) && defaultValue !== undefined) {
            value = defaultValue;
        }

        if (typeof converter === 'function') {
            value = converter(value);
        }

        if (typeof validator === 'function') {
            validator(value);
        }
   
        return {
            ...acc,
            [multi ? name.slice(0, -2) : name]: value,
        }
    }, {});

    const days = Math.floor((query.to.getTime() - query.from.getTime()) / DAY_DURATION_MILLISECONDS);
    const cacheKey = query.to.getTime() + query.from.getTime();

    if (days < 0) {
        throw new Error('Date from must be before date to');
    }

    if (days > 365) {
        throw new Error('Maximum period must be less than 365 days');
    }

    if (cache[cacheKey]) {
        return applyFilter(cache[cacheKey], query);
    }

    const statistics = [];
    let day = query.from;

    for (let i = 0; i <= days; i++) {
        for (let j = 0; j < random(10, 100); j++) {
            const platformId = random(1, 4) > 3 ? 1 : 2;

            let browserId;
            let operatingSystemsId;
    
            // If platform === desktop
            if (platformId === 1) {
                browserId = random(1, 4);
                operatingSystemsId = random(1, 3);
            } else {
                browserId = random(5, 9);
                operatingSystemsId = random(4, 5);
            }
    
            const click = random(1, 10) > 8;

            statistics.push({
                day: formatDay(day),
                click: click,
                platform: platforms.find(item => item.value === platformId),
                browser: browsers.find(item => item.value === browserId),
                operatingSystem: operatingSystems.find(item => item.value === operatingSystemsId),
                money: click ? (random(100, 10000) / 100000) : 0,
            });
        }

        day = new Date(day.getTime() + DAY_DURATION_MILLISECONDS);
    }

    cache[cacheKey] = statistics;
    return applyFilter(statistics, query);
};

// /api/v1/statistics?groupBy=day&from=2019-07-10&to=2019-07-15
// /api/v1/statistics?groupBy=day&from=2019-07-10&to=2019-07-15&browsers[]=1&browsers[]=3
module.exports = generateStatistics;
