import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserPosts} from '../../actions';
import moment from 'moment-js';
import {Link} from 'react-router-dom';

class UserPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.users.login.id))
    }
    
    showUserPosts = (user) =>(
        user.userPosts ?
            user.userPosts.map(item =>(
                <tr key={item._id}>
                    <td>
                        <Link to={`/user/edit/${item._id}`}>{item.name}</Link>
                    </td>
                    <td>{item.author}</td>
                    <td>{moment(item.createAt).format("MM/DD/YY")}</td>
                </tr>
            ))
        :null
    )

    render() {
        let user = this.props.users;
        return (
            <div className="user_posts container">
                <h4>Your Reviews:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(UserPosts)