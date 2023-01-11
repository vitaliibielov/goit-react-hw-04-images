import styles from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Spinner from './Spinner/Spinner';
import fetchImages from '../services/api';

import { Component } from 'react';

const INITIAL_STATE = {
  query: '',
  page: 1,
  images: [],
  showModal: false,
  showLoadMore: false,
  isLoading: false,
  noResults: false,
  largeImageURL: '',
  error: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { hits, total } = await fetchImages(query, page);
        if (!total) {
          this.setState({ noResults: true });
          return;
        }
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          showLoadMore: page < Math.ceil(total / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onSubmit = query => {
    this.setState({ ...INITIAL_STATE, query });
  };

  showModal = e => {
    const largeImageURL = e.target.dataset.url;
    this.setState({ largeImageURL, showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      showModal,
      largeImageURL,
      isLoading,
      error,
      noResults,
      query,
      showLoadMore,
    } = this.state;
    return (
      <div className={styles.container}>
        <SearchBar onSubmit={this.onSubmit} />
        {noResults && (
          <p>
            Sorry there is nothing that matches your search <b>{query}</b>
          </p>
        )}
        <ImageGallery images={images} showModal={this.showModal} />
        {showModal && <Modal url={largeImageURL} hideModal={this.hideModal} />}
        {showLoadMore && <Button loadMore={this.loadMore} />}
        {isLoading && <Spinner />}
        {error && (
          <p>
            Sorry, an unexpected error occurred: <b>{error}</b>
          </p>
        )}
      </div>
    );
  }
}
