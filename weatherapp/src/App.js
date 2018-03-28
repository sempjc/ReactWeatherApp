// Main Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {setCity} from './actions';


// Application Component
import LocationList     from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';

// UI Lib react component
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper  from 'material-ui/Paper';

// CSS styles
import './App.css';

const cities = [
    'Buenos Aires, Ar',
    'Mexico City, MX',
    'San Juan, PR',
    'Florida, USA'
];



class App extends Component {

    constructor() {
        super();
        this.state = { city : null };
    }

    handleSelectedLocation = city => {
        this.setState({ city });
        this.props.setCity(city);
    }

    render() {
        const { city } = this.state;

        return (
            <MuiThemeProvider>
                <Grid>
                    <Row>
                        <Col xs= { 12 }>
                            <AppBar title='Weather App' />
                        </Col>
                    </Row>
                    <Row>

                        <Col xs={ 12 } md={6}>
                            <LocationList
                                cities={ cities }
                                onSelectedLocation= { this.handleSelectedLocation }/>
                        </Col>

                        <Col xs={ 12 } md={ 6 }>
                            <Paper zDepth={ 4 }>
                                <div className='detail'>
                                    {
                                      city &&
                                        <ForecastExtended city={ city } />
                                    }
                                </div>
                            </Paper>
                        </Col>

                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    setCity: PropTypes.func.isRequired
}

const mapDispatchToPropsAction = dispatch => ({
    setCity: value => dispatch( setCity(value) )
});

export default connect( null, mapDispatchToPropsAction )(App);

