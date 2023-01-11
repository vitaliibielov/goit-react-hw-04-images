import PropTypes from 'prop-types';
// import { Component } from 'react';
import styles from './SearchBar.module.css';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const resetForm = () => {
    setQuery('');
  };

  const onInputChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(query);
    resetForm();
  };

 

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={onSubmitForm} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="query"
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
