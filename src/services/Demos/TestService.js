import result from '../../tools/Result';
import mongoUtil from '../../lib/mongoUtil';
import {
    testModel
} from '../../models';

/**
 * test TestService
 * 本页面处理业务逻辑 接收参数与返回处理结果
 */
class TestService {

    /**
     * get
     * @param {*} ctx
     */
    async getTest({
        date,
        page,
        limit
    }) {
        try {
            let queryData = {
                table: 'user',
                dbName: date,
                /*  filters: {
                     username: '11212'
                 }, */
                attributes: {
                    password: 0 //只输出该字段
                }
            };

            if (page && limit) {
                queryData.page = Number(page);
                queryData.limit = Number(limit);
            }
            //分页查询
            const res = await mongoUtil.findAndCount(queryData);
            //获取总条数
            const count = await mongoUtil.getAllCount(queryData);
            return result.pageData(null, null, res, count, queryData.limit, queryData.page);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * post
     * @param {*} ctx
     */
    async postTest(data) {
        try {
            //user对象模型
            // const model = new testModel.UserModel(data);
            const res = await mongoUtil.insert('user', data, '2018-11-06');
            if (res > 0) {
                return result.success();
            } else {
                return result.failed();
            }
        } catch (error) {
            console.log(error);
            return result.failed(error.toString());
        }
    }

    /**
     * put
     * @param {*} ctx
     */
    async putTest(id, data) {
        try {
            //user对象模型
            const model = new testModel.UserModel(data);
            const res = await mongoUtil.upadteOne('user', {
                _id: mongoUtil.objectID(id)
            }, model);
            if (res > 0) {
                return result.success();
            } else {
                return result.failed(`修改失败!`);
            }
        } catch (error) {
            console.log(error);
            return result.failed(error.toString());
        }
    }

    /**
     * delete
     */
    async deleteTest(id) {
        try {
            const res = await mongoUtil.deleteOne('user', {
                _id: mongoUtil.objectID(id)
            });
            if (res > 0) {
                return result.success();
            } else {
                return result.failed(`删除失败!`);
            }
        } catch (error) {
            console.log(error);
            return result.failed(error.toString());
        }
    }
}

module.exports = new TestService();