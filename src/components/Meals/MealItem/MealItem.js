import styles from '../../../styles/Meals/MealItem/MealItem.module.css';
import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/card-context';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    }

    return (
        <li className={styles.meal} >
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price} >{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}  /*id={props.id}*/ />
            </div>
        </li>
    );
};

export default MealItem;
