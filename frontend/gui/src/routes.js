import React from 'react';
import { Route } from 'react-router-dom';
import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={(props) => (
            <ArticleList timestamp={new Date().toString()} />
        )} />
        <Route exact path='/:articleID' component={ArticleDetail} key={1} />
    </div>
);

export default BaseRouter;