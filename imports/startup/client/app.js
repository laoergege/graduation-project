import React, { Component } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";
import Courses from "../../ui/components/courses";
import Course from "../../ui/components/main";
import { courses } from "../../api/course";
import Main from "../../ui/components/main";
import CourseDetail from "../../ui/components/courseDetail";

import Bundle from "../../utils/bundle";

export default class App extends Component {

    componentWillMount() {
        Meteor.subscribe('Meteor.users.initials');
        Meteor.subscribe('courses', { limit: 4, length: 0 });
    }

    chatModule = async (callBack) => {
        const Chat = (await import("/imports/ui/components/chat")).default;
        callBack(Chat);
    }

    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="/courses" />
                <Route path="/" render={(props) => {
                    Session.set('history', props.history);

                    return (
                        <Index {...props}>
                            <Route exact path="/courses" component={Courses} />
                            <Route exact path="/courses/:name" render={(props) => {

                                let course = courses.find({ name: props.match.params.name }).fetch()[0];

                                if (course) { //从课程列表页进入课程页
                                    return (<Main {...props} course={course} />);
                                } else if (Session.get('courseName')) {  //添加课程进入
                                    return (<Main {...props} course={{ name: Session.get('courseName') }} />);
                                } else {  //非法进入，回到列表页
                                    return (<Redirect from="/courses/:name" to="/courses" />)
                                }


                            }} />

                            <Route path="/courses/:name/content" render={(props) => {
                                let course = courses.find({ name: props.match.params.name }).fetch()[0];

                                if (course) {
                                    return (<CourseDetail {...props} course={course} />)
                                } else {  //非法进入，回到列表页
                                    return (<Redirect from="/courses/:name" to="/courses" />)
                                }
                            }} />

                            <Route exact path="/chat" render={() => {
                                let permissions = Session.get('permissions');

                                if (permissions && permissions.getChat) {
                                    return (
                                        <Bundle load={this.chatModule}>
                                            {(Comp) => Comp
                                                ? <Comp />
                                                : ''
                                            }
                                        </Bundle>
                                    )
                                } else {  //非法进入，回到列表页
                                    return (<Redirect push={true} to="/courses" />)
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
