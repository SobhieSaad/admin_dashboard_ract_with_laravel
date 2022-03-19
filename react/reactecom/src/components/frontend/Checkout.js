import axios from "axios";
import  ReactDOM  from "react-dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";


function Checkout(){
 
    const [loading,setLoading]=useState(true);
    const history= useHistory();
    const [cart,setCart]=useState([]);
    var totalCartPrice=0;
    const [errors,setErrors]=useState([]);
    const [checkoutInput,setCheckoutInput]=useState({
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:''
    });

    if(!localStorage.getItem("auth_token")){
        history.push('/');
        swal("Warning","Login first to view cart details","error");
    }

   

    useEffect(()=>{

        let isMounted=true;
  
        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status===200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status===401)
                {
                    history.push('/');
                    swal("Warning",res.data.message,'Error')
                }
                
            }
        });
        return ()=>{isMounted=false}
    },[history]);

    const handleInput = (e) =>{
        e.persist();
        setCheckoutInput({...checkoutInput,[e.target.name]: e.target.value});
    }

    /////////////////////////////////
    //PAYPAL CODE
    const orderData={
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        city: checkoutInput.city,
        state: checkoutInput.state,
        zipcode: checkoutInput.zipcode,
        paymentMode: 'Paid by PayPal',
        payment_id:''
    }
    const PayPalButton= window.paypal.Button.driver('react',{React,ReactDOM});
    const createOrder=(data,actions) =>{
        return actions.order.create({
            purchase_units:[
                {
                    amount: {
                        value: totalCartPrice
                    }
                }
            ]        
    })
    }
    const onApprove = (data,actions) =>{
        // return actions.order.capture();
        return actions.order.capture().then(function(details){
            orderData.payment_id = details.id;
            axios.post(`/api/place-order`,orderData).then(res=>{
                if(res.data.status===200)
                {
                    swal("Order placed successfully", res.data.message,'success');
                    setErrors([]);
                    history.push('/thank-you')
                }
                else if(res.data.status === 422)
                {
                    swal("Error fields required","", 'error')
                    setErrors(res.data.errors);
                }
            })
        });
    }

    /////////////////////////////////
    const submitOrder =(e,paymentMode)=>{
        e.preventDefault();
        const data={
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            paymentMode:paymentMode,
            payment_id:''
        }

        switch(paymentMode)
        {
            case 'cod':
                axios.post(`/api/place-order`,data).then(res=>{
                    if(res.data.status===200)
                    {
                        swal("Order placed successfully", res.data.message,'success');
                        setErrors([]);
                        history.push('/thank-you')
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Error fields required","", 'error')
                        setErrors(res.data.errors);
                    }
                })
            break;
            case 'razorpay':
                axios.post(`/api/validate-order`,data).then(res=>{
                    if(res.data.status === 200)
                    {
                        setErrors([]); 
                        var options = {
                            "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
                            "amount": (totalCartPrice * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                            "name": "Company name",
                            "description": "Test Transaction",
                            "image": "https://example.com/your_logo",
                            "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                            "handler": function (response){
                                data.payment_id=response.razorpay_payment_id;
                                axios.post(`/api/place-order`,data).then(res=>{
                                    if(res.data.status===200)
                                    {
                                        swal("Order placed successfully", res.data.message,'success');
                                        setErrors([]);
                                        history.push('/thank-you')
                                    }
                                    
                                })
                            },
                            "prefill": {
                                "name": data.firstname + data.lastname,
                                "email": data.email,
                                "contact": data.phone
                            },
                            "theme": {
                                "color": "#3399cc"
                            }
                        };
                        var rzp = new window.Razorpay(options); 
                        rzp.open();                  
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Error fields required","", 'error')
                        setErrors(res.data.errors);
                    }
                })
            break;
            case 'payonline':
                axios.post(`/api/validate-order`,data).then(res=>{
                    if(res.data.status === 200)
                    {
                        setErrors([]); 
                        var myModal= new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
                        myModal.show();
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Error fields required","", 'error')
                        setErrors(res.data.errors);
                    }
                })
                break;
            default:

            break;
        }
    }
    if(loading)
    {
        return <h5>Loading...</h5>
    }

    var checkout_HTML='';
    if(cart.length >0)
    {
        checkout_HTML=  
        <div>
            <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Basic information</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> First Name </label>
                                                <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                                <small className="text-danger">{errors?.firstname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Last Name </label>
                                                <input type="text" name="lastname"  onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                                <small className="text-danger">{errors?.lastname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Phone Number </label>
                                                <input type="text" name="phone"  onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                                <small className="text-danger">{errors?.phone}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Email </label>
                                                <input type="text" name="email"  onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                                <small className="text-danger">{errors?.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label> Full Address </label>
                                                <textarea rows="3" name="address"  onChange={handleInput} value={checkoutInput.address}className="form-control" />
                                                <small className="text-danger">{errors?.address}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label> City </label>
                                                <input type="text" name="city"  onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                                <small className="text-danger">{errors?.city}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label> State </label>
                                                <input type="text" name="state"  onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                                <small className="text-danger">{errors?.state}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label> Zip code </label>
                                                <input type="text" name="zipcode"  onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                                <small className="text-danger">{errors?.zipcode}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <button type="button" className="btn btn-primary mx-1" onClick={(e)=>submitOrder(e,'cod')}>Place Order</button>
                                                <button type="button" className="btn btn-primary mx-1" onClick={(e)=>submitOrder(e,'razorpay')}>Pay Online</button>
                                                <button type="button" className="btn btn-warning mx-1" onClick={(e)=>submitOrder(e,'payonline')}>Pay Pal</button>

                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th width="50%">Prouduct</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cart.map((item,idx)=>{
                                        totalCartPrice += item.product.selling_price * item.product_qty;
                                        return(
                                            
                                            <tr key={idx}>
                                                <td>{item.product.name}</td>
                                                <td>{item.product.selling_price}</td>
                                                <td>{item.product_qty}</td>
                                                <td>{item.product.selling_price * item.product_qty}</td>
                                            </tr>
                                    )})}
                                    <tr>
                                        <td colSpan="2" className="text-end fw-bold">
                                            Grand Total
                                        </td>
                                        <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
        </div>
    }
    else 
    {
        checkout_HTML=
        <div className="card card-body py-5 text-center shadow-sm">
            <h4>Your shopping cart is empty</h4>
        </div>
    }
    return(
        <div>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="payOnlineModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Online payment mode</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <hr/>
                    <PayPalButton
                        createOrder={(data,actions) => createOrder(data,actions)}
                        onApprove={(data,actions) => onApprove(data,actions)}
                    />
                </div>

                </div>
            </div>
            </div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home/ Checkout</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    {checkout_HTML}
                </div>
             </div>
        </div>

    );

}

export default Checkout;