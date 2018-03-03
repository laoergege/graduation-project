import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { WebApp } from "meteor/webapp";
import { Mongo } from "meteor/mongo";

import "../imports/api/course";
import "../imports/api/users";
import "../imports/api/sections";
import "../imports/api/chat";
import "../imports/api/homework";
import "../imports/api/permissions";
import "../imports/api/home";
import "../imports/api/active";

WebApp.connectHandlers.use('*', (req, res, next) => {
    console.log(1)
    res.writeHead(301, { 'Location': 'http://localhost:3000' });;
    res.end();
})

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
    //     console.log(Meteor.users.update({_id: val._id}, {$set: { 'profile.num':  val.profile.num+''}}))
    // })

    // let p = new Mongo.Collection('permissions');
    // p.insert({
    //     id: 0,
    //     name: '',
    //     permissions: [
    //         {
    //             "name": "课程-获取",
    //             "method": "getCourse",
    //             "allow": false,
    //             "url": [
    //                 "/courses",
    //                 "/courses/:id"
    //             ]
    //         },
    //         {
    //             "name": "课程-撤销",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-审核",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-编辑",
    //             "method": "editCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "答疑-获取",
    //             "method": "getChat",
    //             "allow": false,
    //             "url": [
    //                 "/chat"
    //             ]
    //         },
    //         {
    //             "name": "作业-创建",
    //             "method": "addHomework",
    //             "allow": false,
    //         },
    //         {
    //             "name": "作业-获取",
    //             "method": "getHW",
    //             "allow": false,
    //             "url": [
    //                 "/homeworks/:name"
    //             ]
    //         },
    //         {
    //             "name": "作业-提交",
    //             "method": "upHW",
    //             "allow": false
    //         },
    //         {
    //             "name": "作业-评阅",
    //             "method": "reviewHW",
    //             "allow": false
    //         }
    //     ]    
    // })
    // p.insert({
    //     id: 1,
    //     name: '管理员',
    //     permissions: [
    //         {
    //             "name": "课程-获取",
    //             "method": "getCourse",
    //             "allow": true,
    //             "url": [
    //                 "/courses",
    //                 "/courses/:id"
    //             ]
    //         },
    //         {
    //             "name": "课程-撤销",
    //             "method": "removeCourse",
    //             "allow": true
    //         },
    //         {
    //             "name": "课程-审核",
    //             "method": "removeCourse",
    //             "allow": true
    //         },
    //         {
    //             "name": "课程-编辑",
    //             "method": "editCourse",
    //             "allow": true
    //         },
    //         {
    //             "name": "答疑-获取",
    //             "method": "getChat",
    //             "allow": true,
    //             "url": [
    //                 "/chat"
    //             ]
    //         },
    //         {
    //             "name": "作业-创建",
    //             "method": "addHomework",
    //             "allow": true,
    //         },
    //         {
    //             "name": "作业-获取",
    //             "method": "getHW",
    //             "allow": true,
    //             "url": [
    //                 "/homeworks/:name"
    //             ]
    //         },
    //         {
    //             "name": "作业-提交",
    //             "method": "upHW",
    //             "allow": true
    //         },
    //         {
    //             "name": "作业-评阅",
    //             "method": "reviewHW",
    //             "allow": true
    //         }
    //     ]    
    // })
    // p.insert({
    //     id: 2,
    //     name: '教师',
    //     permissions: [
    //         {
    //             "name": "课程-获取",
    //             "method": "getCourse",
    //             "allow": true,
    //             "url": [
    //                 "/courses",
    //                 "/courses/:id"
    //             ]
    //         },
    //         {
    //             "name": "课程-撤销",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-审核",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-编辑",
    //             "method": "editCourse",
    //             "allow": true
    //         },
    //         {
    //             "name": "答疑-获取",
    //             "method": "getChat",
    //             "allow": true,
    //             "url": [
    //                 "/chat"
    //             ]
    //         },
    //         {
    //             "name": "作业-创建",
    //             "method": "addHomework",
    //             "allow": true,
    //         },
    //         {
    //             "name": "作业-获取",
    //             "method": "getHW",
    //             "allow": true,
    //             "url": [
    //                 "/homeworks/:name"
    //             ]
    //         },
    //         {
    //             "name": "作业-提交",
    //             "method": "upHW",
    //             "allow": false
    //         },
    //         {
    //             "name": "作业-评阅",
    //             "method": "reviewHW",
    //             "allow": true
    //         }
    //     ]    
    // })
    // p.insert({
    //     id: 3,
    //     name: '学生',
    //     permissions: [
    //         {
    //             "name": "课程-获取",
    //             "method": "getCourse",
    //             "allow": true,
    //             "url": [
    //                 "/courses",
    //                 "/courses/:id"
    //             ]
    //         },
    //         {
    //             "name": "课程-撤销",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-审核",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-编辑",
    //             "method": "editCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "答疑-获取",
    //             "method": "getChat",
    //             "allow": true,
    //             "url": [
    //                 "/chat"
    //             ]
    //         },
    //         {
    //             "name": "作业-创建",
    //             "method": "addHomework",
    //             "allow": false,
    //         },
    //         {
    //             "name": "作业-获取",
    //             "method": "getHW",
    //             "allow": true,
    //             "url": [
    //                 "/homeworks/:name"
    //             ]
    //         },
    //         {
    //             "name": "作业-提交",
    //             "method": "upHW",
    //             "allow": true
    //         },
    //         {
    //             "name": "作业-评阅",
    //             "method": "reviewHW",
    //             "allow": false
    //         }
    //     ]    
    // })
    // p.insert({
    //     id: 4,
    //     name: '游客',
    //     permissions: [
    //         {
    //             "name": "课程-获取",
    //             "method": "getCourse",
    //             "allow": true,
    //             "url": [
    //                 "/courses",
    //                 "/courses/:id"
    //             ]
    //         },
    //         {
    //             "name": "课程-撤销",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-审核",
    //             "method": "removeCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "课程-编辑",
    //             "method": "editCourse",
    //             "allow": false
    //         },
    //         {
    //             "name": "答疑-获取",
    //             "method": "getChat",
    //             "allow": false,
    //             "url": [
    //                 "/chat"
    //             ]
    //         },
    //         {
    //             "name": "作业-创建",
    //             "method": "addHomework",
    //             "allow": false,
    //         },
    //         {
    //             "name": "作业-获取",
    //             "method": "getHW",
    //             "allow": false,
    //             "url": [
    //                 "/homeworks/:name"
    //             ]
    //         },
    //         {
    //             "name": "作业-提交",
    //             "method": "upHW",
    //             "allow": false
    //         },
    //         {
    //             "name": "作业-评阅",
    //             "method": "reviewHW",
    //             "allow": false
    //         }
    //     ]    
    // })
})