import React, { PureComponent } from "react";

import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Timestamp from 'grommet/components/Timestamp';

export default class extends PureComponent {
    render() {
        return (
            <Columns className="user-list">
                <Box align='start' direction="row"
                    pad='small'
                    margin='small'
                    colorIndex='light-2'>
                    <Image src='/img/chat.png' size='thumb' style={{objectFit: 'contain'}}/>
                    <Box margin={{ left: 'small' }} >
                        <Heading tag='h4' strong={true} truncate={true}>
                            Sample Heading
                        </Heading>
                        <span className="content">
                            你好！
                        </span>
                    </Box>
                    <Timestamp value='2018-01-24T14:32:41.596Z' fields='time' className="time"/>
                </Box>
                <Box align='start' direction="row"
                    pad='small'
                    margin='small'
                    colorIndex='light-2'>
                    <Image src='/img/chat.png' size='thumb' style={{objectFit: 'contain'}}/>
                    <Box margin={{ left: 'small' }} >
                        <Heading tag='h4' strong={true} truncate={true}>
                            Sample Heading
                        </Heading>
                        <span className="content">
                            你好！
                        </span>
                    </Box>
                    <Timestamp value='2018-01-24T14:32:41.596Z' fields='time' className="time"/>
                </Box>
                <Box align='start' direction="row"
                    pad='small'
                    margin='small'
                    colorIndex='light-2'>
                    <Image src='/img/chat.png' size='thumb' style={{objectFit: 'contain'}}/>
                    <Box margin={{ left: 'small' }} >
                        <Heading tag='h4' strong={true} truncate={true}>
                            Sample Heading
                        </Heading>
                        <span className="content">
                            你好！
                        </span>
                    </Box>
                    <Timestamp value='2018-01-24T14:32:41.596Z' fields='time' className="time"/>
                </Box>
                <Box align='start' direction="row"
                    pad='small'
                    margin='small'
                    colorIndex='light-2'>
                    <Image src='/img/chat.png' size='thumb' style={{objectFit: 'contain'}}/>
                    <Box margin={{ left: 'small' }} >
                        <Heading tag='h4' strong={true} truncate={true}>
                            Sample Heading
                        </Heading>
                        <span className="content">
                            你好！
                        </span>
                    </Box>
                    <Timestamp value='2018-01-24T14:32:41.596Z' fields='time' className="time"/>
                </Box>
            </Columns>
        )
    }
}