/*
Navicat MySQL Data Transfer

Source Server         : 内网数据库
Source Server Version : 50720
Source Host           : 192.168.0.220:3306
Source Database       : web_test_db

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-11-15 09:22:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_base`
-- ----------------------------
DROP TABLE IF EXISTS `admin_base`;
CREATE TABLE `admin_base` (
  `AdminId` int(11) NOT NULL AUTO_INCREMENT,
  `AdminName` varchar(64) DEFAULT NULL,
  `Account` varchar(64) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `IsAdmin` int(11) DEFAULT NULL,
  `Avatar` varchar(64) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL,
  `IsDelete` int(11) DEFAULT NULL,
  `CreatedTime` int(11) DEFAULT NULL,
  `UpdatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`AdminId`)
) ENGINE=InnoDB AUTO_INCREMENT=1541755838 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_base
-- ----------------------------
INSERT INTO `admin_base` VALUES ('132133', '测试一号', 'test1', '85a0f2436642feeea9f909ac2a0bea6f', null, null, null, null, '1', '1541770677', '1541770677');
INSERT INTO `admin_base` VALUES ('132134', '测试二号', 'test2', '85a0f2436642feeea9f909ac2a0bea6f', null, null, null, null, '1', '1541770677', '1541770677');
INSERT INTO `admin_base` VALUES ('1541755836', '超级管理员', 'admin', '85a0f2436642feeea9f909ac2a0bea6f', '0', '1', null, null, null, null, null);
INSERT INTO `admin_base` VALUES ('1541755837', '狼宇先生', 'test', '85a0f2436642feeea9f909ac2a0bea6f', null, null, null, null, '1', '1541755466', '1541755466');

-- ----------------------------
-- Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `PermissionID` int(11) NOT NULL AUTO_INCREMENT,
  `PermissionName` varchar(64) NOT NULL,
  `PermissionType` bigint(11) NOT NULL DEFAULT '1',
  `PermissionValue` varchar(255) DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Component` varchar(255) DEFAULT NULL,
  `Meta` varchar(255) DEFAULT NULL,
  `IsDelete` tinyint(1) DEFAULT NULL,
  `CreatedTime` int(11) NOT NULL DEFAULT '1542174930',
  `UpdatedTime` int(11) NOT NULL DEFAULT '1542174930',
  PRIMARY KEY (`PermissionID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('3', '运营中心', '1', null, '0', 'index', 'Layout', '{\"requireAuth\":false,\"title\":\"运营中心\",\"icon\":\"fa fa-bar-chart\"}', null, '1542175319', '1542175319');
INSERT INTO `permission` VALUES ('4', '会员管理', '1', null, '0', 'index', 'Layout', '{\"requireAuth\":false,\"title\":\"会员管理\",\"icon\":\"fa fa-bar-chart\"}', null, '1542176147', '1542176147');
INSERT INTO `permission` VALUES ('5', '系统设置', '1', null, '0', 'index', 'Layout', '{\"requireAuth\":false,\"title\":\"系统设置\",\"icon\":\"fa fa-bar-chart\"}', null, '1542176325', '1542176325');
INSERT INTO `permission` VALUES ('6', '运营管理', '1', null, '0', '/operations', 'Layout', '{\"requireAuth\":false,\"title\":\"运营管理\",\"icon\":\"fa fa-diamond\"}', null, '1542176325', '1542176325');
INSERT INTO `permission` VALUES ('7', '权限管理', '1', null, '5', 'permission', 'Permission', '{\"requireAuth\":false,\"title\":\"权限管理\",\"icon\":null}', null, '1542176325', '1542176325');
INSERT INTO `permission` VALUES ('8', '角色管理', '1', null, '5', 'roleManage', 'RoleManage', '{\"requireAuth\":false,\"title\":\"角色管理\",\"icon\":null}', null, '1542176325', '1542176325');

-- ----------------------------
-- Table structure for `roles_auth`
-- ----------------------------
DROP TABLE IF EXISTS `roles_auth`;
CREATE TABLE `roles_auth` (
  `RoleIdSID` int(11) NOT NULL,
  `PermissionID` int(11) DEFAULT NULL,
  `CreatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`RoleIdSID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roles_auth
-- ----------------------------

-- ----------------------------
-- Table structure for `roles_base`
-- ----------------------------
DROP TABLE IF EXISTS `roles_base`;
CREATE TABLE `roles_base` (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(32) DEFAULT NULL,
  `RoleIdSID` int(11) DEFAULT NULL,
  `IsDelete` int(11) DEFAULT NULL,
  `CreatedTime` int(11) DEFAULT NULL,
  `UpdatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roles_base
-- ----------------------------
INSERT INTO `roles_base` VALUES ('1541909600', '一级代理', null, null, '1541909594', '1541909594');
INSERT INTO `roles_base` VALUES ('1541909605', '超级代理', null, null, '1541909594', '1541909594');
INSERT INTO `roles_base` VALUES ('1541910354', '佛挡杀佛', null, null, '1541910313', '1541910313');
