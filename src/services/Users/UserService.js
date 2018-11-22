import result from '../../tools/Result';
import middleware from '../../middleware';
const {
    ValidateTools
} = middleware.ValidateTools;
const validateTools = new ValidateTools();

// import sequelize from '../lib/sequelize';
// const {
//     database1Util
// } = sequelize;
// const userModel = database1Util.import(`../models/userModel`);

/**
 * test TestService
 * 本页面处理业务逻辑 接收参数与返回处理结果
 */
module.exports = class UserService {

    // /**
    //  * 用户注册
    //  * @param {*} user
    //  */
    // async userRegister(user) {
    //     try {
    //         const res = await userModel.create(user);
    //         return result.success(null, res);
    //     } catch (error) {
    //         console.log(error);
    //         return result.failed();
    //     }
    // }

    /**
     * 用户登录
     * @param {*} user
     */
    async userLogin({
        username,
        password
    }) {
        try {
            /*  const res = await userModel.findOne({
                 where: {
                     username,
                     password
                 }
             });
             if (res) {
                 return result.success(null, res);
             } else {
                 return result.failed(`用户名或密码错误`);
             } */
            const userInfo = {
                admin: 'admin',
                roleId: 1531531534865486,
                username: '超级飞侠',
                roleName: '超级管理员',
                userId: 123516186461
            };

            const token = validateTools.getJWT(userInfo, 60);

            console.log(token);
            return result.success('签发token', {
                token
            });
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 获取用户列表
     * @param {*} ctx
     */
    async getUserList(jwt) {
        try {
            const validate = validateTools.validateJWT(jwt);
            if (validate) {
                console.log(validate);
                return result.success('解析token', validate);
            } else {
                return result.authorities();
            }
            /*
               const res = await userModel.findAll({
                   where: {},
                   attributes: ['id', 'username', 'password']
               });
               return result.pageData(null, null, res, res.length, 10, 1); */
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    // /**
    //  * 事务demo
    //  * @param {*} data
    //  */
    // async demoTest(data) {
    //     // 创建事务
    //     tx_dbUtil.transaction((t) => {
    //         // 在事务中执行操作
    //         return AgentInfoModel.create({
    //             IpAddress: IP,
    //             Explain: Explain,
    //             AgentUsename: AgentInfo.AgentUsename,
    //             AgentNumber: AgentNumber,
    //             CreatedName: AgentUsename
    //         }, { transaction: t }).then((user) => {
    //             return AgentIpListModel.findAndCount(user, { transaction: t })
    //         });
    //     }).then((results) => {
    //         console.log(`操作成功，事务会自动提交`, results);
    //         /* 操作成功，事务会自动提交 */
    //     }).catch((err) => {
    //         console.log(`操作失败，事件会自动回滚`, err);
    //         /* 操作失败，事件会自动回滚 */
    //     });
    // }

    // /**
    //  * 事务demo
    //  * @param {*} data
    //  */
    // async demoTest1(data) {
    //     try {
    //         // 创建事务
    //         /* 操作成功，事务会自动提交 */
    //         /* 操作失败，事件会自动回滚 */
    //         const results = await tx_dbUtil.transaction(async(t) => {
    //             // 在事务中执行操作
    //             const a = await a.create( /* {} */ , { transaction: t });
    //             const b = await b.create( /* {} */ , { transaction: t });
    //             const c = await c.create( /* {} */ , { transaction: t });
    //             return c;
    //         });
    //         return result.success();
    //     } catch (error) {
    //         return result.failed();
    //     }
    // }
};