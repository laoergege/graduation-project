import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import { BrowserRouter, Route, IndexRoute } from 'react-router-dom'

import Index from "../../ui/pages/index";

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' render={() => {
                    return (<Index />)
                }} >
                </Route>
            </BrowserRouter>
        )
    }
}

export default withTracker((props) => {
    return {
        children: props.children
    }
})(App);