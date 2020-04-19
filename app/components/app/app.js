import React, { Component } from 'react';
import { Filter, DataTable } from '../';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { fetchStatistics, transformStateIntoQuery } from '../../api/';

const styles = {
    wrapper: {
        padding: 0
    }
};

class App extends Component {
    state = {
        from: '',
        to: '',
        groupBy: 'day',
        platform: '',
        operatingSystems: [],
        browsers: [],
        rows: [],
        count: 0,
        limit: 10,
        page: 0
    };

    updateStatistics = ({ limit, page, ...rest }) => {
        if (limit != undefined) {
            this.setState({ limit: limit });
        }
        if (page != undefined) {
            this.setState({ page: page });
        }
        this.setState(
            { [Object.keys(rest)[0]]: Object.values(rest)[0] },
            async function () {
                const {
                    data: { count, rows }
                } = await fetchStatistics(transformStateIntoQuery(this.state));

                this.setState({ count, rows }, function () {
                    console.log('statistics updated');
                });
            }
        );
    };

    handleStateChange = (object) => {
        this.updateStatistics(object);
    };

    render() {
        const theme = createMuiTheme({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 480,
                    md: 768,
                    lg: 1024,
                    xl: 1440
                }
            }
        });

        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <Container className={classes.wrapper}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Filter
                                handleStateChange={this.handleStateChange}
                            />
                        </MuiPickersUtilsProvider>
                        <DataTable
                            statistics={this.state.rows}
                            groupBy={this.state.groupBy}
                            count={this.state.count}
                            handleStateChange={this.handleStateChange}
                        />
                    </Container>
                </CssBaseline>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
