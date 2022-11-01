import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap'
import PartnerList from "./partnerList";
import PaginationNum from "./pagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const PartnerCards = (props) => {

  const [partners, setPartners] = useState([]);
  const [allData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [partnersPerPage, setPartnersPerPage] = useState(6);
  const lastPostIndex = currentPage * partnersPerPage;
  const firstPostIndex = lastPostIndex - partnersPerPage;
  const currentPosts = allData.slice(firstPostIndex, lastPostIndex);
  const [queryState, setQueryState] = useState('all')
	const [error, setError] = useState("");
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPartners = async () => {
        try {
            const response = await axiosPrivate.get('/partners', {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setPartners(response.data);
            setData(response.data)
        } catch (err) {
            setError(err);
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getPartners();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

  const [filters, setFilters] = useState({
    client_id: "",
    branch_id: ""
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "client_id":
        handleFilterID(value, queryState);
        break;
      case "branch_id":
        handleFilterName(value, queryState);
        break;
      default:
        break;
    }
  };
  
  const handleFilterID = (client_id, state) => {
    const filteredData = partners.filter((item) => {      
      if(state === 'active') {
        if (item.client_id.toLowerCase().includes(client_id.toLowerCase()) && item.active ) {
          return item;
        }
        console.log('active')
      } else if (state === 'unactive') {
        if (item.client_id.toLowerCase().includes(client_id.toLowerCase()) && !item.active ) {
          return item;
        }
        console.log('unactive')
      } else if (state === 'all') {
        console.log('all')
        if (item.client_id.toLowerCase().includes(client_id.toLowerCase())) {
          return item;
        }
      }
    });  

    setData(filteredData);
  };
  const handleFilterName = (branch_id, state) => {
    const filteredData = partners.filter((item) => {      
      if(state === 'active') {
        if (item.branch_id.toLowerCase().includes(branch_id.toLowerCase()) && item.active ) {
          return item;
        }
        console.log('active')
      } else if (state === 'unactive') {
        if (item.branch_id.toLowerCase().includes(branch_id.toLowerCase()) && !item.active ) {
          return item;
        }
        console.log('unactive')
      } else if (state === 'all') {
        console.log('all')
        if (item.branch_id.toLowerCase().includes(branch_id.toLowerCase())) {
          return item;
        }
      }
    });  

    setData(filteredData);
  };

  const handleState = (event) => {
    const getStateValue = event.target.value;
    setQueryState(getStateValue)
    filterState(getStateValue)
  }
  const filterState = (value) => {
    if(value === 'active') {
      const searchdata = partners.filter( (item)=> item.active === true  )
      setData(searchdata);
    } else if (value === 'unactive') {
      const searchdata = partners.filter( (item)=> item.active === false)
      setData(searchdata);
    } else if (value === 'all') {
      setData(partners)
    }
  }
  return (
    <Fragment>
      <Breadcrumb title="Partners" />
      <Container fluid={true}>        
        <Row>          
          <Col xl="12">
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Filtres</h4>
              </CardHeader>
              <CardBody>
                  <Row className='justify-content-between'>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="client_name">
                          Client name
                        </Label>
                        <Input
                          id="client_name"
                          name="client_name"
                          placeholder="Client name..."
                          type="text"
                          value={filters.client_id}
                          onChange={handleInput("client_id")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="client_id">
                          Client ID
                        </Label>
                        <Input
                          id="client_id"
                          name="client_id"
                          placeholder="Client ID..."
                          type="text"
                          value={filters.branch_id}
                          onChange={handleInput("branch_id")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Form>
                      <FormGroup check inline>
                        <Label className="d-block">
                          <Input className="radio_animated" type="radio" value="all" checked={queryState === 'all'} onChange={e=>handleState(e)}/>Tout
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label className="d-block">
                          <Input className="radio_animated" type="radio" value="active" checked={queryState === 'active'} onChange={e=>handleState(e)}/>Actif
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label className="d-block">
                          <Input className="radio_animated" type="radio" value="unactive" checked={queryState === 'unactive'} onChange={e=>handleState(e)}/>Inactif
                        </Label>
                      </FormGroup>
                    </Form>
                  </Row>
              </CardBody>
            </Card>
          </Col>      
          <PartnerList partners={currentPosts} />
              <PaginationNum
                  totalPosts={allData.length}
                  cardsPerPage={partnersPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
              />
        </Row>
      </Container>
    </Fragment>
  );
}

export default PartnerCards;