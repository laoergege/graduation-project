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
import Layer from 'grommet/components/Layer';

import singleInput from "../modal/singleInput";
import { homeworks } from "../../../api/homework";

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';

export class HwList extends PureComponent {

    state = {
        showLayer: false,
        lineData: []
    }

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

    analysis = (homework) => {
        // 段值
        let segment = Math.ceil(homework.totalScore / 10);
        let piont1 = homework.totalScore - 1 * segment;
        let piont2 = homework.totalScore - 2 * segment;
        let piont3 = homework.totalScore - 3 * segment;
        let piont4 = homework.totalScore - 4 * segment;
        let p1 = p2 = p3 = p4 = p5 = 0;
        homework.finishers.map(finisher => {
            let answers = finisher.answers;
            let total = answers.short.totalScore + answers.blank.totalScore + answers.single.totalScore;
            if (total >= piont1) {
                p1++;
            } else if (total >= piont2) {
                p2++;
            } else if (total >= piont3) {
                p3++
            } else if (total >= piont4) {
                p4++
            } else {
                p5++
            }
        })

        return [
            { name: '<' + piont4, count: p5 },
            { name: piont4 + ' - ' + piont3, count: p4 },
            { name: piont3 + ' - ' + piont2, count: p3 },
            { name: piont2 + ' - ' + piont1, count: p2 },
            { name: piont1 + '<=', count: p1 }
        ]
    }

    render() {
        return (
            <Box>
                {
                    Session.get('permissions') && Session.get('permissions').addHomework && (
                        <Box margin="small" direction="row" separator="bottom" pad="small">
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

                                                <Anchor label='数据统计' onClick={() => {
                                                    this.setState({
                                                        showLayer: true,
                                                        lineData: this.analysis(val)
                                                    })
                                                }} />

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
                {
                    this.state.showLayer && (
                        <Layer closer={true} onClose={() => {
                            this.setState({
                                showLayer: false
                            })
                        }}>
                            <Box size={{ width: { min: 'medium' }, height: { min: 'medium' } }} justify="center" align="center">
                                <BarChart width={730} height={250} data={this.state.lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" name="区间" >
                                        <Label value="分数区间" position="bottom" />
                                    </XAxis>
                                    <YAxis dataKey="count" interval={1}>
                                        <Label value="人数" position="left" />
                                    </YAxis>
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>
                            </Box>
                        </Layer>
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