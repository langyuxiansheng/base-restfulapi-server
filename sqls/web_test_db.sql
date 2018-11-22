/*
Navicat MySQL Data Transfer

Source Server         : 内网数据库
Source Server Version : 50720
Source Host           : 192.168.0.220:3306
Source Database       : web_test_db

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-11-22 13:40:18
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
) ENGINE=InnoDB AUTO_INCREMENT=1541755840 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_base
-- ----------------------------
INSERT INTO `admin_base` VALUES ('1541755836', '超级管理员', 'admin', '85a0f2436642feeea9f909ac2a0bea6f', '0', '1', null, null, null, null, null);
INSERT INTO `admin_base` VALUES ('1541755837', '测试一号', 'test', '85a0f2436642feeea9f909ac2a0bea6f', null, null, null, '1542446864', null, '1541755466', '1541755466');

-- ----------------------------
-- Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `PermissionID` int(11) NOT NULL AUTO_INCREMENT,
  `PermissionName` varchar(64) DEFAULT NULL,
  `PermissionType` bigint(11) DEFAULT '1',
  `PermissionValue` int(11) DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Component` varchar(255) DEFAULT NULL,
  `Meta` varchar(255) DEFAULT NULL,
  `IsDelete` tinyint(1) DEFAULT NULL,
  `CreatedTime` int(11) DEFAULT '1542174930',
  `UpdatedTime` int(11) DEFAULT '1542174930',
  PRIMARY KEY (`PermissionID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('10', '系统设置', '1', '60', '0', '/system', 'Layout', '{\"requireAuth\":false,\"title\":\"系统设置\",\"icon\":\"fa fa-cog\"}', null, '1542445516', '1542445516');
INSERT INTO `permission` VALUES ('11', '权限管理', '1', '61', '10', 'permission', 'Permission', '{\"requireAuth\":false,\"title\":\"权限管理\",\"icon\":null}', null, '1542446223', '1542446223');
INSERT INTO `permission` VALUES ('12', '角色管理', '1', '62', '10', 'roleManage', 'RoleManage', '{\"requireAuth\":false,\"title\":\"角色管理\",\"icon\":null}', null, '1542446223', '1542446223');
INSERT INTO `permission` VALUES ('13', '管理员管理', '1', '63', '10', 'adminManage', 'AdminManage', '{\"requireAuth\":false,\"title\":\"管理员管理\",\"icon\":null}', null, '1542446223', '1542446223');
INSERT INTO `permission` VALUES ('14', '代理商管理', '1', '20', '0', '/agent', 'Layout', '{\"requireAuth\":false,\"title\":\"代理商管理\",\"icon\":\"fa fa-sitemap\"}', null, '1542446223', '1542446223');
INSERT INTO `permission` VALUES ('15', '总代理列表', '1', '21', '14', 'generalAgents', 'GeneralAgents', '{\"requireAuth\":false,\"title\":\"总代理列表\",\"icon\":null}', null, '1542466843', '1542466843');

-- ----------------------------
-- Table structure for `roles_auth`
-- ----------------------------
DROP TABLE IF EXISTS `roles_auth`;
CREATE TABLE `roles_auth` (
  `RoleID` int(11) NOT NULL,
  `PermissionID` int(11) NOT NULL,
  `CreatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`PermissionID`,`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roles_auth
-- ----------------------------
INSERT INTO `roles_auth` VALUES ('1542446864', '10', '1542446223');
INSERT INTO `roles_auth` VALUES ('1542446864', '12', '1542446223');
INSERT INTO `roles_auth` VALUES ('1542446864', '13', '1542446223');

-- ----------------------------
-- Table structure for `roles_base`
-- ----------------------------
DROP TABLE IF EXISTS `roles_base`;
CREATE TABLE `roles_base` (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(32) DEFAULT NULL,
  `IsDelete` int(11) DEFAULT NULL,
  `CreatedTime` int(11) DEFAULT NULL,
  `UpdatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roles_base
-- ----------------------------
INSERT INTO `roles_base` VALUES ('1542446864', '测试人员', null, '1542446223', '1542446223');
