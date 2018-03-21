import React, { Component } from 'react'

import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";
import Courses from "../../ui/components/courses";
import Course from "../../ui/components/main";
import { courses } from "../../api/course";
import Main from "../../ui/components/main";
import CourseDetail from "../../ui/components/courseDetail";
import '../../api/chat';
import Home from "../../ui/components/main/home.component";
import Error from "../../ui/pages/error/error.page";

import Bundle from "../../utils/bundle";

import Spinning from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';

export class App extends Component {

    subscriptions = [];

    componentWillMount() {
        // 订阅课程
        this.subscriptions.push(Meteor.subscribe('courses', { limit: 4, length: 0 }));
        // 获取当前用户消息
        this.subscriptions.push(Meteor.subscribe("msgs"));

    }

     //监听全局错误
    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
        this.props.history.push('/');
    }

    componentWillUnmount() {
        this.subscriptions.forEach(val => {
            val && val.stop();
        })
    }

    chatModule = async (callBack) => {
        const Chat = (await import("/imports/ui/components/chat")).default;
        callBack(Chat);
    }

    homeworkModule = async (callBack) => {
        const HW = (await import("/imports/ui/components/homework")).default;
        callBack(HW);
    }

    mcModule = async (callBack) => {
        const mc = (await import("/imports/ui/components/management")).default;
        callBack(mc);
    }

    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="/home" />

                <Route exact path="/error" component={Error} />

                <Route path="/managementcenter" render={(props) => {
                    let permissions = Session.get('permissions');

                    if (permissions) {
                        return (
                            <Bundle load={this.mcModule}>
                                {(Comp) => Comp
                                    ? <Comp {...props} />
                                    : (<Box full={true} align="center" justify="center" direction="row">正在进入管理中 <Spinning /></Box>)
                                }
                            </Bundle>
                        )
                    } else {
                        return (<Redirect push={true} to="/" />)
                    }
                }} />

                <Route path="/homeworks/:id" render={(props) => {
                    let permissions = Session.get('permissions');

                    if (permissions) {
                        return (
                            <Bundle load={this.homeworkModule}>
                                {(Comp) => Comp
                                    ? <Comp {...props} />
                                    : (<Box full={true} align="center" justify="center" direction="row">正在进入作业系统<Spinning /></Box>)
                                }
                            </Bundle>
                        )
                    } else {
                        return (<Redirect push={true} to="/" />)
                    }
                }} />

                <Route exact path="/chat" render={() => {
                    let permissions = Session.get('permissions');

                    if (permissions && permissions.getChat) {
                        return (
                            <Bundle load={this.chatModule}>
                                {(Comp) => Comp
                                    ? <Comp />
                                    : (<Box full={true} align="center" justify="center" direction="row">正在进入答疑系统<Spinning /></Box>)
                                }
                            </Bundle>
                        )
                    } else {  //非法进入
                        return (<Redirect push={true} to="/" />)
                    }
                }} />

                <Route path="/" render={(props) => {
                    Session.set('history', props.history);

                    return (
                        <Index {...props}>
                            <Switch>
                                <Route exact path="/home" component={Home} />

                                <Route exact path="/courses" component={Courses} />

                                <Route path="/courses/:name/content" render={(props) => {
                                    let course = courses.find({ _id: props.match.params.name }).fetch()[0];

                                    if (course) {
                                        return (<CourseDetail {...props} course={course} />)
                                    } else {  //非法进入，回到列表页
                                        return (<Redirect from="/courses/:name" to="/courses" />)
                                    }
                                }} />

                                <Route path="/courses/:name" render={(props) => {

                                    let course = courses.find({ _id: props.match.params.name }).fetch()[0];

                                    if (course) { //从课程列表页进入课程页
                                        return (<Main {...props} course={course} />);
                                    } else if (Session.get('courseName')) {  //添加课程进入
                                        return (<Main {...props} course={{ name: Session.get('courseName') }} />);
                                    } else {  //非法进入，回到列表页
                                        return (<Redirect from="/courses/:name" to="/courses" />)
                                    }


                                }} />
                            </Switch>

                        </Index>
                    )
                }}>
                </Route>

                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default withRouter(App)
