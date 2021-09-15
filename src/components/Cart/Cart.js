import { useContext } from "react";
import styles from "../../styles/Cart/Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/card-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {};

    const cartItemAddHandler = (item) => {};

    const cartitems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}// bind pre configura para execuções futuras
                    onAdd={cartItemAddHandler.bind(null, item.id) }
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartitems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles["button--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
