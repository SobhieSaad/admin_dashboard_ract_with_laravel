import axios from "axios";
import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";

function Order(){

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted= true;
        document.title="View orders";
        axios.get(`api/admin/orders`).then(res=>{
            if(isMounted)
            {
                if(res.data.status===200)
                {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
      });
      return ()=>{
          isMounted = false;
      }
    }, []);

    var ordersList='';
    if(loading)
    {
        return <h4>Loading</h4>
    }
    else
    {
        ordersList=
        orders.map((item)=>{
            
            return (
                <tr key={item.id}>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to={`view-order/${item.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>
                </tr>
            )
        })

    }
    
    return(
        <div className="card px-3">
            <div className="card-header">
                <h4>View Orders</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-boardered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tracking number</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Order;