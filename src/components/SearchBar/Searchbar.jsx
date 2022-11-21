import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
    status: '',
  };

  handelTypeChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      this.setState({ status: 'blank' });
      return toast.error('Input something');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { status } = this.state;
    if (status === '') {
      return (
        <Searchbar>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <ImSearch />
              <span>Search</span>
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handelTypeChange}
            />
          </SearchForm>
        </Searchbar>
      );
    }
    if (status === 'blank') {
      return (
        <Searchbar>
          <ToastContainer autoClose={2000} />
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <ImSearch />
              <span>Search</span>
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handelTypeChange}
            />
          </SearchForm>
        </Searchbar>
      );
    }
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
