import React, { PureComponent } from "react";

import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Timestamp from 'grommet/components/Timestamp';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Chat from 'grommet/components/icons/base/Chat';
import Group from 'grommet/components/icons/base/Group';
import Title from 'grommet/components/Title';

import { msgs } from "../../../api/chat";

import _ from "../../../utils/lodash";

export default class extends PureComponent {

    state = {
        target: {_id: 0}
    }

    _onSelect = (target) => {
        return () => {
            if (this.props.onSelect) {
                this.props.onSelect(target);
                this.state.target = target;

                Session.set(target._id, false);

                this.forceUpdate()
            }
        }
    }

    render() {
        return (
            <Box className="user-list">
                <Box flex={true} style={{display: 'block'}}>
                    {
                            (
                                this.props.users ? (
                                    this.props.users.map((val ,key) => {
                                        return (
                                            <Box align='start' direction="row" key={key} onClick={this._onSelect(val)} className="item"
                                                pad='small'
                                                colorIndex={ this.state.target._id === val._id ? 'light-2' : 'light-1' }>
                                                <Image src='/img/chat.png' size='thumb' style={{ objectFit: 'contain' }} />
                                                <div className="notice" style={{opacity: (Session.get(val._id) && val._id != this.state.target._id) ? 1 : 0}}></div>
                                                <Box margin={{ left: 'small' }} flex={true}>
                                                    <Box justify="between" direction="row">
                                                        <Heading tag='h4' strong={true} truncate={true} className={ val.status.online ? 'online' : 'outline'}>
                                                            {val.profile.name}
                                                        </Heading>
                                                        {
                                                            val.status.online || <span className="outline">离线</span>
                                                        }
                                                    </Box>
                                                    <Box justify="between" direction="row">
                                                        {
                                                            (() => {
                                                                let msg = this.props.msgs.filter((value) => (value.from === val._id || value.to === val._id))[0];
                                                                if (msg) {
                                                                    return (
                                                                        [
                                                                            (<span key={1} className="content">{msg._type === 'text' ? msg.content[msg._type] : (msg._type === 'file' ? '[File]' : '[Image]' )}</span>),
                                                                            (<Timestamp key={2} value={val.createAt} fields={['month', 'day', 'time']} className="time" />)
                                                                        ]
                                                                    )
                                                                }else{
                                                                    return (<span className="content">[暂无新消息]</span>)
                                                                }
                                                            })()
                                                        }
                                                    </Box>        
                                                </Box>
                                            </Box>
                                        )
                                    })
                                ) : '用户列表不存在'

                            )
                    }
                </Box>

                <Menu responsive={false} direction='row' justify="around" pad="small">
                {
                        (Meteor.user() && Meteor.user().profile.roles.includes(2)) ? <Chat colorIndex="brand"/> : <Group colorIndex="brand"/>
                }
                </Menu>
            </Box>
        )
    }
}
/**
 * props{
 *  users,
 *  onSelect: function(to) 选择对象
 * }
 */