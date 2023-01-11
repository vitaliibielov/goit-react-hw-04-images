import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button onClick={loadMore} className={styles.button}>
      LOAD MORE
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
