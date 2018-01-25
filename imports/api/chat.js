import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";

// 持久化消息储存
const messages = new Mongo.Collection('messages');

export const MsgSchema =  new SimpleSchema({
    _type: {
        type: String
    },
    content: {
        type: Object,
        blackbox: true
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    createAt: {
        type: Date,
        defaultValue: new Date()
    }
})

// 本地集合
export const msgs = new Mongo.Collection('msgs', {connection: null});

if (Meteor.isServer) {
    Meteor.publish('msgs', function () {
        // 获取留言信息
        messages.find({to: this.userId}, {sort: {createAt: -1}}).forEach((doc) => {

            doc.from = Meteor.users.find({_id: doc.from});

            this.added('msgs', doc._id, doc);
        })
        this.ready();
        // 监听在线信息
        msgs.find({to: this.userId}, {sort: {createAt: -1}}).observeChanges({
            added(id, fields){

                doc.from = Meteor.users.find({_id: doc.from});

                this.added('msgs', id, fields);
            }
        })
    })   
}

export const getChat = new ValidatedMethod({
    name: 'getChat',
    validate: () => (true),
    run() {
        auth('getChat');

        let user = Meteor.user();

        // 该用户为学生，获取教师列表
        if (user.profile.roles.indexOf(3)) {
            return Meteor.users.find({'profile.roles': {$all: [2]}})
        }

        // 订阅消息
        if (Meteor.isClient) {
            Meteor.subscribe('msgs');
        }
    }
})

export const sendMsg = new ValidatedMethod({
    name: 'sendMsg',
    validate: MsgSchema.validator(),
    run(msg) {
        auth('getChat');

        msg.insert(msg);
    }
})