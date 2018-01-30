import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";
import { Subject } from "rxjs";
import { FilesCollection } from 'meteor/ostrio:files';
import { take } from "rxjs/operator/take";

// 持久化消息储存
const messages = new Mongo.Collection('messages');
// 文件暂存
export const chatfiles = new FilesCollection({
    collectionName: 'ChatFile',
    storagePath: 'assets/chatUpload'
});

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

// 消息储存集合
export let msgs = null;

if (Meteor.isClient) {
    msgs = new Mongo.Collection(null);
    // 接受服务端信息器
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
                    try {
                        // doc.from = Meteor.users.findOne({ _id: doc.from });
                        let user = Meteor.users.findOne({ _id: doc.from });
                        this.added('users', user._id, user);
                        this.added('msgs', doc._id, doc);
                    } catch (error) {
                        throw (new Meteor.Error('server-error', '服务器出现问题了'));
                    }
                }
            }
        });
        this.onStop(() => {
            // 取消监听
            subscription.unsubscribe();
        });
    })

    Meteor.publish('chatfiles', function () {
        return chatfiles.collection.find({ userId: this.userId })
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
            // Meteor.subscribe('chatfiles');
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

        if (Meteor.isServer) {
            if (msg._type !== 'text') {
                msg.content[msg._type] = chatfiles.findOne({ _id: msg.content[msg._type] }).link();
            }

            sub.next(msg);
        }
    }
})

