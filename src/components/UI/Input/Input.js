import styles from './Input.module.css';

const Input = (props) => {
    return(
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label} </label>
            <input id={props.id} />
        </div>
    )
}

export default Input;