import axios from "axios";
import React,{useEffect,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditProduct(props){

    const history= useHistory();
    const [categoryList, setCategoryList] = useState([])

    const [errorList, setError] = useState([])

    const [loading, setLoading] = useState(true)

    const [productInput, setProduct] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',
        meta_title:'',
        meta_keyword:'',
        meta_description:'',
        selling_price:'',
        original_price:'',
        quantity:'',
        brand:'',
       
    });

    const [picture, setPicture] = useState([]);


    const handleInput =(e)=>{
        e.persist();
        setProduct({...productInput,[e.target.name]: e.target.value});
    }

    const handleImage =(e)=>{
        setPicture({image: e.target.files[0]});
    }

    const [allCheckBox,setChecBoxes] = useState([]);
    const handleCheckBox =(e)=>{
        e.persist();
        setChecBoxes({...allCheckBox,[e.target.name]: e.target.checked});
    }

    useEffect(() => {
      axios.get(`api/all-category`).then(res=>{
        if(res.data.status===200){
            setCategoryList(res.data.category);
        }
      })
    
      const product_id=props.match.params.id;

      axios.get(`api/edit-product/${product_id}`).then(res=>{
        if(res.data.status ===200)
        {
            setProduct(res.data.product);
            setChecBoxes(res.data.product);
        }
        else if(res.data.status ===404)
        {
            swal("Error",res.data.message,'error');
            history.push('admin/view-product')
        }
        setLoading(false);
      })
    }, [props.match.params.id,history])
    
    const updateProduct = (e)=>{
        e.preventDefault();

        const formData=new FormData();

        formData.append('image',picture.image);
        formData.append('category_id',productInput.category_id);
        formData.append('slug',productInput.slug);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);
        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('meta_description',productInput.meta_description);
        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('quantity',productInput.quantity);
        formData.append('featured',productInput.featured);
        formData.append('popular',allCheckBox.popular?'1':'0');
        formData.append('brand',allCheckBox.brand?'1':'0');
        formData.append('status',allCheckBox.status?'1':'0');

        const product_id=props.match.params.id;

        axios.post(`api/update-product/${product_id}`,formData).then(res=>{
            if(res.data.status===200){
                swal('Success',res.data.message,'success');
                setError([]);
               
            }
            else if(res.data.status===422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Erro",res.data.message,"error");
                history.push('admin/view-product');
            }
        });
    }


    if(loading)
    {
        return <h4>Loading product</h4>;
    }
    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                <h4>Edit product | 
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View product</Link>
                </h4>
                </div>
                <form encType="multipart/form-data" onSubmit={updateProduct} id="add_product_form"> 

                <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other details</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group mb-3">
                                <label>Select Category</label>
                                <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                    <option>Select Category</option>
                                    {
                                        categoryList.map((item)=>{
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <small className="text-danger">{errorList?.category_id}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Slug</label>
                                <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                <small className="text-danger">{errorList?.slug}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                <small className="text-danger">{errorList?.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control" ></textarea>
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                            <div className="form-group mb-3">
                                <label>Meta Title</label>
                                <input type="text" name="meta_title"  onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                <small className="text-danger">{errorList?.meta_title}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Keywords</label>
                                <textarea name="meta_keyword"  onChange={handleInput} value={productInput.meta_keyword} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Description</label>
                                <textarea name="meta_description"  onChange={handleInput} value={productInput.meta_description} className="form-control" />
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                            <div className="row">
                                <div className="col-md-4 form-group mb-3">
                                    <label>Selling price</label>
                                    <input type="text" onChange={handleInput} value={productInput.selling_price} name="selling_price" className="form-control" />
                                    <small className="text-danger">{errorList?.selling_price}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Orginial price</label>
                                    <input type="text" onChange={handleInput} value={productInput.original_price} name="original_price" className="form-control" />
                                    <small className="text-danger">{errorList?.original_price}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Quality</label>
                                    <input type="text" onChange={handleInput} value={productInput.quantity} name="quantity" className="form-control" />
                                    <small className="text-danger">{errorList?.quantity}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Brand</label>
                                    <input type="text" onChange={handleInput} value={productInput.brand} name="brand" className="form-control" />
                                    <small className="text-danger">{errorList?.brand}</small>
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                    <label>Image</label>
                                    <input type="file" onChange={handleImage}  name="image" className="form-control" />
                                    <img src={`http://localhost:8000/${productInput.image}`} width="50" height="50" />
                                    <small className="text-danger">{errorList?.image}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Featured (Checked-shown)</label>
                                    <input type="checkbox" onChange={handleCheckBox} defaultChecked={allCheckBox.featured ===1? true:false } name="featured" className="w-50 h-50" />
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Popular (Checked-shown)</label>
                                    <input type="checkbox" name="popular" onChange={handleCheckBox} defaultChecked={allCheckBox.popular===1? true:false} className="w-50 h-50" />
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Status (Checked-hidden)</label>
                                    <input type="checkbox" name="status" onChange={handleCheckBox} defaultChecked={allCheckBox.status===1? true:false} className="w-50 h-50" />
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    
                </div>
                <button className="btn btn-primary px-4 mt-2 float-end" type="submit"> Submit</button>
                </form>
            </div>
            
        </div>
    );
}

export default EditProduct;