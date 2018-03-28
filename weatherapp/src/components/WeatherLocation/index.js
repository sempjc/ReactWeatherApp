import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from './../../services/transformWeather';
import './styles.css';


const url     = `http://api.openweathermap.org/data/2.5/weather`;
const api_key = 'appid=cdb8dae370fecc0c6fbf75687db6585c';


class WeatherLocation extends React.Component {

    constructor({ city }) {
        super();
        this.state = {
            city,
            data: null
        }
    }

    componentWillMount() {
        const { city } = this.state;
        const api_weather = `${ url }?q=${ city }&${ api_key }`;

        fetch( api_weather )
            .then( data => (data.json()) )
            .then( weather_data => {
                const data = transformWeather( weather_data );
                this.setState({ data });
            });
    }

    render = () => {
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;

        return (
            <div className='weatherLocation' onClick={ onWeatherLocationClick }>
                <Location city={ city }/>
                { data ? <WeatherData data={ data }/> : 'Cargando...' }
            </div>)
    }
}


WeatherLocation.propTypes = {
    city: PropTypes.string,
    onWeatherLocationClick: PropTypes.func.isRequired
}

export default WeatherLocation;

