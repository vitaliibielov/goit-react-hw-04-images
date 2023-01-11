import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { useEffect } from 'react';

export default function Modal({ hideModal, url }) {
  const onBackdropClick = e => {
    if (e.currentTarget !== e.target) {
      return;
    }
    hideModal();
  };

  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        hideModal();
      }
    };

    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [hideModal]);


  return (
    <div onClick={onBackdropClick} className={styles.overlay}>
      <div className={styles.modal}>
        <img src={url} alt="Some pic" width="800" />
      </div>
    </div>
  );
}


Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
