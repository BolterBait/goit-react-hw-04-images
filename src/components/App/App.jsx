import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getPicture } from 'api/api';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/SearchBar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [pictureType, setPictureType] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [querty, setQuerty] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState('0');
 
  const drawGallery = async (page, query) => {
    try {
      setStatus({ status: 'pending' });
      pictureType = await getPicture(query, page);

      if (pictureType.totalHits) {
        setStatus({ status: 'success' });
        toast.success(
          `Hooray! We found ${pictureType.totalHits} pictures for you!`
        );
      }
      if (!pictureType.totalHits) {
        setStatus({ status: 'error' });
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setPictureType(prevState => ({
          pictureType: [...prevState.pictureType, ...pictureType.hits],
          total: pictureType.totalHits,
        }));
      }
    } catch {
      setErrorMessage({
        errorMessage: 'Something went wrong. We are working on it',
      });
    }
  };

  const handleFormSubmit = query => {
    if (query === state.query) {
      return toast.info('You just asked for this picture');
    }

    this.setState({ pictureType: [], query: query, page: 1, total: 0 });
  };

  const loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  const useEffect (_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.drawGallery(this.state.page, this.state.query);
    }
  }
  render() {
    const { pictureType, status, total, page } = this.state;
    if (status === 'idle') {
      return (
        <div>
          <SearchBar onSubmit={this.handleFormSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <Loader />
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictureType={pictureType} />
        </div>
      );
    }
    if (status === 'success') {
      return (
        <div onClick={this.toggleModal}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          {page === 1 && <ToastContainer autoClose={2000} />}
          <ImageGallery pictureType={pictureType} />
          {total > 12 && <Button onLoadMore={this.loadMore} />}
        </div>
      );
    }
    if (status === 'error') {
      return (
        <>
          <ToastContainer autoClose={2000} />
          <SearchBar onSubmit={this.handleFormSubmit} />
        </>
      );
    }
  }
}
