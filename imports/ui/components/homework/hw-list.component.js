import React, { PureComponent } from 'react';
import { withRouter } from "react-router";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import Edit from "grommet/components/icons/base/Edit";
import Spinning from 'grommet/components/icons/Spinning';
import Anchor from 'grommet/components/Anchor';
import Status from 'grommet/components/icons/Status';
import Value from 'grommet/components/Value';

import singleInput from "../modal/singleInput";
import { homeworks } from "../../../api/homework";

export class HwList extends PureComponent {

    addHW = () => {
        singleInput('作业名称', (name) => {
            if (!name || !(name.trim())) {
                Session.set('info', { status: 'warning', content: "作业名称不能为空" })
            } else {
                this.props.history.push(`/homeworks/${name}`);
                Session.set('homework', name);
            }
        })
    }

    goHw = (hw) => {
        return () => {
            this.props.history.push(`/homeworks/${hw.name}`);
            Session.set('homework', hw);
        }
    }

    review = (hw) => {
        return () => {
            this.props.history.push(`/homeworks/${hw.name}/review`);
            Session.set('homework', hw);
        }
    }

    render() {
        return (
            <Box>
                {
                    Session.get('permissions') && Session.get('permissions').addHomework && (
                        <Box margin="small" direction="row" separator="bottom">
                            <Button icon={<Edit />}
                                label='添加作业' onClick={this.addHW} />
                        </Box>
                    )
                }
                {
                    this.props.listLoading ? (
                        <Spinning />
                    ) : (
                            <List selectable={false}>
                                {
                                    this.props.homeworks.map(val => {
                                        return (
                                            <ListItem justify='between' key={val._id}
                                                separator='horizontal' >
                                                <span>
                                                    {val.name}
                                                    {
                                                        (Meteor.user() && Meteor.user().profile.roles.includes(3) && val.finishers.length !== 0) && (
                                                            <span><Status value='ok' />(你已经完成该作业)</span>
                                                        )
                                                    }
                                                </span>



                                                {
                                                    (Meteor.user() && Meteor.user().profile.roles.includes(3) && val.finishers.length !== 0) && (
                                                        <span><Value colorIndex="critical" value={(() => {
                                                            let total = 0;
                                                            for (const key in val.finishers[0].answers) {
                                                                total += val.finishers[0].answers[key].totalScore;
                                                            }
                                                            return total + '';
                                                        })()} />分</span>
                                                    )
                                                }

                                                {
                                                    (Meteor.user() && Meteor.user().profile.roles.includes(3) && val.finishers.length === 0) && (
                                                        <Anchor label='进入' onClick={this.goHw(val)} />
                                                    )
                                                }

                                                <Anchor label='数据统计' onClick={this.review(val)} />

                                                {
                                                    Session.get('permissions') && Session.get('permissions').reviewHW && (
                                                        <Anchor label='评阅作业' onClick={this.review(val)} />
                                                    )
                                                }
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        )
                }
            </Box>
        )
    }
}

export default withTracker((props) => {
    const handle = Meteor.subscribe('homeworks', props.courseid);

    return {
        homeworks: homeworks.find().fetch() || [],
        listLoading: !handle.ready(),
    }
})(withRouter(HwList));

/**
 * props{
 * courseid
 * }
 */