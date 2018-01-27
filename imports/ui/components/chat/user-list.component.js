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

    _onSelect = (target) => {
        return () => {
            if (this.props.onSelect) {
                this.props.onSelect(target);
            }
        }
    }

    render() {
        return (
            <Box className="user-list">
                <Box flex={true} >
                    {
                            (
                                this.props.users ? (
                                    this.props.users.map((val ,key) => {
                                        return (
                                            <Box align='start' direction="row" key={key} onClick={this._onSelect(val)} className="item"
                                                pad='small'
                                                colorIndex='light-2'>
                                                <Image src='/img/chat.png' size='thumb' style={{ objectFit: 'contain' }} />
                                                <Box margin={{ left: 'small' }} flex={true}>
                                                    <Heading tag='h4' strong={true} truncate={true}>
                                                        {val.profile.name}
                                                    </Heading>
                                                    <Box justify="between" direction="row">
                                                        <span className="content">
                                                            { 
                                                                (() => {
                                                                    let msg = this.props.msgs.filter((value) => (value.from === val._id || value.to === val._id))[0];
                                                                    if (msg) {
                                                                        return msg.content[msg._type]
                                                                    }else{
                                                                        return '[暂无新消息]'
                                                                    }
                                                                })()
                                                            }
                                                        </span>
                                                        {val.createAt ? (<Timestamp value={val.createAt} fields='time' className="time" />): ''}
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
 *  msgs,
 *  onSelect: function(to) 选择对象
 * }
 */