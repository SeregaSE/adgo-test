import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TopFilters, BottomFilters } from '../';
import { Box } from '@material-ui/core';

const Filter = ({ handleStateChange }) => {
    const useStyles = makeStyles((theme) => ({
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            marginBottom: 50
        },
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
        <Box className={classes.wrapper}>
            <TopFilters handleStateChange={handleStateChange} />

            <BottomFilters handleStateChange={handleStateChange} />
        </Box>
    );
};

export default Filter;
