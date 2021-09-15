import styles from '../../styles/UI/Modal/Modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';

const BackDrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement )}
            {ReactDOM.createPortal( 
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </React.Fragment>
    )
}

export default Modal;