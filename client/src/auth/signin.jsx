import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Input, Label, Button, Card, CardHeader, CardBody } from 'reactstrap'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/auth';

const Logins = (props) => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('rafih');
  const [pwd, setPwd] = useState('You!035998');
  const [errMsg, setErrMsg] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);


  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
      e.preventDefault();
    setLoading(true)
      try {
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({ user, pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(JSON.stringify(response?.data));
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;
          setAuth({ user, pwd, roles, accessToken });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
      } catch (err) {
        setLoading(false)
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
      }
  }

  return (
    <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid" src={require("../assets/images/logo/login.png")} alt="" />
                </a>
              </div>
                <Card>
                  <CardHeader>
                    <h4>Connexion</h4>
                  </CardHeader>
                  <CardBody>        
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>  
                  <Form className="theme-form">
                      <div className="mb-3">
                        <Label className="col-form-label">Username</Label>
                        <Input bsSize='lg' id='username' className="form-control" ref={userRef} type="text" required onChange={(e) => setUser(e.target.value)} defaultValue={user} />
                      </div>
                      <div className="mb-3 position-relative">
                        <Label className="col-form-label">Mot de passe</Label>
                        <Input bsSize='lg' id='password' className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setPwd(e.target.value)} defaultValue={pwd} required />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </div>
                      <div className="login-btn mb-0">
                        <Button size="lg" block color="primary" disabled={loading ? loading : loading} onClick={handleSubmit}>{loading ? "CHARGEMENT..." : "Se connecter"}</Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Logins;