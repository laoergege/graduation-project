import React, { PureComponent } from "react";

import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';

export default class extends PureComponent {

    text = (msg, i) => {
        return  ( <Box pad='small' direction="row" className="msg" key={i}>                   
        <Box align='center' className="ctext"
                pad='medium'
                colorIndex='light-2'>
                {msg.content.text}
            </Box>
        </Box>)
    }

    render() {
        return (
            <Box flex={true} className="msg-window">
                <Columns size='medium'>
                   {this.props.msgs && (this.props.msgs.map((val, i) => {
                       return this[val._type](val, i)
                   }))}
                </Columns>
            </Box>
        )
    }
}

/**
 * props{
 *  msgs
 * }
 */