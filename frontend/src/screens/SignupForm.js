import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import AlertBox from '../components/AlertBox'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

function SignupForm() {

    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            var nameArray = name.split(/(\s+)/);
            if (nameArray.length == 1) {
                nameArray.push(" ")
            }
            var user = {
                'username': username,
                'first_name': nameArray[0],
                'last_name': nameArray[1],
                'email': email,
                'password': password,
                'password_confirm': confirmPassword
            }

            fetch(
                '/accounts/register/',
                {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                    method: "POST"
                }
            ).then(response => {
                if (response.status == 400) {
                    setMessage("Couldn't sign up");
                } else {
                    window.location.replace('/dashboard')
                }
            })
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <AlertBox variant='danger'>{message}</AlertBox>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?
                    <Link to='/login'>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default SignupForm