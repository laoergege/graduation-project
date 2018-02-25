import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';

import { HTMLRenderer } from 'ory-editor-renderer';
import { plugins } from "../management/editor.config";

import { home } from "../../../api/home";
import "../management/home.scss";

export class Home extends PureComponent {
    render() {
        return (
            <Box pad="large">
                <Box colorIndex="light-1" className="home" >
                    {
                        !this.props.loading && (
                            <HTMLRenderer plugins={plugins} state={this.props.home} />
                        )
                    }

                </Box>
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
})(Home);