import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@material-ui/core';
import { fetchStatistics, fetchData } from '../../api/';

const BottomFilters = ({ handleStateChange }) => {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedSystems, setSelectedSystems] = useState(null);
    const [selectedBrowsers, setSelectedBrowsers] = useState(null);
    const [platforms, setPlatforms] = useState([]);
    const [systems, setSystems] = useState([]);
    const [browsers, setBrowsers] = useState([]);

    const handlePlatformsSelectChange = (value) => {
        setSelectedPlatform(value);
        handleStateChange({ platform: value, page: 0 });
    };

    const handleSystemsSelectChange = (value) => {
        setSelectedSystems(value);
        handleStateChange({ operatingSystems: value, page: 0 });
    };

    const handleBrowsersSelectChange = (value) => {
        setSelectedBrowsers(value);
        handleStateChange({ browsers: value, page: 0 });
    };

    useEffect(() => {
        const fetchPlatforms = async (value) => {
            const { data } = await fetchData('platforms');
            setPlatforms(data);
        };

        const fetchOs = async () => {
            const { data } = await fetchData('operating-systems');
            setSystems(data);
        };

        const fetchBrowsers = async () => {
            const { data } = await fetchData('browsers');
            setBrowsers(data);
        };

        fetchPlatforms();
        fetchOs();
        fetchBrowsers();
    }, []);

    const useStyles = makeStyles((theme) => ({
        item: {
            [theme.breakpoints.up('md')]: {
                marginRight: 20
            }
        }
    }));

    const classes = useStyles();

    return (
        <Grid container>
            <Grid
                xs={12}
                md={3}
                item
                component={FormControl}
                className={classes.item}
            >
                <InputLabel htmlFor="platform_select">Platform</InputLabel>
                <Select
                    value={selectedPlatform || ''}
                    onChange={(e) =>
                        handlePlatformsSelectChange(e.target.value)
                    }
                    inputProps={{
                        name: 'platform',
                        id: 'platform_select'
                    }}
                >
                    <MenuItem aria-label="None" value="">
                        &nbsp;
                    </MenuItem>
                    {platforms.length
                        ? platforms.map((platform, i) => (
                              <MenuItem key={i} value={platform.value}>
                                  {platform.label}
                              </MenuItem>
                          ))
                        : null}
                </Select>
            </Grid>

            <Grid
                xs={12}
                md={3}
                item
                component={FormControl}
                className={classes.item}
            >
                <InputLabel htmlFor="os_select">Operating System</InputLabel>
                <Select
                    multiple
                    value={selectedSystems || []}
                    onChange={(e) => handleSystemsSelectChange(e.target.value)}
                    inputProps={{
                        name: 'os',
                        id: 'os_select'
                    }}
                >
                    {systems.length
                        ? systems.map((os, i) => (
                              <MenuItem key={i} value={os.value}>
                                  {os.label}
                              </MenuItem>
                          ))
                        : null}
                </Select>
            </Grid>

            <Grid
                xs={12}
                md={3}
                item
                component={FormControl}
                className={classes.item}
            >
                <InputLabel htmlFor="browser_select">Browser</InputLabel>
                <Select
                    multiple
                    value={selectedBrowsers || []}
                    onChange={(e) => handleBrowsersSelectChange(e.target.value)}
                    inputProps={{
                        name: 'browser',
                        id: 'browser_select'
                    }}
                >
                    {browsers.length
                        ? browsers.map((browser, i) => (
                              <MenuItem key={i} value={browser.value}>
                                  {browser.label}
                              </MenuItem>
                          ))
                        : null}
                </Select>
            </Grid>
        </Grid>
    );
};

export default BottomFilters;
