import { Mongo } from "meteor/mongo";
import { auth, authID } from "../utils/util";

// 评价
export const EvalSchema = new SimpleSchema({
    userid: {
        type: String
    },
    name: {
        type: String
    },
    content: {
        type: String,
        optional: true
    },
    star: {
        type: Number
    }
})
// 课程
export const CourseSchema = new SimpleSchema({
    _id:{
        type: String,
        optional: true
    },
    name: {
        type: String,
        custom: function () { 
            if (!this.field('_id') && courses.findOne({name: this.value})) {
                let error = new Meteor.Error('validation-error');
                error.reason = "该课程已经存在！"
                throw (error);
            }
        }
    },
    teachers: {
        type: [String],
        optional: true
    },
    evaluate: {
        type: [EvalSchema],
        defaultValue: [],
        optional: true
    },
    info: {
        type: Object,
        optional: true,
        blackbox: true
    },
    mainInfo: {
        type: Object,
        optional: true,
        blackbox: true
    },
    notice: {
        type: String,
        optional: true
    },
    searchBy: {
        type: String,
        optional: true
    },
    createAt: {
        type: Date,
        defaultValue: new Date(),
        optional: true
    },
    status: {
        type: Number,
        defaultValue: -1,
        optional: true
    },
    resourses: {
        type: [String],
        defaultValue: [],
        optional: true
    },
    createBy: {
        type: String,
        optional: true
    }
})

export const courses = new Mongo.Collection('courses');

// 文件暂存
export const resourses = new FilesCollection({
    collectionName: 'resourses',
    storagePath: 'assets/resourses'
});

if (Meteor.isServer) {
    Meteor.publish('course.resourses', function (resourse) {
        return resourses.collection.find({_id: {$in: resourse}});
    }); 
}


if (Meteor.isServer) {
    Meteor.publish('courses', function () {
        return courses.find();
    });   

    Meteor.publish('courses.all', function () {
        return courses.find({});
    });  
}

// 编辑课程基本信息
export const editCourse = new ValidatedMethod({
    name: 'editCourse',
    validate: CourseSchema.validator(),
    run(course) {
        //验证用户权限
        auth(this.name);

        // if (!course.createAt) {
        //     course.createAt = new Date();
        // }
        course.createBy || (course.createBy = Meteor.userId());

        course.teachers || (course.teachers = [Meteor.userId()]);

        // course.status || (course.status = -1);

        courses.upsert({_id: course._id}, {$set: course})
    }
})

// 邀请教师
export const inviteTeacher = new ValidatedMethod({
    name: 'inviteTeacher',
    validate: CourseSchema.validator(),
    run(course) {
        //验证用户权限
        auth(this.name);

        courses.upsert({_id: course._id}, {$set: course})
    }
})

// 课程评价 
export const evalCourse = new ValidatedMethod({
    name: 'evalCourse',
    validate: CourseSchema.validator(),
    run(course) {
        //验证用户权限
        auth(this.name);

        courses.upsert({_id: course._id}, {$set: course})
    }
})

//修改课程状态
export const adjustStatus = new ValidatedMethod({
    name: 'adjustStatus',
    validate: new SimpleSchema({
        courseid: { type: String },
        status: { type: Number }
      }).validator(),
    run({courseid, status}){
        //验证用户是否为管理员
        authID(1, Meteor.user());

        courses.upsert({_id: courseid}, {$set: {status: status}});
    }
})