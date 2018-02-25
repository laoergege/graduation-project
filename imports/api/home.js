import { Mongo } from "meteor/mongo";
import { authID } from "../utils/util";

export const home = new Mongo.Collection('home');

if (Meteor.isServer) {
    Meteor.publish('home', function () {
        return home.find()
    })
}

export const adjustHome =  new ValidatedMethod({
    name: 'adjustHome',
    validate: (data) => {
    },
    run(data){
        //验证用户是否为管理员
        authID(1, Meteor.user());

        home.upsert({id: data.id}, data);
    }
})