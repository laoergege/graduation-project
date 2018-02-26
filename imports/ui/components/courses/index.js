import { withTracker } from 'meteor/react-meteor-data';
import _Courses from "./courses.component";
import { courses } from "../../../api/course";

export default withTracker((props) => {
    let handler = Meteor.subscribe('courses');

    return {
        ...props,
        courses: courses.find().fetch(),
        permissions: Session.get('permissions'),
        loading: !handler.ready()
    }
})(_Courses);
