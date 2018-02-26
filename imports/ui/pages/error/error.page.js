import React, { PureComponent } from 'react'

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';

export default class extends PureComponent {
    render() {
        return (
            <Box full={true} justify="center" align="center">
                <Heading strong={true}>
                    应用出错啦 (*T_T*) 
                </Heading>
                <Anchor label='重新加载' href='/' />
            </Box>
        )
    }
}