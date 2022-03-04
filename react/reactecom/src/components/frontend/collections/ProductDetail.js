import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";


function ProductDetail(props){

    const [loading,setLoading]=useState(true);
    const [product,setProduct]=useState([]);
    const history= useHistory();

    const [qty,setQTY]=useState(1);

    useEffect(()=>{

        let isMounted=true;
        const category_slug=props.match.params.category;
        const prodcut_slug=props.match.params.product;
        axios.get(`/api/view-product-normal-user/${category_slug}/${prodcut_slug}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status===200)
                {
                    setProduct(res.data.product);
                    setLoading(false);
                }
                else if(res.data.status===404)
                {
                    history.push('/collections');
                    swal("warning",res.data.message,'Error')
                }
                
            }
        });
        return ()=>{isMounted=false}
    },[props.match.params.prodcut,props.match.params.category,history])


    //no less than 1 - Hooks start
    const handleDecrement = ()=>{
        if(qty > 1){
            setQTY(prevCount=>prevCount - 1);
        }
    }

    //no more than 10 - Hooks end
    const handleIncrement = ()=>{
        if(qty < 10){
        setQTY(prevCount=>prevCount + 1);
        }
    }

    const submitAddProductToCart =(e)=>{
        e.preventDefault();

        const data={
            product_id: product.id,
            product_qty: qty,
        }

        axios.post(`/api/add-to-cart`,data).then(res=>{
            if(res.data.status ===201)
            {
                swal("Success",res.data.message,"success")
            }
            else if(res.data.status === 409)
            {
                swal("Warning",res.data.message,"warning")
            }
            else if(res.data.status === 401)
            {               
                 swal("Warning",res.data.message,"warning")
            }
            else if(res.data.status === 404)
            {               
                 swal("Warning",res.data.message,"warning")
            }
        });

    }
    if(loading)
    {
        return <h5>Loading...</h5>
    }
    else
    {

        var available='';
        
        if(product.quantity >0)
        {
        available= <div>
                <label className="btn-sm btn-success px-4 mt-2">In stock</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{qty}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                        </div>

                    </div>
                    <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={submitAddProductToCart}>Add To cart</button>
                    </div>
                </div>
        </div>
        }
        else
        {
            available= <div>
                <label className="btn-sm btn-danger px-4 mt-2">Out of stock stock</label>
                </div>;
        }

    }
    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections/ {product.category.name}/ {product.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`http://localhost:8000/${product.image}`} alt={product.name} className="w-100" />
                        </div>

                        <div className="col-md-8">
                            <h4>
                            {product.name}
                                <span className="float-end badge btn-sm btn-danger badge-pil">{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className="mb-1">
                                Rs: {product.selling_price}
                                <s className="ms-2">RS: {product.original_price}</s>
                            </h4>
                            <div>
                                {available}
                            </div>
                            <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProductDetail;