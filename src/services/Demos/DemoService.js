import result from '../../tools/Result';
// import Utils from '../../tools/Utils';
// import sequelize from '../../lib/sequelize';
/* eslint-disable */
// const { webDBUtil, Sequelize } = sequelize;
// const AdminBaseModel = webDBUtil.import('../../models/AdminPlatform/AdminBaseModel');
/* eslint-endble */

/**
 * 业务示例代码
 */
module.exports = class DemoService {

    /**
     * 获取
     * @param {*} param0
     */
    async getListDemo({ page, limit }) {
        try {
            return result.pageData(null, null, [], 0, page, limit);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 添加
     * @param {*} user
     */
    async addDemo({ param }) {
        try {
            if (!param) return result.paramsLack();
            return result.success();
        } catch (error) {
            console.log(error)
            return result.failed();
        }
    }

    /**
     * 删除
     * @param {*} user
     */
    async delDemo(id) {
        try {
            if (!id) return result.paramsLack();
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`注销失败`);
        }
    }

    /**
     * 修改
     * @param {*} user
     */
    async updateDemo({ id, param }) {
        try {
            if (!id || !param) return result.paramsLack();
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`修改失败`);
        }
    }
};