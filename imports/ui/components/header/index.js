import Header from "./header.component";
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router'

export default withTracker((props) => {
    if (Meteor.user() && Meteor.user().permissions) {
        let permissions = {};
        Meteor.user().permissions.map(val => {
            permissions[val.method] = val.allow;
            if (Session.get('course') && Session.get('course').teachers && !Session.get('course').teachers.includes(Meteor.userId())) {
                permissions['editCourse'] = false;
            } 
        })
        Session.set('permissions', permissions);
    }else{
         // 清楚会话
         Session.clear();
    }
   
    return {
        ...props,
        user: Meteor.user(),
        permissions: Session.get('permissions'),
        notice: Session.get('notice')
    }
})(withRouter(Header))