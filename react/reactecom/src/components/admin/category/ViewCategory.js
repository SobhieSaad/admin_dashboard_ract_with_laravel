import axios from "axios";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";


function ViewCategory(){



    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(()=>{
        axios.get(`api/view-category`).then(res=>{
            if(res.status===2000){
                setCategoryList(res.data.category);
            }
            setLoading(false);
        })
    },[]);

    var viewCategory_HTML_TABLE="";
    if(loading){
        return <h4>Loading category...</h4>
    }
    else{
        viewCategory_HTML_TABLE=
        categoryList.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        })
    }
    return(
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Category list</h4>
                    <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add category</Link>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory_HTML_TABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;