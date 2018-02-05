import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";

import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';
import Layer from 'grommet/components/Layer';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Download from 'grommet/components/icons/base/Download';


import Dropzone from 'react-dropzone';

import { msgs } from "../../../api/chat";

export default class extends PureComponent {

    state = {
        showImg: false,
        img: null
    }

    text = (msg, i) => {
        return (<Box pad='small' direction="row" className="msg" key={i} justify={msg.from === Meteor.user()._id ? 'end' : 'start'}
            ref={(comp) => {
                if (comp) {
                    findDOMNode(comp).scrollIntoView();
                }
            }}>
            <Box align='center' className="ctext"
                pad='small'
                colorIndex={msg.from === Meteor.user()._id ? 'ok' : 'light-2'}>
                {msg.content.text}
            </Box>
        </Box>)
    }

    image = (msg, i) => {
        return (<Box pad='small' direction="row" className="msg" key={i} justify={msg.from === Meteor.user()._id ? 'end' : 'start'}
            ref={(comp) => {
                if (comp) {
                    findDOMNode(comp).scrollIntoView();
                }
            }}>
            <Box align='center' className="ctext" onDoubleClick={this.previewImg(msg.content[msg._type])}
                pad='small'
                colorIndex={msg.from === Meteor.user()._id ? 'ok' : 'light-2'}>
                <Image src={msg.content[msg._type]} />
            </Box>
        </Box>)
    }

    file = (msg, i) => {
        return (<Box pad='small' direction="row" className="msg" key={i} justify={msg.from === Meteor.user()._id ? 'end' : 'start'}
            ref={(comp) => {
                if (comp) {
                    findDOMNode(comp).scrollIntoView();
                }
            }}>
            <Box align='center' className="ctext" pad='small' colorIndex={msg.from === Meteor.user()._id ? 'ok' : 'light-2'}>
                <Box align='start' direction="row" pad='small'
                    colorIndex='light-2'>
                    <Box margin={{ left: 'small' }} flex={true}>
                        <Heading tag='h4' strong={true} truncate={true}>
                            {msg.content.name}
                        </Heading>
                        <span>{`${this.toDecimal(msg.content.size / (1024 * 1024))}M`}</span>
                    </Box>
                    { msg.content[msg._type] ? (<Anchor icon={<Download />} href={msg.content[msg._type]} />) : null }
                </Box>
            </Box>
        </Box>)
    }

    toDecimal = (x) => {
        let f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x*100)/100;
        return f;
    }

    openFD = () => {
        this.dropzoneRef.open()
    }

    previewImg = (img) => {
        return () => {
            this.setState({
                showImg: true,
                img: img
            })
        }
    }

    closeImg = () => {
        this.setState({
            showImg: false,
            img: null
        })
    }

    // 定义 dropzone 对象
    dropzone = {
        accept: '.png,.jpg,jpeg,.doc,.docx,.ppt,.pptx,.xlsx,.pdf,.txt,.zip',
        disableClick: true, //禁止点击 dropzone 打开文件对话框
        maxSize: 10 * 1024 * 1024,
        onDropRejected: (files) => {

            Session.set('info', { status: 'warning', content: (files[0].size > 10 * 1024 * 1024 ? `${files[0].name} 文件不得超过10M` : '不支持该文件类型！') })

        },
        onDropAccepted: (files) => {
            // 限制图片最大为5M
            for (let file of files) {
                if (file.type.includes('image') && file.szie >= 5 * 1024 * 1024) {
                    Session.set('info', { status: 'warning', content: '图片不得超过5M！' });
                    return;
                }
            }

            this.props.onDrop && this.props.onDrop(files);
        }
    }

    render() {
        return (

            <Dropzone className="msg-window" {...this.dropzone} ref={(node) => { this.dropzoneRef = node; }} >
                {this.props.msgs && (this.props.msgs.map((val, i) => {
                    return this[val._type](val, i)
                }))}
                {
                    this.state.showImg ? (
                        <Layer closer={true} onClose={this.closeImg}>
                            <Image src={this.state.img} size="large" />
                        </Layer>
                    ) : null
                }
            </Dropzone>

        )
    }
}

/**
 * props{
 *  msgs,
 *  onDrop: function(files)
 * }
 */