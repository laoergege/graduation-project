import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import "../imports/api/course";
import "../imports/api/users";

Meteor.startup(() => {
    // 创建 root 账号
    if(!Meteor.users.findOne({username: 'root'})){
        Accounts.createUser({
            username: 'root',
            password: 'root',
            profile: {
                name: 'laoergege',
                avater: '',
                intro: ''
            }
        })
    }
    // 添加权限
    Meteor.users.update({username: 'root'}, {
        $set: {
            permissions: [
                {
                    "name": "课程-获取",
                    "method": "getCourse",
                    "allow": true,
                    "url": [
                        "/courses",
                        "/courses/:id"
                    ]
                },
                {
                    "name": "课程-审核",
                    "method": "checkCourse",
                    "allow": true
                },
                {
                    "name": "课程-撤销",
                    "method": "removeCourse",
                    "allow": true
                },
                {
                    "name": "课程-编辑",
                    "method": "editCourse",
                    "allow": true
                },
    
    
                {
                    "name": "课程-内容-获取",
                    "method": "getContent",
                    "allow": true,
                    "url": [
                        "/courses/:id/content"
                    ]
                },
                {
                    "name": "课程-内容-删除",
                    "method": "removeContent",
                    "allow": true
                },
                {
                    "name": "课程-内容-编辑",
                    "method": "editContent",
                    "allow": true
                },
                {
                    "name": "课程-内容-发布",
                    "method": "publishContent",
                    "allow": true
                }
            ]
        }
    })
})