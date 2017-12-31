import React, { Component } from 'react'

import Box from 'grommet/components/Box';
import Header from "../../components/header";

export default class Index extends Component {
    render() {
        return (
            <Box justify='start'
                align='stretch'
                wrap={true}
                reverse={false}
                pad='none'
                margin='none'
                primary={true}
                full={true}
                colorIndex='light-2'>
                <Header/>
                {this.props.children || "Welcome to your Inbox"}
            </Box>
        )
    }
}