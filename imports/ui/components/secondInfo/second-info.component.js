import React, { Component } from "react";

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css';

import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css';

import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

require('react-tap-event-plugin')();

const plugins = {
    content: [slate()], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
    layout: [] // Define plugins for layout cells
  }

// Creates an empty editable
const content = createEmptyState();

const editor = new Editor({
    plugins,
    editables: [content],
})

export default class SecondInfo extends Component {
    render() {
        return (
            <div>
                <Editable editor={editor} id={content.id} />

                <Trash editor={editor} />
                <DisplayModeToggle editor={editor} />
                <Toolbar editor={editor} />
            </div>
        )
    }
}