import React from "react";

import { Col, Card, CardHeader, CardFooter, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const PartnerList = ({ partners }) => {
    return (
        partners.map((partner, i) => {
                return (                    
                        <Col md="6" lg="6" xl="4" className="box-col-6" key={i}>
                            <Card className="custom-card">
                                <CardHeader>
                                <div className="text-center profile-details">
                                    <Link to={`${partner._id}`}>
                                    <h4>{partner.client_id}</h4>
                                    </Link>
                                    <h6>{partner.install_id}</h6>
                                </div>
                                </CardHeader>
                                <CardFooter className="row">
                                    <Col sm="6 col-6">
                                    <h6>State</h6>
                                    {
                                        partner.active ?
                                        <Badge
                                            color="success"
                                            pill
                                        >
                                            Actif
                                        </Badge> :
                                        <Badge
                                        color="danger"
                                        pill
                                        >
                                            Non actif
                                        </Badge>
                                    }
                                    </Col>
                                    <Col sm="6 col-6">
                                    <h6>Branch ID</h6>
                                    <h3><span className="counter">{partner.branch_id}</span></h3>
                                    </Col>
                                </CardFooter>
                            </Card>
                        </Col>
                );
            })
    );
};

export default PartnerList;