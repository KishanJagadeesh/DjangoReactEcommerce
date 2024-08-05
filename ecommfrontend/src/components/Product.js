import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

function Product({product}) {
    console.log('Product Rating:', product.rating);
  return (

    // cards are used to give a product box layouts in the screen
    // cards have multiple feature in them like add image, title,text,etc
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image}/>
        </Link>
        <Card.Body>
            <a href={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="div">
                    <div className='my-3'>
                    <Rating
                        text={`${product.numReviews} reviews`}
                        color={'#f8e825'}
                        value={product.rating}
                        />
                    </div>

                </Card.Text>
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>

            </a>
        </Card.Body>

    </Card>
  )
}


export default Product