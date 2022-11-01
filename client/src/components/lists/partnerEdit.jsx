import React, { Fragment,useEffect,useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PartnerEdit = (props) => {
  const params = useParams();
  const [partner,setPartner] = useState()
  const [partnerBranchs,setPartnerBranchs] = useState()
	const [error, setError] = useState("");
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPartner = async () => {
      try {
          const response = await axiosPrivate.get(`/partners/${params.partnerId}`, {
              signal: controller.signal
          });
          console.log(response.data);
          isMounted && setPartner(response.data);
      } catch (err) {
          setError(err);
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }

  const getPartnerBranchs = async () => {
    try {
        const response = await axiosPrivate.get(`/partnersBranchs/${params.partnerId}`, {
            signal: controller.signal
        });
        console.log(response.data);
        isMounted && setPartnerBranchs(response.data);
    } catch (err) {
        setError(err);
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}

  getPartner();
  getPartnerBranchs();



  return () => {
      isMounted = false;
      controller.abort();
  }
}, [])

  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Partner branchs" />
      <Container fluid={true}>
        <div className="edit-profile">
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                    <Row className="mb-2">
                      <div className="profile-title">
                        <h5 className="mb-1">{partner?.client_id}</h5>
                      </div>
                    </Row>
                    <Row>
                      <FormGroup>
                        <h6 className="form-label">Desc</h6>
                        <p>{partner?.full_desc}</p>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col sm="6" md="3">
                        <FormGroup>
                        <h6 className="form-label">Client name</h6>
                        <p>{partner?.client_name}</p>
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="3">
                        <FormGroup>
                        <h6 className="form-label">Technical contact</h6>
                        <p>{partner?.technical_contact}</p>
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="3">
                        <FormGroup>
                        <h6 className="form-label">Commercial contact</h6>
                        <p>{partner?.commercial_contact}</p>
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="3">
                        <FormGroup>
                        <h6 className="form-label">Active</h6>
                        <p>{partner?.active? 'Oui' : 'Non'}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                </CardBody>
              </Card>
            </Col>
              {partnerBranchs?.map((branch, i) => {
                return(
            <Col xl="6" key={i}>
                <Card>   
                <CardHeader className="bg-primary">
                  <h5 className="mb-0">
                    {branch.branch_id}
                  </h5>
                </CardHeader>
                  <CardBody>                     
                      {branch.active? <div className="ribbon ribbon-success ribbon-right">Actif</div> : <div className="ribbon ribbon-danger ribbon-right">Innactif</div>}
                      <Row>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_read</Label>                    
                          <Input type="switch" role="switch" name='members_read' checked={branch.grants.members_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_write</Label>                    
                          <Input type="switch" role="switch" name='members_write' checked={branch.grants.members_write}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_add</Label>                    
                          <Input type="switch" role="switch" name='members_add' checked={branch.grants.members_add}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_payment_schedules_read</Label>                    
                          <Input type="switch" role="switch" name='members_payment_schedules_read' checked={branch.grants.members_payment_schedules_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_products_read</Label>                    
                          <Input type="switch" role="switch" name='members_products_read' checked={branch.grants.members_products_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_statistics_read</Label>                    
                          <Input type="switch" role="switch" name='members_statistics_read' checked={branch.grants.members_statistics_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>members_subscription_read</Label>                    
                          <Input type="switch" role="switch" name='members_subscription_read' checked={branch.grants.members_subscription_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>payment_schedules_read</Label>                    
                          <Input type="switch" role="switch" name='payment_schedules_read' checked={branch.grants.payment_schedules_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>payment_schedules_write</Label>                    
                          <Input type="switch" role="switch" name='payment_schedules_write' checked={branch.grants.payment_schedules_write}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-2 my-1">      
                          <Label check>payment_day_read</Label>                    
                          <Input type="switch" role="switch" name='payment_day_read' checked={branch.grants.payment_day_read}/>
                        </FormGroup>
                      </Row>
                  </CardBody>     
                </Card>
            </Col>
              )})}
          </Row>
        </div>
      </Container>
    </Fragment>
  );
}

export default PartnerEdit;