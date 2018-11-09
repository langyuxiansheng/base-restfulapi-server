import result from '../tools/Result';
import mongoUtil from '../lib/mongoUtil';
import {
    testModel
} from '../models';

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
        date
    }) {
        try {
            const res = await mongoUtil.findAll('user', null, '2018-11-05');
            return result.pageData(null, null, res, res.length, 10, 1);
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
            const model = new testModel.UserModel(data);
            const res = await mongoUtil.insert('user', model, '2018-11-06');
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