import Main from "./main.component";
import withEditor from "../withEditor";
import { withTracker } from 'meteor/react-meteor-data';
import { editCourse, courses } from "../../../api/course";
import { errorHnadler } from "../../../utils/util";
import { replaceParagraphType } from "../../components/withEditor/with-editor.component";

// 发布、更新课程
function release() {
    editCourse.call({
            info: replaceParagraphType(Session.get('basisInfo')),
            mainInfo: replaceParagraphType(Session.get('mainInfo')),
            name: Session.get('courseName') 
        }, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '该课程 发布/更新 成功' });
            }
        })
}

export default withTracker((props) => {
    let course = courses.find({ name: props.match.params.id }).fetch()[0];
    course && Session.set('courseName', course.name);

    return {
        ...props,
        release,
        course: course,
        permissions: Session.get('permissions')
    }
})(withEditor(Main));