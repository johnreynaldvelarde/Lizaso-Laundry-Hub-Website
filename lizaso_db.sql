-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2024 at 07:58 AM
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
(9, 1, 'Admin', 'authentication', 'admin logged in.', '2024-09-08 09:52:19');

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
(11, 'Bulakan, Bulacan', 'Bulakan, Bulacan', 'PH', 'Bulacan', 'Bulakan', '3017', 14.794673, 120.879270, '2024-09-02 14:05:55');

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
(4, NULL, NULL, 'Juan', '', 'Tamad', 'juantamad16', '', '', 1, 1, 0, '2024-09-04 05:56:57');

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
(4, 4, '$2b$12$9lWoAI67jHuabfy/69g1/uaSfy2HTrKnd1isy5AmeqWgkeHZ0TwB2', '$2b$12$r8pEBKr3olkeFllkoCksQ.', 0, '', 0, 0, NULL, NULL, NULL, NULL);

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
(10, 21, 16, 1, '', '2024-09-08 13:53:49', NULL, 0, 0);

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
(16, 1, 'Unit 1', '2024-09-06 12:21:07', 1, 0),
(17, 1, 'Unit 2', '2024-09-06 12:21:11', 0, 0),
(18, 1, 'Unit 3', '2024-09-06 12:21:13', 0, 0),
(28, 1, 'Unit 4', '2024-09-08 13:01:17', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `service_request`
--

CREATE TABLE `service_request` (
  `id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `customer_id` bigint(20) NOT NULL,
  `customer_fullname` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `service_type` varchar(255) NOT NULL,
  `request_date` timestamp NULL DEFAULT current_timestamp(),
  `pickup_date` timestamp NULL DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `request_status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_request`
--

INSERT INTO `service_request` (`id`, `store_id`, `user_id`, `customer_id`, `customer_fullname`, `notes`, `service_type`, `request_date`, `pickup_date`, `delivery_date`, `request_status`) VALUES
(21, 1, NULL, 3, 'Alpha Shadow', 'dijdsjnsjnsjndjsndsjndsjndsjndsjndsjndsjndjnsdjsdjnsdjnsdjnsdjnsjndsjndsjndsjndjnsdjnsdnjsnjdsnjdsjndsjndjsndajdadas', 'Wash', '2024-09-06 04:35:21', NULL, NULL, 'In Queue'),
(22, 1, NULL, 3, 'Alpha Shadow', '', 'Wash/Dry', '2024-09-06 04:35:23', NULL, NULL, 'In Queue'),
(23, 1, NULL, 3, 'Alpha Shadow', '', 'Wash/Dry/Fold', '2024-09-06 04:35:25', NULL, NULL, 'In Queue'),
(24, 1, NULL, 3, 'Alpha Shadow', 'dsdsdsdsds', 'Wash', '2024-09-06 04:55:53', NULL, NULL, 'In Queue');

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
(2, 2, 'Lizaso Store 0001', 'Lizaso Malolos', '09124747061', 'lizasomalolos@gmail.com', 0, '2024-09-02 01:51:07', '2024-09-02 01:51:07', 0, 0);

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
(1, 1, 'admin', 'admin@example.com', '', 'Admin', '', 'User', 0, 1, 0, 0, '2024-09-02 07:13:15');

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
  ADD KEY `Service_Request_Customer` (`customer_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer_security`
--
ALTER TABLE `customer_security`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `laundry_unit`
--
ALTER TABLE `laundry_unit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `service_request`
--
ALTER TABLE `service_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `Service_Request_Stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `Service_Request_User_Account` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

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
