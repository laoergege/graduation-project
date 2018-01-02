import Header from "./header.component";
import { withTracker } from 'meteor/react-meteor-data';

export default withTracker((props) => {
    return {
        ...props,
        user: Meteor.user
    }
})(Header)