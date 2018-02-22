import React, { PureComponent } from 'react';
import { Switch, Route } from "react-router";
import { withTracker } from 'meteor/react-meteor-data';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import Anchor from 'grommet/components/Anchor';
import Spinning from 'grommet/components/icons/Spinning';
import Timestamp from 'grommet/components/Timestamp';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import withAnimate from "../animate";
import AnswerCard from "./answer-card.component";
import Notification from "../../components/notification";
import './style.scss'

import { homeworks } from "../../../api/homework";

export class HW extends PureComponent {

    constructor(props) {
        super();
        this.state = {
            questions: props.homework && props.homework.questions,
            target: {user: Meteor.user()},
        }
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],

            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'align': [] }],

            ['image', 'clean']                                         // remove formatting button
        ]
    }

    handleChange = (content, delta, source, editor) => {
        let c = editor.getContents();
        this.setState({
            questions: c
        })
    }

    review = (answers, user) => {
        return () => {
            this.setState({
                target: { user, ...answers }
            })
        }
    }

    render() {
        return (
            <div>
                <Split>
                    <Box style={{ borderRight: '1px solid #eee', height: '100vh' }}>
                        <Switch>
                            <Route path={`${this.props.match.path}/review`} render={() => {
                                if (this.props.loading) {
                                    return (<Box full={true} align="center" justify="center" direction="row">正在加载用户数据 <Spinning /></Box>)
                                } else
                                    return (
                                        <Box>
                                            <Table>
                                                <TableHeader labels={['学号', '姓名', '完成时间', '操作']}
                                                    sortIndex={2}
                                                    sortAscending={true}
                                                    onSort={() => { }} />
                                                <tbody>
                                                    {
                                                        this.props.homework && this.props.homework.finishers.map((val, i) => {
                                                            let user = Meteor.users.findOne({ _id: val.id });

                                                            return (
                                                                <TableRow key={user._id}>
                                                                    <td>
                                                                        {user.profile.num}
                                                                    </td>
                                                                    <td>
                                                                        {user.profile.name}
                                                                    </td>
                                                                    <td className='secondary'>
                                                                        <Timestamp value={val.time} />
                                                                    </td>
                                                                    <td>
                                                                        <Anchor label='评阅' onClick={this.review(val, user)} />
                                                                    </td>
                                                                </TableRow>
                                                            )

                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </Box>
                                    )
                            }} />
                            <Route children={() => {
                                return (
                                    <ReactQuill
                                        modules={(Session.get('permissions') && Session.get('permissions').addHomework) ? this.modules : {}}
                                        onChange={this.handleChange} defaultValue={this.props.homework && this.props.homework.questions}
                                        readOnly={(Session.get('permissions') && Session.get('permissions').addHomework) ? false : true} />
                                )
                            }} />
                        </Switch>
                    </Box>
                    <Box pad='small'>
                        <AnswerCard questions={this.state.questions} user={this.state.target} />
                    </Box>
                </Split>
                <Notification />
            </div>
        )
    }
}

export default withTracker((props) => {
    let handle;
    if (props.location.pathname.includes('review')) {
        handle = Meteor.subscribe('Meteor.users.students');
        Meteor.subscribe('homeworks', Session.get('homework').courseid);
        Session.set('isReviewing', true);
    }

    return {
        homework: Session.get('homework')._id ? homeworks.findOne({_id: Session.get('homework')._id}) : null,
        loading: handle ? !handle.ready() : false 
    }
})(withAnimate(HW));