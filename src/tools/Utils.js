import md5 from 'blueimp-md5';
import moment from 'moment';
import UUID from 'uuid';

import {
    SystemConfig
} from '../config';

import middleware from '../middleware';
const {
    ValidateTools
} = middleware.ValidateTools;
const validateTools = new ValidateTools();

/**
 * 工具类
 */
class Utils {

    /**
     * 获取mongodb数据库名 今日
     */
    GetTableName() {
        var _today = moment();
        return "2018_11_09"; /*现在的时间*/
        // return _today.format('YYYY_MM_DD'); /*现在的时间*/
    }

    /**
     * 获取jwt数据
     * @param {*} authorization
     */
    GetJwtData(authorization) {
        if (!authorization) {
            return null;
        }
        const validate = validateTools.validateJWT(authorization);
        if (validate) {
            return validate.data;
        } else {
            return null;
            // return result.authorities();
        }
    }

    /**
     * 取随机数
     */
    GetRandomNum() {
        let Min = 10000000;
        let Max = 99999999;
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    /**
     * 获取MD5加密
     */
    GetMd5(Str) {
        return md5(Str + 'da7777');
    }

    /**
     * 获取随机UUID 可能会重复
     */
    getRandomUUID() {
        return UUID.v4().replace(/-/g, '');
    }

    /**
     * 根据时间戳生成UUID
     */
    getTimeStampUUID() {
        return UUID.v1().replace(/-/g, '');
    }

    /**
     * 获取当前时间戳 毫秒
     */
    getTimeStamp() {
        return Date.parse(new Date());
    }

    /**
     * 截取字符串， 多余的部分用...代替
     * @param {*} str
     * @param {*} len
     */
    setString(str, len) {
        let StrLen = 0;
        let s = '';
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                StrLen += 2;
            } else {
                StrLen++;
            }
            s += str.charAt(i);
            if (StrLen >= len) {
                return s + '...';
            }
        }
        return s;
    }

    /**
     * 格式化设置
     * @param {*} GetOptions
     */
    optionFormat(GetOptions) {
        let options = '{';
        for (let n = 0; n < GetOptions.length; n++) {
            options = options + '\'' + GetOptions[n].option_name + '\':\'' + GetOptions[n].option_value + '\'';
            if (n < GetOptions.length - 1) {
                options = options + ',';
            }
        }
        return JSON.parse(options + '}');
    }

    /**
     * 替换SQL字符串中的前缀
     * @param {*} str
     */
    sqlFormat(str) {
        if (SystemConfig.mysql_prefix !== 'api_') {
            str = str.replace(/api_/g, SystemConfig.mysql_prefix);
        }
        return str;
    }

    /**
     * 数组去重
     * @param {*} arr
     */
    hovercUnique(arr) {
        let n = {};
        let r = [];
        for (var i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
                n[arr[i]] = true;
                r.push(arr[i]);
            }
        }
        return r;
    }

    /**
     * 获取json长度
     * @param {*} jsonData
     */
    getJsonLength(jsonData) {
        var arr = [];
        for (var item in jsonData) {
            arr.push(jsonData[item]);
        }
        return arr.length;
    }

    /**
     * 线性数据转化为树
     * @param {Object} data 源数据
     * @param {Object} parentKey 父级id key
     * @param {childrenKey} childrenKey 子集key
     * @param {Object} pId 父级标识符
     */
    toTree(data, parentKey, childrenKey, pId) {
        var tree = [];
        var temp = null;
        for (let i = 0; i < data.length; i++) {
            if (data[i][parentKey] == pId) {
                var obj = data[i];
                obj.children = [];
                temp = this.toTree(data, parentKey, childrenKey, data[i][childrenKey]);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                tree.push(obj);
            }
        }
        return tree;
    }

    /**
     * 移除对象中的无效属性
     * @param obj
     * @return {*}
     */
    removeEmpty(obj) {
        Object.keys(obj).forEach(function(key) {
            (obj[key] && typeof obj[key] === 'object') && this.removeEmpty(obj[key]) ||
                (obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key];
        });
        return obj;
    }

    /**
     * 深度拷贝
     * @param {*} obj
     */
    deepCloneObject(obj) {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === 'object') {
                        objClone[key] = this.deepCloneObject(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }

}

module.exports = new Utils();