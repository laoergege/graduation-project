import { Accounts } from 'meteor/accounts-base';
import { authID } from "../utils/util";
import { check } from 'meteor/check'

if (Meteor.isServer) {
    Meteor.publish('Meteor.users.initials', function () {
        if (Meteor.userId) {
            if (Meteor.user() && Meteor.user().profile.roles.includes(1)) {
                return Meteor.users.find({ _id: Meteor.userId() }, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } })
            } else {
                return Meteor.users.find({ _id: Meteor.userId() }, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } })
            }
        } else {
            return this.ready();
        }
    })

    Meteor.publish('Meteor.users.teachers', function () {
        return Meteor.users.find({ 'profile.roles': { $all: [2] } }, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } });
    })

    Meteor.publish('Meteor.users.students', function () {
        return Meteor.users.find({ 'profile.roles': { $all: [3] } }, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } });
    })

    Meteor.publish('Meteor.users', function() {
        return Meteor.users.find({});
    })

    Meteor.publish('Meteor.users.pages', function (page) {
        return Meteor.users.find({}, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1, status: 1 } })
    })
}

export const editUser = new ValidatedMethod({
    name: 'editUser',
    validate: () => { },
    run(user) {
        authID(1, Meteor.user());

        if (Meteor.isServer) {
            if (Accounts.findUserByUsername(user.username)) {
                Meteor.users.update({_id: user._id}, {$set: user});
            }else{
                Accounts.createUser({
                    username: user.username,
                    password: '123456',
                    profile: {
                        name: user.profile.name,
                        avater: '',
                        intro: user.profile.intro,
                        num: user.profile.num,
                        roles: user.profile.roles
                    }
                })
                Meteor.users.update({username: user.username,}, {$set: {permissions: user.permissions}});
            }     
        }
    }
})
