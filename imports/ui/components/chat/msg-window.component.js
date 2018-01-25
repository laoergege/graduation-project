import React, { PureComponent } from "react";

import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';

export default class extends PureComponent {
    render() {
        return (
            <Box flex={true} className="msg-window">
                <Columns size='medium'>
                    <Box pad='small' margin='small' direction="row" className="msg">
                        <Image src='/img/chat.png' size='thumb' style={{objectFit: 'contain'}}/>
                        <Box align='center' className="ctext"
                            pad='medium'
                            margin='small'
                            colorIndex='light-2'>
                            Box 2
                        </Box>
                    </Box>
                </Columns>
            </Box>
        )
    }
}