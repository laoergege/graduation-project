import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";

import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';

export default class extends PureComponent {

    text = (msg, i) => {
        return  ( <Box pad='small' direction="row" className="msg" key={i} justify={msg.from === Meteor.user()._id ? 'end' : 'start'} 
            ref={(comp) => { 
                if (comp) {
                    findDOMNode(comp).scrollIntoView();
                }
            }}>                   
        <Box align='center' className="ctext"
                pad='small'
                colorIndex={msg.from === Meteor.user()._id ? 'ok' : 'light-2' }>
                {msg.content.text}
            </Box>
        </Box>)
    }

    render() {
        return (
            <div className="msg-window">
                
                   {this.props.msgs && (this.props.msgs.map((val, i) => {
                       return this[val._type](val, i)
                   }))}
                
            </div>
        )
    }
}

/**
 * props{
 *  msgs
 * }
 */