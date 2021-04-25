-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2021 at 10:03 AM
-- Server version: 8.0.18
-- PHP Version: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend`
--
CREATE DATABASE IF NOT EXISTS `backend` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `backend`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin`, `pass`, `name`) VALUES
('admin', '123', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `username` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `courseid` int(11) NOT NULL,
  `comment` text COLLATE utf8_unicode_ci NOT NULL,
  `rating` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseidmap` (`courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `userid`, `username`, `courseid`, `comment`, `rating`) VALUES
(1, 1, 'Haritha', 1, 'Very Good', 4.5),
(2, 1, 'Haritha', 2, 'Awesome Couse', 5),
(3, 46, 'Arul', 1, 'Great work', 4),
(4, 46, 'Arul', 2, 'Need to Improve', 3.5);

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` int(11) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci,
  `link` text COLLATE utf8_unicode_ci,
  `filekey` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `courseid` (`course`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `course`, `name`, `description`, `link`, `filekey`) VALUES
(1, 1, 'Introduction', 'Sample Description', 'https://edunixcoda.s3.amazonaws.com/course_1/V4NcBL8q.mp4', 'course_1/V4NcBL8q.mp'),
(2, 1, 'Basics', 'Basic Description', 'https://edunixcoda.s3.amazonaws.com/course_1/Meme.mp4', 'course_1/Meme.mp4'),
(5, 1, 'Advanced', 'Advanced Level Concepts', 'https://edunixcoda.s3.amazonaws.com/course_1/jtYNApCY.mp4', 'course_1/jtYNApCY.mp4'),
(6, 1, 'Intermediate', 'Intermediate', 'https://edunixcoda.s3.amazonaws.com/course_1/ghLLO0AR.mp4', 'course_1/ghLLO0AR.mp4'),
(7, 1, 'Advanced', 'Sample Content', 'https://edunixcoda.s3.amazonaws.com/course_1/un91sJza.mp4', 'course_1/un91sJza.mp4'),
(11, 2, 'Future', 'Big Data', 'https://edunixcoda.s3.amazonaws.com/course_2/W6MrXR6d.mp4', 'course_2/W6MrXR6d.mp4'),
(12, 2, 'Future', 'Big Data', 'https://edunixcoda.s3.amazonaws.com/course_2/NtZMtzq3.mp4', 'course_2/NtZMtzq3.mp4'),
(13, 2, 'Big Data Analytics', 'In the name of Data Interpretation.....', 'https://edunixcoda.s3.amazonaws.com/course_2/kexnhRCC.mp4', 'course_2/kexnhRCC.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `author` text COLLATE utf8_unicode_ci NOT NULL,
  `category` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `author`, `category`) VALUES
(1, 'Basic IoT', 'Lorem Ipsum\nGenerated ', 'Malliga', 'IoT'),
(2, 'Big Data Analytics', 'Check', 'Brandon', 'Big Data');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `userid` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pass` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mail`, `phone`, `userid`, `pass`) VALUES
(1, 'Abinash S', 's.abinash@outlook.com', '9003326846', 'abinash', 'asdfg'),
(2, 'Haritha', 'haritha@outlook.com', '983984', 'haritha', '123'),
(46, 'Arul', 's.abinash@outlook.com', '938498433', 'arul', 'qwerty'),
(49, 'Abinash S', 's.abinash891@gmail.com', '98459498', 'abi', 'abc');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `courseidmap` FOREIGN KEY (`courseid`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `courseid` FOREIGN KEY (`course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
