import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";


function ViewCategory(){

    const [category, setCategory] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        let isMounted=true;
        axios.get(`/api/getCategory`).then(res=>{
            if(isMounted)
            {
            if(res.data.status===200)
            {
                setCategory(res.data.category);
                setLoading(false);
            }
            }
        });
        return ()=>{isMounted=false;}
    })

    if(loading)
    {
        return <h4>Loading...</h4>
    }
    else
    {
        var showCAtegoryList='';
        showCAtegoryList=category.map((item,idx)=>{
            return (
                <div className="col-md-4" key={idx}>
                <div className="card">
                    
                    <div className="card-body">
                        <Link to={`collections/${item.slug}`}>
                            <h5>{item.name}</h5>
                        </Link>
                    </div>
                </div>
            </div>
            );
        })
    }
    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                    {showCAtegoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ViewCategory;