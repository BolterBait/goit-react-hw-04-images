import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = `29723422-b06f38d2a18d9cab8e97b2e74`;

export const getPicture = async (query, page) => {
  const res = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return res.data;
};
