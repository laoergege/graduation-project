import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";
import { check } from "meteor/check";

export const sections = new Mongo.Collection('sections');

if (Meteor.isServer) {
    Meteor.publish('sections', function (courseid) {
        return sections.find({ courseid: courseid });
    });
}

export const ContentSchema = new SimpleSchema({
    name: {
        type: String
    },
    content: { type: Object, blackbox: true, optional: true, defaultValue: {} },
    createAt: {
        type: Date,
        defaultValue: new Date()
    },
    order: {
        type: Number,
        defaultValue: 0
    }
})

export const SectionSchema = new SimpleSchema({
    _id: {
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
        type: [ContentSchema],
        optional: true,
        defaultValue: []
    },
    order: {
        type: Number
    }
})

// 添加章节
export const addSection = new ValidatedMethod({
    name: 'addSection',
    validate: SectionSchema.validator(),
    run(section) {
        //验证用户权限
        auth('editCourse');

        sections.upsert({ _id: section._id }, { $set: section });
    }
})

// 修改章节名称
export const alterSection = new ValidatedMethod({
    name: 'alterSection',
    validate(args) {
        check(args, String);
    },
    run({ id, name }) {
        //验证用户权限
        auth('editCourse');

        sections.update({ _id: id }, { $set: { name } });
    }
})

// 编辑章节
export const editSection = new ValidatedMethod({
    name: 'editSection',
    validate({ sectionid, content }) {
        check(sectionid, String);
        check(content, ContentSchema);
    },
    run({ sectionid, content }) {
        //验证用户权限
        auth('editCourse');

        if (sections.findOne({ _id: sectionid, 'contents.order': content.order })) {
            sections.update({ _id: sectionid, 'contents.order': content.order }, { $set: { 'contents.$': content } });
        } else {
            sections.update({ _id: sectionid }, { $addToSet: { contents: content } });
        }
    }
})  