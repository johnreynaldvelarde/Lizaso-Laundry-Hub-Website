-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2024 at 11:24 AM
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
(1, 1, 'Delivery Staff', 'authentication', 'admin logged in.', '2024-10-07 16:12:00'),
(7, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:30:06'),
(8, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:30:45'),
(9, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:31:00'),
(10, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:32:37'),
(11, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:32:54'),
(12, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:33:59'),
(13, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:34:07'),
(14, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:35:13'),
(15, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:36:51'),
(16, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:37:30'),
(17, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:37:46'),
(18, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:38:51'),
(19, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:39:34'),
(20, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:43:13'),
(21, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:44:44'),
(22, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:45:00'),
(23, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:46:56'),
(24, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:47:09'),
(25, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:47:36'),
(26, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 16:49:19'),
(28, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 17:01:34'),
(29, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 17:47:29'),
(30, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 18:59:11'),
(31, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-07 19:00:31'),
(32, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-08 05:16:04'),
(33, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-08 10:48:18'),
(34, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-08 12:30:20'),
(35, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 03:05:28'),
(36, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 03:42:48'),
(37, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 04:00:46'),
(38, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 09:33:48'),
(44, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 13:10:15'),
(46, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 13:24:11'),
(48, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 13:37:52'),
(49, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-09 18:43:01'),
(50, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-10 08:13:07'),
(51, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 03:12:59'),
(52, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 03:13:47'),
(53, 7, 'Manager', 'authentication', 'reynald12 logged in.', '2024-10-11 06:24:14'),
(54, 7, 'Manager', 'authentication', 'reynald12 logged in.', '2024-10-11 06:25:14'),
(55, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 06:33:52'),
(56, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 11:53:35'),
(57, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 15:55:09'),
(58, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 19:58:48'),
(59, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-11 21:44:25'),
(60, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-12 22:13:34'),
(61, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-13 00:47:55'),
(62, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-13 11:18:44'),
(63, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-13 11:30:03'),
(64, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-13 19:03:25'),
(65, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-13 22:45:00'),
(66, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-13 22:46:47'),
(67, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-14 20:06:56'),
(68, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-16 13:33:44'),
(69, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-16 17:45:07'),
(70, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-16 18:14:09'),
(71, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-16 21:57:04'),
(72, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-18 03:52:46'),
(73, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-18 15:48:17');

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
(1, 'Balagtas', 'Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-10-07 08:10:31'),
(2, 'Perez, Bulakan, Bulacan', 'Perez, Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.766846, 120.896249, '2024-10-07 08:48:58'),
(3, 'Balagtas, Bulacan', 'Balagtas, Bulacan', 'PH', 'Bulacan', 'Balagtas', '3016', 14.834012, 120.901617, '2024-10-10 01:16:10'),
(4, 'Balagtas, Bulacan', 'Balagtas, Bulacan', 'PH', 'Bulacan', 'Balagtas', '3017', 14.824583, 120.906787, '2024-10-14 05:55:39');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) NOT NULL,
  `user_sender_id` bigint(20) DEFAULT NULL,
  `customer_sender_id` bigint(20) DEFAULT NULL,
  `user_receiver_id` bigint(20) DEFAULT NULL,
  `customer_receiver_id` bigint(20) DEFAULT NULL,
  `last_message` text DEFAULT NULL,
  `last_message_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user_sender_id`, `customer_sender_id`, `user_receiver_id`, `customer_receiver_id`, `last_message`, `last_message_date`, `created_at`, `updated_at`) VALUES
(51, NULL, 3, 6, NULL, '1212121211', '2024-10-15 02:19:23', '2024-10-15 00:59:17', '2024-10-15 02:19:23'),
(52, 6, NULL, NULL, 1, 'gg', '2024-10-16 03:29:42', '2024-10-15 01:01:13', '2024-10-16 03:29:42');

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
  `c_email` varchar(255) DEFAULT NULL,
  `isAgreement` tinyint(1) NOT NULL,
  `isOnline` tinyint(1) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `store_id`, `address_id`, `c_firstname`, `c_middlename`, `c_lastname`, `c_username`, `c_number`, `c_email`, `isAgreement`, `isOnline`, `isArchive`, `date_created`) VALUES
(1, 1, 2, 'Rose', '', 'Oriana', 'rose16', '09672525061', 'rose@gmail.com', 1, 1, 0, '2024-10-07 16:48:11'),
(2, 1, 3, 'Junjun', 'Santos', 'P.', 'junjun12', '0947272761', 'junjun12@gmail.com', 1, 1, 0, '2024-10-10 09:14:37'),
(3, 1, 4, 'Alexia', 'R', 'Midgar', 'alexia12', '092785858071', 'alexia16@gmail.com', 1, 1, 0, '2024-10-14 13:54:37');

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
(1, 1, '$2b$12$5fs5dLhzVeEwONABi2kBlum6fOdNsvm85MH5HxeIE9Uk7QKLTgWdi', '$2b$12$B0osXUsq9CIlU5DEoYWwa.', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(2, 2, '$2b$12$Y5KsZjgtW9rBbtI66ojMn.62rm86cz3QCkNAQhrmoYgsvycWFtO0q', '$2b$12$5ARniHHdbvV4k3kIrCMA7.', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(3, 3, '$2b$12$20RCQTh5puW8ogLcCXaOneL7JhPFImubXDAgU6U3nBs1dRjSBgrrO', '$2b$12$ICl1xHJVzMtQjoIgppeVse', 0, '', 0, 0, NULL, NULL, NULL, NULL);

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

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `store_id`, `item_id`, `price`, `quantity`, `isStatus`) VALUES
(1, 1, 1, 1.00, 0, 0),
(2, 1, 2, 2.00, 1, 0);

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

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `category_id`, `item_code`, `item_name`, `isArchive`, `updated_at`, `date_created`) VALUES
(1, 1, '1', '1', 0, '2024-10-11 08:31:46', '2024-10-11 08:31:46'),
(2, 2, '2', '2', 0, '2024-10-11 08:47:20', '2024-10-11 08:47:20');

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

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`id`, `category_name`, `isArchive`, `updated_at`, `date_created`) VALUES
(1, '121212121212', 0, '2024-10-11 07:12:53', '2024-10-11 07:12:53'),
(2, 'Detergent', 0, '2024-10-11 08:38:49', '2024-10-11 08:38:49'),
(3, 'Soap Powder', 0, '2024-10-11 10:57:53', '2024-10-11 10:57:53');

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
(4, 67, 1, 1, '1', '2024-10-16 22:23:47', NULL, 2, 0),
(5, 68, 2, 1, '1', '2024-10-17 07:13:04', NULL, 2, 0),
(8, 65, 1, 1, '5', '2024-10-17 07:37:39', NULL, 2, 0),
(11, 65, 1, 1, '5', '2024-10-18 04:04:40', NULL, 2, 0),
(12, 69, 2, 1, '5', '2024-10-18 05:24:03', NULL, 2, 0),
(13, 70, 2, 1, '5', '2024-10-18 05:40:54', NULL, 2, 0),
(14, 71, 1, 1, '5', '2024-10-18 05:43:36', NULL, 2, 0),
(15, 72, 1, 1, '1', '2024-10-18 07:13:03', NULL, 2, 0),
(16, 73, 1, 1, '5', '2024-10-18 07:28:06', NULL, 2, 0),
(17, 74, 9, 1, '5', '2024-10-18 07:43:07', NULL, 2, 0),
(18, 75, 1, 1, '5', '2024-10-18 07:56:13', NULL, 2, 0),
(19, 76, 1, 1, '5', '2024-10-18 09:30:15', NULL, 2, 0),
(20, 77, 2, 1, '1', '2024-10-18 09:37:46', NULL, 2, 0),
(21, 78, 3, 1, '1', '2024-10-18 09:40:21', NULL, 2, 0),
(22, 79, 1, 1, '5', '2024-10-18 09:43:19', NULL, 2, 0),
(23, 80, 2, 1, '10', '2024-10-18 12:28:26', NULL, 2, 0),
(24, 81, 2, 1, '10', '2024-10-18 12:28:37', NULL, 2, 0),
(25, 82, 1, 1, '4', '2024-10-18 12:31:30', NULL, 2, 0),
(26, 83, 2, 1, '5', '2024-10-18 12:32:04', NULL, 2, 0),
(27, 84, 1, 1, '1', '2024-10-18 12:33:06', NULL, 2, 0),
(28, 85, 2, 1, '5', '2024-10-18 12:34:23', NULL, 2, 0),
(29, 86, 3, 1, '1', '2024-10-18 15:03:09', NULL, 2, 0),
(30, 87, 3, 1, '2', '2024-10-18 15:05:37', NULL, 2, 0),
(31, 88, 3, 1, '1', '2024-10-18 15:08:28', NULL, 2, 0),
(32, 89, 3, 1, '1', '2024-10-18 15:16:04', NULL, 2, 0),
(33, 90, 4, 1, '2', '2024-10-18 15:17:35', NULL, 2, 0),
(34, 91, 3, 1, '1', '2024-10-18 15:18:28', NULL, 2, 0),
(35, 92, 1, 1, '5', '2024-10-18 15:29:38', NULL, 2, 0),
(36, 94, 2, 1, '5', '2024-10-18 15:48:28', NULL, 2, 0),
(39, 97, 1, 1, '5', '2024-10-18 15:55:36', NULL, 2, 0),
(40, 98, 1, 1, '5', '2024-10-18 15:56:35', NULL, 2, 0),
(41, 99, 1, 1, '5', '2024-10-18 15:56:57', NULL, 2, 0),
(42, 100, 1, 1, '5', '2024-10-18 15:59:03', NULL, 2, 0),
(43, 101, 1, 1, '5', '2024-10-18 16:02:43', NULL, 2, 0),
(44, 102, 1, 1, '5', '2024-10-18 16:03:05', NULL, 2, 0),
(45, 103, 2, 1, '5', '2024-10-18 16:03:24', NULL, 2, 0),
(46, 104, 3, 1, '2', '2024-10-18 16:03:41', NULL, 2, 0),
(47, 105, 1, 1, '5', '2024-10-18 16:07:52', NULL, 0, 0);

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
(1, 1, 'Unit 1', '2024-10-07 16:40:14', 1, 0),
(2, 1, 'Unit 2', '2024-10-07 16:40:19', 0, 0),
(3, 1, 'Unit 3', '2024-10-07 16:40:23', 0, 0),
(4, 1, 'Unit 4', '2024-10-07 16:40:26', 0, 0),
(5, 1, 'Unit 5', '2024-10-16 22:11:20', 0, 0),
(6, 1, 'Unit 6', '2024-10-16 22:11:27', 0, 0),
(7, 1, 'Unit 7', '2024-10-16 22:11:32', 0, 0),
(8, 1, 'Unit 8', '2024-10-16 22:11:35', 0, 0),
(9, 1, 'Unit 9', '2024-10-16 22:11:39', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `sender_type` enum('User','Customer') NOT NULL,
  `receiver_type` enum('User','Customer') NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isRead` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `receiver_id`, `sender_type`, `receiver_type`, `message`, `created_at`, `isRead`) VALUES
(142, 51, 3, 6, 'Customer', 'User', '11', '2024-10-15 00:59:17', 1),
(143, 51, 6, 3, 'User', 'Customer', '22', '2024-10-15 00:59:23', 1),
(144, 52, 6, 1, 'User', 'Customer', '1', '2024-10-15 01:01:13', 1),
(145, 51, 3, 6, 'Customer', 'User', '1', '2024-10-15 01:04:24', 1),
(146, 51, 3, 6, 'Customer', 'User', 'a', '2024-10-15 01:04:50', 1),
(147, 51, 3, 6, 'Customer', 'User', 'b', '2024-10-15 01:04:52', 1),
(148, 51, 3, 6, 'Customer', 'User', 'c', '2024-10-15 01:04:53', 1),
(149, 51, 6, 3, 'User', 'Customer', 'g', '2024-10-15 01:04:57', 1),
(150, 51, 3, 6, 'Customer', 'User', 'c', '2024-10-15 01:05:00', 1),
(151, 51, 6, 3, 'User', 'Customer', 'd', '2024-10-15 01:05:02', 1),
(152, 51, 6, 3, 'User', 'Customer', '1', '2024-10-15 01:05:05', 1),
(153, 51, 6, 3, 'User', 'Customer', 'adsd', '2024-10-15 01:05:10', 1),
(154, 51, 3, 6, 'Customer', 'User', '11', '2024-10-15 01:05:11', 1),
(155, 52, 6, 1, 'User', 'Customer', '1', '2024-10-15 01:05:27', 1),
(156, 52, 6, 1, 'User', 'Customer', 'a', '2024-10-15 01:05:30', 1),
(157, 52, 1, 6, 'Customer', 'User', '1', '2024-10-15 01:06:37', 1),
(158, 52, 6, 1, 'User', 'Customer', 'ano pustahan na', '2024-10-15 01:06:47', 1),
(159, 51, 6, 3, 'User', 'Customer', '1212121211', '2024-10-15 02:19:23', 1),
(160, 52, 6, 1, 'User', 'Customer', 'tara ba', '2024-10-15 02:19:42', 1),
(161, 52, 1, 6, 'Customer', 'User', 'sge ba', '2024-10-15 02:20:37', 1),
(162, 52, 1, 6, 'Customer', 'User', 'ano nas', '2024-10-15 02:21:03', 1),
(163, 52, 1, 6, 'Customer', 'User', '1', '2024-10-15 02:27:47', 1),
(164, 52, 1, 6, 'Customer', 'User', '2', '2024-10-15 02:27:52', 1),
(165, 52, 6, 1, 'User', 'Customer', 'Q', '2024-10-16 03:28:22', 1),
(166, 52, 6, 1, 'User', 'Customer', '!', '2024-10-16 03:29:37', 1),
(167, 52, 1, 6, 'Customer', 'User', 'gg', '2024-10-16 03:29:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `related_item`
--

CREATE TABLE `related_item` (
  `id` bigint(20) NOT NULL,
  `assignment_id` bigint(20) NOT NULL,
  `inventory_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `related_item`
--

INSERT INTO `related_item` (`id`, `assignment_id`, `inventory_id`, `quantity`, `amount`) VALUES
(1, 11, 1, 5, 5.00),
(2, 12, 1, 5, 5.00),
(3, 12, 2, 5, 10.00),
(4, 13, 1, 1, 1.00),
(5, 13, 2, 1, 2.00),
(6, 14, 1, 1, 1.00),
(7, 14, 2, 1, 2.00),
(8, 16, 1, 1, 1.00),
(9, 17, 1, 1, 1.00),
(10, 19, 1, 1, 1.00),
(11, 21, 1, 1, 1.00),
(12, 23, 1, 1, 1.00),
(13, 23, 2, 1, 2.00),
(14, 24, 1, 1, 1.00),
(15, 24, 2, 1, 2.00),
(17, 39, 1, 1, 1.00),
(18, 47, 1, 1, 1.00);

-- --------------------------------------------------------

--
-- Table structure for table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
  `id` bigint(11) NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `can_read` tinyint(1) NOT NULL DEFAULT 0,
  `can_write` tinyint(1) DEFAULT 0,
  `can_edit` tinyint(1) NOT NULL DEFAULT 0,
  `can_delete` tinyint(1) DEFAULT 0,
  `date_created` datetime NOT NULL,
  `isArchive` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles_permissions`
--

INSERT INTO `roles_permissions` (`id`, `role_name`, `can_read`, `can_write`, `can_edit`, `can_delete`, `date_created`, `isArchive`) VALUES
(1, 'Administrator', 1, 1, 1, 1, '2024-10-07 16:10:31', 0),
(7, 'Manager', 1, 1, 1, 0, '2024-10-07 20:07:58', 0),
(8, 'Delivery  Staff', 1, 0, 0, 0, '2024-10-07 20:10:06', 0),
(9, 'Store Staff', 1, 0, 1, 0, '2024-10-07 20:35:29', 0),
(10, 'Inventory Staff', 1, 0, 0, 0, '2024-10-09 06:54:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `service_progress`
--

CREATE TABLE `service_progress` (
  `id` bigint(20) NOT NULL,
  `service_request_id` bigint(20) NOT NULL,
  `stage` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status_date` datetime DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `false_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_progress`
--

INSERT INTO `service_progress` (`id`, `service_request_id`, `stage`, `description`, `status_date`, `completed`, `false_description`) VALUES
(171, 65, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-16 16:57:16', 1, 'Pickup request received; waiting for staff assignment.'),
(172, 65, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-16 21:55:45', 1, 'Pickup has not yet started.'),
(173, 65, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-16 21:55:45', 1, 'Pickup has not been completed.'),
(174, 65, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(175, 65, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(176, 65, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(177, 65, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(178, 65, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(179, 65, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(180, 65, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(181, 69, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 04:27:31', 1, 'Pickup request received; waiting for staff assignment.'),
(182, 69, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 04:27:46', 1, 'Pickup has not yet started.'),
(183, 69, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 04:27:46', 1, 'Pickup has not been completed.'),
(184, 69, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 05:21:27', 1, 'The clothes have not yet arrived at the store.'),
(185, 69, 'In Queue', 'Waiting for processing.', '2024-10-18 05:21:27', 1, 'Not yet in queue for processing.'),
(186, 69, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 05:24:03', 1, 'Laundry has not started processing yet.'),
(187, 69, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(188, 69, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(189, 69, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(190, 69, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(191, 70, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 05:40:04', 1, 'Pickup request received; waiting for staff assignment.'),
(192, 70, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 05:40:15', 1, 'Pickup has not yet started.'),
(193, 70, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 05:40:15', 1, 'Pickup has not been completed.'),
(194, 70, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 05:40:27', 1, 'The clothes have not yet arrived at the store.'),
(195, 70, 'In Queue', 'Waiting for processing.', '2024-10-18 05:40:27', 1, 'Not yet in queue for processing.'),
(196, 70, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 05:40:54', 1, 'Laundry has not started processing yet.'),
(197, 70, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(198, 70, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(199, 70, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(200, 70, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(201, 71, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 05:42:47', 1, 'Pickup request received; waiting for staff assignment.'),
(202, 71, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 05:42:55', 1, 'Pickup has not yet started.'),
(203, 71, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 05:42:55', 1, 'Pickup has not been completed.'),
(204, 71, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 05:43:05', 1, 'The clothes have not yet arrived at the store.'),
(205, 71, 'In Queue', 'Waiting for processing.', '2024-10-18 05:43:05', 1, 'Not yet in queue for processing.'),
(206, 71, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 05:43:36', 1, 'Laundry has not started processing yet.'),
(207, 71, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(208, 71, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(209, 71, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(210, 71, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(211, 72, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 07:12:12', 1, 'Pickup request received; waiting for staff assignment.'),
(212, 72, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 07:12:42', 1, 'Pickup has not yet started.'),
(213, 72, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 07:12:42', 1, 'Pickup has not been completed.'),
(214, 72, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 07:12:52', 1, 'The clothes have not yet arrived at the store.'),
(215, 72, 'In Queue', 'Waiting for processing.', '2024-10-18 07:12:52', 1, 'Not yet in queue for processing.'),
(216, 72, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 07:13:03', 1, 'Laundry has not started processing yet.'),
(217, 72, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(218, 72, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(219, 72, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(220, 72, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(221, 73, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 07:27:27', 1, 'Pickup request received; waiting for staff assignment.'),
(222, 73, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 07:27:35', 1, 'Pickup has not yet started.'),
(223, 73, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 07:27:35', 1, 'Pickup has not been completed.'),
(224, 73, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 07:27:50', 1, 'The clothes have not yet arrived at the store.'),
(225, 73, 'In Queue', 'Waiting for processing.', '2024-10-18 07:27:50', 1, 'Not yet in queue for processing.'),
(226, 73, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 07:28:06', 1, 'Laundry has not started processing yet.'),
(227, 73, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(228, 73, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(229, 73, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(230, 73, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(231, 74, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 07:41:17', 1, 'Pickup request received; waiting for staff assignment.'),
(232, 74, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 07:41:20', 1, 'Pickup has not yet started.'),
(233, 74, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 07:41:20', 1, 'Pickup has not been completed.'),
(234, 74, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 07:42:57', 1, 'The clothes have not yet arrived at the store.'),
(235, 74, 'In Queue', 'Waiting for processing.', '2024-10-18 07:42:57', 1, 'Not yet in queue for processing.'),
(236, 74, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 07:43:07', 1, 'Laundry has not started processing yet.'),
(237, 74, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(238, 74, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(239, 74, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(240, 74, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(241, 75, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 07:55:58', 1, 'Pickup request received; waiting for staff assignment.'),
(242, 75, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 07:56:03', 1, 'Pickup has not yet started.'),
(243, 75, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 07:56:03', 1, 'Pickup has not been completed.'),
(244, 75, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 07:56:08', 1, 'The clothes have not yet arrived at the store.'),
(245, 75, 'In Queue', 'Waiting for processing.', '2024-10-18 07:56:08', 1, 'Not yet in queue for processing.'),
(246, 75, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 07:56:13', 1, 'Laundry has not started processing yet.'),
(247, 75, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(248, 75, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(249, 75, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(250, 75, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(251, 76, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 09:13:16', 1, 'Pickup request received; waiting for staff assignment.'),
(252, 76, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 09:13:36', 1, 'Pickup has not yet started.'),
(253, 76, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 09:13:36', 1, 'Pickup has not been completed.'),
(254, 76, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 09:30:04', 1, 'The clothes have not yet arrived at the store.'),
(255, 76, 'In Queue', 'Waiting for processing.', '2024-10-18 09:30:04', 1, 'Not yet in queue for processing.'),
(256, 76, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 09:30:15', 1, 'Laundry has not started processing yet.'),
(257, 76, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(258, 76, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(259, 76, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(260, 76, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(261, 77, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 09:29:29', 1, 'Pickup request received; waiting for staff assignment.'),
(262, 77, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 09:29:54', 1, 'Pickup has not yet started.'),
(263, 77, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 09:29:54', 1, 'Pickup has not been completed.'),
(264, 77, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 09:30:19', 1, 'The clothes have not yet arrived at the store.'),
(265, 77, 'In Queue', 'Waiting for processing.', '2024-10-18 09:30:19', 1, 'Not yet in queue for processing.'),
(266, 77, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 09:37:46', 1, 'Laundry has not started processing yet.'),
(267, 77, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(268, 77, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(269, 77, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(270, 77, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(271, 78, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 09:39:31', 1, 'Pickup request received; waiting for staff assignment.'),
(272, 78, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 09:39:36', 1, 'Pickup has not yet started.'),
(273, 78, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 09:39:36', 1, 'Pickup has not been completed.'),
(274, 78, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 09:40:17', 1, 'The clothes have not yet arrived at the store.'),
(275, 78, 'In Queue', 'Waiting for processing.', '2024-10-18 09:40:17', 1, 'Not yet in queue for processing.'),
(276, 78, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 09:40:21', 1, 'Laundry has not started processing yet.'),
(277, 78, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(278, 78, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(279, 78, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(280, 78, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(281, 79, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 09:43:00', 1, 'Pickup request received; waiting for staff assignment.'),
(282, 79, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 09:43:08', 1, 'Pickup has not yet started.'),
(283, 79, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 09:43:08', 1, 'Pickup has not been completed.'),
(284, 79, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 09:43:14', 1, 'The clothes have not yet arrived at the store.'),
(285, 79, 'In Queue', 'Waiting for processing.', '2024-10-18 09:43:14', 1, 'Not yet in queue for processing.'),
(286, 79, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 09:43:19', 1, 'Laundry has not started processing yet.'),
(287, 79, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(288, 79, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(289, 79, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(290, 79, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(291, 80, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 12:26:55', 1, 'Pickup request received; waiting for staff assignment.'),
(292, 80, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 12:27:12', 1, 'Pickup has not yet started.'),
(293, 80, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 12:27:39', 1, 'Pickup has not been completed.'),
(294, 80, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 12:28:14', 1, 'The clothes have not yet arrived at the store.'),
(295, 80, 'In Queue', 'Waiting for processing.', '2024-10-18 12:28:14', 1, 'Not yet in queue for processing.'),
(296, 80, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 12:28:26', 1, 'Laundry has not started processing yet.'),
(297, 80, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(298, 80, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(299, 80, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(300, 80, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(301, 81, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 12:28:00', 1, 'Pickup request received; waiting for staff assignment.'),
(302, 81, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 12:28:06', 1, 'Pickup has not yet started.'),
(303, 81, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 12:28:06', 1, 'Pickup has not been completed.'),
(304, 81, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 12:28:30', 1, 'The clothes have not yet arrived at the store.'),
(305, 81, 'In Queue', 'Waiting for processing.', '2024-10-18 12:28:30', 1, 'Not yet in queue for processing.'),
(306, 81, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 12:28:37', 1, 'Laundry has not started processing yet.'),
(307, 81, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(308, 81, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(309, 81, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(310, 81, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(311, 82, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 12:29:48', 1, 'Pickup request received; waiting for staff assignment.'),
(312, 82, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 12:29:54', 1, 'Pickup has not yet started.'),
(313, 82, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 12:29:54', 1, 'Pickup has not been completed.'),
(314, 82, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 12:29:59', 1, 'The clothes have not yet arrived at the store.'),
(315, 82, 'In Queue', 'Waiting for processing.', '2024-10-18 12:29:59', 1, 'Not yet in queue for processing.'),
(316, 82, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 12:31:30', 1, 'Laundry has not started processing yet.'),
(317, 82, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(318, 82, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(319, 82, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(320, 82, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(321, 83, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 12:31:50', 1, 'Pickup request received; waiting for staff assignment.'),
(322, 83, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 12:31:51', 1, 'Pickup has not yet started.'),
(323, 83, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 12:31:51', 1, 'Pickup has not been completed.'),
(324, 83, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 12:31:59', 1, 'The clothes have not yet arrived at the store.'),
(325, 83, 'In Queue', 'Waiting for processing.', '2024-10-18 12:31:59', 1, 'Not yet in queue for processing.'),
(326, 83, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 12:32:04', 1, 'Laundry has not started processing yet.'),
(327, 83, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(328, 83, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(329, 83, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(330, 83, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(331, 84, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 12:32:52', 1, 'Pickup request received; waiting for staff assignment.'),
(332, 84, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 12:32:56', 1, 'Pickup has not yet started.'),
(333, 84, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 12:32:56', 1, 'Pickup has not been completed.'),
(334, 84, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 12:33:02', 1, 'The clothes have not yet arrived at the store.'),
(335, 84, 'In Queue', 'Waiting for processing.', '2024-10-18 12:33:02', 1, 'Not yet in queue for processing.'),
(336, 84, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 12:33:06', 1, 'Laundry has not started processing yet.'),
(337, 84, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(338, 84, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(339, 84, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(340, 84, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(341, 85, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 12:34:06', 1, 'Pickup request received; waiting for staff assignment.'),
(342, 85, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 12:34:12', 1, 'Pickup has not yet started.'),
(343, 85, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 12:34:12', 1, 'Pickup has not been completed.'),
(344, 85, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 12:34:18', 1, 'The clothes have not yet arrived at the store.'),
(345, 85, 'In Queue', 'Waiting for processing.', '2024-10-18 12:34:18', 1, 'Not yet in queue for processing.'),
(346, 85, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 12:34:23', 1, 'Laundry has not started processing yet.'),
(347, 85, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(348, 85, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(349, 85, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(350, 85, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(351, 92, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 15:28:29', 1, 'Pickup request received; waiting for staff assignment.'),
(352, 92, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 15:29:18', 1, 'Pickup has not yet started.'),
(353, 92, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 15:29:18', 1, 'Pickup has not been completed.'),
(354, 92, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 15:29:31', 1, 'The clothes have not yet arrived at the store.'),
(355, 92, 'In Queue', 'Waiting for processing.', '2024-10-18 15:29:31', 1, 'Not yet in queue for processing.'),
(356, 92, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 15:29:38', 1, 'Laundry has not started processing yet.'),
(357, 92, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(358, 92, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(359, 92, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(360, 92, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(361, 94, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 15:48:28', 1, 'Pickup request received; waiting for staff assignment.'),
(362, 94, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 15:48:28', 1, 'Pickup has not yet started.'),
(363, 94, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 15:48:28', 1, 'Pickup has not been completed.'),
(364, 94, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 15:48:28', 1, 'The clothes have not yet arrived at the store.'),
(365, 94, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(366, 94, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 15:48:28', 1, 'Laundry has not started processing yet.'),
(367, 94, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(368, 94, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(369, 94, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(370, 94, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(391, 97, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 15:55:36', 1, 'Pickup request received; waiting for staff assignment.'),
(392, 97, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 15:55:36', 1, 'Pickup has not yet started.'),
(393, 97, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 15:55:36', 1, 'Pickup has not been completed.'),
(394, 97, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 15:55:36', 1, 'The clothes have not yet arrived at the store.'),
(395, 97, 'In Queue', 'Waiting for processing.', '2024-10-18 15:55:36', 1, 'Not yet in queue for processing.'),
(396, 97, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 15:55:36', 1, 'Laundry has not started processing yet.'),
(397, 97, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(398, 97, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(399, 97, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(400, 97, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(401, 98, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 15:56:34', 1, 'Pickup request received; waiting for staff assignment.'),
(402, 98, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 15:56:35', 1, 'Pickup has not yet started.'),
(403, 98, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 15:56:35', 1, 'Pickup has not been completed.'),
(404, 98, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 15:56:35', 1, 'The clothes have not yet arrived at the store.'),
(405, 98, 'In Queue', 'Waiting for processing.', '2024-10-18 15:56:35', 1, 'Not yet in queue for processing.'),
(406, 98, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 15:56:35', 1, 'Laundry has not started processing yet.'),
(407, 98, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(408, 98, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(409, 98, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(410, 98, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(411, 99, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 15:56:57', 1, 'Pickup request received; waiting for staff assignment.'),
(412, 99, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 15:56:57', 1, 'Pickup has not yet started.'),
(413, 99, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 15:56:57', 1, 'Pickup has not been completed.'),
(414, 99, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 15:56:57', 1, 'The clothes have not yet arrived at the store.'),
(415, 99, 'In Queue', 'Waiting for processing.', '2024-10-18 15:56:57', 1, 'Not yet in queue for processing.'),
(416, 99, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 15:56:57', 1, 'Laundry has not started processing yet.'),
(417, 99, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(418, 99, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(419, 99, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(420, 99, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(421, 100, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 15:59:03', 1, 'Pickup request received; waiting for staff assignment.'),
(422, 100, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 15:59:03', 1, 'Pickup has not yet started.'),
(423, 100, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 15:59:03', 1, 'Pickup has not been completed.'),
(424, 100, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 15:59:03', 1, 'The clothes have not yet arrived at the store.'),
(425, 100, 'In Queue', 'Waiting for processing.', '2024-10-18 15:59:03', 1, 'Not yet in queue for processing.'),
(426, 100, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 15:59:03', 1, 'Laundry has not started processing yet.'),
(427, 100, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(428, 100, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(429, 100, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(430, 100, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(431, 101, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:02:43', 1, 'Pickup request received; waiting for staff assignment.'),
(432, 101, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 16:02:43', 1, 'Pickup has not yet started.'),
(433, 101, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 16:02:43', 1, 'Pickup has not been completed.'),
(434, 101, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 16:02:43', 1, 'The clothes have not yet arrived at the store.'),
(435, 101, 'In Queue', 'Waiting for processing.', '2024-10-18 16:02:43', 1, 'Not yet in queue for processing.'),
(436, 101, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 16:02:43', 1, 'Laundry has not started processing yet.'),
(437, 101, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(438, 101, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(439, 101, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(440, 101, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(441, 102, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:03:05', 1, 'Pickup request received; waiting for staff assignment.'),
(442, 102, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 16:03:05', 1, 'Pickup has not yet started.'),
(443, 102, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 16:03:05', 1, 'Pickup has not been completed.'),
(444, 102, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 16:03:05', 1, 'The clothes have not yet arrived at the store.'),
(445, 102, 'In Queue', 'Waiting for processing.', '2024-10-18 16:03:05', 1, 'Not yet in queue for processing.'),
(446, 102, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 16:03:05', 1, 'Laundry has not started processing yet.'),
(447, 102, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(448, 102, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(449, 102, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(450, 102, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(451, 103, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:03:24', 1, 'Pickup request received; waiting for staff assignment.'),
(452, 103, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 16:03:24', 1, 'Pickup has not yet started.'),
(453, 103, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 16:03:24', 1, 'Pickup has not been completed.'),
(454, 103, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 16:03:24', 1, 'The clothes have not yet arrived at the store.'),
(455, 103, 'In Queue', 'Waiting for processing.', '2024-10-18 16:03:24', 1, 'Not yet in queue for processing.'),
(456, 103, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 16:03:24', 1, 'Laundry has not started processing yet.'),
(457, 103, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(458, 103, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(459, 103, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(460, 103, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(461, 104, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:03:41', 1, 'Pickup request received; waiting for staff assignment.'),
(462, 104, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 16:03:41', 1, 'Pickup has not yet started.'),
(463, 104, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 16:03:41', 1, 'Pickup has not been completed.'),
(464, 104, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 16:03:41', 1, 'The clothes have not yet arrived at the store.'),
(465, 104, 'In Queue', 'Waiting for processing.', '2024-10-18 16:03:41', 1, 'Not yet in queue for processing.'),
(466, 104, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 16:03:41', 1, 'Laundry has not started processing yet.'),
(467, 104, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(468, 104, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(469, 104, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(470, 104, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(471, 105, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:07:52', 1, 'Pickup request received; waiting for staff assignment.'),
(472, 105, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 16:07:52', 1, 'Pickup has not yet started.'),
(473, 105, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 16:07:52', 1, 'Pickup has not been completed.'),
(474, 105, 'At Store', 'Dropped off at the laundry store.', '2024-10-18 16:07:52', 1, 'The clothes have not yet arrived at the store.'),
(475, 105, 'In Queue', 'Waiting for processing.', '2024-10-18 16:07:52', 1, 'Not yet in queue for processing.'),
(476, 105, 'In Laundry', 'Currently being washed/dried.', '2024-10-18 16:07:52', 1, 'Laundry has not started processing yet.'),
(477, 105, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(478, 105, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(479, 105, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(480, 105, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(481, 106, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:35:14', 1, 'Pickup request received; waiting for staff assignment.'),
(482, 106, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-18 16:35:22', 1, 'Pickup has not yet started.'),
(483, 106, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-18 16:35:22', 1, 'Pickup has not been completed.'),
(484, 106, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(485, 106, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(486, 106, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(487, 106, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(488, 106, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(489, 106, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(490, 106, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(491, 107, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 16:44:01', 1, 'Pickup request received; waiting for staff assignment.'),
(492, 107, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(493, 107, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(494, 107, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(495, 107, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(496, 107, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(497, 107, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(498, 107, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(499, 107, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(500, 107, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(501, 108, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 17:14:42', 1, 'Pickup request received; waiting for staff assignment.'),
(502, 108, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(503, 108, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(504, 108, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(505, 108, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(506, 108, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(507, 108, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(508, 108, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(509, 108, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(510, 108, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(511, 109, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-18 17:22:30', 1, 'Pickup request received; waiting for staff assignment.'),
(512, 109, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(513, 109, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(514, 109, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(515, 109, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(516, 109, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(517, 109, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(518, 109, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(519, 109, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(520, 109, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

-- --------------------------------------------------------

--
-- Table structure for table `service_promo`
--

CREATE TABLE `service_promo` (
  `id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `valid_days` varchar(100) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL,
  `isArchive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `tracking_code` varchar(255) NOT NULL,
  `customer_fullname` varchar(255) NOT NULL,
  `customer_type` varchar(10) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT current_timestamp(),
  `pickup_date` timestamp NULL DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `request_status` varchar(100) DEFAULT NULL,
  `qr_code` varchar(255) NOT NULL,
  `qr_code_generated` tinyint(1) NOT NULL,
  `isPickup` tinyint(1) NOT NULL DEFAULT 0,
  `isDelivery` tinyint(1) NOT NULL DEFAULT 0,
  `payment_method` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_request`
--

INSERT INTO `service_request` (`id`, `store_id`, `user_id`, `customer_id`, `service_type_id`, `tracking_code`, `customer_fullname`, `customer_type`, `notes`, `request_date`, `pickup_date`, `delivery_date`, `request_status`, `qr_code`, `qr_code_generated`, `isPickup`, `isDelivery`, `payment_method`) VALUES
(65, 1, 6, 1, 1, '#AFF9D58E4B5745618864', 'Rose Oriana', 'Online', '', '2024-10-16 08:57:16', '2024-10-16 13:55:45', NULL, 'Canceled', 'SR-65-#AFF9D58E4B5745618864', 1, 1, 0, ''),
(67, 1, 1, 2, 1, '#47346C3F010841D9B143', 'P., Junjun Santos', 'Walk-In', '', '2024-10-16 14:23:47', NULL, NULL, 'Canceled', '', 0, 1, 0, ''),
(68, 1, 1, 3, 1, '#96E81470AC75441B9E2F', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-16 23:13:04', NULL, NULL, 'Canceled', '', 0, 1, 0, ''),
(69, 1, 6, 3, 1, '#CD53247764C3447AB764', 'Alexia Midgar', 'Online', '', '2024-10-17 20:27:31', '2024-10-17 20:27:46', NULL, 'Canceled', 'SR-69-#CD53247764C3447AB764', 1, 1, 0, ''),
(70, 1, 6, 3, 1, '#344CD08A67BD426C907C', 'Alexia Midgar', 'Online', '', '2024-10-17 21:40:04', '2024-10-17 21:40:15', NULL, 'Canceled', 'SR-70-#344CD08A67BD426C907C', 1, 1, 0, ''),
(71, 1, 6, 3, 1, '#A5EDB41CFE3442AB99DE', 'Alexia Midgar', 'Online', '', '2024-10-17 21:42:47', '2024-10-17 21:42:55', NULL, 'Canceled', 'SR-71-#A5EDB41CFE3442AB99DE', 1, 1, 0, ''),
(72, 1, 6, 3, 1, '#DE4C5954E9A5473684AC', 'Alexia Midgar', 'Online', '', '2024-10-17 23:12:12', '2024-10-17 23:12:42', NULL, 'Canceled', 'SR-72-#DE4C5954E9A5473684AC', 1, 1, 0, ''),
(73, 1, 6, 3, 1, '#A80D5CDE34F24754BCE9', 'Alexia Midgar', 'Online', '', '2024-10-17 23:27:27', '2024-10-17 23:27:35', NULL, 'Canceled', 'SR-73-#A80D5CDE34F24754BCE9', 1, 1, 0, ''),
(74, 1, 6, 3, 1, '#804078D6954440C28E83', 'Alexia Midgar', 'Online', '', '2024-10-17 23:41:17', '2024-10-17 23:41:20', NULL, 'Canceled', 'SR-74-#804078D6954440C28E83', 1, 1, 0, ''),
(75, 1, 6, 3, 1, '#17056C6F9E6C4A39B5C2', 'Alexia Midgar', 'Online', '', '2024-10-17 23:55:58', '2024-10-17 23:56:03', NULL, 'Canceled', 'SR-75-#17056C6F9E6C4A39B5C2', 1, 1, 0, ''),
(76, 1, 6, 3, 1, '#0F0561EB33E448C6B7F3', 'Alexia Midgar', 'Online', '', '2024-10-18 01:13:16', '2024-10-18 01:13:36', NULL, 'Canceled', 'SR-76-#0F0561EB33E448C6B7F3', 1, 1, 0, ''),
(77, 1, 6, 3, 2, '#BC34A89ED6424A53BC10', 'Alexia Midgar', 'Online', '', '2024-10-18 01:29:29', '2024-10-18 01:29:54', NULL, 'Canceled', 'SR-77-#BC34A89ED6424A53BC10', 1, 1, 0, ''),
(78, 1, 6, 3, 1, '#0D7F95CF4B174BD0A7F8', 'Alexia Midgar', 'Online', '', '2024-10-18 01:39:31', '2024-10-18 01:39:36', NULL, 'Canceled', 'SR-78-#0D7F95CF4B174BD0A7F8', 1, 1, 0, ''),
(79, 1, 6, 3, 1, '#9C176DA6A87647B2B3F2', 'Alexia Midgar', 'Online', '', '2024-10-18 01:43:00', '2024-10-18 01:43:08', NULL, 'Canceled', 'SR-79-#9C176DA6A87647B2B3F2', 1, 1, 0, ''),
(80, 1, 6, 1, 6, '#546209D6FBA64248989F', 'Rose Oriana', 'Online', '', '2024-10-18 04:26:55', '2024-10-18 04:27:39', NULL, 'Canceled', 'SR-80-#546209D6FBA64248989F', 1, 1, 0, ''),
(81, 1, 6, 1, 5, '#D4150D39B35F4178A8AC', 'Rose Oriana', 'Online', '', '2024-10-18 04:28:00', '2024-10-18 04:28:06', NULL, 'Canceled', 'SR-81-#D4150D39B35F4178A8AC', 1, 1, 0, ''),
(82, 1, 6, 1, 6, '#F4FCAC26D03A43E5BC5C', 'Rose Oriana', 'Online', '11', '2024-10-18 04:29:48', '2024-10-18 04:29:54', NULL, 'Canceled', 'SR-82-#F4FCAC26D03A43E5BC5C', 1, 1, 0, ''),
(83, 1, 6, 1, 6, '#51B325C096064B43B295', 'Rose Oriana', 'Online', '', '2024-10-18 04:31:50', '2024-10-18 04:31:51', NULL, 'Canceled', 'SR-83-#51B325C096064B43B295', 1, 1, 0, ''),
(84, 1, 6, 1, 1, '#5BA45C233FCD44658B7F', 'Rose Oriana', 'Online', '', '2024-10-18 04:32:52', '2024-10-18 04:32:56', NULL, 'Canceled', 'SR-84-#5BA45C233FCD44658B7F', 1, 1, 0, ''),
(85, 1, 6, 1, 1, '#7A6098C985314BE391B5', 'Rose Oriana', 'Online', '', '2024-10-18 04:34:06', '2024-10-18 04:34:12', NULL, 'Canceled', 'SR-85-#7A6098C985314BE391B5', 1, 1, 0, ''),
(86, 1, 1, 3, 1, '#34D988FD1AFD42C29DB7', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:03:09', NULL, NULL, 'Canceled', '', 0, 1, 0, ''),
(87, 1, 1, 3, 1, '#F2FF351FBE3D48D4A48C', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:05:37', '0000-00-00 00:00:00', NULL, 'Canceled', '', 0, 1, 0, ''),
(88, 1, 1, 3, 1, '#758B6234020941AE9D44', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:08:28', '0000-00-00 00:00:00', NULL, 'Canceled', '', 0, 1, 0, ''),
(89, 1, 1, 3, 1, '#F5FF0BBCD505491C97E7', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:16:04', '2024-10-18 07:15:46', NULL, 'Canceled', '', 0, 1, 0, ''),
(90, 1, 1, 1, 1, '#41041B67CEBB4C248DB1', 'Oriana, Rose ', 'Walk-In', '', '2024-10-18 07:17:35', NULL, NULL, 'Canceled', '', 0, 1, 0, ''),
(91, 1, 1, 3, 1, '#ED8B0F42198D4718B088', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:18:28', '2024-10-18 07:18:28', NULL, 'Canceled', '', 0, 1, 0, ''),
(92, 1, 6, 1, 5, '#1BFC4287CA9C4F538261', 'Rose Oriana', 'Online', '', '2024-10-18 07:28:29', '2024-10-18 07:29:18', NULL, 'Canceled', 'SR-92-#1BFC4287CA9C4F538261', 1, 1, 0, ''),
(94, 1, 1, 3, 1, '#223367C7F0394E2BA644', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:48:28', '2024-10-18 07:48:06', NULL, 'Canceled', 'SR-94-#223367C7F0394E2BA644', 1, 1, 0, ''),
(97, 1, 1, 3, 1, '#B6C795E3C88A4FD5BF6F', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:55:36', '2024-10-18 07:55:17', NULL, 'Canceled', 'SR-97-#B6C795E3C88A4FD5BF6F', 1, 1, 0, ''),
(98, 1, 1, 3, 1, '#E4E5B544853B44D1BDCF', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:56:34', '2024-10-18 07:55:52', NULL, 'Canceled', 'SR-98-#E4E5B544853B44D1BDCF', 1, 1, 0, ''),
(99, 1, 1, 3, 6, '#FE4A8DE3DFA9465DB578', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:56:57', '2024-10-18 07:55:52', NULL, 'Canceled', 'SR-99-#FE4A8DE3DFA9465DB578', 1, 1, 0, ''),
(100, 1, 1, 3, 5, '#72C334DB35194984AE5E', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 07:59:03', '2024-10-18 07:55:52', NULL, 'Canceled', 'SR-100-#72C334DB35194984AE5E', 1, 1, 0, ''),
(101, 1, 1, 3, 1, '#631E7EC8CACC48449FFF', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 08:02:43', '2024-10-18 08:01:03', NULL, 'Canceled', 'SR-101-#631E7EC8CACC48449FFF', 1, 1, 0, ''),
(102, 1, 1, 3, 1, '#A58413895B624CC19D6C', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 08:03:05', '2024-10-18 08:01:03', NULL, 'Canceled', 'SR-102-#A58413895B624CC19D6C', 1, 1, 0, ''),
(103, 1, 1, 3, 1, '#89B34AFECF3E4CE98043', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 08:03:24', '2024-10-18 08:01:03', NULL, 'Canceled', 'SR-103-#89B34AFECF3E4CE98043', 1, 1, 0, ''),
(104, 1, 1, 3, 6, '#F8FDAF00057B40AAB14D', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 08:03:41', '2024-10-18 08:01:03', NULL, 'Canceled', 'SR-104-#F8FDAF00057B40AAB14D', 1, 1, 0, ''),
(105, 1, 1, 3, 1, '#90B9B8965587407D8CAC', 'Midgar, Alexia R', 'Walk-In', '', '2024-10-18 08:07:52', '2024-10-18 08:01:03', NULL, 'In Laundry', 'SR-105-#90B9B8965587407D8CAC', 1, 1, 0, ''),
(106, 1, 6, 1, 5, '#2AA224F1019B487C85CF', 'Rose Oriana', 'Online', '', '2024-10-18 08:35:14', '2024-10-18 08:35:22', NULL, 'Completed Pickup', 'SR-106-#2AA224F1019B487C85CF', 1, 1, 0, ''),
(107, 1, NULL, 1, 2, '#F3D0075132CB4ECC849F', 'Rose Oriana', 'Online', '', '2024-10-18 08:44:01', NULL, NULL, 'Pending Pickup', 'SR-107-#F3D0075132CB4ECC849F', 1, 0, 0, ''),
(108, 1, NULL, 1, 3, '#011DB5AFA7384E87A447', 'Rose Oriana', 'Online', '', '2024-10-18 09:14:42', NULL, NULL, 'Pending Pickup', 'SR-108-#011DB5AFA7384E87A447', 1, 0, 0, ''),
(109, 1, NULL, 1, 1, '#B273A68E3B534F5498D8', 'Rose Oriana', 'Online', '', '2024-10-18 09:22:30', NULL, NULL, 'Pending Pickup', 'SR-109-#B273A68E3B534F5498D8', 1, 0, 0, 'Cash on Delivery');

-- --------------------------------------------------------

--
-- Table structure for table `service_type`
--

CREATE TABLE `service_type` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `default_price` decimal(10,2) NOT NULL,
  `date_created` datetime NOT NULL,
  `isArchive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_type`
--

INSERT INTO `service_type` (`id`, `store_id`, `service_name`, `description`, `default_price`, `date_created`, `isArchive`) VALUES
(1, 1, 'Wash', 'Basic wash services', 60.00, '2024-10-07 16:10:31', 0),
(2, 1, 'Dry', 'Basic dry services', 65.00, '2024-10-07 16:10:31', 0),
(3, 1, 'Fold', 'Basic fold services', 30.00, '2024-10-07 16:10:31', 0),
(5, 1, 'Wash/Dry', 'Wash + Dry Services', 125.00, '2024-10-11 20:00:51', 0),
(6, 1, 'Wash/Dry/Fold', 'All service package', 155.00, '2024-10-11 20:16:13', 0),
(7, 1, '1', '1', 1.00, '2024-10-18 05:49:06', 1);

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
(1, 1, 'LIZASO-1728288631238', 'Lizaso Laundry Hub', 'Main Contact', '', 1, '0000-00-00 00:00:00', '2024-10-07 16:10:31', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL,
  `assignment_id` bigint(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `role_permissions_id` bigint(20) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `isOnline` tinyint(4) NOT NULL,
  `isStatus` tinyint(1) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `store_id`, `role_permissions_id`, `username`, `email`, `mobile_number`, `first_name`, `middle_name`, `last_name`, `isOnline`, `isStatus`, `isArchive`, `date_created`) VALUES
(1, 1, 1, 'admin', 'admin@example.com', '', 'Admin', '', 'User', 1, 0, 0, '2024-10-07 16:10:31'),
(6, 1, 8, 'juan12', '', '09123456789', 'Juan', '', 'Tamad', 0, 1, 0, '2024-10-10 08:13:43'),
(7, 1, 7, 'reynald12', '', '09472727061', 'John Reynald', 'P', 'Velarde', 1, 0, 0, '2024-10-11 06:22:58');

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
(1, 1, '$2b$10$IO6WzkgUUqM7lsgxNvvBz.Kr20U.JngTP5NRivci4oaw.zSu3U6BK', '$2b$10$Vs6ToZQr/kumhWQ490rfge', 0, '', 0, 0, '2024-10-07 08:10:31', NULL, NULL, NULL),
(2, 2, '$2b$12$VO1Yy0JLuQ4/PM4fV26zhuZI4mKksdFiY0yduLyijB0AZuHrOlrLu', '$2b$12$gkdqj0sdFh9Nrr8cgm8oGO', 0, '', 0, 0, '2024-10-08 19:42:24', NULL, NULL, '2024-10-08 19:42:24'),
(3, 3, '$2b$12$FGXjh98pYgzkYQ2kJ.lVlOYKi/yJSbQ8393mI4HGWTpKbEinQUBQO', '$2b$12$2XZlCVoPIaCJf6ack/Xd4.', 0, '', 0, 0, '2024-10-08 20:15:17', NULL, NULL, '2024-10-08 20:15:17'),
(4, 4, '$2b$12$W/W2roYNSzudW68IxqHZhekKTh/GM3AcfnFFgfYkfxi9Jg48/DP32', '$2b$12$X0GYt.Jvv3fKZr/lGvmUs.', 0, '', 0, 0, '2024-10-08 21:25:00', NULL, NULL, '2024-10-08 21:25:00'),
(5, 5, '$2b$12$OoGkK1B.N7nQWLPbZjoYY.CUigpTi3N.ZmbyOPybm77YYcViD12RK', '$2b$12$sfRoJ/bOs6NeCgawhqTZ3O', 0, '', 0, 0, '2024-10-08 23:25:48', NULL, NULL, '2024-10-08 23:25:48'),
(6, 6, '$2b$12$cGRJfYvOkXk0Ys.ob1MaIeNjcbk40xtFSld29n/3/XqtUpGyDTrzK', '$2b$12$9cJx1w1I/7znFvqqnRxhNu', 0, '', 0, 0, '2024-10-10 00:13:43', NULL, NULL, '2024-10-10 00:13:43'),
(7, 7, '$2b$12$CcwIT62DatnrKSyPU5VnC.etPd6PgO5.IarDPYx1OSIM05PqaVW0K', '$2b$12$v.VRK1HvEqord/gwdLKCGu', 0, '', 0, 0, '2024-10-10 22:22:58', NULL, NULL, '2024-10-10 22:22:58');

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
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Conversations_Sender_User_Account` (`user_sender_id`),
  ADD KEY `Conversations_Receiver_User_Account` (`user_receiver_id`),
  ADD KEY `Conversations_Sender_Customer` (`customer_sender_id`),
  ADD KEY `Conversations_Receiver_Customer` (`customer_receiver_id`);

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
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Messages_Conversations` (`conversation_id`);

--
-- Indexes for table `related_item`
--
ALTER TABLE `related_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Related_Item_Laundry_Assignment` (`assignment_id`),
  ADD KEY `Related_Item_Inventory` (`inventory_id`);

--
-- Indexes for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_progress`
--
ALTER TABLE `service_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Service_Progress_Service_Request` (`service_request_id`);

--
-- Indexes for table `service_promo`
--
ALTER TABLE `service_promo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Service_Promotions_Service_Type` (`service_id`);

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
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_Account_Stores` (`store_id`),
  ADD KEY `User_Account_Roles_Permissions` (`role_permissions_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer_security`
--
ALTER TABLE `customer_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `related_item`
--
ALTER TABLE `related_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `service_progress`
--
ALTER TABLE `service_progress`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=521;

--
-- AUTO_INCREMENT for table `service_promo`
--
ALTER TABLE `service_promo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `Activity_Log_User_Account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `Conversations_Receiver_Customer` FOREIGN KEY (`customer_receiver_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Conversations_Receiver_User_Account` FOREIGN KEY (`user_receiver_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Conversations_Sender_Customer` FOREIGN KEY (`customer_sender_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Conversations_Sender_User_Account` FOREIGN KEY (`user_sender_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `Messages_Conversations` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `related_item`
--
ALTER TABLE `related_item`
  ADD CONSTRAINT `Related_Item_Inventory` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`),
  ADD CONSTRAINT `Related_Item_Laundry_Assignment` FOREIGN KEY (`assignment_id`) REFERENCES `laundry_assignment` (`id`);

--
-- Constraints for table `service_progress`
--
ALTER TABLE `service_progress`
  ADD CONSTRAINT `Service_Progress_Service_Request` FOREIGN KEY (`service_request_id`) REFERENCES `service_request` (`id`);

--
-- Constraints for table `service_promo`
--
ALTER TABLE `service_promo`
  ADD CONSTRAINT `Service_Promo_Service_Type` FOREIGN KEY (`service_id`) REFERENCES `service_type` (`id`);

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
  ADD CONSTRAINT `User_Account_Roles_Permissions` FOREIGN KEY (`role_permissions_id`) REFERENCES `roles_permissions` (`id`),
  ADD CONSTRAINT `User_Account_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
