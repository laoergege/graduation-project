import Header from "./header.component";
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router'

export default withTracker((props) => {
    if (!Session.get('permissions') && Meteor.user() && Meteor.user().permissions) {
        let permissions = {};
        Meteor.user().permissions.map(val => permissions[val.method] = val.allow);
        Session.set('permissions', permissions);
    }
   
    return {
        ...props,
        user: Meteor.user(),
        permissions: Session.get('permissions')
    }
})(withRouter(Header))