import Main from "./main.component";
import withEditor from "../withEditor";
import { withTracker } from 'meteor/react-meteor-data';
import { editCourse, courses } from "../../../api/course";
import { errorHnadler } from "../../../utils/util";
import { replaceParagraphType } from "../../components/withEditor/with-editor.component";

// 发布、更新课程
function release(course) {
    if (course) {
        // course.mainInfo = replaceParagraphType(Session.get('mainInfo'));

        editCourse.call(course, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '该课程 发布/更新 成功' });
            }
        })
    }
}

export default withTracker((props) => {
    return {
        ...props,
        release,
        permissions: Session.get('permissions')
    }
})(withEditor(Main));