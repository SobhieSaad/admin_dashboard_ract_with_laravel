import axios from "axios";
import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";

function ViewProduct(){

    const [productList, setProduct] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted= true;
        document.title="View product";
        axios.get(`api/view-product`).then(res=>{
            if(isMounted)
            {
                if(res.data.status===200)
                {
                    setProduct(res.data.product);
                    setLoading(false);
                }
            }
      });
      return ()=>{
          isMounted = false;
      }
    }, []);
    
    var view_products='';
    if(loading)
    {
        return <h4>Loading products...</h4>
    }
    else
    {
        var productStatus='';
        view_products=
        productList.map((item)=>{
            if(item.status ===0 )
            {
                productStatus="Shown"
            }
            else if(item.status===1){
                productStatus="Hidden"
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="100px" height="100" alt={item.name}/></td>
                    <td>
                        <Link to={`/admin/edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        {productStatus}
                    </td>
                </tr>
            )
        })

    }
    return(
        <div className="card px-3">
            <div className="card-header">
                <h4>View product | 
                    <Link to="admin/add-product" className="btn btn-primary btn-sm float-end">Add product</Link>
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-boardered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Selling Price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {view_products}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;