-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2024 at 05:21 PM
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
(71, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-16 21:57:04');

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
(2, 1, 2, 2.00, 0, 0);

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
(4, 67, 1, 1, '1', '2024-10-16 22:23:47', NULL, 0, 0);

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
  `item_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(180, 65, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

-- --------------------------------------------------------

--
-- Table structure for table `service_promotions`
--

CREATE TABLE `service_promotions` (
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
  `isDelivery` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_request`
--

INSERT INTO `service_request` (`id`, `store_id`, `user_id`, `customer_id`, `service_type_id`, `tracking_code`, `customer_fullname`, `customer_type`, `notes`, `request_date`, `pickup_date`, `delivery_date`, `request_status`, `qr_code`, `qr_code_generated`, `isPickup`, `isDelivery`) VALUES
(65, 1, 6, 1, 1, '#AFF9D58E4B5745618864', 'Rose Oriana', 'Online', '', '2024-10-16 08:57:16', '2024-10-16 13:55:45', NULL, 'Completed Pickup', 'SR-65-#AFF9D58E4B5745618864', 1, 1, 0),
(67, 1, 1, 2, 1, '#47346C3F010841D9B143', 'P., Junjun Santos', 'Walk-In', '', '2024-10-16 14:23:47', NULL, NULL, 'In Laundry', '', 0, 1, 0);

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
(2, 1, 'Dry', '1', 55.00, '2024-10-07 16:10:31', 0),
(3, 1, 'Fold', '', 30.00, '2024-10-07 16:10:31', 0),
(5, 1, 'Wash/Dry', '', 120.00, '2024-10-11 20:00:51', 0),
(6, 1, 'Wash/Dry/Fold', '', 100.00, '2024-10-11 20:16:13', 0);

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
  ADD KEY `Related_Item_Laundry_Assignment` (`assignment_id`);

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
-- Indexes for table `service_promotions`
--
ALTER TABLE `service_promotions`
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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `service_progress`
--
ALTER TABLE `service_progress`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `service_promotions`
--
ALTER TABLE `service_promotions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `Related_Item_Item` FOREIGN KEY (`id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `Related_Item_Laundry_Assignment` FOREIGN KEY (`assignment_id`) REFERENCES `laundry_assignment` (`id`);

--
-- Constraints for table `service_progress`
--
ALTER TABLE `service_progress`
  ADD CONSTRAINT `Service_Progress_Service_Request` FOREIGN KEY (`service_request_id`) REFERENCES `service_request` (`id`);

--
-- Constraints for table `service_promotions`
--
ALTER TABLE `service_promotions`
  ADD CONSTRAINT `Service_Promotions_Service_Type` FOREIGN KEY (`service_id`) REFERENCES `service_type` (`id`);

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
