import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Input, Label, Button, Card, CardHeader, CardBody } from 'reactstrap'
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Logins = (props) => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
      console.log(validName)
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
      console.log(validPwd, validMatch)
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
          setErrMsg("Invalid Entry");
          return;
      }
      try {
          const response = await axios.post(REGISTER_URL,
              JSON.stringify({ user, pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );

          setSuccess(true);
          
          setUser('');
          setPwd('');
          setMatchPwd('');
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else {
              setErrMsg('Registration Failed')
          }
          errRef.current.focus();
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
                        <Input autoComplete="off" bsSize='lg' ref={userRef} id='username' className="form-control" type="text" required onChange={(e) => setUser(e.target.value)} value={user} />
                      </div>
                      <div className="mb-3 position-relative">
                        <Label className="col-form-label">Mot de passe</Label>
                        <Input autoComplete="off" bsSize='lg' id='password' className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </div>
                      <div className="mb-3 position-relative">
                        <Label className="col-form-label">Confirmer le mot de passe</Label>
                        <Input autoComplete="off" bsSize='lg' id='confirm_pwd' className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd} required />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </div>
                      <div className="login-btn mb-0">
                        <Button size="lg" block color="primary" disabled={!validName || !validPwd || !validMatch ? true : false} onClick={handleSubmit}>{loading ? "CHARGEMENT..." : "Se connecter"}</Button>
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