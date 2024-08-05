import React, { useEffect } from 'react'
import {Link, useNavigate, useParams,useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col,ListGroup,Image, Form, Button,Card} from 'react-bootstrap'
import  Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'


function CartScreen({match}) {
  const location=useLocation();
  const {id} =useParams()
  const productId=id
//   from params will get qty value
  const qty = Number(new  URLSearchParams(location.search).get('qty'));
  const navigate= useNavigate()
  console.log(typeof(qty))
  const dispatch=  useDispatch()
  const cart =useSelector(state=>state.cart)
  const {cartItems} =cart 
  console.log('cartItems',cartItems)

  console.log('productid', productId)
  useEffect(()=>{
    if(productId){
        dispatch(addToCart(productId, qty))
    }
  }, [dispatch,productId,qty])
//   const qty=location.search.
  const removeFromCartHandler=(id)=> {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler=(id)=> {
    navigate('/shipping')
  }
  return (
    <Row>
        <Col md={8}> 
            <h1>Shopping Cart</h1>
            {cartItems.length===0? (
                <Message variant='info' >
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ): (
                <ListGroup variant='flush'>
                {cartItems.map(item=> (
                <ListGroup.Item key={item.product}>
                <Row>
                <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                    <Image></Image>
                </Col>
                <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>
                    ${item.price}
                </Col>
                <Col md={3} >
                <Form.Control
        
                as="select"
                value={item.qty}
                onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                {
                    // ... is array constructor - id count is 3 
                    // array will be [0,1,2]
                    [...Array(item.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>
                            {x+1}
                        </option>
                    ))
                        }
                </Form.Control>
                </Col>
                <Col md={1}>
                    <Button
                        type='button'
                        variant='light'
                        onClick={()=> removeFromCartHandler(item.product) }
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                </Col>
                </Row>
                </ListGroup.Item>
            ))

                    }
                </ListGroup>
            )
            }
        </Col>

        <Col md={4}>
            <ListGroup variant='flush'>
                <Card>
                <ListGroup.Item>
                <h2>
                  SUBTOTAL ({cartItems.reduce ((acc,item)=> acc +item.qty,0)}) 
                  ITEMS
                </h2>
                ${cartItems.reduce ((acc,item)=> acc + item.qty*item.price ,0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length===0}
                    onClick={checkoutHandler}
                    >
                    PROCEED TO CHECKOUT

                    </Button>
                </ListGroup.Item>
                </Card>

            </ListGroup>
        </Col>
    </Row>
  )
}

export default CartScreen