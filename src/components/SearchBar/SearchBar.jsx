import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './SearchBar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.resetForm();
  };

  render() {
    const { query } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.onSubmit} className={styles.SearchForm}>
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
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
