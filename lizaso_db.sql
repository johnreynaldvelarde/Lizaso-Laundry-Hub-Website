-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2024 at 11:56 AM
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
(1, 'Balagtas, Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-11-01 17:30:44'),
(2, 'Balagtas, Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-11-01 17:30:44'),
(3, 'Perez Bulakan, Bulacan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 14.763461, 120.897659, '2024-11-01 17:35:02'),
(4, 'Bambang Bulakan, Bulakan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.776365, 120.882184, '2024-11-02 10:54:12'),
(5, 'Guiguinto Bulakan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 14.827991, 120.880983, '2024-11-02 11:39:50');

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
(1, 2, 3, 2, '2024-11-01 09:40:48', '2024-11-01 09:40:37', '2024-11-01 09:40:48'),
(2, 1, 2, 5, '2024-11-02 00:47:14', '2024-11-02 00:44:53', '2024-11-02 00:47:14'),
(3, 1, 5, 6, '2024-11-02 03:44:08', '2024-11-02 03:44:08', '2024-11-02 03:44:08');

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
(1, 1, 2, 1, 4, 'Good Services', '2024-11-01 17:41:21', '2024-11-01 17:41:21', 0, NULL, '0000-00-00 00:00:00');

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
(1, 1, 1, 10.00, 8, 1);

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
(1, 1, 'Ariel Soap', 0, '2024-11-01 17:39:27', '2024-11-01 17:39:19');

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
(1, 'Soap', 0, '2024-11-01 17:38:41', '2024-11-01 17:38:41'),
(2, 'Detergent', 0, '2024-11-01 17:38:45', '2024-11-01 17:38:45');

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
(1, 1, 1, 1, '5', '2024-11-01 17:39:55', NULL, 1, 0),
(2, 2, 1, 1, '20', '2024-11-01 19:00:30', NULL, 1, 0),
(3, 3, 1, 1, '5', '2024-11-01 19:13:27', NULL, 1, 0),
(4, 4, 1, 1, '5', '2024-11-01 19:37:14', NULL, 1, 0),
(5, 5, 1, 1, '1', '2024-11-02 17:27:37', NULL, 1, 0);

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
(1, 1, 'Unit 1', '2024-11-01 17:32:15', 0, 0);

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
(1, 1, 2, 3, 'U2FsdGVkX1+Xn1WV0bdh9+JQqLuPhHcAMV8Rywg1Z0A=', 1, '2024-11-01 17:40:37', '2024-11-01 17:41:02'),
(2, 1, 3, 2, 'U2FsdGVkX1/Ox3cTNGxqB24hANRjOcBXdBvemBa30Ho=', 1, '2024-11-01 17:40:48', '2024-11-01 17:40:51'),
(3, 2, 1, 2, 'U2FsdGVkX1+VE3LOMJsTm9vrIbTiPMJwISyjh7Pjph4=', 0, '2024-11-02 08:44:53', '0000-00-00 00:00:00'),
(4, 2, 1, 2, 'U2FsdGVkX1/u7D2UdPlYY1vqB8fH5yFvsxaQ89w5lDk=', 0, '2024-11-02 08:45:41', '0000-00-00 00:00:00'),
(5, 2, 1, 2, 'U2FsdGVkX1+xMyBMV8ovIUAHrXf7AsDy6WhoyMl91/c=', 0, '2024-11-02 08:47:14', '0000-00-00 00:00:00'),
(6, 3, 1, 5, 'U2FsdGVkX18gNHO9ouwz6XoU6LNdl6S7LRwPzQr99ow=', 0, '2024-11-02 11:44:08', '0000-00-00 00:00:00');

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
(1, 1, 1, 5, 50.00),
(2, 3, 1, 1, 10.00),
(3, 4, 1, 5, 50.00),
(4, 5, 1, 1, 10.00);

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
(1, 'Administrator', 1, 1, 1, 1, '2024-11-01 17:30:44', 0),
(2, 'Manager', 1, 1, 1, 1, '2024-11-01 17:30:44', 0),
(3, 'Store Staff', 1, 1, 0, 0, '2024-11-01 17:30:44', 0),
(4, 'Delivery Staff', 1, 0, 0, 0, '2024-11-01 17:30:44', 0);

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
(1, 1, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-01 17:36:46', 1, 'Pickup request received; waiting for staff assignment.'),
(2, 1, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-01 17:38:06', 1, 'Pickup has not yet started.'),
(3, 1, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-01 17:38:06', 1, 'Pickup has not been completed.'),
(4, 1, 'At Store', 'Dropped off at the laundry store.', '2024-11-01 17:38:18', 1, 'The clothes have not yet arrived at the store.'),
(5, 1, 'In Queue', 'Waiting for processing.', '2024-11-01 17:38:18', 1, 'Not yet in queue for processing.'),
(6, 1, 'In Laundry', 'Currently being washed/dried.', '2024-11-01 17:39:55', 1, 'Laundry has not started processing yet.'),
(7, 1, 'Laundry Completed', 'Washing/drying finished.', '2024-11-01 17:40:58', 1, 'Laundry processing has not been completed.'),
(8, 1, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-01 17:40:58', 1, 'Laundry is not yet ready for delivery.'),
(9, 1, 'Out for Delivery', 'On the way to you.', '2024-11-01 17:41:11', 1, 'Laundry has not been dispatched yet.'),
(10, 1, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-11-01 17:41:11', 1, 'Delivery has not been completed.'),
(11, 2, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-01 19:00:30', 1, 'Pickup request received; waiting for staff assignment.'),
(12, 2, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-01 19:00:30', 1, 'Pickup has not yet started.'),
(13, 2, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-01 19:00:30', 1, 'Pickup has not been completed.'),
(14, 2, 'At Store', 'Dropped off at the laundry store.', '2024-11-01 19:00:30', 1, 'The clothes have not yet arrived at the store.'),
(15, 2, 'In Queue', 'Waiting for processing.', '2024-11-01 19:00:30', 1, 'Not yet in queue for processing.'),
(16, 2, 'In Laundry', 'Currently being washed/dried.', '2024-11-01 19:00:30', 1, 'Laundry has not started processing yet.'),
(17, 2, 'Laundry Completed', 'Washing/drying finished.', '2024-11-01 19:00:33', 1, 'Laundry processing has not been completed.'),
(18, 2, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-01 19:00:33', 1, 'Laundry is not yet ready for delivery.'),
(19, 2, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(20, 2, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(21, 3, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-01 19:13:27', 1, 'Pickup request received; waiting for staff assignment.'),
(22, 3, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-01 19:13:27', 1, 'Pickup has not yet started.'),
(23, 3, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-01 19:13:27', 1, 'Pickup has not been completed.'),
(24, 3, 'At Store', 'Dropped off at the laundry store.', '2024-11-01 19:13:27', 1, 'The clothes have not yet arrived at the store.'),
(25, 3, 'In Queue', 'Waiting for processing.', '2024-11-01 19:13:27', 1, 'Not yet in queue for processing.'),
(26, 3, 'In Laundry', 'Currently being washed/dried.', '2024-11-01 19:13:27', 1, 'Laundry has not started processing yet.'),
(27, 3, 'Laundry Completed', 'Washing/drying finished.', '2024-11-01 19:13:32', 1, 'Laundry processing has not been completed.'),
(28, 3, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-01 19:13:32', 1, 'Laundry is not yet ready for delivery.'),
(29, 3, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(30, 3, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(31, 4, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-01 19:37:14', 1, 'Pickup request received; waiting for staff assignment.'),
(32, 4, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-01 19:37:14', 1, 'Pickup has not yet started.'),
(33, 4, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-01 19:37:14', 1, 'Pickup has not been completed.'),
(34, 4, 'At Store', 'Dropped off at the laundry store.', '2024-11-01 19:37:14', 1, 'The clothes have not yet arrived at the store.'),
(35, 4, 'In Queue', 'Waiting for processing.', '2024-11-01 19:37:14', 1, 'Not yet in queue for processing.'),
(36, 4, 'In Laundry', 'Currently being washed/dried.', '2024-11-01 19:37:14', 1, 'Laundry has not started processing yet.'),
(37, 4, 'Laundry Completed', 'Washing/drying finished.', '2024-11-01 19:37:21', 1, 'Laundry processing has not been completed.'),
(38, 4, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-01 19:37:21', 1, 'Laundry is not yet ready for delivery.'),
(39, 4, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(40, 4, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(41, 5, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-11-02 17:27:37', 1, 'Pickup request received; waiting for staff assignment.'),
(42, 5, 'Ongoing Pickup', 'Pickup in progress.', '2024-11-02 17:27:37', 1, 'Pickup has not yet started.'),
(43, 5, 'Completed Pickup', 'Pickup completed successfully.', '2024-11-02 17:27:37', 1, 'Pickup has not been completed.'),
(44, 5, 'At Store', 'Dropped off at the laundry store.', '2024-11-02 17:27:37', 1, 'The clothes have not yet arrived at the store.'),
(45, 5, 'In Queue', 'Waiting for processing.', '2024-11-02 17:27:37', 1, 'Not yet in queue for processing.'),
(46, 5, 'In Laundry', 'Currently being washed/dried.', '2024-11-02 17:27:37', 1, 'Laundry has not started processing yet.'),
(47, 5, 'Laundry Completed', 'Washing/drying finished.', '2024-11-02 18:40:41', 1, 'Laundry processing has not been completed.'),
(48, 5, 'Ready for Delivery', 'Ready to be delivered.', '2024-11-02 18:40:41', 1, 'Laundry is not yet ready for delivery.'),
(49, 5, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(50, 5, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

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
(1, 1, NULL, 20.00, 'Monday, Thursday, Sunday', NULL, NULL, 1, '2024-11-02 18:20:53', 0),
(2, 2, NULL, 50.00, 'Monday, Friday, Thursday', NULL, NULL, 1, '2024-11-02 18:45:20', 0);

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
(1, 1, 3, 2, 1, '#15BF768AF53E4E70962A', 'John Reynald P Velarde', 'Online', NULL, '2024-11-01 09:36:46', '2024-11-01 09:38:06', '2024-11-01 09:41:11', 'Completed Delivery', 'SR-1-#15BF768AF53E4E70962A', 1, 1, 1, 'Cash on Delivery'),
(2, 1, 1, 2, 5, '#53C84DE4C4524C73A35B', 'John Reynald P Velarde', 'Walk-In', '', '2024-11-01 11:00:30', '2024-11-01 10:59:30', NULL, 'Laundry Completed', 'SR-2-#53C84DE4C4524C73A35B', 1, 1, 0, 'Cash'),
(3, 1, 1, 2, 5, '#8D9697EE95AE42BF9EDB', 'John Reynald P Velarde', 'Walk-In', '', '2024-11-01 11:13:27', '2024-11-01 11:12:20', NULL, 'Laundry Completed', 'SR-3-#8D9697EE95AE42BF9EDB', 1, 1, 0, 'Cash'),
(4, 1, 1, 2, 4, '#DF0052729820410FB92C', 'John Reynald P Velarde', 'Walk-In', '', '2024-11-01 11:37:14', '2024-11-01 11:16:22', NULL, 'Laundry Completed', 'SR-4-#DF0052729820410FB92C', 1, 1, 0, 'Cash'),
(5, 1, 1, 5, 1, '#85629BA2804348CB9997', 'Alexia  Midgar', 'Walk-In', '', '2024-11-02 09:27:37', '2024-11-02 08:19:49', NULL, 'Laundry Completed', 'SR-5-#85629BA2804348CB9997', 1, 1, 0, 'Cash');

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
(1, 1, 'Wash', 'Basic wash options to clean clothes', 65.00, '2024-11-01 17:30:44', 0),
(2, 1, 'Dry', NULL, 60.00, '2024-11-01 17:30:44', 0),
(3, 1, 'Fold', NULL, 30.00, '2024-11-01 17:30:44', 0),
(4, 1, 'Wash/Dry', NULL, 125.00, '2024-11-01 17:30:44', 0),
(5, 1, 'Wash/Dry/Fold', NULL, 155.00, '2024-11-01 17:30:44', 0);

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
(1, 1, 'LIZASO-1730453444741', 'Lizaso Laundry Hub', '09310064466', 'lizasolaundryhub@gmail.com', 1, '2024-11-01 17:30:44', '2024-11-01 17:30:44', 1, 0);

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
(3, 1, 3, 'LLH-20241101-0002', 785.00, 'Cash', 'Completed', '2024-11-01 19:13:32', '2024-11-01 19:13:32'),
(4, 1, 4, 'LLH-20241101-0002', 675.00, 'Cash', 'Completed', '2024-11-01 19:37:21', '2024-11-01 19:37:21'),
(5, 1, 5, 'LLH-20241102-0002', 75.00, 'Cash', 'Completed', '2024-11-02 18:40:41', '2024-11-02 18:40:41');

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
(1, 1, 2, 1, 'admin', 'admin@example.com', '09310064466', 'Admin', NULL, 'User', 'Administrator', 1, 1, 1, 0, '2024-11-01 17:30:44'),
(2, 1, 3, NULL, 'velarde16', '', '09472727061', 'John Reynald', 'P', 'Velarde', 'Customer', 1, 1, 0, 0, '2024-11-01 17:33:15'),
(3, 1, NULL, 2, 'juan12', 'juantamad16@gmail.com', '09264747654', 'Juan', '', 'Tamad', 'Delivery Staff', 1, 1, 0, 0, '2024-11-01 17:36:32'),
(4, NULL, NULL, NULL, 'rose12', 'roseroriana16@gmail.com', '09634545061', 'Rose', '', 'Oriana', 'Customer', 0, 1, 0, 0, '2024-11-02 10:51:55'),
(5, 1, 4, NULL, 'alexia16', 'alexia16@gmail.com', '09574848061', 'Alexia', '', 'Midgar', 'Customer', 1, 1, 0, 0, '2024-11-02 10:53:27'),
(6, 1, 5, NULL, 'beta16', 'beta@gmail.com', '09477878061', 'Beta', '', 'Kageno', 'Customer', 1, 1, 0, 0, '2024-10-02 11:39:50');

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
(1, 1, '$2b$10$M2YsiKMbVxUILHdShfhB8unIi0MopitmxV7aE.jo/tDw7Ddj/D0Wi', '$2b$10$VO9./gTfQBxF3boPImSH1O', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(2, 2, '$2b$12$m/UqLDqP9uy7g8dSROLtiepZBJN4j4/CplymcRC..uTQwz6y9z4HS', '$2b$12$/za2ZlFf.gVlGws.0sfSFe', 0, NULL, 0, 0, NULL, '2024-11-01 17:35:23', NULL, NULL),
(3, 3, '$2b$12$fORF3kqavKtH3cOK2pADAuCBEBn.Nh5uII1W9a3sn7CiAaNNEzX9i', '$2b$12$JYbK/bKcWO5dGh729JXa4u', 0, NULL, 0, 0, NULL, '2024-11-01 17:38:00', NULL, '2024-11-01 17:36:32'),
(4, 4, '$2b$12$oLy.jjbsr40tejxh7nVzcOFI5o1hfbGRyFKcDxe0hIfQ89QK2vJEa', '$2b$12$3Y8sOU/AtUATphlD4C2VS.', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(5, 5, '$2b$12$3cnGfHOZdsN8r.NbDusaUuaCjiVTU8Vjb9Rnd2qNGCFM7gumWiy.S', '$2b$12$eeC//FZxaOlR1KYfhQypF.', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(6, 6, '$2b$12$xYNw87QQP0YFOaq6JBhwbu5bk/DhiZ/1wMDImi83wrHiSnuYf8gBa', '$2b$12$CeIGEI.bBgKdRlqKnS7LfO', 0, NULL, 0, 0, NULL, NULL, NULL, NULL);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback_review`
--
ALTER TABLE `feedback_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `related_item`
--
ALTER TABLE `related_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_progress`
--
ALTER TABLE `service_progress`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `service_promo`
--
ALTER TABLE `service_promo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
