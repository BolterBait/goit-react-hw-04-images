import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getPicture } from 'api/api';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/SearchBar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    pictureType: [],
    showModal: false,
    page: 1,
    query: '',
    errorMessage: null,
    isLoading: false,
    status: 'idle',
    total: 0,
  };

  drawGallery = async (page, query) => {
    try {
      this.setState({ status: 'pending' });
      const pictureType = await getPicture(query, page);

      if (pictureType.totalHits) {
        this.setState({ status: 'success' });
        toast.success(
          `Hooray! We found ${pictureType.totalHits} pictures for you!`
        );
      }
      if (!pictureType.totalHits) {
        this.setState({ status: 'error' });
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        this.setState(prevState => ({
          pictureType: [...prevState.pictureType, ...pictureType.hits],
          total: pictureType.totalHits,
        }));
      }
    } catch {
      this.setState({
        errorMessage: 'Something went wrong. We are working on it',
      });
    }
  };

  handleFormSubmit = query => {
    if (query === this.state.query) {
      return toast.info('You just asked for this picture');
    }
    this.setState({ pictureType: [], query: query, page: 1, total: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
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
