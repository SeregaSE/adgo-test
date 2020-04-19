import axios from 'axios';

const url = 'http://localhost:3000/api/v1/';

export const fetchData = async (type) => {
    let changeableUrl = url;

    if (type) {
        changeableUrl = `${url}${type}`;
    }

    try {
        const response = await axios.get(changeableUrl);

        return response;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

export const fetchStatistics = async (query) => {
    let changeableUrl = `${url}statistics?`;

    if (query) {
        changeableUrl = `${url}statistics?${query}`;
    }

    try {
        const response = await axios.get(changeableUrl);

        return response;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

export const transformStateIntoQuery = ({
    groupBy,
    from,
    to,
    platform,
    browsers,
    operatingSystems,
    limit,
    page
}) => {
    let modifiedState = {
        groupBy: groupBy,
        from: from,
        to: to,
        platform: platform,
        limit: limit,
        offset: page
    };

    const query = Object.entries(modifiedState).reduce(
        (a, [k, v]) => (v ? { ...a, [k]: v } : a),
        {}
    );

    const finalQuery = new URLSearchParams(query);

    operatingSystems.length &&
        operatingSystems.map((i) => {
            finalQuery.append('operatingSystems[]', i);
        });

    browsers.length &&
        browsers.map((i) => {
            finalQuery.append('browsers[]', i);
        });

    return finalQuery.toString();
};
