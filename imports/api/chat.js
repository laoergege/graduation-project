import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";
import { Subject } from "rxjs";

// 持久化消息储存
const messages = new Mongo.Collection('messages');

export const MsgSchema = new SimpleSchema({
    _id: {
        type: String
    },
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

// 消息集合
export let msgs = null;

if (Meteor.isClient) {
    msgs = new Mongo.Collection(null);
    new Mongo.Collection('msgs').find().observe({
        added(doc) {
            msgs.insert(doc);
        }
    })
}

// msg 监听器
const sub = new Subject();

if (Meteor.isServer) {

    Meteor.publish('msgs', function () {
        // 监听消息
        let subscription = sub.subscribe({
            next: (doc) => {
                // 发送给指定用户
                if (doc.to === this.userId) {
                    // doc.from = Meteor.users.findOne({ _id: doc.from });
                    let user = Meteor.users.findOne({ _id: doc.from });
                    this.added('users', user._id, user);
                    this.added('msgs', doc._id, doc);
                }
            }
        });
        this.onStop(() => {
            // 取消监听
            subscription.unsubscribe();
        });
    })
}

export const getChat = new ValidatedMethod({
    name: 'getChat',
    validate: null,
    run() {
        auth('getChat');

        // 订阅消息
        if (Meteor.isClient) {
            Meteor.subscribe('msgs');
            if (Meteor.user().profile.roles.includes(3)) {
                Meteor.subscribe('Meteor.users.teachers');
            }
        }
    }
})

export const sendMsg = new ValidatedMethod({
    name: 'sendMsg',
    validate: MsgSchema.validator(),
    run(msg) {
        auth('getChat');

        if (Meteor.isClient) {
            msgs.insert(msg);
        }

        if (Meteor.isServer) {
            sub.next(msg);
        }
    }
})