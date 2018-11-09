/**
 * Sequelize.js api说明文档
 * https: //itbilu.com/nodejs/npm/V1PExztfb.html
 */
import Sequelize from 'sequelize';
import {
    DB
} from '../config';

/**
 * 挂载多个mysql
 */
let mysqls = {};
DB.relationalConfs.forEach(item => {
    if (!mysqls[`${item.dbName}Util`]) {
        // console.log(database);
        mysqls[`${item.dbName}Util`] = new Sequelize(item.database, item.username, item.password, {
            host: item.host, // 数据库地址
            dialect: item.DB_type, // 指定连接的数据库类型
            dialectOptions: item.dialectOptions, //mysql专用
            pool: item.pool //连接池对象
        });
        mysqls[`${item.dbName}Util`].authenticate().then(() => {
            console.log(`${item.dbName} 连接成功!`);
        }).catch(err => {
            console.error(`${item.dbName} 连接出错`, err);
        });
    }
});

//配置关系型数据库ORM
export default Object.assign(Sequelize, mysqls);