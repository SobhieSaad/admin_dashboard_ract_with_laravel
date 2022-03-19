import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";


function ViewProduct(props){

    const [loading,setLoading]=useState(true);
    const [product,setProduct]=useState([]);
    const [category,setCategory]=useState([]);
    const history= useHistory();


    useEffect(()=>{

        let isMounted=true;
        const prodcut_slug=props.match.params.slug;
        axios.get(`/api/fetchProducts/${prodcut_slug}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status===200)
                {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading(false);
                }
                else if(res.data.status===400)
                {
                    history.push('/collections');
                    swal("warning",res.data.message,'Error')
                }
                else if(res.data.status===404)
                {
                    history.push('/collections');
                    swal("warning",res.data.message,'Error')
                }
                
            }
        });
        return ()=>{isMounted=false};
    },[props.match.params.slug,history])


    if(loading)
    {
        return <h4>Loading products...</h4>
    }
    else
    {
        const prodcutCount=product.length;
        var showProductList='';
        if(prodcutCount){
        showProductList=product.map((item,idx)=>{
            return (
                <div className="col-md-3" key={idx}>
                    <div className="card">
                        {/* relation ship in laravel */}
                        <Link to={`/collections/${item.category.slug}/${item.slug}`} >
                        <img src={`http://localhost:8000/${item.image}`} className="w-100" height="300px" alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`} >
                            <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        });
    }
    else
    {
        showProductList=
        <div className="col-md-12">
            <h4>No product under this category: {category.name}</h4>            
        </div>
    }
    }

    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections/ {category.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                    {showProductList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;