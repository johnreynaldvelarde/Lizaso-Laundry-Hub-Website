-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2024 at 12:30 AM
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
(7, 'Bambang Bulakan, Bulacan', 'Philippines', 'Bulacan', 'Bulakan', '3017', 14.763454, 120.897671, '2024-10-26 14:47:17'),
(9, 'Malolos,Bulacan', 'Philippines', 'Bulacan', 'Malolos', '3000', 14.853711, 120.815148, '2024-10-27 18:06:32'),
(10, 'Perez, Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.769246, 120.895116, '2024-10-29 23:48:11'),
(11, 'Perdsdsdsdsdsd', 'PH', 'Bulacan', 'Bulakan', '3017', 14.676787, 121.071206, '2024-10-30 00:07:50');

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
(1, 13, 14, 70, '2024-10-30 01:45:52', '2024-10-26 01:29:49', '2024-10-30 01:45:52'),
(2, 15, 14, 25, '2024-10-26 06:52:03', '2024-10-26 06:49:07', '2024-10-26 06:52:03'),
(3, 1, 14, 77, '2024-10-30 04:03:17', '2024-10-30 03:59:01', '2024-10-30 04:03:17'),
(4, 1, 1, 74, '2024-10-30 04:00:25', '2024-10-30 03:59:22', '2024-10-30 04:00:25');

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

--
-- Dumping data for table `feedback_review`
--

INSERT INTO `feedback_review` (`id`, `store_id`, `customer_id`, `service_request_id`, `rating`, `comment`, `created_at`, `updated_at`, `is_approved`, `response`, `response_created_at`) VALUES
(33, 1, 13, 1, 5, 'Its good laundry services', '2024-10-30 08:02:34', '2024-10-30 08:02:34', 0, NULL, '0000-00-00 00:00:00'),
(34, 1, 13, 16, 5, 'okay ang service', '2024-10-30 09:33:16', '2024-10-30 09:33:16', 0, NULL, '0000-00-00 00:00:00'),
(35, 1, 13, 18, 5, '', '2024-10-30 09:49:09', '2024-10-30 09:49:09', 0, NULL, '0000-00-00 00:00:00');

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
(1, 1, 1, 1212.00, 0, 0),
(2, 1, 2, 20.00, 0, 0),
(3, 1, 3, 10.00, 0, 0);

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
(1, 1, '121212', 0, '2024-10-28 09:13:50', '2024-10-28 09:13:50'),
(2, 1, 'Ariel Soap', 0, '2024-10-31 06:54:55', '2024-10-31 06:54:55'),
(3, 2, 'Zonrox', 0, '2024-10-31 07:19:06', '2024-10-31 07:19:06');

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
(1, 'Soap', 0, '2024-10-27 05:14:42', '2024-10-27 05:14:42'),
(2, 'Detergent', 0, '2024-10-31 07:18:45', '2024-10-31 07:18:45');

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
(3, 16, 1, 1, '1', '2024-10-26 16:58:51', NULL, 1, 0),
(4, 19, 1, 1, '1', '2024-10-29 07:27:26', NULL, 1, 0),
(5, 18, 2, 1, '5', '2024-10-30 09:44:42', NULL, 1, 0),
(6, 23, 1, 1, '1', '2024-10-30 20:15:40', NULL, 2, 0),
(7, 24, 1, 1, '4', '2024-10-30 21:06:55', NULL, 2, 0),
(8, 25, 2, 1, '2', '2024-10-30 21:07:13', NULL, 2, 0),
(9, 26, 1, 1, '2', '2024-10-30 21:14:25', NULL, 2, 0),
(10, 27, 1, 1, '1', '2024-10-30 21:19:21', NULL, 2, 0),
(11, 28, 1, 1, '2', '2024-10-30 21:38:02', NULL, 2, 0),
(12, 29, 1, 1, '2', '2024-10-30 21:57:22', NULL, 2, 0),
(13, 30, 1, 1, '2', '2024-10-30 22:00:30', NULL, 2, 0),
(14, 31, 2, 1, '2', '2024-10-30 22:00:38', NULL, 2, 0);

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
(26, 1, 'Unit 4', '2024-10-30 21:00:34', 0, 0),
(27, 1, 'Unit 5', '2024-10-30 21:00:51', 0, 0),
(28, 1, 'Unit 6', '2024-10-30 21:38:33', 0, 0);

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
(1, 1, 13, 14, 'U2FsdGVkX1+4J8kfTnTRhSdophTkWY2rpM9fnBUAdn0=', 1, '2024-10-26 09:29:49', '2024-10-30 09:48:39'),
(2, 1, 13, 14, 'U2FsdGVkX18rLkHAcDi9wWP9BxeNVG6yrSvPpasC3Lg=', 1, '2024-10-26 09:32:38', '2024-10-30 09:48:39'),
(3, 1, 14, 13, 'U2FsdGVkX1/OpAGQy/QDbqVKzEziE8HNvMgMfKdqIuc=', 1, '2024-10-26 09:33:11', '2024-10-31 07:30:02'),
(4, 1, 14, 13, 'U2FsdGVkX1/KYoneqSiPLIMSvpxcIjD+4Xc4OhIhV/0=', 1, '2024-10-26 13:33:52', '2024-10-31 07:30:02'),
(5, 1, 13, 14, 'U2FsdGVkX1+rw2CLOsmR1qPrf/IwZJNvAWeiULha8sI=', 1, '2024-10-26 13:34:15', '2024-10-30 09:48:39'),
(6, 1, 13, 14, 'U2FsdGVkX19vYZuOnXO/XjwF6q/+p02NaSzJQeXz6dU=', 1, '2024-10-26 13:34:30', '2024-10-30 09:48:39'),
(7, 1, 13, 14, 'U2FsdGVkX19tEYewXnlbIfvYNAvZue2htPn97ebQJEk=', 1, '2024-10-26 13:34:39', '2024-10-30 09:48:39'),
(8, 1, 14, 13, 'U2FsdGVkX1+U+8UnPlmIm3O2ma8jijgZNaAewPM8HFY=', 1, '2024-10-26 13:34:53', '2024-10-31 07:30:02'),
(9, 1, 13, 14, 'U2FsdGVkX1+zkJPctwX6Fc9q6JfHY42Q95CeKezXt2g=', 1, '2024-10-26 13:35:08', '2024-10-30 09:48:39'),
(10, 1, 13, 14, 'U2FsdGVkX19ow9qSQM47kQuinu64Pwch9YT7/DnJBEQtyLNjPgJqPV4czmaQqOHd', 1, '2024-10-26 13:36:45', '2024-10-30 09:48:39'),
(11, 1, 14, 13, 'U2FsdGVkX1+kWBouT88UtcmV3o47iqn6J+7e4o0Li/E=', 1, '2024-10-26 13:36:53', '2024-10-31 07:30:02'),
(12, 1, 14, 13, 'U2FsdGVkX1+fAwI6t7LY7x5dbp12IylOoNwGBeeKShWlDRXDYXWKkZcQXLZKn6CB', 1, '2024-10-26 13:37:08', '2024-10-31 07:30:02'),
(13, 1, 13, 14, 'U2FsdGVkX19VD4qvNEjTnSdC4s2lOh542128XCRtwFY=', 1, '2024-10-26 13:37:37', '2024-10-30 09:48:39'),
(14, 1, 13, 14, 'U2FsdGVkX19MR7ejcCpetZ5PiFOWFt414K8olfdnqjQ=', 1, '2024-10-26 13:38:28', '2024-10-30 09:48:39'),
(15, 1, 14, 13, 'U2FsdGVkX1/Q93vrl8yPgof6IO9bdaIRiZg6YAsZXsE=', 1, '2024-10-26 13:38:36', '2024-10-31 07:30:02'),
(16, 1, 14, 13, 'U2FsdGVkX1+fztnknDnH8OYGosU41Cs0F1ujmDpwgFM=', 1, '2024-10-26 13:39:04', '2024-10-31 07:30:02'),
(17, 1, 13, 14, 'U2FsdGVkX19D489RaIWMXH0+i62zGhVkSVOoVza5XjLUuq8FLfQPCUnBdsErrf8b', 1, '2024-10-26 13:39:44', '2024-10-30 09:48:39'),
(18, 1, 13, 14, 'U2FsdGVkX1+6dMtRtySEOgLRrHEcS8s/phs3yR0QrLs=', 1, '2024-10-26 13:39:52', '2024-10-30 09:48:39'),
(19, 1, 14, 13, 'U2FsdGVkX1+e724pljlpq8idUGCd8JP2JPFtr0qS9yY=', 1, '2024-10-26 13:41:00', '2024-10-31 07:30:02'),
(20, 1, 14, 13, 'U2FsdGVkX19vmLqBmfrV6HEmCPeEu0neE2sAKqW/2Jo=', 1, '2024-10-26 13:41:12', '2024-10-31 07:30:02'),
(21, 1, 14, 13, 'U2FsdGVkX186iRHFSW6AMB2IkTBwebMbA9K1z81WEhc=', 1, '2024-10-26 13:41:16', '2024-10-31 07:30:02'),
(22, 1, 13, 14, 'U2FsdGVkX1+8qPXkyiwKhNAmPOGkoWPezc7igfAMA6w=', 1, '2024-10-26 13:42:06', '2024-10-30 09:48:39'),
(23, 2, 15, 14, 'U2FsdGVkX19mUxNvvrAC/9IqFgV8bP87Hvalwq6xBWU=', 1, '2024-10-26 14:49:07', '2024-10-30 09:49:26'),
(24, 2, 14, 15, 'U2FsdGVkX1+fb8+UK0CNFBEpZVFNM4OQCq25q8uAba4=', 1, '2024-10-26 14:49:20', '2024-10-26 14:58:55'),
(25, 2, 15, 14, 'U2FsdGVkX18tiTyJmNyXGT8C0dxXUJSaHtEP3cIY5W8=', 1, '2024-10-26 14:52:03', '2024-10-30 09:49:26'),
(26, 1, 13, 14, 'U2FsdGVkX1+lCagDM0GizJwsBcKxYqmB69bl+XLXwmo=', 1, '2024-10-27 08:49:32', '2024-10-30 09:48:39'),
(27, 1, 13, 14, 'U2FsdGVkX1+UotlnoysUjtsbr3l5yyONCKvsozjU6EI=', 1, '2024-10-27 08:49:37', '2024-10-30 09:48:39'),
(28, 1, 14, 13, 'U2FsdGVkX19m4qVTPeN94y/KhrMInUMoaSx7vK32s8g=', 1, '2024-10-30 09:18:46', '2024-10-31 07:30:02'),
(29, 1, 14, 13, 'U2FsdGVkX1+R5e2dVbDE2s5+U73dHisPbbxG5nESkAk=', 1, '2024-10-30 09:32:31', '2024-10-31 07:30:02'),
(30, 1, 14, 13, 'U2FsdGVkX1/LClLiqE2CNZ5rzBj4C8fS2p3pISpYVMU=', 1, '2024-10-30 09:32:35', '2024-10-31 07:30:02'),
(31, 1, 14, 13, 'U2FsdGVkX1/LXJ2Kn9hXKJTUwLCJKA6s2x9b2IxEACQ=', 1, '2024-10-30 09:32:37', '2024-10-31 07:30:02'),
(32, 1, 13, 14, 'U2FsdGVkX1/B/OphGGhgNS9E0NKd0pVFvdctFLsLprY=', 1, '2024-10-30 09:40:34', '2024-10-30 09:48:39'),
(33, 1, 13, 14, 'U2FsdGVkX18o8UbQiilFrtQtxsDxubRdZ6oxRyNYSOE=', 1, '2024-10-30 09:40:43', '2024-10-30 09:48:39'),
(34, 1, 14, 13, 'U2FsdGVkX19WgdqPS3/Ys8csLS0Tnw7rhYezDyr0r70=', 1, '2024-10-30 09:41:03', '2024-10-31 07:30:02'),
(35, 1, 13, 14, 'U2FsdGVkX1/Bj/FmBYuy+NKw/Lb76/eXrt3lfufkk0w=', 1, '2024-10-30 09:41:06', '2024-10-30 09:48:39'),
(36, 1, 14, 13, 'U2FsdGVkX1/I2AcUujnZkCZoA74+pmu8FhU/HbJXP78=', 1, '2024-10-30 09:41:12', '2024-10-31 07:30:02'),
(37, 1, 13, 14, 'U2FsdGVkX1/sC6wdvgFla1BTToa8NswItASBGRYGPDo=', 1, '2024-10-30 09:41:14', '2024-10-30 09:48:39'),
(38, 1, 14, 13, 'U2FsdGVkX19cFQlBWx8e+AKlvExAySgbWA0oqny6MwU=', 1, '2024-10-30 09:41:17', '2024-10-31 07:30:02'),
(39, 1, 13, 14, 'U2FsdGVkX1/trbNYyYS/ogYAHhynFbMltMCgzdmPQG8=', 1, '2024-10-30 09:41:20', '2024-10-30 09:48:39'),
(40, 1, 13, 14, 'U2FsdGVkX1+WyP881GfM/pEpxHjONuvHp8/WMotPPUs=', 1, '2024-10-30 09:41:23', '2024-10-30 09:48:39'),
(41, 1, 14, 13, 'U2FsdGVkX1/FDOcHQumt/NO1bMaLoRbGhchEYZ3iTpQ=', 1, '2024-10-30 09:41:26', '2024-10-31 07:30:02'),
(42, 1, 13, 14, 'U2FsdGVkX19NA4FtDJXV4ZCf8fsEY6kwxXga+zXFr8Y=', 1, '2024-10-30 09:41:27', '2024-10-30 09:48:39'),
(43, 1, 13, 14, 'U2FsdGVkX1+yqtqGhL1+LZhnpZ2BQm2+ZE7Ea3wi3eM=', 1, '2024-10-30 09:41:32', '2024-10-30 09:48:39'),
(44, 1, 14, 13, 'U2FsdGVkX1+Vu0eHZW5H0KdsBPZUNmtoUI/Tk1083UE=', 1, '2024-10-30 09:41:32', '2024-10-31 07:30:02'),
(45, 1, 13, 14, 'U2FsdGVkX1/8geX9MOpiTO6kNsozaJV+mb7iJ3aTqEk=', 1, '2024-10-30 09:41:41', '2024-10-30 09:48:39'),
(46, 1, 14, 13, 'U2FsdGVkX1+1VGeiplx4NJos8HC8eMtbnt2Vb4iiKKo=', 1, '2024-10-30 09:41:41', '2024-10-31 07:30:02'),
(47, 1, 13, 14, 'U2FsdGVkX18crlIM06diTPuevP2Gj7JGiMMY98QrH9c=', 1, '2024-10-30 09:41:51', '2024-10-30 09:48:39'),
(48, 1, 14, 13, 'U2FsdGVkX19lBm8by0Wtq70w5Wo5QFXBSHMR0CB/VlY=', 1, '2024-10-30 09:41:52', '2024-10-31 07:30:02'),
(49, 1, 13, 14, 'U2FsdGVkX1+ynGMw2VI+ax2gfMmy91g5cJx2nk9b6Pk=', 1, '2024-10-30 09:42:01', '2024-10-30 09:48:39'),
(50, 1, 13, 14, 'U2FsdGVkX1+Exblewjxyc65prt0Bf3Yvk9Exnk/ykSo=', 1, '2024-10-30 09:42:04', '2024-10-30 09:48:39'),
(51, 1, 13, 14, 'U2FsdGVkX1/rkZpwFv3mOxJHzg4oUkg8pKkPtDjHl6g=', 1, '2024-10-30 09:42:07', '2024-10-30 09:48:39'),
(52, 1, 13, 14, 'U2FsdGVkX18orPwTCTPhdVXCiXnzeXTMeHKDgNW3Eig=', 1, '2024-10-30 09:42:09', '2024-10-30 09:48:39'),
(53, 1, 13, 14, 'U2FsdGVkX1+wZAA4u6nKwK/hQ2zYra43gX4eVVd5DP4=', 1, '2024-10-30 09:42:12', '2024-10-30 09:48:39'),
(54, 1, 14, 13, 'U2FsdGVkX19BlPNxmYxkCtkyLO8ImWS73hK0N3v75yg=', 1, '2024-10-30 09:42:18', '2024-10-31 07:30:02'),
(55, 1, 14, 13, 'U2FsdGVkX18wR1kRwJc2Pw411QpET6Ms3BOb0gYJKa0=', 1, '2024-10-30 09:42:23', '2024-10-31 07:30:02'),
(56, 1, 14, 13, 'U2FsdGVkX19ua2A9uVC6u5NHJfy4Amb9wo2L3lJXl3g=', 1, '2024-10-30 09:42:26', '2024-10-31 07:30:02'),
(57, 1, 14, 13, 'U2FsdGVkX1+adXwaSnKiXTjvAHAwlm/ZpUqymRxqrLQ=', 1, '2024-10-30 09:42:28', '2024-10-31 07:30:02'),
(58, 1, 14, 13, 'U2FsdGVkX19vbeUzV7vMukPdTXr7W+ZahLLxws2aHF8=', 1, '2024-10-30 09:42:30', '2024-10-31 07:30:02'),
(59, 1, 14, 13, 'U2FsdGVkX1/N3asCMA2FG+tj0WjK8CD7lw/5FZTiAWM=', 1, '2024-10-30 09:42:32', '2024-10-31 07:30:02'),
(60, 1, 14, 13, 'U2FsdGVkX19RlSzURI1RmagE+vTyTAiQsmTZpBVLAok=', 1, '2024-10-30 09:42:35', '2024-10-31 07:30:02'),
(61, 1, 13, 14, 'U2FsdGVkX1+kPD14a8dLxaFeaopDamUjnp/DRmLvmWk=', 1, '2024-10-30 09:42:39', '2024-10-30 09:48:39'),
(62, 1, 13, 14, 'U2FsdGVkX1/yBV7xqk43Ze7p6y3N+AMs61j0urhPQeY=', 1, '2024-10-30 09:42:42', '2024-10-30 09:48:39'),
(63, 1, 14, 13, 'U2FsdGVkX18s7GhBs2mMDwizng4uUD6cBfx96Xypug4=', 1, '2024-10-30 09:42:45', '2024-10-31 07:30:02'),
(64, 1, 13, 14, 'U2FsdGVkX181OpAVbvu+iTvvqc/U6gEq08KLoMl/EaU=', 1, '2024-10-30 09:42:48', '2024-10-30 09:48:39'),
(65, 1, 14, 13, 'U2FsdGVkX19nWKQQuGWIKZ7koQe4CQ4AmZ19/wGI4Hg=', 1, '2024-10-30 09:42:51', '2024-10-31 07:30:02'),
(66, 1, 13, 14, 'U2FsdGVkX19Z2v5PldyWewsBKMF8zz4uel49TGVkE9U=', 1, '2024-10-30 09:42:55', '2024-10-30 09:48:39'),
(67, 1, 14, 13, 'U2FsdGVkX19LrAHoVc5Xzi0L7EyMp7gxOeqt1Y818Jk=', 1, '2024-10-30 09:42:58', '2024-10-31 07:30:02'),
(68, 1, 13, 14, 'U2FsdGVkX19A3sUFVxouxEEBG5ZwEvBgaVYdgvmKsOU=', 1, '2024-10-30 09:45:40', '2024-10-30 09:48:39'),
(69, 1, 13, 14, 'U2FsdGVkX19lJfhbloLss8KAfzBEpdXhHJC9DJREZe0=', 1, '2024-10-30 09:45:46', '2024-10-30 09:48:39'),
(70, 1, 13, 14, 'U2FsdGVkX1/sekv5mJblpiVnR76dLLAc/E+ISMlsM+U=', 1, '2024-10-30 09:45:52', '2024-10-30 09:48:39'),
(71, 3, 1, 14, 'U2FsdGVkX1/2Tl5Fg9Jl+IayO6+3xjyFUy7FJne3gO0=', 0, '2024-10-30 11:59:01', '0000-00-00 00:00:00'),
(72, 4, 1, 1, 'U2FsdGVkX19a8uNMKKJxa0Mphy1m8/WHOSDSPnFE8nY=', 0, '2024-10-30 11:59:22', '0000-00-00 00:00:00'),
(73, 4, 1, 1, 'U2FsdGVkX18utYIUVa81FtycfwVdaU08uFm1mmtCRh8=', 0, '2024-10-30 12:00:22', '0000-00-00 00:00:00'),
(74, 4, 1, 1, 'U2FsdGVkX1/YULu72wyt31ANJzdjLXBhdCAssvZEwyo=', 0, '2024-10-30 12:00:25', '0000-00-00 00:00:00'),
(75, 3, 14, 1, 'U2FsdGVkX18eXFRqT3oMS5A0NTnH6S60qvEkN7Rzwak=', 0, '2024-10-30 12:02:49', '0000-00-00 00:00:00'),
(76, 3, 14, 1, 'U2FsdGVkX19wA2+d/yWdZumsLmeQI/KSNwsfVzBts5E=', 0, '2024-10-30 12:03:00', '0000-00-00 00:00:00'),
(77, 3, 14, 1, 'U2FsdGVkX19vmD8QbYtQuoXaFLnh5h1lLFCWuhN3SVc=', 0, '2024-10-30 12:03:17', '0000-00-00 00:00:00');

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
(159, 16, 'Out for Delivery', 'On the way to you.', '2024-10-30 09:33:00', 1, 'Laundry has not been dispatched yet.'),
(160, 16, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-10-30 09:33:00', 1, 'Delivery has not been completed.'),
(161, 17, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-26 14:48:20', 1, 'Pickup request received; waiting for staff assignment.'),
(162, 17, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-26 14:48:53', 1, 'Pickup has not yet started.'),
(163, 17, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-26 14:49:47', 1, 'Pickup has not been completed.'),
(164, 17, 'At Store', 'Dropped off at the laundry store.', '2024-10-26 14:50:06', 1, 'The clothes have not yet arrived at the store.'),
(165, 17, 'In Queue', 'Waiting for processing.', '2024-10-26 14:50:06', 1, 'Not yet in queue for processing.'),
(166, 17, 'In Laundry', 'Currently being washed/dried.', '2024-10-26 14:50:12', 1, 'Laundry has not started processing yet.'),
(167, 17, 'Laundry Completed', 'Washing/drying finished.', '2024-10-26 14:50:43', 1, 'Laundry processing has not been completed.'),
(168, 17, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-26 14:50:43', 1, 'Laundry is not yet ready for delivery.'),
(169, 17, 'Out for Delivery', 'On the way to you.', '2024-10-26 16:51:15', 1, 'Laundry has not been dispatched yet.'),
(170, 17, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(171, 18, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-28 15:26:41', 1, 'Pickup request received; waiting for staff assignment.'),
(172, 18, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 09:43:54', 1, 'Pickup has not yet started.'),
(173, 18, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 09:43:54', 1, 'Pickup has not been completed.'),
(174, 18, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 09:44:37', 1, 'The clothes have not yet arrived at the store.'),
(175, 18, 'In Queue', 'Waiting for processing.', '2024-10-30 09:44:37', 1, 'Not yet in queue for processing.'),
(176, 18, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 09:44:42', 1, 'Laundry has not started processing yet.'),
(177, 18, 'Laundry Completed', 'Washing/drying finished.', '2024-10-30 09:46:13', 1, 'Laundry processing has not been completed.'),
(178, 18, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-30 09:46:13', 1, 'Laundry is not yet ready for delivery.'),
(179, 18, 'Out for Delivery', 'On the way to you.', '2024-10-30 09:48:53', 1, 'Laundry has not been dispatched yet.'),
(180, 18, 'Completed Delivery', 'Delivered and payment confirmed.', '2024-10-30 09:48:53', 1, 'Delivery has not been completed.'),
(181, 19, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-29 07:27:26', 1, 'Pickup request received; waiting for staff assignment.'),
(182, 19, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-29 07:27:26', 1, 'Pickup has not yet started.'),
(183, 19, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-29 07:27:26', 1, 'Pickup has not been completed.'),
(184, 19, 'At Store', 'Dropped off at the laundry store.', '2024-10-29 07:27:26', 1, 'The clothes have not yet arrived at the store.'),
(185, 19, 'In Queue', 'Waiting for processing.', '2024-10-29 07:27:26', 1, 'Not yet in queue for processing.'),
(186, 19, 'In Laundry', 'Currently being washed/dried.', '2024-10-29 07:27:26', 1, 'Laundry has not started processing yet.'),
(187, 19, 'Laundry Completed', 'Washing/drying finished.', '2024-10-30 16:54:39', 1, 'Laundry processing has not been completed.'),
(188, 19, 'Ready for Delivery', 'Ready to be delivered.', '2024-10-30 16:54:39', 1, 'Laundry is not yet ready for delivery.'),
(189, 19, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(190, 19, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(191, 20, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 12:18:50', 1, 'Pickup request received; waiting for staff assignment.'),
(192, 20, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 17:30:31', 1, 'Pickup has not yet started.'),
(193, 20, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(194, 20, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(195, 20, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(196, 20, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(197, 20, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(198, 20, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(199, 20, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(200, 20, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(201, 21, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 17:31:41', 1, 'Pickup request received; waiting for staff assignment.'),
(202, 21, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 17:43:36', 1, 'Pickup has not yet started.'),
(203, 21, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(204, 21, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(205, 21, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(206, 21, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(207, 21, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(208, 21, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(209, 21, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(210, 21, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(211, 22, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 17:45:06', 1, 'Pickup request received; waiting for staff assignment.'),
(212, 22, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 17:45:20', 1, 'Pickup has not yet started.'),
(213, 22, 'Completed Pickup', 'Pickup completed successfully.', NULL, 0, 'Pickup has not been completed.'),
(214, 22, 'At Store', 'Dropped off at the laundry store.', NULL, 0, 'The clothes have not yet arrived at the store.'),
(215, 22, 'In Queue', 'Waiting for processing.', NULL, 0, 'Not yet in queue for processing.'),
(216, 22, 'In Laundry', 'Currently being washed/dried.', NULL, 0, 'Laundry has not started processing yet.'),
(217, 22, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(218, 22, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(219, 22, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(220, 22, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(221, 23, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 20:15:40', 1, 'Pickup request received; waiting for staff assignment.'),
(222, 23, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 20:15:40', 1, 'Pickup has not yet started.'),
(223, 23, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 20:15:40', 1, 'Pickup has not been completed.'),
(224, 23, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 20:15:40', 1, 'The clothes have not yet arrived at the store.'),
(225, 23, 'In Queue', 'Waiting for processing.', '2024-10-30 20:15:40', 1, 'Not yet in queue for processing.'),
(226, 23, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 20:15:40', 1, 'Laundry has not started processing yet.'),
(227, 23, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(228, 23, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(229, 23, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(230, 23, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(231, 24, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 21:06:55', 1, 'Pickup request received; waiting for staff assignment.'),
(232, 24, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 21:06:55', 1, 'Pickup has not yet started.'),
(233, 24, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 21:06:55', 1, 'Pickup has not been completed.'),
(234, 24, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 21:06:55', 1, 'The clothes have not yet arrived at the store.'),
(235, 24, 'In Queue', 'Waiting for processing.', '2024-10-30 21:06:55', 1, 'Not yet in queue for processing.'),
(236, 24, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 21:06:55', 1, 'Laundry has not started processing yet.'),
(237, 24, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(238, 24, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(239, 24, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(240, 24, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(241, 25, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 21:07:13', 1, 'Pickup request received; waiting for staff assignment.'),
(242, 25, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 21:07:13', 1, 'Pickup has not yet started.'),
(243, 25, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 21:07:13', 1, 'Pickup has not been completed.'),
(244, 25, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 21:07:13', 1, 'The clothes have not yet arrived at the store.'),
(245, 25, 'In Queue', 'Waiting for processing.', '2024-10-30 21:07:13', 1, 'Not yet in queue for processing.'),
(246, 25, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 21:07:13', 1, 'Laundry has not started processing yet.'),
(247, 25, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(248, 25, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(249, 25, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(250, 25, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(251, 26, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 21:14:25', 1, 'Pickup request received; waiting for staff assignment.'),
(252, 26, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 21:14:25', 1, 'Pickup has not yet started.'),
(253, 26, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 21:14:25', 1, 'Pickup has not been completed.'),
(254, 26, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 21:14:25', 1, 'The clothes have not yet arrived at the store.'),
(255, 26, 'In Queue', 'Waiting for processing.', '2024-10-30 21:14:25', 1, 'Not yet in queue for processing.'),
(256, 26, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 21:14:25', 1, 'Laundry has not started processing yet.'),
(257, 26, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(258, 26, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(259, 26, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(260, 26, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(261, 27, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 21:19:21', 1, 'Pickup request received; waiting for staff assignment.'),
(262, 27, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 21:19:21', 1, 'Pickup has not yet started.'),
(263, 27, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 21:19:21', 1, 'Pickup has not been completed.'),
(264, 27, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 21:19:21', 1, 'The clothes have not yet arrived at the store.'),
(265, 27, 'In Queue', 'Waiting for processing.', '2024-10-30 21:19:21', 1, 'Not yet in queue for processing.'),
(266, 27, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 21:19:21', 1, 'Laundry has not started processing yet.'),
(267, 27, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(268, 27, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(269, 27, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(270, 27, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(271, 28, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 21:38:02', 1, 'Pickup request received; waiting for staff assignment.'),
(272, 28, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 21:38:02', 1, 'Pickup has not yet started.'),
(273, 28, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 21:38:02', 1, 'Pickup has not been completed.'),
(274, 28, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 21:38:02', 1, 'The clothes have not yet arrived at the store.'),
(275, 28, 'In Queue', 'Waiting for processing.', '2024-10-30 21:38:02', 1, 'Not yet in queue for processing.'),
(276, 28, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 21:38:02', 1, 'Laundry has not started processing yet.'),
(277, 28, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(278, 28, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(279, 28, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(280, 28, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(281, 29, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 21:57:22', 1, 'Pickup request received; waiting for staff assignment.'),
(282, 29, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 21:57:22', 1, 'Pickup has not yet started.'),
(283, 29, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 21:57:22', 1, 'Pickup has not been completed.'),
(284, 29, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 21:57:22', 1, 'The clothes have not yet arrived at the store.'),
(285, 29, 'In Queue', 'Waiting for processing.', '2024-10-30 21:57:22', 1, 'Not yet in queue for processing.'),
(286, 29, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 21:57:22', 1, 'Laundry has not started processing yet.'),
(287, 29, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(288, 29, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(289, 29, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(290, 29, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(291, 30, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 22:00:29', 1, 'Pickup request received; waiting for staff assignment.'),
(292, 30, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 22:00:30', 1, 'Pickup has not yet started.'),
(293, 30, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 22:00:30', 1, 'Pickup has not been completed.'),
(294, 30, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 22:00:30', 1, 'The clothes have not yet arrived at the store.'),
(295, 30, 'In Queue', 'Waiting for processing.', '2024-10-30 22:00:30', 1, 'Not yet in queue for processing.'),
(296, 30, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 22:00:30', 1, 'Laundry has not started processing yet.'),
(297, 30, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(298, 30, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(299, 30, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(300, 30, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.'),
(301, 31, 'Pending Pickup', 'Pickup requested; staff on the way.', '2024-10-30 22:00:38', 1, 'Pickup request received; waiting for staff assignment.'),
(302, 31, 'Ongoing Pickup', 'Pickup in progress.', '2024-10-30 22:00:38', 1, 'Pickup has not yet started.'),
(303, 31, 'Completed Pickup', 'Pickup completed successfully.', '2024-10-30 22:00:38', 1, 'Pickup has not been completed.'),
(304, 31, 'At Store', 'Dropped off at the laundry store.', '2024-10-30 22:00:38', 1, 'The clothes have not yet arrived at the store.'),
(305, 31, 'In Queue', 'Waiting for processing.', '2024-10-30 22:00:38', 1, 'Not yet in queue for processing.'),
(306, 31, 'In Laundry', 'Currently being washed/dried.', '2024-10-30 22:00:38', 1, 'Laundry has not started processing yet.'),
(307, 31, 'Laundry Completed', 'Washing/drying finished.', NULL, 0, 'Laundry processing has not been completed.'),
(308, 31, 'Ready for Delivery', 'Ready to be delivered.', NULL, 0, 'Laundry is not yet ready for delivery.'),
(309, 31, 'Out for Delivery', 'On the way to you.', NULL, 0, 'Laundry has not been dispatched yet.'),
(310, 31, 'Completed Delivery', 'Delivered and payment confirmed.', NULL, 0, 'Delivery has not been completed.');

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
(16, 1, 14, 13, 5, '#6D37041E80E64A25BDED', 'Alexia  Midgar', 'Online', NULL, '2024-10-26 05:33:32', '2024-10-26 06:44:33', '2024-10-30 01:33:00', 'Completed Delivery', 'SR-16-#6D37041E80E64A25BDED', 1, 1, 1, 'Cash on Delivery'),
(17, 1, 14, 15, 5, '#DD6D217350CA480B9561', 'Rose  Oriana', 'Online', NULL, '2024-10-26 06:48:20', '2024-10-26 06:49:47', NULL, 'Out for Delivery', 'SR-17-#DD6D217350CA480B9561', 1, 1, 0, 'Cash on Delivery'),
(18, 1, 14, 13, 1, '#4C7331A97C364C35ABD3', 'Alexia Midgar', 'Online', '', '2024-10-28 07:26:41', '2024-10-30 01:43:54', '2024-10-30 01:48:53', 'Completed Delivery', 'SR-18-#4C7331A97C364C35ABD3', 1, 1, 1, 'Cash on Delivery'),
(19, 1, 1, 15, 1, '#415F02FC2CE64A299245', 'Rose  Oriana', 'Walk-In', '', '2024-10-28 23:27:26', '2024-10-28 23:26:58', NULL, 'Laundry Completed', 'SR-19-#415F02FC2CE64A299245', 1, 1, 0, 'Cash'),
(20, 1, 14, 13, 5, '#2947078073C84CD8BFC3', 'Alexia Midgar', 'Online', '', '2024-10-30 04:18:50', NULL, NULL, 'Canceled', 'SR-20-#2947078073C84CD8BFC3', 1, 0, 0, 'Cash on Delivery'),
(21, 1, 14, 13, 1, '#8C68B31C147F41B6A939', 'Alexia Midgar', 'Online', '', '2024-10-30 09:31:41', NULL, NULL, 'Canceled', 'SR-21-#8C68B31C147F41B6A939', 1, 0, 0, 'Cash on Delivery'),
(22, 1, 14, 13, 5, '#09E744BE79F1444E906A', 'Alexia Midgar', 'Online', '', '2024-10-30 09:45:06', NULL, NULL, 'Ongoing Pickup', 'SR-22-#09E744BE79F1444E906A', 1, 0, 0, 'Cash on Delivery'),
(23, 1, 1, 18, 1, '#93C3E7F1831745B49380', '1212 1212 12121', 'Walk-In', '', '2024-10-30 12:15:40', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-23-#93C3E7F1831745B49380', 1, 1, 0, ''),
(24, 1, 1, 18, 1, '#4220CFAA0E0446CDA1A8', '1212 1212 12121', 'Walk-In', '1212', '2024-10-30 13:06:55', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-24-#4220CFAA0E0446CDA1A8', 1, 1, 0, ''),
(25, 1, 1, 18, 1, '#85A08225976B42A59D0F', '1212 1212 12121', 'Walk-In', '', '2024-10-30 13:07:13', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-25-#85A08225976B42A59D0F', 1, 1, 0, ''),
(26, 1, 1, 18, 1, '#96E31E3CB3EC4110AFBA', '1212 1212 12121', 'Walk-In', '', '2024-10-30 13:14:25', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-26-#96E31E3CB3EC4110AFBA', 1, 1, 0, ''),
(27, 1, 1, 18, 1, '#57B9A906F7A94BFD80D8', '1212 1212 12121', 'Walk-In', '', '2024-10-30 13:19:21', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-27-#57B9A906F7A94BFD80D8', 1, 1, 0, ''),
(28, 1, 1, 18, 1, '#2FC3ECCA7D3B473F8CA5', '1212 1212 12121', 'Walk-In', '', '2024-10-30 13:38:02', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-28-#2FC3ECCA7D3B473F8CA5', 1, 1, 0, ''),
(29, 1, 1, 18, 1, '#3ED38CA0075F49CDBB34', '1212 1212 12121', 'Walk-In', '', '2024-10-30 13:57:22', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-29-#3ED38CA0075F49CDBB34', 1, 1, 0, ''),
(30, 1, 1, 18, 1, '#9D5699F22A6244D88275', '1212 1212 12121', 'Walk-In', '', '2024-10-30 14:00:29', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-30-#9D5699F22A6244D88275', 1, 1, 0, ''),
(31, 1, 1, 18, 2, '#113E84A5C3F54917AC27', '1212 1212 12121', 'Walk-In', '', '2024-10-30 14:00:38', '2024-10-30 11:30:09', NULL, 'Canceled', 'SR-31-#113E84A5C3F54917AC27', 1, 1, 0, '');

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
(1, 1, 'LIZASO-1729893225730', 'Lizaso Laundry Hub', '09310064466', 'lizasolaundryhub@gmail.com', 1, '2024-10-26 05:53:45', '2024-10-26 05:53:45', 1, 0),
(5, 9, 'LIZASO-20241027-1172', 'Lizaso Laundry Hub Malolos', '0947272061', 'lizasomalolos@gmail.com', 0, '2024-10-27 18:06:32', '2024-10-27 18:06:32', 1, 0);

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
(3, 3, 'LLH-20241026-0002', 155.00, 'Cash on Delivery', 'Completed', '2024-10-26 16:59:02', '2024-10-30 09:33:00'),
(4, 5, 'LLH-20241030-0002', 325.00, 'Cash on Delivery', 'Completed', '2024-10-30 09:46:13', '2024-10-30 09:48:53'),
(5, 4, 'LLH-20241030-0002', 65.00, 'Cash', 'Completed', '2024-10-30 16:54:39', '2024-10-30 16:54:39');

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
(1, 1, 2, 1, 'admin', 'admin@example.com', '09310064466', 'Admin', NULL, 'User', 'Administrator', 1, 1, 1, 0, '2024-10-26 05:53:45'),
(13, 1, 4, NULL, 'alexia16', 'alexia16@gmail.com', '09123434651', 'Alexia', '', 'Midgar', 'Customer', 1, 1, 1, 0, '2024-10-26 06:20:51'),
(14, 1, NULL, 4, 'juan12', 'juan16@gmail.com', '092785858061', 'Juan', '', 'Tamad', 'Delivery Staff', 1, 1, 0, 0, '2024-10-26 09:19:52'),
(15, 1, 7, NULL, 'rose16', 'roseoriana16@gmail.com', '09472727061', 'Rose', '', 'Oriana', 'Customer', 1, 1, 1, 0, '2024-10-26 14:45:51'),
(16, 1, NULL, 4, 'rose12', NULL, '094756564242', 'Rose', '', 'Oriana', 'Manager', 1, 1, 0, 0, '2024-10-29 09:54:07'),
(17, 1, 10, NULL, 'junjun16', 'junjun16@gmail.com', '094764646061', 'Junjun', 'D', 'Magiba', 'Customer', 1, 1, 0, 0, '2024-10-29 22:57:29'),
(18, 1, 11, NULL, '12345', '121221212@gmail.com', '12121', '1212', '1212', '12121', 'Customer', 1, 1, 0, 0, '2024-10-30 00:07:24');

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
(13, 13, '$2b$12$3JjpxGUlQ0Kha.xCJ.Fj9uG7xkanydaYfBkPODzaQG7bOsob1GMmK', '$2b$12$0ksEHF4mYQfa2bQa5DObcu', 0, NULL, 0, 0, NULL, '2024-10-30 09:45:13', NULL, NULL),
(14, 14, '$2b$12$0m/xAtRzXyrf1EtUA7nzxeBdF/KVBsfzXBAnMGBSKB7LiNbx7HqVu', '$2b$12$bdDTMLqwLCMWCRj2pv0KZO', 0, NULL, 0, 0, NULL, '2024-10-30 09:48:13', NULL, '2024-10-26 09:19:52'),
(15, 15, '$2b$12$j5oN6GH5FQ9KnPQ3lzsL3.IJ1o4VwDA/itYU.MJ1Gd8E2Beh7hfyO', '$2b$12$YFiXhGVySxP9vqL5tKpodO', 0, NULL, 0, 0, NULL, '2024-10-26 14:48:04', NULL, NULL),
(16, 16, '$2b$12$cYnkg.wKKbx3QsCtDVc2ZeGsfexYtWFio7OoLd4oNnztR3z8RXLQ6', '$2b$12$/muTi8ffnC5UHkHFGMSaTe', 0, NULL, 0, 0, NULL, NULL, NULL, '2024-10-29 09:54:07'),
(17, 17, '$2b$12$JunLU8pHPR9NXtqDLozfBOXhzH3KyiH0RKSlMeBO.8B8w3hH8pkj2', '$2b$12$erHEpBNHLavJpygJTthZc.', 0, NULL, 0, 0, NULL, NULL, NULL, NULL),
(18, 18, '$2b$12$4V5.Ep7.KNLs8lL3sXrRw.BT9jwFFEgbZ79AittE09cj/c8Qq8GTO', '$2b$12$igbP2wISBlAQr1OvF6mss.', 0, NULL, 0, 0, NULL, NULL, NULL, NULL);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback_review`
--
ALTER TABLE `feedback_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;

--
-- AUTO_INCREMENT for table `service_promo`
--
ALTER TABLE `service_promo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_security`
--
ALTER TABLE `user_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
