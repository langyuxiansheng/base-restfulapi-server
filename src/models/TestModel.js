/**
 * 定义出对应特定集合的Model并向外暴露
 * 此处只做数据模型和参数校样
 * 此模型仅限mongoDB使用
 */

/**
 * UserModel
 */
export class UserModel {
    constructor({
        username,
        password
    }) {
        if (username && password) {
            this.username = username;
            this.password = password;
        } else {
            throw new Error('username or password is error');
        }
    }
};