import React, { useContext } from 'react';
import styles from '../../../styles/Layoult/Header/HeaderCartButton.module.css';
import CartIcon from '../../Cart/CartIcon';
import CartContext from '../../../store/card-context';

const HeaderCartButton = props => {
    //now that we are using context in this component, it's going to be re-render
    //whenever a change occurs
    const cartCtx = useContext(CartContext);
    const numberOfCardItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)
    return(
        <button className={styles.button} onClick={props.onClick} >
            <span className={styles.icon}><CartIcon/></span>
            <span>Your Cart </span>
            <span className={styles.badge}>{numberOfCardItems}</span>
        </button>
    )
}

export default HeaderCartButton