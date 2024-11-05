-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2024 at 02:31 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) NOT NULL,
  `address_line` varchar(255) NOT NULL,
  `country` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `address_line`, `country`, `province`, `city`, `postal_code`, `latitude`, `longitude`, `updated_at`) VALUES
(1, 'Balagtas, Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-11-04 12:16:44'),
(2, 'Balagtas, Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-11-04 12:16:44'),
(3, 'STI Balagta', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.823054, 120.901092, '2024-11-04 12:21:59'),
(4, 'Perez', 'Philippines', 'Bulacan', 'Bulakan', '301', 14.764591, 120.895100, '2024-11-04 12:32:38');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) NOT NULL,
  `user_one_id` bigint(20) NOT NULL,
  `user_two_id` bigint(20) NOT NULL,
  `last_message_id` bigint(20) DEFAULT NULL,
  `last_message_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user_one_id`, `user_two_id`, `last_message_id`, `last_message_date`, `created_at`, `updated_at`) VALUES
(1, 2, 4, 1, '2024-11-04 23:53:52', '2024-11-04 23:53:52', '2024-11-04 23:53:52');

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

--
-- Dumping data for table `feedback_review`
--

INSERT INTO `feedback_review` (`id`, `store_id`, `customer_id`, `service_request_id`, `rating`, `comment`, `created_at`, `updated_at`, `is_approved`, `response`, `response_created_at`) VALUES
(1, 1, 4, 23, 4, 'Pangit nyo maglaba', '2024-11-05 05:55:51', '2024-11-05 05:55:51', 0, NULL, '0000-00-00 00:00:00'),
(2, 1, 4, 22, 0, '1212121', '2024-11-05 07:54:13', '2024-11-05 07:54:13', 0, NULL, '0000-00-00 00:00:00'),
(3, 1, 4, 37, 4, 'Maganda Po Ang Palaba nyo', '2024-11-05 08:03:59', '2024-11-05 08:03:59', 0, NULL, '0000-00-00 00:00:00');

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
(1, 1, 1, 10.00, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `updated_at` datetime NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `category_id`, `item_name`, `isArchive`, `updated_at`, `date_created`) VALUES
(1, 1, 'Arial Soap', 0, '2024-11-05 03:56:11', '2024-11-05 03:56:11');

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
(1, 'Soap', 0, '2024-11-05 03:55:01', '2024-11-05 03:55:01');

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
(14, 20, 2, 1, '1', '2024-11-05 05:25:46', NULL, 1, 0),
(15, 21, 3, 1, '1', '2024-11-05 05:26:21', NULL, 1, 0),
(16, 24, 4, 1, '1', '2024-11-05 05:29:41', NULL, 1, 0),
(17, 23, 5, 1, '1', '2024-11-05 05:49:53', NULL, 1, 0),
(18, 25, 2, 1, '1', '2024-11-05 06:04:00', NULL, 1, 0),
(19, 26, 3, 1, '1', '2024-11-05 06:04:06', NULL, 1, 0),
(20, 27, 4, 1, '1', '2024-11-05 06:04:55', NULL, 1, 0),
(21, 28, 5, 1, '1', '2024-11-05 06:05:18', NULL, 1, 0),
(22, 30, 2, 1, '5', '2024-11-05 07:31:18', NULL, 1, 0),
(23, 31, 2, 1, '5', '2024-11-05 07:34:59', NULL, 1, 0),
(24, 32, 2, 1, '5', '2024-11-05 07:36:48', NULL, 1, 0),
(25, 33, 3, 1, '5', '2024-11-05 07:36:57', NULL, 1, 0),
(26, 34, 4, 1, '2', '2024-11-05 07:37:39', NULL, 1, 0),
(27, 35, 5, 1, '2', '2024-11-05 07:37:55', NULL, 1, 0),
(28, 36, 2, 1, '1', '2024-11-05 07:40:47', NULL, 1, 0),
(29, 22, 2, 1, '5', '2024-11-05 07:52:21', NULL, 1, 0),
(30, 37, 2, 1, '5', '2024-11-05 07:56:28', NULL, 1, 0);

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
(2, 1, 'Unit 1', '2024-11-05 04:49:13', 0, 0),
(3, 1, 'Unit 2', '2024-11-05 05:06:23', 0, 0),
(4, 1, 'Unit 3', '2024-11-05 05:12:28', 0, 0),
(5, 1, 'Unit 4', '2024-11-05 05:12:31', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `recipient_id` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `date_sent` datetime NOT NULL,
  `date_read` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `recipient_id`, `message`, `is_read`, `date_sent`, `date_read`) VALUES
(1, 1, 2, 4, 'U2FsdGVkX18y3iTAa3hVs6f5MnQYMe/UyC+zfSmmPsA=', 1, '2024-11-05 07:53:52', '2024-11-05 08:03:30');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
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

--
-- Dumping data for table `related_item`
--

INSERT INTO `related_item` (`id`, `assignment_id`, `inventory_id`, `quantity`, `amount`) VALUES
(4, 22, 1, 1, 10.00),
(5, 23, 1, 1, 10.00),
(6, 24, 1, 1, 10.00),
(7, 25, 1, 1, 10.00),
(8, 26, 1, 1, 10.00),
(9, 27, 1, 1, 10.00),
(10, 29, 1, 1, 10.00),
(11, 30, 1, 5, 50.00);

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
(1, 'Administrator', 1, 1, 1, 1, '2024-11-04 12:16:44', 0),
(2, 'Manager', 1, 1, 1, 1, '2024-11-04 12:16:44', 0),
(3, 'Store Staff', 1, 1, 0, 0, '2024-11-04 12:16:44', 0),
(4, 'Delivery Staff', 1, 0, 0, 0, '2024-11-04 12:16:44', 0);

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
(161, 20, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 05:25:46', 1, 'Pickup request received; waiting for staff assignment.'),
(162, 20, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 05:25:46', 1, 'Pickup has not yet started.'),
(163, 20, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 05:25:46', 1, 'Pickup has not been completed.'),
(164, 20, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 05:25:46', 1, 'The clothes have not yet arrived at the store.'),
(165, 20, 'In Queue', 'Waiting for processing.', '2024-11-05 05:25:46', 1, 'Not yet in queue for processing.'),
(166, 20, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 05:25:46', 1, 'Laundry has not started processing yet.'),
(167, 20, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 05:50:59', 1, 'Laundry processing has not been completed.'),
(168, 20, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 05:50:59', 1, 'Laundry is not yet ready for delivery.'),
(169, 20, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(170, 20, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(171, 21, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 05:26:21', 1, 'Pickup request received; waiting for staff assignment.'),
(172, 21, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 05:26:21', 1, 'Pickup has not yet started.'),
(173, 21, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 05:26:21', 1, 'Pickup has not been completed.'),
(174, 21, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 05:26:21', 1, 'The clothes have not yet arrived at the store.'),
(175, 21, 'In Queue', 'Waiting for processing.', '2024-11-05 05:26:21', 1, 'Not yet in queue for processing.'),
(176, 21, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 05:26:21', 1, 'Laundry has not started processing yet.'),
(177, 21, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 05:53:43', 1, 'Laundry processing has not been completed.'),
(178, 21, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 05:53:43', 1, 'Laundry is not yet ready for delivery.'),
(179, 21, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(180, 21, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(181, 22, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 05:26:55', 1, 'Pickup request received; waiting for staff assignment.'),
(182, 22, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 05:56:04', 1, 'Pickup has not yet started.'),
(183, 22, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 05:56:04', 1, 'Pickup has not been completed.'),
(184, 22, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:39:23', 1, 'The clothes have not yet arrived at the store.'),
(185, 22, 'In Queue', 'Waiting for processing.', '2024-11-05 07:51:57', 1, 'Not yet in queue for processing.'),
(186, 22, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:52:21', 1, 'Laundry has not started processing yet.'),
(187, 22, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:52:33', 1, 'Laundry processing has not been completed.'),
(188, 22, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:52:33', 1, 'Laundry is not yet ready for delivery.'),
(189, 22, 'Out for Delivery', 'On the way to you.', '2024-11-05 07:54:02', 1, 'Laundry has not been dispatched yet.'),
(190, 22, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-11-05 07:54:02', 1, 'Delivery has not been completed.'),
(191, 23, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 05:27:23', 1, 'Pickup request received; waiting for staff assignment.'),
(192, 23, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 05:35:03', 1, 'Pickup has not yet started.'),
(193, 23, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 05:35:03', 1, 'Pickup has not been completed.'),
(194, 23, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 05:40:00', 1, 'The clothes have not yet arrived at the store.'),
(195, 23, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(196, 23, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 05:49:53', 1, 'Laundry has not started processing yet.'),
(197, 23, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 05:54:42', 1, 'Laundry processing has not been completed.'),
(198, 23, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 05:54:42', 1, 'Laundry is not yet ready for delivery.'),
(199, 23, 'Out for Delivery', 'On the way to you.', '2024-11-05 05:55:28', 1, 'Laundry has not been dispatched yet.'),
(200, 23, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-11-05 05:55:28', 1, 'Delivery has not been completed.'),
(201, 24, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 05:29:41', 1, 'Pickup request received; waiting for staff assignment.'),
(202, 24, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 05:29:41', 1, 'Pickup has not yet started.'),
(203, 24, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 05:29:41', 1, 'Pickup has not been completed.'),
(204, 24, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 05:29:41', 1, 'The clothes have not yet arrived at the store.'),
(205, 24, 'In Queue', 'Waiting for processing.', '2024-11-05 05:29:41', 1, 'Not yet in queue for processing.'),
(206, 24, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 05:29:41', 1, 'Laundry has not started processing yet.'),
(207, 24, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 05:53:49', 1, 'Laundry processing has not been completed.'),
(208, 24, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 05:53:49', 1, 'Laundry is not yet ready for delivery.'),
(209, 24, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(210, 24, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(211, 25, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 06:04:00', 1, 'Pickup request received; waiting for staff assignment.'),
(212, 25, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 06:04:00', 1, 'Pickup has not yet started.'),
(213, 25, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 06:04:00', 1, 'Pickup has not been completed.'),
(214, 25, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 06:04:00', 1, 'The clothes have not yet arrived at the store.'),
(215, 25, 'In Queue', 'Waiting for processing.', '2024-11-05 06:04:00', 1, 'Not yet in queue for processing.'),
(216, 25, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 06:04:00', 1, 'Laundry has not started processing yet.'),
(217, 25, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:30:53', 1, 'Laundry processing has not been completed.'),
(218, 25, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:30:53', 1, 'Laundry is not yet ready for delivery.'),
(219, 25, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(220, 25, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(221, 26, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 06:04:06', 1, 'Pickup request received; waiting for staff assignment.'),
(222, 26, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 06:04:06', 1, 'Pickup has not yet started.'),
(223, 26, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 06:04:06', 1, 'Pickup has not been completed.'),
(224, 26, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 06:04:06', 1, 'The clothes have not yet arrived at the store.'),
(225, 26, 'In Queue', 'Waiting for processing.', '2024-11-05 06:04:06', 1, 'Not yet in queue for processing.'),
(226, 26, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 06:04:06', 1, 'Laundry has not started processing yet.'),
(227, 26, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:35:41', 1, 'Laundry processing has not been completed.'),
(228, 26, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:35:41', 1, 'Laundry is not yet ready for delivery.'),
(229, 26, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(230, 26, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(231, 27, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 06:04:55', 1, 'Pickup request received; waiting for staff assignment.'),
(232, 27, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 06:04:55', 1, 'Pickup has not yet started.'),
(233, 27, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 06:04:55', 1, 'Pickup has not been completed.'),
(234, 27, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 06:04:55', 1, 'The clothes have not yet arrived at the store.'),
(235, 27, 'In Queue', 'Waiting for processing.', '2024-11-05 06:04:55', 1, 'Not yet in queue for processing.'),
(236, 27, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 06:04:55', 1, 'Laundry has not started processing yet.'),
(237, 27, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:36:11', 1, 'Laundry processing has not been completed.'),
(238, 27, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:36:11', 1, 'Laundry is not yet ready for delivery.'),
(239, 27, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(240, 27, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(241, 28, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 06:05:18', 1, 'Pickup request received; waiting for staff assignment.'),
(242, 28, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 06:05:18', 1, 'Pickup has not yet started.'),
(243, 28, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 06:05:18', 1, 'Pickup has not been completed.'),
(244, 28, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 06:05:18', 1, 'The clothes have not yet arrived at the store.'),
(245, 28, 'In Queue', 'Waiting for processing.', '2024-11-05 06:05:18', 1, 'Not yet in queue for processing.'),
(246, 28, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 06:05:18', 1, 'Laundry has not started processing yet.'),
(247, 28, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:36:32', 1, 'Laundry processing has not been completed.'),
(248, 28, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:36:32', 1, 'Laundry is not yet ready for delivery.'),
(249, 28, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(250, 28, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(251, 30, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:03:01', 1, 'Pickup request received; waiting for staff assignment.'),
(252, 30, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:03:01', 1, 'Pickup has not yet started.'),
(253, 30, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:03:01', 1, 'Pickup has not been completed.'),
(254, 30, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:03:01', 1, 'The clothes have not yet arrived at the store.'),
(255, 30, 'In Queue', 'Waiting for processing.', '2024-11-05 07:03:01', 1, 'Not yet in queue for processing.'),
(256, 30, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:31:18', 1, 'Laundry has not started processing yet.'),
(257, 30, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:34:46', 1, 'Laundry processing has not been completed.'),
(258, 30, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:34:46', 1, 'Laundry is not yet ready for delivery.'),
(259, 30, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(260, 30, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(261, 31, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:06:56', 1, 'Pickup request received; waiting for staff assignment.'),
(262, 31, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:06:56', 1, 'Pickup has not yet started.'),
(263, 31, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:06:56', 1, 'Pickup has not been completed.'),
(264, 31, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:06:56', 1, 'The clothes have not yet arrived at the store.'),
(265, 31, 'In Queue', 'Waiting for processing.', '2024-11-05 07:06:56', 1, 'Not yet in queue for processing.'),
(266, 31, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:34:59', 1, 'Laundry has not started processing yet.'),
(267, 31, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:35:36', 1, 'Laundry processing has not been completed.'),
(268, 31, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:35:36', 1, 'Laundry is not yet ready for delivery.'),
(269, 31, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(270, 31, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(271, 32, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:08:40', 1, 'Pickup request received; waiting for staff assignment.'),
(272, 32, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:08:40', 1, 'Pickup has not yet started.'),
(273, 32, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:08:40', 1, 'Pickup has not been completed.'),
(274, 32, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:08:40', 1, 'The clothes have not yet arrived at the store.'),
(275, 32, 'In Queue', 'Waiting for processing.', '2024-11-05 07:08:40', 1, 'Not yet in queue for processing.'),
(276, 32, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:36:48', 1, 'Laundry has not started processing yet.'),
(277, 32, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:39:44', 1, 'Laundry processing has not been completed.'),
(278, 32, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:39:44', 1, 'Laundry is not yet ready for delivery.'),
(279, 32, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(280, 32, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(281, 33, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:10:26', 1, 'Pickup request received; waiting for staff assignment.'),
(282, 33, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:10:26', 1, 'Pickup has not yet started.'),
(283, 33, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:10:26', 1, 'Pickup has not been completed.'),
(284, 33, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:10:26', 1, 'The clothes have not yet arrived at the store.'),
(285, 33, 'In Queue', 'Waiting for processing.', '2024-11-05 07:10:26', 1, 'Not yet in queue for processing.'),
(286, 33, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:36:57', 1, 'Laundry has not started processing yet.'),
(287, 33, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:39:50', 1, 'Laundry processing has not been completed.'),
(288, 33, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:39:50', 1, 'Laundry is not yet ready for delivery.'),
(289, 33, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(290, 33, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(291, 34, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:37:39', 1, 'Pickup request received; waiting for staff assignment.'),
(292, 34, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:37:39', 1, 'Pickup has not yet started.'),
(293, 34, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:37:39', 1, 'Pickup has not been completed.'),
(294, 34, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:37:39', 1, 'The clothes have not yet arrived at the store.'),
(295, 34, 'In Queue', 'Waiting for processing.', '2024-11-05 07:37:39', 1, 'Not yet in queue for processing.'),
(296, 34, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:37:39', 1, 'Laundry has not started processing yet.'),
(297, 34, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:39:57', 1, 'Laundry processing has not been completed.'),
(298, 34, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:39:57', 1, 'Laundry is not yet ready for delivery.'),
(299, 34, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(300, 34, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(301, 35, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:37:55', 1, 'Pickup request received; waiting for staff assignment.'),
(302, 35, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:37:55', 1, 'Pickup has not yet started.'),
(303, 35, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:37:55', 1, 'Pickup has not been completed.'),
(304, 35, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:37:55', 1, 'The clothes have not yet arrived at the store.'),
(305, 35, 'In Queue', 'Waiting for processing.', '2024-11-05 07:37:55', 1, 'Not yet in queue for processing.'),
(306, 35, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:37:55', 1, 'Laundry has not started processing yet.'),
(307, 35, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:40:05', 1, 'Laundry processing has not been completed.'),
(308, 35, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:40:05', 1, 'Laundry is not yet ready for delivery.'),
(309, 35, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(310, 35, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(311, 36, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:40:47', 1, 'Pickup request received; waiting for staff assignment.'),
(312, 36, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:40:47', 1, 'Pickup has not yet started.'),
(313, 36, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:40:47', 1, 'Pickup has not been completed.'),
(314, 36, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:40:47', 1, 'The clothes have not yet arrived at the store.'),
(315, 36, 'In Queue', 'Waiting for processing.', '2024-11-05 07:40:47', 1, 'Not yet in queue for processing.'),
(316, 36, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:40:47', 1, 'Laundry has not started processing yet.'),
(317, 36, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:40:56', 1, 'Laundry processing has not been completed.'),
(318, 36, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:40:56', 1, 'Laundry is not yet ready for delivery.'),
(319, 36, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(320, 36, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(321, 37, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 07:41:46', 1, 'Pickup request received; waiting for staff assignment.'),
(322, 37, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-05 07:43:15', 1, 'Pickup has not yet started.'),
(323, 37, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-05 07:43:15', 1, 'Pickup has not been completed.'),
(324, 37, 'At Store', 'Dropped off at the laundry store.', '2024-11-05 07:47:08', 1, 'The clothes have not yet arrived at the store.'),
(325, 37, 'In Queue', 'Waiting for processing.', '2024-11-05 07:54:25', 1, 'Not yet in queue for processing.'),
(326, 37, 'In Laundry', 'Currently being washed/dried.', '2024-11-05 07:56:28', 1, 'Laundry has not started processing yet.'),
(327, 37, 'Laundry Completed', 'Washing/drying finished.', '2024-11-05 07:56:49', 1, 'Laundry processing has not been completed.'),
(328, 37, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-05 07:56:49', 1, 'Laundry is not yet ready for delivery.'),
(329, 37, 'Out for Delivery', 'On the way to you.', '2024-11-05 08:03:45', 1, 'Laundry has not been dispatched yet.'),
(330, 37, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-11-05 08:03:45', 1, 'Delivery has not been completed.'),
(331, 38, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-05 09:21:01', 1, 'Pickup request received; waiting for staff assignment.'),
(332, 38, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(333, 38, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(334, 38, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(335, 38, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(336, 38, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(337, 38, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(338, 38, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(339, 38, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(340, 38, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

-- --------------------------------------------------------

--
-- Table structure for table `service_promo`
--

CREATE TABLE `service_promo` (
  `id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `discount_percentage` decimal(10,0) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `valid_days` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL,
  `isArchive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_promo`
--

INSERT INTO `service_promo` (`id`, `service_id`, `discount_percentage`, `discount_price`, `valid_days`, `start_date`, `end_date`, `isActive`, `date_created`, `isArchive`) VALUES
(1, 1, NULL, 55.00, 'Monday, Tuesday, Wednesday', '2024-10-23', '2030-10-23', 1, '2024-11-04 13:43:21', 0),
(2, 2, NULL, 55.00, 'Monday, Tuesday, Wednesday', '2024-11-03', '2025-11-03', 1, '2024-11-05 08:47:56', 0),
(3, 4, NULL, 110.00, 'Monday, Tuesday, Thursday', '2024-11-04', '2025-11-04', 1, '2024-11-05 08:50:51', 0),
(4, 5, NULL, 140.00, 'Monday, Tuesday, Wednesday', '2024-11-04', '2025-11-04', 1, '2024-11-05 08:51:35', 0);

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
  `queue_number` bigint(20) DEFAULT NULL,
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

INSERT INTO `service_request` (`id`, `store_id`, `user_id`, `customer_id`, `service_type_id`, `tracking_code`, `queue_number`, `customer_fullname`, `customer_type`, `notes`, `request_date`, `pickup_date`, `delivery_date`, `request_status`, `qr_code`, `qr_code_generated`, `isPickup`, `isDelivery`, `payment_method`) VALUES
(20, 1, 1, 4, 1, '#366DAAF78E3B40BDAD25', 1, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 21:25:46', '2024-11-04 21:25:38', NULL, 'Laundry Completed', 'SR-20-#366DAAF78E3B40BDAD25', 1, 1, 0, 'Cash'),
(21, 1, 1, 4, 1, '#D648C9932B374B20B584', 2, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 21:26:21', '2024-11-04 21:25:38', NULL, 'Laundry Completed', 'SR-21-#D648C9932B374B20B584', 1, 1, 0, 'Cash'),
(22, 1, 2, 4, 1, '#D9DF0A44A3054AF4AB42', 3, 'Reynald Velarde', 'Online', '', '2024-11-04 21:26:55', '2024-11-04 21:56:04', '2024-11-04 23:54:02', 'Completed Delivery', 'SR-22-#D9DF0A44A3054AF4AB42', 1, 1, 1, 'Cash on Delivery'),
(23, 1, 2, 4, 5, '#965BC750D1834A668E51', 4, 'Reynald P. Velarde', 'Online', NULL, '2024-11-04 21:27:23', '2024-11-04 21:35:03', '2024-11-04 21:55:28', 'Completed Delivery', 'SR-23-#965BC750D1834A668E51', 1, 1, 1, 'Cash on Delivery'),
(24, 1, 1, 3, 4, '#F940434FE57E4BD4AABA', 5, 'Rose  Oriana', 'Walk-In', '', '2024-11-04 21:29:41', '2024-11-04 21:26:49', NULL, 'Laundry Completed', 'SR-24-#F940434FE57E4BD4AABA', 1, 1, 0, 'Cash'),
(25, 1, 1, 3, 1, '#3CBB5FAC9E7544EEB2AA', 6, 'Rose  Oriana', 'Walk-In', '', '2024-11-04 22:04:00', '2024-11-04 22:02:21', NULL, 'Laundry Completed', 'SR-25-#3CBB5FAC9E7544EEB2AA', 1, 1, 0, 'Cash'),
(26, 1, 1, 4, 1, '#EEC83A2B618E422DA164', 7, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 22:04:06', '2024-11-04 22:02:21', NULL, 'Laundry Completed', 'SR-26-#EEC83A2B618E422DA164', 1, 1, 0, 'Cash'),
(27, 1, 1, 4, 1, '#0B920C1B22DA460986AE', 8, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 22:04:55', '2024-11-04 22:02:21', NULL, 'Laundry Completed', 'SR-27-#0B920C1B22DA460986AE', 1, 1, 0, 'Cash'),
(28, 1, 1, 3, 1, '#86363F579C654A67B954', 9, 'Rose  Oriana', 'Walk-In', '', '2024-11-04 22:05:18', '2024-11-04 22:02:21', NULL, 'Laundry Completed', 'SR-28-#86363F579C654A67B954', 1, 1, 0, 'Cash'),
(30, 1, NULL, 4, 3, '#4C6226020F8048A187EC', 10, 'Reynald P. Velarde', 'Walk-In', '212312', '2024-11-04 23:03:01', NULL, NULL, 'Laundry Completed', 'SR-30-#4C6226020F8048A187EC', 1, 0, 0, 'Cash'),
(31, 1, 1, 3, 1, '#17C9D0B9088B4836B274', 11, 'Rose  Oriana', 'Walk-In', '', '2024-11-04 23:06:56', NULL, NULL, 'Laundry Completed', 'SR-31-#17C9D0B9088B4836B274', 1, 0, 0, 'Cash'),
(32, 1, 1, 4, 1, '#6F6867B727C04DB79373', 12, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 23:08:40', NULL, NULL, 'Laundry Completed', 'SR-32-#6F6867B727C04DB79373', 1, 0, 0, 'Cash'),
(33, 1, 1, 4, 1, '#3D703A5EE97E40CE9710', 13, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 23:10:26', NULL, NULL, 'Laundry Completed', 'SR-33-#3D703A5EE97E40CE9710', 1, 0, 0, 'Cash'),
(34, 1, 1, 4, 1, '#FF30C413736C41C0B92E', 14, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 23:37:39', '2024-11-04 23:18:10', NULL, 'Laundry Completed', 'SR-34-#FF30C413736C41C0B92E', 1, 1, 0, 'Cash'),
(35, 1, 1, 3, 1, '#B2429DFB0FE943808F5E', 15, 'Rose  Oriana', 'Walk-In', '', '2024-11-04 23:37:55', '2024-11-04 23:18:10', NULL, 'Laundry Completed', 'SR-35-#B2429DFB0FE943808F5E', 1, 1, 0, 'Cash'),
(36, 1, 1, 4, 1, '#E298371050CA42029661', 16, 'Reynald P. Velarde', 'Walk-In', '', '2024-11-04 23:40:47', '2024-11-04 23:18:10', NULL, 'Laundry Completed', 'SR-36-#E298371050CA42029661', 1, 1, 0, 'Cash'),
(37, 1, 2, 4, 1, '#EBC903BD065143D2862D', 17, 'Reynald Velarde', 'Online', '', '2024-11-04 23:41:46', '2024-11-04 23:43:15', '2024-11-05 00:03:45', 'Completed Delivery', 'SR-37-#EBC903BD065143D2862D', 1, 1, 1, 'Cash on Delivery'),
(38, 1, NULL, 4, 1, '#8CC1C072927542CD81EC', 18, 'Reynald Velarde', 'Online', '', '2024-11-05 01:21:01', NULL, NULL, 'Pending Pickup', 'SR-38-#8CC1C072927542CD81EC', 1, 0, 0, 'Cash on Delivery');

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
(1, 1, 'Wash', NULL, 65.00, '2024-11-04 12:16:44', 0),
(2, 1, 'Dry', NULL, 60.00, '2024-11-04 12:16:44', 0),
(3, 1, 'Fold', NULL, 30.00, '2024-11-04 12:16:44', 0),
(4, 1, 'Wash/Dry', NULL, 125.00, '2024-11-04 12:16:44', 0),
(5, 1, 'Wash/Dry/Fold', NULL, 155.00, '2024-11-04 12:16:44', 0);

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
(1, 1, 'LIZASO-1730693804337', 'Lizaso Laundry Hub', '09310064466', 'lizasolaundryhub@gmail.com', 1, '2024-11-04 12:16:44', '2024-11-04 12:16:44', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(255) NOT NULL,
  `store_id` bigint(20) NOT NULL,
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

INSERT INTO `transactions` (`id`, `store_id`, `assignment_id`, `transaction_code`, `total_amount`, `payment_method`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 14, 'LLH-20241104-0004', 65.00, 'Cash', 'Completed', '2024-11-05 05:50:59', '2024-11-05 05:50:59'),
(2, 1, 15, 'LLH-20241104-0010', 65.00, 'Cash', 'Completed', '2024-11-05 05:53:43', '2024-11-05 05:53:43'),
(3, 1, 16, 'LLH-20241104-0012', 125.00, 'Cash', 'Completed', '2024-11-05 05:53:49', '2024-11-05 05:53:49'),
(4, 1, 17, 'LLH-20241104-0018', 155.00, 'Cash on Delivery', 'Completed', '2024-11-05 05:54:42', '2024-11-05 05:55:28'),
(5, 1, 18, 'LLH-20241104-0040', 60.00, 'Cash', 'Completed', '2024-11-05 07:30:53', '2024-11-05 07:30:53'),
(6, 1, 22, 'LLH-20241104-0042', 160.00, 'Cash', 'Completed', '2024-11-05 07:34:46', '2024-11-05 07:34:46'),
(7, 1, 23, 'LLH-20241104-0044', 310.00, 'Cash', 'Completed', '2024-11-05 07:35:36', '2024-11-05 07:35:36'),
(8, 1, 19, 'LLH-20241104-0046', 60.00, 'Cash', 'Completed', '2024-11-05 07:35:41', '2024-11-05 07:35:41'),
(9, 1, 20, 'LLH-20241104-0048', 60.00, 'Cash', 'Completed', '2024-11-05 07:36:11', '2024-11-05 07:36:11'),
(10, 1, 21, 'LLH-20241104-0050', 60.00, 'Cash', 'Completed', '2024-11-05 07:36:32', '2024-11-05 07:36:32'),
(11, 1, 24, 'LLH-20241104-0054', 310.00, 'Cash', 'Completed', '2024-11-05 07:39:44', '2024-11-05 07:39:44'),
(12, 1, 25, 'LLH-20241104-0056', 310.00, 'Cash', 'Completed', '2024-11-05 07:39:50', '2024-11-05 07:39:50'),
(13, 1, 26, 'LLH-20241104-0058', 130.00, 'Cash', 'Completed', '2024-11-05 07:39:57', '2024-11-05 07:39:57'),
(14, 1, 27, 'LLH-20241104-0060', 130.00, 'Cash', 'Completed', '2024-11-05 07:40:05', '2024-11-05 07:40:05'),
(15, 1, 28, 'LLH-20241104-0062', 60.00, 'Cash', 'Completed', '2024-11-05 07:40:56', '2024-11-05 07:40:56'),
(16, 1, 29, 'LLH-20241104-0002', 310.00, 'Cash on Delivery', 'Completed', '2024-11-05 07:52:33', '2024-11-05 07:54:02'),
(17, 1, 30, 'LLH-20241104-0004', 350.00, 'Cash on Delivery', 'Completed', '2024-11-05 07:56:49', '2024-11-05 08:03:45');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `role_permissions_id` bigint(20) DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `isOnline` tinyint(1) NOT NULL,
  `isAgreement` tinyint(1) NOT NULL,
  `isStatus` tinyint(1) NOT NULL,
  `isArchive` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `store_id`, `address_id`, `role_permissions_id`, `username`, `email`, `mobile_number`, `first_name`, `middle_name`, `last_name`, `user_type`, `isOnline`, `isAgreement`, `isStatus`, `isArchive`, `date_created`) VALUES
(1, 1, 2, 1, 'admin', 'admin@example.com', '09310064466', 'Admin', NULL, 'User', 'Administrator', 1, 1, 1, 0, '2024-11-04 12:16:44'),
(2, 1, NULL, 4, 'juan16', 'juantamad16@gmail.com', '09472727061', 'Juan', 'O', 'Tamad', 'Delivery Staff', 1, 1, 0, 0, '2024-11-04 12:20:34'),
(3, 1, 3, NULL, 'rose16', 'roseoriana16@gmail.com', '0947272061', 'Rose', '', 'Oriana', 'Customer', 0, 1, 0, 0, '2024-10-04 12:21:59'),
(4, 1, 4, NULL, 'velarde16', 'johnreynald@gmail.com', '09472727061', 'Reynald', 'P.', 'Velarde', 'Customer', 1, 1, 0, 0, '2024-11-04 12:32:38');

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
  `mfa_secret` varchar(255) DEFAULT NULL,
  `failed_login_attempts` int(11) NOT NULL DEFAULT 0,
  `account_locked` tinyint(1) NOT NULL,
  `lockout_time` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `last_logout` datetime DEFAULT NULL,
  `last_password_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_security`
--

INSERT INTO `user_security` (`id`, `user_id`, `password`, `password_salt`, `mfa_enabled`, `mfa_secret`, `failed_login_attempts`, `account_locked`, `lockout_time`, `last_login`, `last_logout`, `last_password_change`) VALUES
(1, 1, '$2b$10$icMcEKQ62ME2c31.yQKWRuy21.9xfQrgdATthgCNK8ah9MLzhNHtW', '$2b$10$bj4pjjsNtabn50GKCG3wBO', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(2, 2, '$2b$12$a9dR6se37r7qS/hhUqjkJuv3sUwAiYPT5qL9ZCT8YmitlhJAjbGWu', '$2b$12$RETytW9zXAoYsLKetYJzNu', 0, NULL, 0, 0, NULL, '2024-11-05 07:43:09', NULL, '2024-11-04 12:20:34'),
(3, 3, '$2b$12$RODTvSyqfOLH1BPIQgP1oucEnto1XqYzsjihcCelWwpqh1Xm1qE92', '$2b$12$wlrTzGJe/dXCiMSDeqSJKe', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(4, 4, '$2b$12$vE70jCpgmMEZKwJma3qilO0DB6PuLaFi5lkpIqjdY89as2wgp138W', '$2b$12$NFy6dbFHK6sxohxZsntMoe', 0, NULL, 0, 0, NULL, '2024-11-05 07:17:01', NULL, NULL);

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
  ADD KEY `fk1_conversation_user_account` (`user_one_id`),
  ADD KEY `fk2_conversation_user_account` (`user_two_id`),
  ADD KEY `fk1_conversation_messages` (`last_message_id`);

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
  ADD KEY `Messages_Conversations` (`conversation_id`),
  ADD KEY `fk2_messages_user_account` (`sender_id`),
  ADD KEY `fk3_messages_user_account` (`recipient_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Notifications_User_Account` (`user_id`);

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
  ADD KEY `Transactions_Laundry_Assignment` (`assignment_id`),
  ADD KEY `fk2_transaction_stores` (`store_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_1_addresses` (`address_id`),
  ADD KEY `fk_2_stores` (`store_id`),
  ADD KEY `fk_3_role_permissions` (`role_permissions_id`);

--
-- Indexes for table `user_security`
--
ALTER TABLE `user_security`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk1_user_account` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback_review`
--
ALTER TABLE `feedback_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `related_item`
--
ALTER TABLE `related_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_progress`
--
ALTER TABLE `service_progress`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=341;

--
-- AUTO_INCREMENT for table `service_promo`
--
ALTER TABLE `service_promo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `fk1_activity_log_user_account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `fk1_conversation_messages` FOREIGN KEY (`last_message_id`) REFERENCES `messages` (`id`),
  ADD CONSTRAINT `fk1_conversation_user_account` FOREIGN KEY (`user_one_id`) REFERENCES `user_account` (`id`),
  ADD CONSTRAINT `fk2_conversation_user_account` FOREIGN KEY (`user_two_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `feedback_review`
--
ALTER TABLE `feedback_review`
  ADD CONSTRAINT `fk1_review_stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `fk2_review_customer` FOREIGN KEY (`customer_id`) REFERENCES `user_account` (`id`),
  ADD CONSTRAINT `fk3_review_service_request` FOREIGN KEY (`service_request_id`) REFERENCES `service_request` (`id`);

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
  ADD CONSTRAINT `fk1_assignment_unit` FOREIGN KEY (`unit_id`) REFERENCES `laundry_unit` (`id`),
  ADD CONSTRAINT `fk2_assignment_service` FOREIGN KEY (`service_request_id`) REFERENCES `service_request` (`id`),
  ADD CONSTRAINT `fk3_assignment_user` FOREIGN KEY (`assigned_by`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  ADD CONSTRAINT `Laundry_Unit_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk1_messages_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk2_messages_user_account` FOREIGN KEY (`sender_id`) REFERENCES `user_account` (`id`),
  ADD CONSTRAINT `fk3_messages_user_account` FOREIGN KEY (`recipient_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk1_notifcations_user_account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

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
  ADD CONSTRAINT `fk1_customers` FOREIGN KEY (`customer_id`) REFERENCES `user_account` (`id`),
  ADD CONSTRAINT `fk2_user_acccount` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`),
  ADD CONSTRAINT `fk3_stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

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
  ADD CONSTRAINT `fk1_transaction_laundry_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `laundry_assignment` (`id`),
  ADD CONSTRAINT `fk2_transaction_stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `user_account`
--
ALTER TABLE `user_account`
  ADD CONSTRAINT `fk1_user_account_store` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `fk2_user_account_address` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  ADD CONSTRAINT `fk3_user_account_role` FOREIGN KEY (`role_permissions_id`) REFERENCES `roles_permissions` (`id`);

--
-- Constraints for table `user_security`
--
ALTER TABLE `user_security`
  ADD CONSTRAINT `fk1_user_account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
