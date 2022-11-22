import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
// import { ToastContainer } from 'react-toastify';

import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function SearchBar({ onSubmit, toast }) {
  const [query, setQuery] = useState('');

  const handelTypeChange = event => {
    const value = event.currentTarget.value.toLowerCase();
    setQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast('Input something');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        {/* <ToastContainer autoClose={2000} /> */}
        <SearchFormButton type="submit">
          <ImSearch />
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handelTypeChange}
        />
      </SearchForm>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
