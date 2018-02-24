import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

export class Notice extends PureComponent {

    handleChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.innerText);
    }

    render() {
        return (
            <Box align="center" colorIndex="light-1" size={{ height: { min: 'medium' } }} pad={{ horizontal: 'small' }}>
                <Box separator="bottom" pad="small" align="center" style={{width: '100%'}}>
                    <Heading tag='h3'
                        strong={true}>
                        公告
                    </Heading>
                </Box>
                <div style={{padding: '12px', fontSize: '18px', minHeight: '100px', width: '100%'}} 
                    suppressContentEditableWarning
                    contentEditable={this.props.permissions && this.props.permissions.editCourse} onInput={this.handleChange}>
                    {this.props.content || ''}
                </div>
            </Box>
        )
    }
} 

export default withTracker(() => {
    return {
        permissions: Session.get('permissions')
    }
})(Notice)
