import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";

export const sections = new Mongo.Collection('sections');

if (Meteor.isServer) {
    Meteor.publish('sections', function (courseid) {
        return sections.find({courseid: courseid});
    });   
}

export const SectionSchema = new SimpleSchema({
    _id:{
        type: String,
        optional: true
    },
    courseid: {
        type: String
    },
    name: {
        type: String
    },
    contents: {
        type: [{
            name: { type: String },
            content: { type: Object, optional: true, blackbox: true }
        }],
        optional: true,
        defaultValue: []
    },
    order: {
        type: Number
    }
})

// 编辑章节内容
export const editSection = new ValidatedMethod({
    name: 'editSection',
    validate: SectionSchema.validator(),
    run(section) {
        //验证用户权限
        auth('editCourse');

        sections.upsert({_id: section._id},{$set: section});
    }
})