import React, { useEffect, useState } from 'react'

import { Col ,Row} from 'react-bootstrap'

import Product from '../components/Product'
// usedispatch - helps us dipatch the action and selector helps us select 
// certain part of our state where our redux stores like productList
import { UseDispatch ,useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function HomeScreen() {
  const dispatch=useDispatch()
  const productList=useSelector(state=> state.productList)
  const{error, loading, products}=productList
  
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch] )

  // const products=[]
  
  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products ? (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={4} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : null}
    </div>
  );
}


export default HomeScreen