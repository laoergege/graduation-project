import { withTracker } from 'meteor/react-meteor-data';
import _Courses from "./courses.component";
import { courses } from "../../../api/course";

export default withTracker((props) => {
    let handler = Meteor.subscribe('courses');
    let status = (Meteor.user() && Meteor.user().profile.roles.includes(3)) ? 1 : [-1]

    return {
        ...props,
        courses: courses.find().fetch().filter(course => {
            if (Meteor.user() && Meteor.user().profile.roles.includes(2)) {
                return true
            }else if (course.status === 1) {
                return true
            }else{
                return false;
            }
        }),
        permissions: Session.get('permissions'),
        loading: !handler.ready()
    }
})(_Courses);
