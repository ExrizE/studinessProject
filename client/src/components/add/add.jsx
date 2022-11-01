import React, { useState,Fragment, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Label, Button,Nav,NavItem,NavLink,TabContent,TabPane } from 'reactstrap'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom'


const BaseInput = () => {
  const [BasicLineTab, setBasicLineTab] = useState('1');
	const [partnerBranchData, setPartnerBranchData] = useState({
		client_id: "",
		install_id: "",
		branch_id: "",
		active: false,
    grants: {
      members_read : false,
      members_write : false,
      members_add : false,
      members_payment_schedules_read : false,
      members_products_read : false,
      members_statistics_read : false,
      members_subscription_read : false,
      payment_schedules_read : false,
      payment_schedules_write : false,
      payment_day_read : false
    }
	});
	const [branchData, setBranchData] = useState({
		branch_id: "",
	});
	const [partnerData, setPartnerData] = useState({
		client_id: "",
    client_name: "",
    full_desc: "",
    email: "",
    active: true,
    technical_contact: "",
    commercial_contact: ""
	});
	const [error, setError] = useState("");
	const [branchs, setBranchs] = useState([]);
	const [partners, setPartners] = useState([]);
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  
  let isMounted = true;
  const controller = new AbortController();

  const getBranchs = async () => {
    try {
        const response = await axiosPrivate.get('/branchs', {
            signal: controller.signal
        });
        isMounted && setBranchs(response.data);
    } catch (err) {
        setError(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}
const getPartners = async () => {
    try {
        const response = await axiosPrivate.get('/partners', {
            signal: controller.signal
        });
        isMounted && setPartners(response.data);
    } catch (err) {
        setError(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}
  useEffect(() => {
    getBranchs();
    getPartners();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

  
	const handleChangeBranch = ({ currentTarget: input }) => {
		setBranchData({ ...branchData, [input.name]: input.value });
	};
	const handleChangePartner = ({ currentTarget: input }) => {
		setPartnerData({ ...partnerData, [input.name]: input.value });
	};
	const handleChangePartnerBranch = ({ currentTarget: input }) => {
    if(input.type === 'checkbox') {
      const nextGrants = { ...partnerBranchData.grants, [input.name]: input.checked };
      const Grants = { ...partnerBranchData, grants: nextGrants };
      setPartnerBranchData(Grants);
      return
    } 
		setPartnerBranchData({ ...partnerBranchData, [input.name]: input.value });
	};
  
  const addBranch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosPrivate.post('/branchs', branchData);
      console.log(response);
      setBranchData({
        branch_id: "",
      })
    } catch (err) {
        setError(err);
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
  };
  
  const addPartner = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosPrivate.post('/partners', partnerData);
      console.log(response);
      setBranchData({
        branch_id: "",
      })
    } catch (err) {
        setError(err);
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
  };
  
  const addPartnerBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post('/partnersBranchs', partnerBranchData);
      console.log(response);
      setPartnerBranchData({
        client_id: "",
        install_id: "",
        branch_id: "",
        active: true,
        grants: {
          members_read : false,
          members_write : false,
          members_add : false,
          members_payment_schedules_read : false,
          members_products_read : false,
          members_statistics_read : false,
          members_subscription_read : false,
          payment_schedules_read : false,
          payment_schedules_write : false,
          payment_day_read : false
        }
      })
    } catch (err) {
        setError(err);
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Ajout de partenaires / salles"/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
              <Col  sm="12" xl="6 xl-100">
                
              <Nav className="border-tab" tabs>
                       <NavItem>
                           <NavLink href="#javascript"  className={BasicLineTab === '1' ? 'active' : ''} onClick={() => {setBasicLineTab('1'); getBranchs(); getPartners()}}><i className="icofont icofont-people"></i>Ajout De Salle</NavLink>
                       </NavItem>
                       <NavItem>
                         <NavLink href="#javascript" className={BasicLineTab === '2' ? 'active' : ''} onClick={() => setBasicLineTab('2')}><i className="icofont icofont-building-alt"></i>Création De Salle</NavLink>
                       </NavItem>
                       <NavItem>
                         <NavLink href="#javascript" className={BasicLineTab === '3' ? 'active' : ''} onClick={() => setBasicLineTab('3')}><i className="icofont icofont-building-alt"></i>Création De Partenaire</NavLink>
                       </NavItem>
                     </Nav>
                     <TabContent activeTab={BasicLineTab}>
                       <TabPane  className="fade show" tabId="1">                        
                    <Form onSubmit={addPartnerBranch} className="needs-validation">
                      <Row>
                        <FormGroup className="col-sm-4">
                          <Label>Client ID</Label>
                          <Input className='form-control' type="select" name="client_id" onChange={handleChangePartnerBranch} value={partnerBranchData.client_id}>
                            {
                              partners.map((item, i) =>
                                <option key={i} value={item._id}>{item.client_id}</option>
                              )
                            }
                          </Input>
                        </FormGroup>
                        <FormGroup className="col-sm-4">
                          <Label>Install ID</Label>
                          <Input className='form-control' type='text' name='install_id' onChange={handleChangePartnerBranch} value={partnerBranchData.install_id}/>
                        </FormGroup>
                        <FormGroup className="col-sm-4">
                          <Label>Branch ID</Label>
                          <Input className='form-control' type="select" name="branch_id" onChange={handleChangePartnerBranch} value={partnerBranchData.branch_id}>
                            {
                              branchs.map((item, i) =>
                                <option key={i} value={item.branch_id}>{item.branch_id}</option>
                              )
                            }
                          </Input>
                        </FormGroup>
                      </Row>
                      <Row>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_read</Label>                    
                          <Input type="switch" role="switch" name='members_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_write</Label>                    
                          <Input type="switch" role="switch" name='members_write' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_write}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_add</Label>                    
                          <Input type="switch" role="switch" name='members_add' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_add}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_payment_schedules_read</Label>                    
                          <Input type="switch" role="switch" name='members_payment_schedules_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_payment_schedules_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_products_read</Label>                    
                          <Input type="switch" role="switch" name='members_products_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_products_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_statistics_read</Label>                    
                          <Input type="switch" role="switch" name='members_statistics_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_statistics_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>members_subscription_read</Label>                    
                          <Input type="switch" role="switch" name='members_subscription_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.members_subscription_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>payment_schedules_read</Label>                    
                          <Input type="switch" role="switch" name='payment_schedules_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.payment_schedules_read}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>payment_schedules_write</Label>                    
                          <Input type="switch" role="switch" name='payment_schedules_write' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.payment_schedules_write}/>
                        </FormGroup>
                        <FormGroup switch className="col-auto mx-4 my-1">      
                          <Label check>payment_day_read</Label>                    
                          <Input type="switch" role="switch" name='payment_day_read' onChange={handleChangePartnerBranch} checked={partnerBranchData.grants.payment_day_read}/>
                        </FormGroup>
                      </Row>
                      <Button color="primary" type="submit" className="mt-1 pull-right">Ajouter</Button>
                    </Form>
                       </TabPane>
                       <TabPane tabId="2">                                                
                        <Form onSubmit={addBranch} className="needs-validation">
                          <Row>
                            <FormGroup className="col-sm-6">
                              <Label>Branch ID</Label>
                              <Input className='form-control' type='text' name='branch_id' onChange={handleChangeBranch} value={branchData.branch_id}/>
                            </FormGroup>
                          </Row>
                          <Button color="primary" type="submit" className="mt-1 pull-right">Créer</Button>
                        </Form>
                       </TabPane>
                       <TabPane tabId="3">                                                
                        <Form onSubmit={addPartner} className="needs-validation">
                          <Row>
                            <FormGroup className="col-sm-4">
                              <Label>Client ID</Label>
                              <Input className='form-control' type='text' name='client_id' onChange={handleChangePartner} value={partnerData.client_id}/>
                            </FormGroup>
                            <FormGroup className="col-sm-4">
                              <Label>Client Name</Label>
                              <Input className='form-control' type='text' name='client_name' onChange={handleChangePartner} value={partnerData.client_name}/>
                            </FormGroup>
                            <FormGroup className="col-sm-4">
                              <Label>Active</Label>
                              <Input className='form-control' type="select" name="active" onChange={handleChangePartner} value={partnerData.active}>
                                  <option value={true}>Oui</option>
                                  <option value={false}>Non</option>
                              </Input>
                            </FormGroup>
                          </Row>
                          <Row>
                            <FormGroup className="col-12">
                              <Label>Full Description</Label>
                              <Input type="textarea" className="form-control" rows="5" name='full_desc' onChange={handleChangePartner} value={partnerData.full_desc}/>
                            </FormGroup>
                          </Row>
                          <Row>
                            <FormGroup className="col-sm-4">
                              <Label>Technical contact</Label>
                              <Input className='form-control' type='text' name='technical_contact' onChange={handleChangePartner} value={partnerData.technical_contact}/>
                            </FormGroup>
                            <FormGroup className="col-sm-4">
                              <Label>Commercial contact</Label>
                              <Input className='form-control' type='text' name='commercial_contact' onChange={handleChangePartner} value={partnerData.commercial_contact}/>
                            </FormGroup>
                            <FormGroup className="col-sm-4">
                              <Label>Email</Label>
                              <Input className='form-control' type='email' name='email' onChange={handleChangePartner} value={partnerData.email}/>
                            </FormGroup>
                          </Row>
                          <Button color="primary" type="submit" className="mt-1 pull-right">Créer</Button>
                        </Form>
                       </TabPane>
                     </TabContent> 
              </Col>
                </Row >
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BaseInput;