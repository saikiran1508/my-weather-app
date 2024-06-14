import React, { useEffect, useState } from 'react';

export default function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('London');
    const [userCity, setUserCity] = useState('');
    const [err,seterr] = useState('');
   

    const fetchWeatherData = async (city) => {
        try {
            const res = await fetch(`/api/weather?city=${city}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("data",data)
            setWeatherData(data);
        } catch (err) {
            seterr(err);
            setError(err.message);
        }
    };

    
    useEffect(() => {
        fetchWeatherData(city);
        
    }, [city]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCity(userCity);
    };

    const getBackgroundImage = () => {
        if (!weatherData || !weatherData.current || !weatherData.current.weather_descriptions) {
            return 'img/back.jpg'; // Default background image
        } else {
            const weatherDescription = weatherData.current.weather_descriptions[0].toLowerCase();
            if (weatherDescription.includes('sunny')) {
                return 'img/back.jpg'; // Sunny background image
            }
            if (weatherDescription.includes('rain')) {
                return 'img/back.jpg'; // Rainy background image
            }
            if (weatherDescription.includes('cloud')) {
                return 'img/back.jpg'; // Cloudy background image
            }

            return 'img/back.jpg';
        }
    };

    return (
        <div  style={{ ...styles.container, backgroundImage: `url('https://media.istockphoto.com/id/1129402005/photo/green-garden-blurred-in-the-background-gardening-and-spring-concept.jpg?s=612x612&w=0&k=20&c=M6dQ9tjZY8tJAyBKzMXSj-ksDWgEEdyyLl8ySwkCCLg=')` }}>
            <main style={styles.main}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input 
                        type="text" 
                        value={userCity} 
                        onChange={(e) => setUserCity(e.target.value)} 
                        placeholder="Enter city name" 
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Get Weather</button>
                </form>
                {error ? (
                    <p style={styles.error}>Error: {error}</p>
                ) : weatherData && weatherData.location && weatherData.location.name ?(
                    <div style={styles.weatherContainer}>
                        <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
                        <div style={styles.currentWeather}>
                            <img src={weatherData.current.weather_icons[0]} alt="Weather Icon" style={styles.weatherIcon} />
                            <div>
                                <p>Temperature: {weatherData.current.temperature}°C</p>
                                <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
                                <p>Wind: {weatherData.current.wind_speed} km/h {weatherData.current.wind_dir}</p>
                            </div>
                        </div>
                       
                    </div>
                ) : (
                    <p style = {styles.error}>Please Enter Valid City Name</p>
                )}
            </main>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '98.2vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s ease',
        
    },
    main: {
        width: '90%',
        maxWidth: '700px',
        maxHeight: '1000px',
        padding: '60px',
        background: '#fff',
        boxShadow: '0px 20px 50px rgba(8, 112, 184, 0.7)',
        // boxshadow: '0 20px 50px rgba(8, 112, 184, 0.7)',
        borderRadius: '40px',
    },
    form: {
        display: 'flex',
        marginBottom: '80px',
    },
    input: {
        flex: '1',
        padding: '10px',
        marginRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#0070f3',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: '20px 0',
    },
    weatherContainer: {
        textAlign: 'center',
    },
    currentWeather: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    weatherIcon: {
        width: '100px',
        height: '100px',
        marginRight: '20px',
    },
    forecastContainer: {
        marginTop: '20px',
    },
    forecastItem: {
        marginBottom: '10px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forecastIcon: {
        width: '50px',
        height: '50px',
    },
};
