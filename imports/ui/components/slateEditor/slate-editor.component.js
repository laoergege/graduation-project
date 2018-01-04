import React, { Component } from "react";

import { Editor } from 'slate-react'
import { State } from 'slate'



export class SlateEditor extends Component {

    constructor(props) {
        // 构建初始状态…
        this.state = {
            initialState: State.fromJSON({
                document: {
                    nodes: [
                        {
                            kind: 'block',
                            type: 'paragraph',
                            nodes: [
                                {
                                    kind: 'text',
                                    ranges: [
                                        {
                                            text: this.props.initial_text
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            })
        }
    }

    onChange = ({ state }) => {
        this.setState({ state })
    }

    render() {
        return (
            <Editor
                state={this.state.state}
                onChange={this.onChange}
            />
        )
    }
}