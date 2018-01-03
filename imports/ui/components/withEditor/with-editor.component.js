import React, { Component } from "react";

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css';
// 用户操作界面
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css';
// 富文本插件
import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin
// image插件
import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'
// video插件
import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'
// video插件
import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'
// parallax-background布局插件
import parallax from 'ory-editor-plugins-parallax-background' // A plugin for parallax background images
import 'ory-editor-plugins-parallax-background/lib/index.css'
// The html5-video plugin
import html5video from 'ory-editor-plugins-html5-video'
import 'ory-editor-plugins-html5-video/lib/index.css'

// The native handler plugin
import native from 'ory-editor-plugins-default-native'

// The divider plugin
import divider from 'ory-editor-plugins-divider'

require('react-tap-event-plugin')();

import './style.scss';

const plugins = {
    content: [slate(), image, video, spacer, divider, html5video],
    layout: [parallax({ defaultPlugin: slate() })],
    native
}


import defaultContent from "./contents";

const editor = new Editor({
    plugins,
    editables: [],
})


export default function withEditor(C) {

    return class Comp extends Component {
        render() {
            return (
                <div>
                    <C {...this.props} editor={(key) => {
                        let content = createEmptyState();

                        editor.trigger.editable.add(content)

                        return (<Editable editor={editor} id={content.id} onChange={this.props.onChange} />)
                    }} />

                    <Trash editor={editor} />
                    <DisplayModeToggle editor={editor} />
                    <Toolbar editor={editor} />
                </div>
            )
        }
    }

}

/**
 * props
 * onChange 回调函数监听用户编辑，回调参数 contents 用于获取编辑内容
 */

