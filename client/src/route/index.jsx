import React from 'react';

import RequireAuth from './RequireAuth';

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import AppLayout from '../components/layout';

import Loader from '../layout/loader';
import Signin from '../auth/signin';
import Register from '../auth/register';

import Dashboard from '../components/dashboard/index'

import Partners from '../components/lists/partners'
import PartnerEdit from '../components/lists/partnerEdit'
import Stores from '../components/lists/stores'

import Add from '../components/add/add'
import Error400 from '../pages/errors/error400'
import Validation from '../pages/validation'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const Routers = () => {
        return (
                <Suspense fallback={<Loader />}>
                        <Routes>
                                <Route path={`/login`} element={<Signin />} />
                                <Route path={`/register`} element={<Register />} />
                                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                                        <Route path='/' element={<AppLayout/>}>
                                                <Route exact path={`dashboard`} element={<Dashboard/>}/>
                                                <Route exact path={`lists/partners`} element={<Partners/>}/>
                                                <Route exact path={`lists/partners/:partnerId`} element={<PartnerEdit/>}/>
                                                <Route exact path={`lists/stores`} element={<Stores/>}/>
                                                <Route exact path={`add`} element={<Add/>}/>
                                        </Route>
                                </Route>
                                <Route path="/*" element={<Error400/>} />
                                <Route path="/validation/:id" element={<Validation/>} />
                        </Routes>
                </Suspense>
        );
};

export default Routers;