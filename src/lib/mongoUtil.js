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
     * @param {*} dbName 库名 不传则使用默认配置
     */
    connect(callback, dbName) {
        MongoClient.connect(DB.mongoConf.host, {
            useNewUrlParser: true //
        }, (err, client) => {
            assert.strictEqual(null, err);
            console.log(`${DB.mongoConf.host} 数据库连接成功!!!`);
            //拿到数据库
            const db = client.db(dbName || DB.mongoConf.database);
            //操作数据
            callback(err, db);
            //关闭数据库
            client.close();
        });
    }

    /**
     * 增
     * @param {* string} table  表名
     * @param {* arr or obj} data  数据
     * @param {*} dbName 库名
     * @return 结果
     */
    insert({
        table,
        data,
        dbName
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                //取到想要的表
                const collection = db.collection(table);
                if (Array.isArray(data)) { //判断数据是否是数组
                    //插入多条数据
                    const result = await collection.insertMany(data);
                    console.log(`插入${result.n}条数据`, result);
                    resolve(result.n);
                } else {
                    //插入一条数据
                    const result = await collection.insertOne(data);
                    console.log(`插入${result.n}条数据`, result);
                    resolve(result.n);
                }
            }, dbName);
        });
    }

    /**
     * 删除一条
     * @param {* string} table 集合名
     * @param {* obj} filters 删除的条件
     * @param {*} dbName 库名
     * @return {* function} 返回结果
     */
    deleteOne({
        table,
        filters,
        dbName
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                const result = await collection.deleteOne(filters);
                console.log(`删除${result.n}条数据`, result);
                resolve(result.n);
            }, dbName);
        });
    }

    /**
     * 删除多条
     * @param {* string} table 集合名
     * @param {* obj} filters 删除的条件
     * @param {*} dbName 库名
     * @return {*} 返回结果
     */
    deleteMany({
        table,
        filters,
        dbName
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                const result = await collection.deleteMany(filters);
                console.log(`删除${result.n}条数据`, result);
                resolve(result.n);
            }, dbName);
        });
    }

    /**
     * 修改一条
     * @param {* string} table  集合名
     * @param {* obj} filters 更新的条件
     * @param {* obj} data  更新数据
     * @param {*} dbName 库名
     * @return { Number} 返回结果
     */
    upadteOne({
        table,
        filters,
        data,
        dbName
    }) {
        if (typeof table != 'string' && arguments.length === 3) throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                const result = await collection.updateOne(filters, {
                    $set: data
                });
                console.log(`修改${result.n}条数据`, result);
                resolve(result.n);
            }, dbName);
        });
    }

    /**
     * 改多条
     * @param {* string} table  集合名
     * @param {* obj} filters 更新的条件
     * @param {* obj} data  更新数据
     * @param {*} dbName 库名
     * @return { Number} 返回结果
     */
    updateMany({
        table,
        filters,
        data,
        dbName
    }) {
        if (typeof table != 'string' && arguments.length === 3) throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                collection.updateMany(filters, {
                    $set: data
                }).then(({
                    result
                }) => {
                    console.log(`修改${result.n}条数据`, result);
                    resolve(result.n);
                });
            }, dbName);
        });
    }

    /**
     * 查询数据
     * @param {* string} table  表名
     * @param {* obj} filters  条件
     * @param {*} attributes 输出指定列
     * @param {*} dbName 库名
     * @return {* Array} 返回结果集列表
     */
    findAll({
        table,
        filters,
        attributes,
        dbName
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect((err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                collection.find(filters, {
                    projection: attributes
                }).toArray((err, result) => {
                    assert.strictEqual(err, null);
                    console.log(`查询数据${result.length}条数据`, result);
                    resolve(result);
                });
            }, dbName);
        });
    }

    /**
     * 查询数据
     * @param {*} collectionName
     * @param {*} filters
     * @param {*} attributes 输出指定列
     * @param {*} database 库名
     * @return {Object} 返回结果对象
     */
    findOne({
        table,
        filters,
        attributes,
        dbName
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                const result = await collection.findOne(filters, {
                    projection: attributes
                });
                assert.strictEqual(err, null);
                console.log(`查询数据`, result);
                resolve(result);
            }, dbName);
        });
    }

    /**
     * 获取总条数
     * @param {*} collectionName
     * @param {*} database 库名
     * @return {* Number} 返回数量
     */
    getAllCount({
        table,
        filters,
        dbName
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                //取到想要的表
                const collection = db.collection(table);
                const result = await collection.count(filters);
                console.log(`查询数据${result}条数据`, result);
                resolve(result);
            }, dbName);
        });
    }

    /**
     * 分页查询数据
     * @param {* string} table  表名
     * @param {* obj} filters  条件
     * @param {*} dbName 库名
     * @param {*} attributes 输出指定列
     * @param {*} page 分页参数 当前索引
     * @param {*} limit 每页大小
     * @return {* Array} 返回结果集列表
     */
    findAndCount({
        table,
        filters,
        attributes,
        dbName,
        page,
        limit
    }) {
        if (typeof table != 'string') throw new Error('请检查传入的参数是否正确');
        return new Promise((resolve, reject) => {
            this.connect(async(err, db) => {
                if (err) reject(err);
                const collection = db.collection(table);
                let queryData = {
                        projection: attributes
                    }
                    //分页查询
                if (page && limit) {
                    queryData.skip = Number((page - 1) * limit);
                    queryData.limit = Number(limit);
                }
                collection.find(filters, queryData).toArray((err, result) => {
                    assert.strictEqual(err, null);
                    console.log(`分页查询数据${result.length}条数据`, result);
                    resolve(result);
                });
            }, dbName);
        });
    }

}

//导出对象
export default new MongoDBTool();