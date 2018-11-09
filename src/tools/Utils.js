import md5 from 'blueimp-md5';
import UUID from 'uuid';
import middleware from '../middleware';
import {
    SystemConfig
} from '../config';

const {
    ValidateTools
} = middleware.ValidateTools;
const validateTools = new ValidateTools();

/**
 * 工具类
 */
class Utils {

    getJwtData(authorization) {
        if (!authorization) {
            return null;
        }
        const validate = validateTools.validateJWT(authorization);
        if (validate) {
            return validate.data;
        } else {
            return null;
        }
    }

    /**
     * 取随机数
     */
    getRandomNum() {
        let Min = 10000000;
        let Max = 99999999;
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    /**
     * 获取MD5加密
     */
    getMd5(str) {
        return md5(str + 'da7777');
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
}

module.exports = new Utils();