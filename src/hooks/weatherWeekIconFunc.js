import React from 'react';
import clear from '../assets/images/weatherWeekIcon/clear.png';
import clouds from '../assets/images/weatherWeekIcon/clouds.png';
import drizzleRain from '../assets/images/weatherWeekIcon/drizzleRain.png';
import snow from '../assets/images/weatherWeekIcon/snow.png';
import thunderStorm from '../assets/images/weatherWeekIcon/storm.png';

const weatherWeekIconFunc = (type) => {
  const typeToCompare = type.toLowerCase();

  switch (typeToCompare) {
    case 'thunderstorm':
      return thunderStorm;
    case 'drizzle':
      return drizzleRain;
    case 'rain':
      return drizzleRain;
    case 'snow':
      return snow;
    case 'atmosphere':
      return clear;
    case 'clear':
      return clear;
    case 'clouds':
      return clouds;
    default:
      return 0;
  }
};

export default weatherWeekIconFunc;
