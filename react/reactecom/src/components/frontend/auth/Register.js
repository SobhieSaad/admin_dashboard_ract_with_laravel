

import React from 'react';
import Navbar from "../../../layouts/frontend/Navbar";


function Register() {
    return(
            <div>
                <Navbar/>
                <div className='container py-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div className='card'>
                            <div className='card-header'>
                                <h4>Register</h4>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group mb-3'>
                                            <label>Full Name</label>
                                            <input type='' name="name" value="" className='form-control' ></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Email ID</label>
                                            <input type='' name="email" value="" className='form-control' ></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Password</label>
                                            <input type='' name="password" value="" className='form-control' ></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Confirm Password</label>
                                            <input type='' name="confirm_password" value="" className='form-control' ></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <button type='submit' className='btn btn-primary'>Register</button>
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}


export default Register;