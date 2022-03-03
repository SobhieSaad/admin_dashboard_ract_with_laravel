

import React, {useState} from 'react';
import Navbar from "../../../layouts/frontend/Navbar";
import axios from 'axios';
import swal from 'sweetalert';

import { useHistory } from 'react-router-dom';
function Register() {

    const history=useHistory();
    const [registerInput, setRegister] = useState({
        name:'',
        email:'',
        password: '',
    });

    const handleInput = (e)=>{
        e.persist();
        setRegister({...registerInput,[e.target.name]: e.target.value})

    }

    const registerSubmit= (e)=>{
        e.preventDefault();

        const data={
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            error_list:[]
        }

        axios.get('/sanctum/csrf-cookie').then(response => {

        axios.post(`/api/register`,data).then(res=>{
            if(res.data.status===200){
                localStorage.setItem("auth_token",res.data.token);
                localStorage.setItem("auth_name",res.data.username);
                swal("success",res.data.message,"success");
                history.push("/");
            }else{
                
                setRegister({ ...registerInput, error_list:res.data.validation_errors})
            }
        })
    });
    }

    return(
            <div>
              
                <div className='container py-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div className='card'>
                            <div className='card-header'>
                                <h4>Register</h4>
                                <div className='card-body'>
                                    <form onSubmit={registerSubmit}>
                                        <div className='form-group mb-3'>
                                            <label>Full Name</label>
                                            <input type='' name="name" onChange={handleInput} value={registerInput.name} className='form-control' ></input>
                                            <span>{registerInput.error_list?.name}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Email ID</label>
                                            <input type='' name="email" onChange={handleInput} value={registerInput.email} className='form-control' ></input>
                                            <span>{registerInput.error_list?.email}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Password</label>
                                            <input type='password' name="password" onChange={handleInput} value={registerInput.password} className='form-control' ></input>
                                            <span>{registerInput.error_list?.password}</span>
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