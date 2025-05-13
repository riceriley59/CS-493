-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: yelp-api
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `businesses`
--

DROP TABLE IF EXISTS `businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businesses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerid` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subcategory` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesses`
--

LOCK TABLES `businesses` WRITE;
/*!40000 ALTER TABLE `businesses` DISABLE KEYS */;
INSERT INTO `businesses` VALUES (1,16,'American Dream Pizza','2525 NW Monroe Ave.','Corvallis','OR','97330','541-757-1713','Restaurant','Pizza','http://adpizza.com',NULL,'2024-04-30 19:04:35','2024-04-30 19:04:35'),(2,0,'Block 15','300 SW Jefferson Ave.','Corvallis','OR','97333','541-758-2077','Restaurant','Brewpub','http://block15.com',NULL,'2024-04-30 19:15:48','2024-04-30 19:15:48'),(3,1,'Gamagora Geekhouse','108 SW 3rd St.','Corvallis','OR','97333','541-286-8616','Shopping','Games','https://gamagorageekhouse.com',NULL,'2024-04-30 19:16:30','2024-04-30 19:16:30'),(4,2,'Robnett\'s Hardware','400 SW 2nd St.','Corvallis','OR','97333','541-753-5531','Shopping','Hardware',NULL,NULL,'2024-04-30 19:16:41','2024-04-30 19:16:41'),(5,3,'First Alternative Co-op North Store','2855 NW Grant Ave.','Corvallis','OR','97330','541-452-3115','Shopping','Groceries',NULL,NULL,'2024-04-30 19:16:57','2024-04-30 19:16:57'),(6,4,'WinCo Foods','2335 NW Kings Blvd.','Corvallis','OR','97330','541-753-7002','Shopping','Groceries',NULL,NULL,'2024-04-30 19:17:14','2024-04-30 19:17:14'),(7,5,'Fred Meyer','777 NW Kings Blvd.','Corvallis','OR','97330','541-753-9116','Shopping','Groceries',NULL,NULL,'2024-04-30 19:17:26','2024-04-30 19:17:26'),(8,6,'Interzone','1563 NW Monroe Ave.','Corvallis','OR','97330','541-754-5965','Restaurant','Coffee Shop',NULL,NULL,'2024-04-30 19:17:39','2024-04-30 19:17:39'),(9,7,'Bodhi Bakery','500 SW 2nd St.','Corvallis','OR','97333','541-286-4734','Restaurant','Bakery',NULL,NULL,'2024-04-30 19:17:52','2024-04-30 19:17:52'),(10,8,'Local Boyz','1425 NW Monroe Ave.','Corvallis','OR','97330','541-754-5338','Restaurant','Hawaiian',NULL,NULL,'2024-04-30 19:18:02','2024-04-30 19:18:02'),(11,9,'Darkside Cinema','215 SW 4th St.','Corvallis','OR','97333','541-752-4161','Entertainment','Movie Theater','http://darksidecinema.com',NULL,'2024-04-30 19:18:12','2024-04-30 19:18:12'),(12,10,'The Book Bin','215 SW 4th St.','Corvallis','OR','97333','541-752-0040','Shopping','Book Store',NULL,NULL,'2024-04-30 19:18:25','2024-04-30 19:18:25'),(13,11,'Cyclotopia','435 SW 2nd St.','Corvallis','OR','97333','541-757-9694','Shopping','Bicycle Shop',NULL,NULL,'2024-04-30 19:18:37','2024-04-30 19:18:37'),(14,12,'Corvallis Cyclery','344 SW 2nd St.','Corvallis','OR','97333','541-752-5952','Shopping','Bicycle Shop',NULL,NULL,'2024-04-30 19:18:58','2024-04-30 19:18:58'),(15,13,'Oregon Coffee & Tea','215 NW Monroe Ave.','Corvallis','OR','97333','541-752-2421','Shopping','Tea House','http://www.oregoncoffeeandtea.com',NULL,'2024-04-30 19:19:13','2024-04-30 19:19:13'),(16,14,'Spaeth Lumber','1585 NW 9th St.','Corvallis','OR','97330','541-752-1930','Shopping','Hardware',NULL,NULL,'2024-04-30 19:19:24','2024-04-30 19:19:24'),(17,15,'New Morning Bakery','219 SW 2nd St.','Corvallis','OR','97333','541-754-0181','Restaurant','Bakery',NULL,NULL,'2024-04-30 19:19:34','2024-04-30 19:19:34'),(18,3,'First Alternative Co-op South Store','1007 SE 3rd St.','Corvallis','OR','97333','541-753-3115','Shopping','Groceries',NULL,NULL,'2024-04-30 19:19:42','2024-04-30 19:19:42'),(19,7,'Tian Fu','1425 NW Monroe Ave., Suite F','Corvallis','OR','97330','541-757-9690','Restaurant','Chinese','https://www.tianfudiyhotpot.com',NULL,'2024-04-30 19:19:52','2024-04-30 19:19:52'),(20,0,'Block 15 Brewery & Tap Room','3415 SW Deschutes St.','Corvallis','OR','97333','541-752-2337','Restaurant','Brewpub','http://block15.com',NULL,'2024-04-30 19:20:06','2024-04-30 19:20:06');
/*!40000 ALTER TABLE `businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `caption` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `businessId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `businessId` (`businessId`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (2,7,'This is my dinner.','2024-04-30 19:20:31','2024-04-30 19:20:31',8),(3,25,NULL,'2024-04-30 19:20:45','2024-04-30 19:20:45',2),(4,26,'Geekin\' out','2024-04-30 19:20:59','2024-04-30 19:20:59',1),(5,21,NULL,'2024-04-30 19:21:12','2024-04-30 19:21:12',14),(6,28,'Sticky Hands','2024-04-30 19:21:26','2024-04-30 19:21:26',18),(7,21,'Popcorn!','2024-04-30 19:21:38','2024-04-30 19:21:38',9),(8,26,NULL,'2024-04-30 19:21:49','2024-04-30 19:21:49',8),(9,25,'Big fermentor','2024-04-30 19:22:00','2024-04-30 19:22:00',18),(10,20,NULL,'2024-04-30 19:22:12','2024-04-30 19:22:12',2),(11,6,'Cake!','2024-04-30 19:22:30','2024-04-30 19:22:30',15);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `dollars` int NOT NULL,
  `stars` int NOT NULL,
  `review` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `businessId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `businessId` (`businessId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,7,1,4,'Cheap, delicious food.','2024-04-30 19:23:08','2024-04-30 19:23:08',8),(3,25,1,4,'How many fasteners can one room hold?','2024-04-30 19:23:22','2024-04-30 19:23:22',2),(4,26,1,5,'So many games!','2024-04-30 19:23:35','2024-04-30 19:23:35',1),(5,21,2,4,NULL,'2024-04-30 19:23:48','2024-04-30 19:23:48',14),(6,28,1,4,'Good beer, good food, though limited selection.','2024-04-30 19:24:01','2024-04-30 19:24:01',18),(7,21,1,5,'A Corvallis gem.','2024-04-30 19:24:13','2024-04-30 19:24:13',9),(8,26,1,5,'Yummmmmmm!','2024-04-30 19:24:27','2024-04-30 19:24:27',8),(9,25,2,4,NULL,'2024-04-30 19:24:42','2024-04-30 19:24:42',18),(10,20,2,4,NULL,'2024-04-30 19:24:53','2024-04-30 19:24:53',2),(11,6,2,5,'Try the hazlenut torte.  It\'s the best!','2024-04-30 19:25:04','2024-04-30 19:25:04',15);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 19:25:16
