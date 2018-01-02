import React from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from "meteor/session";
import Toast from 'grommet/components/Toast';

export default withTracker((props) => {
    return {
        info: Session.get('info')
    }
})((props) => {

    function onClose() {
        Session.set('info', null);
    }

    if(props.info){
        return (
            <Toast status={props.info.status} onClose={onClose}>
                {props.info.content}
            </Toast>
        )
    }
    return ''
})