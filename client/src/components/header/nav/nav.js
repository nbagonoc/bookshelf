import React from 'react';
import SideNav from 'react-simple-sidenav';
import NavItems from './navItems';

const Nav = (props) => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background:'#333',
                maxWidth:'220px'
            }}
        >
            <NavItems/>
        </SideNav>
    );
};

export default Nav;