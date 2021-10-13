import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import AlertBox from "../components/AlertBox";

function LoginScreen({ message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      window.location.replace("/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: email,
      password: password,
    };
    fetch("/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access) {
          localStorage.clear();
          localStorage.setItem("userToken", JSON.stringify(data));
          window.location.replace("/");
        } else {
          setEmail("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <FormContainer>
      {errors === true && (
        <AlertBox variant="danger">
          Cannot log in with provided credentials
        </AlertBox>
      )}

      <h1> Sign In </h1>
      {loading === false && (
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Email or user ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label> Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>
      )}

      <Row className="py-3">
        <Col>
          <Link to="/signup">
            <Button variant="primary">Register</Button>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
