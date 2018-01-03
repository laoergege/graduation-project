import { withTracker } from 'meteor/react-meteor-data';
import _Courses from "./courses.component";
import { courses } from "../../../api/course";

export default withTracker((props) => {
    return {
        ...props,
        courses: courses.find().fetch()
    }
})(_Courses);