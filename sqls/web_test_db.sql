/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : web_test_db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-11-24 19:26:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_base`
-- ----------------------------
DROP TABLE IF EXISTS `admin_base`;
CREATE TABLE `admin_base` (
  `adminId` bigint(32) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(64) NOT NULL,
  `account` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `status` int(2) DEFAULT NULL,
  `isAdmin` int(11) DEFAULT NULL,
  `avatar` varchar(64) DEFAULT NULL,
  `roleId` int(32) DEFAULT NULL,
  `isDelete` int(2) DEFAULT NULL,
  `createdTime` int(16) NOT NULL DEFAULT '1542869595',
  `updatedTime` int(16) NOT NULL DEFAULT '1542869595',
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_base
-- ----------------------------
INSERT INTO `admin_base` VALUES ('1000', '狼宇先生', 'admin', 'b4cd231d652b3772062e437c3a0c7d00', null, '1', null, null, null, '1542869595', '1542869595');
INSERT INTO `admin_base` VALUES ('1001', '测试人员', 'test1', 'b4cd231d652b3772062e437c3a0c7d00', null, null, null, '1542870969', null, '1542870946', '1542870946');

-- ----------------------------
-- Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `permissionId` bigint(32) NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(64) NOT NULL,
  `permissionType` int(2) NOT NULL DEFAULT '1',
  `permissionValue` varchar(255) DEFAULT NULL,
  `parentId` bigint(32) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `meta` varchar(255) DEFAULT NULL,
  `isDelete` int(2) DEFAULT NULL,
  `createdTime` int(16) NOT NULL DEFAULT '1542869595',
  `updatedTime` int(16) NOT NULL DEFAULT '1542869595',
  PRIMARY KEY (`permissionId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('10', '系统设置', '1', '60', '0', '/system', 'Layout', '{\"requireAuth\":false,\"title\":\"系统设置\",\"icon\":\"fa fa-cog\"}', null, '1542445516', '1542445516');
INSERT INTO `permission` VALUES ('11', '权限管理', '1', '61', '10', 'permission', 'Permission', '{\"requireAuth\":false,\"title\":\"权限管理\",\"icon\":null}', null, '1542446223', '1542446223');
INSERT INTO `permission` VALUES ('12', '角色管理', '1', '62', '10', 'roleManage', 'RoleManage', '{\"requireAuth\":false,\"title\":\"角色管理\",\"icon\":null}', null, '1542446223', '1542446223');
INSERT INTO `permission` VALUES ('13', '管理员管理', '1', '63', '10', 'adminManage', 'AdminManage', '{\"requireAuth\":false,\"title\":\"管理员管理\",\"icon\":null}', null, '1542446223', '1542446223');

-- ----------------------------
-- Table structure for `roles_auth`
-- ----------------------------
DROP TABLE IF EXISTS `roles_auth`;
CREATE TABLE `roles_auth` (
  `roleId` bigint(32) NOT NULL,
  `permissionId` bigint(32) NOT NULL,
  `createdTime` int(16) NOT NULL DEFAULT '1542869595',
  PRIMARY KEY (`roleId`,`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roles_auth
-- ----------------------------

-- ----------------------------
-- Table structure for `roles_base`
-- ----------------------------
DROP TABLE IF EXISTS `roles_base`;
CREATE TABLE `roles_base` (
  `roleId` bigint(32) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(32) NOT NULL,
  `isDelete` int(2) DEFAULT NULL,
  `createdTime` int(16) NOT NULL DEFAULT '1542869595',
  `updatedTime` int(16) NOT NULL DEFAULT '1542869595',
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=1542870970 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roles_base
-- ----------------------------
INSERT INTO `roles_base` VALUES ('1542870969', '测试', null, '1542870946', '1542870946');
