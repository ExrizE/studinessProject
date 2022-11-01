import React, { Fragment, useEffect } from 'react';
import {Container} from 'reactstrap'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from 'react-router-dom'
const Validation = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
 
  useEffect(() => {
    
  const validateBranch = async () => {
    try {
      const response = await axiosPrivate.post('/partnersBranchs/'+params.id);
      console.log(response);
    } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
  };
  validateBranch()
  }, [])

    return (
        <Fragment>
        <div className="page-wrapper">
        <div className="error-wrapper">
          <Container>
            <ul className="maintenance-icons">
              <li><i className="fa fa-check"></i></li>
              <li><i className="fa fa-check"></i></li>
              <li><i className="fa fa-check"></i></li>
            </ul>
            <div className="maintenance-heading">
              <h2 className="headline">STRUCTURE AJOUTEE</h2>
            </div>
          </Container>
        </div>
      </div>
      </Fragment>
    );
}

export default Validation;