import React, { Component } from 'react'

import Box from 'grommet/components/Box';
import Header from "../../components/header";
import Main from "../../components/main";

// import SecondInfo from "../../components/secondInfo";

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
                full="horizontal"
                colorIndex='light-2'
                separator="bottom"
                wrap={false}>

                <Header />

                <Main />
               
            </Box>
        )
    }
}