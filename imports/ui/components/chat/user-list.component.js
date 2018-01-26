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

export default class extends PureComponent {

    state = {
        showMsg: true
    }

    toggle = (b) => {
        return () => {
            this.setState({
                showMsg: b
            })
        }
    }

    _onSelect = (target) => {
        return () => {
            if (this.props.onSelect) {
                if (this.state.showMsg) {
                    this.props.onSelect(target.to)
                }else{
                    this.props.onSelect(target)
                }
            }
        }
    }

    render() {
        return (
            <Box className="user-list">
                <Box flex={true} >

                    {
                        this.state.showMsg ?
                            (
                                this.props.msgs && (
                                    this.props.msgs.map((val, key) => {
                                        return (
                                            <Box align='start' direction="row" key={key} onClick={this._onSelect(val)} className="item"
                                                pad='small'
                                                margin='small'
                                                colorIndex='light-2'>
                                                <Image src='/img/chat.png' size='thumb' style={{ objectFit: 'contain' }} />
                                                <Box margin={{ left: 'small' }} >
                                                    <Heading tag='h4' strong={true} truncate={true}>
                                                        Sample Heading
                                                </Heading>
                                                    <span className="content">
                                                        { val.content[val._type] || '[暂无新消息]'}
                                                    </span>
                                                </Box>
                                                <Timestamp value='2018-01-24T14:32:41.596Z' fields='time' className="time" />
                                            </Box>
                                        )
                                    })
                                )

                            ) :
                            (
                                this.props.users ? (
                                    this.props.users.map((val ,key) => {
                                        return(
                                            <Box align='center' direction="row" key={key} onClick={this._onSelect(val)} className="item"
                                                pad='small'
                                                margin='small'
                                                colorIndex='light-2'>
                                                <Image src='/img/chat.png' size='thumb' style={{ objectFit: 'contain' }} />
                                                <Box margin={{ left: 'small' }} >
                                                    <Title>{val.profile.name}</Title> 
                                                </Box>
                                            </Box>
                                        )
                                    })
                                ) : '用户列表不存在'

                            )
                    }
                </Box>

                <Menu responsive={false} direction='row' justify="around" pad="small">
                    <Anchor icon={<Chat />} onClick={this.toggle(true)}
                        primary={true}>
                    </Anchor>
                    <Anchor icon={<Group />} onClick={this.toggle(false)}
                        primary={true}>
                    </Anchor>
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