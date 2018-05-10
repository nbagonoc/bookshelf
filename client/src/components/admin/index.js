import React from 'react';

const User = (props) => {
    return (
        <div className="user_container container">
            <div className="avatar">
                <img src="/images/avatar.png" alt="avatar"/>
            </div>
            <div className="nfo">
                <div>
                    <span>Name: </span>{props.users.login.name}
                </div>
                <div>
                    <span>Lastname: </span>{props.users.login.lastname}
                </div>
                <div>
                    <span>Email: </span>{props.users.login.email}
                </div>
            </div>
        </div>
    );
};

export default User;