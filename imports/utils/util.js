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
    error.error === "unauthorized-error" && Session.set('info', {status: 'critical', content: error.reason});
    error.error === "validation-error" && Session.set('info', {status: 'warning', content: error.reason});
}