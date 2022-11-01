import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap'
import StoreList from "./storeList";
import PaginationNum from "./pagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const StoreCards = (props) => {

  const [stores, setStores] = useState([]);
  const [allData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storePerPage, setStorePerPage] = useState(6);
  const lastPostIndex = currentPage * storePerPage;
  const firstPostIndex = lastPostIndex - storePerPage;
  const currentPosts = allData.slice(firstPostIndex, lastPostIndex);
  const [queryState, setQueryState] = useState('all')
	const [error, setError] = useState("");
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStores = async () => {
        try {
            const response = await axiosPrivate.get('/branchs', {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setStores(response.data);
            setData(response.data)
        } catch (err) {
            setError(err);
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getStores();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

  const [filters, setFilters] = useState({
    branch_id: ""
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "branch_id":
        handleFilterName(value, queryState);
        break;
      default:
        break;
    }
  };
  
  const handleFilterName = (branch_id) => {
    const filteredData = stores.filter((item) => {   
        if (item.branch_id.toLowerCase().includes(branch_id.toLowerCase())) {
          return item;
        }
    });  

    setData(filteredData);
  };
  
  return (
    <Fragment>
      <Breadcrumb title="Stores" />
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
                        <Label for="branch_id">
                          Branch ID
                        </Label>
                        <Input
                          id="branch_id"
                          name="branch_id"
                          placeholder="Branch ID..."
                          type="text"
                          value={filters.branch_id}
                          onChange={handleInput("branch_id")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>      
          <StoreList stores={currentPosts} />
              <PaginationNum
                  totalPosts={allData.length}
                  cardsPerPage={storePerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
              />
        </Row>
      </Container>
    </Fragment>
  );
}

export default StoreCards;