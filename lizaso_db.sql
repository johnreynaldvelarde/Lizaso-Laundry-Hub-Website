-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2024 at 09:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lizaso_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `action_type` varchar(255) NOT NULL,
  `action_description` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `user_id`, `user_type`, `action_type`, `action_description`, `timestamp`) VALUES
(1, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 05:23:02'),
(2, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 05:35:33'),
(3, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 09:12:05'),
(4, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 12:34:35'),
(5, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 12:35:35'),
(6, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 12:56:04'),
(7, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 16:34:19'),
(8, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-06 16:37:00'),
(9, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-08 09:52:19'),
(10, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-09 05:16:28'),
(11, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-09 10:41:01'),
(12, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-09 13:24:12'),
(13, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-10 05:20:14'),
(14, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-10 06:36:06'),
(15, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-10 06:57:58'),
(16, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-10 07:17:33'),
(17, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-11 20:29:50'),
(18, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-13 19:06:54'),
(19, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-14 05:10:46'),
(20, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-14 06:09:54'),
(21, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-14 19:11:55'),
(22, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-14 22:04:28'),
(23, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 00:58:53'),
(24, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 02:33:34'),
(25, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 07:01:20'),
(26, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 08:10:49'),
(27, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 11:16:42'),
(28, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 17:59:49'),
(29, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-15 20:22:31'),
(30, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-16 05:46:10'),
(31, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-16 10:22:52');

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) NOT NULL,
  `country` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `address_line1`, `address_line2`, `country`, `province`, `city`, `postal_code`, `latitude`, `longitude`, `updated_at`) VALUES
(1, 'Balagtas', 'Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-09-01 23:13:15'),
(2, 'Malolos, Bulacan', 'Malolos, Bulacan', 'Philippines', 'Bulacan', 'Malolos', '3000', 14.849900, 120.823900, NULL),
(5, 'Malolos, Bulacan', 'Malolos, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.843045, 120.811145, '2024-09-02 13:37:28'),
(6, 'Malolos, Bulacan', 'Malolos, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.843045, 120.811145, '2024-09-02 13:38:05'),
(7, 'Malolos, Bulacan', 'Malolos, Bulacan', 'PH', 'Bulacan', 'Malolos', '3000', 14.843045, 120.811145, '2024-09-02 13:43:43'),
(8, 'Malolos, Bulacan', 'Malolos, Bulacan', 'PH', 'Bulacan', 'Malolos', '3000', 14.843045, 120.811145, '2024-09-02 13:45:17'),
(9, 'Malolos, Bulacan', 'Malolos, Bulacan', 'PH', 'Bulacan', 'Malolos', '3000', 14.843045, 120.811145, '2024-09-02 13:45:27'),
(10, 'Malolos, Bulacan', 'Malolos, Bulacan', 'PH', 'Bulacan', 'Malolos', '3000', 14.843045, 120.811145, '2024-09-02 13:48:50'),
(11, 'Bulakan, Bulacan', 'Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.794673, 120.879270, '2024-09-02 14:05:55'),
(12, 'Taliptip Bulakan, Bulacan', 'Taliptip Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.759256, 120.904878, '2024-09-09 22:50:57'),
(13, 'Bambang Bulakan, Bulacan', 'Bambang Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.788308, 120.929684, '2024-09-13 21:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `c_firstname` varchar(255) NOT NULL,
  `c_middlename` varchar(255) NOT NULL,
  `c_lastname` varchar(255) NOT NULL,
  `c_username` varchar(255) NOT NULL,
  `c_number` varchar(20) NOT NULL,
  `c_email` varchar(255) NOT NULL,
  `isAgreement` tinyint(1) NOT NULL,
  `isOnline` tinyint(1) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `store_id`, `address_id`, `c_firstname`, `c_middlename`, `c_lastname`, `c_username`, `c_number`, `c_email`, `isAgreement`, `isOnline`, `isArchive`, `date_created`) VALUES
(1, 2, 6, 'Rose', '', 'Oriana', 'rose16', '09122727091', 'rose@gmail.com', 1, 1, 0, '2024-09-02 07:19:10'),
(2, 2, 10, 'Alexia', '', 'Midgar', 'alexia16', '09151616711', 'alexia@gmail.com', 1, 1, 0, '2024-09-02 21:42:48'),
(3, 1, 11, 'Alpha', '', 'Shadow', 'alpha16', '09126767541', 'alpha@gmail.com', 1, 1, 0, '2024-09-02 21:57:26'),
(4, NULL, NULL, 'Juan', '', 'Tamad', 'juantamad16', '', '', 1, 1, 0, '2024-09-04 05:56:57'),
(5, 1, 12, 'John Reynald', 'P.', 'Velarde', 'velarde12', '09472727061', 'johnreynaldvelarde@gmail.com', 1, 1, 0, '2024-09-10 06:50:15'),
(6, 1, 13, 'juan', '', 'tamad', 'junjun16', '0912127651', 'juantamad@gmail.com', 1, 1, 0, '2024-09-14 05:17:48');

-- --------------------------------------------------------

--
-- Table structure for table `customer_security`
--

CREATE TABLE `customer_security` (
  `id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL,
  `c_password` varchar(255) NOT NULL,
  `c_password_salt` varchar(255) NOT NULL,
  `mfa_enabled` tinyint(1) NOT NULL,
  `mfa_secret` varchar(255) NOT NULL,
  `failed_login_attempts` int(11) NOT NULL,
  `account_locked` tinyint(1) NOT NULL,
  `lockout_time` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `last_logout` timestamp NULL DEFAULT NULL,
  `last_password_change` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_security`
--

INSERT INTO `customer_security` (`id`, `customer_id`, `c_password`, `c_password_salt`, `mfa_enabled`, `mfa_secret`, `failed_login_attempts`, `account_locked`, `lockout_time`, `last_login`, `last_logout`, `last_password_change`) VALUES
(1, 1, '$2b$12$.NPFb5IrbWu4H/AWA31LJ.N3/yw9FtojJ/gT0vf3cP8QjP54t0IQW', '$2b$12$I/FCPj7VZMRdV/geL4Tfve', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(2, 2, '$2b$12$PlG8mYitFYFIZvY3aeka2./1qiDSAU6GYaQ0MPG0a7ns/6OIe0on2', '$2b$12$sFHGjpsTJ.Dqq1VBi9PK4u', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(3, 3, '$2b$12$/tYLR4F29Jcsq0ktG.1obe0XsjWffnlY1qpYd/YN4/0l1pjOLDe7q', '$2b$12$ecnx2sSVORyWoWlZq7qAKe', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(4, 4, '$2b$12$9lWoAI67jHuabfy/69g1/uaSfy2HTrKnd1isy5AmeqWgkeHZ0TwB2', '$2b$12$r8pEBKr3olkeFllkoCksQ.', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(5, 5, '$2b$12$0lg9/NOBdQFxFOMcLtmXsONI8UXxFxNtDhWgM9ezcspw9nN8NHNmu', '$2b$12$7qZHqhKnv6R6nywwSUGsSe', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(6, 6, '$2b$12$F8hsWLf0RDAkFFLPIVOa0OSz7LsJ5WEzQAr1NaebdBoheJyFn8Fn6', '$2b$12$6blgY4eSmYX9kfe9azAWWu', 0, '', 0, 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `isStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `item_code` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `updated_at` datetime NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE `item_category` (
  `id` bigint(20) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `updated_at` datetime NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laundry_assignment`
--

CREATE TABLE `laundry_assignment` (
  `id` bigint(20) NOT NULL,
  `service_request_id` bigint(20) NOT NULL,
  `unit_id` bigint(20) NOT NULL,
  `assigned_by` bigint(20) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `assigned_at` datetime NOT NULL,
  `completed_at` datetime DEFAULT NULL,
  `isAssignmentStatus` tinyint(4) NOT NULL,
  `isCompleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_assignment`
--

INSERT INTO `laundry_assignment` (`id`, `service_request_id`, `unit_id`, `assigned_by`, `weight`, `assigned_at`, `completed_at`, `isAssignmentStatus`, `isCompleted`) VALUES
(39, 53, 39, 1, '5', '2024-09-16 12:46:17', NULL, 2, 0),
(40, 54, 40, 1, '5', '2024-09-16 12:55:34', NULL, 2, 0),
(41, 55, 41, 1, '3', '2024-09-16 12:56:58', NULL, 2, 0),
(42, 56, 42, 1, '5', '2024-09-16 12:57:26', NULL, 2, 0),
(43, 57, 43, 1, '5', '2024-09-16 12:57:42', NULL, 2, 0),
(44, 58, 40, 1, '3', '2024-09-16 13:08:30', NULL, 2, 0),
(45, 59, 41, 1, '2', '2024-09-16 13:08:43', NULL, 2, 0),
(46, 60, 39, 1, '3', '2024-09-16 13:11:10', NULL, 2, 0),
(47, 61, 40, 1, '4', '2024-09-16 13:11:17', NULL, 2, 0),
(48, 62, 41, 1, '4', '2024-09-16 13:11:23', NULL, 2, 0),
(49, 63, 42, 1, '3', '2024-09-16 13:12:00', NULL, 2, 0),
(50, 64, 43, 1, '4', '2024-09-16 13:13:15', NULL, 2, 0),
(51, 65, 39, 1, '2', '2024-09-16 13:14:06', NULL, 2, 0),
(52, 66, 40, 1, '3', '2024-09-16 13:14:16', NULL, 2, 0),
(53, 67, 41, 1, '5', '2024-09-16 13:17:03', NULL, 2, 0),
(54, 68, 39, 1, '3', '2024-09-16 13:19:03', NULL, 2, 0),
(55, 69, 40, 1, '3', '2024-09-16 13:19:16', NULL, 2, 0),
(56, 70, 42, 1, '3', '2024-09-16 13:20:44', NULL, 2, 0),
(57, 71, 39, 1, '2', '2024-09-16 13:22:26', NULL, 2, 0),
(58, 72, 40, 1, '2', '2024-09-16 13:22:46', NULL, 2, 0),
(59, 73, 41, 1, '2', '2024-09-16 13:23:21', NULL, 2, 0),
(60, 74, 39, 1, '2', '2024-09-16 13:25:47', NULL, 2, 0),
(61, 75, 40, 1, '2', '2024-09-16 13:28:07', NULL, 2, 0),
(62, 76, 41, 1, '2', '2024-09-16 13:28:23', NULL, 2, 0),
(63, 77, 42, 1, '2', '2024-09-16 13:30:16', NULL, 2, 0),
(64, 78, 43, 1, '2', '2024-09-16 13:31:34', NULL, 2, 0),
(65, 79, 39, 1, '3', '2024-09-16 13:48:46', NULL, 2, 0),
(66, 80, 40, 1, '1', '2024-09-16 13:52:42', NULL, 2, 0),
(67, 81, 41, 1, '2', '2024-09-16 13:52:56', NULL, 2, 0),
(68, 82, 42, 1, '3', '2024-09-16 13:53:06', NULL, 2, 0),
(69, 83, 43, 1, '2', '2024-09-16 13:53:20', NULL, 2, 0),
(70, 84, 44, 1, '3', '2024-09-16 13:53:29', NULL, 2, 0),
(71, 85, 39, 1, '2', '2024-09-16 13:54:12', NULL, 2, 0),
(72, 86, 39, 1, '2', '2024-09-16 13:58:52', NULL, 2, 0),
(73, 87, 40, 1, '3', '2024-09-16 13:58:59', NULL, 2, 0),
(74, 88, 41, 1, '3', '2024-09-16 13:59:06', NULL, 2, 0),
(75, 89, 39, 1, '2', '2024-09-16 14:04:20', NULL, 2, 0),
(76, 90, 39, 1, '2', '2024-09-16 14:07:49', NULL, 2, 0),
(77, 91, 40, 1, '1', '2024-09-16 14:07:56', NULL, 2, 0),
(78, 92, 41, 1, '3', '2024-09-16 14:08:03', NULL, 2, 0),
(79, 93, 42, 1, '2', '2024-09-16 14:08:19', NULL, 2, 0),
(80, 94, 39, 1, '2', '2024-09-16 14:09:24', NULL, 2, 0),
(81, 95, 40, 1, '2', '2024-09-16 14:09:34', NULL, 2, 0),
(82, 96, 39, 1, '2', '2024-09-16 14:09:47', NULL, 2, 0),
(83, 97, 46, 1, '2', '2024-09-16 14:09:55', NULL, 2, 0),
(84, 98, 40, 1, '2', '2024-09-16 14:10:02', NULL, 2, 0),
(85, 99, 41, 1, '3', '2024-09-16 14:10:09', NULL, 2, 0),
(86, 100, 39, 1, '2', '2024-09-16 14:10:51', NULL, 2, 0),
(87, 101, 40, 1, '2', '2024-09-16 14:10:57', NULL, 2, 0),
(88, 102, 41, 1, '2', '2024-09-16 14:11:03', NULL, 2, 0),
(89, 103, 42, 1, '2', '2024-09-16 14:11:09', NULL, 2, 0),
(90, 104, 43, 1, '2', '2024-09-16 14:11:15', NULL, 2, 0),
(91, 105, 39, 1, '3', '2024-09-16 14:14:50', NULL, 2, 0),
(92, 106, 40, 1, '3', '2024-09-16 14:14:59', NULL, 2, 0),
(93, 107, 41, 1, '2', '2024-09-16 14:15:12', NULL, 2, 0),
(94, 108, 42, 1, '3', '2024-09-16 14:15:21', NULL, 2, 0),
(95, 109, 43, 1, '2', '2024-09-16 14:15:30', NULL, 2, 0),
(96, 110, 44, 1, '2', '2024-09-16 14:15:37', NULL, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `laundry_unit`
--

CREATE TABLE `laundry_unit` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `unit_name` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL,
  `isUnitStatus` tinyint(4) NOT NULL,
  `isArchive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_unit`
--

INSERT INTO `laundry_unit` (`id`, `store_id`, `unit_name`, `date_created`, `isUnitStatus`, `isArchive`) VALUES
(39, 1, 'Unit 1', '2024-09-09 07:13:30', 0, 0),
(40, 1, 'Unit 2', '2024-09-09 09:26:14', 0, 0),
(41, 1, 'Unit 3', '2024-09-09 09:26:17', 0, 0),
(42, 1, 'Unit 4', '2024-09-09 09:26:19', 0, 0),
(43, 1, 'Unit 5', '2024-09-09 09:26:22', 0, 0),
(44, 1, 'Unit 6', '2024-09-09 09:26:43', 0, 0),
(45, 1, 'Unit 7', '2024-09-09 09:26:46', 0, 0),
(46, 1, 'Unit 8', '2024-09-09 09:26:49', 0, 0),
(47, 1, 'Unit 9', '2024-09-09 09:26:51', 0, 0),
(48, 1, 'Unit 10', '2024-09-09 09:26:54', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `service_request`
--

CREATE TABLE `service_request` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `customer_id` bigint(20) NOT NULL,
  `service_type_id` bigint(20) NOT NULL,
  `customer_fullname` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT current_timestamp(),
  `pickup_date` timestamp NULL DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `request_status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_request`
--

INSERT INTO `service_request` (`id`, `store_id`, `user_id`, `customer_id`, `service_type_id`, `customer_fullname`, `notes`, `request_date`, `pickup_date`, `delivery_date`, `request_status`) VALUES
(53, 1, 1, 6, 54, 'tamad, juan ', '', '2024-09-16 04:46:17', NULL, NULL, 'Canceled'),
(54, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 04:55:34', NULL, NULL, 'Canceled'),
(55, 1, 1, 6, 54, 'tamad, juan ', '', '2024-09-16 04:56:58', NULL, NULL, 'Canceled'),
(56, 1, 1, 6, 52, 'tamad, juan ', '', '2024-09-16 04:57:26', NULL, NULL, 'Canceled'),
(57, 1, 1, 3, 50, 'Shadow, Alpha ', '', '2024-09-16 04:57:42', NULL, NULL, 'Canceled'),
(58, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:08:30', NULL, NULL, 'Canceled'),
(59, 1, 1, 6, 53, 'tamad, juan ', '', '2024-09-16 05:08:43', NULL, NULL, 'Canceled'),
(60, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:11:10', NULL, NULL, 'Canceled'),
(61, 1, 1, 6, 52, 'tamad, juan ', '', '2024-09-16 05:11:17', NULL, NULL, 'Canceled'),
(62, 1, 1, 6, 52, 'tamad, juan ', '', '2024-09-16 05:11:23', NULL, NULL, 'Canceled'),
(63, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:12:00', NULL, NULL, 'Canceled'),
(64, 1, 1, 6, 53, 'tamad, juan ', '', '2024-09-16 05:13:15', NULL, NULL, 'Canceled'),
(65, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:14:06', NULL, NULL, 'Canceled'),
(66, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:14:16', NULL, NULL, 'Canceled'),
(67, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:17:03', NULL, NULL, 'Canceled'),
(68, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:19:03', NULL, NULL, 'Canceled'),
(69, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:19:16', NULL, NULL, 'Canceled'),
(70, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:20:44', NULL, NULL, 'Canceled'),
(71, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:22:26', NULL, NULL, 'Canceled'),
(72, 1, 1, 6, 54, 'tamad, juan ', '', '2024-09-16 05:22:46', NULL, NULL, 'Canceled'),
(73, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:23:21', NULL, NULL, 'Canceled'),
(74, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:25:47', NULL, NULL, 'Canceled'),
(75, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:28:07', NULL, NULL, 'Canceled'),
(76, 1, 1, 6, 54, 'tamad, juan ', '', '2024-09-16 05:28:23', NULL, NULL, 'Canceled'),
(77, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:30:16', NULL, NULL, 'Canceled'),
(78, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:31:34', NULL, NULL, 'Canceled'),
(79, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:48:46', NULL, NULL, 'Canceled'),
(80, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:52:42', NULL, NULL, 'Canceled'),
(81, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:52:56', NULL, NULL, 'Canceled'),
(82, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:53:06', NULL, NULL, 'Canceled'),
(83, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:53:20', NULL, NULL, 'Canceled'),
(84, 1, 1, 6, 52, 'tamad, juan ', '', '2024-09-16 05:53:29', NULL, NULL, 'Canceled'),
(85, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:54:12', NULL, NULL, 'Canceled'),
(86, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:58:52', NULL, NULL, 'Canceled'),
(87, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:58:59', NULL, NULL, 'Canceled'),
(88, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 05:59:06', NULL, NULL, 'Canceled'),
(89, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:04:20', NULL, NULL, 'Canceled'),
(90, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:07:49', NULL, NULL, 'Canceled'),
(91, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:07:56', NULL, NULL, 'Canceled'),
(92, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:08:03', NULL, NULL, 'Canceled'),
(93, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:08:19', NULL, NULL, 'Canceled'),
(94, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:09:24', NULL, NULL, 'Canceled'),
(95, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:09:34', NULL, NULL, 'Canceled'),
(96, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:09:47', NULL, NULL, 'Canceled'),
(97, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:09:55', NULL, NULL, 'Canceled'),
(98, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:10:02', NULL, NULL, 'Canceled'),
(99, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:10:09', NULL, NULL, 'Canceled'),
(100, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:10:51', NULL, NULL, 'Canceled'),
(101, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:10:57', NULL, NULL, 'Canceled'),
(102, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:11:03', NULL, NULL, 'Canceled'),
(103, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:11:09', NULL, NULL, 'Canceled'),
(104, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:11:15', NULL, NULL, 'Canceled'),
(105, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:14:50', NULL, NULL, 'Canceled'),
(106, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:14:59', NULL, NULL, 'Canceled'),
(107, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:15:12', NULL, NULL, 'Canceled'),
(108, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:15:21', NULL, NULL, 'Canceled'),
(109, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:15:29', NULL, NULL, 'Canceled'),
(110, 1, 1, 6, 50, 'tamad, juan ', '', '2024-09-16 06:15:37', NULL, NULL, 'Canceled');

-- --------------------------------------------------------

--
-- Table structure for table `service_type`
--

CREATE TABLE `service_type` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `default_price` decimal(10,2) NOT NULL,
  `date_created` datetime NOT NULL,
  `isArchive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_type`
--

INSERT INTO `service_type` (`id`, `store_id`, `service_name`, `default_price`, `date_created`, `isArchive`) VALUES
(50, 1, 'Wash', 65.00, '2024-09-16 11:23:33', 0),
(51, 1, 'Dry', 55.00, '2024-09-16 11:23:40', 0),
(52, 1, 'Fold', 30.00, '2024-09-16 11:23:48', 0),
(53, 1, 'Wash/Dry', 120.00, '2024-09-16 11:24:25', 0),
(54, 1, 'Wash/Dry/Fold', 150.00, '2024-09-16 11:24:47', 0),
(55, 2, 'Wash', 10.00, '2024-09-16 11:25:45', 0),
(56, 1, '1', 1.00, '2024-09-16 14:16:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` bigint(20) NOT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `store_no` varchar(50) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `store_contact` varchar(50) NOT NULL,
  `store_email` varchar(255) NOT NULL,
  `is_main_store` tinyint(1) NOT NULL,
  `updated_at` datetime NOT NULL,
  `date_created` datetime NOT NULL,
  `isStatus` tinyint(1) NOT NULL,
  `isArchive` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `address_id`, `store_no`, `store_name`, `store_contact`, `store_email`, `is_main_store`, `updated_at`, `date_created`, `isStatus`, `isArchive`) VALUES
(1, 1, 'LIZASO-1725232395416', 'Lizaso Laundry Hub', 'Main Contact', '', 1, '0000-00-00 00:00:00', '2024-09-02 07:13:15', 0, 0),
(2, 2, 'Lizaso Store 0001', 'Lizaso Malolos', '09124747061', 'lizasomalolos@gmail.com', 0, '2024-09-02 01:51:07', '2024-09-02 01:51:07', 0, 0),
(3, 12, 'sasasas', 'Lizaso Perez', '12', '12', 0, '2024-09-15 15:43:24', '2024-09-15 15:43:24', 0, 0),
(4, 1, '12', 'Lizaso Bambang', '1212', '1212', 0, '2024-09-15 15:45:41', '2024-09-15 15:45:41', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `isRole` tinyint(4) NOT NULL,
  `isOnline` tinyint(4) NOT NULL,
  `isStatus` tinyint(1) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `store_id`, `username`, `email`, `mobile_number`, `first_name`, `middle_name`, `last_name`, `isRole`, `isOnline`, `isStatus`, `isArchive`, `date_created`) VALUES
(1, 1, 'admin', 'admin@example.com', '09472727061', 'Admin', '', 'User', 0, 1, 0, 0, '2024-09-02 07:13:15');

-- --------------------------------------------------------

--
-- Table structure for table `user_security`
--

CREATE TABLE `user_security` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `password_salt` varchar(255) NOT NULL,
  `mfa_enabled` tinyint(1) NOT NULL,
  `mfa_secret` varchar(255) NOT NULL,
  `failed_login_attempts` int(11) NOT NULL DEFAULT 0,
  `account_locked` tinyint(1) NOT NULL,
  `lockout_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `last_logout` timestamp NULL DEFAULT NULL,
  `last_password_change` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_security`
--

INSERT INTO `user_security` (`id`, `user_id`, `password`, `password_salt`, `mfa_enabled`, `mfa_secret`, `failed_login_attempts`, `account_locked`, `lockout_time`, `last_login`, `last_logout`, `last_password_change`) VALUES
(1, 1, '$2b$10$FqG.2B/vBiFjHXYZ8MciauDzZDDrN2R9WXt39rI1hOn19WBgNLw7.', '$2b$10$ydRnrAI0vq/w4NDifXDIc.', 0, '', 0, 0, '2024-09-01 23:13:15', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Activity_Log_User_Account` (`user_id`);

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Customer_Stores` (`store_id`),
  ADD KEY `Customer_Addresses` (`address_id`);

--
-- Indexes for table `customer_security`
--
ALTER TABLE `customer_security`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Customer_Security` (`customer_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Inventory_Stores` (`store_id`),
  ADD KEY `Inventory_Item` (`item_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Item_Item_Category` (`category_id`);

--
-- Indexes for table `item_category`
--
ALTER TABLE `item_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Laundry_Assignment_Service_Request` (`service_request_id`),
  ADD KEY `Laundry_Assignment_Laundry_Unit` (`unit_id`),
  ADD KEY `Laundry_Assignment_User_Account` (`assigned_by`);

--
-- Indexes for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Laundry_Unit_Stores` (`store_id`);

--
-- Indexes for table `service_request`
--
ALTER TABLE `service_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Service_Request_Stores` (`store_id`),
  ADD KEY `Service_Request_User_Account` (`user_id`),
  ADD KEY `Service_Request_Customer` (`customer_id`),
  ADD KEY `Service_Request_Service_Type` (`service_type_id`);

--
-- Indexes for table `service_type`
--
ALTER TABLE `service_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Service_Type_Stores` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Stores_Addresses` (`address_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_Account_Stores` (`store_id`);

--
-- Indexes for table `user_security`
--
ALTER TABLE `user_security`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_Security_User_Account` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customer_security`
--
ALTER TABLE `customer_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `Activity_Log_User_Account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `Customer_Addresses` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  ADD CONSTRAINT `Customer_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `customer_security`
--
ALTER TABLE `customer_security`
  ADD CONSTRAINT `Customer_Security` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `Inventory_Item` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `Inventory_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `Item_Item_Category` FOREIGN KEY (`category_id`) REFERENCES `item_category` (`id`);

--
-- Constraints for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  ADD CONSTRAINT `Laundry_Assignment_Laundry_Unit` FOREIGN KEY (`unit_id`) REFERENCES `laundry_unit` (`id`),
  ADD CONSTRAINT `Laundry_Assignment_Service_Request` FOREIGN KEY (`service_request_id`) REFERENCES `service_request` (`id`),
  ADD CONSTRAINT `Laundry_Assignment_User_Account` FOREIGN KEY (`assigned_by`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  ADD CONSTRAINT `Laundry_Unit_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `service_request`
--
ALTER TABLE `service_request`
  ADD CONSTRAINT `Service_Request_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `Service_Request_Service_Type` FOREIGN KEY (`service_type_id`) REFERENCES `service_type` (`id`),
  ADD CONSTRAINT `Service_Request_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `Service_Request_User_Account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `service_type`
--
ALTER TABLE `service_type`
  ADD CONSTRAINT `Service_Type_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `Stores_Addresses` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`);

--
-- Constraints for table `user_account`
--
ALTER TABLE `user_account`
  ADD CONSTRAINT `User_Account_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `user_security`
--
ALTER TABLE `user_security`
  ADD CONSTRAINT `User_Security_User_Account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
