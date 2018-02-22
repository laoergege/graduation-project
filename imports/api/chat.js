import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";
import { Subject } from "rxjs";
import { FilesCollection } from 'meteor/ostrio:files';

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
            if (location.pathname !== '/chat') {
                Session.set('notice', (Session.get('notice') || 0) + 1);   
            }
            Session.set(doc.from, true);
        }
    })
}

// msg 监听器
const sub = new Subject();

if (Meteor.isServer) {

    Meteor.publish('msgs', function () {
        let outlineMsgs = [];

        // 发送离线消息
        messages.find({to: this.userId}).forEach(msg => {
            let user = Meteor.users.findOne({ _id: msg.from }, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } });
            this.added('users', user._id, user);
            this.added('msgs', msg._id, msg);
            outlineMsgs.push(msg._id);
        });

        this.ready();

        // 删除离线消息
        messages.remove({_id: {$in: outlineMsgs}});

        // 监听消息
        let subscription = sub.subscribe({
            next: (doc) => {
                // 发送给指定用户
                if (doc.to === this.userId) {
                    try {
                        // doc.from = Meteor.users.findOne({ _id: doc.from });
                        let user = Meteor.users.findOne({ _id: doc.from }, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } });
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

export const sendMsg = new ValidatedMethod({
    name: 'sendMsg',
    validate: MsgSchema.validator(),
    run(msg) {
        auth('getChat');

        if (Meteor.isServer) {
            if (msg._type !== 'text') {
                msg.content[msg._type] = chatfiles.findOne({ _id: msg.content[msg._type] }).link();
            }
            // 判断当前用户是否在线
            if (!Meteor.users.findOne({_id: msg.to}).status.online) {
                messages.insert(msg);
            }else{
                sub.next(msg);
            }
        }
    }
})

