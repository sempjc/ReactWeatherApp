import React from 'react';
import PropTypes from 'prop-types';
import WeatherData from './../WeatherLocation/WeatherData';



const ForecastItem = ({ weekday, hour, data }) => (
    <div>
        <div>
            <h2> { weekday } - { hour } hs</h2>
        </div>
        <WeatherData data={ data }/>
    </div>
)

ForecastItem.propType = {
    weekday: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,

    data: PropTypes.shape({
        temperature:  PropTypes.number.isRequired,
        weatherState: PropTypes.string.isRequired,
        humidity:     PropTypes.number.isRequired,
        wind:         PropTypes.string.isRequired
    })
}

export default ForecastItem;
