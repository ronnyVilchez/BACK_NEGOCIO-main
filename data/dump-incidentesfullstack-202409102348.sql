CREATE DATABASE incidentesFinalDB;
use incidentesFinalDB;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `rol` enum('residente','administrador') NOT NULL,
  `numero_contacto` varchar(15) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuarios` VALUES (1,'Rengoku','Hunter','Rengoku@gmail.com','$2b$10$TwA18uSPePJqv2m2HfFwkOKyeQtuKBsAAfdLW6iX00n3yhFI1sGre','K408','administrador','1234567898','2024-09-11 04:22:31'),(2,'Jarom','Fields','Jarom@gmail.com','$2b$10$D/TjaZtF/AYJh5Nzyvve2eXAv432lNPdFUAexyWE7fCPb7BDS0nqy','D108','administrador','123456789','2024-09-11 04:25:20'),(3,'Melvin','Campos','jaromcamposrodriguez@gmail.com','$2b$10$cJ83p6rsSxI8/TLnF28vXewWBxWQA5sGav3YmszP5S1zo.tNuClUu','F120','administrador','123456123','2024-09-11 04:25:43'),(4,'Tangiro','Kushiki','Camado@gmail.com','$2b$10$L2AlvoN6gLKZeqtsz2kBEepc4Ln3xyH5.spDfxX.Gk3Ue.q5HeTHG','F109','residente','123456789','2024-09-11 04:26:23'),(5,'Muzan','Ubuyashiki','Muzan@gmail.com','$2b$10$bafuV8Y0WgoNRxG2DDfe4.u/LKTwqCXHQJzUB67Tvwn9im40c7ZmC','X12','residente','12345678','2024-09-11 04:27:18');

------------------------------------------------------
CREATE TABLE `incidencia` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  `asunto` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `tipo` ENUM('fontaneria','electricidad','limpieza','pintura','carpinteria','cerrajeria','jardineria','albañileria','mantenimiento','reparaciones','otro') NOT NULL,
  `estado` ENUM('pendiente', 'en_proceso', 'resuelta') NOT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `fecha_creacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  `fecha_programada` DATE NOT NULL,
  `hora_programada` TIME NOT NULL,
  `presupuesto` ENUM('simple','moderado','complejo','muy_complejo','especializado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

------------------------------------------------------------

/* CREATE TABLE `incidencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` enum('fontaneria','electricidad','limpieza','otro') NOT NULL,
  `estado` enum('pendiente','en_proceso','resuelta') NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 */

INSERT INTO `incidencia` (`id`, `usuario_id`, `asunto`, `descripcion`, `tipo`, `estado`, `image`, `presupuesto`, `fecha_programada`, `hora_programada`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 'Fuga de agua', 'Hay una fuga de agua en el baño principal.', 'fontaneria', 'pendiente', 'fuga_agua.jpg', 'moderado', '2025-02-10', '09:00:00', NOW(), NOW()),
(2, 2, 'Corte de luz', 'El segundo piso no tiene electricidad.', 'electricidad', 'en_proceso', 'corte_luz.jpg', 'complejo', '2025-02-12', '14:30:00', NOW(), NOW()),
(3, 3, 'Limpieza general', 'Se necesita limpieza en el área de recepción.', 'limpieza', 'resuelta', 'limpieza_recepcion.jpg', 'simple', '2025-02-15', '10:00:00', NOW(), NOW()),
(4, 4, 'Reparación de enchufe', 'El enchufe de la cocina está roto.', 'electricidad', 'pendiente', 'enchufe_roto.jpg', 'moderado', '2025-02-18', '16:00:00', NOW(), NOW()),
(5, 5, 'Desatascar fregadero', 'El fregadero de la cocina está atascado.', 'fontaneria', 'en_proceso', 'fregadero_atascado.jpg', 'especializado', '2025-02-20', '08:30:00', NOW(), NOW());



select * from incidencia;
select * from usuarios;

