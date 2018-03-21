import { Mongo } from "meteor/mongo";
import { auth } from "../utils/util";

export const homeworks = new Mongo.Collection('homeworks');

if (Meteor.isServer) {
    Meteor.publish('homeworks', function (courseid) {

        if (Meteor.user() && Meteor.user().profile.roles.includes(3)) {
            // 过滤其他学生的答案
            homeworks.find({ courseid: courseid }, {
                fields: {
                    _id: 1,
                    name: 1,
                    createAt: 1,
                    createBy: 1,
                    questions: 1,
                    answers: 1,
                    courseid: 1,
                    finishers: { $elemMatch: { id: this.userId } },
                    totalScore: 1
                }
            }).forEach(doc => {
                // 格式答题卡
                for (const key in doc.answers) {
                    doc.answers[key].answers = doc.answers[key].answers.map(val => {
                        if (typeof val === 'string') {
                            return '';
                        }else{
                            return {}
                        }
                        
                    })
                }

                if (!doc.finishers) {
                    doc.finishers = [];
                }

                // 发送数据
                this.added('homeworks', doc._id, doc)
            });

            this.ready();
        } else {
            return homeworks.find({ courseid: courseid })
        }

    })
}

export const addHomework = new ValidatedMethod({
    name: 'addHomework',
    validate: () => { },
    run(homework) {
        auth('addHomework');

        homework.totalScore = 0;
        // 计算试题总分
        for (const key in homework.answers) {
            if (homework.answers.hasOwnProperty(key)) {
                const element = homework.answers[key];
                element.score = parseInt(element.score);
                element.totalScore = element.answers.length *  element.score;
                homework.totalScore += element.totalScore;
            }
        }

        homeworks.upsert({ _id: homework._id }, homework);
    }
})

export const uphomework = new ValidatedMethod({
    name: 'upHW',
    validate: () => { },
    run(param) {
        auth('upHW');

        let finisher = {
            id: this.userId,
            time: new Date(),
            answers: param.answers
        }

        let answers = param.answers;

        // 计算客观题成绩
        if (Meteor.isServer) {
            let hw = homeworks.findOne({ _id: param.id });

            answers.single.totalScore = 0;    
            answers.single.score = parseInt(answers.single.score);        
            hw.answers.single.answers.forEach((val, i) => {
                if (val === answers.single.answers[i]) {  
                    answers.single.totalScore += answers.single.score;
                }
            })

            answers.blank.totalScore = 0;
            answers.blank.score = parseInt(answers.blank.score);
            hw.answers.blank.answers.forEach((val, i) => {
                if (answers.blank.answers[i].includes(val)) {
                    answers.blank.totalScore += answers.blank.score;
                }
            })

            answers.short.totalScore = 0;    
        }

        homeworks.update({ _id: param.id }, { $push: { finishers: finisher } });
    }
})

export const mark = new ValidatedMethod({
    name: 'reviewHW',
    validate: () => { },
    run({ hwid, userid, short }) {
        // 计算主观题
        if (Meteor.isServer) {
            short.totalScore = 0;
            // 评分简答题
            short.answers.forEach(val => {   
                short.totalScore += parseInt(val.score);   
            })

            homeworks.update({ _id: hwid, 'finishers.id': userid }, { $set: { 'finishers.$.answers.short': short } })
        }
    }
})





