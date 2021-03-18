import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import LogIn from './components/login/Login';
import Movies from './components/movies/Movies';

import Navbar from './components/navbar/Navbar';
import NotFound from './components/NotFound';
import Person from './components/person/Person';
import ProtectedRoute from './components/protected_route/ProtectedRoute';
import Register from './components/register/Register';
import { logedIn } from './redux/actionCreators/AtionCreators';

class App extends Component
{

  
    render()
    {
        return (
            <>
            
                <Navbar />
                <div className=" container-fluid py-5">
                <Switch>

                    <ProtectedRoute path="/movies" component={Movies} />
                    <ProtectedRoute path="/person" component={Person} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/notfound" component={NotFound} />
                    <Redirect from="/" exact to="/register" />
                    <Redirect to="/notfound" />

                </Switch>

                </div>
            </>
        );
    }
}
function mapStateToProps(state) {
    return {isAuth:state.isAuth}
}

export default connect(mapStateToProps,{logedIn })( App);