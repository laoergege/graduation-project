import React, { Component } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";
import Courses from "../../ui/components/courses";
import Course from "../../ui/components/main";
import { courses } from "../../api/course";
import Main from "../../ui/components/main";

export default class App extends Component {

    componentWillMount() {
        Meteor.subscribe('Meteor.users.initials');
        Meteor.subscribe('courses', {limit: 4, length: 0});
    }

    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="/courses" />
                <Route path="/" render={(props) => {
                    Session.set('history', props.history);

                    return(
                        <Index>
                            <Route exact path="/courses" component={Courses} />
                            <Route path="/courses/:name"  render={(props) => {

                                let course = courses.find({ name: props.match.params.name }).fetch()[0];

                                if(course){ //从课程列表页进入课程页
                                    props.course = course;
                                    Session.set('courseName', props.match.params.name);   
                                    return (<Main />);
                                }else if (Session.get('courseName')) {  //添加课程进入
                                    return (<Main />); 
                                }else{  //非法进入，回到列表页
                                    return (<Redirect from="/courses/:name" to="/courses" />)   
                                }

                               
                            }} />
                        </Index>
                    )
                }}>
                </Route>
                <Route component={NotFound} />
            </Switch>
        )
    }
}
