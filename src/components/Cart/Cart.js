import React, { useContext, useState } from "react";
import styles from "../../styles/Cart/Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [httpError, setHttpError] = useState({
        message: "",
        isTrue: false,
    });

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(
                "https://meals-4efcb-default-rtdb.firebaseio.com/orders.json",
                {
                    method: "POST",
                    body: JSON.stringify({
                        user: userData,
                        orderedItems: cartCtx.items,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("something went wrong");
            }

            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
        } catch (error) {
            setHttpError({
                isTrue: true,
                message: error.message,
            });
            setIsSubmitting(false);
        }
    };

    const cartitems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} // bind pre configura para execuções futuras
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalAction = (
        <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartitems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            {!isCheckout && modalAction}
            {httpError.isTrue && (
                <p className={styles["error-message"]}> {httpError.message} </p>
            )}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data</p>;
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order </p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
