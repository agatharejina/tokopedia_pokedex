import React from 'react';
import styles from './NavigationBar.module.scss';
import { FaBars } from "react-icons/fa";

const NavigationBar = (props) => (
    <header>
        <nav  className = {styles.nav} >
            <div 
                className = {styles.iconContainer}
                onClick = {props.onClickHamburgerBtn}>
                <FaBars />
            </div>
        </nav>
    </header>
);

export default NavigationBar;