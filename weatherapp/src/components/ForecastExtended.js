import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast.js';
import './styles.css'

const url     = `http://api.openweathermap.org/data/2.5/forecast`;
const api_key = 'cdb8dae370fecc0c6fbf75687db6585c';

class ForecastExtended extends Component {

    constructor() {
        super();
        this.state = { forecastData: null };
    }

    componentDidMount() {
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps( nextProps ) {
        if( nextProps.city !== this.props.city ) {
            this.setState({ forecastData: null});
            this.updateCity(nextProps.city)
        }
    }

    updateCity = city => {
        const url_forecast = `${ url }?q=${ city }&appid=${ api_key }`;

        fetch( url_forecast )
            .then( data => ( data.json() ))
            .then( weather_data => {
                const forecastData = transformForecast( weather_data );
                this.setState({ forecastData });
            });
    }

    renderForecastItemDays( forecastData ) {
        return forecastData.map( forecast => (
            <ForecastItem
                weekday={ forecast.weekDay }
                key={ `${forecast.weekDay}-${forecast.hour}` }
                hour={ forecast.hour }
                data={ forecast.data } /> ))
    }

    renderProgress() {
        return <h3>Cargando Pronóstico extendido... </h3>;
    }

    render() {
        const { city } = this.props;
        const {forecastData } = this.state;

        return (
            <div>
                <h2 className='forecastTitle'>Pronóstico Extendidio para { city }</h2>
                { forecastData ?
                        this.renderForecastItemDays( forecastData ):
                        this.renderProgress()}
            </div> )
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired
}

export default ForecastExtended;
