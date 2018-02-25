import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';

import { HTMLRenderer } from 'ory-editor-renderer';
import { plugins } from "../management/editor.config";
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';

import { home } from "../../../api/home";
import "../management/home.scss";

export class Home extends PureComponent {
    render() {
        return (
            <Box>
                <Box colorIndex="light-1" className="home"  pad="large">
                    {
                        !this.props.loading && (
                            <HTMLRenderer plugins={plugins} state={this.props.home} />
                        )
                    }

                </Box>
                <Footer justify='center' size='large' colorIndex="light-2">
                    <Box direction='row'
                        align='center'
                        pad={{ "between": "medium" }}>
                        <Paragraph margin='none'>
                            © 2018 laoergege
                        </Paragraph>
                    </Box>
                </Footer>
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