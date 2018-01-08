import Main from "./main.component";

import { withTracker } from 'meteor/react-meteor-data';
import { editCourse, courses } from "../../../api/course";
import { errorHnadler } from "../../../utils/util";
import { replaceParagraphType } from "../../components/withEditor/with-editor.component";

import { CourseSchema } from "../../../api/course";

// 发布、更新课程
function release(course) {
    if (course) {
        CourseSchema.clean(course);

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
})(Main);