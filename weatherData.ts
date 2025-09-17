
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSun } from './components/Icons';

export type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "PartlyCloudy";

interface DailyForecast {
  day: string;
  condition: WeatherCondition;
  temp: {
    high: number;
    low: number;
  };
}

export interface WeatherData {
  location: string;
  current: {
    temp: number;
    feelsLike: number;
    condition: WeatherCondition;
    conditionText: string;
    humidity: number;
    wind: number; // km/h
  };
  forecast: DailyForecast[];
}

export const MOCK_WEATHER_DATA: Readonly<WeatherData> = {
  location: "อ.ราชสาส์น จ.ฉะเชิงเทรา",
  current: {
    temp: 32,
    feelsLike: 36,
    condition: "PartlyCloudy",
    conditionText: "มีเมฆบางส่วน",
    humidity: 78,
    wind: 12,
  },
  forecast: [
    { day: "พรุ่งนี้", condition: "Rainy", temp: { high: 31, low: 26 } },
    { day: "พฤ.", condition: "Rainy", temp: { high: 30, low: 25 } },
    { day: "ศ.", condition: "PartlyCloudy", temp: { high: 33, low: 26 } },
    { day: "ส.", condition: "Sunny", temp: { high: 34, low: 27 } },
    { day: "อา.", condition: "PartlyCloudy", temp: { high: 33, low: 27 } },
  ],
};

export const WEATHER_ICONS: Readonly<Record<WeatherCondition, React.FC<React.SVGProps<SVGSVGElement>>>> = {
  Sunny: Sun,
  Cloudy: Cloud,
  Rainy: CloudRain,
  PartlyCloudy: CloudSun,
};
