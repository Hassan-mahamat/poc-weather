import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Weather.module.css';

const API_KEY = "c6dea39f86ea31dc114f0a4f0eec8fa9";
const CACHE_KEY = "weatherData";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
        },
      });
      const data = response.data;
      setWeatherData(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Une erreur inconnue est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError('Permission de géolocalisation refusée.');
              break;
            case error.POSITION_UNAVAILABLE:
              setError('Position de géolocalisation indisponible.');
              break;
            case error.TIMEOUT:
              setError('La demande de géolocalisation a expiré.');
              break;
            default:
              setError('Une erreur inconnue est survenue.');
              break;
          }
          setLoading(false);
        }
      );
    };

    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      setWeatherData(JSON.parse(cachedData));
    } else {
      getLocation();
    }
  }, []);

  return (
    <div className={styles.weatherContainer}>
      <h2 className={styles.title}>Informations Météorologiques</h2>
      {loading && <p className={styles.loading}>Chargement...</p>}
      {error && <p className={styles.error}>Erreur : {error}</p>}
      {weatherData && !loading && !error && (
        <>
          <p> <span className={styles.name}>{weatherData.name}</span></p>
          <p className={styles.temp}>{weatherData.main.temp}°C</p>
          <p className={styles.description}> {weatherData.weather[0].description}</p>
          <div className={styles.weatherDetails}>
            <div className={styles.detailItem}>
              <p className={styles.detailValue}>{weatherData.main.humidity}%</p>
              <p className={styles.detailLabel}>Humidity</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailValue}>{weatherData.wind.speed} m/s</p>
              <p className={styles.detailLabel}>Wind Speed</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
