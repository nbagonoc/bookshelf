import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';

const NavItems = ({users}) => {
    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'user',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'user-plus',
            text:'Add Admins',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'star',
            text:'My Reviews',
            link:'/user/reviews',
            restricted:true
        },
        {
            type:'navItem',
            icon:'plus',
            text:'Add Reviews',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Logout',
            link:'/user/logout',
            restricted:true
        }
    ]

    const element = (item,i) =>(
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () =>(
        users.login ?
            items.map((item,i)=>{
                if(users.login.isAuth){
                    return !item.exclude ?
                        element(item,i)
                    :null
                }else{
                    return !item.restricted ?
                        element(item,i)
                    :null
                }
                //return element(item,i)
            })
        :null
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(NavItems)