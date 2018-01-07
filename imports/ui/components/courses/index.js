import { withTracker } from 'meteor/react-meteor-data';
import _Courses from "./courses.component";
import { courses } from "../../../api/course";

function onMore(length) {
    Meteor.subscribe('courses', {limit: 4, length: length});
}

export default withTracker((props) => {
    return {
        ...props,
        courses: courses.find().fetch(),
        onMore,
        permissions: Session.get('permissions')
    }
})(_Courses);
