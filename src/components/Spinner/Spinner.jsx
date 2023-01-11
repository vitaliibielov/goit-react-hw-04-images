import { TailSpin } from 'react-loader-spinner';
import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.backdrop}>
      <TailSpin
        height="80"
        width="80"
        color="#3F51B5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        // wrapperClass=""
        visible={true}
      />
    </div>
  );
}
