import styles from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Spinner from './Spinner/Spinner';
import fetchImages from '../services/api';
import { useState, useEffect } from 'react';

// import { Component } from 'react';


export function App () {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (query !== '') {
      fetchData();
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const { hits, total } = await fetchImages(query, page);
        if (!total) {
          setNoResults(true);
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setShowLoadMore(page < Math.ceil(total / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [query, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setShowLoadMore(false);
    setNoResults(false);
    setError('');
  };

  const showModalWindow = e => {
    const largeImage = e.target.dataset.url;
    setLargeImageURL(largeImage);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={onSubmit} />
      {noResults && (
        <p>
          Sorry there is nothing that matches your search <b>{query}</b>
        </p>
      )}
      <ImageGallery images={images} showModal={showModalWindow} />
      {showModal && <Modal url={largeImageURL} hideModal={hideModal} />}
      {showLoadMore && <Button loadMore={loadMore} />}
      {isLoading && <Spinner />}
      {error && (
        <p>
          Sorry, an unexpected error occurred: <b>{error}</b>
        </p>
      )}
    </div>
  );
}