import styles from '../../styles/UI/Card/Card.module.css';

const Cart = (props) => {
    return(
        <div className={styles.card}>
            {props.children}
        </div>
    )
}

export default Cart;