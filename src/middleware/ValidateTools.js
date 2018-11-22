import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'));

/**
 * 验证工具类
 */
export class ValidateTools {

    /**
     * 验证解密JWT返回处理结果
     * @param {*} authorities
     */
    validateJWT(authorities) {
        try {
            console.log(`validateJWT======`, authorities.substr(7));
            return jwt.verify(authorities.substr(7), publicKey);
        } catch (err) {
            console.log(`JWT验证结果`, err);
            return false;
        }
    }

    /**
     * 获取jwttoken
     * @param {*} data
     * @param {*} expiresIn
     */
    getJWT(data, expiresIn) {
        try {
            return jwt.sign({
                data // 你要保存到token的数据
            }, publicKey, {
                expiresIn //秒到期时间
            });
        } catch (err) {
            console.log(`JWT加密错误`, err);
            throw err;
        }
    }

}