
## base-restfulapi-server 接口文档

前言：为了规范化项目管理，方便以后对项目的熟悉及入手开发，现决定将项目文档逐步规范化。

- 所有新增接口，按照规范格式撰写接口文档；
- 所有修改的接口，如果之前有对应的接口文档，则修改相应文档，若没有，则新建接口文档；
- 文档目录位置的选择，以类似“商户后台→对账中心（大板块）→所有账单（子板块）”的方式建立或选择；
- 同一个页面，一类功能的不同接口，可以放在同一个文档中；
- 文档应清晰包含每个接口的请求参数说明、正确返回示例、错误返回示例、返回参数说明。参数不同值有不同特殊意义的，应在说明中列举，或使用单独的表格列举；
- 不论前端工程师或后端工程师均可指定接口，只要商定好后即可撰写，双方各自按约定接口进行开发；
- 开发测试过程中，对接口有修改的，应及时修改对应文档；
- 任务下面需要进行接口对接的，直接贴文档地址进行交流,接口调用可使用Postman。

本系统中所有接口使用以下约定：
---

**基础地址：localhost:3000/v1**

调用接口全路径为 服务器IP:端口号/版本号/服务类名/接口方法名称 如:
```
localhost:3000/v1/login/aminLogin
```
**PS:返回状态码code 成功统一为 200 一般错误为400, 身份验证失败401, 权限问题为403等 附带错误消息 msg**

所有需要jwt的接口
需要在请求头里 加上Authorization: "Bearer jwt字符串"

例如:

```
headers:{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFkbWluSWQiOiIxMDAwIiwiYWRtaW5OYW1lIjoi54u85a6H5YWI55SfIiwiYWNjb3VudCI6ImFkbWluIiwiaXNBZG1pbiI6MSwicm9sZUlkIjpudWxsfSwiaWF0IjoxNTQzOTI5NjQzLCJleHAiOjE1NDQwMTYwNDN9._WhuklF_mNRWjphj-xpraYGpjqu0Woo3SXHmV48N-Vs"
}
```
---

#### 1 登录相关

**1.1 管理员登录接口**

###### URL
> [/login/aminLogin](/login/aminLogin)

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数


参数     | 必选 | 类型   | 说明    |
---      |---   |---     |---
account  | ture | string | 账号    |
password | ture | string | 密码    |
code     | ture | string | 验证码  |

###### 请求示例

```
{
	"account":"admin",
	"password":123456,
	"code":"k57q"
}
```

###### 返回数据

```
{
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFkbWluSWQiOiIxMDAwIiwiYWRtaW5OYW1lIjoi54u85a6H5YWI55SfIiwiYWNjb3VudCI6ImFkbWluIiwiaXNBZG1pbiI6MSwicm9sZUlkIjpudWxsfSwiaWF0IjoxNTQzNzQ3NjAzLCJleHAiOjE1NDM4MzQwMDN9.jDtm0Iu2xTvb9z5_bJYTMgV6MbdktOUE8G4LsBxV17c",
        "userInfo": {
            "adminId": "1000",
            "adminName": "狼宇先生",
            "account": "admin",
            "isAdmin": 1,
            "roleId": null,
            "roleName": "超级管理员"
        }
    },
    "msg": "SUCCESS"
}

```

#### 2 公共服务API类

**2.1 获取图形验证码接口**

###### URL
> [/common/getImgValidate](/common/getImgValidate)

###### 支持格式
> JSON

###### HTTP请求方式
> GET

###### 请求参数
> 无

###### 请求示例

```
http://localhost:3000/v1/common/getImgValidate
```

###### 返回数据

```
{
    "code": 200,
    "data": "<svg>返回的svg图片</svg>",
    "msg": "SUCCESS"
}

```

#### 3 系统管理相关

**3.1 分页获取管理员列表**

###### URL
> [/platform/getPlatformAdminList](/platform/getPlatformAdminList)

###### 支持格式
> JSON

###### HTTP请求方式
> GET

###### 请求参数
> 必须jwt

参数     | 必选  | 类型  | 说明     |
---      |---    |---    |---
page     | false | int   | 页码索引 |
limit    | false | int   | 每页大小 |

###### 请求示例

```
 http://localhost:3000/v1/platform/getPlatformAdminList?page=1&limit=10
```

###### 返回数据

```
{
    "code": 200,
    "data": [
        {
            "adminId": "1000",  //管理员id
            "adminName": "狼宇先生",    //管理员名字
            "account": "admin",     //管理员账号
            "status": null,     //账号状态
            "isAdmin": 1,   //是否超级管理员 1是 null或其它都不是 (原则上一个平台只允许一个超级管理员)
            "avatar": null, //管理员头像
            "roleId": null, //角色ID
            "roleName": null    //角色名字
        },
        {
            "adminId": "1001",
            "adminName": "测试人员",
            "account": "test1",
            "status": null,
            "isAdmin": null,
            "avatar": null,
            "roleId": 1542870969,
            "roleName": "测试"
        }
    ],
    "total": 3, //总大小
    "page": "1",    //页码索引
    "limit": "10",  //每页大小
    "msg": "SUCCESS"
}

```

**3.2 添加管理员接口**

###### URL
> [/platform/addPlatformAdmin](/platform/addPlatformAdmin)

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数

> 必须jwt

参数       | 必选 | 类型   | 说明       |
---        |---   |---     |---
adminName  | ture | string | 管理员名称 |
account    | ture | string | 账号       |
password   | ture | string | 密码       |

###### 请求示例

```
{
    "adminName": "狼宇先森",
    "account": "test111",
    "password": 123456
}
```

###### 返回数据

```
{
    "code": 200,
    "msg": "SUCCESS"
}

```


