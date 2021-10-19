import styles from "../../styles/Cart/Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInput = useRef();
    const streetInput = useRef();
    const postalCodeInput = useRef();
    const cityInput = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInput.current.value;
        const enteredStreet = streetInput.current.value;
        const enteredPostalCode = postalCodeInput.current.value;
        const enteredCity = cityInput.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        })
    };
    const nameControlStyles = `${styles.control} ${
        formInputsValidity.name ? "" : styles.invalid
    }`;
    const streetControlStyles = `${styles.control} ${
        formInputsValidity.street ? "" : styles.invalid
    }`;
    const postControlStyles = `${styles.control} ${
        formInputsValidity.postalCode ? "" : styles.invalid
    }`;
    const cityControlStyles = `${styles.control} ${
        formInputsValidity.city ? "" : styles.invalid
    }`;

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlStyles}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInput} type="text" id="name" />
                {!formInputsValidity.name && <p> Please enter a valid name </p>}
            </div>
            <div className={streetControlStyles}>
                <label htmlFor="street">Street</label>
                <input ref={streetInput} type="text" id="street" />
                {!formInputsValidity.street && (
                    <p> Please enter a valid street </p>
                )}
            </div>
            <div className={postControlStyles}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalCodeInput} type="text" id="postal" />
                {!formInputsValidity.postalCode && (
                    <p> Please enter a valid postal code </p>
                )}
            </div>
            <div className={cityControlStyles}>
                <label htmlFor="city">City</label>
                <input ref={cityInput} type="text" id="city" />
                {!formInputsValidity.city && (
                    <p> Please enter a valid postal city </p>
                )}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
