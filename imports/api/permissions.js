import { Mongo } from "meteor/mongo";

export const permissions = new Mongo.Collection('permissions');

if (Meteor.isServer) {
    Meteor.publish('permissions', function () {
        return permissions.find();
    })
}