import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions'


class Login extends Component {

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }

    handleInputEmail = (event) =>{
        this.setState({email:event.target.value})
    }

    handleInputPassword = (event) =>{
        this.setState({password:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.users.login.isAuth){
            this.props.history.push('/user')
        }
    }

    submitForm = (event) =>{
        event.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }
    render() {
        let users = this.props.users;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Login</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="enter your email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    <button type="submit">login</button>
                    <div className="error">
                        {
                            users.login?
                                <div>{users.login.message}</div>
                            :null
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        users:state.users
    }
}

export default connect(mapStateToProps)(Login)