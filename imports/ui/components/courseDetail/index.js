import CourseDetail from "./course-detail.component";
import withAnimate from "../animate";
import { withTracker } from 'meteor/react-meteor-data';
import { sections } from "../../../api/sections";

export default withTracker((props) => {
    if (Session.get('courseid')) {
        Meteor.subscribe('sections', Session.get('courseid'));    
    }
    
    return {
        ...props,
        sections: sections.find({courseid: props.course._id}).fetch(),
        editCourse:  (Session.get('permissions') && Session.get('permissions').editCourse) || false,
        postion: Session.get('postion'),
        order: Session.get('section'),
        Order: Session.get('Section')
    }
})(withAnimate(CourseDetail));