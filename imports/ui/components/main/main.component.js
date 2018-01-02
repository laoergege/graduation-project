import React, { Component } from 'react';

import './main.scss';

import Box from 'grommet/components/Box';
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Split from "grommet/components/Split";

import Header from "../header";

export default class Main extends Component {
    render() {
        return (
            <div className="main-v-2018112205">
                <Box
                    colorIndex="light-1"
                    size={{ width: 'full', height: 'medium' }}
                    direction="column"
                    responsive={true}>

                    <Box
                        size={{ width: 'full' }} justify="center" align="center"
                        flex={true} >
                        <Box size={{ width: 'xxlarge', height: 'medium' }} direction="row" responsive={true}
                            pad="small">
                            {this.props.editor() || 'Write it'}
                        </Box>
                    </Box>

                    <Box size={{ width: 'full' }} direction="row" responsive={true} className="sticky--top"
                        pad={{ horizontal: 'small', between: 'small' }} justify="center">
                        <Box size={{ width: 'xxlarge' }} direction="row" responsive={true} >
                            <Menu responsive={false}
                                inline={true}
                                direction='row'>
                                <Anchor href='#'
                                    className='active'>
                                    课程简介
                            </Anchor>
                                <Anchor href='#'>
                                    教师简介
                            </Anchor>
                                <Anchor href='#'>
                                    评价
                            </Anchor>
                            </Menu>
                        </Box>
                    </Box>
                </Box>

                <Box
                    size={{ width: 'full' }}
                    margin={{ top: 'small'}}
                    pad={{between: "small"}} justify="center" direction="row">
                  
                    <Box colorIndex="light-1"
                        justify='center'
                        align='center'
                        pad='medium'
                        size={{ width: 'xxlarge' }}>
                        {this.props.editor() || 'Write it'}
                    </Box>
                    <Box 
                        colorIndex="ok"
                        justify='center'
                        align='center'
                        pad='medium'
                        size={{ width: 'small' }}>
                        Right Side
                    </Box>

                </Box>

            </div>
        )
    }
}