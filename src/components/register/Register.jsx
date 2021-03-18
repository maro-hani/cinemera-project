import axios from 'axios';
import Joi from 'joi';
import React, { Component } from 'react';
import styls from './register.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';



class Register extends Component
{
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        age: "",
        errors: "",
        errors_response: "",
        loading: false,
    }
    
    //about validate form
    validationForm = () =>
    {
        let schema = Joi.object({
            first_name: Joi.string().alphanum().min(3).max(30).required(),

            last_name: Joi.string().alphanum().min(3).max(30).required(),

            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),

            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

            age: Joi.number().integer().min(16).max(80).required(),
        });
        let state = { ...this.state }
        delete state.errors
        delete state.errors_response
        delete state.loading
        return schema.validate(state, { abortEarly: false })

    }

    //about take value from inputs to state
    changeSubmitForm = (e) =>
    {
        let state = { ...this.state }
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    //about send data to data_base
    sendRegisterData = async () =>
    {
        let state = { ...this.state }
        delete state.errors
        delete state.errors_response
        delete state.loading
        let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', state)

        //about success register
        if (data.message === 'success')
        {
            
            this.setState({loading:false})
            console.log('data.message');
            let state = { ...this.state }
            state.errors_response = ""
            this.setState(state)
            this.props.history.replace('/login')
            toast.success("successfully registered")
            
        }
        //about feild register
        else
        {
            toast.error("register faild please try again");
            this.setState({loading:false})
            this.setState({ errors_response: "this acout alredy exist" })
            console.log(this.state.errors_response);
        }

    }

    clearForm = () =>
    {
        this.setState({ first_name: '' })
        this.setState({ last_name: '' })
        this.setState({ email: '' })
        this.setState({ age: '' })
        this.setState({ password: '' })
    }

    onSubmitFOrm = (e) =>
    {
        this.setState({loading:true})
        e.preventDefault()
        let validationRespons = this.validationForm();
        //about validation of register have error
        if (validationRespons.error)
        {
            toast.error("register failed please try again");
            let state = { ...this.state }
            state.errors = validationRespons.error.message
            this.setState(state)

        }
        else
        {
            
            this.setState({ errors: "" })
            this.clearForm()
            this.sendRegisterData()
           
        }
    }

    render()
    {
        return (
            <>
            <ToastContainer />
                
                
                <motion.form
                initial={{x:"100vw"}}
                animate={{x:0}}
                transition={{delay:0.2,type:"spring",stiffness:120,mass:0.4,}}
                onSubmit={this.onSubmitFOrm} className={`w-50 mx-auto shadow-lg rounded-lg my-5 ${ styls.backgroundForm } `}>
                    <h1 className={`pt-3 ${ styls.registerForm } ml-5`}>Register Form</h1> 
                    <div className="  w-100 p-4 m-auto  ">
                        <div className=" form-group  ">
                            <label className={`${ styls.fontSpace }`}>first Name :</label>
                            <input name="first_name" type="text" value={this.state.first_name} className=" form-control w-100" onChange={this.changeSubmitForm} />
                        </div>

                        <div className=" form-group ">
                            <label className={`${ styls.fontSpace }`}>last Name :</label>
                            <input name="last_name" type="text" value={this.state.last_name} className=" form-control w-100" onChange={this.changeSubmitForm} />
                        </div>

                        <div className=" form-group ">
                            <label className={`${ styls.fontSpace }`}>Email :</label>
                            <input name="email" value={this.state.email} type="email" className=" form-control w-100" onChange={this.changeSubmitForm} />
                        </div>

                        <div className=" form-group ">
                            <label className={`${ styls.fontSpace }`}>Age  :</label>
                            <input name="age" type="text" value={this.state.age} className=" form-control w-100" onChange={this.changeSubmitForm} />
                        </div>

                        <div className=" form-group ">
                            <label className={`${ styls.fontSpace }`}>password :</label>
                            <input name="password" type="password" value={this.state.password} className="  mb-4 form-control w-100" autoComplete="of" onChange={this.changeSubmitForm} />
                        </div>
                        {/* about allert of validation error and the acount exist */}
                        {this.state.loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>:null}
                        {this.state.errors ? <div className="alert alert-danger py-2">{this.state.errors}</div> : null}
                        {this.state.errors_response ? <div className="alert alert-danger py-2">{this.state.errors_response}</div> : null}
                        <motion.button 
                        whileHover={{
                            scale:1.1,
                            textShadow:'0px 0px 4px rgb(255, 255, 255)',
                            boxShadow:'0px 0px 4px rgb(255, 255, 255)',
                            transition:{
                                duration:.2,
                                yoyo:Infinity
                            }
                        }}
                        type="submit" className={`btn ${ styls.btn }  ${ styls.btnSubmit }`}>submit</motion.button>

                    </div>
                </motion.form>
            </>
        );
    }
}
function mapStateToProps(state) {
    return {isAuth:state.isAuth}
}

export default connect(mapStateToProps)(Register) ;

