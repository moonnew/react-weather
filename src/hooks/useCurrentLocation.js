import React, { useState } from 'react';
import axios from 'axios';

export const useCurrentLocation = () => {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  const getPositionSuccessed = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const key = process.env.REACT_APP_GEO_APIKEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=en&key=${key}`;

    /*    axios.get(url).then(({ data }) => {
      const len = data.results.length;
      const arr = data.results[len - 3].formatted_address.split(', ');
      setCity(arr[0]);
    });*/

    const getData = async () => {
      const data = await axios.get(url);
      const len = data.data.results.length;
      const arr = data.data.results[len - 3].formatted_address.split(', ');
      setCity(arr[0]);
    };
    getData();
  };

  const getPositionFailed = () => {
    setError('위치 정보를 가져올 수 없습니다.');
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.log('현재 브라우저가 Geolocation API를 지원하지 않습니다.');
      setError('브라우저에서 현재 위치를 찾을 수 없습니다.');
    } else {
      try {
        navigator.geolocation.getCurrentPosition(
          getPositionSuccessed,
          getPositionFailed
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return { getCurrentLocation, error, city };
};
