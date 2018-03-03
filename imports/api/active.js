import { Mongo } from "meteor/mongo";

export const actives = new Mongo.Collection('active');

if (Meteor.isServer) {

    // 每个一个钟检测用户活跃度
    Meteor.setInterval(function (params) {
        actives.insert({
            time: Date.now(),
            online: Meteor.users.find({ "status.online": true }).count(),
            outline: Meteor.users.find({ "status.online": false }).count()
        })
    }, 3600 * 1000);

    Meteor.users.find().observe({
        changed: function (newDocument, oldDocument) {
           
            actives.update(
                { _id: actives.findOne({}, {sort: {_id: -1}})._id },
                {
                    $set: { online: Meteor.users.find({ "status.online": true }).count(), outline: Meteor.users.find({ "status.online": false }).count() }
                }
            )
        }
    });

    Meteor.publish('actives', function () {
        return actives.find({}, { sort: { _id: -1 }, limit: 6 });
    })
}

