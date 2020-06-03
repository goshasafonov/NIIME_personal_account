-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 03 2020 г., 09:19
-- Версия сервера: 5.7.18
-- Версия PHP: 7.0.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `opfshlkv3`
--

-- --------------------------------------------------------

--
-- Структура таблицы `baseroute`
--

CREATE TABLE `baseroute` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Revision` int(11) DEFAULT NULL,
  `TechnologyId` int(11) NOT NULL,
  `PDKId` int(11) DEFAULT NULL,
  `RouteStatus` int(11) NOT NULL,
  `PDKStatus` int(11) NOT NULL,
  `PCGStatus` int(11) NOT NULL,
  `FrameLibId` int(11) DEFAULT NULL,
  `ExtraFrameDummyGen` tinyint(1) NOT NULL DEFAULT '0',
  `Comment` varchar(400) DEFAULT NULL,
  `Locked` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `baseroute`
--

INSERT INTO `baseroute` (`Id`, `Name`, `Revision`, `TechnologyId`, `PDKId`, `RouteStatus`, `PDKStatus`, `PCGStatus`, `FrameLibId`, `ExtraFrameDummyGen`, `Comment`, `Locked`) VALUES
(1, 'SOI250_4M_3.3V', 1, 1, 29, 2, 2, 2, 31, 0, NULL, 0),
(2, 'SOI250_6M_3.3V', 1, 1, 37, 2, 2, 2, 32, 0, NULL, 0),
(3, 'SOI180_6M_1.8V', 1, 2, 22, 2, 2, 2, 1, 0, NULL, 0),
(4, 'SOI180_6M_3.3V', 1, 2, 22, 2, 2, 2, 1, 0, NULL, 0),
(5, 'SOI180_6M_5V', 1, 2, 22, 2, 2, 2, 1, 0, NULL, 0),
(6, 'HCMOS8D_6M_3.3V', 1, 3, 36, 2, 2, 2, 33, 0, NULL, 0),
(7, 'HCMOS8D_6M_5V', 1, 3, 36, 2, 2, 2, 33, 0, NULL, 0),
(8, 'HCMOS8D_6M_36V', 1, 3, NULL, 1, 4, 4, NULL, 0, NULL, 0),
(9, 'CMOSF8_4M_5V', 1, 4, 1, 2, 2, 2, 26, 0, NULL, 0),
(10, 'CMOSF8_5M_5V', 1, 4, 2, 2, 1, 2, 26, 0, NULL, 0),
(11, 'HCMOS10_LP_7M_2.5V', 1, 5, 6, 2, 2, 2, 36, 0, NULL, 0),
(12, 'HCMOS10_LP_9M_2.5V', 1, 5, 34, 4, 1, 1, NULL, 0, NULL, 0),
(13, 'SOI180_6M_5V_BIS', 1, 2, 22, 2, 2, 2, 1, 0, NULL, 0),
(16, 'HCMOS8D_HP_6M_3.3V', 1, 3, 36, 2, 2, 2, 33, 0, NULL, 0),
(17, 'CMOSF8_6M_5V_BCD', 1, 4, 3, 1, 1, 1, 16, 0, NULL, 0),
(18, 'HCMOS8D_6M_5V_DIS', 1, 3, 23, 2, 2, 2, 22, 0, NULL, 0),
(19, 'O5_2M_8V', 1, 7, 24, 2, 2, 2, NULL, 0, NULL, 0),
(20, 'HCMOS8D_6M_3.3V_RF', 1, 3, 25, 2, 2, 2, 15, 0, NULL, 0),
(21, 'HCMOS8D_6M_5V_RF', 1, 3, 25, 1, 1, 1, 15, 0, NULL, 0),
(22, 'HCMOS10_LP_7M_3.3V', 1, 5, 32, 2, 2, 2, 36, 0, NULL, 0),
(23, 'SOI90_7M_3.3V', 1, 9, 31, 2, 2, 2, 36, 0, NULL, 0),
(24, 'INTERPOSER_7M_9V', 1, 8, 26, 2, 2, 2, 18, 0, NULL, 0),
(26, 'CMOS1FV2', 1, 10, 28, 2, 2, 2, 20, 0, NULL, 0),
(28, 'INTERPOSER_270819', 1, 8, 26, 2, 2, 2, 21, 0, NULL, 0),
(29, 'HCMOS8D_6M_3.3V_FD', 1, 3, 30, 2, 2, 2, 34, 0, NULL, 0),
(30, 'BCD_CMOSF8_6M', 1, 12, 35, 2, 2, 2, 25, 0, NULL, 0),
(31, 'SOI180_6M_5V_PPW', 1, 13, 22, 1, 1, 1, NULL, 0, NULL, 0),
(32, 'Trench_DMOS_V3', 1, 14, 38, 2, 2, 2, NULL, 0, NULL, 0),
(33, 'HCMOS10_LP_ATTESTATION_POLY', 1, 5, 6, 2, 2, 2, NULL, 0, NULL, 0),
(35, 'HCMOS8D_6M_5V', 2, 3, 36, 2, 2, 2, NULL, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `daemon::script`
--

CREATE TABLE `daemon::script` (
  `Id` int(11) NOT NULL,
  `Alias` varchar(300) NOT NULL,
  `Name` varchar(300) NOT NULL,
  `Interpretator` varchar(300) NOT NULL,
  `Script` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `daemon::script`
--

INSERT INTO `daemon::script` (`Id`, `Alias`, `Name`, `Interpretator`, `Script`) VALUES
(1, 'sync', 'SVN syncronization', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_sync/_sync.py'),
(2, 'c2m', 'Mask generation', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_c2m/_c2m.py'),
(3, 'commit', 'SVN commit', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_commit/_commit.py'),
(4, 'import', 'SVN import', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_import/_import.py'),
(5, 'export', 'SVN export', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_export/_export.py'),
(6, 'copy', 'Copy', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_copy/_copy.py'),
(7, 'blocks', 'Eskiz generation', '/grid/opfsh_tools/development/Anaconda3/bin/python3', '/grid/opfsh_tools/common/opfshd-pcg/_blocks/_blocks.py'),
(8, 'structure1', 'Working directory structure preparation (TZ0_0)', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_structure1/_structure1.py'),
(9, 'cadframe', 'Cad frame assembly', '/grid/cad_tools/mentor/ixl_cal_2013.1_14.11/bin/calibrewb', '/grid/opfsh_tools/common/opfshd-pcg/_cadframe/_cadframe.tcl'),
(10, 'maskframe', 'Mask frame assembly', '/grid/cad_tools/mentor/ixl_cal_2013.1_14.11/bin/calibrewb', '/grid/opfsh_tools/common/opfshd-pcg/_maskframe/_maskframe.tcl'),
(11, 'cdlabels', 'Cd-labels placing', '/grid/cad_tools/mentor/ixl_cal_2013.1_14.11/bin/calibrewb', '/grid/opfsh_tools/common/opfshd-pcg/_cdlabels/_cdlabels.tcl'),
(12, 'create_archive', 'Archive creation', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_create_archive/_create_archive.py'),
(13, 'floorplanner', 'Eskiz generation', '/bin/bash', '/grid/opfsh_tools/common/Floorplanner/latest/api/api.sh'),
(14, 'svndelete', 'SVN delete', '/grid/opfsh_tools/development/Anaconda2/envs/rhel5/bin/python2', '/grid/opfsh_tools/common/opfshd-pcg/_svndelete/_svndelete.py');

-- --------------------------------------------------------

--
-- Структура таблицы `document`
--

CREATE TABLE `document` (
  `Id` int(11) NOT NULL,
  `Path` varchar(300) CHARACTER SET cp1251 NOT NULL,
  `Name` varchar(300) CHARACTER SET cp1251 NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UploadUserId` int(11) NOT NULL,
  `UploadStatusId` int(11) NOT NULL,
  `PublicationStatusId` int(11) NOT NULL,
  `MD5` varchar(50) CHARACTER SET cp1251 NOT NULL,
  `Description` varchar(3000) CHARACTER SET cp1251 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `document`
--

INSERT INTO `document` (`Id`, `Path`, `Name`, `TimeStamp`, `UploadUserId`, `UploadStatusId`, `PublicationStatusId`, `MD5`, `Description`) VALUES
(123, 'upload/123/doc_123.docx', 'Skhemy.docx', '2020-06-03 08:48:19', 13131313, 2, 1, '46976c894a4ee1b67f1365cddce9f6a4', '');

-- --------------------------------------------------------

--
-- Структура таблицы `document::publicationstatus`
--

CREATE TABLE `document::publicationstatus` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET cp1251 NOT NULL,
  `StatusClass` varchar(100) CHARACTER SET cp1251 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `document::publicationstatus`
--

INSERT INTO `document::publicationstatus` (`Id`, `Name`, `StatusClass`) VALUES
(1, 'Ожидание', 'warning'),
(2, 'Опубликован', 'success'),
(3, 'Отклонен', 'danger');

-- --------------------------------------------------------

--
-- Структура таблицы `document::uploadstatus`
--

CREATE TABLE `document::uploadstatus` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET cp1251 NOT NULL,
  `StatusClass` varchar(100) CHARACTER SET cp1251 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `document::uploadstatus`
--

INSERT INTO `document::uploadstatus` (`Id`, `Name`, `StatusClass`) VALUES
(1, 'Загужается', 'warning'),
(2, 'Загружен', 'success'),
(3, 'Ошибка', 'danger');

-- --------------------------------------------------------

--
-- Структура таблицы `frame::lib`
--

CREATE TABLE `frame::lib` (
  `Id` int(10) NOT NULL,
  `TechnologyId` int(11) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `WidthL` int(11) NOT NULL,
  `WidthR` int(11) NOT NULL,
  `WidthU` int(11) NOT NULL,
  `WidthD` int(11) NOT NULL,
  `MinXSize` int(11) NOT NULL,
  `MinMlrYSize` int(11) NOT NULL,
  `MinSlrYSize` int(11) NOT NULL,
  `MaxXSize` int(11) NOT NULL,
  `MaxMlrYSize` int(11) NOT NULL,
  `MaxSlrYSize` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `frame::lib`
--

INSERT INTO `frame::lib` (`Id`, `TechnologyId`, `Name`, `WidthL`, `WidthR`, `WidthU`, `WidthD`, `MinXSize`, `MinMlrYSize`, `MinSlrYSize`, `MaxXSize`, `MaxMlrYSize`, `MaxSlrYSize`) VALUES
(1, 2, 'BIB_SOI180_6M_V002.oas', 100, 100, 100, 100, 16190, 14460, 15400, 26000, 15400, 32000),
(2, 2, 'TEST_V111.oas', 100, 100, 100, 100, 0, 0, 0, 26000, 15400, 32000),
(3, 1, 'BIB_SOI250_6M_V004.oas', 100, 100, 100, 100, 16110, 13100, 15400, 26000, 15400, 32000),
(4, 4, 'BIB_CMOSF8_V001.oas', 100, 100, 100, 100, 21740, 12800, 15400, 26000, 15400, 32000),
(5, 1, 'BIB_SOI250_4M_V003.oas', 100, 100, 100, 100, 15240, 13920, 15400, 26000, 15400, 32000),
(6, 3, 'BIB_HCMOS8D_V005.oas', 100, 100, 100, 100, 15970, 9120, 15400, 26000, 15400, 32000),
(7, 7, 'BIB_O5_2M_V001.oas', 100, 100, 100, 100, 15970, 9120, 15400, 26000, 15400, 32000),
(8, 3, 'BIB_HCMOS8D_6M_5V_DIS_V001.oas', 100, 100, 100, 100, 17720, 10488, 15401, 26000, 15400, 32000),
(9, 4, 'BIB_CMOSF8_FULL_PRINT_V001.oas', 100, 100, 100, 100, 0, 0, 0, 26000, 15400, 32000),
(10, 3, 'BIB_HCMOS8D_ONO_DRF_V001.oas', 100, 100, 100, 100, 0, 0, 0, 26000, 15400, 32000),
(11, 3, 'BIB_HCMOS8D_TEST_V001.oas', 100, 100, 100, 100, 0, 0, 0, 26000, 15400, 32000),
(12, 8, 'BIB_INTERPOSER_6M_9V_V001.oas', 100, 100, 100, 100, 15970, 9120, 15400, 26000, 15400, 32000),
(13, 3, 'BIB_HCMOS8D_FD_V001.oas', 100, 100, 100, 100, 0, 0, 0, 26000, 15400, 32000),
(15, 3, 'BIB_HCMOS8D_FD_RF_V001.oas', 100, 100, 100, 100, 16700, 9210, 15400, 26000, 15400, 32000),
(16, 4, 'BIB_CMOSF8_2F8_18_V001.oas', 100, 100, 100, 100, 18380, 12626, 15400, 26000, 15400, 32000),
(17, 3, 'BIB_HCMOS8D_6M_5V_DIS_V002.oas', 100, 100, 100, 100, 17720, 10488, 15401, 26000, 15400, 32000),
(18, 8, 'BIB_INTERPOSER_7M_9V_V001.oas', 100, 100, 100, 100, 0, 0, 0, 26000, 15400, 32000),
(19, 4, 'BIB_CMOSF8_V002.oas', 100, 100, 100, 100, 21740, 12800, 15400, 26000, 15400, 32000),
(20, 10, 'BIB_CMOS1FV2_V001.oas', 84, 84, 84, 84, 25584, 15400, 31750, 26000, 15400, 32000),
(21, 8, 'BIB_INTERPOSER_270819_V001.oas', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 3, 'BIB_HCMOS8D_6M_5V_DIS_V003.oas', 100, 100, 100, 100, 17720, 10488, 15401, 26000, 15400, 32000),
(23, 3, 'BIB_HCMOS8D_FD_RF_V002.oas', 100, 100, 100, 100, 16700, 9210, 15400, 26000, 15400, 32000),
(25, 12, 'BIB_BCD_2F8_18_V001.oas', 100, 100, 100, 100, 18380, 12626, 15400, 26000, 15400, 32000),
(26, 4, 'BIB_CMOSF8_V003.oas', 100, 100, 100, 100, 23120, 12800, 15400, 26000, 15400, 32000),
(27, 2, 'BIB_SOI180_6M_TEST_V003.oas', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 1, 'BIB_SOI250_6M_TEST_V005.oas', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(31, 1, 'BIB_SOI250_4M_V004.oas', 100, 100, 100, 100, 16110, 13100, 15400, 26000, 15400, 32000),
(32, 1, 'BIB_SOI250_6M_V005.oas', 100, 100, 100, 100, 15240, 13920, 15400, 26000, 15400, 32000),
(33, 3, 'BIB_HCMOS8D_V006.oas', 100, 100, 100, 100, 15970, 9120, 15400, 26000, 15400, 32000),
(34, 3, 'BIB_HCMOS8D_FD_V003.oas', 100, 100, 100, 100, 16160, 9120, 15400, 26000, 15400, 32000),
(35, 8, 'BIB_INTERPOSER_9M_SIPROT_V001.oas', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(36, 5, 'BIB_HCMOS10_LP_SOI090_9M_V001.oas', 80, 40, 80, 40, 0, 0, 0, 26000, 15400, 32000);

-- --------------------------------------------------------

--
-- Структура таблицы `grade`
--

CREATE TABLE `grade` (
  `Id` int(11) NOT NULL,
  `Name` varchar(10) NOT NULL,
  `MaxCDAmaount` int(11) DEFAULT NULL,
  `MaxREGAmaount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `grade`
--

INSERT INTO `grade` (`Id`, `Name`, `MaxCDAmaount`, `MaxREGAmaount`) VALUES
(1, 'A', NULL, NULL),
(2, 'D', NULL, NULL),
(3, 'E', NULL, NULL),
(4, 'F', NULL, NULL),
(5, 'G9', NULL, NULL),
(6, 'G8', NULL, NULL),
(7, 'EAF', NULL, NULL),
(8, 'EAG9', NULL, NULL),
(9, 'EAG8', NULL, NULL),
(10, 'B', NULL, NULL),
(11, 'IA', NULL, NULL),
(12, 'JC', NULL, NULL),
(13, 'EAIF', NULL, NULL),
(14, 'HB', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `layer`
--

CREATE TABLE `layer` (
  `Id` int(11) NOT NULL,
  `Layer` varchar(10) NOT NULL,
  `Name` varchar(100) CHARACTER SET cp1251 NOT NULL,
  `BaseRouteId` int(11) NOT NULL,
  `Comment` varchar(3000) CHARACTER SET cp1251 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::cad`
--

CREATE TABLE `layer::cad` (
  `Id` int(11) NOT NULL,
  `LayerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::forbidding`
--

CREATE TABLE `layer::forbidding` (
  `Id` int(11) NOT NULL,
  `CadLayerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::intermediate`
--

CREATE TABLE `layer::intermediate` (
  `Id` int(11) NOT NULL,
  `LayerId` int(11) NOT NULL,
  `Mark` tinyint(1) NOT NULL DEFAULT '0',
  `Density` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::intermediate_layer::merging_r`
--

CREATE TABLE `layer::intermediate_layer::merging_r` (
  `Id` int(11) NOT NULL,
  `IntermediateLayerId` int(11) NOT NULL,
  `MergingLayerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::mask`
--

CREATE TABLE `layer::mask` (
  `Id` int(11) NOT NULL,
  `LayerId` int(11) NOT NULL,
  `Mark` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::mask_layer::intermediate_r`
--

CREATE TABLE `layer::mask_layer::intermediate_r` (
  `Id` int(11) NOT NULL,
  `MaskLayerId` int(11) NOT NULL,
  `IntermediateLayerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::merging`
--

CREATE TABLE `layer::merging` (
  `Id` int(11) NOT NULL,
  `CadLayerId` int(11) NOT NULL,
  `Base` tinyint(1) NOT NULL DEFAULT '1',
  `Dummy` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::merging_layer::forbidding_r`
--

CREATE TABLE `layer::merging_layer::forbidding_r` (
  `Id` int(11) NOT NULL,
  `MergingLayerId` int(11) NOT NULL,
  `ForbiddingLayerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer::suspended`
--

CREATE TABLE `layer::suspended` (
  `Id` int(11) NOT NULL,
  `CadLayerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `layer_option_r`
--

CREATE TABLE `layer_option_r` (
  `Id` int(11) NOT NULL,
  `LayerId` int(11) NOT NULL,
  `OptionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `option`
--

CREATE TABLE `option` (
  `Id` int(11) NOT NULL,
  `Name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `option`
--

INSERT INTO `option` (`Id`, `Name`) VALUES
(1, 'H'),
(2, 'M'),
(3, 'HKM'),
(4, 'S'),
(5, 'CS');

-- --------------------------------------------------------

--
-- Структура таблицы `optioncombination`
--

CREATE TABLE `optioncombination` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `optioncombination`
--

INSERT INTO `optioncombination` (`Id`, `Name`) VALUES
(1, 'H'),
(2, 'M'),
(3, 'HKM'),
(4, 'S'),
(5, 'H_M'),
(6, 'H_HKM'),
(7, 'S_H'),
(8, 'S_CS'),
(9, 'S_H_CS'),
(10, 'S_H_M'),
(11, 'S_CS_M'),
(12, 'S_H_CS_M'),
(13, 'S_H_HKM'),
(14, 'S_CS_HKM'),
(15, 'S_H_CS_HKM'),
(16, 'S_M'),
(17, 'S_HKM'),
(18, 'CS'),
(19, 'H_CS'),
(20, 'H_CS_HKM'),
(21, 'CS_M'),
(22, 'CS_HKM'),
(23, 'H_CS_M');

-- --------------------------------------------------------

--
-- Структура таблицы `optioncombination_baseroute_r`
--

CREATE TABLE `optioncombination_baseroute_r` (
  `Id` int(11) NOT NULL,
  `OptionCombinationId` int(11) NOT NULL,
  `BaseRouteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `optioncombination_baseroute_r`
--

INSERT INTO `optioncombination_baseroute_r` (`Id`, `OptionCombinationId`, `BaseRouteId`) VALUES
(1, 1, 2),
(2, 1, 4),
(3, 1, 5),
(4, 1, 6),
(5, 1, 7),
(6, 1, 11),
(11, 1, 22),
(12, 2, 2),
(13, 2, 4),
(14, 2, 5),
(15, 2, 6),
(16, 2, 7),
(17, 2, 11),
(18, 2, 13),
(19, 2, 16),
(25, 2, 22),
(26, 2, 23),
(29, 3, 2),
(30, 3, 4),
(31, 3, 5),
(32, 3, 6),
(33, 3, 7),
(34, 3, 13),
(35, 3, 16),
(38, 4, 5),
(39, 4, 7),
(41, 5, 2),
(42, 5, 4),
(43, 5, 5),
(44, 5, 6),
(45, 5, 7),
(46, 5, 11),
(50, 5, 22),
(51, 6, 2),
(52, 6, 4),
(53, 6, 5),
(54, 6, 6),
(55, 6, 7),
(59, 7, 5),
(60, 7, 7),
(62, 8, 5),
(63, 10, 5),
(64, 10, 7),
(66, 11, 5),
(67, 13, 5),
(68, 13, 7),
(70, 14, 5),
(71, 16, 5),
(72, 16, 7),
(74, 17, 5),
(75, 17, 7),
(77, 18, 5),
(78, 21, 5),
(79, 22, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `optioncombination_option_r`
--

CREATE TABLE `optioncombination_option_r` (
  `Id` int(11) NOT NULL,
  `OptionCombinationId` int(11) NOT NULL,
  `OptionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `optioncombination_option_r`
--

INSERT INTO `optioncombination_option_r` (`Id`, `OptionCombinationId`, `OptionId`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 1),
(6, 5, 2),
(7, 6, 1),
(8, 6, 3),
(9, 7, 1),
(10, 7, 4),
(11, 8, 4),
(12, 8, 5),
(13, 10, 1),
(14, 10, 2),
(15, 10, 4),
(16, 11, 2),
(17, 11, 4),
(18, 11, 5),
(19, 13, 1),
(20, 13, 3),
(21, 13, 4),
(22, 14, 3),
(23, 14, 4),
(24, 14, 5),
(25, 16, 2),
(26, 16, 4),
(27, 17, 3),
(28, 17, 4),
(29, 18, 5),
(30, 21, 2),
(31, 21, 5),
(32, 22, 3),
(33, 22, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `pdk`
--

CREATE TABLE `pdk` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `StatusId` int(11) DEFAULT NULL,
  `Path` varchar(100) DEFAULT NULL,
  `Drc1DeckPath` varchar(500) DEFAULT NULL,
  `Drc2DeckPath` varchar(500) DEFAULT NULL,
  `Drc1CtrlPath` varchar(300) DEFAULT NULL,
  `Drc2CtrlPath` varchar(300) DEFAULT NULL,
  `SetupScriptPath` varchar(500) DEFAULT NULL,
  `TemplateScriptPath1` varchar(500) DEFAULT NULL,
  `TemplateScriptPath2` varchar(500) DEFAULT NULL,
  `DummyDeckPath` varchar(300) DEFAULT NULL,
  `DummyCtrlPath` varchar(300) DEFAULT NULL,
  `StreamInOutPath` varchar(100) DEFAULT NULL,
  `CalibreVersion` varchar(300) DEFAULT NULL,
  `TechnologyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `pdk`
--

INSERT INTO `pdk` (`Id`, `Name`, `StatusId`, `Path`, `Drc1DeckPath`, `Drc2DeckPath`, `Drc1CtrlPath`, `Drc2CtrlPath`, `SetupScriptPath`, `TemplateScriptPath1`, `TemplateScriptPath2`, `DummyDeckPath`, `DummyCtrlPath`, `StreamInOutPath`, `CalibreVersion`, `TechnologyId`) VALUES
(1, 'PDK_v1.0p1', 2, '/workarea/Libraries/release/CMOSF8_4M/PDK_v1.0p1', '/workarea/Libraries/release/CMOSF8_4M/PDK_v1.0p1/physical/calibre/calibre.drc', '/workarea/Libraries/release/CMOSF8_4M/PDK_v1.0p1/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_4M_5V/DRC/CMOSF8_4M_5V_PDK_v1.0p1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_4M_5V/DRC/CMOSF8_4M_5V_PDK_v1.0p1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/CMOSF8_4M/PDK_v1.0p1/cadence/stream/StreamInOut', 'ixl_cal_2010.2_38.23', 4),
(2, 'DK_cmosf8_v2', 2, '/workarea/Libraries/release/CMOSF8_5M/DK_cmosf8_v2/calibre', '/workarea/Libraries/release/CMOSF8_5M/DK_cmosf8_v2/calibre/calibre.drc', '/workarea/Libraries/release/CMOSF8_5M/DK_cmosf8_v2/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_5M_5V/DRC/CMOSF8_5M_5V_DK_cmosf8_v2_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_5M_5V/DRC/CMOSF8_5M_5V_DK_cmosf8_v2_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/CMOSF8_5M/DK_cmosf8_v2/stream/StreamInOut', 'ixl_cal_2007.3_36.25', 4),
(3, 'PDK_v1.0', 2, '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0', '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0/physical/calibre/calibre.drc', '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_6M_5V_BCD/DRC/CMOSF8_6M_5V_BCD_PDK_v1.0_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_6M_5V_BCD/DRC/CMOSF8_6M_5V_BCD_PDK_v1.0_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0/cadence/stream/StreamInOut', 'ixl_cal_2012.2_36.25', 4),
(4, 'PDK_v1.0', 3, '/workarea/Libraries/release/HCMOS10LP/PDK_v1.0', NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS10FL/setup_PDK_v1.0.env', '/workarea/Libraries/release/HCMOS10FL/PDK_v1.0/physical/calibre/calibredrc.sh', '/workarea/Libraries/release/HCMOS10FL/PDK_v1.0/physical/calibre/calibreantenna.sh', NULL, NULL, '/workarea/Libraries/release/HCMOS10LP/PDK_v1.0/cadence/stream/streamInOut.map', '', 5),
(5, 'PDK_v1.0_oa', 3, '/workarea/Libraries/release/HCMOS10LP/PDK_v1.0_oa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS10LP/PDK_v1.0_oa/cadence/stream/streamInOut.map', '', 5),
(6, 'PDK_v1.1_oa', 2, '/workarea/Libraries/release/HCMOS10LP/PDK_v1.1_oa', NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS10LP/setup_PDK_v1.1_oa.env', '/workarea/Libraries/release/HCMOS10LP/PDK_v1.1_oa/physical/calibre/calibredrc.sh', '/workarea/Libraries/release/HCMOS10LP/PDK_v1.1_oa/physical/calibre/calibreantenna.sh', NULL, NULL, '/workarea/Libraries/release/HCMOS10LP/PDK_v1.1_oa/cadence/stream/streamInOut.map', '', 5),
(7, 'PDK_v2.1', 3, '/workarea/Libraries/release/HCMOS8D/PDK_v2.1', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS8D/PDK_v2.1/cadence/stream/StreamInOut', 'ixl_cal_2014.3_35.26', 3),
(9, 'PDK_v1.1p2', 3, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v1.1p2', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v1.1p2_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v1.1p2_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v1.1p2/cadence/stream/streamInOut.map', 'ixl_cal_2012.2_36.25', 2),
(10, 'PDK_v3.0', 3, '/workarea/Libraries/release/LibMikron_SOI_025_4M_3V3/PDK_v3.0', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_4M_3.3V/DRC/SOI250_4M_3.3V_PDK_v3.0_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_4M_3.3V/DRC/SOI250_4M_3.3V_PDK_v3.0_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_025_4M_3V3/PDK_v3.0/cadence/stream/streamInOut.map', 'ixl_cal_2014.3_35.26', 1),
(11, 'PDK_v3.0hf1', 2, '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf1', '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf1/physical/calibre/calibre.drc', '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf1/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_6M_3.3V/DRC/SOI250_6M_3.3V_PDK_v3.0hf1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_6M_3.3V/DRC/SOI250_6M_3.3V_PDK_v3.0hf1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf1/cadence/stream/streamInOut.map', 'ixl_cal_2014.3_35.26', 1),
(12, 'PDK_v2.1p1', 3, '/workarea/Libraries/release/HCMOS8D/PDK_v2.1p1', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.1p1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.1p1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS8D/PDK_v2.1p1/cadence/stream/StreamInOut', 'ixl_cal_2014.3_35.26', 3),
(13, 'PDK_v2.2', 2, '/workarea/Libraries/release/HCMOS8D/PDK_v2.2', '/workarea/Libraries/release/HCMOS8D/PDK_v2.2/physical/calibre/calibre.drc', '/workarea/Libraries/release/HCMOS8D/PDK_v2.2/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.2_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.2_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS8D/PDK_v2.2/cadence/stream/StreamInOut', 'ixl_cal_2016.2_39.26', 3),
(20, 'PDK_v1.1p2hf1', 3, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v1.1p2hf1', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v1.1p2hf1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v1.1p2hf1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v1.1p2/cadence/stream/streamInOut.map', 'ixl_cal_2012.2_36.25', 2),
(21, 'PDK_v2.0', 3, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v2.0', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v2.0_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v2.0_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v2.0/cadence/stream/streamInOut.map', 'ixl_cal_2016.2_39.26', 2),
(22, 'PDK_v2.1', 2, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v2.1', '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v2.1/physical/calibre/calibre.drc', '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v2.1/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v2.1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/SOI180_6M_1.8V/DRC/SOI180_6M_1.8V_PDK_v2.1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_018_6M/PDK_v2.1/cadence/stream/streamInOut.map', 'ixl_cal_2016.2_39.26', 2),
(23, 'PDK_vDisp_r1259', 1, '/workarea/Libraries/development/HCMOS8D/PDK_vDisp_r1259', NULL, NULL, 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_5V_DIS/DRC/HCMOS8D_6M_5V_DIS_PDK_vDisp_r1259_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_5V_DIS/DRC/HCMOS8D_6M_5V_DIS_PDK_vDisp_r1259_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/development/HCMOS8D/PDK_vDisp_r1259/cadence/stream/StreamInOut', 'ixl_cal_2014.3_35.26', 3),
(24, 'Unknow_O5', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7),
(25, 'PDK_v1.0', 2, '/workarea/Libraries/release/HCMOS8DRF/PDK_v1.0', '/workarea/Libraries/release/HCMOS8DRF/PDK_v1.0/physical/calibre/calibre.drc', '/workarea/Libraries/release/HCMOS8DRF/PDK_v1.0/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V_RF/DRC/HCMOS8D_6M_3.3V_RF_PDK_v1.0.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V_RF/DRC/HCMOS8D_6M_3.3V_RF_PDK_v1.0_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS8DRF/PDK_v1.0/cadence/stream/StreamInOut', 'ixl_cal_2016.2_39.26', 3),
(26, 'Unknown_INTERPOSER', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
(27, 'PDK_v3.0hf2', 3, '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf2', '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf2/physical/calibre/calibre.drc', '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf2/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_6M_3.3V/DRC/SOI250_6M_3.3V_PDK_v3.0hf2_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_6M_3.3V/DRC/SOI250_6M_3.3V_PDK_v3.0hf2_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.0hf1/cadence/stream/streamInOut.map', 'ixl_cal_2014.3_35.26', 1),
(28, 'Unknow_CMOS1F', 4, '', NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, '/workarea/INCHECK/PDK/CMOS1F/Unknown_CMOS1FV2/StreamInOut', '', 10),
(29, 'PDK_v3.1', 2, '/workarea/Libraries/release/LibMikron_SOI_025_4M_3V3/PDK_v3.1', '/workarea/Libraries/release/LibMikron_SOI_025_4M_3V3/PDK_v3.1/physical/calibre/calibre.drc', '/workarea/Libraries/release/LibMikron_SOI_025_4M_3V3/PDK_v3.1/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_4M_3.3V/DRC/SOI250_4M_3.3V_PDK_v3.1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_4M_3.3V/DRC/SOI250_4M_3.3V_PDK_v3.1_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_025_4M_3V3/PDK_v3.1/cadence/stream/streamInOut.map', 'ixl_cal_2014.3_35.26', 1),
(30, 'PDK_vFD_r1303', 1, '/workarea/Libraries/development/HCMOS8D/PDK_vFD_r1303', '/workarea/Libraries/development/HCMOS8D/PDK_vFD_r1303/physical/calibre/calibre.drc', '/workarea/Libraries/development/HCMOS8D/PDK_vFD_r1303/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V_FD/DRC/HCMOS8D_6M_3.3V_FD_PDK_vFD_r1303_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V_FD/DRC/HCMOS8D_6M_3.3V_FD_PDK_vFD_r1303_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/development/HCMOS8D/PDK_vFD_r1303/cadence/stream/StreamInOut', 'ixl_cal_2016.2_39.26', 3),
(31, 'PDK_v1.0', 2, '/workarea/Libraries/release/LibMikron_SOI_090_7M/PDK_v1.0', NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_090_7M/setup_PDK_v1.0.env', '/workarea/Libraries/release/LibMikron_SOI_090_7M/PDK_v1.0/physical/calibre/calibredrc.sh', '/workarea/Libraries/release/LibMikron_SOI_090_7M/PDK_v1.0/physical/calibre/calibreantenna.sh', NULL, NULL, NULL, NULL, 9),
(32, 'PDK_v1.0', 2, '/workarea/Libraries/release/HCMOS10FL/PDK_v1.0', NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS10FL/setup_PDK_v1.0.env', '/workarea/Libraries/release/HCMOS10FL/PDK_v1.0/physical/calibre/calibredrc.sh', '/workarea/Libraries/release/HCMOS10FL/PDK_v1.0/physical/calibre/calibreantenna.sh', NULL, NULL, '/workarea/Libraries/release/HCMOS10FL/PDK_v1.0/cadence/stream/streamInOut.map', NULL, 5),
(34, 'PDK_v1.0_draft_', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
(35, 'PDK_v1.0', 2, '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0', '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0/physical/calibre/calibre.drc', '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_6M_5V_BCD/DRC/CMOSF8_6M_5V_BCD_PDK_v1.0_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/CMOSF8_6M_5V_BCD/DRC/CMOSF8_6M_5V_BCD_PDK_v1.0_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/CMOSF8_6M/PDK_v1.0/cadence/stream/StreamInOut', 'ixl_cal_2012.2_36.25', 12),
(36, 'PDK_v2.3', 2, '/workarea/Libraries/release/HCMOS8D/PDK_v2.3', '/workarea/Libraries/release/HCMOS8D/PDK_v2.3/physical/calibre/calibre.drc', '/workarea/Libraries/release/HCMOS8D/PDK_v2.3/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.3_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/HCMOS8D_6M_3.3V/DRC/HCMOS8D_6M_3.3V_PDK_v2.3_DRC2.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/HCMOS8D/PDK_v2.3/cadence/stream/StreamInOut', 'ixl_cal_2016.2_39.26', 3),
(37, 'PDK_v3.1', 2, '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.1', '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.1/physical/calibre/calibre.drc', '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.1/physical/calibre/calibre.drc', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_6M_3.3V/DRC/SOI250_6M_3.3V_PDK_v3.1_DRC1.ctrl', 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/SOI250_6M_3.3V/DRC/SOI250_6M_3.3V_PDK_v3.1_DRC1.ctrl', NULL, NULL, NULL, NULL, NULL, '/workarea/Libraries/release/LibMikron_SOI_025_6M_3V3/PDK_v3.1/cadence/stream/streamInOut.map', 'ixl_cal_2014.3_35.26', 1),
(38, 'PDK_TDMOS', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 14);

-- --------------------------------------------------------

--
-- Структура таблицы `psow`
--

CREATE TABLE `psow` (
  `Id` int(11) NOT NULL,
  `BaseRouteId` int(11) NOT NULL,
  `Path` varchar(300) DEFAULT NULL,
  `Version` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `psow::line`
--

CREATE TABLE `psow::line` (
  `Id` int(11) NOT NULL,
  `PSOWId` int(11) NOT NULL,
  `MaskLayerId` int(11) NOT NULL,
  `Position` int(11) NOT NULL,
  `PM_CDSizeDark` decimal(10,3) DEFAULT NULL,
  `PM_CDSizeClear` decimal(10,3) DEFAULT NULL,
  `PM_CDSizeLimit` decimal(10,3) DEFAULT NULL,
  `PM_CDScatterLimit` decimal(10,3) DEFAULT NULL,
  `PM_CDAlignLimit` decimal(10,3) DEFAULT NULL,
  `PM_Tonality` varchar(5) DEFAULT NULL,
  `PM_GradeId` int(11) NOT NULL,
  `TPM_SizeAdjust` decimal(10,3) DEFAULT NULL,
  `TPM_CDSizeDark` decimal(10,3) DEFAULT NULL,
  `TPM_CDSizeClear` decimal(10,3) DEFAULT NULL,
  `TPM_OPCType` varchar(20) DEFAULT NULL,
  `TPM_PMType` varchar(20) DEFAULT NULL,
  `TP_CDSizwDark` decimal(10,3) DEFAULT NULL,
  `TP_CDSizeClear` decimal(10,3) DEFAULT NULL,
  `TP_MinSizeDark` decimal(10,3) DEFAULT NULL,
  `TP_MinSizeClear` decimal(10,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE `status` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`Id`, `Name`) VALUES
(1, 'development'),
(2, 'release'),
(3, 'notused'),
(4, 'NoTZ');

-- --------------------------------------------------------

--
-- Структура таблицы `technology`
--

CREATE TABLE `technology` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `ShortName` varchar(2) NOT NULL,
  `KadrDistance` int(11) DEFAULT '1200',
  `FrameDistanceX` int(11) DEFAULT '2',
  `FrameDistanceY` int(11) DEFAULT '2',
  `FontLibName` varchar(300) DEFAULT NULL,
  `LithoFrameLibName` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `technology`
--

INSERT INTO `technology` (`Id`, `Name`, `ShortName`, `KadrDistance`, `FrameDistanceX`, `FrameDistanceY`, `FontLibName`, `LithoFrameLibName`) VALUES
(1, 'SOI250', 'K1', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(2, 'SOI180', 'K2', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(3, 'HCMOS8D', 'H8', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(4, 'CMOSF8', 'F8', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(5, 'HCMOS10_LP', 'H1', NULL, NULL, NULL, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(6, 'HCMOS065_LP', 'H2', NULL, NULL, NULL, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(7, 'O5', 'O5', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(8, 'INTERPOSER', 'P1', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(9, 'SOI90', 'H1', 1200, 2, 2, NULL, NULL),
(10, 'CMOS1F', 'C1', 1200, 2, 2, NULL, NULL),
(11, 'SOI1806MVT', 'KB', 1200, 2, 2, NULL, NULL),
(12, 'BCD', 'B1', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(13, 'SOI180_EXP', 'K2', 1200, 2, 2, 'FONT.oas', 'ASML_PAS5500_750H_65.oas'),
(14, 'TDMOS', 'C2', 1200, 2, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `teg`
--

CREATE TABLE `teg` (
  `Id` int(11) NOT NULL,
  `Path` varchar(300) NOT NULL,
  `Md5` varchar(32) NOT NULL,
  `Orientation` varchar(15) NOT NULL,
  `SizeX` decimal(10,3) NOT NULL,
  `SizeY` decimal(10,3) NOT NULL,
  `PrimaryCellId` int(11) DEFAULT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpirationDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `teg`
--

INSERT INTO `teg` (`Id`, `Path`, `Md5`, `Orientation`, `SizeX`, `SizeY`, `PrimaryCellId`, `CreationDate`, `ExpirationDate`) VALUES
(1, 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/TEG/TEG_CMOSF8_HOR_V1.gds.gz', '4c6e40f6890b8f73b48bc2d675645975', 'horizontal', '25013.000', '649.700', 19, '2020-05-26 05:32:22', NULL),
(2, 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/TEG/TEG_CMOSF8_OPVG_V2.gds.gz', '16c1e44d9aa454f456536e6fa361b330', 'horizontal', '15355.014', '207.000', 19, '2020-05-26 05:36:25', NULL),
(3, 'http://mikron-subversion/svn/reticle/trunk/CMOSF8/Technology/TEG/TEG_CMOSF8_VERT_V1.gds.gz', '44ce0c13a802ede3ac6d8fefceeb3cf7', 'vertical', '1262.000', '14014.000', 19, '2020-05-26 05:38:00', NULL),
(4, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_4M_V2.gds.gz', '78d57a8f4fb6b818394b004dfc669ea1', 'vertical', '8456.080', '5138.480', 64, '2020-05-26 05:57:25', NULL),
(5, 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/TEG/TEG_HCMOS8D_3P3V_V2.gds.gz', '9d4fe8e417979adf1f7a463a22d67085', 'vertical', '554.040', '15088.000', 98, '2020-05-26 06:06:24', NULL),
(6, 'http://mikron-subversion/svn/reticle/trunk/HCMOS8D/Technology/TEG/TEG_HCMOS8D_5V_V5.gds.gz', 'd70afed0ad8fe021f746b7bcd516bb5e', 'horizontal', '1548.560', '5172.040', 98, '2020-05-26 06:10:29', NULL),
(8, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_6M_BASE_M_HKM_V4.gds.gz', '565a2f30c525c3c20183bc65b5e30a1c', 'horizontal', '5139.120', '4478.000', 164, '2020-05-26 06:19:44', NULL),
(9, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_6M_V4.gds.gz', '7b3df773cd36df4005e6c9b5c9fe3c60', 'vertical', '12271.080', '5157.140', 164, '2020-05-26 06:24:56', NULL),
(10, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_6M_LINE_V3.gds.gz', '508ff15779a5de1d399fae6309387860', 'horizontal', '25510.810', '903.120', 164, '2020-05-26 06:27:35', NULL),
(11, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_6M_LINE_M_HKM_V3.gds.gz', '93c674cc8ed7ac2e6a89a5246a7baeb7', 'horizontal', '25510.810', '903.120', 164, '2020-05-26 06:30:45', NULL),
(12, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_6M_H_V3.gds.gz', '4f09cac9da9deb2f3c32f682d9e433ce', 'vertical', '342.840', '5082.600', 164, '2020-05-26 06:32:24', NULL),
(13, 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/TEG/TEG_SOI180_KG_V2/TEG_SOI180_KG_V2.gds.gz', '8f36947c39ce5522093164ad230e491f', 'vertical', '14266.010', '5148.620', 290, '2020-05-26 06:47:49', NULL),
(14, 'http://mikron-subversion/svn/reticle/trunk/SOI180/Technology/TEG/TEG_SOI180_CS_1_V2/TEG_SOI180_CS_1_V2.gds.gz', '84540df301a883787f767512a34c5105', 'vertical', '80.000', '5072.460', 290, '2020-05-26 06:48:56', NULL),
(15, 'http://mikron-subversion/svn/reticle/trunk/SOI250/Technology/TEG/TEG_SOI250_6M_BASE_V4.gds.gz', 'c472ad270a9abf3c1c8169bc442e8a21', 'horizontal', '5139.120', '4478.000', 164, '2020-05-26 09:36:35', NULL),
(16, 'http://mikron-subversion/svn/reticle/trunk/HCMOS10_LP/MIK_2H1_19/TZ0_0/GDSIN/TEG_HCMOS10LP_7M_rev4.gds.gz', '6cc4a4e22b8ec1ff4093d20b216b58de', 'horizontal', '6178.403', '1610.874', 335, '2020-05-26 13:17:29', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `teg::cell`
--

CREATE TABLE `teg::cell` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Mandatory` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `teg::cell`
--

INSERT INTO `teg::cell` (`Id`, `Name`, `Mandatory`) VALUES
(1, 'TEG_CMOSF8_DAM_V1', 1),
(2, 'TEG_CMOSF8_F8MET_V1', 1),
(3, 'TEG_CMOSF8_HV1_V1', 1),
(4, 'TEG_CMOSF8_HV2_V1', 1),
(5, 'TEG_CMOSF8_LV1_V1', 1),
(6, 'TEG_CMOSF8_MATCH_V1', 1),
(7, 'TEG_CMOSF8_NIST1_V1', 1),
(8, 'TEG_CMOSF8_NIST2_V1', 1),
(9, 'TEG_CMOSF8_OXNW_V1', 1),
(10, 'TEG_CMOSF8_OXPW_V1', 1),
(11, 'TEG_CMOSF8_RES1_V1', 1),
(12, 'TEG_CMOSF8_RES2_V1', 1),
(13, 'TEG_CMOSF8_RES3_V1', 1),
(14, 'TEG_CMOSF8_RES4_V1', 1),
(15, 'TEG_CMOSF8_RES5_V1', 1),
(16, 'TEG_CMOSF8_RES6_V1', 1),
(17, 'TEG_CMOSF8_SEL1_V1', 1),
(18, 'TEG_CMOSF8_T84C_CAST_V1', 1),
(19, 'TEG_CMOSF8_W_V1', 1),
(20, 'TEG_CMOSF8_OPVG_T02_V1', 1),
(21, 'TEG_CMOSF8_OPVG_T01_V1', 1),
(22, 'TEG_CMOSF8_OPVG_SALI_V1', 1),
(23, 'TEG_CMOSF8_OPVG_HV1B_V1', 1),
(24, 'TEG_SOI250_4M_A1_1N_V1', 1),
(25, 'TEG_SOI250_4M_A1_1P_V1', 1),
(26, 'TEG_SOI250_4M_A1_2N_V1', 1),
(27, 'TEG_SOI250_4M_A1_2P_V1', 1),
(28, 'TEG_SOI250_4M_CAP1_V1', 1),
(29, 'TEG_SOI250_4M_CAP2_V1', 1),
(30, 'TEG_SOI250_4M_CAP3_V1', 1),
(31, 'TEG_SOI250_4M_CAP4_V1', 1),
(32, 'TEG_SOI250_4M_CAP5_V1', 1),
(33, 'TEG_SOI250_4M_CAP6_V1', 1),
(34, 'TEG_SOI250_4M_DIODE1_V1', 1),
(35, 'TEG_SOI250_4M_DIODE2_V1', 1),
(36, 'TEG_SOI250_4M_DIODE3_V1', 1),
(37, 'TEG_SOI250_4M_DIODE4_V1', 1),
(38, 'TEG_SOI250_4M_DIODE5_V1', 1),
(39, 'TEG_SOI250_4M_GEN_024_V1', 1),
(40, 'TEG_SOI250_4M_H_1N_V1', 1),
(41, 'TEG_SOI250_4M_H_1P_V1', 1),
(42, 'TEG_SOI250_4M_H_2N_V1', 1),
(43, 'TEG_SOI250_4M_H_2P_V1', 1),
(44, 'TEG_SOI250_4M_NMOS_BW_V1', 1),
(45, 'TEG_SOI250_4M_NMOS_IO_V1', 1),
(46, 'TEG_SOI250_4M_PMOS_BW_V1', 1),
(47, 'TEG_SOI250_4M_PMOS_IO_V1', 1),
(48, 'TEG_SOI250_4M_RES1_V1', 1),
(49, 'TEG_SOI250_4M_RES2_V1', 1),
(50, 'TEG_SOI250_4M_RES3_V1', 1),
(51, 'TEG_SOI250_4M_RES4_V1', 1),
(52, 'TEG_SOI250_4M_RES5_V1', 1),
(53, 'TEG_SOI250_4M_RES6_V1', 1),
(54, 'TEG_SOI250_4M_RES7_V1', 1),
(55, 'TEG_SOI250_4M_RES8_V1', 1),
(56, 'TEG_SOI250_4M_RES9_V1', 1),
(57, 'TEG_SOI250_4M_RES10_V1', 1),
(58, 'TEG_SOI250_4M_RES11_V1', 1),
(59, 'TEG_SOI250_4M_RES12_V1', 1),
(60, 'TEG_SOI250_4M_RES13_V1', 1),
(61, 'TEG_SOI250_4M_RES14_V1', 1),
(62, 'TEG_SOI250_4M_RES15_V1', 1),
(63, 'TEG_SOI250_4M_SBMOS_024_V1', 1),
(64, 'TEG_SOI250_4M_W_V1', 1),
(65, 'TEG_HCMOS8D_3P3V_A_V1', 1),
(66, 'TEG_HCMOS8D_3P3V_B_V1', 1),
(67, 'TEG_HCMOS8D_3P3V_C_V1', 1),
(68, 'TEG_HCMOS8D_3P3V_D_V1', 1),
(69, 'TEG_HCMOS8D_3P3V_E_V1', 1),
(70, 'TEG_HCMOS8D_3P3V_F_V1', 1),
(71, 'TEG_HCMOS8D_3P3V_G_V1', 1),
(72, 'TEG_HCMOS8D_3P3V_H_V1', 1),
(73, 'TEG_HCMOS8D_3P3V_HIPO1_V1', 1),
(74, 'TEG_HCMOS8D_3P3V_HIPO2_V1', 1),
(75, 'TEG_HCMOS8D_3P3V_HIPO3_V1', 1),
(76, 'TEG_HCMOS8D_3P3V_HIPO4_V1', 1),
(77, 'TEG_HCMOS8D_3P3V_HIPO5_V1', 1),
(78, 'TEG_HCMOS8D_3P3V_HIPO6_V1', 1),
(79, 'TEG_HCMOS8D_3P3V_HIPO7_V1', 1),
(80, 'TEG_HCMOS8D_3P3V_HIPO8_V1', 1),
(81, 'TEG_HCMOS8D_3P3V_HIPO9_V1', 1),
(82, 'TEG_HCMOS8D_3P3V_HKMIM_V1', 1),
(83, 'TEG_HCMOS8D_3P3V_I_V1', 1),
(84, 'TEG_HCMOS8D_3P3V_IL1_V1', 1),
(85, 'TEG_HCMOS8D_3P3V_IL2_V1', 1),
(86, 'TEG_HCMOS8D_3P3V_J_V1', 1),
(87, 'TEG_HCMOS8D_3P3V_K_V1', 1),
(88, 'TEG_HCMOS8D_3P3V_L_V1', 1),
(89, 'TEG_HCMOS8D_3P3V_M_V1', 1),
(90, 'TEG_HCMOS8D_3P3V_MIM_V1', 1),
(91, 'TEG_HCMOS8D_3P3V_N_V1', 1),
(92, 'TEG_HCMOS8D_3P3V_O_V1', 1),
(93, 'TEG_HCMOS8D_3P3V_P_V1', 1),
(94, 'TEG_HCMOS8D_3P3V_Q_V1', 1),
(95, 'TEG_HCMOS8D_3P3V_R_V1', 1),
(96, 'TEG_HCMOS8D_3P3V_S_V1', 1),
(97, 'TEG_HCMOS8D_3P3V_V_V1', 1),
(98, 'TEG_HCMOS8D_3P3V_W_V1', 1),
(99, 'TEG_HCMOS8D_3P3V_X_V1', 1),
(100, 'TEG_HCMOS8D_3P3V_Y_V1', 1),
(101, 'TEG_HCMOS8D_A1_5V_V1', 1),
(102, 'TEG_HCMOS8D_A2_5V_V1', 1),
(103, 'TEG_HCMOS8D_A3_5V_V1', 1),
(104, 'TEG_HCMOS8D_A4_5V_V1', 1),
(105, 'TEG_HCMOS8D_A5_5V_V1', 1),
(106, 'TEG_HCMOS8D_B1_5V_V1', 1),
(107, 'TEG_HCMOS8D_B2_5V_V1', 1),
(108, 'TEG_HCMOS8D_B3_5V_V1', 1),
(109, 'TEG_HCMOS8D_B4_5V_V1', 1),
(110, 'TEG_HCMOS8D_B5_5V_V1', 1),
(111, 'TEG_HCMOS8D_C1_5V_V1', 1),
(112, 'TEG_HCMOS8D_C2_5V_V1', 1),
(113, 'TEG_HCMOS8D_C3_5V_V1', 1),
(114, 'TEG_HCMOS8D_C4_5V_V1', 1),
(115, 'TEG_HCMOS8D_CAP1_5V_V1', 1),
(116, 'TEG_HCMOS8D_CAP2_5V_V1', 1),
(117, 'TEG_HCMOS8D_CAP3_5V_V1', 1),
(118, 'TEG_HCMOS8D_CS_OTP1_5V_V1', 1),
(119, 'TEG_HCMOS8D_D1_5V_V1', 1),
(120, 'TEG_HCMOS8D_D2_5V_V1', 1),
(121, 'TEG_HCMOS8D_D3_5V_V1', 1),
(122, 'TEG_HCMOS8D_D4_5V_V1', 1),
(123, 'TEG_HCMOS8D_Diod1_5V_V1', 1),
(124, 'TEG_HCMOS8D_Diod2_5V_V1', 1),
(125, 'TEG_HCMOS8D_E1_5V_V1', 1),
(126, 'TEG_HCMOS8D_E2_5V_V1', 1),
(127, 'TEG_HCMOS8D_E3_5V_V1', 1),
(128, 'TEG_HCMOS8D_E4_5V_V1', 1),
(129, 'TEG_HCMOS8D_F1_5V_V1', 1),
(130, 'TEG_HCMOS8D_F2_5V_V1', 1),
(131, 'TEG_HCMOS8D_F3_5V_V1', 1),
(132, 'TEG_HCMOS8D_F4_5V_V1', 1),
(133, 'TEG_HCMOS8D_G1_5V_V1', 1),
(134, 'TEG_HCMOS8D_G2_5V_V1', 1),
(135, 'TEG_HCMOS8D_G3_5V_V1', 1),
(136, 'TEG_HCMOS8D_G4_5V_V1', 1),
(137, 'TEG_HCMOS8D_KG1_5V_V1', 1),
(138, 'TEG_HCMOS8D_KG2_5V_V1', 1),
(139, 'TEG_HCMOS8D_N5o1_5V_V1', 1),
(140, 'TEG_HCMOS8D_N5o2_5V_V1', 1),
(141, 'TEG_HCMOS8D_N5o3_5V_V1', 1),
(142, 'TEG_HCMOS8D_N5o4_5V_V1', 1),
(143, 'TEG_HCMOS8D_RES1_5V_V1', 1),
(144, 'TEG_HCMOS8D_RES2_5V_V1', 1),
(145, 'TEG_HCMOS8D_TEST1_5V_V1', 1),
(146, 'TEG_HCMOS8D_TEST2_5V_V1', 1),
(147, 'TEG_HCMOS8D_TEST3_5V_V1', 1),
(150, 'TEG_SOI250_6M_A1_1N_V1', 1),
(151, 'TEG_SOI250_6M_A1_1P_V1', 1),
(152, 'TEG_SOI250_6M_CAP2_V1', 1),
(153, 'TEG_SOI250_6M_CAP6_V2', 1),
(154, 'TEG_SOI250_6M_CAP7_V1', 1),
(155, 'TEG_SOI250_6M_DIODE1_V2', 1),
(156, 'TEG_SOI250_6M_DIODE2_V1', 1),
(157, 'TEG_SOI250_6M_DIODE3_V1', 1),
(158, 'TEG_SOI250_6M_DIODE4_V2', 1),
(159, 'TEG_SOI250_6M_DIODE5_V2', 1),
(160, 'TEG_SOI250_6M_H_1N_V1', 1),
(161, 'TEG_SOI250_6M_H_1P_V1', 1),
(162, 'TEG_SOI250_6M_NMOS_BW_V1', 1),
(163, 'TEG_SOI250_6M_PMOS_BW_V1', 1),
(164, 'TEG_SOI250_6M_RES1_V1', 1),
(165, 'TEG_SOI250_6M_RES2_V1', 1),
(166, 'TEG_SOI250_6M_RES3_V1', 1),
(167, 'TEG_SOI250_6M_RES4_V1', 1),
(168, 'TEG_SOI250_6M_RES5_V1', 1),
(169, 'TEG_SOI250_6M_RES6_V2', 1),
(170, 'TEG_SOI250_6M_RES9_V1', 1),
(171, 'TEG_SOI250_6M_RES10_V1', 1),
(172, 'TEG_SOI250_6M_RES11_V1', 1),
(173, 'TEG_SOI250_6M_RES12_V1', 1),
(174, 'TEG_SOI250_6M_RES13_V1', 1),
(175, 'TEG_SOI250_6M_RES14_V1', 1),
(176, 'TEG_SOI250_6M_RES15_V1', 1),
(177, 'TEG_SOI250_6M_RES16_V1', 1),
(178, 'TEG_SOI250_6M_RES17_V1', 1),
(179, 'TEG_SOI250_6M_SBMOS_024_V1', 1),
(180, 'TEG_SOI250_6M_A1_2N_V1', 1),
(181, 'TEG_SOI250_6M_A1_2P_V1', 1),
(182, 'TEG_SOI250_6M_A3_1N_V1', 1),
(183, 'TEG_SOI250_6M_A3_1P_V1', 1),
(184, 'TEG_SOI250_6M_A3_2N_V1', 1),
(185, 'TEG_SOI250_6M_A3_2P_V1', 1),
(186, 'TEG_SOI250_6M_BIP1_V1', 1),
(187, 'TEG_SOI250_6M_BIP2_V1', 1),
(188, 'TEG_SOI250_6M_CAP1_V1', 1),
(189, 'TEG_SOI250_6M_CAP3_V1', 1),
(190, 'TEG_SOI250_6M_CAP4_V1', 1),
(191, 'TEG_SOI250_6M_CAP5_V1', 1),
(192, 'TEG_SOI250_6M_GEN_018_V1', 1),
(193, 'TEG_SOI250_6M_GEN_024_V1', 1),
(194, 'TEG_SOI250_6M_H_2N_V1', 1),
(195, 'TEG_SOI250_6M_H_2P_V1', 1),
(196, 'TEG_SOI250_6M_NMOS_IO_V1', 1),
(197, 'TEG_SOI250_6M_PMOS_IO_V1', 1),
(198, 'TEG_SOI250_6M_RES7_V1', 1),
(199, 'TEG_SOI250_6M_RES8_V1', 1),
(200, 'TEG_SOI250_6M_RES18_V1', 1),
(201, 'TEG_SOI250_6M_RES19_V1', 1),
(202, 'TEG_SOI250_6M_RES20_V1', 1),
(203, 'TEG_SOI250_6M_S_1N_V1', 1),
(204, 'TEG_SOI250_6M_S_1P_V1', 1),
(205, 'TEG_SOI250_6M_S_2N_V1', 1),
(206, 'TEG_SOI250_6M_S_2P_V1', 1),
(207, 'TEG_SOI250_6M_SBMOS_018_V1', 1),
(208, 'TEG_SOI250_6M_SBTR_TN_V1', 1),
(209, 'TEG_SOI250_6M_SBTR_TP_V1', 1),
(210, 'TEG_SOI250_6M_CAP8_V1', 1),
(211, 'TEG_SOI180_CS_1_V2', 1),
(212, 'TEG_SOI180_A_1N_1_8B_V1', 1),
(213, 'TEG_SOI180_A_1N_3_3B_V1', 1),
(214, 'TEG_SOI180_A_1N_5_0B_V1', 1),
(215, 'TEG_SOI180_A_1N_IO_1_8B_V1', 1),
(216, 'TEG_SOI180_A_1N_IO_3_3B_V1', 1),
(217, 'TEG_SOI180_A_1N_IO_5_0B_V1', 1),
(218, 'TEG_SOI180_A_1P_1_8B_V1', 1),
(219, 'TEG_SOI180_A_1P_3_3B_V1', 1),
(220, 'TEG_SOI180_A_1P_5_0B_V1', 1),
(221, 'TEG_SOI180_A_1P_IO_1_8B_V1', 1),
(222, 'TEG_SOI180_A_1P_IO_3_3B_V1', 1),
(223, 'TEG_SOI180_A_1P_IO_5_0B_V1', 1),
(224, 'TEG_SOI180_A_2N_1_8B_V1', 1),
(225, 'TEG_SOI180_A_2N_3_3B_V1', 1),
(226, 'TEG_SOI180_A_2N_5_0B_V1', 1),
(227, 'TEG_SOI180_A_2N_IO_1_8B_V1', 1),
(228, 'TEG_SOI180_A_2N_IO_3_3B_V1', 1),
(229, 'TEG_SOI180_A_2N_IO_5_0B_V1', 1),
(230, 'TEG_SOI180_A_2P_1_8B_V1', 1),
(231, 'TEG_SOI180_A_2P_3_3B_V1', 1),
(232, 'TEG_SOI180_A_2P_5_0B_V1', 1),
(233, 'TEG_SOI180_A_2P_IO_1_8B_V1', 1),
(234, 'TEG_SOI180_A_2P_IO_3_3B_V1', 1),
(235, 'TEG_SOI180_A_2P_IO_5_0B_V1', 1),
(236, 'TEG_SOI180_A_N_ESD_1_8B_V1', 1),
(237, 'TEG_SOI180_A_N_ESD_3_3B_V1', 1),
(238, 'TEG_SOI180_A_N_ESD_5_0B_V1', 1),
(239, 'TEG_SOI180_BIP1_V1', 1),
(240, 'TEG_SOI180_BIP2_V1', 1),
(241, 'TEG_SOI180_BIP3_V1', 1),
(242, 'TEG_SOI180_BIP4_V1', 1),
(243, 'TEG_SOI180_BIP5_V1', 1),
(244, 'TEG_SOI180_BIP6_V1', 1),
(245, 'TEG_SOI180_C1_V1', 1),
(246, 'TEG_SOI180_C2_V1', 1),
(247, 'TEG_SOI180_C3_V1', 1),
(248, 'TEG_SOI180_C4_V1', 1),
(249, 'TEG_SOI180_C5_V1', 1),
(250, 'TEG_SOI180_C6_V1', 1),
(251, 'TEG_SOI180_C7_V1', 1),
(252, 'TEG_SOI180_D1_V1', 1),
(253, 'TEG_SOI180_D2_V1', 1),
(254, 'TEG_SOI180_D3_V1', 1),
(255, 'TEG_SOI180_D4_V1', 1),
(256, 'TEG_SOI180_D5_V1', 1),
(257, 'TEG_SOI180_D6_V1', 1),
(258, 'TEG_SOI180_D7_V1', 1),
(259, 'TEG_SOI180_D8_V1', 1),
(260, 'TEG_SOI180_D9_V1', 1),
(261, 'TEG_SOI180_H_1N_1_8B_V1', 1),
(262, 'TEG_SOI180_H_1N_3_3B_V1', 1),
(263, 'TEG_SOI180_H_1N_5_0B_V1', 1),
(264, 'TEG_SOI180_H_1P_1_8B_V1', 1),
(265, 'TEG_SOI180_H_1P_3_3B_V1', 1),
(266, 'TEG_SOI180_H_1P_5_0B_V1', 1),
(267, 'TEG_SOI180_H_2N_1_8B_V1', 1),
(268, 'TEG_SOI180_H_2N_3_3B_V1', 1),
(269, 'TEG_SOI180_H_2N_5_0B_V1', 1),
(270, 'TEG_SOI180_H_2P_1_8B_V1', 1),
(271, 'TEG_SOI180_H_2P_3_3B_V1', 1),
(272, 'TEG_SOI180_H_2P_5_0B_V1', 1),
(273, 'TEG_SOI180_OTP_V1', 1),
(274, 'TEG_SOI180_RES1_V1', 1),
(275, 'TEG_SOI180_RES2_V1', 1),
(276, 'TEG_SOI180_RES3_V1', 1),
(277, 'TEG_SOI180_RES4_V1', 1),
(278, 'TEG_SOI180_RES5_V1', 1),
(279, 'TEG_SOI180_RES6_V1', 1),
(280, 'TEG_SOI180_RES_H1_V1', 1),
(281, 'TEG_SOI180_RES_H2_V1', 1),
(282, 'TEG_SOI180_RES_H3_V1', 1),
(283, 'TEG_SOI180_RES_M1_V1', 1),
(284, 'TEG_SOI180_RES_M2_V1', 1),
(285, 'TEG_SOI180_RES_M3_V1', 1),
(286, 'TEG_SOI180_RES_M4_V1', 1),
(287, 'TEG_SOI180_RES_M5_V1', 1),
(288, 'TEG_SOI180_RES_M6_V1', 1),
(289, 'TEG_SOI180_RES_M7_V1', 1),
(290, 'TEG_SOI180_RES_W_V1', 1),
(291, 'TEG_SOI180_SB_IL_V1', 1),
(292, 'TEG_SOI180_SB_KG_V1', 1),
(293, 'TEG_SOI180_SB_TR_N_A_V1', 1),
(294, 'TEG_SOI180_SB_TR_N_H_V1', 1),
(295, 'TEG_SOI180_SB_TR_P_A_V1', 1),
(296, 'TEG_SOI180_SB_TR_P_H_V1', 1),
(297, 'TEG_SOI180_SEP_PLT_V1', 1),
(298, 'TEG_SOI180_tr_priv_n_1v8_V1', 1),
(299, 'TEG_SOI180_tr_priv_n_3v_V1', 1),
(300, 'TEG_SOI180_tr_priv_n_5v_V1', 1),
(301, 'TEG_SOI180_tr_priv_p_1v8_V1', 1),
(302, 'TEG_SOI180_tr_priv_p_3v_V1', 1),
(303, 'TEG_SOI180_tr_priv_p_5v_V1', 1),
(304, 'CM90_CROL22P_PCS01_C_DUMMIES', 1),
(305, 'CM90_CROL22P_PCS02_C_DUMMIES', 1),
(306, 'CM90_CROL22P_PCS03_C_DUMMIES', 1),
(307, 'CM90_CROL22P_PCS04_C_DUMMIES', 1),
(308, 'CM90_CROL22P_PCS07_C_DUMMIES', 1),
(309, 'CM90_CROL22P_PCS08_C_DUMMIES', 1),
(310, 'CM90_CROL22P_PCS14_C_DUMMIES', 1),
(311, 'CM90_CROL22P_PCS15_C_DUMMIES', 1),
(312, 'CM90_CROL22P_PCS16_D_DUMMIES', 1),
(313, 'CM90_CROL22P_PCS17_C_DUMMIES', 1),
(314, 'CM90_CROL22P_PCS18_C_DUMMIES', 1),
(315, 'CM90_CROL22P_PCS20_D_DUMMIES', 1),
(316, 'CM90_CROL22P_PCS21_D_DUMMIES', 1),
(317, 'CM90_CROL22P_PCS22_D_DUMMIES', 1),
(318, 'CM90_CROL22P_PCS25_E_DUMMIES', 1),
(319, 'CM90_CROL22P_PCS26_D_DUMMIES', 1),
(320, 'CM90_CROL22P_PCS28_C_DUMMIES', 1),
(321, 'CM90_CROL22P_PCS29_D_DUMMIES', 1),
(322, 'CM90_CROL22P_PCS30_E_DUMMIES', 1),
(323, 'CM90_CROL22P_PCS40_B_DUMMIES', 1),
(324, 'CM90_CROL22P_PCS43_B_DUMMIES', 1),
(325, 'CM90_CROL22P_PCS44_C_DUMMIES', 1),
(326, 'CM90_CROL22P_PCS46_B_DUMMIES', 1),
(327, 'CM90_CROL22P_PCS50_B_DUMMIES', 1),
(328, 'CM90_CROL22P_PCS52_C_DUMMIES', 1),
(329, 'CM90_CROL22P_PCS53_C_DUMMIES', 1),
(330, 'CM90_CROL22P_PCS54_E_DUMMIES', 1),
(331, 'CM90_CROL22P_PCS60_C_DUMMIES', 1),
(332, 'CM90_CROL22P_PCS61_A_DUMMIES', 1),
(333, 'CM90_CROL22P_PCS62_A_DUMMIES', 1),
(334, 'CM90_CROL22P_PCS63_B_DUMMIES', 1),
(335, 'CM90_CROL22P_W_D_DUMMIES', 1),
(338, 'CAP_L_012', 1),
(339, 'RF_PFO', 1),
(340, 'RO', 1),
(341, 'SBORKA_dop1', 1),
(342, 'SB_ANT_kor', 1),
(343, 'SB_CAP_H', 1),
(344, 'SB_MM_012', 1),
(345, 'SB_REZ_012', 1),
(346, 'SB_TP_CAP', 1),
(347, 'SB_TR_ANT', 1),
(348, 'SB_TR_N_mod_new012', 1),
(349, 'SB_TR_Ntype_kor', 1),
(350, 'SB_TR_P_h2_new012', 1),
(351, 'SB_TR_Ptype_kor', 1),
(352, 'SB_T_AL', 1),
(353, 'SB_T_AL_IO', 1),
(354, 'SB_ob_012', 1),
(355, 'T_AL_11', 1),
(356, 'T_AL_12', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `teg::cell_baseroute_r`
--

CREATE TABLE `teg::cell_baseroute_r` (
  `Id` int(11) NOT NULL,
  `CellId` int(11) NOT NULL,
  `BaseRouteId` int(11) NOT NULL,
  `Mandatory` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `teg::cell_baseroute_r`
--

INSERT INTO `teg::cell_baseroute_r` (`Id`, `CellId`, `BaseRouteId`, `Mandatory`) VALUES
(33, 1, 9, 1),
(34, 1, 10, 1),
(35, 1, 17, 1),
(36, 2, 9, 1),
(37, 2, 10, 1),
(38, 2, 17, 1),
(39, 3, 9, 1),
(40, 3, 10, 1),
(41, 3, 17, 1),
(42, 4, 9, 1),
(43, 4, 10, 1),
(44, 4, 17, 1),
(45, 5, 9, 1),
(46, 5, 10, 1),
(47, 5, 17, 1),
(48, 6, 9, 1),
(49, 6, 10, 1),
(50, 6, 17, 1),
(51, 7, 9, 1),
(52, 7, 10, 1),
(53, 7, 17, 1),
(54, 8, 9, 1),
(55, 8, 10, 1),
(56, 8, 17, 1),
(57, 9, 9, 1),
(58, 9, 10, 1),
(59, 9, 17, 1),
(60, 10, 9, 1),
(61, 10, 10, 1),
(62, 10, 17, 1),
(63, 11, 9, 1),
(64, 11, 10, 1),
(65, 11, 17, 1),
(66, 12, 9, 1),
(67, 12, 10, 1),
(68, 12, 17, 1),
(69, 13, 9, 1),
(70, 13, 10, 1),
(71, 13, 17, 1),
(72, 14, 9, 1),
(73, 14, 10, 1),
(74, 14, 17, 1),
(75, 15, 9, 1),
(76, 15, 10, 1),
(77, 15, 17, 1),
(78, 16, 9, 1),
(79, 16, 10, 1),
(80, 16, 17, 1),
(81, 17, 9, 1),
(82, 17, 10, 1),
(83, 17, 17, 1),
(84, 18, 9, 1),
(85, 18, 10, 1),
(86, 18, 17, 1),
(87, 19, 9, 1),
(88, 19, 10, 1),
(89, 19, 17, 1),
(90, 23, 9, 1),
(91, 23, 10, 1),
(92, 23, 17, 1),
(93, 22, 9, 1),
(94, 22, 10, 1),
(95, 22, 17, 1),
(96, 21, 9, 1),
(97, 21, 10, 1),
(98, 21, 17, 1),
(99, 20, 9, 1),
(100, 20, 10, 1),
(101, 20, 17, 1),
(102, 24, 1, 1),
(103, 25, 1, 1),
(104, 26, 1, 0),
(105, 27, 1, 0),
(106, 28, 1, 0),
(107, 29, 1, 1),
(108, 30, 1, 0),
(109, 31, 1, 0),
(110, 32, 1, 0),
(111, 33, 1, 1),
(112, 34, 1, 1),
(113, 35, 1, 1),
(114, 36, 1, 1),
(115, 37, 1, 1),
(116, 38, 1, 1),
(117, 39, 1, 0),
(118, 40, 1, 1),
(119, 41, 1, 1),
(120, 42, 1, 0),
(121, 43, 1, 0),
(122, 44, 1, 1),
(123, 45, 1, 0),
(124, 46, 1, 1),
(125, 47, 1, 0),
(126, 48, 1, 1),
(127, 49, 1, 1),
(128, 50, 1, 1),
(129, 51, 1, 1),
(130, 52, 1, 1),
(131, 53, 1, 1),
(132, 54, 1, 0),
(133, 55, 1, 1),
(134, 56, 1, 1),
(135, 57, 1, 1),
(136, 58, 1, 1),
(137, 59, 1, 1),
(138, 60, 1, 1),
(139, 61, 1, 0),
(140, 62, 1, 0),
(141, 63, 1, 1),
(142, 64, 1, 1),
(143, 65, 6, 1),
(144, 65, 7, 1),
(145, 65, 16, 1),
(146, 66, 6, 1),
(147, 66, 7, 1),
(148, 66, 16, 1),
(149, 67, 6, 1),
(150, 67, 7, 1),
(151, 67, 16, 1),
(152, 68, 6, 1),
(153, 68, 7, 1),
(154, 68, 16, 1),
(155, 69, 6, 1),
(156, 69, 7, 1),
(157, 69, 16, 1),
(158, 70, 6, 1),
(159, 70, 7, 1),
(160, 70, 16, 1),
(161, 71, 6, 1),
(162, 71, 7, 1),
(163, 71, 16, 1),
(164, 72, 6, 1),
(165, 72, 7, 1),
(166, 72, 16, 1),
(167, 73, 6, 1),
(168, 73, 7, 1),
(169, 73, 16, 1),
(170, 74, 6, 1),
(171, 74, 7, 1),
(172, 74, 16, 1),
(173, 75, 6, 1),
(174, 75, 7, 1),
(175, 75, 16, 1),
(176, 76, 6, 1),
(177, 76, 7, 1),
(178, 76, 16, 1),
(179, 77, 6, 1),
(180, 77, 7, 1),
(181, 77, 16, 1),
(182, 78, 6, 1),
(183, 78, 7, 1),
(184, 78, 16, 1),
(185, 79, 6, 1),
(186, 79, 7, 1),
(187, 79, 16, 1),
(188, 80, 6, 1),
(189, 80, 7, 1),
(190, 80, 16, 1),
(191, 81, 6, 1),
(192, 81, 7, 1),
(193, 81, 16, 1),
(194, 82, 6, 1),
(195, 82, 7, 1),
(196, 82, 16, 1),
(197, 83, 6, 1),
(198, 83, 7, 1),
(199, 83, 16, 1),
(200, 84, 6, 1),
(201, 84, 7, 1),
(202, 84, 16, 1),
(203, 85, 6, 1),
(204, 85, 7, 1),
(205, 85, 16, 1),
(206, 86, 6, 1),
(207, 86, 7, 1),
(208, 86, 16, 1),
(209, 87, 6, 1),
(210, 87, 7, 1),
(211, 87, 16, 1),
(212, 88, 6, 1),
(213, 88, 7, 1),
(214, 88, 16, 1),
(215, 89, 6, 1),
(216, 89, 7, 1),
(217, 89, 16, 1),
(218, 90, 6, 1),
(219, 90, 7, 1),
(220, 90, 16, 1),
(221, 91, 6, 1),
(222, 91, 7, 1),
(223, 91, 16, 1),
(224, 92, 6, 1),
(225, 92, 7, 1),
(226, 92, 16, 1),
(227, 93, 6, 1),
(228, 93, 7, 1),
(229, 93, 16, 1),
(230, 94, 6, 1),
(231, 94, 7, 1),
(232, 94, 16, 1),
(233, 95, 6, 1),
(234, 95, 7, 1),
(235, 95, 16, 1),
(236, 96, 6, 1),
(237, 96, 7, 1),
(238, 96, 16, 1),
(239, 97, 6, 1),
(240, 97, 7, 1),
(241, 97, 16, 1),
(242, 98, 6, 1),
(243, 98, 7, 1),
(244, 98, 16, 1),
(245, 99, 6, 1),
(246, 99, 7, 1),
(247, 99, 16, 1),
(248, 100, 6, 1),
(249, 100, 7, 1),
(250, 100, 16, 1),
(347, 150, 2, 1),
(348, 151, 2, 1),
(349, 152, 2, 1),
(350, 153, 2, 1),
(351, 154, 2, 1),
(352, 155, 2, 1),
(353, 156, 2, 1),
(354, 157, 2, 1),
(355, 158, 2, 0),
(356, 159, 2, 1),
(357, 160, 2, 1),
(358, 161, 2, 1),
(359, 162, 2, 1),
(360, 163, 2, 1),
(361, 164, 2, 1),
(362, 165, 2, 1),
(363, 166, 2, 1),
(364, 167, 2, 1),
(365, 168, 2, 1),
(366, 169, 2, 1),
(367, 170, 2, 1),
(368, 171, 2, 1),
(369, 172, 2, 1),
(370, 173, 2, 1),
(371, 174, 2, 1),
(372, 175, 2, 0),
(373, 176, 2, 0),
(374, 177, 2, 1),
(375, 178, 2, 1),
(376, 179, 2, 1),
(377, 180, 2, 0),
(378, 181, 2, 0),
(379, 182, 2, 0),
(380, 183, 2, 0),
(381, 184, 2, 0),
(382, 185, 2, 0),
(383, 186, 2, 0),
(384, 187, 2, 0),
(385, 188, 2, 0),
(386, 189, 2, 0),
(387, 190, 2, 0),
(388, 191, 2, 0),
(389, 192, 2, 0),
(390, 193, 2, 0),
(391, 194, 2, 0),
(392, 195, 2, 0),
(393, 196, 2, 0),
(394, 197, 2, 0),
(395, 198, 2, 0),
(396, 199, 2, 0),
(397, 200, 2, 1),
(398, 201, 2, 1),
(399, 202, 2, 0),
(400, 203, 2, 0),
(401, 204, 2, 0),
(402, 205, 2, 0),
(403, 206, 2, 0),
(404, 207, 2, 0),
(405, 208, 2, 0),
(406, 209, 2, 0),
(407, 210, 2, 1),
(408, 212, 3, 1),
(409, 212, 4, 1),
(410, 212, 5, 1),
(411, 213, 3, 0),
(412, 213, 4, 1),
(413, 213, 5, 0),
(414, 214, 3, 0),
(415, 214, 4, 0),
(416, 214, 5, 1),
(417, 215, 3, 1),
(418, 215, 4, 1),
(419, 215, 5, 1),
(420, 216, 3, 0),
(421, 216, 4, 1),
(422, 216, 5, 0),
(423, 217, 3, 0),
(424, 217, 4, 0),
(425, 217, 5, 1),
(426, 218, 3, 1),
(427, 218, 4, 1),
(428, 218, 5, 1),
(429, 219, 3, 0),
(430, 219, 4, 1),
(431, 219, 5, 0),
(432, 220, 3, 0),
(433, 220, 4, 0),
(434, 220, 5, 1),
(435, 221, 3, 1),
(436, 221, 4, 1),
(437, 221, 5, 1),
(438, 222, 3, 0),
(439, 222, 4, 1),
(440, 222, 5, 0),
(441, 223, 3, 0),
(442, 223, 4, 0),
(443, 223, 5, 1),
(444, 224, 3, 1),
(445, 224, 4, 1),
(446, 224, 5, 1),
(447, 225, 3, 0),
(448, 225, 4, 1),
(449, 225, 5, 0),
(450, 226, 3, 0),
(451, 226, 4, 0),
(452, 226, 5, 1),
(453, 227, 3, 1),
(454, 227, 4, 1),
(455, 227, 5, 1),
(456, 228, 3, 0),
(457, 228, 4, 1),
(458, 228, 5, 0),
(459, 229, 3, 0),
(460, 229, 4, 0),
(461, 229, 5, 1),
(462, 230, 3, 1),
(463, 230, 4, 1),
(464, 230, 5, 1),
(465, 231, 3, 0),
(466, 231, 4, 1),
(467, 231, 5, 0),
(468, 232, 3, 0),
(469, 232, 4, 0),
(470, 232, 5, 1),
(471, 233, 3, 1),
(472, 233, 4, 1),
(473, 233, 5, 1),
(474, 234, 3, 0),
(475, 234, 4, 1),
(476, 234, 5, 0),
(477, 235, 3, 0),
(478, 235, 4, 0),
(479, 235, 5, 1),
(480, 236, 3, 1),
(481, 236, 4, 1),
(482, 236, 5, 1),
(483, 237, 3, 0),
(484, 237, 4, 1),
(485, 237, 5, 0),
(486, 238, 3, 0),
(487, 238, 4, 0),
(488, 238, 5, 1),
(489, 239, 3, 0),
(490, 239, 4, 0),
(491, 239, 5, 0),
(492, 240, 3, 0),
(493, 240, 4, 0),
(494, 240, 5, 0),
(495, 241, 3, 0),
(496, 241, 4, 0),
(497, 241, 5, 0),
(498, 242, 3, 0),
(499, 242, 4, 0),
(500, 242, 5, 0),
(501, 243, 3, 0),
(502, 243, 4, 0),
(503, 243, 5, 0),
(504, 244, 3, 0),
(505, 244, 4, 0),
(506, 244, 5, 0),
(507, 245, 3, 0),
(508, 245, 4, 0),
(509, 245, 5, 0),
(510, 246, 3, 0),
(511, 246, 4, 0),
(512, 246, 5, 0),
(513, 247, 3, 0),
(514, 247, 4, 0),
(515, 247, 5, 0),
(516, 248, 3, 0),
(517, 248, 4, 0),
(518, 248, 5, 0),
(519, 249, 3, 0),
(520, 249, 4, 0),
(521, 249, 5, 0),
(522, 250, 3, 1),
(523, 250, 4, 1),
(524, 250, 5, 1),
(525, 251, 3, 1),
(526, 251, 4, 1),
(527, 251, 5, 1),
(528, 252, 3, 1),
(529, 252, 4, 1),
(530, 252, 5, 1),
(531, 253, 3, 1),
(532, 253, 4, 1),
(533, 253, 5, 1),
(534, 254, 3, 1),
(535, 254, 4, 1),
(536, 254, 5, 1),
(537, 255, 3, 1),
(538, 255, 4, 1),
(539, 255, 5, 1),
(540, 256, 3, 1),
(541, 256, 4, 1),
(542, 256, 5, 1),
(543, 257, 3, 1),
(544, 257, 4, 1),
(545, 257, 5, 1),
(546, 258, 3, 1),
(547, 258, 4, 1),
(548, 258, 5, 1),
(549, 259, 3, 1),
(550, 259, 4, 1),
(551, 259, 5, 1),
(552, 260, 3, 1),
(553, 260, 4, 1),
(554, 260, 5, 1),
(555, 261, 3, 1),
(556, 261, 4, 1),
(557, 261, 5, 1),
(558, 262, 3, 0),
(559, 262, 4, 1),
(560, 262, 5, 0),
(561, 263, 3, 0),
(562, 263, 4, 0),
(563, 263, 5, 1),
(564, 264, 3, 1),
(565, 264, 4, 1),
(566, 264, 5, 1),
(567, 265, 3, 0),
(568, 265, 4, 1),
(569, 265, 5, 0),
(570, 266, 3, 0),
(571, 266, 4, 0),
(572, 266, 5, 1),
(573, 267, 3, 1),
(574, 267, 4, 1),
(575, 267, 5, 1),
(576, 268, 3, 0),
(577, 268, 4, 1),
(578, 268, 5, 0),
(579, 269, 3, 0),
(580, 269, 4, 0),
(581, 269, 5, 1),
(582, 270, 3, 1),
(583, 270, 4, 1),
(584, 270, 5, 1),
(585, 271, 3, 0),
(586, 271, 4, 1),
(587, 271, 5, 0),
(588, 272, 3, 0),
(589, 272, 4, 0),
(590, 272, 5, 1),
(591, 273, 3, 0),
(592, 273, 4, 0),
(593, 273, 5, 0),
(594, 274, 3, 1),
(595, 274, 4, 1),
(596, 274, 5, 1),
(597, 275, 3, 1),
(598, 275, 4, 1),
(599, 275, 5, 1),
(600, 276, 3, 1),
(601, 276, 4, 1),
(602, 276, 5, 1),
(603, 277, 3, 1),
(604, 277, 4, 1),
(605, 277, 5, 1),
(606, 278, 3, 1),
(607, 278, 4, 1),
(608, 278, 5, 1),
(609, 279, 3, 1),
(610, 279, 4, 1),
(611, 279, 5, 1),
(612, 280, 3, 0),
(613, 280, 4, 0),
(614, 280, 5, 0),
(615, 281, 3, 0),
(616, 281, 4, 0),
(617, 281, 5, 0),
(618, 282, 3, 0),
(619, 282, 4, 0),
(620, 282, 5, 0),
(621, 283, 3, 1),
(622, 283, 4, 1),
(623, 283, 5, 1),
(624, 284, 3, 0),
(625, 284, 4, 0),
(626, 284, 5, 0),
(627, 285, 3, 0),
(628, 285, 4, 0),
(629, 285, 5, 0),
(630, 286, 3, 0),
(631, 286, 4, 0),
(632, 286, 5, 0),
(633, 287, 3, 0),
(634, 287, 4, 0),
(635, 287, 5, 0),
(636, 288, 3, 1),
(637, 288, 4, 1),
(638, 288, 5, 1),
(639, 289, 3, 0),
(640, 289, 4, 0),
(641, 289, 5, 0),
(642, 290, 3, 0),
(643, 290, 4, 0),
(644, 290, 5, 0),
(645, 291, 3, 1),
(646, 291, 4, 1),
(647, 291, 5, 1),
(648, 292, 3, 0),
(649, 292, 4, 0),
(650, 292, 5, 0),
(651, 293, 3, 1),
(652, 293, 4, 1),
(653, 293, 5, 1),
(654, 294, 3, 1),
(655, 294, 4, 1),
(656, 294, 5, 1),
(657, 295, 3, 1),
(658, 295, 4, 1),
(659, 295, 5, 1),
(660, 296, 3, 1),
(661, 296, 4, 1),
(662, 296, 5, 1),
(663, 297, 3, 0),
(664, 297, 4, 0),
(665, 297, 5, 0),
(666, 298, 3, 0),
(667, 298, 4, 0),
(668, 298, 5, 0),
(669, 299, 3, 0),
(670, 299, 4, 0),
(671, 299, 5, 0),
(672, 300, 3, 0),
(673, 300, 4, 0),
(674, 300, 5, 0),
(675, 301, 3, 0),
(676, 301, 4, 0),
(677, 301, 5, 0),
(678, 302, 3, 0),
(679, 302, 4, 0),
(680, 302, 5, 0),
(681, 303, 3, 0),
(682, 303, 4, 0),
(683, 303, 5, 0),
(684, 211, 3, 0),
(686, 211, 5, 0),
(687, 101, 7, 1),
(688, 102, 7, 1),
(689, 103, 7, 1),
(690, 104, 7, 1),
(691, 105, 7, 1),
(692, 106, 7, 1),
(693, 107, 7, 1),
(694, 108, 7, 1),
(695, 109, 7, 1),
(696, 110, 7, 1),
(697, 111, 7, 1),
(698, 112, 7, 1),
(699, 113, 7, 1),
(700, 114, 7, 1),
(701, 115, 7, 1),
(702, 116, 7, 1),
(703, 117, 7, 1),
(704, 118, 7, 1),
(705, 119, 7, 1),
(706, 120, 7, 1),
(707, 121, 7, 1),
(708, 122, 7, 1),
(709, 123, 7, 1),
(710, 124, 7, 1),
(711, 125, 7, 1),
(712, 126, 7, 1),
(713, 127, 7, 1),
(714, 128, 7, 1),
(715, 129, 7, 1),
(716, 130, 7, 1),
(717, 131, 7, 1),
(718, 132, 7, 1),
(719, 133, 7, 1),
(720, 134, 7, 1),
(721, 135, 7, 1),
(722, 136, 7, 1),
(723, 137, 7, 1),
(724, 138, 7, 1),
(725, 139, 7, 1),
(726, 140, 7, 1),
(727, 141, 7, 1),
(728, 142, 7, 1),
(729, 143, 7, 1),
(730, 144, 7, 1),
(731, 145, 7, 1),
(732, 146, 7, 1),
(733, 147, 7, 1),
(734, 304, 11, 1),
(735, 304, 22, 1),
(736, 305, 11, 1),
(737, 305, 22, 1),
(738, 306, 11, 1),
(739, 306, 22, 1),
(740, 307, 11, 1),
(741, 307, 22, 1),
(742, 308, 11, 1),
(743, 308, 22, 1),
(744, 309, 11, 1),
(745, 309, 22, 1),
(746, 310, 11, 1),
(747, 310, 22, 1),
(748, 311, 11, 1),
(749, 311, 22, 1),
(750, 312, 11, 1),
(751, 312, 22, 1),
(752, 313, 11, 1),
(753, 313, 22, 1),
(754, 314, 11, 1),
(755, 314, 22, 1),
(756, 315, 11, 1),
(757, 315, 22, 1),
(758, 316, 11, 1),
(759, 316, 22, 1),
(760, 317, 11, 1),
(761, 317, 22, 1),
(762, 318, 11, 1),
(763, 318, 22, 1),
(764, 319, 11, 1),
(765, 319, 22, 1),
(766, 320, 11, 1),
(767, 320, 22, 1),
(768, 321, 11, 1),
(769, 321, 22, 1),
(770, 322, 11, 1),
(771, 322, 22, 1),
(772, 323, 11, 1),
(773, 323, 22, 1),
(774, 324, 11, 1),
(775, 324, 22, 1),
(776, 325, 11, 1),
(777, 325, 22, 1),
(778, 326, 11, 1),
(779, 326, 22, 1),
(780, 327, 11, 1),
(781, 327, 22, 1),
(782, 328, 11, 1),
(783, 328, 22, 1),
(784, 329, 11, 1),
(785, 329, 22, 1),
(786, 330, 11, 1),
(787, 330, 22, 1),
(788, 331, 11, 1),
(789, 331, 22, 1),
(790, 332, 11, 1),
(791, 332, 22, 1),
(792, 333, 11, 1),
(793, 333, 22, 1),
(794, 334, 11, 1),
(795, 334, 22, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `teg::cell_option_r`
--

CREATE TABLE `teg::cell_option_r` (
  `Id` int(11) NOT NULL,
  `CellId` int(11) NOT NULL,
  `OptionId` int(11) NOT NULL,
  `Mandatory` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `teg::cell_teg_r`
--

CREATE TABLE `teg::cell_teg_r` (
  `Id` int(11) NOT NULL,
  `CellId` int(11) NOT NULL,
  `TegId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `teg::cell_teg_r`
--

INSERT INTO `teg::cell_teg_r` (`Id`, `CellId`, `TegId`) VALUES
(477, 1, 1),
(500, 1, 3),
(478, 2, 1),
(501, 2, 3),
(479, 3, 1),
(502, 3, 3),
(480, 4, 1),
(503, 4, 3),
(481, 5, 1),
(504, 5, 3),
(482, 6, 1),
(505, 6, 3),
(483, 7, 1),
(506, 7, 3),
(484, 8, 1),
(507, 8, 3),
(485, 9, 1),
(508, 9, 3),
(486, 10, 1),
(509, 10, 3),
(487, 11, 1),
(510, 11, 3),
(488, 12, 1),
(511, 12, 3),
(489, 13, 1),
(512, 13, 3),
(490, 14, 1),
(513, 14, 3),
(491, 15, 1),
(514, 15, 3),
(492, 16, 1),
(515, 16, 3),
(493, 17, 1),
(516, 17, 3),
(494, 18, 1),
(517, 18, 3),
(495, 19, 1),
(518, 19, 3),
(499, 20, 2),
(498, 21, 2),
(497, 22, 2),
(496, 23, 2),
(519, 24, 4),
(520, 25, 4),
(521, 26, 4),
(522, 27, 4),
(523, 28, 4),
(524, 29, 4),
(525, 30, 4),
(526, 31, 4),
(527, 32, 4),
(528, 33, 4),
(529, 34, 4),
(530, 35, 4),
(531, 36, 4),
(532, 37, 4),
(533, 38, 4),
(534, 39, 4),
(535, 40, 4),
(536, 41, 4),
(537, 42, 4),
(538, 43, 4),
(539, 44, 4),
(540, 45, 4),
(541, 46, 4),
(542, 47, 4),
(543, 48, 4),
(544, 49, 4),
(545, 50, 4),
(546, 51, 4),
(547, 52, 4),
(548, 53, 4),
(549, 54, 4),
(550, 55, 4),
(551, 56, 4),
(552, 57, 4),
(553, 58, 4),
(554, 59, 4),
(555, 60, 4),
(556, 61, 4),
(557, 62, 4),
(558, 63, 4),
(559, 64, 4),
(560, 65, 5),
(561, 66, 5),
(562, 67, 5),
(563, 68, 5),
(564, 69, 5),
(565, 70, 5),
(566, 71, 5),
(567, 72, 5),
(568, 73, 5),
(569, 74, 5),
(570, 75, 5),
(571, 76, 5),
(572, 77, 5),
(573, 78, 5),
(574, 79, 5),
(575, 80, 5),
(576, 81, 5),
(577, 82, 5),
(578, 83, 5),
(579, 84, 5),
(580, 85, 5),
(581, 86, 5),
(582, 87, 5),
(583, 88, 5),
(584, 89, 5),
(585, 90, 5),
(586, 91, 5),
(587, 92, 5),
(588, 93, 5),
(589, 94, 5),
(590, 95, 5),
(591, 96, 5),
(592, 97, 5),
(593, 98, 5),
(594, 99, 5),
(595, 100, 5),
(596, 101, 6),
(597, 102, 6),
(598, 103, 6),
(599, 104, 6),
(600, 105, 6),
(601, 106, 6),
(602, 107, 6),
(603, 108, 6),
(604, 109, 6),
(605, 110, 6),
(606, 111, 6),
(607, 112, 6),
(608, 113, 6),
(609, 114, 6),
(610, 115, 6),
(611, 116, 6),
(612, 117, 6),
(613, 118, 6),
(614, 119, 6),
(615, 120, 6),
(616, 121, 6),
(617, 122, 6),
(618, 123, 6),
(619, 124, 6),
(620, 125, 6),
(621, 126, 6),
(622, 127, 6),
(623, 128, 6),
(624, 129, 6),
(625, 130, 6),
(626, 131, 6),
(627, 132, 6),
(628, 133, 6),
(629, 134, 6),
(630, 135, 6),
(631, 136, 6),
(632, 137, 6),
(633, 138, 6),
(634, 139, 6),
(635, 140, 6),
(636, 141, 6),
(637, 142, 6),
(638, 143, 6),
(639, 144, 6),
(640, 145, 6),
(641, 146, 6),
(642, 147, 6),
(645, 150, 8),
(675, 150, 9),
(735, 150, 10),
(765, 150, 11),
(890, 150, 15),
(646, 151, 8),
(676, 151, 9),
(736, 151, 10),
(766, 151, 11),
(891, 151, 15),
(647, 152, 8),
(686, 152, 9),
(737, 152, 10),
(767, 152, 11),
(892, 152, 15),
(648, 153, 8),
(690, 153, 9),
(738, 153, 10),
(768, 153, 11),
(893, 153, 15),
(649, 154, 8),
(691, 154, 9),
(769, 154, 11),
(650, 155, 8),
(692, 155, 9),
(740, 155, 10),
(770, 155, 11),
(895, 155, 15),
(651, 156, 8),
(693, 156, 9),
(741, 156, 10),
(771, 156, 11),
(896, 156, 15),
(652, 157, 8),
(694, 157, 9),
(742, 157, 10),
(772, 157, 11),
(897, 157, 15),
(653, 158, 8),
(695, 158, 9),
(743, 158, 10),
(773, 158, 11),
(898, 158, 15),
(654, 159, 8),
(696, 159, 9),
(744, 159, 10),
(774, 159, 11),
(899, 159, 15),
(655, 160, 8),
(699, 160, 9),
(745, 160, 10),
(775, 160, 11),
(900, 160, 15),
(656, 161, 8),
(700, 161, 9),
(746, 161, 10),
(776, 161, 11),
(901, 161, 15),
(657, 162, 8),
(703, 162, 9),
(747, 162, 10),
(777, 162, 11),
(902, 162, 15),
(658, 163, 8),
(705, 163, 9),
(748, 163, 10),
(778, 163, 11),
(659, 164, 8),
(707, 164, 9),
(749, 164, 10),
(779, 164, 11),
(903, 164, 15),
(660, 165, 8),
(708, 165, 9),
(750, 165, 10),
(780, 165, 11),
(904, 165, 15),
(661, 166, 8),
(709, 166, 9),
(751, 166, 10),
(781, 166, 11),
(905, 166, 15),
(662, 167, 8),
(710, 167, 9),
(752, 167, 10),
(782, 167, 11),
(906, 167, 15),
(663, 168, 8),
(711, 168, 9),
(753, 168, 10),
(783, 168, 11),
(907, 168, 15),
(664, 169, 8),
(712, 169, 9),
(754, 169, 10),
(784, 169, 11),
(908, 169, 15),
(665, 170, 8),
(715, 170, 9),
(755, 170, 10),
(785, 170, 11),
(909, 170, 15),
(666, 171, 8),
(716, 171, 9),
(756, 171, 10),
(786, 171, 11),
(910, 171, 15),
(667, 172, 8),
(717, 172, 9),
(757, 172, 10),
(787, 172, 11),
(911, 172, 15),
(668, 173, 8),
(718, 173, 9),
(758, 173, 10),
(788, 173, 11),
(912, 173, 15),
(669, 174, 8),
(719, 174, 9),
(759, 174, 10),
(789, 174, 11),
(913, 174, 15),
(670, 175, 8),
(720, 175, 9),
(760, 175, 10),
(790, 175, 11),
(914, 175, 15),
(671, 176, 8),
(721, 176, 9),
(761, 176, 10),
(791, 176, 11),
(915, 176, 15),
(672, 177, 8),
(722, 177, 9),
(762, 177, 10),
(792, 177, 11),
(916, 177, 15),
(673, 178, 8),
(723, 178, 9),
(763, 178, 10),
(793, 178, 11),
(917, 178, 15),
(674, 179, 8),
(732, 179, 9),
(764, 179, 10),
(794, 179, 11),
(918, 179, 15),
(677, 180, 9),
(678, 181, 9),
(679, 182, 9),
(680, 183, 9),
(681, 184, 9),
(682, 185, 9),
(683, 186, 9),
(684, 187, 9),
(685, 188, 9),
(687, 189, 9),
(688, 190, 9),
(689, 191, 9),
(697, 192, 9),
(698, 193, 9),
(701, 194, 9),
(702, 195, 9),
(704, 196, 9),
(706, 197, 9),
(713, 198, 9),
(714, 199, 9),
(724, 200, 9),
(795, 200, 12),
(725, 201, 9),
(796, 201, 12),
(726, 202, 9),
(727, 203, 9),
(728, 204, 9),
(729, 205, 9),
(730, 206, 9),
(731, 207, 9),
(733, 208, 9),
(734, 209, 9),
(739, 210, 10),
(894, 210, 15),
(889, 211, 14),
(797, 212, 13),
(798, 213, 13),
(799, 214, 13),
(800, 215, 13),
(801, 216, 13),
(802, 217, 13),
(803, 218, 13),
(804, 219, 13),
(805, 220, 13),
(806, 221, 13),
(807, 222, 13),
(808, 223, 13),
(809, 224, 13),
(810, 225, 13),
(811, 226, 13),
(812, 227, 13),
(813, 228, 13),
(814, 229, 13),
(815, 230, 13),
(816, 231, 13),
(817, 232, 13),
(818, 233, 13),
(819, 234, 13),
(820, 235, 13),
(821, 236, 13),
(822, 237, 13),
(823, 238, 13),
(824, 239, 13),
(825, 240, 13),
(826, 241, 13),
(827, 242, 13),
(828, 243, 13),
(829, 244, 13),
(830, 245, 13),
(831, 246, 13),
(832, 247, 13),
(833, 248, 13),
(834, 249, 13),
(835, 250, 13),
(836, 251, 13),
(837, 252, 13),
(838, 253, 13),
(839, 254, 13),
(840, 255, 13),
(841, 256, 13),
(842, 257, 13),
(843, 258, 13),
(844, 259, 13),
(845, 260, 13),
(846, 261, 13),
(847, 262, 13),
(848, 263, 13),
(849, 264, 13),
(850, 265, 13),
(851, 266, 13),
(852, 267, 13),
(853, 268, 13),
(854, 269, 13),
(855, 270, 13),
(856, 271, 13),
(857, 272, 13),
(858, 273, 13),
(859, 274, 13),
(860, 275, 13),
(861, 276, 13),
(862, 277, 13),
(863, 278, 13),
(864, 279, 13),
(865, 280, 13),
(866, 281, 13),
(867, 282, 13),
(868, 283, 13),
(869, 284, 13),
(870, 285, 13),
(871, 286, 13),
(872, 287, 13),
(873, 288, 13),
(874, 289, 13),
(875, 290, 13),
(876, 291, 13),
(877, 292, 13),
(878, 293, 13),
(879, 294, 13),
(880, 295, 13),
(881, 296, 13),
(882, 297, 13),
(883, 298, 13),
(884, 299, 13),
(885, 300, 13),
(886, 301, 13),
(887, 302, 13),
(888, 303, 13),
(919, 304, 16),
(920, 305, 16),
(921, 306, 16),
(922, 307, 16),
(923, 308, 16),
(924, 309, 16),
(925, 310, 16),
(926, 311, 16),
(927, 312, 16),
(928, 313, 16),
(929, 314, 16),
(930, 315, 16),
(931, 316, 16),
(932, 317, 16),
(933, 318, 16),
(934, 319, 16),
(935, 320, 16),
(936, 321, 16),
(937, 322, 16),
(938, 323, 16),
(939, 324, 16),
(940, 325, 16),
(941, 326, 16),
(942, 327, 16),
(943, 328, 16),
(944, 329, 16),
(945, 330, 16),
(946, 331, 16),
(947, 332, 16),
(948, 333, 16),
(949, 334, 16);

-- --------------------------------------------------------

--
-- Структура таблицы `teg_ui::tz_r`
--

CREATE TABLE `teg_ui::tz_r` (
  `Id` int(11) NOT NULL,
  `TEGId` int(11) NOT NULL,
  `UITZId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `baseroute`
--
ALTER TABLE `baseroute`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `TechnologyId` (`TechnologyId`),
  ADD KEY `RouteStatus` (`RouteStatus`),
  ADD KEY `PDKStatus` (`PDKStatus`),
  ADD KEY `PCGStatus` (`PCGStatus`),
  ADD KEY `FrameLibId` (`FrameLibId`),
  ADD KEY `PDKId` (`PDKId`);

--
-- Индексы таблицы `daemon::script`
--
ALTER TABLE `daemon::script`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Alias` (`Alias`);

--
-- Индексы таблицы `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UploadStatusId` (`UploadStatusId`),
  ADD KEY `PublicationStatusId` (`PublicationStatusId`);

--
-- Индексы таблицы `document::publicationstatus`
--
ALTER TABLE `document::publicationstatus`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `document::uploadstatus`
--
ALTER TABLE `document::uploadstatus`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `frame::lib`
--
ALTER TABLE `frame::lib`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `TechnologyId` (`TechnologyId`);

--
-- Индексы таблицы `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `layer`
--
ALTER TABLE `layer`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `BaseRouteId` (`BaseRouteId`);

--
-- Индексы таблицы `layer::cad`
--
ALTER TABLE `layer::cad`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LayerId` (`LayerId`);

--
-- Индексы таблицы `layer::forbidding`
--
ALTER TABLE `layer::forbidding`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `CadLayerId` (`CadLayerId`);

--
-- Индексы таблицы `layer::intermediate`
--
ALTER TABLE `layer::intermediate`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LayerId` (`LayerId`);

--
-- Индексы таблицы `layer::intermediate_layer::merging_r`
--
ALTER TABLE `layer::intermediate_layer::merging_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`IntermediateLayerId`,`MergingLayerId`),
  ADD KEY `IntermediateLayerId` (`IntermediateLayerId`),
  ADD KEY `MergingLayerId` (`MergingLayerId`);

--
-- Индексы таблицы `layer::mask`
--
ALTER TABLE `layer::mask`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LayerId` (`LayerId`);

--
-- Индексы таблицы `layer::mask_layer::intermediate_r`
--
ALTER TABLE `layer::mask_layer::intermediate_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`MaskLayerId`,`IntermediateLayerId`),
  ADD KEY `MaskLayerId` (`MaskLayerId`),
  ADD KEY `IntermediateLayerId` (`IntermediateLayerId`);

--
-- Индексы таблицы `layer::merging`
--
ALTER TABLE `layer::merging`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `CadLayerId` (`CadLayerId`);

--
-- Индексы таблицы `layer::merging_layer::forbidding_r`
--
ALTER TABLE `layer::merging_layer::forbidding_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`MergingLayerId`,`ForbiddingLayerId`),
  ADD KEY `MergingLayerId` (`MergingLayerId`),
  ADD KEY `ForbiddingLayerId` (`ForbiddingLayerId`);

--
-- Индексы таблицы `layer::suspended`
--
ALTER TABLE `layer::suspended`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `CadLayerId` (`CadLayerId`);

--
-- Индексы таблицы `layer_option_r`
--
ALTER TABLE `layer_option_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`LayerId`,`OptionId`),
  ADD KEY `LayerId` (`LayerId`),
  ADD KEY `OptionId` (`OptionId`);

--
-- Индексы таблицы `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `optioncombination`
--
ALTER TABLE `optioncombination`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `optioncombination_baseroute_r`
--
ALTER TABLE `optioncombination_baseroute_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`OptionCombinationId`,`BaseRouteId`),
  ADD KEY `OptionCombinationId` (`OptionCombinationId`),
  ADD KEY `BaseRouteId` (`BaseRouteId`);

--
-- Индексы таблицы `optioncombination_option_r`
--
ALTER TABLE `optioncombination_option_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`OptionCombinationId`,`OptionId`),
  ADD KEY `OptionCombinationId` (`OptionCombinationId`),
  ADD KEY `OptionId` (`OptionId`);

--
-- Индексы таблицы `pdk`
--
ALTER TABLE `pdk`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `TechnologyId` (`TechnologyId`),
  ADD KEY `StatusId` (`StatusId`),
  ADD KEY `TechnologyId_2` (`TechnologyId`);

--
-- Индексы таблицы `psow`
--
ALTER TABLE `psow`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `BaseRouteId_2` (`BaseRouteId`),
  ADD KEY `BaseRouteId` (`BaseRouteId`);

--
-- Индексы таблицы `psow::line`
--
ALTER TABLE `psow::line`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PSOWId` (`PSOWId`),
  ADD KEY `MaskLayerId` (`MaskLayerId`);

--
-- Индексы таблицы `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `technology`
--
ALTER TABLE `technology`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `teg`
--
ALTER TABLE `teg`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PrimaryCellId` (`PrimaryCellId`);

--
-- Индексы таблицы `teg::cell`
--
ALTER TABLE `teg::cell`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `teg::cell_baseroute_r`
--
ALTER TABLE `teg::cell_baseroute_r`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `TegCellId` (`CellId`),
  ADD KEY `BaseRouteId` (`BaseRouteId`);

--
-- Индексы таблицы `teg::cell_option_r`
--
ALTER TABLE `teg::cell_option_r`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CellId` (`CellId`),
  ADD KEY `OptionId` (`OptionId`);

--
-- Индексы таблицы `teg::cell_teg_r`
--
ALTER TABLE `teg::cell_teg_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `CellId_2` (`CellId`,`TegId`),
  ADD KEY `CellId` (`CellId`),
  ADD KEY `TegId` (`TegId`),
  ADD KEY `CellId_3` (`CellId`),
  ADD KEY `TegId_2` (`TegId`);

--
-- Индексы таблицы `teg_ui::tz_r`
--
ALTER TABLE `teg_ui::tz_r`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `rel_unique` (`TEGId`,`UITZId`),
  ADD KEY `TEGId` (`TEGId`),
  ADD KEY `UITZId` (`UITZId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `baseroute`
--
ALTER TABLE `baseroute`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT для таблицы `daemon::script`
--
ALTER TABLE `daemon::script`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `document`
--
ALTER TABLE `document`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT для таблицы `document::publicationstatus`
--
ALTER TABLE `document::publicationstatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `document::uploadstatus`
--
ALTER TABLE `document::uploadstatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `frame::lib`
--
ALTER TABLE `frame::lib`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT для таблицы `grade`
--
ALTER TABLE `grade`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `layer`
--
ALTER TABLE `layer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1229;
--
-- AUTO_INCREMENT для таблицы `layer::cad`
--
ALTER TABLE `layer::cad`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1139;
--
-- AUTO_INCREMENT для таблицы `layer::forbidding`
--
ALTER TABLE `layer::forbidding`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT для таблицы `layer::intermediate`
--
ALTER TABLE `layer::intermediate`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=732;
--
-- AUTO_INCREMENT для таблицы `layer::intermediate_layer::merging_r`
--
ALTER TABLE `layer::intermediate_layer::merging_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1153;
--
-- AUTO_INCREMENT для таблицы `layer::mask`
--
ALTER TABLE `layer::mask`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=430;
--
-- AUTO_INCREMENT для таблицы `layer::mask_layer::intermediate_r`
--
ALTER TABLE `layer::mask_layer::intermediate_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2440;
--
-- AUTO_INCREMENT для таблицы `layer::merging`
--
ALTER TABLE `layer::merging`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1034;
--
-- AUTO_INCREMENT для таблицы `layer::merging_layer::forbidding_r`
--
ALTER TABLE `layer::merging_layer::forbidding_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT для таблицы `layer::suspended`
--
ALTER TABLE `layer::suspended`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT для таблицы `layer_option_r`
--
ALTER TABLE `layer_option_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `option`
--
ALTER TABLE `option`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `optioncombination`
--
ALTER TABLE `optioncombination`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT для таблицы `optioncombination_baseroute_r`
--
ALTER TABLE `optioncombination_baseroute_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT для таблицы `optioncombination_option_r`
--
ALTER TABLE `optioncombination_option_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT для таблицы `pdk`
--
ALTER TABLE `pdk`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT для таблицы `psow`
--
ALTER TABLE `psow`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `psow::line`
--
ALTER TABLE `psow::line`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `technology`
--
ALTER TABLE `technology`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `teg`
--
ALTER TABLE `teg`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `teg::cell`
--
ALTER TABLE `teg::cell`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=357;
--
-- AUTO_INCREMENT для таблицы `teg::cell_baseroute_r`
--
ALTER TABLE `teg::cell_baseroute_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=796;
--
-- AUTO_INCREMENT для таблицы `teg::cell_option_r`
--
ALTER TABLE `teg::cell_option_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `teg::cell_teg_r`
--
ALTER TABLE `teg::cell_teg_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=950;
--
-- AUTO_INCREMENT для таблицы `teg_ui::tz_r`
--
ALTER TABLE `teg_ui::tz_r`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `baseroute`
--
ALTER TABLE `baseroute`
  ADD CONSTRAINT `BaseRoute_ibfk_3` FOREIGN KEY (`TechnologyId`) REFERENCES `technology` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BaseRoute_ibfk_4` FOREIGN KEY (`RouteStatus`) REFERENCES `status` (`Id`),
  ADD CONSTRAINT `BaseRoute_ibfk_5` FOREIGN KEY (`PDKStatus`) REFERENCES `status` (`Id`),
  ADD CONSTRAINT `BaseRoute_ibfk_6` FOREIGN KEY (`PCGStatus`) REFERENCES `status` (`Id`),
  ADD CONSTRAINT `BaseRoute_ibfk_8` FOREIGN KEY (`PDKId`) REFERENCES `pdk` (`Id`),
  ADD CONSTRAINT `BaseRoute_ibfk_9` FOREIGN KEY (`FrameLibId`) REFERENCES `frame::lib` (`Id`);

--
-- Ограничения внешнего ключа таблицы `frame::lib`
--
ALTER TABLE `frame::lib`
  ADD CONSTRAINT `Frame::Lib_ibfk_1` FOREIGN KEY (`TechnologyId`) REFERENCES `technology` (`Id`);

--
-- Ограничения внешнего ключа таблицы `layer`
--
ALTER TABLE `layer`
  ADD CONSTRAINT `Layer_ibfk_1` FOREIGN KEY (`BaseRouteId`) REFERENCES `baseroute` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::cad`
--
ALTER TABLE `layer::cad`
  ADD CONSTRAINT `Layer::Cad_ibfk_1` FOREIGN KEY (`LayerId`) REFERENCES `layer` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::forbidding`
--
ALTER TABLE `layer::forbidding`
  ADD CONSTRAINT `Layer::Forbidding_ibfk_1` FOREIGN KEY (`CadLayerId`) REFERENCES `layer::cad` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::intermediate`
--
ALTER TABLE `layer::intermediate`
  ADD CONSTRAINT `Layer::Intermediate_ibfk_1` FOREIGN KEY (`LayerId`) REFERENCES `layer` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::intermediate_layer::merging_r`
--
ALTER TABLE `layer::intermediate_layer::merging_r`
  ADD CONSTRAINT `Layer::Intermediate_Layer::Merging_R_ibfk_1` FOREIGN KEY (`IntermediateLayerId`) REFERENCES `layer::intermediate` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Layer::Intermediate_Layer::Merging_R_ibfk_2` FOREIGN KEY (`MergingLayerId`) REFERENCES `layer::merging` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::mask`
--
ALTER TABLE `layer::mask`
  ADD CONSTRAINT `Layer::Mask_ibfk_1` FOREIGN KEY (`LayerId`) REFERENCES `layer` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::mask_layer::intermediate_r`
--
ALTER TABLE `layer::mask_layer::intermediate_r`
  ADD CONSTRAINT `Layer::Mask_Layer::Intermediate_R_ibfk_1` FOREIGN KEY (`IntermediateLayerId`) REFERENCES `layer::intermediate` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Layer::Mask_Layer::Intermediate_R_ibfk_2` FOREIGN KEY (`MaskLayerId`) REFERENCES `layer::mask` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::merging`
--
ALTER TABLE `layer::merging`
  ADD CONSTRAINT `Layer::Merging_ibfk_1` FOREIGN KEY (`CadLayerId`) REFERENCES `layer::cad` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::merging_layer::forbidding_r`
--
ALTER TABLE `layer::merging_layer::forbidding_r`
  ADD CONSTRAINT `Layer::Merging_Layer::Forbidding_R_ibfk_1` FOREIGN KEY (`ForbiddingLayerId`) REFERENCES `layer::forbidding` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Layer::Merging_Layer::Forbidding_R_ibfk_2` FOREIGN KEY (`MergingLayerId`) REFERENCES `layer::merging` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer::suspended`
--
ALTER TABLE `layer::suspended`
  ADD CONSTRAINT `Layer::Suspended_ibfk_1` FOREIGN KEY (`CadLayerId`) REFERENCES `layer::cad` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `layer_option_r`
--
ALTER TABLE `layer_option_r`
  ADD CONSTRAINT `Layer_Option_R_ibfk_1` FOREIGN KEY (`LayerId`) REFERENCES `layer` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Layer_Option_R_ibfk_2` FOREIGN KEY (`OptionId`) REFERENCES `option` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teg::cell_baseroute_r`
--
ALTER TABLE `teg::cell_baseroute_r`
  ADD CONSTRAINT `teg::cell_baseroute_r_ibfk_1` FOREIGN KEY (`CellId`) REFERENCES `teg::cell` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
