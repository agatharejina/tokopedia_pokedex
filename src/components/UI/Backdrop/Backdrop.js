import React from 'react';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => {

    const classes = props.isHidden ? styles.hidden : styles.backdrop

    return <div className = {classes} onClick = {props.onClickBackDrop}></div>
};

export default Backdrop;