import React, { Component } from 'react';
import styles from './Layout.module.scss';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import SideBar from '../../components/UI/Sidebar/Sidebar';
import NavigationBar from '../../components/NavigationBar/NavigationBar';


class Layout extends Component{
    state = {
        isHidden: true,
    }

    onClickCloseSideBarBtn = () => {
        this.setState({isHidden: !this.state.isHidden})
    }

    onClickHamburgerBtn = () => {
        this.setState({isHidden: !this.state.isHidden})
    }

    onClickBackDrop = () => {
        this.setState({isHidden: !this.state.isHidden})
    }

    render(){
        let isMobile = true;
        let windowWidth = (window.innerWidth < 768) ? isMobile : !isMobile;

        return(
            <div className = {styles.page}>
                <NavigationBar 
                    onClickHamburgerBtn = {this.onClickHamburgerBtn}
                />
                <Backdrop 
                    isHidden = {this.state.isHidden} 
                    onClickBackDrop = {this.onClickBackDrop}
                />
                <SideBar 
                    isMobile = {windowWidth}
                    isHidden = {this.state.isHidden}
                    onClickCloseSideBarBtn = {this.onClickCloseSideBarBtn}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;