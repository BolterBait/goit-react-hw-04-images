import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getPicture } from 'api/api';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [pictureType, setPictureType] = useState([]);
  const [resultPage, setResultPage] = useState(1);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const drawGallery = async (page, query) => {
    try {
      setIsLoading(true);
      const images = await getPicture(page, query);

      if (images.totalHits) {
        toast.success(`Hooray! We found ${images.totalHits} pictures for you!`);
      }
      if (!images.totalHits) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setPictureType(prevState => [...prevState, ...images.hits]);
        setTotal(images.totalHits);
      }
    } catch {
      setErrorMessage('Something went wrong. We are working on it');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    drawGallery(resultPage, query);
  }, [resultPage, query]);

  function handleFormSubmit(searchQuery) {
    if (searchQuery === query) {
      return toast.info('You just asked for this picture');
    }
    setPictureType([]);
    setQuery(searchQuery);
    setResultPage(1);
    setTotal(0);
  }

  const loadMore = () => {
    setResultPage(prevState => prevState.page + 1);
  };
  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {errorMessage && <p>{errorMessage}</p>}
      {resultPage === 1 && <ToastContainer autoClose={2000} />}
      <ImageGallery pictureType={pictureType} />
      {total > 12 && <Button onLoadMore={loadMore} />}
    </div>
  );
}
