import axios from 'axios';

export const fetchCountries = () => {
  const country = axios
    .get('https://countriesnow.space/api/v0.1/countries')
    .then(response => response.data.data);

  return country;
};
