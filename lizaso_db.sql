-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2024 at 07:38 AM
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
(1, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-19 21:15:34'),
(2, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-19 22:35:13'),
(3, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-20 05:34:25'),
(4, 1, 'Administrator', 'authentication', 'admin logged in.', '2024-10-20 07:31:47');

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
(1, 'Balagtas', 'Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-10-19 13:15:27'),
(2, 'Perez, Bulakan, Bulacan', 'Perez, Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.766846, 120.896249, '2024-10-19 14:32:04'),
(3, 'Taliptip Bulakan, Bulacan', 'Taliptip Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.759256, 120.904878, '2024-10-19 23:30:32');

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
(1, 1, NULL, NULL, 2410192231000000, '1', '2024-10-20 01:51:23', '2024-10-19 21:44:51', '2024-10-20 01:51:23'),
(2, 1, NULL, NULL, 2410200729000000, '2', '2024-10-19 23:31:11', '2024-10-19 23:31:06', '2024-10-19 23:31:11');

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
(2410192231000000, 1, 2, 'Rose', '', 'Oriana', 'rose16', '09264545098', 'roseoriana16@gmail.com', 1, 1, 0, '2024-10-19 22:31:21'),
(2410200729000000, 1, 3, 'Alexia', '', 'Midgar', 'alexia16', '09785656051', 'alexia16@gmail.com', 1, 1, 0, '2024-10-20 07:29:52');

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
(12, 2410192231000000, '$2b$12$BdwzDItUXwZUl5NFOMQDNesFJtPAD3bUmBdjhH/peiBWwByIguGlW', '$2b$12$06v.JgBdbJ.ddslg7CIxEu', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(13, 2410200729000000, '$2b$12$ZHeV6VILia3/hFpJlpNVV.1DuX6nD./WWabrPc5EIBkZgPoEmiUHC', '$2b$12$DEkEDZHAyfvWEFJBsdEwN.', 0, '', 0, 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback_review`
--

CREATE TABLE `feedback_review` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL,
  `service_request_id` bigint(20) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_approved` tinyint(1) NOT NULL,
  `response` text DEFAULT NULL,
  `response_created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 1, 1, 1, '2', '2024-10-20 05:49:13', NULL, 1, 0),
(2, 2, 1, 1, '10', '2024-10-20 07:54:23', NULL, 1, 0),
(3, 3, 1, 1, '5', '2024-10-20 07:57:56', NULL, 1, 0),
(4, 4, 1, 1, '1', '2024-10-20 08:03:07', NULL, 1, 0),
(5, 7, 1, 1, '5', '2024-10-20 09:51:50', NULL, 1, 0),
(6, 8, 2, 1, '20', '2024-10-20 10:25:38', NULL, 1, 0),
(7, 10, 1, 1, '5', '2024-10-20 12:10:51', NULL, 0, 0),
(8, 12, 2, 1, '1', '2024-10-20 12:31:58', NULL, 0, 0);

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
(1, 1, 'Unit 1', '2024-10-19 21:17:58', 1, 0),
(2, 1, 'Unit 2', '2024-10-19 21:18:01', 1, 0);

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
(1, 1, 1, 2410192231000000, 'User', 'Customer', 'Hi po saan po bahay nila', '2024-10-19 21:44:51', 1),
(2, 1, 2410192231000000, 1, 'Customer', 'User', 'Dito sa my bandang kaitaasan', '2024-10-19 21:46:29', 1),
(3, 2, 1, 2410200729000000, 'User', 'Customer', '1', '2024-10-19 23:31:06', 1),
(4, 2, 2410200729000000, 1, 'Customer', 'User', '2', '2024-10-19 23:31:11', 1),
(5, 1, 1, 2410192231000000, 'User', 'Customer', '1', '2024-10-20 01:51:23', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `customer_id` bigint(20) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `link` text DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Administrator', 1, 1, 1, 1, '2024-10-19 21:15:27', 0),
(2, 'Manager', 1, 1, 1, 0, '2024-10-19 21:16:20', 0),
(3, 'Store Staff', 1, 1, 0, 0, '2024-10-19 21:16:36', 0),
(4, 'Delivery Staff', 1, 1, 0, 0, '2024-10-19 21:16:54', 0);

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
(1, 1, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 05:39:46', 1, 'Pickup request received; waiting for staff assignment.'),
(2, 1, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 05:44:31', 1, 'Pickup has not yet started.'),
(3, 1, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 05:46:41', 1, 'Pickup has not been completed.'),
(4, 1, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 05:47:37', 1, 'The clothes have not yet arrived at the store.'),
(5, 1, 'In Queue', 'Waiting for processing.', '2024-10-20 05:47:37', 1, 'Not yet in queue for processing.'),
(6, 1, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 05:49:13', 1, 'Laundry has not started processing yet.'),
(7, 1, 'Laundry Completed', 'Washing/drying finished.', '2024-10-20 07:50:18', 1, 'Laundry processing has not been completed.'),
(8, 1, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-20 07:50:18', 1, 'Laundry is not yet ready for delivery.'),
(9, 1, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(10, 1, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(11, 2, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 07:30:46', 1, 'Pickup request received; waiting for staff assignment.'),
(12, 2, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 07:30:52', 1, 'Pickup has not yet started.'),
(13, 2, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 07:31:19', 1, 'Pickup has not been completed.'),
(14, 2, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 07:54:17', 1, 'The clothes have not yet arrived at the store.'),
(15, 2, 'In Queue', 'Waiting for processing.', '2024-10-20 07:54:17', 1, 'Not yet in queue for processing.'),
(16, 2, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 07:54:23', 1, 'Laundry has not started processing yet.'),
(17, 2, 'Laundry Completed', 'Washing/drying finished.', '2024-10-20 07:54:32', 1, 'Laundry processing has not been completed.'),
(18, 2, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-20 07:54:32', 1, 'Laundry is not yet ready for delivery.'),
(19, 2, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(20, 2, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(21, 3, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 07:57:26', 1, 'Pickup request received; waiting for staff assignment.'),
(22, 3, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 07:57:30', 1, 'Pickup has not yet started.'),
(23, 3, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 07:57:34', 1, 'Pickup has not been completed.'),
(24, 3, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 07:57:43', 1, 'The clothes have not yet arrived at the store.'),
(25, 3, 'In Queue', 'Waiting for processing.', '2024-10-20 07:57:43', 1, 'Not yet in queue for processing.'),
(26, 3, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 07:57:56', 1, 'Laundry has not started processing yet.'),
(27, 3, 'Laundry Completed', 'Washing/drying finished.', '2024-10-20 07:58:05', 1, 'Laundry processing has not been completed.'),
(28, 3, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-20 07:58:05', 1, 'Laundry is not yet ready for delivery.'),
(29, 3, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(30, 3, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(31, 4, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 08:02:47', 1, 'Pickup request received; waiting for staff assignment.'),
(32, 4, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 08:02:52', 1, 'Pickup has not yet started.'),
(33, 4, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 08:02:55', 1, 'Pickup has not been completed.'),
(34, 4, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 08:03:01', 1, 'The clothes have not yet arrived at the store.'),
(35, 4, 'In Queue', 'Waiting for processing.', '2024-10-20 08:03:01', 1, 'Not yet in queue for processing.'),
(36, 4, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 08:03:07', 1, 'Laundry has not started processing yet.'),
(37, 4, 'Laundry Completed', 'Washing/drying finished.', '2024-10-20 08:03:17', 1, 'Laundry processing has not been completed.'),
(38, 4, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-20 08:03:17', 1, 'Laundry is not yet ready for delivery.'),
(39, 4, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(40, 4, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(41, 5, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 09:20:19', 1, 'Pickup request received; waiting for staff assignment.'),
(42, 5, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(43, 5, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(44, 5, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(45, 5, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(46, 5, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(47, 5, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(48, 5, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(49, 5, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(50, 5, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(51, 6, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 09:50:33', 1, 'Pickup request received; waiting for staff assignment.'),
(52, 6, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(53, 6, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(54, 6, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(55, 6, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(56, 6, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(57, 6, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(58, 6, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(59, 6, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(60, 6, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(61, 7, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 09:51:03', 1, 'Pickup request received; waiting for staff assignment.'),
(62, 7, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 09:51:11', 1, 'Pickup has not yet started.'),
(63, 7, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 09:51:32', 1, 'Pickup has not been completed.'),
(64, 7, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 09:51:43', 1, 'The clothes have not yet arrived at the store.'),
(65, 7, 'In Queue', 'Waiting for processing.', '2024-10-20 09:51:43', 1, 'Not yet in queue for processing.'),
(66, 7, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 09:51:50', 1, 'Laundry has not started processing yet.'),
(67, 7, 'Laundry Completed', 'Washing/drying finished.', '2024-10-20 10:58:45', 1, 'Laundry processing has not been completed.'),
(68, 7, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-20 10:58:45', 1, 'Laundry is not yet ready for delivery.'),
(69, 7, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(70, 7, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(71, 8, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 10:24:41', 1, 'Pickup request received; waiting for staff assignment.'),
(72, 8, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 10:24:46', 1, 'Pickup has not yet started.'),
(73, 8, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 10:25:21', 1, 'Pickup has not been completed.'),
(74, 8, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 10:25:26', 1, 'The clothes have not yet arrived at the store.'),
(75, 8, 'In Queue', 'Waiting for processing.', '2024-10-20 10:25:26', 1, 'Not yet in queue for processing.'),
(76, 8, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 10:25:38', 1, 'Laundry has not started processing yet.'),
(77, 8, 'Laundry Completed', 'Washing/drying finished.', '2024-10-20 10:59:22', 1, 'Laundry processing has not been completed.'),
(78, 8, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-20 10:59:22', 1, 'Laundry is not yet ready for delivery.'),
(79, 8, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(80, 8, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(81, 9, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 11:10:03', 1, 'Pickup request received; waiting for staff assignment.'),
(82, 9, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 11:27:18', 1, 'Pickup has not yet started.'),
(83, 9, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 11:27:26', 1, 'Pickup has not been completed.'),
(84, 9, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 11:27:30', 1, 'The clothes have not yet arrived at the store.'),
(85, 9, 'In Queue', 'Waiting for processing.', '2024-10-20 11:27:30', 1, 'Not yet in queue for processing.'),
(86, 9, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(87, 9, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(88, 9, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(89, 9, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(90, 9, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(91, 10, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 12:08:49', 1, 'Pickup request received; waiting for staff assignment.'),
(92, 10, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 12:08:55', 1, 'Pickup has not yet started.'),
(93, 10, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 12:08:58', 1, 'Pickup has not been completed.'),
(94, 10, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 12:10:43', 1, 'The clothes have not yet arrived at the store.'),
(95, 10, 'In Queue', 'Waiting for processing.', '2024-10-20 12:10:43', 1, 'Not yet in queue for processing.'),
(96, 10, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 12:10:51', 1, 'Laundry has not started processing yet.'),
(97, 10, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(98, 10, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(99, 10, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(100, 10, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(101, 11, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 12:09:38', 1, 'Pickup request received; waiting for staff assignment.'),
(102, 11, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 12:09:47', 1, 'Pickup has not yet started.'),
(103, 11, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 12:10:06', 1, 'Pickup has not been completed.'),
(104, 11, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(105, 11, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(106, 11, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(107, 11, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(108, 11, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(109, 11, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(110, 11, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(111, 12, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-20 12:31:22', 1, 'Pickup request received; waiting for staff assignment.'),
(112, 12, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-20 12:31:37', 1, 'Pickup has not yet started.'),
(113, 12, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-20 12:31:41', 1, 'Pickup has not been completed.'),
(114, 12, 'At Store', 'Dropped off at the laundry store.', '2024-10-20 12:31:55', 1, 'The clothes have not yet arrived at the store.'),
(115, 12, 'In Queue', 'Waiting for processing.', '2024-10-20 12:31:55', 1, 'Not yet in queue for processing.'),
(116, 12, 'In Laundry', 'Currently being washed/dried.', '2024-10-20 12:31:58', 1, 'Laundry has not started processing yet.'),
(117, 12, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(118, 12, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(119, 12, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(120, 12, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

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
(1, 1, 1, 2410192231000000, 1, '#EBC0A54984CE48D89B65', 'Rose Oriana', 'Online', '', '2024-10-19 21:39:46', '2024-10-19 21:46:41', NULL, 'Canceled', 'SR-1-#EBC0A54984CE48D89B65', 1, 1, 0, 'Cash on Delivery'),
(2, 1, 1, 2410200729000000, 1, '#67C3C2CBB16F43A99E87', 'Alexia Midgar', 'Online', '', '2024-10-19 23:30:46', '2024-10-19 23:31:19', NULL, 'Canceled', 'SR-2-#67C3C2CBB16F43A99E87', 1, 1, 0, 'Cash on Delivery'),
(3, 1, 1, 2410192231000000, 1, '#AF504EA954574231A90C', 'Rose Oriana', 'Online', '', '2024-10-19 23:57:26', '2024-10-19 23:57:34', NULL, 'Canceled', 'SR-3-#AF504EA954574231A90C', 1, 1, 0, 'Cash on Delivery'),
(4, 1, 1, 2410192231000000, 1, '#71EB7D17AE794B66A5CE', 'Rose Oriana', 'Online', '', '2024-10-20 00:02:47', '2024-10-20 00:02:55', NULL, 'Canceled', 'SR-4-#71EB7D17AE794B66A5CE', 1, 1, 0, 'Cash on Delivery'),
(5, 1, 1, 2410192231000000, 1, '#BBF02EA36F064A7E81F3', 'Rose Oriana', 'Online', '', '2024-10-20 01:20:19', NULL, NULL, 'Canceled', 'SR-5-#BBF02EA36F064A7E81F3', 1, 0, 0, 'Cash on Delivery'),
(6, 1, 1, 2410192231000000, 1, '#9906B385C40B49FEBD97', 'Rose Oriana', 'Online', '', '2024-10-20 01:50:33', NULL, NULL, 'Canceled', 'SR-6-#9906B385C40B49FEBD97', 1, 0, 0, 'Cash on Delivery'),
(7, 1, 1, 2410192231000000, 1, '#02D4212D16D2425CAEB2', 'Rose Oriana', 'Online', '', '2024-10-20 01:51:03', '2024-10-20 01:51:32', NULL, 'Canceled', 'SR-7-#02D4212D16D2425CAEB2', 1, 1, 0, 'Cash on Delivery'),
(8, 1, 1, 2410192231000000, 1, '#4F3EACC43940413590CC', 'Rose Oriana', 'Online', '', '2024-10-20 02:24:41', '2024-10-20 02:25:21', NULL, 'Canceled', 'SR-8-#4F3EACC43940413590CC', 1, 1, 0, 'Cash on Delivery'),
(9, 1, 1, 2410192231000000, 1, '#DA252EF372774D14AAF1', 'Rose Oriana', 'Online', '', '2024-10-20 03:10:03', '2024-10-20 03:27:26', NULL, 'Canceled', 'SR-9-#DA252EF372774D14AAF1', 1, 1, 0, 'Cash on Delivery'),
(10, 1, 1, 2410192231000000, 4, '#37D69398F43F400683A5', 'Rose Oriana', 'Online', '', '2024-10-20 04:08:49', '2024-10-20 04:08:58', NULL, 'In Laundry', 'SR-10-#37D69398F43F400683A5', 1, 1, 0, 'Cash on Delivery'),
(11, 1, 1, 2410200729000000, 1, '#7B0FBFC648EF4442A9EC', 'Alexia Midgar', 'Online', '', '2024-10-20 04:09:38', '2024-10-20 04:10:06', NULL, 'Completed Pickup', 'SR-11-#7B0FBFC648EF4442A9EC', 1, 1, 0, 'Cash on Delivery'),
(12, 1, 1, 2410192231000000, 1, '#EA89DC35E7B9490EA133', 'Rose Oriana', 'Online', '', '2024-10-20 04:31:22', '2024-10-20 04:31:41', NULL, 'In Laundry', 'SR-12-#EA89DC35E7B9490EA133', 1, 1, 0, 'Cash on Delivery');

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
(1, 1, 'Wash', NULL, 65.00, '2024-10-19 21:15:27', 0),
(2, 1, 'Dry', NULL, 55.00, '2024-10-19 21:15:27', 0),
(3, 1, 'Fold', NULL, 30.00, '2024-10-19 21:15:27', 0),
(4, 1, 'Wash/Dry', 'Basic wash and dry', 120.00, '2024-10-20 12:08:27', 0);

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
(1, 1, 'LIZASO-1729343727423', 'Lizaso Laundry Hub', 'Main Contact', '', 1, '0000-00-00 00:00:00', '2024-10-19 21:15:27', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(255) NOT NULL,
  `assignment_id` bigint(20) NOT NULL,
  `transaction_code` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `assignment_id`, `transaction_code`, `total_amount`, `payment_method`, `status`, `created_at`, `updated_at`) VALUES
(8, 1, 'LLH-20241019-0004', 130.00, 'Cash on Delivery', 'Pending', '2024-10-20 07:50:18', '2024-10-20 07:50:18'),
(9, 2, 'LLH-20241019-0006', 650.00, 'Cash on Delivery', 'Pending', '2024-10-20 07:54:32', '2024-10-20 07:54:32'),
(10, 3, 'LLH-20241019-0008', 325.00, 'Cash on Delivery', 'Pending', '2024-10-20 07:58:05', '2024-10-20 07:58:05'),
(11, 4, 'LLH-20241020-0010', 65.00, 'Cash on Delivery', 'Pending', '2024-10-20 08:03:17', '2024-10-20 08:03:17'),
(12, 5, 'LLH-20241020-0004', 325.00, 'Cash on Delivery', 'Pending', '2024-10-20 10:58:45', '2024-10-20 10:58:45'),
(13, 6, 'LLH-20241020-0006', 1300.00, 'Cash on Delivery', 'Pending', '2024-10-20 10:59:22', '2024-10-20 10:59:22');

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
(1, 1, 1, 'admin', 'admin@example.com', '', 'Admin', '', 'User', 1, 0, 0, '2024-10-19 21:15:27'),
(2, 1, 2, 'juan12', '', '09564545069', 'Juan', '', 'Tamad', 0, 0, 0, '2024-10-19 21:17:30');

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
(1, 1, '$2b$10$Y8ZIiNMpOhqMu0YsVR/cle1ndMb8GchEueMErpohizpdswwdZeuMy', '$2b$10$MwelQngr1iyFXVYl065mRO', 0, '', 0, 0, '2024-10-19 13:15:27', NULL, NULL, NULL),
(2, 2, '$2b$12$N6Qafnn111RyKu7Gg.iXS.fFgB2I5AQ5fdr3OKCCuRb0AY3A/YsOK', '$2b$12$TxCq.19AZtC0KE3EuYCESu', 0, '', 0, 0, '2024-10-19 13:17:30', NULL, NULL, '2024-10-19 13:17:30');

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
-- Indexes for table `feedback_review`
--
ALTER TABLE `feedback_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Review_Stores` (`store_id`),
  ADD KEY `Review_Customer` (`customer_id`),
  ADD KEY `Review_Service_Request` (`service_request_id`);

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
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Notifications_User_Account` (`user_id`),
  ADD KEY `Notifications_Customer` (`customer_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `Transactions_Laundry_Assignment` (`assignment_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17293469439970002;

--
-- AUTO_INCREMENT for table `customer_security`
--
ALTER TABLE `customer_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `feedback_review`
--
ALTER TABLE `feedback_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `related_item`
--
ALTER TABLE `related_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_progress`
--
ALTER TABLE `service_progress`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `service_promo`
--
ALTER TABLE `service_promo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `feedback_review`
--
ALTER TABLE `feedback_review`
  ADD CONSTRAINT `Review_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `Review_Service_Request` FOREIGN KEY (`service_request_id`) REFERENCES `service_request` (`id`),
  ADD CONSTRAINT `Review_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

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
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `Notifications_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `Notifications_User_Account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

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
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `Transactions_Laundry_Assignment` FOREIGN KEY (`assignment_id`) REFERENCES `laundry_assignment` (`id`);

--
-- Constraints for table `user_account`
--
ALTER TABLE `user_account`
  ADD CONSTRAINT `User_Account_Roles_Permissions` FOREIGN KEY (`role_permissions_id`) REFERENCES `roles_permissions` (`id`),
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
