-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 06:17 AM
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
-- Database: `reelgood`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `UserID` int(11) NOT NULL,
  `ShowID` int(11) NOT NULL,
  `BookingID` int(11) NOT NULL,
  `BookingDate` date NOT NULL,
  `BookingStatus` int(11) NOT NULL,
  `TotalAmount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `BookingID` int(11) NOT NULL,
  `SeatID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cancellation`
--

CREATE TABLE `cancellation` (
  `BookingID` int(11) NOT NULL,
  `CancellationID` int(11) NOT NULL,
  `CancellationText` varchar(255) NOT NULL,
  `CancellationStatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hall`
--

CREATE TABLE `hall` (
  `HallID` int(11) NOT NULL,
  `HallLocation` varchar(50) NOT NULL,
  `HallCapacity` int(11) NOT NULL,
  `ScreenType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `MovieID` int(11) NOT NULL,
  `MovieTitle` varchar(50) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Duration` varchar(10) NOT NULL,
  `Genre` varchar(50) NOT NULL,
  `Language` varchar(50) NOT NULL,
  `Rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movieshow`
--

CREATE TABLE `movieshow` (
  `HallID` int(11) NOT NULL,
  `MovieID` int(11) NOT NULL,
  `ShowID` int(11) NOT NULL,
  `StartTime` time NOT NULL,
  `ShowDate` date NOT NULL,
  `ShowType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `BookingID` int(11) NOT NULL,
  `PaymentID` int(11) NOT NULL,
  `PaymentDate` date NOT NULL,
  `PaymentStatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `UserID` int(11) NOT NULL,
  `MovieID` int(11) NOT NULL,
  `ReviewID` int(11) NOT NULL,
  `ReviewStars` int(5) NOT NULL,
  `ReviewText` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `SeatID` int(11) NOT NULL,
  `SeatNumber` varchar(2) NOT NULL,
  `HallID` int(11) NOT NULL,
  `SeatStatus` varchar(10) NOT NULL,
  `SeatType` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seat_type`
--

CREATE TABLE `seat_type` (
  `SeatType` varchar(15) NOT NULL,
  `SeatPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` int(11) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Gender` varchar(6) NOT NULL,
  `Role` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `Booking_ShowID` (`ShowID`),
  ADD KEY `Booking_UserID` (`UserID`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD KEY `SeatID` (`SeatID`),
  ADD KEY `BookingID` (`BookingID`);

--
-- Indexes for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD PRIMARY KEY (`CancellationID`),
  ADD KEY `Cancellation_BookingID` (`BookingID`);

--
-- Indexes for table `hall`
--
ALTER TABLE `hall`
  ADD PRIMARY KEY (`HallID`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`MovieID`);

--
-- Indexes for table `movieshow`
--
ALTER TABLE `movieshow`
  ADD PRIMARY KEY (`ShowID`),
  ADD KEY `Show_HallID` (`HallID`),
  ADD KEY `Show_MovieID` (`MovieID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `Payment_BookingID` (`BookingID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `Review_UserID` (`UserID`),
  ADD KEY `Review_MovieID` (`MovieID`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`SeatID`),
  ADD KEY `Seat_HallID` (`HallID`),
  ADD KEY `Seat_SeatType` (`SeatType`);

--
-- Indexes for table `seat_type`
--
ALTER TABLE `seat_type`
  ADD PRIMARY KEY (`SeatType`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `useremail` (`Email`),
  ADD UNIQUE KEY `userphone` (`Phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cancellation`
--
ALTER TABLE `cancellation`
  MODIFY `CancellationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hall`
--
ALTER TABLE `hall`
  MODIFY `HallID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `MovieID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movieshow`
--
ALTER TABLE `movieshow`
  MODIFY `ShowID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `SeatID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `Booking_ShowID` FOREIGN KEY (`ShowID`) REFERENCES `movieshow` (`ShowID`),
  ADD CONSTRAINT `Booking_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD CONSTRAINT `BookingID` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`),
  ADD CONSTRAINT `SeatID` FOREIGN KEY (`SeatID`) REFERENCES `seat` (`SeatID`);

--
-- Constraints for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD CONSTRAINT `Cancellation_BookingID` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`);

--
-- Constraints for table `movieshow`
--
ALTER TABLE `movieshow`
  ADD CONSTRAINT `Show_HallID` FOREIGN KEY (`HallID`) REFERENCES `hall` (`HallID`),
  ADD CONSTRAINT `Show_MovieID` FOREIGN KEY (`MovieID`) REFERENCES `movie` (`MovieID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `Payment_BookingID` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Review_MovieID` FOREIGN KEY (`MovieID`) REFERENCES `movie` (`MovieID`),
  ADD CONSTRAINT `Review_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `Seat_HallID` FOREIGN KEY (`HallID`) REFERENCES `hall` (`HallID`),
  ADD CONSTRAINT `Seat_SeatType` FOREIGN KEY (`SeatType`) REFERENCES `seat_type` (`SeatType`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
