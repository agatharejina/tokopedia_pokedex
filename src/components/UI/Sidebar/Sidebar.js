import React from 'react';
import styles from './Sidebar.module.scss';
import {IoIosClose} from 'react-icons/io';
import NavigationItems from '../../NavigationBar/NavigationItems/NavigationItems';

const SideBar = ( props ) => {

    let classes = '';
    let closeStyleClass = '';

    if(props.isMobile === false){
        classes = styles.sideBar;
        closeStyleClass = styles.hidden;
    }
    else{
        classes = !props.isHidden ? styles.sideBar : styles.hidden;
        closeStyleClass = styles.closeContainer;
    }

    return(
        <div className = {classes}>
            {/* close button */}
            <div 
                className = {closeStyleClass} 
                onClick = {props.onClickCloseSideBarBtn}>
                <IoIosClose />
            </div>
            {/* logo and links */}
            <div className = {styles.logoLinkContainer}>
                {/* logo */}
                <div className = {styles.logo}></div>
                {/* links */}
                <div className = {styles.navItems}>
                    <NavigationItems />
                </div>
            </div>
        </div>
    );
}

export default SideBar;