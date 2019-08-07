import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';


const NavigationItems = (props) => (
    <ul className = {styles.navigationItems} >

        <NavigationItem exact path = "/" pathName = "Home" isMobile = {props.isMobile}/>
        <NavigationItem path = "/pokedex" pathName = "Pokedex" isMobile = {props.isMobile}/>
    </ul>
);

export default NavigationItems;