import { motion } from 'framer-motion';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logedOut } from '../../redux/actionCreators/AtionCreators';
import styls from './navbar.module.css'



class Navbar extends Component
{
    logOut = () =>
    {
        this.props.logedOut()
        localStorage.clear()
        
    }

    render()
    {
        return (
            <>

                <motion.nav
                 initial={{y:-250}}
                 animate={{y:-10}}
                 transition={{delay:0.2,type:"spring",stiffness:120}}
                className={`navbar navbar-expand-lg navbar-dark bg-black mb-5  ${ styls } ${ styls.borderNav } `}>
                    <a className={`navbar-brand .nav-brand ${ styls.navBrand }`} href="/">cinemera</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/movies">Movies</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/person">person</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">LogIn</NavLink>
                            </li>
                            <button className="bg-transparent text-white" onClick={this.logOut}>logout</button> 

                        </ul>
                    </div>
                </motion.nav>
            </>
        );
    }
}
function mapStateToProps(state)
{
    return { isAuth: state.isAuth }
}

export default connect(mapStateToProps, { logedOut })(Navbar)

