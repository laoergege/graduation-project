import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";

import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';
import Layer from 'grommet/components/Layer';

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
            <Box align='center' className="ctext" onDoubleClick = { this.previewImg(msg.content[msg._type]) }
                pad='small'
                colorIndex={msg.from === Meteor.user()._id ? 'ok' : 'light-2'}>
                <Image src={msg.content[msg._type]} />
            </Box>
        </Box>)
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
        accept: '.png,.jpg,jpeg,.doc,.docx,.ppt,.pptx,.xlsx,.pdf,txt',
        disableClick: true, //禁止点击 dropzone 打开文件对话框
        maxSize: 50 * 1024 * 1024,
        onDropRejected: (files) => {

            Session.set('info', { status: 'warning', content: (files[0].size > 50 * 1024 * 1024 ? `${files[0].name} 文件不能超过50M` : '不支持该文件类型！') })

        },
        onDropAccepted: (files) => {
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
                        <Layer closer={true} onClose = { this.closeImg }>
                            <Image src={this.state.img} size="large"/>
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