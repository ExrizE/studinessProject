import React from "react";

import { Col, Card, CardBody } from 'reactstrap'

const StoreList = ({ stores }) => {
    return (
            stores.map((store, i) => {
                return (                    
                        <Col md="6" lg="6" xl="4" className="box-col-6" key={i}>
                            <Card className="custom-card">
                                <CardBody className="row">
                                    <h3>{store.branch_id}</h3>
                                </CardBody>
                            </Card>
                        </Col>
                );
            })
    );
};

export default StoreList;