import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { WebApp } from "meteor/webapp";

import "../imports/api/course";
import "../imports/api/users";
import "../imports/api/sections";
import "../imports/api/chat";
import "../imports/api/homework";

Meteor.startup(() => {

    // // 创建 root 账号
    // if(!Meteor.users.findOne({username: 'root'})){
    //     Accounts.createUser({
    //         username: 'root',
    //         password: 'root',
    //         profile: {
    //             name: 'laoergege',
    //             avater: '',
    //             intro: ''
    //         }
    //     })
    // }
    // // 添加权限
    // Meteor.users.update({username: 'root'}, {
    //     $set: {
    //         permissions: [
    //             {
    //                 "name": "课程-获取",
    //                 "method": "getCourse",
    //                 "allow": true,
    //                 "url": [
    //                     "/courses",
    //                     "/courses/:id"
    //                 ]
    //             },
    //             {
    //                 "name": "课程-审核",
    //                 "method": "checkCourse",
    //                 "allow": true
    //             },
    //             {
    //                 "name": "课程-撤销",
    //                 "method": "removeCourse",
    //                 "allow": true
    //             },
    //             {
    //                 "name": "课程-编辑",
    //                 "method": "editCourse",
    //                 "allow": true
    //             }
    //         ]
    //     }
    // })

    // // 教师
    // if(!Meteor.users.findOne({username: 'teacher'})){
    //     Accounts.createUser({
    //         username: 'teacher',
    //         password: 'teacher',
    //         profile: {
    //             name: 'lys',
    //             avater: '',
    //             intro: '',
    //             role: 2
    //         }
    //     })
    // }

    // // 学生
    // if(!Meteor.users.findOne({username: 'student'})){
    //     Accounts.createUser({
    //         username: 'student',
    //         password: 'student',
    //         profile: {
    //             name: '圣所',
    //             avater: '',
    //             intro: '',
    //             role: 3
    //         }
    //     })
    // }

    // for (let index = 1; index < 100; index++) {
    //     Accounts.createUser({
    //         username: 'student'+ index,
    //         password: 'student'+ index,
    //         profile: {
    //             name: '圣所'+ index,
    //             avater: '',
    //             intro: '',
    //             num: index,
    //             role: 3
    //         }
    //     })
    // }

    // for (let index = 1; index < 10; index++) {
    //     Accounts.createUser({
    //         username: 'teacher'+ index,
    //         password: 'teacher'+ index,
    //         profile: {
    //             name: 'lys'+ index,
    //             avater: '',
    //             intro: '',
    //             num: index,
    //             role: 2
    //         }
    //     })
    // }

    // Meteor.users.find().map(val => {
    //     console.log(1)
    //     if (val.profile.role) {
    //         console.log(Meteor.users.update({_id: val._id}, {$set: { 'profile.roles': [val.profile.role]}}))
    //     }
    // })
})