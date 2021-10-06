import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Layoult/Header/HeaderCartButton.module.css';
import CartIcon from '../../Cart/CartIcon';
import CartContext from '../../../store/cart-context';

const HeaderCartButton = props => {
    const [btnIsHighLighted, setBtnIsHighlighted] = useState(false)
    //now that we are using context in this component, it's going to be re-render
    //whenever a change occurs
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);

    const btnClasses = `${styles.button} ${btnIsHighLighted && styles.bump}`

    useEffect(() => {
        if(items.length === 0)return
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)
        return () => {
            //cleanup function
            clearTimeout(timer) //toda vez que o componente renderizar o timer reiniciara
        }
    }, [items])


    return(
        <button className={btnClasses} onClick={props.onClick} >
            <span className={styles.icon}><CartIcon/></span>
            <span>Your Cart </span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton