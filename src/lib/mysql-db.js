/**
 * MySQL连接池工具
 */
import mysql from 'mysql';
import { DB } from '../config';
class DBUtil {

    /**
     * 配置文件
     */
    constructor() {
        this.mysqls = {};
        this.dbNames = {};
        DB.relationalConfs.forEach(item => {
            if (!this.mysqls[`${item.dbName}Util`]) {
                this.mysqls[`${item.dbName}Pool`] = mysql.createPool({
                    connectionLimit: item.pool.max,
                    host: item.host,
                    user: item.username,
                    password: item.password,
                    database: item.database,
                    multipleStatements: true //是否允许执行多条sql语句
                });

                //多个连接池
                this.mysqls[`${item.dbName}Pool`].getConnection((err, connection) => {
                    if (err) throw new Error(err);
                    this[`${item.dbName}Con`] = connection;
                    console.log(`数据库 ${item.dbName} 连接成功!`);
                });
                this.dbNames[item.dbName] = item.dbName;
            }
        });
    }

    /**
     * 多条件查询列表
     * @param {*} dbName
     * @param {*} sql
     * @param  {Array} params
     */
    queryList(dbName, sql, ...params) {
        if (dbName) throw new Error(`参数不齐!!!`);
        console.log(`查询数据SQL:${sql},参数:`, params);
        return new Promise((resolve, reject) => {
            this[`${dbName}Con`].query(sql, params, (error, res) => {
                if (error) throw new Error(error);
                console.log(`查询结果:`, res);
                resolve(res);
            });
            this[`${dbName}Con`].release();
        });
    }

    /**
     * 查询对象
     * @param {*} sql
     * @param {*} params
     */
    queryObject(dbName, sql, params) {
        if (dbName) throw new Error(`参数不齐!!!`);
        console.log(`查询数据SQL:${sql},参数:`, params);
        return new Promise((resolve, reject) => {
            this[`${dbName}Con`].query(sql, params, (error, res) => {
                if (error) throw new Error(error);
                console.log(`查询结果:`, res);
                if (res && res.length > 0) {
                    resolve(res[0]);
                } else {
                    resolve(null);
                }
            });
            this[`${dbName}Con`].release();
        });
    }

    /**
     * 单条件查询列表数据
     * @param {*} sql SQL语句
     * @param {*} params  数据条件
     */
    queryListSingle(dbName, sql, params) {
        if (dbName) throw new Error(`参数不齐!!!`);
        console.log(`查询数据SQL:${sql},参数:`, params);
        return new Promise((resolve, reject) => {
            this[`${dbName}Con`].query(sql, params, (error, res) => {
                if (error) throw new Error(error);
                console.log(`查询结果:`, res);
                resolve(res);
            });
            this[`${dbName}Con`].release();
        });
    }

    /**
     * 操作数据(批量)
     * @param {*} sql
     * @param {*} params
     */
    operateMultiple(dbName, sql, ...params) {
        if (dbName) throw new Error(`参数不齐!!!`);
        console.log(`操作数据SQL:${sql},参数:`, params);
        return new Promise((resolve, reject) => {
            this[`${dbName}Con`].query(sql, params, (error, res) => {
                if (error) throw new Error(error);
                console.log(`操作结果:`, res);
                resolve(res);
            });
            this[`${dbName}Con`].release();
        });
    }

    /**
     * 操作单个数据
     * @param {*} sql
     * @param  {Array} params
     */
    operateSingle(dbName, sql, params) {
        if (dbName) throw new Error(`参数不齐!!!`);
        console.log(`操作数据SQL:${sql},参数:`, params);
        return new Promise((resolve, reject) => {
            this[`${dbName}Con`].query(sql, params, (error, res) => {
                if (error) throw new Error(error);
                console.log(`操作结果:`, res);
                resolve(res);
            });
            this[`${dbName}Con`].release();
        });
    }
}

module.exports = new DBUtil();

/*
relationalConfs: [{
    DB_type: 'mysql', // 数据库类型
    dbName: 'database1', //命名为唯一 调用的时候
    host: 'localhost', // 服务器地址
    port: 3306, // 数据库端口号
    username: 'root', // 数据库用户名
    password: 'root', // 数据库密码
    database: 'database1', // 数据库名称
    //prefix: 'api_', // 默认"api_"
    dialectOptions: { // MySQL > 5.5，其它数据库删除此项
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_520_ci',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    pool: {
      max: 50, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
  },
  {
    DB_type: 'mysql', // 数据库类型
    dbName: 'database2', //命名为唯一 调用的时候
    host: 'localhost', // 服务器地址
    port: 3306, // 数据库端口号
    username: 'root', // 数据库用户名
    password: 'root', // 数据库密码
    database: 'database2', // 数据库名称
    //prefix: 'api_', // 默认"api_"
    dialectOptions: { // MySQL > 5.5，其它数据库删除此项
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_520_ci',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    pool: {
      max: 50, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
  }
],
 */