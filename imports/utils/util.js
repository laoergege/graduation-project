/**
 * 用户权限认证
 * @param {*} auth_name 权限名
 */
export function auth(auth_name) {
    if (!(Meteor.user().permissions && (
        Meteor.user().permissions.filter((val) => {
            return val.method === auth_name;
        }).lenght !== 0
    ))) {
        let error = new Meteor.Error('unauthorized-error');
        error.reason = '该用户没有权限';
        throw error;
    }
}

/**
 * 错误处理提示
 * unauthorized-error 权限错误
 * validation-error 数据校验错误
 * @param {*} error 
 */
export function errorHnadler(error) {
    console.log(error);

    switch (error.error) {
        case "unauthorized-error":
            Session.set('info', {status: 'critical', content: error.reason});
            break;
        case "validation-error":
            Session.set('info', {status: 'warning', content: error.reason});
        default:
            Session.set('info', {status: 'critical', content: error.reason});
            break;
    }
}

/**
 * 验证用户身份
 * @param {*} id 
 * @param {*} user 
 */
export function authID(id, user) {
    if (!user.profile.roles.includes(id)) {
        throw (new Meteor.Error('id-error', '用户身份错误！'))
    }
}


