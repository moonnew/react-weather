import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, DetailCard } from '../WeatherDetail/WeatherDetail';
import { useHistory } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useAddCity } from '../../hooks/useAddCity';

const AddCard = styled(DetailCard)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const searchOptions = {
  types: ['city'],
};

const AddCity = () => {
  const [address, setAddress] = useState('');
  const [real, setReal] = useState('');
  const { getCurrentLocation, error, city } = useCurrentLocation();
  const { addCity, findError } = useAddCity();
  const history = useHistory();

  const handleSubmit = async () => {
    await addCity(real);
    history.push('/');
  };

  const locationSubmit = () => {
    getCurrentLocation();
  };

  useEffect(() => {
    const addCityWhenLocationValArrived = async () => {
      if (city) {
        await addCity(city);
        history.push('/');
      }
    };

    addCityWhenLocationValArrived();
  }, [city]);

  const searchOptions = {
    types: ['(cities)'],
  };

  useEffect(() => {
    setAddress(real);
  }, [real]);

  return (
    <Box>
      <AddCard>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={setReal}
          debounce={500}
          searchOptions={searchOptions}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                pattern="[a-zA-Z]*"
                {...getInputProps({ placeholder: 'Type address' })}
              ></input>
              <div>
                {loading ? <div>...Loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    background: suggestion.active ? '#41B6E6' : '#FFF',
                  };
                  //   console.log(suggestion);
                  return (
                    <div
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {findError && <p>{findError}</p>}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={locationSubmit}>현재 위치 기준 추가</button>
        {error ?? <p>{error}</p>}
      </AddCard>
    </Box>
  );
};

export default AddCity;
