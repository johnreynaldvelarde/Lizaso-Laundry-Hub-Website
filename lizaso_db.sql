-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2024 at 04:38 AM
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
(1, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-03 12:25:18'),
(2, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-04 04:34:50'),
(4, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-04 10:28:09'),
(5, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-05 05:16:17'),
(6, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-05 05:59:06'),
(7, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-05 07:34:22'),
(8, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-05 07:44:40'),
(9, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-06 07:24:06'),
(10, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-06 19:59:55'),
(11, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-06 20:06:17'),
(12, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-07 07:35:27'),
(13, 1, 'Admin', 'authentication', 'admin logged in.', '2024-10-07 07:37:20');

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
(1, 'Balagtas', 'Bulacan', 'Philippines', 'Bulacan', 'Balagtas', '3016', 14.814821, 120.911270, '2024-10-03 04:24:41'),
(2, 'Perez Bulakan, Bulacan', 'Perez Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.766846, 120.896249, '2024-10-03 18:44:43'),
(6, 'Malolos, Bulakan, Bulakan', 'Malolos, Bulakan, Bulakan', 'PH', 'Bulacan', 'Malolos', '3016', 14.851215, 120.818412, '2024-10-04 00:17:14'),
(7, 'Balagtas, Bulakan, Bulacan', 'Balagtas, Bulakan, Bulacan', 'PH', 'Bulacan', 'Balagtas', '3016', 14.824583, 120.906787, '2024-10-04 02:12:38'),
(8, 'Balagtas, Bulacan', 'Balagtas, Bulacan', 'PH', 'Bulacan', 'Balagtas', '3016', 14.824583, 120.906787, '2024-10-04 23:41:09');

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
(1, 1, 2, 'John Reynald', 'P', 'Velarde', 'reynald16', '09124545061', 'reynald16@gmail.com', 1, 1, 0, '2024-10-04 02:43:34'),
(4, 1, 6, 'Alexia', '', 'Midgar', 'alexia12', '09472727061', 'alexia12@gmail.com', 1, 1, 0, '2024-10-04 08:16:12'),
(5, 1, 7, 'Juan', '', 'Tamad', 'juan12', '09172727061', 'juantamad16@gmail.com', 1, 1, 0, '2024-10-04 10:11:59'),
(6, 1, 8, 'Junjun', '', 'Di magiba', 'junjun12', '098787061', 'junjun16@gmail.com', 1, 1, 0, '2024-10-05 07:40:08');

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
(1, 1, '$2b$12$x7DldDLTF6Rd2oOfWlm35eSeUYKqtpnniB7EQQGmody80BB0ROnkG', '$2b$12$B2TcB41SZmahydTVeBzg7O', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(4, 4, '$2b$12$n3CRIIBK7dhvgPI5AteNfe5.vnHRBPYlat7RAnjK4VB4Il9qbz3w2', '$2b$12$PJgltNDCTEUPmSp4Bnqbge', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(5, 5, '$2b$12$CpQ8rTsaF/NcCNlzESBomem0mgbBEWHebvt/MLp7/VS4oNdZo9iNC', '$2b$12$Xa.FuTe7RE5NANAttMxZbu', 0, '', 0, 0, NULL, NULL, NULL, NULL),
(6, 6, '$2b$12$IaYy7vBZzeyCq0BE2VZCjeGFTAmZ.9qzJaXUADKWR/cZpEZwdx.rq', '$2b$12$NodSgx9nFEMu9zDrVl/dWu', 0, '', 0, 0, NULL, NULL, NULL, NULL);

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
(1, 1, 1, 20.00, 0, 0),
(2, 1, 2, 20.00, 0, 0);

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
(1, 1, 'ITM001', 'Ariel Soap', 0, '2024-10-05 07:37:51', '2024-10-05 07:37:51'),
(2, 2, 'ITM002', 'Champion Detergent', 0, '2024-10-05 07:38:11', '2024-10-05 07:38:11');

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
(1, 'Soap', 0, '2024-10-05 07:37:14', '2024-10-05 07:37:14'),
(2, 'Detergent', 0, '2024-10-05 07:37:28', '2024-10-05 07:37:28');

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
(1, 17, 1, 1, '5', '2024-10-05 07:35:15', NULL, 2, 0),
(2, 18, 5, 1, '5', '2024-10-05 07:36:01', NULL, 2, 0);

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
(1, 1, 'Unit 1', '2024-10-04 04:37:39', 0, 0),
(2, 1, 'Unit 2', '2024-10-05 05:16:29', 0, 0),
(3, 1, 'Unit 3', '2024-10-05 05:16:32', 0, 0),
(4, 1, 'Unit 4', '2024-10-05 05:16:35', 0, 0),
(5, 1, 'Unit 5', '2024-10-05 05:16:39', 0, 0),
(6, 1, 'Unit 6', '2024-10-05 07:36:20', 0, 0),
(7, 1, 'Unit 7', '2024-10-05 07:36:26', 0, 0),
(8, 1, 'Unit 8', '2024-10-05 07:36:29', 0, 0),
(9, 1, 'Unit 9', '2024-10-05 07:36:33', 0, 0),
(10, 1, 'Unit 10', '2024-10-05 07:36:35', 0, 0);

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
  `customer_fullname` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT current_timestamp(),
  `pickup_date` timestamp NULL DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `request_status` varchar(100) DEFAULT NULL,
  `qr_code` varchar(255) NOT NULL,
  `qr_code_generated` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_request`
--

INSERT INTO `service_request` (`id`, `store_id`, `user_id`, `customer_id`, `service_type_id`, `customer_fullname`, `notes`, `request_date`, `pickup_date`, `delivery_date`, `request_status`, `qr_code`, `qr_code_generated`) VALUES
(15, 1, NULL, 4, 1, 'Alexia Midgar', '', '2024-10-04 07:35:35', NULL, NULL, 'Pending Pickup', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKuSURBVO3BQY7cQAwEwSxC//9yeo88NSBIM/bSjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJNKl4RO5Y4kdCpdEr5J5YlijVKsUYo1ysXLVN6UhCeS0Kk8ofKmJLypWKMUa5Rij', 1),
(16, 1, NULL, 4, 2, 'Alexia Midgar', '', '2024-10-04 07:35:50', NULL, NULL, 'Cancelled', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK8SURBVO3BQYrkUAwFwXzC979yTi21+mDsKqaFIuIHa4xijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKNcPJSEX1LpktCpvCkJv6TyRLFGKdYoxRrl4mUqb0rCHUnoVN6k8qYkvKlYoxRrlGKNcvFlS', 1),
(17, 1, 1, 1, 1, 'Velarde, John Reynald P', 'Dapat malinis mabuti', '2024-10-04 23:35:15', NULL, NULL, 'Canceled', '', 0),
(18, 1, 1, 5, 3, 'Tamad, Juan ', 'Dapat mabilis', '2024-10-04 23:36:01', NULL, NULL, 'Canceled', '', 0),
(19, 1, NULL, 6, 5, 'Junjun Di magiba', 'Gusto ko maganda linis', '2024-10-04 23:41:58', NULL, NULL, 'Ongoing Pickup', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALQSURBVO3BQa7jSAwFwXyE7n/lHC+5KkCQ7OlPMCJ+sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKxUNJ+CWVkyR0KidJ6FS6JPySyhPFGqVYoxRrlIuXqbwpCSdJ6FROktCp3KHypiS8qVijF', 1),
(20, 1, NULL, 1, 3, 'John Reynald Velarde', '', '2024-10-06 23:37:09', NULL, NULL, 'Pending Pickup', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKkSURBVO3BQY7cWAwFwXyE7n/lHO/M1QcEqardHEbEP1hjFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUa5eKhJHyTSpeEO1TuSMI3qTxRrFGKNUqxRrl4mcqbknCHykkSTlROVN6UhDcVa5RijVKsU', 1);

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
(1, 1, 'Wash', 65.00, '2024-10-03 12:24:41', 0),
(2, 1, 'Dry', 55.00, '2024-10-03 12:24:41', 0),
(3, 1, 'Fold', 30.00, '2024-10-03 12:24:41', 0),
(4, 1, 'Wash/Dry', 125.00, '2024-10-05 07:38:54', 0),
(5, 1, 'Wash/Dry/Fold', 200.00, '2024-10-05 07:39:06', 0);

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
(1, 1, 'LIZASO-1727929481793', 'Lizaso Laundry Hub', 'Main Contact', '', 1, '0000-00-00 00:00:00', '2024-10-03 12:24:41', 0, 0);

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
(1, 1, 'admin', 'admin@example.com', '', 'Admin', '', 'User', 0, 1, 0, 0, '2024-10-03 12:24:41');

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
(1, 1, '$2b$10$c9x.0aNpXaSzRwW/Ua92..7MYICEGbrafsyypBV.0JiN3iLFo9KxO', '$2b$10$EXxGheGxtIxInJV/gyknqO', 0, '', 0, 0, '2024-10-03 04:24:41', NULL, NULL, NULL);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laundry_assignment`
--
ALTER TABLE `laundry_assignment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `service_promotions`
--
ALTER TABLE `service_promotions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
