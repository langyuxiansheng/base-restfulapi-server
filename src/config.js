import path from 'path';

// 系统配置
export const System = {
    API_server_type: 'http://', // API服务器协议类型,包含"http://"或"https://"
    API_server_host: 'api.hao2013.cn', // API服务器暴露的域名地址,请勿添加"http://"
    API_server_port: '3000', // API服务器监听的端口号
    HTTP_server_type: 'http://', // HTTP服务器协议类型,包含"http://"或"https://"
    HTTP_server_host: 'www.hao2013.cn', // HTTP服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
    HTTP_server_port: '65534', // HTTP服务器端口号
    System_country: 'zh-cn', // 所在国家的国家代码
    System_plugin_path: path.join(__dirname, './plugins'), // 插件路径
    Session_Key: 'RESTfulAPI', // 生产环境务必随机设置一个值
};

//数据库配置
export const DB = {
    relationalConfs: [{
        DB_type: 'mysql', // 数据库类型
        dbName: 'webDB', //命名为唯一 调用的时候
        host: '192.168.0.220', // 服务器地址
        port: 3306, // 数据库端口号
        username: 'root', // 数据库用户名
        password: 'scrh123456', // 数据库密码
        database: 'web_test_db', // 数据库名称
        //prefix: 'api_', // 默认"api_"
        dialectOptions: { // MySQL > 5.5，其它数据库删除此项
            charset: 'utf8mb4',
            //collate: 'utf8mb4_unicode_520_ci',
            supportBigNumbers: true,
            bigNumberStrings: true,
            //requestTimeout: 60 * 1000 //设置连接超时时间
        },
        pool: {
            max: 50, // 连接池中最大连接数量
            min: 0, // 连接池中最小连接数量
            idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        }
    }],
    mongoConf: {
        host: 'mongodb://localhost', // 服务器地址
        port: 27017, // 数据库端口号
        username: '', // 数据库用户名
        password: '', // 数据库密码
        database: 'tx', // 数据库名称
        prefix: 'api_' // 默认"api_"
    }
};

//邮件服务器配置
export const SendEmail = {
    service: 'smtp.abcd.com', // SMTP服务提供商域名
    username: 'postmaster%40abcd.com', // 用户名/用户邮箱
    password: 'password', // 邮箱密码
    sender_address: '"XX平台 👥" <postmaster@abcd.com>'
};

//常量
export const constant = {
    IP_REG_EXP: /^((25[0-5]|2[0-4]\d|((1\d{2})|(1-9)?\d))\.){3}((25[0-5]|2[0-4]\d|((1\d{2})|(1-9)?\d)))$/ //ip正则
}