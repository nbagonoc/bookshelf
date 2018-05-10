import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './nav/nav'

class Header extends Component {
    
    state ={
        showNav:false
    }
    onHideNav = () => {
        this.setState({showNav:false})
    }

    render() {
        return (
            <header>
                <div className="open_nav container">
                    <FontAwesome name="bars"
                        onClick={()=>this.setState({showNav:true})}
                        style={{
                            color:'#FFF',
                            padding:'10px',
                            cursor:'pointer',
                            position:'absolute',
                            left:'10px'
                        }}
                    />
                </div>
                <Nav
                    showNav={this.state.showNav}
                    onHideNav={()=>this.onHideNav()}
                />
                <div className="text-center">
                    <Link to="/" className="logo">
                        The Book Shelf
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;