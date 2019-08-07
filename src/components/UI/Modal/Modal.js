import React from 'react';
import styles from './Modal.module.scss';
import {IoIosClose} from 'react-icons/io';

const Modal = (props) => {
    let releaseModalDesc = props.isRelease ? 'Are you sure you want to release the Pokemon ?' : 'The Pokemon got away !';
    let releaseModalBtn = props.isRelease ? (
        <div className = {styles.btnContainer}>
            <div 
                className = {styles.btn} 
                onClick = {() => props.onClickActionBtn('yes')}>
                Yes
            </div>
            <div 
                className = {[styles.btn, styles.btnDist].join(' ')} 
                onClick = {() => props.onClickActionBtn('no')}>
                No
            </div>
        </div>
    ) : (
        <div 
            className = {styles.btn} 
            onClick = {props.onClickActionBtn}>
            Try Again
        </div> 
    );

    return(
        <div className = {styles.modal}>
            <div className = {styles.modalContainer}>
                <div 
                    className = {styles.closeContainer} 
                    onClick = {props.onClickCloseBtn}
                >
                    <IoIosClose />
                </div>
                <div className = {styles.contentContainer}>
                    <div className = {styles.desc}>
                        {releaseModalDesc}
                    </div>
                    {releaseModalBtn}
                </div>
            </div>
        </div>
    );
}

export default Modal;