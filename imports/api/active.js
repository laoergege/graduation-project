import { Mongo } from "meteor/mongo";

export const actives = new Mongo.Collection('active');

if (Meteor.isServer) {

    let doc = actives.findOne({}, { sort: { time: -1 }});

    if ((new Date(doc.time)).getDate() !== (new Date()).getDate()  || (new Date(doc.time)).getHours() !== (new Date()).getHours()) {
        actives.insert({
            time: Date.now(),
            online: Meteor.users.find({ "status.online": true }).count(),
            outline: Meteor.users.find({ "status.online": false }).count()
        })
    
    }

    // actives.insert({
    //     time: Date.now(),
    //     online: Meteor.users.find({ "status.online": true }).count(),
    //     outline: Meteor.users.find({ "status.online": false }).count()
    // })

 
    // 每一小时检测用户活跃度
    Meteor.setInterval(function (params) {
        actives.insert({
            time: Date.now(),
            online: Meteor.users.find({ "status.online": true }).count(),
            outline: Meteor.users.find({ "status.online": false }).count()
        })
    }, 3600 * 1000);

    Meteor.users.find().observe({
        changed: function (newDocument, oldDocument) {

            let id = actives.findOne({}, {sort: {time: -1}})._id;
           
            actives.update(
                { _id:  id},
                {
                    $set: { online: Meteor.users.find({ "status.online": true }).count(), outline: Meteor.users.find({ "status.online": false }).count() }
                }
            )
        }
    });

    Meteor.publish('actives', function () {
        return actives.find({}, { sort: { time: -1 }, limit: 5 });
    })
}

