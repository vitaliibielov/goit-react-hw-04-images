import axios from 'axios';

const API_KEY = '31500159-a5060d62383e22c767908c9f6';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export default async function fetchImages(query = 'cat', page = 1) {
  const response = await instance({
    params: {
      q: query,
      page,
    },
  });
  console.log(response.data);
  return response.data;
}