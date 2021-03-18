import axios from 'axios';
import { motion } from 'framer-motion';
import Joi from 'joi';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logedIn  } from '../../redux/actionCreators/AtionCreators';
import styls from "./login.module.css"




class LogIn extends Component
{
    
    state = {
        email: '',
        password: '',
        errors: '',
        errors_response: '',
        loading: false,
    }

    //about take value from inputs to state
    changeLogInForm = (e) =>
    {
        let state = { ...this.state };
        state[e.target.name] = e.target.value;
        this.setState(state)
    }


    sendLoginFormData = async () =>
    {
        let state = { ...this.state }
        delete state.errors_response
        delete state.errors
        delete state.loading
        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`, state)
        if (data.message === 'success')
        {
            this.setState({ loading: false })
            this.setState({ errors_response: '' })
            localStorage.setItem('currentUser', data.token)
            this.props.logedIn()
            this.props.history.replace('/movies')
        }
        else
        {

            this.setState({ loading: false })
            this.setState({ errors_response: data.message })

        }
    }

    validateLoginForm = () =>
    {

        let schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        let state = { ...this.state };
        delete state.errors;
        delete state.errors_response;
        delete state.loading
        return schema.validate(state, { abortEarly: false });
    }

    SubmitLoginForm = (e) =>
    {
        this.setState({ loading: true })
        e.preventDefault();
        let validationREsponse = this.validateLoginForm();
        if (validationREsponse.error)
        {
            this.setState({ loading: false })
            let state = { ...this.state };
            state.errors = validationREsponse.error.message;
            this.setState(state);
        }
        else
        {

            this.setState({ errors: '' });
            this.clearForm();
            this.sendLoginFormData()
        }
    }

    clearForm = () =>
    {
        this.setState({ email: '' });
        this.setState({ password: '' });
    }

    render()
    {

        return (
            <>
                <motion.form
                 initial={{x:"100vw"}}
                 animate={{x:0}}
                 transition={{delay:0.2,type:"spring",stiffness:120,mass:0.4,}}
                onSubmit={this.SubmitLoginForm} className={`w-100 d-flex justify-content-center `}  >
                    
                    <div className={`w-50 p-4 shadow-lg rounded-lg  ${ styls.backgroundLogin }`} >
                    <h1 className={` py-3  ${ styls.loginForm }`}>LogIn</h1>
                        <div className="form-group w-100 ">
                            <label className={`${ styls.fontSpace }`} >email :</label>
                            <input name='email' className="form-control" value={this.state.email} type="email" onChange={this.changeLogInForm} />
                        </div>

                        <div className="form-group w-100">
                            <label className={`${ styls.fontSpace }`}>password :</label>
                            <input name='password' className="form-control" value={this.state.password} autoComplete="of" type="password" onChange={this.changeLogInForm} />
                        </div>

                        {/* allert about validation */}
                        {this.state.errors_response ? <div className="alert alert-danger">{this.state.errors_response}</div> : null}
                        {this.state.errors ? <div className="alert alert-danger">{this.state.errors}</div> : null}
                        {this.state.loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : null}
                        <motion.button
                        whileHover={{
                            scale:1.1,
                            textShadow:'0px 0px 4px rgb(255, 255, 255)',
                            boxShadow:'0px 0px 4px rgb(255, 255, 255)',
                            transition:{
                                duration:.3,
                                yoyo:Infinity
                            }
                        }}
                        type="submit" className={` ${ styls.btnLogin } ${ styls.btn } `}>LogIn</motion.button>

                    </div>
                </motion.form>
            </>
        );
    }
}

function mapStateToProps(state)
{
    return { isAuth: state.isAuth }
}

export default connect(mapStateToProps, { logedIn, })(LogIn);

