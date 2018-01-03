import Main from "./main.component";
import withEditor from "../withEditor";
import { withTracker } from 'meteor/react-meteor-data';
import { editCourse } from "../../../api/course";
import { errorHnadler } from "../../../utils/util";

let info = null;    // 课程基本介绍
let mainInfo = null;    // 课程简介和教师简介

// 发布、更新课程
function release() {
    editCourse.call({info: info, mainInfo: mainInfo }, (error) => {
        error && errorHnadler(error);
        Session.set('info', {status: 'ok', content: '该课程 发布/更新 成功'});
    })
}
// 监听用户编辑课程基本信息
function onChange(content) {
    if (!info) {
        info = content;
        return;
    } 
    if (!mainInfo) {
        mainInfo = content;
    }
}

export default withTracker((props) => {
    return {
        ...props,
        release,
        onChange
    }
})(withEditor(Main));