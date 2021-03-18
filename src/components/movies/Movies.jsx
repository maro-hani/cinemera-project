import { motion } from 'framer-motion';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../../redux/actionCreators/movies_action';
import styls from "./movies.module.css"



class Movies extends Component
{


    componentDidMount()
    {
        this.props.getMovies()
    }
    render()            
    {

        return (

            <motion.div
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120, mass: 0.4, }}

                className="row">
                <div className="col-md-4">
                    <div className={`${ styls.lineTop }`}></div>
                    <h1 className="ml-5 mt-4">Trending movies to watch now </h1>
                    <p className="ml-5 mt-3">most watched movies by days</p>
                    <div className={`${ styls.lineBottom }`}></div>
                </div>
                {this.props.movies.slice(0,).map((movie, index) =>
                    <motion.div
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        whileHover={{ scale: 1.2, }}
                        transition={{ type: 'spring', duration: .9 }}
                        className="col-md-2 text-center py-2 w-100  " key={index}>
                        <div className="m-2 ">
                            
                            <img className=" w-100 rounded border " src={`https://image.tmdb.org/t/p/w500/${ movie.poster_path }`} alt="" />
                            <h3 className="py-2 img-fluid ">{movie.title}</h3>
                        </div>

                    </motion.div>   

                )}

            </motion.div>





        );
    }
}

function mapStateToProps(state)
{
    return { movies: state.movies }
}

export default connect(mapStateToProps, { getMovies })(Movies);