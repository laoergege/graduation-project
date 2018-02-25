import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import { editor, initState } from "./editor.config";
// The default ui components
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'
import './home.scss';

import { home, adjustHome } from "../../../api/home";
import { errorHnadler } from "../../../utils/util";

export class HomeSetup extends PureComponent {

    state = {
        content: null
    }

    changeHandler = (editable) => {
        this.state.content = editable;
    }

    clickHandler = () => {
        adjustHome.call(this.state.content, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '设置成功!' })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        editor.trigger.editable.add(nextProps.home);
    }

    render() {
        return (
            <Box colorIndex="light-1" style={{ display: 'block' }} size="full">
                <Box direction='row' separator="bottom" pad="small">
                    <Button label='设置' onClick={this.clickHandler} />
                </Box>
                {
                    !this.props.loading && (
                        <div className="home">
                            <Editable editor={editor} id={this.props.home.id || initState.id} onChange={this.changeHandler} autoCorrect={true} />
                            <Trash editor={editor} />
                            <DisplayModeToggle editor={editor} />
                            <Toolbar editor={editor} />
                        </div>
                    )
                }
            </Box>
        )
    }
}

export default withTracker(() => {
    let handler = Meteor.subscribe('home');

    return {
        home: home.findOne(),
        loading: !handler.ready()
    }
})(HomeSetup)