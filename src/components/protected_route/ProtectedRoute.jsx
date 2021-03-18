import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { logedIn } from '../../redux/actionCreators/AtionCreators';



class ProtectedRoute extends Component
{
    
   
    render()
    {
        
        let localStorge= localStorage.getItem(`currentUser`)
            try {
                 jwtDecode(localStorge)
            } catch (error) {
                localStorage.clear()
            }
            if (this.props.isAuth||localStorge) {
                
                return (
                    <>
                    
                    <Route  path={this.props.path} component={this.props.component} />
                    </>
                )
            }
            else
            {
                return(
                    <Redirect to="/"/>
                )
            }
           
        }
   
    }

function mapStateToProps(state) {
    return {isAuth:state.isAuth}
}

export default connect(mapStateToProps,{logedIn})(ProtectedRoute);      