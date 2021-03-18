import { motion } from 'framer-motion';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerson } from '../../redux/actionCreators/movies_action';


class Person extends Component {


    componentDidMount()
    {
        this.props.getPerson()
    }


    render() { 
        console.log(this.props);
        return ( 
            <>
            <div className="row">
                
            {this.props.persons.map((person, index) =>
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    whileHover={{ scale: 1.2, }}
                    transition={{ type: 'spring', duration: .9 }}
                    className="col-md-2 text-center my-3 w-100  "  key={index}>
                    <div className="m-2 ">
                        
                        <img className=" w-100 rounded border " src={`https://image.tmdb.org/t/p/w500/${ person.profile_path}`} alt="" />
                        <h3 className="py-2 img-fluid ">{person.name}</h3>
                    </div>

                </motion.div>   
            
            )}
            
            </div>
            </>
         );
    }
}
function mapStateToProps(state) {
    return {persons:state.persons}
}
 
export default connect(mapStateToProps,{getPerson})(Person) 