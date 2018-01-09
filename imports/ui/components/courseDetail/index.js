import CourseDetail from "./course-detail.component";
import withAnimate from "../animate";
import { withTracker } from 'meteor/react-meteor-data';
import { sections } from "../../../api/sections";

export default withTracker((props) => {
    return {
        ...props,
        sections: sections.find({courseid: props.course._id}).fetch(),
        editCourse: Session.get('permissions').editCourse || false
    }
})(withAnimate(CourseDetail));