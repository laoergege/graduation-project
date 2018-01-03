import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";

export default class App extends Component {

    componentWillMount(){
        Meteor.subscribe('Meteor.users.initials');
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Index} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}
