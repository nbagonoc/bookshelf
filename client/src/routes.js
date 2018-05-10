import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './components/home/home';
import BookView from './components/books';
import Layout from './hoc/layout';
import Login from './containers/admin/login';
import Auth from './hoc/auth';
import User from './components/admin';
import AddBook from './containers/admin/add';
import EditBook from './containers/admin/edit';
import UserPosts from './components/admin/userPosts';
import Register from './containers/admin/register';
import Logout from './components/admin/logout';

// POST=BOOK=REVIEWS
const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)}/>
                <Route path="/login" exact component={Auth(Login,false)}/>
                <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                <Route path="/user" exact component={Auth(User,true)}/>
                <Route path="/user/register" exact component={Auth(Register,true)}/>
                <Route path="/user/add" exact component={Auth(AddBook,true)}/>
                <Route path="/user/edit/:id" exact component={Auth(EditBook,true)}/>
                <Route path="/books/:id" exact component={Auth(BookView,null)}/>
                <Route path="/user/reviews" exact component={Auth(UserPosts,true)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;