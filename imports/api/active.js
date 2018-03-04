import { Mongo } from "meteor/mongo";

export const actives = new Mongo.Collection('active');

if (Meteor.isServer) {

    let doc = actives.findOne({}, { sort: { time: -1 }});

    console.log((new Date(doc.time)).getDate())

    if ((new Date(doc.time)).getDate() !== (new Date()).getDate()) {
        actives.insert({
            time: Date.now(),
            online: Meteor.users.find({ "status.online": true }).count(),
            outline: Meteor.users.find({ "status.online": false }).count()
        })
    
    }
 
    // 每一天检测用户活跃度
    Meteor.setInterval(function (params) {
        actives.insert({
            time: Date.now(),
            online: Meteor.users.find({ "status.online": true }).count(),
            outline: Meteor.users.find({ "status.online": false }).count()
        })
    }, 24 * 3600 * 1000);

    Meteor.users.find().observe({
        changed: function (newDocument, oldDocument) {

            let id = actives.findOne({}, {sort: {time: -1}})._id;

            console.log(id)
           
            actives.update(
                { _id:  id},
                {
                    $set: { online: Meteor.users.find({ "status.online": true }).count(), outline: Meteor.users.find({ "status.online": false }).count() }
                }
            )
        }
    });

    Meteor.publish('actives', function () {
        return actives.find({}, { sort: { _id: -1 }, limit: 5 });
    })
}

