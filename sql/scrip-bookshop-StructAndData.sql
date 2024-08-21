CREATE DATABASE  IF NOT EXISTS `bookshop` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bookshop`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bookshop
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `biography` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Yuval Noah Harar','Yuval Noah Harari (sinh ngày 24 tháng 2 năm 1976) là một nhà sử học người Israel và là giáo sư Khoa Lịch sử tạii Đại học Hebrew Jerusalem'),(2,'Mark Manson','Mark Manson là một tác giả và blogger về self-help người Mỹ.'),(3,'Dale Carnegie','Dale Breckenridge Carnegie là một nhà văn và nhà thuyết trình Mỹ và là người phát triển các lớp tự giáo dục, nghệ thuật bán hàng, huấn luyện đoàn thể, nói trước công chúng và các kỹ năng giao tiếp giữa mọi người.'),(4,'James Clear','James Clear là chuyên gia tâm lý hành vi, đồng thời là tác giả nổi tiếng chuyên viết về chủ đề tạo dựng thói quen. Anh là tác giả của cuốn sách bán chạy Atomic Habits:An easy & proven way to build good habits & break bad ones, từng được dịch sang tiếng Việt với cái tên: Thay đổi tí hon hiệu quả bất ngờ.'),(5,'Nguyễn Nhật Ánh','Nguyễn Nhật Ánh là một nam nhà văn người Việt Nam. Được xem là một trong những nhà văn hiện đại xuất sắc nhất Việt Nam hiện nay, ông được biết đến qua nhiều tác phẩm văn học về đề tài tuổi trẻ. Nhiều tác phẩm của ông được độc giả và giới chuyên môn đánh giá cao, đa số đều đã được chuyển thể thành phim.'),(6,'Phan Thúc Trực','Phan Thúc Trực, hiệu là Hành Quý, Bồ Phong Cẩm Đình, Dưỡng Hạo Hiên, là một Thám hoa triều Nguyễn. Ông cũng là một nhà văn, nhà thơ, nhà sử học, nhà địa lý học trong lịch sử Việt Nam'),(10,'Đức Nguyễn','Đức Nguyễn hay còn được gọi là Ducan là một người từng lang thang ăn ngoài quán và coi việc bếp núc là một gánh nặng, Nhưng Đức dần coi việc ở góc bếp là chuyện vui, để mà cố gắng làm mỗi ngày. Mà chuyện vui thì cần được sẻ chia. Vì vậy mà Ducan Kitchen ra đời như một lẽ tất yếu. Blog này là sự kếp hợp giữa ba niềm yêu thích của bản thân đức đó là: nấu nướng, viết lách và nhiếp ảnh.'),(13,'Tony Buổi Sáng','Thật sự cho đến ngày hôm nay, Tony Buổi Sáng là ai vẫn chẳng ai biết. Mặc dù, Tony buổi sáng là tác giả đã đoạt giải “Cuốn sách được yêu thích nhất” & “Cuốn sách có lượng xuất bản nhiều nhất”; mặc dù vẫn xuất hiện hằng ngày trên Fanpage Tony Buổi Sáng và vẫn tương tác với độc giả. Thế nhưng, vẫn không ai hay diện mạo của tác giả là như thế nào, là nam hay nữ, trẻ hay già, quê quán ở đâu, còn độc thân hay đã có gia đình, có lý lịch và tiểu sử ra sao?….'),(14,'Nhiều tác giả','Không có tác giả rõ ràng'),(15,'Phan Anh','Nói về việc chọn food blogger như một nghề nghiệp để theo đuổi chính thức, Phan Anh chia sẻ: \"Thế giới bếp núc với tôi vốn là một trò chơi tuyệt đẹp mà không biết từ lúc nào tôi đã chìm đắm. Tôi yêu thích cảm giác toàn tâm toàn ý làm ra một món ăn ngon, thưởng thức, chụp ảnh và viết lại những dòng chia sẻ về nó. Đôi lúc tôi làm hỏng, ra một món ăn không thể tệ hơn, nó cũng là kinh nghiệm thú vị. Tôi vốn là một hoạ sĩ, nhà báo trong nhiều năm. Còn bây giờ, tình cờ hoặc tự nguyện chìm đắm, tôi lại là một food blogger phát điên vì đồ ăn.\"'),(16,'Hồ Đắc Thiếu Anh','Hồ Đắc Thiếu Anh-một người con xứ Huế - đã tâm tình, chia sẻ với chúng ta cách nấu những món ăn vừa ngon vừa lành cùng thật nhiều các kiến thức về văn hóa, ẩm thực, phong tục tập quán các vùng miền Việt Nam.'),(17,'Nguyễn Anh Dũng','Thuộc thế hệ 8X, xuất thân từ ngành truyền hình nhưng lại khởi nghiệp với ngành sách, anh Nguyễn Anh Dũng, Giám đốc Công ty CP Sbooks (TP.HCM) đã dần trở thành cái tên quen thuộc và được gọi là “ông bầu sách” trong làng xuất bản. Từ rất nhiều khó khăn, vất vả ban đầu, 4 năm qua Sbooks đã phát hành hàng trăm đầu sách và có chỗ đứng nhất định trong ngành sách Việt Nam.'),(19,'TS Nguyễn Thọ Ánh','TS Nguyễn Thọ Ánh'),(20,'ThS BS Nguyễn Thái Duy','Thạc sĩ, bác sĩ Nguyễn Thái Duy: Tốt nghiệp Đại học Y Dược TP. HCM\n\nNhà sáng lập Anhvanyds - Tiếng Anh chuyên ngành y khoa Việt Nam'),(21,'Hoài Anh','Tác giả sách thiếu nhi'),(22,'Nguyễn Hào','Tác giả sách thiếu nhi'),(23,'Nguyễn Thế Anh','Nguyễn Thế Anh là sử gia chuyên về Việt Nam và Đông Nam Á, sinh năm 1936, tác giả của hơn 120 ấn phẩm gồm sách và bài viết. Nhà làm phim tài liệu Florence Tran, sau khi lên kế hoạch quay một loạt phỏng vấn với ông trong tháng Sáu và tháng Bảy năm 2021, đã đề nghị tôi dẫn chương trình cho một trong số đó. Tôi nhận lời với tất cả nhiệt tình vì đây là lần đầu tiên tôi được gặp một tác giả mà các tác phẩm của ông chưa bao giờ thôi cuốn hút tôi. Nguyễn Thế Anh là một nhà trí thức đi trên lằn ranh, luôn cố gắng làm công việc của mình và không dính dáng tới chính trị, ngay cả khi bị kẹt giữa hai làn đạn.'),(24,'Nguyên Đan','Tác giả sách thiếu nhi'),(25,'Og Mandino','Augustine \"Og\" Mandino II là một tác giả và nhân viên bán hàng người Mỹ gốc Ý. Ông là tác giá cuốn sách bán chạy nhất có tựa đề Người bán hàng vĩ đại nhất thế giới. Cuốn sách này của ông đã bán được hơn 50 triệu bản và được dịch sang hơn 25 thứ tiếng.');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors_products`
--

DROP TABLE IF EXISTS `authors_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_idx` (`author_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `authors_products_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `authors_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors_products`
--

LOCK TABLES `authors_products` WRITE;
/*!40000 ALTER TABLE `authors_products` DISABLE KEYS */;
INSERT INTO `authors_products` VALUES (2,1,1),(3,2,2),(4,3,3),(5,4,4),(6,5,6),(7,5,8),(8,5,9),(9,6,5),(13,10,7),(15,2,10),(19,3,42),(24,2,46),(25,3,11),(26,10,12),(27,15,47),(28,16,48),(29,17,13),(30,13,13),(31,17,14),(32,17,15),(33,17,16),(34,17,17),(35,17,18),(36,17,19),(37,17,20),(38,17,21),(39,17,39),(40,17,42),(41,15,42),(42,17,44),(43,17,46),(44,17,49),(45,5,50),(46,19,51),(47,20,52),(48,5,53),(49,14,54),(50,5,55),(51,5,56),(52,5,57),(54,21,59),(55,22,59),(56,23,60),(57,23,61),(59,24,62),(60,24,63),(61,24,64),(62,25,65),(63,3,66),(64,1,66);
/*!40000 ALTER TABLE `authors_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Dạy nấu ăn'),(18,'Giáo trình'),(12,'Khoa học công nghệ'),(24,'Kĩ năng sống'),(15,'Kinh dị, bí ẩn'),(5,'Lịch sử'),(8,'Tâm lý, tình cảm'),(2,'Thiếu nhi'),(6,'Tiểu sử, tự truyện'),(19,'Tiểu thuyết'),(7,'Tôn giáo'),(16,'Truyền cảm hứng'),(1,'Văn hóa xã hội'),(4,'Văn học viễn tưởng');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `has_review` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,2,40000,0),(6,3,10,5,500000,0),(18,2,2,1,25000,0),(19,2,3,1,180000,0),(20,6,2,7,25000,0),(21,6,3,3,180000,0),(22,6,7,1,480000,0),(23,6,4,1,170000,0),(30,8,2,3,25000,0),(31,7,1,4,20000,0),(32,15,2,1,25000,0),(33,15,1,1,20000,0),(35,22,3,1,180000,0),(36,23,6,6,500000,0),(37,23,2,4,25000,0),(39,24,1,23,20000,0),(40,24,3,1,180000,0),(42,8,5,1,62000,0),(43,25,1,3,20000,0),(44,26,1,1,20002,0),(45,27,1,2,20003,0),(47,28,46,1,2,0),(48,29,8,1,15000,0),(49,29,4,1,170000,0),(53,5,4,1,170000,0),(54,30,2,1,25000,0),(55,30,7,1,480000,0),(57,31,8,3,15000,0),(58,31,2,1,25000,0),(59,32,7,1,480000,0),(60,33,39,1,68000,0),(61,33,8,1,15000,0),(62,34,2,1,25000,0),(63,34,65,1,120000,0),(64,35,20,2,77000,0),(65,35,4,2,170000,0),(66,36,42,1,56000,0),(67,37,6,2,76999,0),(68,38,6,2,76999,1),(71,38,7,21,480000,1),(72,39,7,3,480000,0),(78,40,4,1,170000,NULL),(79,41,8,4,15000,NULL),(80,41,42,1,56000,NULL),(82,42,2,1,25000,NULL),(83,43,3,5,180000,NULL),(84,44,6,1,76999,NULL),(85,44,3,1,180000,NULL),(86,45,39,1,68000,NULL);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(30) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `shipping_fee` float DEFAULT '0',
  `discount` float DEFAULT '0',
  `receiver_phone` varchar(20) DEFAULT NULL,
  `receiver_address` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,'2024-07-27 04:26:39','SHIPPING',120000,20000,0,'093478456','Xã Sập Vạt, Huyện Tống Phan, Phù Cừ, Hưng Yên','Thành Lợi','2024-07-28 22:19:36','2024-08-08 00:24:52'),(2,2,'2024-07-28 04:26:39','CANCELLED',1140000,0,0,'093478456','Xã Sập Vạt, Huyện Tống Phan, Phù Cừ, Hưng Yên','Thành Lợi','2024-07-29 07:32:12','2024-08-08 00:24:52'),(3,1,'2024-07-29 14:56:42','COMPLETED',1100000,0,0,'093478456','Xã Sập Vạt, Huyện Tống Phan, Phù Cừ, Hưng Yên','Thành Lợi','2024-07-29 07:35:57','2024-08-08 21:57:22'),(5,3,'2024-08-08 06:59:19','SHIPPING',206500,36500,0,'0705685698','Xã Sập Vạt, Huyện Tống Phan, Phù Cừ, Hưng Yên','Trần Hải Nam','2024-07-29 13:00:54','2024-08-13 14:08:46'),(6,1,NULL,'PENDING',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-29 14:37:43','2024-07-29 14:43:30'),(7,2,'2024-08-06 03:36:05','SHIPPING',80000,0,0,'093478456','Quận 9, Hồ Chí Minh','Thành Lợi','2024-07-29 15:38:00','2024-08-08 09:26:38'),(8,9,'2024-08-06 23:30:26','COMPLETED',173500,36500,0,'093478456','Thị Trấn Si Ma Cai, Huyện Si Ma Cai, Lào Cai','Mai Thanh Hải','2024-08-02 13:11:13','2024-08-08 00:32:31'),(15,2,'2024-08-06 04:08:17','SHIPPING',45000,0,0,'093478456','Thị Trấn Si Ma Cai, Huyện Si Ma Cai, Lào Cai','Huynh','2024-08-06 03:58:24','2024-08-14 01:19:15'),(22,2,'2024-08-06 05:53:03','SHIPPING',266500,36500,0,'5045054','Thị Trấn Si Ma Cai, Huyện Si Ma Cai, Lào Cai','Huynh','2024-08-06 05:04:49','2024-08-12 03:58:07'),(23,2,'2024-08-06 05:56:47','COMPLETED',3007000,52000,145000,'1234568984','Thị Trấn Si Ma Cai, Huyện Si Ma Cai, Lào Cai','Thu Hà','2024-08-06 05:53:21','2024-08-12 03:58:14'),(24,2,NULL,'PENDING',NULL,NULL,NULL,NULL,NULL,NULL,'2024-08-06 05:56:49','2024-08-06 05:56:49'),(25,9,'2024-08-07 03:16:12','CANCELLED',96503,36500,0,'0934856254','Thị Trấn Si Ma Cai, Huyện Si Ma Cai, Lào Cai','Mai Thanh Hải','2024-08-06 23:33:28','2024-08-08 00:23:06'),(26,9,'2024-08-07 03:44:44','COMPLETED',56502,36500,0,'0934856254','Xã Sập Vạt, Huyện Tống Phan, Phù Cừ, Hưng Yên','Mai Thanh Hải','2024-08-07 03:31:41','2024-08-08 00:23:06'),(27,9,'2024-08-07 03:48:38','CANCELLED',76506,36500,0,'0934856254','Xã Yên Lương, huyện Nghĩa Lỗ, Tỉnh An Bái','Mai Thanh Hải','2024-08-07 03:46:37','2024-08-08 00:23:06'),(28,9,'2024-08-07 04:22:28','CANCELLED',36502,36500,0,'0934856254','Xã Yên Lương, huyện Nghĩa Lỗ, Tỉnh An Bái','Mai Thanh Hải','2024-08-07 04:01:20','2024-08-08 00:23:06'),(29,9,NULL,'PENDING',NULL,NULL,NULL,NULL,NULL,NULL,'2024-08-08 00:37:26','2024-08-08 00:37:26'),(30,3,'2024-08-08 22:09:20','PLACED',544001,39001,0,'0705685698','thôn ngư, Xã Bản Sen','Trần Hải Nam','2024-08-08 15:26:15','2024-08-08 22:09:19'),(31,21,'2024-08-08 23:18:47','SHIPPING',119000,49000,0,'0451636582','Ông Cư, Xã Dương Quang','Nguyễn Tuấn','2024-08-08 22:14:14','2024-08-13 05:54:15'),(32,21,'2024-08-08 23:20:36','PLACED',519001,39001,0,'0451636582','Ôn Hóa, Xã Thường Thắng','Nguyễn Tuấn','2024-08-08 23:19:59','2024-08-08 23:20:36'),(33,21,'2024-08-08 23:25:59','SHIPPING',107001,39001,0,'0451636582','Đường An Phú, Xã Mường Lạn','Nguyễn Tuấn','2024-08-08 23:21:23','2024-08-08 23:49:22'),(34,6,'2024-08-08 23:27:57','SHIPPING',184001,39001,0,'0896574452','An Hải, Xã Nong Luông','Trần Kiên','2024-08-08 23:27:16','2024-08-12 03:58:03'),(35,6,'2024-08-08 23:28:54','PLACED',538000,44000,0,'0896574452','thôn An Mây, Xã Mản Thẩn','Trần Kiên','2024-08-08 23:28:13','2024-08-08 23:28:53'),(36,5,'2024-08-08 23:30:16','CANCELLED',95001,39001,0,'0702363862','A, Xã Phiêng Côn','Nguyễn Hồng','2024-08-08 23:29:44','2024-08-12 01:21:17'),(37,5,'2024-08-08 23:31:56','COMPLETED',190498,36500,0,'0702363862','An Mỹ, Xã Suối Cát','Nguyễn Hồng','2024-08-08 23:30:28','2024-08-14 01:11:23'),(38,5,'2024-08-12 03:52:23','COMPLETED',10369200,135166,0,'0702363862','Dương A, Xã Lạc Thịnh','Nguyễn Hồng','2024-08-09 00:50:35','2024-08-12 03:53:30'),(39,29,'2024-08-12 03:56:19','CANCELLED',1491200,51200,0,'0745841252','Chu A, Xã Tân Quang','Thái Cao','2024-08-12 03:54:48','2024-08-12 03:56:30'),(40,5,'2024-08-13 23:59:03','PLACED',205101,39001,3900.1,'0702363862','Đường 102, Xã Trưng Trắc','Nguyễn Hồng','2024-08-12 04:01:23','2024-08-13 23:59:03'),(41,14,'2024-08-13 21:07:45','PLACED',165000,49000,0,'0395895236','Hải Nam, Xã Sùng Phài','Trương Thân','2024-08-13 13:58:53','2024-08-13 21:07:50'),(42,14,NULL,'PENDING',NULL,NULL,NULL,NULL,NULL,NULL,'2024-08-13 21:09:32','2024-08-13 21:09:32'),(43,5,'2024-08-14 01:09:58','PLACED',935101,39001,3900.1,'0702363862','102, Xã Nặm Lịch','Nguyễn Hồng','2024-08-14 01:07:05','2024-08-14 01:09:58'),(44,5,'2024-08-14 01:17:45','COMPLETED',287599,34000,3400,'0702363862','a, Xã Vĩnh Lộc','Nguyễn Hồng','2024-08-14 01:16:52','2024-08-14 01:20:19'),(45,5,'2024-08-14 01:22:33','CANCELLED',103101,39001,3900.1,'0702363862','102, Xã Tả Thàng','Nguyễn Hồng','2024-08-14 01:22:13','2024-08-14 01:23:21');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` int NOT NULL,
  `publication_year` int DEFAULT NULL,
  `publisher_id` int DEFAULT '1',
  `sales_volume` int DEFAULT '0',
  `star_rating` float DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT '100',
  `priority` float DEFAULT '0',
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `products_ibfk_2` (`publisher_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Sapiens: A Brief History of Humankind','Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us. We are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?',30000,2023,1,80,5,'/images/products/sp1.jpg',200,NULL,0),(2,'The Subtle Art of Not Giving a Hug','There are only so many things we can give a f**k about so we need to figure out which ones really matter, Manson makes clear. While money is nice, caring about what you do with your life is better, because true wealth is about experience. A much-needed grab-you-by-the-shoulders-and-look-you-in-the-eye moment of real-talk, filled with entertaining stories and profane, ruthless humor, The Subtle Art of Not Giving a F**k is a refreshing slap for a generation to help them lead contented, grounded lives.',25000,2022,3,57,4.5,'/images/products/sp2.jpg',200,NULL,1),(3,'Đắc Nhân Tâm','Đây quyển sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia. Cuốn sách đã giúp cho hàng triệu người trên thế giới thay đổi về cách đối nhân xử thế trong cuộc sống, để giúp họ có kỹ năng giao tiếp thành công.',180000,2021,3,44,5,'/images/products/sp3.jpg',100,NULL,1),(4,'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones','James Clear là chuyên gia tâm lý hành vi, đồng thời là tác giả nổi tiếng chuyên viết về chủ đề tạo dựng thói quen. Anh là tác giả của cuốn sách bán chạy Atomic Habits:An easy & proven way to build good habits & break bad ones, từng được dịch sang tiếng Việt với cái tên: Thay đổi tí hon hiệu quả bất ngờ. Cuốn sách luôn nằm trong top 20 tựa sách thể loại phi hư cấu được ưa chuộng và tìm đọc nhiều nhất của Amazon suốt 40 tuần tính đến tháng 9/2019.',170000,2024,12,197,4.7,'/images/products/sp4.jpg',300,NULL,1),(5,'Quốc Sử Di Biên','Quốc sử di biên tên đầy đủ là Đỉnh tập Quốc sử di biên, là một quyển sử tư nhân, viết theo lối Hán văn cổ, ghi chép và bổ sung những sự kiện mà quốc sử của triều đình còn bỏ sót hoặc đề cập chưa chính xác. Sách được Phan Thúc Trực viết vào thời nhà Nguyễn.',62000,2023,4,11,4.3,'/images/products/sp5.jpg',500,NULL,1),(6,'Mắt Biếc','Mắt biếc là tiểu thuyết của nhà văn Nguyễn Nhật Ánh trong loạt truyện viết về tình yêu thanh thiếu niên của tác giả này cùng với Thằng quỷ nhỏ, Cô gái đến từ hôm qua, ...',76999,2019,3,117,4.1,'/images/products/mat-biec.jpg',300,NULL,1),(7,'Về Nhà Ăn Cơm','Với 45 công thức thuần chay đơn giản, dễ nấu trong “Về ăn cơm”- cái tên thân thương gợi lên bữa cơm gia đình đầm ấm sẽ thổi một làn gió mới vào căn bếp nhỏ trong mỗi gia đình để các bạn được tiếp thêm cảm hứng với lối ăn uống lành mạnh này cũng như sẽ đập tan được mọi định kiến của bạn về “ăn chay giả thịt”, hay ăn chay là nhạt nhẽo đã tồn tại trong tâm thức của người Việt suốt một thời gian dài.',480000,2021,1,774,4.6,'/images/products/sp7.jpg',200,NULL,1),(8,'Cho Tôi Xin Một Vé Đi Tuổi Thơ','Cho tôi xin một vé đi tuổi thơ là truyện ngắn của nhà văn Nguyễn Nhật Ánh. Tác phẩm là một trong những sáng tác thành công nhất của ông và nhận được Giải thưởng Văn học ASEAN của năm 2010. Nguyễn Nhật Ánh viết ở mặt sau cuốn sách: \"Tôi viết cuốn sách này không dành cho trẻ em. Tôi viết cho những ai từng là trẻ em\".',15000,2020,2,206,4.4,'/images/products/sp8.jpg',300,NULL,1),(9,'Tôi Thấy Hoa Vàng Trên Cỏ Xanh','Tôi thấy hoa vàng trên cỏ xanh là một tiểu thuyết dành cho thanh thiếu niên của nhà văn Nguyễn Nhật Ánh, xuất bản lần đầu tại Việt Nam vào ngày 9 tháng 12 năm 2010 bởi Nhà xuất bản Trẻ với phần tranh minh họa do Đỗ Hoàng Tường thực hiện.',60000,2023,3,60,5,'/images/products/sp9.jpg',200,NULL,1),(10,'Làm Bạn Với Bầu Trời','Một câu chuyện giản dị, chứa đầy bất ngờ cho tới trang cuối cùng. Và đẹp lộng lẫy, vì lòng vị tha và tình yêu thương, khiến mắt rưng rưng vì một nỗi mừng vui hân hoan. Cuốn sách như một đốm lửa thắp lên lòng khát khao sống tốt trên đời.\n\nViết về điều tốt đã không dễ, viết sao cho người đọc có thể đón nhận đầy cảm xúc tích cực, và muốn được hưởng, được làm những điều tốt dù nhỏ bé... mới thật là khó. Làm bạn với bầu trời của Nguyễn Nhật Ánh đã làm được điều này.\n\nNhư nhà văn từng phát biểu “...điểm mạnh của văn chương nằm ở khả năng thẩm thấu. Bằng hình thức đặc thù của mình, văn chương góp phần mài sắc các ý niệm đạo đức nơi người đọc một cách vô hình. Bồi đắp tâm hồn và nhân cách một cách âm thầm và bền bỉ, đó là chức năng gốc rễ của văn chương, đặc biệt là văn chương viết cho thanh thiếu niên.”',100000,2022,1,10,4.5,'/images/products/lam-ban-voi-bau-troi.jpg',301,NULL,1),(11,'Trên Đường Băng','TRÊN ĐƯỜNG BĂNG là cuốn sách tập hợp những bài viết truyền cảm hứng và hướng dẫn kỹ năng cho các bạn trẻ khi chuẩn bị bước vào đời.\n\nGiá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng)....',104000,2021,1,100,3.5,'/images/products/tren-duong-bang.jpg',300,NULL,1),(12,'Khởi Sự Ăn Chay','“Khởi sự ăn chay” không chỉ là một cuốn sách hướng dẫn nấu ăn, càng không phải đơn thuần là tuyển tập các món chay. Cuốn sách là sự dẫn dắt đầy cảm hứng, sáng tỏ và khoa học dành cho bạn, từ tác giả Đức Nguyễn - một người ăn chay văn minh và khoẻ mạnh. Bạn có thể tìm thấy trong cuốn sách này lời giải đáp cho những băn khoăn cơ bản nhất khi bắt đầu ăn chay. Bạn cũng có thể ồ lên thích thú khi phát hiện ra ăn chay quả là một nghệ thuật, thứ nghệ thuật giờ đây được sáng tỏ dưới góc nhìn khoa học dinh dưỡng. Và rồi bạn háo hứng khám phá những món chay ngon, lành, đẹp như một bài thơ. Bạn sẽ thấy hành trình ăn chay thật vui và thú vị!\n“Đó là hành trình tìm đến sự cân bằng và bình yên giữa ẩm thực và cuộc sống, giữa những lựa chọn cá nhân đến những mục tiêu bền vững hơn cho chính bạn, cho môi trường hay cho Trái Đất. Dù thế nào đi nữa, hãy thử lần giở bất cứ trang sách nào, hẳn bạn sẽ đồng ý với tôi, rằng mỗi trang sách đều là một pho tâm huyết của tác giả - với trọn vẹn tấm lòng, tri thức và tình yêu của anh ấy, là dành cho bạn!” - Food Blogger Phan Anh (Esheep)',167000,2023,3,100,4,'/images/products/khoi-su-an-chay.jpg',900,NULL,1),(13,'Sức Mạnh Của Câu Hỏi','CÁC PHÁT MINH VĨ ĐẠI NHẤT ĐẾN TỪ NHỮNG C U HỎI GIẢN ĐƠN NẢY SINH TỪ CUỘC SỐNG THƯỜNG NHẬT!\n\nNHỮNG THÀNH CÔNG ĐÁNG NGƯỠNG MỘ ĐẾN TỪ NHỮNG SỰ HOÀI NGHI VÀ TÒ MÒ VỚI HỆ TRÌNH VẬT CHẤT TIẾP DIỄN!\n\nNhững câu hỏi tò mò về cuộc sống càng ngày càng ít dần đi khi chúng ta lớn lên. Không phải ta đã hiểu rõ mọi thứ trên thế giới, mà ta đã bị cuộc sống “đồng hóa”, bị những phương thức giáo dục ngăn cản việc đặt ra câu hỏi. “Người lớn” thường sợ việc nhận mình là người kém cỏi hoặc thiếu hiểu biết và sợ nhất việc khiến những người xung quanh nhận ra mình thiếu hiểu biết.\n\nNHƯNG…\n\nBản chất của cuộc đời vốn là những câu hỏi. Cả đời chúng ta đi từ việc trả lời những câu hỏi nhỏ đến câu hỏi lớn. Mỗi giai đoạn trong cuộc đời ta lại đeo đuổi đáp án của một hoặc nhiều câu hỏi khác nhau. Chúng ta hiểu thế giới thông qua các câu hỏi, hòa nhập với xã hội nhờ những câu hỏi, giải quyết vấn đề bằng những câu hỏi, và khám phá nội tâm thông qua các câu hỏi. Tự vấn luôn là biện pháp hữu hiệu để mỗi người trưởng thành, sâu sắc và thông tuệ hơn.',59000,2022,1,112,4.6,'/images/products/suc-manh-cau-hoi.jpg',300,NULL,1),(14,'Tư Duy Ngược','Cúng ta thực sự có hạnh phúc không? Chúng ta có đang sống cuộc đời mình không? Chúng ta có dám dũng cảm chiến thắng mọi khuôn mẫu, định kiến, đi ngược đám đông để khẳng định bản sắc riêng của mình không?. Có bao giờ bạn tự hỏi như thế, rồi có câu trả lời cho chính mình?\n\nTôi biết biết, không phải ai cũng đang sống cuộc đời của mình, không phải ai cũng dám vượt qua mọi lối mòn để sáng tạo và thành công… Dựa trên việc nghiên cứu, tìm hiểu, chắt lọc, tìm kiếm, ghi chép từ các câu chuyện trong đời sống, cũng như trải nghiệm của bản thân, tôi viết cuốn sách này.\n\nCuốn sách sẽ giải mã bạn là ai, bạn cần Tư duy ngược để thành công và hạnh phúc như thế nào và các phương pháp giúp bạn dũng cảm sống cuộc đời mà bạn muốn.',68000,2022,12,101,4.3,'/images/products/tu-duy-nguoc.jpg',400,NULL,1),(15,'Biến Mọi Thứ Thành Tiền - Make Money','Dường như danh từ “tiền” được nhắc đến xuyên suốt cả cuốn sách. Vậy thế nào là tiền? Trong quan niệm của mỗi người, vai trò của tiền là gì? Ngay trong phần một của cuốn sách đã chỉ ra cho người đọc, việc kiếm tiền gây ra nhiều khó khăn. Mỗi một người sẽ đi tìm ra khó khăn của riêng mình, bắt đầu tìm kiếm giá trị của tiền, cách thức phát triển đồng tiền. Đồng tiền sống là đồng tiền có thể tự động hóa, tái tạo và tạo ra giá trị thành công. Cuốn sách được doanh nhân trẻ thành đạt Nguyễn Anh Dũng, người biến những trang sách tri thức mang lại giá trị tốt đẹp cho con người. Mong muốn của anh sẽ gợi mở nguồn cảm hứng khởi nghiệp, mở rộng góc nhìn và có quyết định sáng suốt hơn cho các doanh nhân, bạn trẻ.\n\nTác giả chia sẻ: “Tiền được tạo ra bởi trí tuệ, sức lao động, thời gian của con người nên những gì tạo ra trí tuệ, sức khỏe, tiết kiệm thời gian đều sẽ tạo ra tiền.”\n\n“Cuộc chơi về tiên là cuộc chơi mà tất cả mọi người trong xã hội này đều phải trải qua. Vì vậy chúng ta hãy đồng ý với nhau rằng những người được học, được biết, được rèn luyện chắc chắn sẽ có được thành quả tốt hơn và xứng đáng hơn thay vì chờ đợi sự may mắn.”\n\nCuốn sách “Biến mọi thứ thành tiền” này có thể không phải là phương thứ duy nhất nhưng nó đã minh chứng bằng sự thành công của Sbooks - một doanh nghiệp trẻ sớm đạt được những thành tựu trong khoảng thời gian ngắn.',78000,2021,1,100,4.7,'/images/products/bien-moi-thu-thanh-tien.jpg',400,NULL,1),(16,'Dưỡng Tâm Giàu Có Dưỡng Thân Nghèo Khó','“Dưỡng tâm giàu có Dưỡng Thân Nghèo Khó” là cuốn sách mang lại định nghĩa hoàn hảo về “sự giàu có”. Sự giàu có là một đáp án khiến tôi mất nhiều năm để nhận thức nên, cũng chính là triết lý xuyên suốt giúp tôi sống tốt hơn mỗi ngày. Tôi đã thực sự tin rằng, giàu có không chỉ là khi tích cóp thật nhiều mà nó còn tồn tại khi tôi đem cho đi. Chính vì suy nghĩ tích cực này, đã đem tôi đến bên những câu chuyện khó khăn của mỗi người, chia sẻ và hạnh phúc bên niềm vui của họ. “Dưỡng tâm giàu có Dưỡng Thân Nghèo Khó” đã đưa tôi đến thế giới của an yên, từ bi, đạo hạnh mà bao người mơ ước. Đừng vội đem những khó khăn bạn đang gặp phải so bì với hạnh phúc người khác. Người ta sinh cùng giờ còn có số mệnh khác nhau mà. Chỉ cần bạn cảm thấy vừa đủ thì đó đã là một sự sung túc bao người mong ước rồi. Tôi tin chắc rằng cuốn sách nhỏ này sẽ giúp bạn tự tin sống cuộc đời của mình, dũng cảm đối mặt với khó khăn, và rộng lượng chia sẻ cùng mọi người. Mong rằng trái tim bạn sẽ sớm giàu có.',68000,2023,3,99,4.1,'/images/products/duong-tam-giau.jpg',300,NULL,1),(17,'Dám Thất Bại','Biết đủ đúng lúc khiến bạn trở thành bậc thầy khôn ngoan. Nhưng cái biết đủ vì muốn che giấu sự yếu đuối, lo lắng, hời hợt của bản thân thì đó là cái biết đủ nhỏ nhen.\n\nKhi bạn sợ thất bại, không dám trải nghiệm, không dám thay đổi tức là bạn đang đối xử tệ hại với cuộc đời mình, tước đi quyền được hạnh phúc mà đáng ra cuộc đời bạn vốn sẽ có được.\n\nChỉ duy niềm tin rằng cái thứ ít ỏi mình có được đã đủ lắm rồi - chỉ mình nó thôi cũng đã thành gông xiềng nặng nề ngăn bạn tìm kiếm những thứ khác tốt hơn.',24,2023,1,100,4.5,'/images/products/dam-that-bai.jpg',400,NULL,1),(18,'Dám Nói Không','Bạn đã bao giờ cảm thấy bị ép buộc phải nói “có” khi thực sự muốn nói “không” chưa? Trong một thế giới nơi áp lực xã hội và kỳ vọng không ngừng tăng cao, việc tự lập và bảo vệ giới hạn của bản thân trở thành một thách thức đối với nhiều người.\n\nCuốn sách “Dám Nói Không “No”” không chỉ là một cuốn sách, mà là một hành trình khám phá sâu sắc vào sức mạnh của từ chối và tự tin. Trong cuốn sách này, chúng tôi không chỉ đề cập đến việc nói “không” mà còn tạo ra một khung nhìn toàn diện về sự tự lập, quản lý thời gian, và quyết định.\n\nTừ việc học cách định rõ giá trị của bản thân đến việc phát triển kỹ năng giao tiếp hiệu quả, “Dám Nói Không” không chỉ là một cuốn sách, mà còn là một người bạn đồng hành trong việc bạn xây dựng một cuộc sống đầy ý nghĩa và tự do.',87000,2021,3,92,4.2,'/images/products/dam-noi-k.jpg',350,NULL,1),(19,'Dám Nói Có','Trong vùng an toàn, bạn có mọi thứ một cách ổn định và lặp lại, đồng nghĩa với việc cánh cửa của những trải nghiệm bị phủ bụi. Nếu bạn đã chán với sự tẻ nhạt, cần thêm những điều mới mẻ trong cuộc sống thì đây là lúc bạn đứng dậy và dám nói CÓ với chính bản thân mình. Khi bạn sẵn sàng bước ra khỏi vùng an toàn và dấn bước mở cánh cửa ranh giới, đó mới là điều mà chúng ta cần học, cần làm để chứng minh bản thân đã sống, đã trải nghiệm chứ không đơn giản là tồn tại.\n\nCuối cùng, chúng ta cũng nên nhớ rằng việc dám nói “CÓ” không chỉ là về bản thân mình, mà còn là về việc ủng hộ và truyền cảm hứng cho những người xung quanh. Bằng cách chia sẻ câu chuyện và kinh nghiệm của chúng ta, chúng ta có thể giúp đỡ và khích lệ người khác dám nói “CÓ” và theo đuổi ước mơ của họ.',88000,2022,1,102,4.8,'/images/products/dam-noi-co.jpg',250,NULL,1),(20,'Bí Mật Hành Vi - Đọc Vị Và Giải Mã Bất Kì Ai','Hiểu một ai đó, có vẻ thật dễ nhưng sự thật là khó vô cùng, đặc biệt bất cứ ai cũng có thể sáng nắng chiều mưa. Nhưng nếu hiểu được đối phương rồi thì mọi chuyện sẽ ở trong tầm tay bạn:\n\nĐể có thể đọc vị người khác, đã có nhiều cuốn sách viết về các phương pháp như Enneagram, Disc, hay phương thức tâm lý học khá\n\nCuốn sách này tập hợp nhiều nguồn tài liệu khác nhau trong và ngoài nước và phân tích sâu sắc hơn để người đọc có thể có cái nhìn gần gũi về các phương pháp đó, để có thể chọn cho mình một hướng đi thích hợp giải mã bất cứ ai và đạt được thành công trong việc chinh phục đối phương.',77000,2023,12,121,4,'/images/products/bi-mat-hanh-vi.jpg',200,NULL,1),(21,'Đừng Phí Hoài Tuổi Trẻ','Mô tả sách test',20,2023,12,100,4,'/images/products/dung-phi-hoai-t.jpg',300,NULL,1),(39,'Tư Duy Mở','Con người đang sống trong thời đại công nghệ, khi mọi thứ thay đổi chóng mặt, điều đó đòi hỏi chúng ta phải linh hoạt trong cách tư duy để bắt kịp xu hướng toàn cầu. Hay nói cách khác, chúng ta cần có một tư duy mở để đón nhận và khai phá kiến thức mới, bởi nếu chúng ta cứ khăng khăng giữ định kiến của mình thì sự phát triển sẽ đi vào ngõ cụt.\n\nCụ thể hơn, người có tư duy mở tin rằng chỉ cần họ nỗ lực, thay đổi là có thể tiến bộ hơn. Họ sẽ vui vẻ chấp nhận thử thách, xem thử thách như cơ hội để học hỏi được những điều hay cái mới. Khi đối mặt với khó khăn hay không thành công, người có tư duy mở thường có thái độ: “Cách này không hiệu quả, vậy mình thử cách khác”. Đối với họ, thất bại chỉ là bài học giúp họ hoàn hảo hơn trên con đường khẳng định bản thân và phát triển sự nghiệp.',68000,2023,1,98,4,'/images/products/tu-duy-mo.jpg',350,NULL,1),(42,'Làm Chủ Số Phận','Làm chủ số phận được chia thành 6 chương như 6 chặng đường tạo nên hành trình làm chủ số phận của mỗi người. Trước tiên, ta cần hiểu và phân biệt rạch ròi ranh giới giữa “tiền định” và “số phận”, chỉ khi hiểu được rằng số phận là thứ chưa bao giờ được an bài thì những chặng đường tiếp theo mới có ý nghĩa!\n5 chương tiếp theo mang đến cho ta biết những yếu tố tạo nên số phận, hành trình thay đổi số phận của mỗi người và cách thức thực hiện hành trình ấy. Làm chủ thân – tâm – trí – thần hay lựa chọn bước chân trên đường đạo, đó đều là những bước tiến đưa ta về gần với mục tiêu làm chủ số phận của mình.\n\nĐể kết luận rằng làm chủ số phận là dễ hay khó thực rất khó trả lời, bởi vì nó dễ với người dám làm, dám dấn thân, dám đánh đổi, dám từ bỏ, dám tiến bước, và ngược lại, khó với người không tin, không hiểu, không nghe, không làm. Suy đến cùng, đó là hành trình mà ai cũng muốn mình tới đích nhưng không phải ai cũng dám bước đi, có người bước đi rồi lại chẳng biết cách thức hay phương hướng để đến được đúng đích mình mong.',56000,2021,1,118,4.1,'/images/products/lam-chu-sp.jpg',300,NULL,1),(44,'101 Ý Tưởng Marketing Trong Bán Hàng','Thời đại Marketing 4.0 dường như đã làm cho thị trường thay đổi theo chiều hướng mới, lúc này khách hàng mới nắm vai trò quyết định sản phẩm. Các cộng đồng, nhóm, xuất hiện nhiều trên mạng xã hội cũng chi phối tới việc mua hàng. Khách hàng thì vạn biến và khó lường khiến cho việc sử dụng và thay đổi các chiêu thức Marketing trở nên thách thức và đòi hỏi các ý tưởng Marketing phải đánh trúng tâm lý khách hàng hơn bao giờ hết.\n\nBên cạnh đó công nghệ là tài sản chung, khi bất cứ nhãn hàng, cá nhân nào cũng có thể sử dụng công nghệ để phục vụ cho việc bán hàng, tăng doanh số. Con đường chinh phục khách hàng đã hẹp nay càng hẹp hơn vì phải chịu sự cạnh tranh khốc liệt giữa Marketer này mới Marketer khác, doanh nghiệp này với doanh nghiệp khác.',102000,2024,3,120,4.2,'/images/products/101-y-tuong-m.jpg',300,NULL,1),(46,'Dám Làm Giàu','Có không ít những cuốn sách trên thị trường đã chia sẻ về cách quản lý tài chính, đầu tư sinh lợi hay nghệ thuật khởi nghiệp. Cuốn sách này tập trung vào những vấn đề bạn đang gặp phải khiến cuộc đời bạn như một mớ bòng bong, chăm chỉ nhưng vẫn chẳng đủ tiền cho những thứ vật chất mong muốn, hay đơn giản hơn là sống thoải mái, ít lo nghĩ.\n\nLý trí và tinh thần chính là hai tiềm tố quan trọng nhất trên con đường làm giàu của bạn. Những người giàu có thực sự không chỉ sung túc về vật chất, mà trong tinh thần của họ luôn có một nguồn sức mạnh cực kỳ to lớn, là động lực giúp họ trở nên vĩ đại trong chính cuộc đời mình.',100000,2023,2,99,4.4,'/images/products/dam-lam-giau.jpg',250,NULL,1),(47,'80 Ngày Ăn Khắp Thế Giới','Lần đầu tiên một cuốn sách hướng dẫn nấu ăn và tìm hiểu văn hóa ẩm thực được viết dưới câu chuyện phiêu lưu vòng quanh thế giới của hai bạn nhỏ Việt Nam là Mĩm và Cừu. Hai bạn có một bà mẹ thật đặc biệt mà các bạn cho rằng đó là “phù thủy” vì chỉ cần vẩy, vượt qua 30 cuộc phiêu lưu kỳ thú và cùng học làm 30 món ăn độc đáo trên thế giới đũa sẽ tạo ra bao nhiêu là món ăn ngon. Mùa hè được nghỉ ở nhà, Mĩm và Cừu quyết định sẽ khám phá “căn bếp phép thuật” của mẹ để tìm ra bí mật và bất ngờ tìm thấy một cuốn sách kỳ lạ có tên “80 NGÀY ĂN KHẮP THẾ GIỚI”. Cuốn sách phép thuật đã đưa hai bạn vào một cuộc phiêu lưu kỳ thú từ việc học hỏi tất cả các kỹ năng nấu ăn cơ bản trong bếp, đến việc nắm rõ các quy tắc an toàn khi sử dụng các dụng cụ bếp…. để sẵn sàng “nhặt kiếm lên và đi khắp thế giới”. 80 ngày hạ cánh tới 30 đất nước và vùng lãnh thổvừa độc đáo lạ lẫm vừa quen thuộc, vừa dễ làm vừa đầy thử thách.',153000,2020,2,150,4,'/images/products/80-ngay-dktg.jpg',300,NULL,1),(48,'Nấu Ngon Ăn Lành - 20 Món Mặn Ngon','Ông bà ta xưa có câu: \"Sự ăn cho ta cái lực\". Sức khỏe con người là tài sản quý nhất, và tài sản ấy được gầy dựng mỗi ngày bằng việc ta có được ăn \"ngon\" và \"lành\" hay không. Tâm niệm của tác giả khi viết quyển sách này là truyền tải cách nấu những món ăn truyền thống Việt Nam đến mỗi gia đình Việt để ai cũng có thể mang đến “cơm lành, canh ngọt” cho những người thương yêu; đồng thời “tiếp thị” món ăn Việt đến bạn bè quốc tế. Đó cũng là nguồn cảm hứng của cuốn sách hướng dẫn nấu ăn mà bạn đang cầm trên tay.',70000,2019,5,123,5,'/images/products/nau-an-ngon-lanh.jpg',300,NULL,1),(49,'Chính Sách Ngụ Binh Ư Nông Các Thời: Lý - Trần - Lê Sơ ','Cuốn sách CHÍNH SÁCH NGỤ BINH Ư NÔNG CÁC THỜI LÝ - TRẦN - LÊ SƠ (THẾ KỶ XI - THẾ KỶ XV) không chỉ giúp người đọc hiểu rõ được cơ chế động viên và sử dụng nhân lực trong việc xây dựng tiềm lực quốc phòng kết hợp quân sự với kinh tế, mà còn làm sáng tỏ được tầm nhìn chiến lược về phương thức và nghệ thuật “Chiến tranh nhân dân” của cha ông ta.\n\nTrong một cuộc chiến tranh, thế chiến lược của mỗi bên tham chiến mạnh hay yếu tùy thuộc ở nhiều nhân tố, trong đó có một nhân tố quan trọng là “nghệ thuật” huy động lực lượng vũ trang. Chính sách “Ngụ binh ư nông” nhằm thực hiện toàn dân làm lính, cả nước đánh giặc, đâu đâu cũng có lực lượng chiến đấu tại chỗ, vừa tinh nhuệ cơ động, vừa có khả năng tự cung ứng hậu cần. Đó chính là một cơ sở để tạo nên một binh thế mạnh, một thế chiến lược vững chắc của chiến tranh giữ nước.',89000,2021,12,130,4,'/images/products/ngu-binh.jpg',400,NULL,1),(50,'Chú Bé Rắc Rối','Chú bé rắc rối là câu chuyện về đôi bạn “cùng tiến” An và Nghi. Nghi học giỏi và là một tấm gương sáng bao nhiêu thì An lại ham chơi và lười học bấy nhiêu, và những câu chuyện tréo ngoe bắt đầu xảy ra khi Nghi phải trở thành gia sư bất đắc dĩ của “chú bé rắc rối” An.\n\nVới giọng văn nhẹ nhàng và cách kể chuyện hài hước, nhà văn Nguyễn Nhật Ánh một lần nữa đưa độc giả đi qua nhiều tình huống dở khóc dở cười xoay quanh cuộc sống của hai cậu học trò đáng yêu với những nút thắt và mở tài tình, cùng những bất ngờ thú vị gây tò mò đến từ các nhân vật gần gũi với An, Nghi.\n\nChú bé rắc rối là một lát cắt về thời học trò “nhất quỷ nhì ma” với những kỷ niệm khó quên trong mỗi người.',77000,2022,1,120,5,'/images/products/chu-be-rac-roi.jpg',200,NULL,1),(51,'Giáo Trình Lãnh Đạo Và Quản Lý Cấp Cơ Sở','Nội dung giáo trình là kết quả nghiên cứu đề tài khoa học cấp cơ sở nhằm đáp ứng nhu cầu giảng dạy, học tập và nghiên cứu của sinh viên, học viên cao học chuyên ngành Chính trị học nói chung, chuyên ngành Xây dựng Đảng và Chính quyền nhà nước nói riêng. Giáo trình gồm 6 chương:\n\nChương I: Những vấn đề cơ bản về cấp cơ sở và lãnh đạo, quản lý cấp cơ sở;\n\nChương II: Hoạt động lãnh đạo của tổ chức đảng ở cơ sở;\n\nChương III: Hoạt động quản lý của chính quyền cấp sơ sở;\n\nChương IV: Mặt trận Tổ quốc và các đoàn thể chính trị – xã hội tham gia hoạt động lãnh đạo, quản lý cấp cơ sở;\n\nChương V: Hoạt động tự quản ở cơ sở;\n\nChương VI: Cán bộ lãnh đạo, quản lý và công chức cấp cơ sở.',62000,2021,9,121,4,'/images/products/giao-trinh-lanh-dao.jpg',235,NULL,1),(52,'Thuật Ngữ Tiếng Anh Chuyên Ngành Y Khoa Cho Người Mới Bắt Đầu','Những năm vừa qua, nền y học nước nhà đã có bước phát triển không ngừng nhờ tiếp thu nền y học tiên tiến từ các quốc gia phát triển. Để làm được như vậy, nhân viên y tế đã phải tiếp cận và sử dụng tài liệu ngoại văn từ rất sớm. Tuy nhiên, việc tiếp cận sách ngoại văn chuyên ngành y khoa là không dễ và chúng ta lại thiếu một công cụ hướng dẫn tự học được viết bằng tiếng Việt.\n\nSách Thuật ngữ tiếng Anh chuyên ngành Y khoa - Cho người mới bắt đầu cung cấp kiến thức cơ bản nhất cho đối tượng sinh viên các ngành y và dược để có thể tự học tiếng Anh chuyên ngành.\n\nSách được chia thành hai phần. Phần 1 - THUẬT NGỮ Y KHOA CƠ BẢN giới thiệu cấu tạo của thuật ngữ y khoa và hướng dẫn phương pháp học thuật ngữ; \nPhần 2 - THUẬT NGỮ Y KHOA HỆ CƠ QUAN giới thiệu các thuật ngữ y khoa theo từng hệ cơ quan.',157000,2024,5,160,4,'/images/products/thuat-ngu-ta-ykhoa.jpg',300,NULL,1),(53,'Hạ Đỏ ','Mùa hè năm đó, Chương được bố mẹ cho về quê chơi. Ở đây, cậu được biết đến những trò chơi thú vị cùng hai đứa em con nhà dì của mình, những trò chơi mà Chương chẳng thể kiếm ở đâu được khi còn sống ở thành phố. Rồi Chương gặp Út Thêm và phải lòng cô bé, Chương thích sự nhẹ nhàng ở Út Thêm và chỉ muốn được nhìn thấy cô mỗi ngày. Ngày qua ngày, Chương đã đi qua nhiều cung bậc cảm xúc khi bắt đầu biết rung động trước một người con gái, cậu muốn dành những điều thật vui vẻ và tốt đẹp gửi đến cho cô.\n\nChương trở lại thành phố sau những ngày hè nắng cháy, hoa cỏ may trắng muốt mọc đầy trên con đường cậu đi qua mỗi ngày để đến nhà Út Thêm bám đầy gấu quần cậu, như mối tình đầu da diết mà cậu mang trong lòng.',77000,2021,1,165,3.5,'/images/products/ha-do.jpg',300,NULL,1),(54,'Hạt Giống Tâm Hồn','Bộ sách hạt giống tâm hồn là bộ sách được tổng hợp các câu chuyện, bức tranh đầy ý nghĩa về cuộc sống của nhiều tác giả khác nhau. Đó là những câu chuyện về sự thành công, tấm lòng cao đẹp giữa con người với con người. Bộ sách giúp nuôi dưỡng cho bạn có một tâm hồn đẹp, trong sáng, luôn vui tươi và lạc quan.',100000,2020,3,120,4,'/images/products/hat-giong.jpg',400,NULL,1),(55,'Cô Gái Đến Từ Hôm Qua','Nếu ngày xưa còn bé, Thư luôn tự hào mình là cậu con trai thông minh có quyền bắt nạt và sai khiến các cô bé cùng lứa tuổi thì giờ đây khi lớn lên, anh luôn khổ sở khi thấy mình ngu ngơ và bị con gái “xỏ mũi”.\n\nVà điều nghịch lý ấy xem ra càng “trớ trêu’ hơn, khi như một định mệnh, Thư nhận ra Việt An, cô bạn học thông minh thường làm mình bối rối bấy lâu nay chính là Tiểu Li, con bé hàng xóm ngốc nghếch từng hứng chịu những trò nghịch ngợm của mình hồi xưa.',28000,2022,1,100,4,'/images/products/co-gai-den-thq.jpg',100,NULL,1),(56,'Trước Vòng Chung Kết','Tràn ngập không khí bóng đá, không khí vỉa hè… đậm mùi hào hiệp, thượng võ.\n\nLẽ dĩ nhiên như cuộc đời, có đâu đó những mưu toan nhỏ nhen, những trò chơi bẩn… không đáng mặt anh hào.\n\nNhưng…. (chữ nhưng dành cho sự khám phá của các bạn)',41000,2021,1,120,4.5,'/images/products/truoc-vong-ck.jpg',250,NULL,1),(57,'Tôi Là Bêtô - Phiên Bản Đặc Biệt','Truyện Tôi là Bêtô là sáng tác của nhà văn Nguyễn Nhật Ánh được viết theo phong cách hoàn toàn khác so với những tác phẩm trước đây của ông. Những mẩu chuyện, hay những phát hiện của chú chó Bêtô đầy thú vị, vừa hài hước, vừa chiêm nghiệm một cách nhẹ nhàng “vô vàn những điều thú vị mà cuộc sống cố tình giấu kín ở ngóc ngách nào đó trong tâm hồn của mỗi chúng ta”.\n\nTác phẩm Tôi là Bêtô cũng vừa được dịch và sẽ xuất bản tại Hàn Quốc vào năm 2022. Đây là tác phẩm thứ hai của nhà văn Nguyễn Nhật Ánh được xuất bản tại Hàn Quốc sau tác phẩm đẩu tiên “Cho tôi xin một vé đi tuổi thơ” do NXB Dasan Books ấn hành bản tiếng Hàn năm 2013.\n\nPhiên bản đặc biệt này được in màu hoàn toàn với những tranh minh họa mới của họa sĩ Đỗ Hoàng Tường.',369000,2021,1,100,4,'/images/products/chu-cho-beto.jpg',350,NULL,1),(59,'Vòng Quanh Thế Giới - Anh ','Mỗi đất nước trên thế giới đều có rất nhiều điều thú vị để khám phá. Với chuyến du hành Vòng quanh thế giới, bạn sẽ được ghé thăm rất nhiều quốc gia, địa điểm nổi tiếng, biết thêm nhiều truyền thống văn hóa, lễ hội lí thú của con người khắp mọi nơi.\n\nNào, còn chần chừ gì nữa, lên đường thôi!',10500,2022,2,250,4,'/images/products/vong-quanh-tg.jpg',200,NULL,1),(60,'Kinh Tế Và Xã Hội Việt Nam Dưới Các Vua Triều Nguyễn','Ra đời trong những năm 60-70 của thế kỷ XX, thời điểm các sử gia vẫn dành nhiều mối quan tâm đến diễn biến chính trị qua các triều đại lịch sử, những sự kiện xoay quanh các nhân vật nổi tiếng như hoàng đế của các triều đại, mà thực sự đánh giá đúng mức tới các vấn đề kinh tế và xã hội cũng như đến chính người dân thường trong cuộc sống hằng ngày của họ, cuốn sách Kinh tế và xã hội Việt Nam dưới các vua triều Nguyễn được xem như tác phẩm tiên phong tiếp cận vấn đề kinh tế và xã hội trong nghiên cứu sử học.',110500,2019,9,212,5,'/images/products/kunh-te-va-xhpk.jpg',350,NULL,1),(61,'Việt Nam Vận Hội','Là sử gia hàng đầu thế giới về sử Việt và lịch sử Á Đông, với hàng trăm cuốn sách cùng khảo cứu đã được công bố bằng tiếng Việt, tiếng Anh và tiếng Pháp, nghiên cứu sử học của Giáo sư Nguyễn Thế Anh tỏa rộng theo nhiều chủ đề như “nghiên cứu lịch sử địa chất học, nông nghiệp, và khí hậu học; hệ tư tưởng và tôn giáo, bao gồm Phật giáo, Nho giáo, tín ngưỡng dân gian, và chủ nghĩa Marx; giao thương và thương mại; chiến tranh; quan hệ Trung-Việt; quan hệ giữa Việt Nam và phương Tây; lịch sử Đông Á và Đông Nam Á; lịch sử Hoa Kỳ; sử Việt nói chung: từ thế kỷ XV đến thế kỷ XX, đặc biệt nhấn mạnh triều Nguyễn và thời kỳ Pháp thuộc; và các nghiên cứu về lịch sử Việt Nam sau năm 1945”.',199000,2020,13,120,5,'/images/products/viet_nam_van_hoi-01_1.jpg',350,NULL,1),(62,'Bộ Truyện Kể Hay Nhất Về Các Nàng Công Chúa 1','Bộ truyện kể hay nhất về các nàng công chúa.',30000,2022,13,200,4.1,'/images/products/cac-nang-cong-chua.jpg',200,NULL,1),(63,'Bộ Truyện Kể Hay Nhất Về Các Nàng Công Chúa 2','Bộ truyện kể hay nhất về các nàng công chúa.',30500,2022,12,180,4.2,'/images/products/cac-nang-cc-2.jpg',200,NULL,1),(64,'Bộ Truyện Kể Hay Nhất Về Các Nàng Công Chúa 3','Bộ truyện kể hay nhất về các nàng công chúa.',30500,2022,12,160,3.2,'/images/products/cac-nang-cc3.jpg',200,NULL,1),(65,'Người Bán Hàng Vĩ Đại Nhất Thế Giới','Người Bán Hàng Vĩ Đại Nhất Thế Giới là câu chuyện về hành trình của Hafid, một cậu bé chăn lạc đà nghèo ở Jerusalem cổ đại. Người thanh niên đã học được những bí quyết từ một thương nhân giàu có và từ đó trở thành một người bán hàng vĩ đại. Cuốn sách này không chỉ dạy bạn cách bán hàng, mà nó còn dạy bạn cách làm người, giúp bạn thành công trong lĩnh vực của mình. Tính đến hiện tại, Người Bán Hàng Vĩ Đại Nhất Thế Giới được chuyển ngữ ra 25 ngôn ngữ và đã bán ra hơn 50 triệu bản trên khắp thế giới, là một trong những cuốn sách hay nên đọc trong đời.',120000,2020,7,122,3.7,'/images/products/Nguoi_Ban_Hang_Vi_Dai_Nhat_The_G.jpg',300,NULL,1),(66,'ádf','fdf',-1,2023,4,10,NULL,'/images/products/cinema.jpg',300,NULL,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_categories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `products_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (5,1,4),(6,1,5),(9,7,3),(17,10,15),(18,20,12),(23,9,19),(24,9,1),(25,9,8),(26,9,4),(27,9,16),(28,46,18),(32,1,12),(33,1,16),(34,2,8),(35,2,16),(36,3,7),(37,3,1),(38,3,16),(39,4,12),(40,6,6),(41,6,1),(42,6,8),(43,7,16),(44,8,6),(45,8,19),(46,8,1),(47,8,8),(48,8,4),(49,11,6),(50,11,19),(51,11,1),(52,11,12),(53,11,16),(54,12,6),(55,12,1),(56,12,16),(57,12,3),(58,5,7),(59,5,1),(60,47,16),(61,47,3),(62,48,3),(63,48,1),(64,13,18),(65,13,1),(66,13,8),(67,13,16),(68,14,6),(69,14,1),(70,14,12),(71,14,16),(72,15,18),(73,15,1),(74,15,12),(75,15,16),(76,16,18),(77,16,1),(78,16,8),(79,16,16),(80,17,1),(81,17,16),(82,18,16),(83,19,1),(84,19,8),(85,19,16),(86,21,1),(87,21,8),(88,21,4),(89,21,16),(90,39,6),(92,39,1),(93,39,16),(94,42,6),(95,42,19),(96,42,1),(97,42,8),(98,42,16),(99,44,18),(100,44,1),(101,44,16),(102,46,1),(103,46,8),(104,46,16),(105,2,24),(106,1,24),(107,4,24),(108,47,18),(109,47,24),(110,48,18),(111,48,24),(112,44,24),(113,39,24),(114,21,24),(115,49,7),(116,49,15),(117,49,5),(118,49,1),(119,50,19),(120,50,8),(121,50,1),(122,51,7),(123,51,18),(124,51,1),(125,52,18),(126,53,4),(127,53,19),(128,54,24),(129,54,8),(130,54,1),(131,55,4),(132,55,19),(133,55,2),(134,8,2),(135,56,19),(136,56,2),(137,57,4),(138,57,19),(139,57,2),(141,59,2),(142,59,24),(143,60,18),(144,60,5),(145,60,1),(146,61,7),(147,61,6),(148,61,5),(149,61,1),(150,62,19),(151,62,2),(152,63,4),(153,63,19),(154,63,2),(155,64,4),(156,64,19),(157,64,2),(158,65,4),(159,65,16),(160,65,19),(161,65,24),(162,66,18),(163,66,24);
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_tags`
--

DROP TABLE IF EXISTS `products_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `products_tags_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `products_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_tags`
--

LOCK TABLES `products_tags` WRITE;
/*!40000 ALTER TABLE `products_tags` DISABLE KEYS */;
INSERT INTO `products_tags` VALUES (5,2,5),(6,2,6),(7,2,7),(12,1,11),(16,39,10),(20,42,4),(21,42,3),(22,42,2),(23,42,1),(24,20,4),(26,44,4),(28,9,7),(29,9,10),(30,9,5),(31,46,5),(32,11,3),(33,1,3),(34,1,2),(35,1,4),(36,2,4),(37,3,12),(38,3,7),(39,3,10),(40,3,5),(41,3,6),(42,4,12),(43,4,8),(44,4,11),(45,4,13),(46,4,6),(47,6,7),(48,6,10),(49,6,6),(50,7,12),(51,7,8),(52,7,13),(53,7,17),(54,7,6),(55,10,7),(56,10,3),(57,10,10),(58,10,4),(59,10,5),(60,10,6),(61,11,12),(62,11,11),(63,11,6),(64,12,12),(65,12,18),(66,5,4),(67,47,19),(68,47,6),(69,47,18),(70,48,22),(71,48,18),(72,48,21),(73,13,11),(74,13,24),(75,13,23),(76,14,12),(77,14,11),(78,14,24),(79,14,23),(80,14,6),(81,15,14),(82,15,4),(83,15,27),(84,15,26),(85,16,12),(86,16,7),(87,16,28),(88,16,26),(89,17,29),(90,18,30),(91,18,26),(92,18,31),(93,19,31),(94,19,30),(95,19,28),(96,19,5),(97,19,6),(98,20,10),(99,20,5),(100,20,6),(101,21,31),(102,21,32),(103,21,26),(104,21,5),(105,21,6),(106,39,12),(107,39,33),(108,39,28),(109,39,26),(110,39,5),(111,42,12),(112,42,34),(113,42,11),(114,42,26),(115,44,12),(116,44,14),(117,44,35),(118,44,27),(119,44,13),(120,44,6),(121,46,12),(122,46,11),(123,46,13),(124,46,26),(125,49,36),(126,49,37),(127,49,1),(128,50,7),(129,50,39),(130,50,38),(131,51,4),(132,51,41),(133,51,40),(134,52,42),(135,52,6),(136,53,44),(137,53,5),(138,53,43),(139,54,7),(140,54,10),(141,54,45),(142,54,6),(143,55,46),(144,8,47),(145,56,45),(146,56,48),(147,56,47),(148,57,51),(149,57,49),(150,59,52),(151,59,49),(152,60,55),(153,60,54),(154,60,53),(155,61,55),(156,61,57),(157,61,56),(158,62,52),(159,62,58),(160,63,58),(161,64,58),(162,65,60),(163,65,59),(164,1,10),(165,66,60);
/*!40000 ALTER TABLE `products_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishers`
--

LOCK TABLES `publishers` WRITE;
/*!40000 ALTER TABLE `publishers` DISABLE KEYS */;
INSERT INTO `publishers` VALUES (1,'Trẻ','161B Lý Chính Thắng, phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh','hopthubandoc@nxbtre.com.vn '),(2,'Kim Đồng','Địa chỉ: 55 Quang Trung, Hà Nội, Việt Nam ','info@nxbkimdong.com.vn '),(3,'Tổng hợp TPHCM','62 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP. HCM ','lienhe@nxbc.com'),(4,'Hội Nhà văn Việt Nam','6/86 Duy Tân, Cầu Giấy, Hà Nội','nstonhop@gmail.com '),(5,'Phụ nữ','39 Hàng Chuối, Quận Hai Bà Trưng, Hà Nội','truyenthongvaprnxbpn@gmail.com '),(6,'Lao động','6/86 Duy Tân, Cầu Giấy, Hà Nội','dongabooks.vn@gmail.com'),(7,'Nhã Nam','6/86 Duy Tân, Cầu Giấy, Hà Nội','dongabooks.vn@gmail.com'),(8,'Bách khoa Hà Nội','Số 1 Đường Đại Cồ Việt, Hai Bà Trưng , Hà Nội.','dongabooks.vn@gmail.com'),(9,'Chính trị Quốc gia Sự thật','6/86 Duy Tân, Cầu Giấy, Hà Nội','dongabooks.vn@gmail.com'),(10,'Công Thương','Tầng 4, Tòa nhà Bộ Công Thương, số 655 Phạm Văn Đồng, quận Bắc Từ Liêm, Hà Nội','dongabookks.vn@gmail.com'),(11,'Công an nhân dân','92 Nguyễn Du, quận Hai Bà Trưng, TP. Hà Nội','dongabooks.vn@gmail.com'),(12,'Dân trí','Số 9, ngõ 26, phố Hoàng Cầu, quận Đống Đa, thành phố Hà Nội','dongabooks.vn@gmail.com'),(13,'Đông A','113 Đông Các, P. Ô Chợ Dừa, Q. Đống Đa, Hà Nội','dongabooks.vn@gmail.com');
/*!40000 ALTER TABLE `publishers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (5,6,5,5,'hay'),(6,7,5,5,'Sách quá hay');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'lịch sử loài người'),(2,'phát triển nhân loại'),(3,'tiến hóa'),(4,'xã hội loài người'),(5,'tâm lý học tích cực'),(6,'phát triển bản thân'),(7,'quản lý cảm xúc'),(8,'tiếp cận cuộc sống'),(10,'tâm lý học'),(11,'thành công'),(12,'thay đổi thói quen'),(13,'hiệu suất làm việc'),(14,'kinh tế'),(16,'trên 18 tuổi'),(17,'cho người trưởng thành'),(18,'nấu ăn ngon'),(19,'Ngợt, Cảm hứng sống, Vị yêu'),(20,'khám phá thế giới'),(21,'cơm lành canh ngọt'),(22,'sự ăn cho ta cái lực'),(23,'câu hỏi đúng'),(24,'vận hành vũ trụ'),(25,'tư duy ngược'),(26,'phát triển tư duy'),(27,'dòng tiền, thoát nghèo'),(28,'tu dưỡng bản thân'),(29,'vực dậy từ thất bại, dám thất bại'),(30,'yes , no'),(31,'bước ra vùng an toàn'),(32,'thời gian không quý như vàng'),(33,'không có cách này ta có cách khác'),(34,'làm chủ số phận, làm chủ tư duy'),(35,'Marketer, Salesman'),(36,'chiến tranh nhân dân'),(37,'dựng nước giữ nước'),(38,'chú bé rắc rối'),(39,'nhất quỷ nhì ma'),(40,'xây dựng đảng và chính quyền'),(41,'hoạt động quản lý các cấp'),(42,'thuật ngữ y khoa'),(43,'ngày hè nắng cháy'),(44,'Rồi Chương và Út Thêm'),(45,'bóng mát tâm hồn, hạt giống tâm hồn'),(46,'cô bé hàng xóm ngốc nghếch'),(47,'vé đi tuổi thơ'),(48,'không khí bóng đá, hào hiệp thượng võ'),(49,'câu chuyện đáng nhớ'),(50,'hài hước, vui nhộn'),(51,' chú chó Bêtô đầy thú vị'),(52,'du hành vòng quanh thế giới'),(53,'kinh tế và xã hội Việt Nam'),(54,'triều đại phong kiến'),(55,'lịch sử Việt Nam'),(56,'Việt Nam sau 1945'),(57,'lịch sử Việt và lịch sử Á Đông'),(58,'chuyến du lịch của các nàng công chúa'),(59,'hành trình của Hafid'),(60,'cách bán hàng và cách làm người');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `classification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `users_chk_1` CHECK ((`role` in (1,2)))
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'huynh','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','xuanhuynhmc@gmail.com',2,'avatar.jpg','Huynh','0865070736','NORMAL'),(2,'ha','$2a$10$ucKQzfaxCG6KlcIQ/UjSKOFW3P.A.petzgG38ILrVq5.XBU.2DJfS','ha123456@gmail.com',1,'ha-avatar.jpg','Nguyễn hà hạnh','0865325634','VIP'),(3,'nam','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','nammc@gmail.com',1,'avatar.jpg','Trần Hải Nam','0705685698','NORMAL'),(4,'hieu','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','m@gmail.com',1,'avatar.jpg','Hồ Hiếu','0365854721','LOYAL'),(5,'hong','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','xuanhuynhdf@gmail.com',1,'defaultAvatar.jpg','Nguyễn Hồng','0702363862','LOYAL'),(6,'kien','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','aa@gmail.com',1,'defaultAvatar.jpg','Trần Kiên','0896574452','NORMAL'),(8,'xuanhuynh','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','asdfdm',1,'defaultAvatar.jpg','Xuân Huynh','0865070726','NORMAL'),(9,'abc','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','ma@gmail.com',1,'defaultAvatar.jpg','Mai Thanh Hải','0934856254','NORMAL'),(10,'abcd','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','snfjn@gmail.com',1,'defaultAvatar.jpg','Trần Lợi','0359490652','NORMAL'),(12,'abcde','$2a$10$1ZX3C96cL1rOsTBH8z0GAewVSNgu5fDSjlhsz4MdP81z5DOEFJCCO','sdnsd@gmail.com',1,'defaultAvatar.jpg','Lưu Ba','0245658682','NORMAL'),(14,'abcdef','$2a$10$pW/Q..L7f9L2BjJD0SVxbOrXfVBMPhYNjIzJBu7/GB4iDN1nlKWGa','ss@gmail.com',1,'defaultAvatar.jpg','Trương Thân','0395895236','NORMAL'),(15,'abcdfdf','$2a$10$RDGtfOREamwiKVzqBXJyT.e60rCvTdrdKFaYOhtf6LIo/4H6Bbm3W','abcd@gmail.com',1,'defaultAvatar.jpg','Hà Nam','0395698751','NORMAL'),(21,'abc123','$2a$10$8ZW.SYWLALp67s4.wlI6EuDw0tEgOjm4RB2zxglfPxRDcxR0SkLyW','abcjd@gmail.com',1,'defaultAvatar.jpg','Nguyễn Tuấn','0451636582','NORMAL'),(25,'husybhbhnhhs','$2a$10$B1j9B7pH9VjPn2UVz20EiOEdOFiXLEZtkFVlN3k3d08R72H43hDxe','sss@gmail.com',1,'defaultAvatar.jpg','Thành Luân','0702635412','NORMAL'),(26,'anhha','$2a$10$N8xC2ODQERoOvdAYdi5WyOd3mpTSw8B1UrlmKnrB3UQ5roEI0Nb5G','olala@gmail.com',1,'defaultAvatar.jpg','Hạ Anh','1234567890','NORMAL'),(27,'cry','$2a$10$8K4QQZwppHmauuCM6Jz9aOld44KXzP3obGnAf7Zjpfm6RhaTy5vaa','cry@gmail.com',1,'defaultAvatar.jpg','Minh Béo','0528412572','NORMAL'),(28,'thanhtam','$2a$10$L3yZbNUEmPgvWkEUZY9h9uZ77qcvq665xAHJM/.jUQoABdeFR8YRC','thanhtam@gmail.com',1,'defaultAvatar.jpg','Thành Tâm','0362548425','NORMAL'),(29,'thaicao','$2a$10$U6d/EoPjv3gE7S.HP/TXPubADs4PIpRGzmIFWJWElrv3.zUt1uTBG','ab@gmail.com',1,'defaultAvatar.jpg','Thái Cao','0745841252','NORMAL');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-14 16:20:30
