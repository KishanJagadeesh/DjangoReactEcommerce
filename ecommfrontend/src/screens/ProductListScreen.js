import React, {useState,useEffect, } from 'react'
import {Link, useLocation,useNavigate,useParams} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts,createProduct ,deleteProduct,productDetails} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen() {

  const {id} =useParams()
  const productId=id  
  
  const dispatch=useDispatch()
  
  const productList=useSelector(state=> state.productList)
  const {loading, error, products}=productList

  const productDelete=useSelector(state=> state.productDelete)
  const {loading:loadingDelete, error:errorDelete, success:successDelete}=productDelete

  const productCreate=useSelector(state=> state.productCreate)
  const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct}=productCreate

  const userLogin=useSelector(state=> state.userLogin)
  const {userInfo}=userLogin

  const productDetails =useSelector(state => state.productDetails)
    const {error:detailsError, loading:detailsLoading, product:detailsProduct}=productDetails
  

  
  const navigate=useNavigate()

  useEffect(() => {

    dispatch({type: PRODUCT_CREATE_RESET})
    if(!userInfo.isAdmin  ){

        navigate('/login')
    }
    
    if(successCreate){
       
        navigate(`/admin/product/${createdProduct._id}/edit`)
   
    }

    else{
        dispatch(listProducts())
    }

  },[dispatch,userInfo,navigate,successDelete, successCreate, createdProduct,productId])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')){
        dispatch(deleteProduct(id))
}
  }

  const createProductHandler =()=>{

    dispatch(createProduct())

  }



  return (
    <div>
       <Row className='align-items-center'>
            <Col>
                <h1>Products</h1> 
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
       </Row>
       {loadingDelete && <Loader/>}
       {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

       {loadingCreate && <Loader/>}
       {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {
            loading
            ? (<Loader/>)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                :(
                    <Table striped  border="true" hover responsive className='table-sm'>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                            </tr>
                        </thead>

                        <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                    </Table>
                )
        }
    </div>
  )
}

export default ProductListScreen