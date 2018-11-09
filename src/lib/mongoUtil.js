/**
 * mongoDB工具类
 * 封装mongoDB的增删改查方法
 * https: //docs.mongodb.com/manual/reference/method/
 */
import {
    DB
} from '../config';
const assert = require('assert');

//引入mongoDB组件
const MongoClient = require('mongodb').MongoClient;
//引入mongoDB操作_id的函数
const objectID = require('mongodb').ObjectId;

//将所有的方法封装到类里
class MongoDBTool {
    constructor() {
        this.objectID = objectID;
    }

    /**
     * 链接数据库与关闭数据库的方法
     * 参照这个格式： mongoose.connect('mongodb://user:password@127.0.0.1:27017/dbname')， 其中dbname是必选项， 不写会报错。 user和password可选。
     * @param {*} callback
     * @param {*} database 库名 不传则使用默认配置
     */
    connect(callback, database) {
        MongoClient.connect(DB.mongoConf.host, {
            useNewUrlParser: true //
        }, (err, client) => {
            assert.strictEqual(null, err);
            console.log(`${DB.mongoConf.host} 数据库连接成功!!!`);
            //拿到数据库
            const db = client.db(database || DB.mongoConf.database);
            //操作数据
            callback(err, db);
            //关闭数据库
            client.close();
        });
    }

    /**
     * 增
     * @param {* string} collectionName  表名
     * @param {* arr or obj} data  数据
     * @param {*} database 库名
     * @return 结果
     */
    insert(collectionName, data, database) {
        if (typeof collectionName != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                //取到想要的表
                const collection = db.collection(collectionName);
                if (Array.isArray(data)) { //判断数据是否是数组
                    //插入多条数据
                    collection.insertMany(data).then(({
                        result
                    }) => {
                        console.log(`插入${result.n}条数据`, result);
                        resolve(result.n);
                    });
                } else {
                    //插入一条数据
                    collection.insertOne(data).then(({
                        result
                    }) => {
                        console.log(`插入${result.n}条数据`, result);
                        resolve(result.n);
                    });
                }
            }, database);
        });
    }

    /**
     * 删除一条
     * @param {* string} collectionName 集合名
     * @param {* obj} condition 删除的条件
     * @param {*} database 库名
     * @return {* function} 返回结果
     */
    deleteOne(collectionName, condition, database) {
        if (typeof collectionName != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(collectionName);
                collection.deleteOne(condition).then(({
                    result
                }) => {
                    console.log(`删除${result.n}条数据`, result);
                    resolve(result.n);
                });
            }, database);
        });
    }

    /**
     * 删除多条
     * @param {* string} collectionName 集合名
     * @param {* obj} condition 删除的条件
     * @param {*} database 库名
     * @return {*} 返回结果
     */
    deleteMany(collectionName, condition, database) {
        if (typeof collectionName != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(collectionName);
                collection.deleteMany(condition).then(({
                    result
                }) => {
                    console.log(`删除${result.n}条数据`, result);
                    resolve(result.n);
                });
            }, database);
        });
    }

    /**
     * 修改一条
     * @param {* string} collectionName  集合名
     * @param {* obj} data  更新数据
     * @param {* obj} condition 更新的条件
     * @param {*} database 库名
     * @return { Number} 返回结果
     */
    upadteOne(collectionName, condition, data, database) {
        if (typeof collectionName != 'string' && arguments.length === 3) throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(collectionName);
                collection.updateOne(condition, {
                    $set: data
                }).then(({
                    result
                }) => {
                    console.log(`修改${result.n}条数据`, result);
                    resolve(result.n);
                });
            }, database);
        });
    }

    /**
     * 改多条
     * @param {* string} collectionName  集合名
     * @param {* obj} data  更新数据
     * @param {* obj} condition 更新的条件
     * @param {*} database 库名
     * @return {Number}  返回结果
     */
    updateMany(collectionName, condition, data, database) {
        if (typeof collectionName != 'string' && arguments.length === 3) throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(collectionName);
                collection.updateMany(condition, {
                    $set: data
                }).then(({
                    result
                }) => {
                    console.log(`修改${result.n}条数据`, result);
                    resolve(result.n);
                });
            }, database);
        });
    }

    /**
     * 查询数据
     * @param {* string} collectionName  表名
     * @param {* obj} condition  条件
     * @param {*} database 库名
     * @return {* Array} 返回结果集列表
     */
    findAll(collectionName, condition, database) {
        if (typeof collectionName != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(collectionName);
                collection.find(condition).toArray((err, result) => {
                    assert.strictEqual(err, null);
                    console.log(`查询数据${result.length}条数据`, result);
                    resolve(result);
                });
            }, database);
        });
    }

    /**
     * 查询数据
     * @param {*} collectionName
     * @param {*} condition
     * @param {*} database 库名
     * @return {Object} 返回结果对象
     */
    findOne(collectionName, condition, database) {
        if (typeof collectionName != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(collectionName);
                collection.findOne(condition).then((result) => {
                    assert.strictEqual(err, null);
                    console.log(`查询数据`, result);
                    resolve(result);
                });
            }, database);
        });
    }

    /**
     * 获取总条数
     * @param {*} collectionName
     * @param {*} database 库名
     * @return {* Number} 返回数量
     */
    getAllCount(collectionName, database) {
        if (typeof collectionName != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                //取到想要的表
                const collection = db.collection(collectionName);
                collection.count({}).then(({
                    result
                }) => {
                    console.log(`查询数据${result.n}条数据`, result);
                    resolve(result.n);
                });
            }, database);
        });
    }
}

//导出对象
export default new MongoDBTool();