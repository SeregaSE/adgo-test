import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import {
    FormControl,
    InputLabel,
    Select,
    Grid,
    MenuItem
} from '@material-ui/core';
import moment from 'moment';
import { fetchData } from '../../api/';

const TopFilters = ({ handleStateChange }) => {
    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedToDate] = useState(null);
    const [selectedGroupBy, setSelectedGroupBy] = useState(null);
    const [groups, setGroups] = useState([]);

    const handleFromSelectChange = (e) => {
        setSelectedFromDate(e._d);
        handleStateChange({ from: moment(e._d).format('YYYY-MM-DD'), page: 0 });
    };

    const handleToSelectChange = (e) => {
        setSelectedToDate(e._d);
        handleStateChange({ to: moment(e._d).format('YYYY-MM-DD'), page: 0 });
    };

    const handleGroupSelectChange = (e) => {
        setSelectedGroupBy(e.target.value);
        handleStateChange({ groupBy: e.target.value, page: 0 });
    };

    useEffect(() => {
        const fetchGroups = async () => {
            const { data } = await fetchData('groups');
            setGroups(data);
        };

        fetchGroups();
    }, []);

    const useStyles = makeStyles((theme) => ({
        topRow: {
            [theme.breakpoints.up('md')]: {
                marginBottom: 20
            }
        },
        item: {
            [theme.breakpoints.up('md')]: {
                marginRight: 20
            }
        }
    }));

    const classes = useStyles();

    return (
        <Grid container className={classes.topRow}>
            <Grid
                xs={12}
                md={2}
                item
                component={DatePicker}
                disableToolbar
                variant="inline"
                label="From"
                disableFuture="true"
                minDate={moment().subtract(365, 'days')}
                value={selectedFromDate}
                onChange={(e) => handleFromSelectChange(e)}
                className={classes.item}
            />

            <Grid
                xs={12}
                md={2}
                item
                component={DatePicker}
                disableToolbar
                variant="inline"
                label="To"
                disableFuture="true"
                value={selectedToDate}
                onChange={(e) => handleToSelectChange(e)}
                className={classes.item}
            />

            <Grid
                xs={12}
                md={2}
                item
                component={FormControl}
                className={classes.item}
            >
                <InputLabel htmlFor="group_by_select">Group By</InputLabel>
                <Select
                    value={selectedGroupBy || ''}
                    onChange={(e) => handleGroupSelectChange(e)}
                    inputProps={{
                        name: 'group_by',
                        id: 'group_by_select'
                    }}
                >
                    {groups.length
                        ? groups.map((group, i) => (
                              <MenuItem key={i} value={group.value}>
                                  {group.label}
                              </MenuItem>
                          ))
                        : null}
                </Select>
            </Grid>
        </Grid>
    );
};

export default TopFilters;
