import fs from 'fs';
import path from 'path';
import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
import middleware from '../../middleware';
import { System } from '../../config';
/* eslint-disable */
const { webDBUtil, Sequelize } = sequelize;
const AdminBaseModel = webDBUtil.import('../../models/AdminPlatform/AdminBaseModel');
/* eslint-endble */

/**
 * 文件系统服务
 */
module.exports = class FileService {

    /**
     * 上传文件
     * @param {*} data
     */
    async uploadFile({ method, request }) {
        try {

            // 设置允许跨域的域名称
            // ----- 情况1：跨域时，先发送一个options请求，此处要返回200 -----
            if (method === 'OPTIONS') {
                console.log('options 请求时，返回 200');
                // 返回结果
                return null;
            }
            // ----- 情况2：发送post请求，上传图片 -----
            // 文件将要上传到哪个文件夹下面
            const uploadfolderpath = path.join(__dirname, '../../assets/uploads');
            const files = request.files;
            console.log(files);
            if (!files.file) return result.paramsLack(`未发现上传文件!`);
            // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
            const file = files.file;
            const tempfilepath = file.path;
            // 获取文件类型
            const type = file.type;
            // 获取文件名，并根据文件名获取扩展名
            let filename = file.name;
            let extname = filename.lastIndexOf('.') >= 0 ? filename.slice(filename.lastIndexOf('.') - filename.length) : '';
            // 文件名没有扩展名时候，则从文件类型中取扩展名
            if (extname === '' && type.indexOf('/') >= 0) {
                extname = '.' + type.split('/')[1];
            }

            // 将文件名重新赋值为一个随机数（避免文件重名）
            filename = Math.random().toString().slice(2) + extname;

            // 构建将要存储的文件的路径
            let filenewpath = path.join(uploadfolderpath, filename);
            // 将临时文件保存为正式的文件
            fs.renameSync(tempfilepath, filenewpath);
            // 保存成功
            console.log('fs.rename done');
            // 拼接url地址
            let fileUrl = System.API_server_type + System.API_server_host + ':' + System.API_server_port + '/assets/uploads' + filename;
            // 返回结果
            return result.success(fileUrl);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }
};