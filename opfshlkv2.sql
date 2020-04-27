-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Апр 27 2020 г., 12:42
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
-- База данных: `opfshlkv2`
--

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
  `Description` varchar(3000) CHARACTER SET cp1251 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `document`
--

INSERT INTO `document` (`Id`, `Path`, `Name`, `TimeStamp`, `UploadUserId`, `UploadStatusId`, `PublicationStatusId`, `Description`) VALUES
(1, '/trash/doc/skfdw.pdf', 'Протокол верификации топологии.pdf', '2020-04-27 12:06:57', 1, 1, 1, 'Согласовать срочно, быстро, как можно быстрее, завтра приду и все согласовано, надеюсь. Пожалуйста.');

-- --------------------------------------------------------

--
-- Структура таблицы `document::publicationstatus`
--

CREATE TABLE `document::publicationstatus` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET cp1251 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `document::publicationstatus`
--

INSERT INTO `document::publicationstatus` (`Id`, `Name`) VALUES
(1, 'Ожидание'),
(2, 'Опубликован'),
(3, 'Отклонен');

-- --------------------------------------------------------

--
-- Структура таблицы `document::uploadstatus`
--

CREATE TABLE `document::uploadstatus` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET cp1251 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `document::uploadstatus`
--

INSERT INTO `document::uploadstatus` (`Id`, `Name`) VALUES
(1, 'Загужается'),
(2, 'Загружен'),
(3, 'Ошибка');

--
-- Индексы сохранённых таблиц
--

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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `document`
--
ALTER TABLE `document`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `document::publicationstatus`
--
ALTER TABLE `document::publicationstatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `document::uploadstatus`
--
ALTER TABLE `document::uploadstatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
