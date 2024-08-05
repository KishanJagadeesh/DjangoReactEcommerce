import React, {useState,useEffect, } from 'react'
import {Link, useLocation,useNavigate,useParams} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {getUserDetails,updateUsers} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'



function UserEditScreen({match}) {

    const {id}=useParams()
    const userId= id

    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [isAdmin, setAdmin]= useState(false)



    const [message, setMessage]=useState('')
    const location=useLocation()
    const navigate=useNavigate()

    const dispatch=useDispatch()


    const userDetails =useSelector(state => state.userDetails)
    const {error, loading, user}=userDetails

    const userUpdate =useSelector(state => state.userUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate}=userUpdate
    
    // const redirect =location.search? location.search.split('=')[1] : '/'
    
    

    useEffect(() => {

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }



        if(!user.name|| user._id !== Number(userId)){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
       
    },[user,userId, successUpdate])

    const submitHandler =(e) =>{
        e.preventDefault()
       dispatch(updateUsers({_id:user._id, name, email, isAdmin}))
    }
    
    
 

    
  return (
    <div>
        <Link to='/admin/userlist'>
            Go back
        </Link>
   <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/>: error ? <Message variant='danger'>{error}</Message>
        : (
            <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}>

                     </Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}>

                     </Form.Control>
        </Form.Group>
        <Form.Group controlId='isadmin'>
                  
                    <Form.Check
                        
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e)=> setAdmin(e.target.checked)}>
                            
                    </Form.Check>
        </Form.Group>
        
        <Button type='submit' variant='primary' className='my-3'>
                    Update
                </Button>
        </Form>
        )}
        
       
    </FormContainer>
    </div>
  )
}

export default  UserEditScreen
