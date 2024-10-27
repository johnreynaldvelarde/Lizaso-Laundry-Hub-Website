-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2024 at 11:02 AM
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
(1, 'Balagtas, Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-10-26 05:53:45'),
(2, 'Balagtas, Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-10-26 05:53:45'),
(4, 'Perez, Bulakan, Bulacan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 37.422094, -122.083922, '2024-10-26 06:21:40'),
(5, 'Bambang Bulakan, Bulacan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 14.763454, 120.897671, '2024-10-26 14:46:38'),
(6, 'Bambang Bulakan, Bulacan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 14.763454, 120.897671, '2024-10-26 14:46:47'),
(7, 'Bambang Bulakan, Bulacan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 14.763454, 120.897671, '2024-10-26 14:47:17');

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
(1, 13, 14, 22, '2024-10-26 05:42:06', '2024-10-26 01:29:49', '2024-10-26 05:42:06'),
(2, 15, 14, 25, '2024-10-26 06:52:03', '2024-10-26 06:49:07', '2024-10-26 06:52:03');

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
(1, 1, 1, 1, '5', '2024-10-26 09:31:52', NULL, 1, 0),
(2, 17, 1, 1, '10', '2024-10-26 14:50:12', NULL, 1, 0),
(3, 16, 1, 1, '1', '2024-10-26 16:58:51', NULL, 1, 0);

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
(1, 1, 'Unit 1', '2024-10-26 05:57:36', 0, 0),
(2, 1, 'Unit 2', '2024-10-26 05:57:39', 0, 0),
(3, 1, 'Unit 3', '2024-10-26 05:57:42', 0, 0),
(4, 1, 'Unit 4', '2024-10-26 05:57:46', 0, 0),
(5, 1, 'Unit 5', '2024-10-26 05:57:49', 0, 0),
(6, 1, 'Unit 6', '2024-10-26 05:57:55', 0, 0),
(7, 1, 'Unit 7', '2024-10-26 05:57:58', 0, 0),
(8, 1, 'Unit 8', '2024-10-26 05:58:00', 0, 0),
(9, 1, 'Unit 9', '2024-10-26 05:58:03', 0, 0),
(10, 1, 'Unit 10', '2024-10-26 05:58:05', 0, 0);

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
(1, 1, 13, 14, 'U2FsdGVkX1+4J8kfTnTRhSdophTkWY2rpM9fnBUAdn0=', 1, '2024-10-26 09:29:49', '2024-10-26 17:01:30'),
(2, 1, 13, 14, 'U2FsdGVkX18rLkHAcDi9wWP9BxeNVG6yrSvPpasC3Lg=', 1, '2024-10-26 09:32:38', '2024-10-26 17:01:30'),
(3, 1, 14, 13, 'U2FsdGVkX1/OpAGQy/QDbqVKzEziE8HNvMgMfKdqIuc=', 1, '2024-10-26 09:33:11', '2024-10-26 16:39:33'),
(4, 1, 14, 13, 'U2FsdGVkX1/KYoneqSiPLIMSvpxcIjD+4Xc4OhIhV/0=', 1, '2024-10-26 13:33:52', '2024-10-26 16:39:33'),
(5, 1, 13, 14, 'U2FsdGVkX1+rw2CLOsmR1qPrf/IwZJNvAWeiULha8sI=', 1, '2024-10-26 13:34:15', '2024-10-26 17:01:30'),
(6, 1, 13, 14, 'U2FsdGVkX19vYZuOnXO/XjwF6q/+p02NaSzJQeXz6dU=', 1, '2024-10-26 13:34:30', '2024-10-26 17:01:30'),
(7, 1, 13, 14, 'U2FsdGVkX19tEYewXnlbIfvYNAvZue2htPn97ebQJEk=', 1, '2024-10-26 13:34:39', '2024-10-26 17:01:30'),
(8, 1, 14, 13, 'U2FsdGVkX1+U+8UnPlmIm3O2ma8jijgZNaAewPM8HFY=', 1, '2024-10-26 13:34:53', '2024-10-26 16:39:33'),
(9, 1, 13, 14, 'U2FsdGVkX1+zkJPctwX6Fc9q6JfHY42Q95CeKezXt2g=', 1, '2024-10-26 13:35:08', '2024-10-26 17:01:30'),
(10, 1, 13, 14, 'U2FsdGVkX19ow9qSQM47kQuinu64Pwch9YT7/DnJBEQtyLNjPgJqPV4czmaQqOHd', 1, '2024-10-26 13:36:45', '2024-10-26 17:01:30'),
(11, 1, 14, 13, 'U2FsdGVkX1+kWBouT88UtcmV3o47iqn6J+7e4o0Li/E=', 1, '2024-10-26 13:36:53', '2024-10-26 16:39:33'),
(12, 1, 14, 13, 'U2FsdGVkX1+fAwI6t7LY7x5dbp12IylOoNwGBeeKShWlDRXDYXWKkZcQXLZKn6CB', 1, '2024-10-26 13:37:08', '2024-10-26 16:39:33'),
(13, 1, 13, 14, 'U2FsdGVkX19VD4qvNEjTnSdC4s2lOh542128XCRtwFY=', 1, '2024-10-26 13:37:37', '2024-10-26 17:01:30'),
(14, 1, 13, 14, 'U2FsdGVkX19MR7ejcCpetZ5PiFOWFt414K8olfdnqjQ=', 1, '2024-10-26 13:38:28', '2024-10-26 17:01:30'),
(15, 1, 14, 13, 'U2FsdGVkX1/Q93vrl8yPgof6IO9bdaIRiZg6YAsZXsE=', 1, '2024-10-26 13:38:36', '2024-10-26 16:39:33'),
(16, 1, 14, 13, 'U2FsdGVkX1+fztnknDnH8OYGosU41Cs0F1ujmDpwgFM=', 1, '2024-10-26 13:39:04', '2024-10-26 16:39:33'),
(17, 1, 13, 14, 'U2FsdGVkX19D489RaIWMXH0+i62zGhVkSVOoVza5XjLUuq8FLfQPCUnBdsErrf8b', 1, '2024-10-26 13:39:44', '2024-10-26 17:01:30'),
(18, 1, 13, 14, 'U2FsdGVkX1+6dMtRtySEOgLRrHEcS8s/phs3yR0QrLs=', 1, '2024-10-26 13:39:52', '2024-10-26 17:01:30'),
(19, 1, 14, 13, 'U2FsdGVkX1+e724pljlpq8idUGCd8JP2JPFtr0qS9yY=', 1, '2024-10-26 13:41:00', '2024-10-26 16:39:33'),
(20, 1, 14, 13, 'U2FsdGVkX19vmLqBmfrV6HEmCPeEu0neE2sAKqW/2Jo=', 1, '2024-10-26 13:41:12', '2024-10-26 16:39:33'),
(21, 1, 14, 13, 'U2FsdGVkX186iRHFSW6AMB2IkTBwebMbA9K1z81WEhc=', 1, '2024-10-26 13:41:16', '2024-10-26 16:39:33'),
(22, 1, 13, 14, 'U2FsdGVkX1+8qPXkyiwKhNAmPOGkoWPezc7igfAMA6w=', 1, '2024-10-26 13:42:06', '2024-10-26 17:01:30'),
(23, 2, 15, 14, 'U2FsdGVkX19mUxNvvrAC/9IqFgV8bP87Hvalwq6xBWU=', 1, '2024-10-26 14:49:07', '2024-10-26 17:01:27'),
(24, 2, 14, 15, 'U2FsdGVkX1+fb8+UK0CNFBEpZVFNM4OQCq25q8uAba4=', 1, '2024-10-26 14:49:20', '2024-10-26 14:58:55'),
(25, 2, 15, 14, 'U2FsdGVkX18tiTyJmNyXGT8C0dxXUJSaHtEP3cIY5W8=', 1, '2024-10-26 14:52:03', '2024-10-26 17:01:27');

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
(1, 'Administrator', 1, 1, 1, 1, '2024-10-26 05:53:45', 0),
(2, 'Delivery Staff', 1, 1, 0, 0, '2024-10-26 09:18:57', 0),
(3, 'Store Staff', 1, 0, 0, 0, '2024-10-26 09:19:03', 0),
(4, 'Manager', 1, 1, 1, 0, '2024-10-26 09:19:12', 0);

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
(1, 1, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 09:10:10', 1, 'Pickup request received; waiting for staff assignment.'),
(2, 1, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 09:22:47', 1, 'Pickup has not yet started.'),
(3, 1, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 09:22:47', 1, 'Pickup has not been completed.'),
(4, 1, 'At Store', 'Dropped off at the laundry store.', '2024-10-26 09:31:47', 1, 'The clothes have not yet arrived at the store.'),
(5, 1, 'In Queue', 'Waiting for processing.', '2024-10-26 09:31:47', 1, 'Not yet in queue for processing.'),
(6, 1, 'In Laundry', 'Currently being washed/dried.', '2024-10-26 09:31:52', 1, 'Laundry has not started processing yet.'),
(7, 1, 'Laundry Completed', 'Washing/drying finished.', '2024-10-26 09:32:07', 1, 'Laundry processing has not been completed.'),
(8, 1, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-26 09:32:07', 1, 'Laundry is not yet ready for delivery.'),
(9, 1, 'Out for Delivery', 'On the way to you.', '2024-10-26 16:40:10', 1, 'Laundry has not been dispatched yet.'),
(10, 1, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-10-26 16:40:10', 1, 'Delivery has not been completed.'),
(11, 2, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 12:44:56', 1, 'Pickup request received; waiting for staff assignment.'),
(12, 2, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(13, 2, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(14, 2, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(15, 2, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(16, 2, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(17, 2, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(18, 2, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(19, 2, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(20, 2, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(21, 3, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 12:48:28', 1, 'Pickup request received; waiting for staff assignment.'),
(22, 3, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(23, 3, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(24, 3, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(25, 3, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(26, 3, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(27, 3, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(28, 3, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(29, 3, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(30, 3, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(31, 4, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 12:50:22', 1, 'Pickup request received; waiting for staff assignment.'),
(32, 4, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 12:50:40', 1, 'Pickup has not yet started.'),
(33, 4, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 12:50:40', 1, 'Pickup has not been completed.'),
(34, 4, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(35, 4, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(36, 4, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(37, 4, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(38, 4, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(39, 4, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(40, 4, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(41, 5, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:03:05', 1, 'Pickup request received; waiting for staff assignment.'),
(42, 5, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(43, 5, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(44, 5, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(45, 5, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(46, 5, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(47, 5, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(48, 5, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(49, 5, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(50, 5, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(51, 6, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:03:50', 1, 'Pickup request received; waiting for staff assignment.'),
(52, 6, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(53, 6, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(54, 6, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(55, 6, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(56, 6, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(57, 6, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(58, 6, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(59, 6, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(60, 6, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(61, 7, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:04:34', 1, 'Pickup request received; waiting for staff assignment.'),
(62, 7, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:05:52', 1, 'Pickup has not yet started.'),
(63, 7, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 13:05:52', 1, 'Pickup has not been completed.'),
(64, 7, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(65, 7, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(66, 7, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(67, 7, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(68, 7, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(69, 7, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(70, 7, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(71, 8, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:09:32', 1, 'Pickup request received; waiting for staff assignment.'),
(72, 8, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:09:36', 1, 'Pickup has not yet started.'),
(73, 8, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 13:09:36', 1, 'Pickup has not been completed.'),
(74, 8, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(75, 8, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(76, 8, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(77, 8, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(78, 8, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(79, 8, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(80, 8, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(81, 9, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:10:55', 1, 'Pickup request received; waiting for staff assignment.'),
(82, 9, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:11:03', 1, 'Pickup has not yet started.'),
(83, 9, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 13:11:03', 1, 'Pickup has not been completed.'),
(84, 9, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(85, 9, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(86, 9, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(87, 9, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(88, 9, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(89, 9, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(90, 9, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(91, 10, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:11:31', 1, 'Pickup request received; waiting for staff assignment.'),
(92, 10, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:12:07', 1, 'Pickup has not yet started.'),
(93, 10, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 13:12:07', 1, 'Pickup has not been completed.'),
(94, 10, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(95, 10, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(96, 10, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(97, 10, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(98, 10, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(99, 10, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(100, 10, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(101, 11, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:12:32', 1, 'Pickup request received; waiting for staff assignment.'),
(102, 11, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:12:41', 1, 'Pickup has not yet started.'),
(103, 11, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 13:12:41', 1, 'Pickup has not been completed.'),
(104, 11, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(105, 11, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(106, 11, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(107, 11, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(108, 11, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(109, 11, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(110, 11, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(111, 12, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:13:45', 1, 'Pickup request received; waiting for staff assignment.'),
(112, 12, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:14:04', 1, 'Pickup has not yet started.'),
(113, 12, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 13:14:04', 1, 'Pickup has not been completed.'),
(114, 12, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(115, 12, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(116, 12, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(117, 12, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(118, 12, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(119, 12, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(120, 12, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(121, 13, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:18:17', 1, 'Pickup request received; waiting for staff assignment.'),
(122, 13, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(123, 13, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(124, 13, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(125, 13, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(126, 13, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(127, 13, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(128, 13, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(129, 13, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(130, 13, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(131, 14, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:29:47', 1, 'Pickup request received; waiting for staff assignment.'),
(132, 14, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(133, 14, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(134, 14, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(135, 14, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(136, 14, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(137, 14, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(138, 14, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(139, 14, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(140, 14, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(141, 15, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:32:13', 1, 'Pickup request received; waiting for staff assignment.'),
(142, 15, 'Ongoing Pickup', 'Pickup in progress.', NULL, 0, 'Pickup has not yet started.'),
(143, 15, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(144, 15, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(145, 15, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(146, 15, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(147, 15, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(148, 15, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(149, 15, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(150, 15, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(151, 16, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 13:33:32', 1, 'Pickup request received; waiting for staff assignment.'),
(152, 16, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 13:33:40', 1, 'Pickup has not yet started.'),
(153, 16, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 14:44:33', 1, 'Pickup has not been completed.'),
(154, 16, 'At Store', 'Dropped off at the laundry store.', '2024-10-26 16:58:47', 1, 'The clothes have not yet arrived at the store.'),
(155, 16, 'In Queue', 'Waiting for processing.', '2024-10-26 16:58:47', 1, 'Not yet in queue for processing.'),
(156, 16, 'In Laundry', 'Currently being washed/dried.', '2024-10-26 16:58:51', 1, 'Laundry has not started processing yet.'),
(157, 16, 'Laundry Completed', 'Washing/drying finished.', '2024-10-26 16:59:02', 1, 'Laundry processing has not been completed.'),
(158, 16, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-26 16:59:02', 1, 'Laundry is not yet ready for delivery.'),
(159, 16, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(160, 16, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(161, 17, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 14:48:20', 1, 'Pickup request received; waiting for staff assignment.'),
(162, 17, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 14:48:53', 1, 'Pickup has not yet started.'),
(163, 17, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 14:49:47', 1, 'Pickup has not been completed.'),
(164, 17, 'At Store', 'Dropped off at the laundry store.', '2024-10-26 14:50:06', 1, 'The clothes have not yet arrived at the store.'),
(165, 17, 'In Queue', 'Waiting for processing.', '2024-10-26 14:50:06', 1, 'Not yet in queue for processing.'),
(166, 17, 'In Laundry', 'Currently being washed/dried.', '2024-10-26 14:50:12', 1, 'Laundry has not started processing yet.'),
(167, 17, 'Laundry Completed', 'Washing/drying finished.', '2024-10-26 14:50:43', 1, 'Laundry processing has not been completed.'),
(168, 17, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-26 14:50:43', 1, 'Laundry is not yet ready for delivery.'),
(169, 17, 'Out for Delivery', 'On the way to you.', '2024-10-26 16:51:15', 1, 'Laundry has not been dispatched yet.'),
(170, 17, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

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
(1, 1, 14, 13, 1, '#C6970B54B70D4B4D926C', 'Alexia Midgar', 'Online', '', '2024-10-26 01:10:10', '2024-10-26 01:22:47', '2024-10-26 08:40:10', 'Completed Delivery', 'SR-1-#C6970B54B70D4B4D926C', 1, 1, 1, 'Cash on Delivery'),
(2, 1, 14, 13, 1, '#C7B9BCAD682C43F298B4', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 04:44:56', NULL, NULL, 'Canceled', 'SR-2-#C7B9BCAD682C43F298B4', 1, 0, 0, 'Cash on Delivery'),
(3, 1, 14, 13, 3, '#6D62C9B3B381452B9DF3', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 04:48:28', NULL, NULL, 'Canceled', 'SR-3-#6D62C9B3B381452B9DF3', 1, 0, 0, 'Cash on Delivery'),
(4, 1, 14, 13, 1, '#80A5F3E961DF4C17BA51', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 04:50:22', '2024-10-26 04:50:40', NULL, 'Canceled', 'SR-4-#80A5F3E961DF4C17BA51', 1, 1, 0, 'Cash on Delivery'),
(5, 1, 14, 13, 1, '#97F88C4895C64DB2B55A', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:03:05', NULL, NULL, 'Canceled', 'SR-5-#97F88C4895C64DB2B55A', 1, 0, 0, 'Cash on Delivery'),
(6, 1, 14, 13, 1, '#45FABD85F3DD4AF1BB70', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:03:50', NULL, NULL, 'Canceled', 'SR-6-#45FABD85F3DD4AF1BB70', 1, 0, 0, 'Cash on Delivery'),
(7, 1, 14, 13, 1, '#6B46BF2BBC8D4726ABF2', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:04:34', '2024-10-26 05:05:52', NULL, 'Canceled', 'SR-7-#6B46BF2BBC8D4726ABF2', 1, 1, 0, 'Cash on Delivery'),
(8, 1, 14, 13, 1, '#E4DFB82B47264CDEBF60', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:09:32', '2024-10-26 05:09:36', NULL, 'Canceled', 'SR-8-#E4DFB82B47264CDEBF60', 1, 1, 0, 'Cash on Delivery'),
(9, 1, 14, 13, 1, '#9B49D7A0C65D4D359AC4', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:10:55', '2024-10-26 05:11:03', NULL, 'Canceled', 'SR-9-#9B49D7A0C65D4D359AC4', 1, 1, 0, 'Cash on Delivery'),
(10, 1, 14, 13, 5, '#98A89089E293495FB818', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:11:31', '2024-10-26 05:12:07', NULL, 'Canceled', 'SR-10-#98A89089E293495FB818', 1, 1, 0, 'Cash on Delivery'),
(11, 1, 14, 13, 5, '#22847FB4D05E47958117', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:12:32', '2024-10-26 05:12:41', NULL, 'Canceled', 'SR-11-#22847FB4D05E47958117', 1, 1, 0, 'Cash on Delivery'),
(12, 1, 14, 13, 4, '#546D9DFBE24340479EA6', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:13:45', '2024-10-26 05:14:04', NULL, 'Canceled', 'SR-12-#546D9DFBE24340479EA6', 1, 1, 0, 'Cash on Delivery'),
(13, 1, 14, 13, 1, '#92BDC87D9F2F493FBD23', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:18:17', NULL, NULL, 'Canceled', 'SR-13-#92BDC87D9F2F493FBD23', 1, 0, 0, 'Cash on Delivery'),
(14, 1, 14, 13, 1, '#17983EE975184107A00B', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:29:47', NULL, NULL, 'Canceled', 'SR-14-#17983EE975184107A00B', 1, 0, 0, 'Cash on Delivery'),
(15, 1, 14, 13, 1, '#662BED872DEF43AE9162', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:32:13', NULL, NULL, 'Canceled', 'SR-15-#662BED872DEF43AE9162', 1, 0, 0, 'Cash on Delivery'),
(16, 1, 14, 13, 5, '#6D37041E80E64A25BDED', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:33:32', '2024-10-26 06:44:33', NULL, 'Ready for Delivery', 'SR-16-#6D37041E80E64A25BDED', 1, 1, 0, 'Cash on Delivery'),
(17, 1, 14, 15, 5, '#DD6D217350CA480B9561', 'Rose  Oriana', 'Online', NULL, '2024-10-26 06:48:20', '2024-10-26 06:49:47', NULL, 'Out for Delivery', 'SR-17-#DD6D217350CA480B9561', 1, 1, 0, 'Cash on Delivery');

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
(1, 1, 'Wash', 'Cleans fabrics thoroughly', 65.00, '2024-10-26 05:53:45', 0),
(2, 1, 'Dry', 'Dries clothes completely', 60.00, '2024-10-26 05:53:45', 0),
(3, 1, 'Fold', 'Organizes laundry neatly', 30.00, '2024-10-26 05:53:45', 0),
(4, 1, 'Wash/Dry', 'Cleans and dries clothes', 125.00, '2024-10-26 05:53:45', 0),
(5, 1, 'Wash/Dry/Fold', 'Cleans, dries, and organizes', 155.00, '2024-10-26 05:53:45', 0);

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
(1, 1, 'LIZASO-1729893225730', 'Lizaso Laundry Hub', '09310064466', 'lizasolaundryhub@gmail.com', 1, '2024-10-26 05:53:45', '2024-10-26 05:53:45', 0, 0),
(3, 1, 'LIZASO001', 'Lizaso Hub Malolos', '123-456-7890', 'lizasomalolos@lizasolaundry.com', 1, '2024-10-26 06:27:19', '2024-10-26 06:27:19', 1, 0);

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
(1, 1, 'LLH-20241026-0002', 325.00, 'Cash on Delivery', 'Completed', '2024-10-26 09:32:07', '2024-10-26 16:40:10'),
(2, 2, 'LLH-20241026-0004', 1550.00, 'Cash on Delivery', 'Pending', '2024-10-26 14:50:43', '2024-10-26 14:50:43'),
(3, 3, 'LLH-20241026-0002', 155.00, 'Cash on Delivery', 'Pending', '2024-10-26 16:59:02', '2024-10-26 16:59:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `role_permissions_id` bigint(20) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
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
(1, 1, 2, 1, 'admin', 'admin@example.com', '09310064466', 'Admin', NULL, 'User', 'Administrator', 1, 1, 1, 0, '2024-10-26 05:53:45'),
(13, 1, 4, NULL, 'alexia16', 'alexia16@gmail.com', '09123434651', 'Alexia', '', 'Midgar', 'Customer', 1, 1, 1, 0, '2024-10-26 06:20:51'),
(14, 1, NULL, 2, 'juan12', 'juan16@gmail.com', '092785858061', 'Juan', '', 'Tamad', 'Delivery Staff', 1, 1, 0, 0, '2024-10-26 09:19:52'),
(15, 1, 7, NULL, 'rose16', 'roseoriana16@gmail.com', '09472727061', 'Rose', '', 'Oriana', 'Customer', 1, 1, 1, 0, '2024-10-26 14:45:51');

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
(1, 1, '$2b$10$aLZjsXyttu7kaF3cFyoLQuX7tchDRsqEVpv.bVBqAObQN5ZTxSl.K', '$2b$10$IV/uBrvaUVsm7HCllpj0Wu', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(13, 13, '$2b$12$3JjpxGUlQ0Kha.xCJ.Fj9uG7xkanydaYfBkPODzaQG7bOsob1GMmK', '$2b$12$0ksEHF4mYQfa2bQa5DObcu', 0, NULL, 0, 0, NULL, '2024-10-26 16:37:28', NULL, NULL),
(14, 14, '$2b$12$0m/xAtRzXyrf1EtUA7nzxeBdF/KVBsfzXBAnMGBSKB7LiNbx7HqVu', '$2b$12$bdDTMLqwLCMWCRj2pv0KZO', 0, NULL, 0, 0, NULL, '2024-10-26 16:40:03', NULL, '2024-10-26 09:19:52'),
(15, 15, '$2b$12$j5oN6GH5FQ9KnPQ3lzsL3.IJ1o4VwDA/itYU.MJ1Gd8E2Beh7hfyO', '$2b$12$YFiXhGVySxP9vqL5tKpodO', 0, NULL, 0, 0, NULL, '2024-10-26 14:48:04', NULL, NULL);

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
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Customer_Stores` (`store_id`),
  ADD KEY `Customer_Addresses` (`address_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `service_promo`
--
ALTER TABLE `service_promo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `Customer_Addresses` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  ADD CONSTRAINT `Customer_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

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
  ADD CONSTRAINT `Notifications_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

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
  ADD CONSTRAINT `Transactions_Laundry_Assignment` FOREIGN KEY (`assignment_id`) REFERENCES `laundry_assignment` (`id`);

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
