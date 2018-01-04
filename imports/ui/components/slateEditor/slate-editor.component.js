import React, { Component } from "react";

import { Editor } from 'slate-react'
import { Value } from 'slate';



export class SlateEditor extends Component {

    constructor(props) {
        super();

        // 构建初始状态…
        this.state = {
            value: Value.fromJSON({
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
                                            text: props.initialText
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

    onChange = ({ value  }) => {
        this.setState({ value  })
    }

    render() {
        return (
            <Editor
                value={this.state.value }
                onChange={this.onChange}
            />
        )
    }
}