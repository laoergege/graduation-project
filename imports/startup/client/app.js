import React, { Component } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";
import Courses from "../../ui/components/courses";
import Course from "../../ui/components/main";

export default class App extends Component {

    componentWillMount() {
        Meteor.subscribe('Meteor.users.initials');
        Meteor.subscribe('courses', {limit: 4, length: 0});
    }

    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="/courses" />
                <Route path="/" render={() => {
                    return(
                        <Index>
                            <Route exact path="/courses" component={Courses} />
                            <Route path="/courses/:id" component={Course} {...this.props} />
                        </Index>
                    )
                }}>
                </Route>
                <Route component={NotFound} />
            </Switch>
        )
    }
}
