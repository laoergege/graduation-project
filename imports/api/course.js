import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";
import { throws } from "assert";

// 评价
const EvalSchema = new SimpleSchema({
    userid: {
        type: String
    },
    content: {
        type: Object,
        optional: true,
        blackbox: true
    },
    date: {
        type: Date,
        defaultValue: new Date()
    },
    score: {
        type: Number
    }
})
// 课程
const CourseSchema = new SimpleSchema({
    name: {
        type: String,
        custom: function () {
            if (courses.findOne({name: this.value}).count !== 1) {
                throws (new Meteor.Error('validation-error').reason = "该课程已经存在！");
            }
        }
    },
    teachers: {
        type: [String],
        defaultValue: [],
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
    sections: {
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

if (Meteor.isServer) {
    Meteor.publish('courses', function ({limit, length}) {
        return courses.find({}, {limit: (limit + length)});
    });   
}

// 编辑课程基本信息
export const editCourse = new ValidatedMethod({
    name: 'editCourse',
    validate: CourseSchema.validator(),
    run(course) {
        //验证用户权限
        auth(this.name);

        if (!course.createAt) {
            course.createAt = new Date();
        }
        course.createBy || (course.createBy = Meteor.userId());

        course.teachers || (course.teachers = [Meteor.userId()]);

        course.status || (course.status = -1);

        courses.upsert({_id: course.id}, {$set: course})
    }
})