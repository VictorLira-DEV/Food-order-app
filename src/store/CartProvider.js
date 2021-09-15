import CartContext from "./card-context";
import React, { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        //always return a new value, dont adit the old one
        const updatedItems = state.items.concat(action.item);//concat return a new array
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCarHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };


    const removeItemFromHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    };


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCarHandler,
        removeItem: removeItemFromHandler,
    };

    return <CartContext.Provider value={cartContext} >
        {props.children}
    </CartContext.Provider>;
};

export default CartProvider;
