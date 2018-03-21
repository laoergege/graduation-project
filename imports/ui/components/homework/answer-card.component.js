import React, { PureComponent } from 'react';
import { withRouter } from "react-router";

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';
import Add from 'grommet/components/icons/base/Add';
import Close from 'grommet/components/icons/base/Close';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Layer from 'grommet/components/Layer';

import ReactQuill from 'react-quill';

import { addHomework, uphomework, mark } from "../../../api/homework";
import { errorHnadler } from "../../../utils/util";
import comfirm from "../modal/comfirm";

export class AnswerCard extends PureComponent {

    constructor(props) {
        super();
        this.state = {
            showMsg: false,
            isReviewing: false,
            index: 0,
            single: typeof Session.get('homework') === 'string' ? { answers: [], score: 0, totalScore: 0 } : { ...Session.get('homework').answers.single },
            blank: typeof Session.get('homework') === 'string' ? { answers: [], score: 0, totalScore: 0 } : { ...Session.get('homework').answers.blank },
            short: typeof Session.get('homework') === 'string' ? { answers: [], score: 0, totalScore: 0 } : { ...Session.get('homework').answers.short },
        }
    }

    modules = {
        toolbar: [

            ['code-block'],

            ['image']                                         // remove formatting button
        ]
    }

    ItemStyle = {
        width: '100%',
        textAlign: 'center',
        flex: 1
    }

    mr = {
        'marginRight': '5px'
    }

    toggle = (index) => (() => {
        this.setState({ index });
    })

    addItem = () => {
        switch (this.state.index) {
            case 1:
                this.setState((preState) => {
                    preState.single.answers.push('');
                    return {
                        single: { ...preState.single }
                    }
                })
                break;

            case 2:
                this.setState((preState) => {
                    preState.blank.answers.push('');
                    return {
                        blank: { ...preState.blank }
                    }
                })
                break;

            case 3:
                this.setState((preState) => {
                    preState.short.answers.push({});
                    return {
                        short: { ...preState.short }
                    }
                })
                break;

            default:
                break;
        }
    }

    deleteItem = () => {
        switch (this.state.index) {
            case 1:
                this.setState((preState) => {
                    preState.single.answers.pop();
                    return {
                        single: Object.assign({}, preState.single)
                    }
                })
                break;

            case 2:
                this.setState((preState) => {
                    preState.blank.answers.pop();
                    return {
                        single: Object.assign({}, preState.blank)
                    }
                })
                break;

            case 3:
                this.setState((preState) => {
                    preState.short.answers.pop();
                    return {
                        single: Object.assign({}, preState.short)
                    }
                })
                break;
            default:
                break;
        }
    }

    setup = () => {
        let homework = {
            name: typeof Session.get('homework') === 'string' ? Session.get('homework') : Session.get('homework').name,
            createAt: new Date(),
            createBy: Meteor.userId(),
            questions: this.props.questions,
            answers: {
                single: this.state.single,
                blank: this.state.blank,
                short: this.state.short
            },
            finishers: [],
            courseid: Session.get('courseid')
        }

        if (typeof Session.get('homework') !== 'string') {
            homework._id = Session.get('homework')._id
        }

        addHomework.call(homework, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '作业布置成功！' });
                this.props.history.goBack();
            }
        });
    }

    up = () => {
        if (Session.get('homework')) {
            uphomework.call({
                id: Session.get('homework')._id,
                answers: {
                    single: this.state.single,
                    blank: this.state.blank,
                    short: this.state.short,
                }
            }, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    this.setState({ showMsg: true });
                    setTimeout(() => {
                        this.props.history.goBack();
                    }, 4000);
                }
            })
        }
    }

    _mark = () => {
        if (this.props.user && !this.props.user.user.profile.roles.includes(3)) {
            Session.set('info', { status: 'warning', content: '请选择学生！' });
            return;
        }

        if (Session.get('homework')) {
            mark.call({
                hwid: Session.get('homework')._id,
                userid: this.props.user && this.props.user.user._id,
                short: this.state.short
            }, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '评分成功！' })
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user.answers) {
            this.setState({
                single: nextProps.user.answers.single,
                blank: nextProps.user.answers.blank,
                short: nextProps.user.answers.short
            })
        }
    }

    componentWillUnmount() {
        Session.set('isReviewing', false)
    }

    render() {
        return (
            <Box>
                {
                    this.state.showMsg && (
                        <Layer>
                            <Box size={{ width: { min: 'medium' }, height: 'small' }} direction="row" justify="center" align="center">
                                <Checkmark colorIndex="ok" />
                                <span>
                                    作业提交成功!系统将结算客观题分数，3秒后退出，总分以后会变化，请时刻关注！
                                </span>
                            </Box>
                        </Layer>
                    )
                }
                <Box direction="row" justify="between" separator="bottom">
                    <Label>
                        学号：{this.props.user && this.props.user.user.profile.num}
                    </Label>
                    <Label>
                        姓名：{this.props.user && this.props.user.user.profile.name}
                    </Label>
                    <Label>
                        分数：{(this.props.user && this.props.user.answers) ? (this.props.user.answers.single.totalScore + this.props.user.answers.blank.totalScore + this.props.user.answers.short.totalScore + '') : '0'}
                    </Label>
                </Box>
                <Box direction="row" pad="small" align="center">
                    <Button label='单项选择题' onClick={this.toggle(1)} primary={true} style={this.mr} />
                    <Button label='填空题' onClick={this.toggle(2)} primary={true} style={this.mr} />
                    <Button label='简答题' onClick={this.toggle(3)} primary={true} style={this.mr} />
                    <span>(请将答案填写到对应的题型中)</span>
                    {Session.get('permissions') && Session.get('permissions').addHomework && !Session.get('isReviewing') && (<Button label='设置答题卡及答案' onClick={() => {
                        comfirm(null, '作业提交成功后不可修改！', (res) => {
                            if (res) {
                                this.setup();
                            }
                        })
                    }} accent={true} />)}
                    {Session.get('permissions') && Session.get('permissions').upHW && (<Button label='提交答题卡' onClick={() => {
                        comfirm(null, '提交作业后不可修改，确认提交作业？', (res) => {
                            if (res) {
                                this.up();
                            }
                        })
                    }} accent={true} />)}
                    {Session.get('isReviewing') && Session.get('permissions') && Session.get('permissions').reviewHW && (<Button label='评分' onClick={this._mark} accent={true} />)}
                </Box>
                {this.state.index === 1 && (
                    <Box key={1}>
                        <p>单项分值：{this.state.single.score || 0}</p>
                        <Box direction="row" wrap={true} align="center" flex={true}>
                            {
                                this.state.single.answers.map((val, i) => {
                                    return (
                                        <Box direction="row" key={i} align="center" margin="small" size={{ width: 'xsmall' }}>
                                            <span style={this.mr}>{`${i + 1}.`}</span>
                                            <input value={val} style={this.ItemStyle} onChange={(e) => {
                                                this.state.single.answers[i] = e.target.value;
                                                this.forceUpdate();
                                            }}
                                                disabled={Session.get('isReviewing') || false}
                                                className={(Session.get('isReviewing') && Session.get('homework') && typeof Session.get('homework') !== 'string' && Session.get('homework').answers.single.answers[i] !== val) ? 'answer-error' : ''} />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        {
                            Session.get('permissions') && Session.get('permissions').addHomework && !Session.get('isReviewing') && (
                                <Box direction="row" align="center">
                                    <Button icon={<Add />} style={this.mr} label="选项"
                                        onClick={this.addItem} />
                                    <Button icon={<Close />} style={this.mr} label="选项"
                                        onClick={this.deleteItem} />

                                    <Box direction="row" align="center">
                                        <label>分值：</label>
                                        <NumberInput value={this.state.single.score} onChange={(e) => {
                                            if (e instanceof Event) {
                                                this.setState((preState) => {
                                                    preState.single.score = e.target.value;
                                                    return {
                                                        single: { ...preState.single }
                                                    }
                                                })
                                            }
                                        }} />
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                )}
                {this.state.index === 2 && (
                    <Box flex={true} key={2}>
                     <p>单项分值：{this.state.blank.score || 0}</p>
                        <Box flex={true}>
                            {
                                this.state.blank.answers.map((val, i) => {
                                    return (
                                        <Box direction="row" key={i} align="center" margin="small">
                                            <span style={this.mr}>{`${i + 1}.`}</span>
                                            <input defaultValue={val} style={this.ItemStyle} onChange={(e) => {
                                                this.state.blank.answers[i] = e.target.value;
                                                this.forceUpdate();
                                            }}
                                                disabled={Session.get('isReviewing') || false}
                                                className={(Session.get('isReviewing') && Session.get('homework') && typeof Session.get('homework') !== 'string' && Session.get('homework').answers.blank.answers[i] !== val) ? 'answer-error' : ''} />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        {
                            Session.get('permissions') && Session.get('permissions').addHomework && !Session.get('isReviewing') && (
                                <Box direction="row" align="center">
                                    <Button icon={<Add />} style={this.mr} label="填项"
                                        onClick={this.addItem} />
                                    <Button icon={<Close />} style={this.mr} label="填项"
                                        onClick={this.deleteItem} />

                                    <Box direction="row" align="center">
                                        <label>分值：</label>
                                        <NumberInput value={this.state.blank.score} onChange={(e) => {
                                            if (e instanceof Event) {
                                                this.setState((preState) => {
                                                    preState.blank.score = e.target.value;
                                                    return {
                                                        blank: { ...preState.blank }
                                                    }
                                                })
                                            }
                                        }} />
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                )}
                {this.state.index === 3 && (
                    <Box key={3}>
                         <p>单项分值：{this.state.short.score || 0}</p>
                        {
                            Session.get('permissions') && Session.get('permissions').addHomework && !Session.get('isReviewing') && (
                                <Box direction="row" align="center">
                                    <Button icon={<Add />} style={this.mr} label="答项"
                                        onClick={this.addItem} />
                                    <Button icon={<Close />} style={this.mr} label="答项"
                                        onClick={this.deleteItem} />

                                    <Box direction="row" align="center">
                                        <label>分值：</label>
                                        <NumberInput value={this.state.short.score} onChange={(e) => {
                                            if (e instanceof Event) {
                                                this.setState((preState) => {
                                                    preState.short.score = e.target.value;
                                                    return {
                                                        short: { ...preState.short }
                                                    }
                                                })
                                            }
                                        }} />
                                    </Box>
                                </Box>
                            )
                        }

                        <Box>
                            {
                                this.state.short.answers.map((val, i) => {
                                    return (
                                        <div>
                                            <div style={{ display: 'flex', margin: '1rem 0' }}>
                                                <span style={this.mr}>{`${i + 1}.`}</span><ReactQuill modules={this.modules} style={{ flex: 1, border: '1px solid #eee' }}
                                                    readOnly={Session.get('isReviewing') || false}
                                                    value={val.content || {}} onChange={(content, delta, source, editor) => {
                                                        this.state.short.answers[i].content = editor.getContents();
                                                    }} />
                                            </div>
                                            {
                                                Session.get('isReviewing') && (
                                                    <div>评分: <NumberInput defaultValue={val.score || 0} min={0} max={this.state.short.score} onChange={(e) => {
                                                        this.state.short.answers[i].score = e.target.value;
                                                    }} /></div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                )}
            </Box>
        )
    }
}

export default withRouter(AnswerCard);

/**
 * props{
 * user
 * }
 */