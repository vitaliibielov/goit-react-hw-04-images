import PropTypes from 'prop-types';
import React from 'react';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  showModal,
}) {
  const openModal = e => {
    showModal(e);
  };
  return (
    <li className={styles.imageGalleryItem}>
      <img
        className={styles.imageGalleryItemImage}
        src={webformatURL}
        alt="Some pic"
        data-url={largeImageURL}
        onClick={openModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.PropTypes.string.isRequired,
};
