import Spinner from 'react-bootstrap/Spinner';
import styles from '../index.module.css'

function Loader() {
  return (
    <div className={styles.spinner} >
      <Spinner 
        variant='info' 
        animation="border" 
      >
      </Spinner>
      <span>Loading...</span>
    </div>
  )
  
}

export default Loader;