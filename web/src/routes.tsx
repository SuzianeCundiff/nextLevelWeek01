import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateCollectionPoint from './pages/CreateCollectionPoint'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={ Home } path='/' exact/>
            <Route component={ CreateCollectionPoint } path='/create-collection-point' />
        </ BrowserRouter>
    );
}

export default Routes; 