import svgCaptcha from 'svg-captcha';
import result from '../../tools/Result';
/**
 * 公共服务系统
 */
module.exports = class CommonService {

    /**
     * 获取图片验证码
     */
    async getImgValidate() {
        const { text, data } = svgCaptcha.create({
            inverse: false, // 翻转颜色
            size: 4, //随机字符串长度
            noise: 4, // 噪声线条数
            fontSize: 46,
            width: 100,
            height: 30,
            color: true //随机颜色
            // background: true
        }); ;
        return { result: result.success(null, data), text };
    }
};