import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavigationItem.module.scss';

const NavigationItem = (props) => {
    let classes = props.isMobile ? [styles.navigationItem, styles.mobileStyles].join(' ') : styles.navigationItem;
    return(
        <li className = {classes} >
            <NavLink 
                exact = {props.exact}
                to = {props.path}
                activeClassName = {styles.activeLink}
                className = {styles.hoveredLink} > {props.pathName} </NavLink>
        </li>
    );
}


export default NavigationItem;