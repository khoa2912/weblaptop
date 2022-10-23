import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/Input'
import { useEffect } from "react";

/**
* @author
* @function Signup
**/

export const Signup = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user.loading) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }
    }, [user.loading]);
    const userSignup = (e) => {

        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    if (user.loading) {
        return <p>Loading...!</p>
    }

    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="Họ"
                                        placeholder="Họ"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Tên"
                                        placeholder="Tên"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <Input
                                label="Mật khẩu"
                                placeholder="Mật khẩu"
                                value={password}
                                type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <ul></ul>
                            <Button variant="primary" type="submit">
                                Đăng ký
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}