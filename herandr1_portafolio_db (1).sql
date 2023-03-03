USE `herawaeg_portafolio_db_prod`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

--
-- Estructura de tabla para la tabla `history_curriculum_vitae`
--

CREATE TABLE IF NOT EXISTS `history_curriculum_vitae` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `archive_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `archive_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `history_curriculum_vitae`
--

INSERT INTO `history_curriculum_vitae` (`id`, `archive_name`, `path`, `archive_type`, `created_at`, `updated_at`) VALUES
                                                                                                                      (1, 'MI curriculum', '/storage/SBTFcQSZnkUWOs03DZxTyQpbYFbIk4X5gRM2jvPB.docx', 'DOC', '2021-09-08 02:37:15', '2021-09-08 02:37:34'),
                                                                                                                      (2, 'MI CURRICULUM', '/storage/W7rs30Azuviv403ebdGkJ9RASxuqtanWHrXvyr1a.pdf', 'Open this select menu', '2021-09-18 20:37:56', '2021-09-18 20:38:10'),
                                                                                                                      (4, 'MI curriculum', '/storage/J7AUtiRtwvnnbpJtStL3YfreRosraMtXom8PCGRa.pdf', 'PDF', '2021-09-29 07:12:33', '2021-09-29 07:12:33'),
                                                                                                                      (6, 'Jose_angel_alvarado_cv', '/storage/zgbK3qE6rm3myoQYAfkRp3RRPmV4hRleoBCiV1sx.docx', 'DOC', '2022-01-21 13:45:20', '2022-01-21 13:45:20'),
                                                                                                                      (7, 'Jose_angel_alvarado_cv', '/storage/kK5oKyO63HuKGlHT5d2TM3ymv1ninaIgAPe02UWJ.pdf', 'PDF', '2022-01-21 13:45:53', '2022-01-21 13:45:53'),
                                                                                                                      (10, 'jose_angel_alvarado_cv_completo', '/storage/d1MAUJoWCGoZ75mL4MuPdsPxcRzHFx0cOAt9B0I1.pdf', 'PDF', '2022-03-25 01:46:09', '2022-03-25 01:46:09'),
                                                                                                                      (11, 'jose_angel_alvarado_cv_completo', '/storage/wQDN1TkathxjJkftW26CQPyTWUImQmWDPslyYPbY.docx', 'DOC', '2022-03-25 01:46:29', '2022-03-25 01:46:29'),
                                                                                                                      (12, 'jose_angel_alvarado_cv', '/storage/fwRlDBSDKvV1iq0vEQ1jIEwJOEbC7kuUDI96sDAl.docx', 'DOC', '2022-07-13 23:21:32', '2022-07-13 23:21:32'),
                                                                                                                      (13, 'jose_angel_alvarado_cv', '/storage/hLyrd8zGBCFqkttWGtBpstlIjvRcWbbRjy4mOIMk.pdf', 'PDF', '2022-07-13 23:23:27', '2022-07-13 23:23:27');


-- Volcando estructura para tabla herandr1_portafolio_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `name_es` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `name_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `description_es` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `description_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    UNIQUE KEY `table_name_key_uindex` (`key`),
    UNIQUE KEY `table_name_id_uindex` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla herandr1_portafolio_db.roles: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT IGNORE INTO `roles` (`id`, `key`, `name_es`, `name_en`, `description_es`, `description_en`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'admin', 'Administrador', 'Administrator', 'permiso total', 'Total permission', NULL, NULL, NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;


-- Volcando estructura para tabla herandr1_portafolio_db.users
CREATE TABLE IF NOT EXISTS `users` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `age` int(11) DEFAULT NULL,
    `date_birthday` date DEFAULT NULL,
    `nationality_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `nationality_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_es` longtext COLLATE utf8mb4_unicode_ci,
    `description_en` longtext COLLATE utf8mb4_unicode_ci,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email_verified_at` timestamp NULL DEFAULT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `country_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `country_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `header_image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `my_perfil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `slogan_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `slogan_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `header_text_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `header_text_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `remember_token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `cv` bigint(20) unsigned DEFAULT NULL,
    `role_id` bigint(20) DEFAULT '1',
    `deleted_at` timestamp NULL DEFAULT NULL,
    `api_token` varchar(550) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`),
    KEY `FK_users_history_curriculum_vitae` (`cv`),
    KEY `role_id` (`role_id`),
    CONSTRAINT `FK_users_history_curriculum_vitae` FOREIGN KEY (`cv`) REFERENCES `history_curriculum_vitae` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
    CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

-- Volcando datos para la tabla herandr1_portafolio_db.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `name`, `age`, `date_birthday`, `nationality_es`, `nationality_en`, `description_es`, `description_en`, `email`, `email_verified_at`, `password`, `country_es`, `country_en`, `header_image_path`, `my_perfil`, `logo`, `slogan_es`, `slogan_en`, `avatar`, `header_text_es`, `header_text_en`, `remember_token`, `created_at`, `updated_at`, `cv`, `role_id`, `deleted_at`, `api_token`) VALUES
	(1, 'José Ángel Alvarado Gonzalez', 22, '1999-04-25', 'Mexicana', 'Mexican', '<p>Soy ingeniero en tecnologías de la información y comunicación. Egresado de la universidad Tecnológica de Cancún, soy apasionado a la ciencia y las tecnologías, Me considero persona que cuenta con gran capacidad para adaptarme a equipos y especializada en programación y el desarrollo de aplicaciones móviles. Siempre busco la mejor forma de encontrar soluciones a los problemas.</p>', '<p>I am an engineer in information and communication technologies. Graduated from the Technological University of Cancun, I am a person passionate about technology and science, I consider myself a person who has great ability to adapt to teams and specialized in programming and the development of mobile applications . I always look for the best way to find solutions to problems.</p>', 'jose.alvarado220@hotmail.com', NULL, '$2y$10$Gd/cHIJO/o4.eVsFKuJhHO.n9fFdp6ZEGUcYP8dkkG5JlwUc7DWMS', 'Cancún Quintana Roo', 'Cancún Quintana Roo', '/storage/3RqrIPF0fBI1JNGIJ3G0FlR4YnexhIQVCK3xYpJK.webp', '/storage/csV5eKMsKrrfvbdJgeQh9ktpHLUlYOIDa7u8u8OT.webp', '/storage/hzp5qE4l99HGtHYLkDvyDsLyxtHA0QX6g8wzPyfX.svg', '/storage/vFkeUrshO8RmAxLgS4gRDneKdzwegtdU5FkbfX7n.svg', '/storage/IzCHVYthqd8kyZooKIsEpDH28wEOjPJTO7ZqrR3W.svg', '/storage/W9AO0Z4315sTult9k3oawWUpfVh35J9KwnAdBqam.png', 'Desarrollador de aplicaciones multiplataforma', 'Cross-platform application developer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikpvc8OpIMOBbmdlbCBBbHZhcmFkbyBHb256YWxleiIsImVtYWlsIjoiam9zZS5hbHZhcmFkbzIyMEBob3RtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEdkL2NISUpPL280LmVWc0ZLdUpoSE8ubjlmRmRwNlpFR1VjWVA4ZGtrRzVKbHdVYzdEV01TIiwiZXhwaXJlZF90b2tlbiI6MTY3NDc3NjYxMTg1OSwiaWF0IjoxNjc0NjkwMjExfQ.iE_mgVqkAv8DATHNLINXGU2qUtJm9kyPkLdevCN1C0A', '2021-09-06 11:51:15', '2023-01-25 18:43:31', 13, 1, NULL, 'null');




-- Volcando estructura para tabla herandr1_portafolio_db.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `knowledges`
--

CREATE TABLE IF NOT EXISTS `knowledges` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `title_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `icon_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_es` longtext COLLATE utf8mb4_unicode_ci,
    `description_en` longtext COLLATE utf8mb4_unicode_ci,
    `important` tinyint(4) DEFAULT '0',
    `user_id` bigint(20) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `knowledges_user_id_foreign` (`user_id`),
    CONSTRAINT `knowledges_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `knowledges`
--

INSERT INTO `knowledges` (`id`, `title_es`, `title_en`, `icon_path`, `description_es`, `description_en`, `important`, `user_id`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                 (1, 'Desarrollo de Aplicaciones Web', 'Web Applications Development', '/storage/rZgKyXgufHuLtpHHeCpgOFnAELyVEJCcaDnKV3FJ.svg', '<p>Experiencia y conocimientos en el desarrollos de aplicaciones Web, creación de API´S con autenticación OAuth, creación de Sockets.</p>\r\n<p>Análisis y estructuración de base de datos Back-End para el traslado y recolección de diferentes tipos de datos</p>', '<p> Experience and knowledge in the development of Web applications, creation of API\'s with OAuth authentication, creation of Sockets. </p>\r\n<p> Back-End database analysis and structuring for the transfer and collection of different types of data </p>', 0, 1, '2021-09-06 19:03:14', '2021-09-06 19:13:48'),
(2, 'Análisis, diseño e implementación de sitios web', 'Website analysis, design and implementation', '/storage/oJM5bhZjGfZjuUmFmTMGpGlCZIKziimDy6ZuNbwd.svg', '<p>Experiencia y conocimientos para la maquetación de de sitios web. Buen manejo de diferentes tecnologías Front-End para el desarrollo de sitios web, diseños de paginas web, consumo de API´S REST e implementación de Sockets. </p>\r\n<p> Conocimientos para la optimización de carga de sitios web, conocimientos con SEO.\r\n</p>', '<p> Experience and knowledge for website layout. </p>\r\n<p> Good management of different Front-End technologies for the development of web sites, web page designs, consumption of REST API\'s and implementation of Sockets. </p>\r\n<p> Knowledge for website load optimization, basic knowledge with SEO.\r\n</p>', 0, 1, '2021-09-06 19:27:04', '2022-01-21 13:54:05'),
                                                                                                                                                                 (3, 'Desarrollo de aplicaciones móviles', 'Mobile application development', '/storage/a29tjuc0UM8ZUrwFT1L3Qmr7uPiWyPT2XDzXSBKb.svg', '<p>Conocimiento en la creación, mantenimiento e  implementación de aplicaciones móviles nativas o hibridas, maquetado de aplicaciones móviles Android e IOS, conocimiento para el consumo de API´S REST</p>', '<p> Knowledge in the creation, maintenance and implementation of native or hybrid mobile applications, layout of Android and IOS mobile applications, knowledge for the consumption of REST APIs </p>', 0, 1, '2021-09-06 19:54:53', '2021-09-06 19:57:16'),
                                                                                                                                                                 (4, 'Administración de base de datos', 'Database administration', '/storage/YkDDNvSVJUBSHFCsq4feUalnnGVMQhtNwxz1fmNE.svg', '<p>\r\nAnálisis, mantenimiento y estructuración de base de datos relacionales escalables y eficientes a nivel productivo.\r\n</p>', '<p>\r\nAnalysis, maintenance and structuring of scalable and efficient relational databases at the production level.\r\n</p>', 0, 1, '2021-09-06 20:03:10', '2021-09-06 20:06:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `knowledges_abilities`
--

CREATE TABLE IF NOT EXISTS `knowledges_abilities` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `title_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_es` longtext COLLATE utf8mb4_unicode_ci,
    `description_en` longtext COLLATE utf8mb4_unicode_ci,
    `knowledges_id` bigint(20) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `knowledges_abilities_knowledges_id_foreign` (`knowledges_id`),
    CONSTRAINT `knowledges_abilities_knowledges_id_foreign` FOREIGN KEY (`knowledges_id`) REFERENCES `knowledges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `message` longtext COLLATE utf8mb4_unicode_ci,
    `viewed` tinyint(4) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `phone`, `message`, `viewed`, `created_at`, `updated_at`) VALUES
                                                                                                             (5, 'Alejandro Vergara', 'alexvergara1998@gmail.com', '9831036390', 'Ando probando tu contacto, ajua', 1, '2021-09-29 22:07:56', '2021-09-30 02:29:45'),
                                                                                                             (6, 'roy', 'jose.alvarado220@hotmail.com', '9982132198', 'test de prueba', 0, '2022-07-18 04:11:08', '2022-07-18 04:11:08'),
                                                                                                             (7, 'roy', 'jose.alvarado220@hotmail.com', '9982132198', 'test de prueba', 0, '2022-07-18 04:12:40', '2022-07-18 04:12:40'),
                                                                                                             (8, 'roy', 'jose.alvarado220@hotmail.com', '9982132198', 'test de prueba', 0, '2022-07-18 04:13:54', '2022-07-18 04:13:54'),
                                                                                                             (9, 'roy', 'jose.alvarado220@hotmail.com', '9982132198', 'test de prueba', 0, '2022-07-18 04:14:58', '2022-07-18 04:14:58'),
                                                                                                             (10, 'roy', 'jose.alvarado220@hotmail.com', '9982132198', 'test de prueba', 0, '2022-07-18 04:23:17', '2022-07-18 04:23:17'),
                                                                                                             (11, 'roy', 'jose.alvarado220@hotmail.com', '9982132198', 'test de prueba', 0, '2022-07-18 04:47:28', '2022-07-18 04:47:28'),
                                                                                                             (12, '23123', 'jose.alvarado220@hotmail.com', '213123', 'gow3e2kñlmlkwqeqwe', 0, '2022-07-18 05:59:01', '2022-07-18 05:59:01'),
                                                                                                             (13, '123123', 'jose.alvarado220@hotmail.com', '23123', '213123123', 0, '2022-07-18 06:33:01', '2022-07-18 06:33:01'),
                                                                                                             (14, '123123', 'jose.alvarado220@hotmail.com', '123123', '23123123', 0, '2022-07-18 06:34:48', '2022-07-18 06:34:48'),
                                                                                                             (15, '123123', 'jose.alvarado220@hotmail.com', '123123', '123123123', 0, '2022-07-18 06:35:12', '2022-07-18 06:35:12'),
                                                                                                             (16, '123123', 'jose.alvarado220@hotmail.com', '123123', '23123', 0, '2022-07-18 06:35:29', '2022-07-18 06:35:29'),
                                                                                                             (17, 'José Ángel test', 'jose.alvarado220@hotmail.com', '9983567152', 'Hola, necesito por favor que me apoyen con subir proyectos', 0, '2022-07-18 06:54:20', '2022-07-18 06:54:20'),
                                                                                                             (18, 'jose angel', 'jose.alvarado220@hotmail.com', '9982132198', 'hola como estas test', 0, '2022-08-21 05:00:16', '2022-08-21 05:00:16'),
                                                                                                             (19, 'jose angel', 'jose.alvarado220@hotmail.com', '9982132198', 'gonzales220', 0, '2022-08-21 05:01:01', '2022-08-21 05:01:01'),
                                                                                                             (20, 'jose angel', 'jose.alvarado220@hotmail.com', '9982132198', '213123123123', 0, '2022-08-21 05:04:28', '2022-08-21 05:04:28'),
                                                                                                             (21, '2312', 'jose.alvarado220@hotmail.com', '1123123', '123123123', 0, '2022-08-21 05:05:37', '2022-08-21 05:05:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `batch` int(11) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
                                                          (1, '2014_10_12_000000_create_users_table', 1),
                                                          (2, '2014_10_12_100000_create_password_resets_table', 1),
                                                          (3, '2019_08_19_000000_create_failed_jobs_table', 1),
                                                          (4, '2020_07_07_201044_create_styleguide_patterns_table', 1),
                                                          (5, '2020_07_09_171757_create_styleguide_colors_table', 1),
                                                          (6, '2020_07_11_145517_create_styleguide_basics_table', 1),
                                                          (7, '2020_11_27_041747_studies', 1),
                                                          (8, '2020_11_27_041830_personal_projects', 1),
                                                          (9, '2020_11_27_041852_knowledges', 1),
                                                          (10, '2020_11_27_041918_knowledge_abilities', 1),
                                                          (11, '2020_11_27_041936_prefessional_experiences', 1),
                                                          (12, '2020_11_27_042002_my_contacts', 1),
                                                          (13, '2020_11_27_042022_messages', 1),
                                                          (14, '2021_08_30_163232_portfolio_categories', 1),
                                                          (15, '2021_08_30_163351_portfolios', 1),
                                                          (16, '2021_09_01_232921_history_cv', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `my_contacts`
--

-- Volcando estructura para tabla herandr1_portafolio_db.modules
CREATE TABLE IF NOT EXISTS `modules` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `name_es` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `name_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `description_es` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `description_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `modules_id_uindex` (`id`),
    UNIQUE KEY `modules_key_uindex` (`key`)
    ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla herandr1_portafolio_db.modules: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT IGNORE INTO `modules` (`id`, `key`, `name_es`, `name_en`, `description_es`, `description_en`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'users', 'usuarios', 'users', 'usuario de la tabla usuarios', 'users from table users', '2022-12-15 17:56:12', NULL, NULL),
	(2, 'prefessional_experiences', 'Experiencia profesional', 'Professional experiences', 'la experiencia profesional del usuario o usuarios', 'the professional experiences from users ', '2022-12-15 17:56:10', NULL, NULL),
	(3, 'knowledges', 'Los conocimientos', 'the knowledges', 'Los conocimientos del usuario', 'the knowledges of user', NULL, NULL, NULL),
	(4, 'files', 'Archivos para subir', 'files from upload', 'subir archivos', 'save files', '2022-12-20 18:10:15', NULL, NULL),
	(5, 'knowledges_abilities', 'habilidades de los conocimientos', 'knowledges abilities', 'las habilidades de los conocimientos para los modulos', 'the knowledges abilities from the modules', '2022-12-21 15:33:25', NULL, NULL),
	(6, 'my_contacts', 'Mis contactos', 'My contacts', 'Todos mis contactos ', 'All my contacts', NULL, NULL, NULL),
	(7, 'studies', 'Estudios', 'Studies', 'mis estudios', 'Mis estudios', '2022-12-21 17:54:57', NULL, NULL),
	(8, 'portfolios', 'Portafolios', 'Portfolios', 'Mi portafolio', 'My Portfolio', NULL, NULL, NULL),
	(9, 'portfolio_categories', 'Categorias del portafolio', 'Portfolio categories', 'La categoria del portafolio ', 'The portfolio categories', NULL, NULL, NULL),
	(10, 'personal_projects', 'proyectos personales', 'personal experiences', 'proyectos personales', 'proyectos personales', NULL, NULL, NULL),
	(11, 'messages', 'Mensajes del usuario', 'users messages', 'descripción de los mensajes del usuario', 'description users messages', '2022-12-22 15:33:17', NULL, NULL),
	(12, 'permissions', 'Permisos', 'permissions', 'permisos del usuario', 'user permissions', '2022-12-22 16:19:08', NULL, NULL),
	(13, 'history_curriculum_vitae', 'History cv', 'Historial de cv', 'historial del cv del usuario', 'history cv from user', NULL, NULL, NULL);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;

-- Volcando estructura para tabla herandr1_portafolio_db.my_contacts
CREATE TABLE IF NOT EXISTS `my_contacts` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `name_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `url_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `icon_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `user_id` bigint(20) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `my_contacts_user_id_foreign` (`user_id`),
    CONSTRAINT `my_contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Volcado de datos para la tabla `my_contacts`
--

INSERT INTO `my_contacts` (`id`, `name_es`, `name_en`, `url_path`, `icon_path`, `user_id`, `created_at`, `updated_at`) VALUES
                                                                                                                           (1, 'WhatsApp', 'WhatsApp', 'https://wa.me/529983567152', 'fab fa-whatsapp', 1, '2021-09-08 03:10:42', '2021-09-29 16:13:42'),
                                                                                                                           (2, 'Teléfono', 'Telephone', 'tel:9983567152', 'fas fa-phone-alt', 1, '2021-09-08 03:13:57', '2021-09-08 03:13:57'),
                                                                                                                           (3, 'Correo electrónico', 'Email Address', 'mailto:jose.alvarado220@hotmail.com', 'far fa-envelope', 1, '2021-09-08 03:16:09', '2021-09-08 03:16:09'),
                                                                                                                           (4, 'Facebook', 'Facebook', 'https://web.facebook.com/joseangel.alvarado.735507', 'fab fa-facebook', 1, '2021-09-08 03:17:49', '2021-09-08 03:19:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    KEY `password_resets_email_index` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_projects`
--

CREATE TABLE IF NOT EXISTS `permissions` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `can_create` tinyint(4) DEFAULT '0',
    `can_read` tinyint(4) DEFAULT '0',
    `can_update` tinyint(4) DEFAULT '0',
    `can_delete` tinyint(4) DEFAULT '0',
    `role_id` bigint(20) NOT NULL,
    `module_id` bigint(20) NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `permissions_id_uindex` (`id`),
    KEY `module_id_fk` (`module_id`),
    KEY `role_id_fk` (`role_id`),
    CONSTRAINT `module_id_fk` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla herandr1_portafolio_db.permissions: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT IGNORE INTO `permissions` (`id`, `can_create`, `can_read`, `can_update`, `can_delete`, `role_id`, `module_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 1, 1, 1, 1, 1, '2022-12-14 17:08:35', NULL, NULL),
	(2, 1, 1, 1, 1, 1, 2, '2022-12-15 17:56:52', NULL, NULL),
	(3, 1, 1, 1, 1, 1, 3, '2022-12-16 18:18:35', NULL, NULL),
	(4, 1, 1, 1, 1, 1, 4, '2022-12-20 18:10:39', NULL, NULL),
	(5, 1, 1, 1, 1, 1, 5, '2022-12-21 15:33:45', NULL, NULL),
	(6, 1, 1, 1, 1, 1, 6, '2022-12-21 16:02:37', NULL, NULL),
	(7, 1, 1, 1, 1, 1, 7, '2022-12-21 17:56:17', NULL, NULL),
	(8, 1, 1, 1, 1, 1, 8, '2022-12-21 17:59:15', NULL, NULL),
	(9, 1, 1, 1, 1, 1, 9, '2022-12-21 17:59:24', NULL, NULL),
	(10, 1, 1, 1, 1, 1, 10, '2022-12-21 18:10:16', NULL, NULL),
	(11, 1, 1, 1, 1, 1, 11, '2022-12-22 16:08:20', NULL, NULL),
	(12, 1, 1, 1, 1, 1, 12, '2022-12-22 16:21:18', NULL, NULL),
	(13, 1, 1, 1, 1, 1, 13, '2023-01-20 14:02:34', NULL, NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

-- Volcando estructura para tabla herandr1_portafolio_db.personal_projects
CREATE TABLE IF NOT EXISTS `personal_projects` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `name_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `date_upload` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_es` longtext COLLATE utf8mb4_unicode_ci,
    `description_en` longtext COLLATE utf8mb4_unicode_ci,
    `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `user_id` bigint(20) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `personal_projects_user_id_foreign` (`user_id`),
    CONSTRAINT `personal_projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `portfolio_categories`
--

CREATE TABLE IF NOT EXISTS `portfolio_categories` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    `user_id` bigint(20) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    KEY `portfolio_categories_user_id_foreign` (`user_id`),
    CONSTRAINT `portfolio_categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `portfolio_categories`
--

INSERT INTO `portfolio_categories` (`id`, `code`, `title_es`, `title_en`, `description_es`, `description_en`,`user_id`, `created_at`, `updated_at`) VALUES
                                                                                                                                              (1, 'lenguajes_programacion', 'Lenguajes de Programación', 'Programming languages', 'Conocimiento en los lenguajes de programación', 'Knowledge of programming languages',1, '2021-09-06 21:23:20', '2021-10-02 19:23:37'),
                                                                                                                                              (2, 'frameworks', 'Frameworks', 'Frameworks', 'Frameworks', 'Frameworks',1, '2021-09-06 22:19:21', '2021-09-06 22:19:21'),
                                                                                                                                              (3, 'frameworks CSS', 'frameworks CSS', 'frameworks CSS', 'frameworks CSS', 'frameworks CSS',1, '2021-09-07 02:54:10', '2021-09-07 03:19:33'),
                                                                                                                                              (4, 'herramientas', 'Herramientas y librerías', 'Tools and libraries', 'Herramientas y librerías', 'Tools and libraries',1, '2021-09-07 03:20:18', '2022-02-22 06:32:29'),
                                                                                                                                              (5, 'Base de datos', 'Base de Datos', 'Database', 'Base de Datos', 'Database',1, '2021-09-07 03:51:38', '2021-09-07 03:51:38');

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `portfolios`
--

CREATE TABLE IF NOT EXISTS `portfolios` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `icon_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `years_experience` int(11) DEFAULT NULL,
    `knowledge_level` int(11) DEFAULT NULL,
    `portfolio_categories_id` bigint(20) unsigned DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `portfolios_portfolio_categories_id_foreign` (`portfolio_categories_id`),
    CONSTRAINT `portfolios_portfolio_categories_id_foreign` FOREIGN KEY (`portfolio_categories_id`) REFERENCES `portfolio_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `portfolios`
--

INSERT INTO `portfolios` (`id`, `code`, `icon_path`, `title_es`, `title_en`, `description_es`, `description_en`, `years_experience`, `knowledge_level`, `portfolio_categories_id`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                                                                   (1, 'javascript', '/storage/b0yNHu68FP5WyEcjf61e596fFSfychw0ZQHgvhws.svg', 'JavaScript', 'JavaScript', 'Conocimiento de javascript', 'Conocimiento de javascript', 2, NULL, 1, '2021-09-06 21:38:09', '2021-09-06 21:38:09'),
                                                                                                                                                                                                                   (2, 'php', '/storage/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg', 'PHP', 'PHP', 'PHP', 'PHP', 3, NULL, 1, '2021-09-06 21:43:58', '2021-09-06 21:43:58'),
                                                                                                                                                                                                                   (3, 'kotlin', '/storage/8R9VOgwZVofJIJEQXOyuA6q9Jwh1GBLjseVZDEre.svg', 'kotlin', 'kotlin', 'kotlin', 'kotlin', 1, NULL, 1, '2021-09-06 21:45:01', '2021-09-06 21:45:01'),
                                                                                                                                                                                                                   (4, 'java', '/storage/sz4y6nrWNehRIiyjBxl3YNBoh0DFhUHorjiQzSQI.svg', 'Java', 'Java', 'java', 'java', NULL, NULL, 1, '2021-09-06 21:46:44', '2021-09-06 21:46:44'),
                                                                                                                                                                                                                   (5, 'python', '/storage/F6hANVCjBkvpNrgZIxcFIAgeS770Pw9KZow7y2fH.svg', 'Python', 'Python', 'eqwe', 'we', 1, 50, 1, '2021-09-06 21:48:00', '2021-09-06 21:48:20'),
                                                                                                                                                                                                                   (6, 'TypeScript', '/storage/8vjKP2pDftubTisvAqCMFRbt4nRWNKcNKDJZ0rUs.svg', 'TypeScript', 'TypeScript', 'TypeScript', 'TypeScript', 3, NULL, 1, '2021-09-06 21:51:34', '2021-09-06 21:51:34'),
                                                                                                                                                                                                                   (7, 'Angular', '/storage/YbjE8InSN5g5lUtVuamVGJuzbAzNLpjm6hLwRWQN.svg', 'Angular', 'Angular', 'Angular', 'Angular', 3, 50, 2, '2021-09-06 22:19:47', '2021-09-08 03:44:35'),
                                                                                                                                                                                                                   (8, 'Laravel', '/storage/9VcCyi1DP0GpWReFncHT3sYI8Gs5mHgbvnt8Qbor.svg', 'Laravel', 'Laravel', 'Laravel', 'Laravel', 3, 50, 2, '2021-09-06 22:20:20', '2021-09-06 22:20:31'),
                                                                                                                                                                                                                   (9, 'Android', '/storage/g2OFwWSPeQpM8kbu42h93WntQ6eVXwVGwO0o1Ery.svg', 'Android', 'Android', 'Android', 'Android', 1, NULL, 2, '2021-09-06 22:20:53', '2021-09-06 22:20:53'),
                                                                                                                                                                                                                   (10, 'Vue', '/storage/bKmb91V3ExdP0BROrD0nSWSLh2bslOGQFIrIh0AX.svg', 'Vue', 'Vue', 'Vue', 'Vue', 2, 60, 2, '2021-09-06 22:21:22', '2022-02-22 06:41:38'),
                                                                                                                                                                                                                   (11, 'Node JS', '/storage/qbqr20WrYSwaQKZvYT6ZlTeNdYTOjCRcfvp9EYnT.svg', 'Node JS', 'Node JS', 'Node JS', 'Node JS', 1, NULL, 2, '2021-09-06 22:21:51', '2021-09-06 22:21:51'),
                                                                                                                                                                                                                   (12, 'bootstrap', '/storage/DvoWIGHbe0N2nFoigeevZJsbwUAQ5Q2bat9DjjRJ.svg', 'Bootstrap', 'Bootstrap', 'Bootstrap', 'Bootstrap', 4, 100, 3, '2021-09-07 03:11:49', '2021-09-07 03:17:05'),
                                                                                                                                                                                                                   (13, 'material design', '/storage/ghRlnOLqjLmECtfUcHho8v2PqvOBlD9T9gaTJaKh.svg', 'Material Design', 'Material Design', 'Material Design', 'Material Design', 2, 50, 3, '2021-09-07 03:12:34', '2021-09-07 03:15:00'),
                                                                                                                                                                                                                   (14, 'Adobe Illustrator', '/storage/sQyDE9pU4EhWBUDNDZh2MPNBFToBIqy8eTP7r0hy.svg', 'Adobe Illustrator', 'Adobe Illustrator', 'Adobe Illustrator', 'Adobe Illustrator', 1, NULL, 4, '2021-09-07 03:22:58', '2021-09-07 03:22:58'),
                                                                                                                                                                                                                   (15, 'Adobe Photoshop', '/storage/lr0LGePGmJvoKrDNPNo0Kj1EZWqarPEeeLNG6EJB.svg', 'Adobe Photoshop', 'Adobe Photoshop', 'Adobe Photoshop', 'Adobe Photoshop', 1, 50, 4, '2021-09-07 03:26:29', '2021-09-07 03:26:47'),
                                                                                                                                                                                                                   (16, 'GitHub', '/storage/c3KdWxSaVdHNIQmIGPeyFRlczSFAHCUgNP9DbnQV.svg', 'GitHub', 'GitHub', 'GitHub', 'GitHub', 3, NULL, 4, '2021-09-07 03:29:26', '2021-09-07 03:29:26'),
                                                                                                                                                                                                                   (17, 'GitLab', '/storage/h1J2eBG3HWFeqcMB56mNHxAgiNI8GNtTCohaL9uB.svg', 'GitLab', 'GitLab', 'GitLab', 'GitLab', 3, 50, 4, '2021-09-07 03:29:46', '2021-09-07 03:30:06'),
                                                                                                                                                                                                                   (18, 'IntelliJ IDEA', '/storage/Lh8Rm59cHrh7yTFia77kqd9uzWoRatlpxmdKmTfp.svg', 'IntelliJ IDEA', 'IntelliJ IDEA', 'IntelliJ IDEA', 'IntelliJ IDEA', 2, 50, 4, '2021-09-07 03:32:11', '2021-09-07 03:32:27'),
                                                                                                                                                                                                                   (19, 'Eclipse', '/storage/3YrgfPDgCnoi4sGOhYfg0GT512yJun6HjcZGd7bW.svg', 'Eclipse', 'Eclipse', 'Eclipse', 'Eclipse', 3, NULL, 4, '2021-09-07 03:34:50', '2021-09-07 03:34:50'),
                                                                                                                                                                                                                   (21, 'Visual Studio Code', '/storage/Gm7p5MDHkiMftk4mMH5B67c71ha61N4zye7BwnW4.svg', 'Visual Studio Code', 'Visual Studio Code', 'Visual Studio Code', 'Visual Studio Code', 3, 50, 4, '2021-09-07 03:38:12', '2021-09-07 03:38:34'),
                                                                                                                                                                                                                   (22, 'Microsoft Visual Studio', '/storage/OmY1KSGKyKc420pCrIO0RFfYHKNwRVRb60SIMz3Y.svg', 'Microsoft Visual Studio', 'Microsoft Visual Studio', 'Microsoft Visual Studio', 'Microsoft Visual Studio', 1, 50, 4, '2021-09-07 03:39:51', '2021-09-07 03:40:12'),
                                                                                                                                                                                                                   (23, 'Adobe XD', '/storage/wmoQqMlogLW3DtJCBwnsoYve9ZEemhWYOU9dy7Yk.svg', 'Adobe XD', 'Adobe XD', 'Adobe XD', 'Adobe XD', 3, 50, 4, '2021-09-07 03:41:01', '2021-09-07 03:41:58'),
                                                                                                                                                                                                                   (24, 'MySQL', '/storage/NsREmgDDjCGgyhqt2gqOakltYGn2ROy7s4xZrW1T.svg', 'MySQL', 'MySQL', 'MySQL', 'MySQL', 4, 50, 5, '2021-09-07 03:53:57', '2021-09-07 04:02:20'),
                                                                                                                                                                                                                   (25, 'Mongo DB', '/storage/rWdPwFMsrXfK3t4NZG5KHIn4o42s8juRxeSAEJ7K.svg', 'Mongo DB', 'Mongo DB', 'Mongo DB', 'Mongo DB', 2, 50, 5, '2021-09-07 03:54:23', '2021-09-07 04:02:33'),
                                                                                                                                                                                                                   (26, 'Firebase', '/storage/Rtqim7sHu8WW6G3VXNEdqTvoWUrobPa7ojnuf8Iu.svg', 'Firebase', 'Firebase', 'Firebase', 'Firebase', 3, 50, 5, '2021-09-07 03:55:14', '2021-09-07 04:04:39'),
                                                                                                                                                                                                                   (27, 'PostgreSQL', '/storage/78wzxvxFvBpuGwLbw6QKJG0lRt8dPTzFwr9XzxhX.svg', 'PostgreSQL', 'PostgreSQL', 'PostgreSQL', 'PostgreSQL', 1, 50, 5, '2021-09-07 03:57:34', '2021-09-07 04:05:19'),
                                                                                                                                                                                                                   (28, 'SQL Server', '/storage/cy8zePNKaFHxnkS23qLq33LIhhSnvpTAcTnDRkm2.svg', 'SQL Server', 'SQL Server', 'SQL Server', 'SQL Server', 3, NULL, 5, '2021-09-07 04:00:04', '2021-09-07 04:00:04'),
                                                                                                                                                                                                                   (29, 'Ionic', '/storage/eXb6KC63m6iqbPDPMGNDJ7XzteoP4TV8ofPR3s2X.svg', 'Ionic', 'Ionic', 'Ionic', 'Ionic', 3, NULL, 2, '2021-09-08 03:25:38', '2021-09-08 03:25:38'),
                                                                                                                                                                                                                   (30, 'Yii PHP', '/storage/zlj2ghdTlHvkNAggbyeJJuL1OVgpkU5ewUbirhGh.svg', 'Yii PHP', 'Yii PHP', 'Yii PHP', 'Yii PHP', 1, NULL, 2, '2021-09-08 03:31:01', '2021-09-08 03:31:01'),
                                                                                                                                                                                                                   (31, 'Nest JS', '/storage/3koezjisO4GogPzsHj7HAeWRo0PfQ8emDxYa1CZW.svg', 'Nest JS', 'Nest JS', 'Nest JS', 'Nest JS', 1, NULL, 2, '2021-09-08 03:33:50', '2021-09-08 03:33:50'),
                                                                                                                                                                                                                   (32, 'CodeIgniter PHP', '/storage/lqMgfx7qaoOVA1LVX8PHO7LvDfcwiHTdHUEUQUoj.svg', 'CodeIgniter', 'CodeIgniter', 'CodeIgniter', 'CodeIgniter', 1, 50, 2, '2021-09-08 03:35:54', '2021-09-08 03:36:13'),
                                                                                                                                                                                                                   (34, 'vuex', '/storage/ZjGTO6YQd8ojn6UjqBTLLCWuhuoY2tKN0U3s9elw.svg', 'Vuex(Redux)', 'Vuex(Redux)', 'knowledge with the Vue js library', 'conocimientos con la librería de Vue js', 1, 50, 4, '2022-02-22 06:20:36', '2022-02-22 06:20:49'),
                                                                                                                                                                                                                   (35, 'ngrx', '/storage/3nYxRSm97uoD7UH0vcdfMow3fPEKdOIk23NJQR57.svg', 'NgRx(Redux)', 'NgRx(Redux)', 'knowledge with the NgRx library', 'conocimientos con la librería de NgRx', 2, NULL, 4, '2022-02-22 06:23:01', '2022-02-22 06:23:01'),
                                                                                                                                                                                                                   (36, 'gulpjs', '/storage/qNVKORp8aHjJn8R55Cf4ZLOm5bWxpiNsQk3KLAmy.svg', 'Gulp js', 'Gulp js', 'knowledge with the Gulp js library', 'conocimientos con la librería de Gulp js', 2, 50, 4, '2022-02-22 06:24:24', '2022-02-22 06:32:47'),
                                                                                                                                                                                                                   (37, 'scss', '/storage/JMzgXnAzGC9ugkt6xtQ6DfcAroHbh5si42SoXKpp.svg', 'Sass(Scss)', 'Sass(Scss)', 'High knowledge in layout with Sass', 'Alto conocimiento en el maquetado con Sass', 4, NULL, 4, '2022-02-22 06:25:56', '2022-02-22 06:25:56');



--
-- Estructura de tabla para la tabla `prefessional_experiences`
--

CREATE TABLE IF NOT EXISTS `prefessional_experiences` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `job_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `job_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `date_start` date DEFAULT NULL,
    `date_end` date DEFAULT NULL,
    `description_es` longtext COLLATE utf8mb4_unicode_ci,
    `description_en` longtext COLLATE utf8mb4_unicode_ci,
    `country_es` longtext COLLATE utf8mb4_unicode_ci,
    `country_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `portfolio` longtext COLLATE utf8mb4_unicode_ci,
    `user_id` bigint(20) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `prefessional_experiences_user_id_foreign` (`user_id`),
    CONSTRAINT `prefessional_experiences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prefessional_experiences`
--

INSERT INTO `prefessional_experiences` (`id`, `company`, `job_es`, `job_en`, `date_start`, `date_end`, `description_es`, `description_en`, `country_es`, `country_en`, `image_path`, `portfolio`, `user_id`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                                                                                             (1, 'ORDER2GONOW', 'ORDER2GONOW', 'Desarrollador de Aplicaciones multiplataforma', '2020-12-05', '2021-11-01', '<ul><li>Creación de la aplicación web, para la solicitud de pedidos de comida de diferentes restaurantes de la cadena MERA CORPORATION.</li><li>&nbsp;Diseño, maquetación e implementación Panel para la administración de las ordenes y platillos.</li><li><strong>Trabajando para la empresa GO1 Technologies.</strong></li><li><a href=\"http://www.order2gonow.com/\">&nbsp;Link: http://www.order2gonow.com/</a></li></ul>', '<ul><li>Creation of the web application to request food orders from different restaurants of the MERA CORPORATION chain.</li><li>Design, layout and implementation Panel for the administration of orders and dishes.</li><li><strong>Working for GO1 Technologies company.</strong></li><li>&nbsp;<a href=\"http://www.order2gonow.com/\">&nbsp;Link: http://www.order2gonow.com/</a></li></ul>', 'GO1 TECHNOLOGIES', 'GO1 TECHNOLOGIES', '/storage/v9SvXWRTBoUKApLvG82u6WCjIABzkMAzd0Q1tVFl.svg', '[{\"id\":6,\"code\":\"TypeScript\",\"icon_path\":\"\\/storage\\/8vjKP2pDftubTisvAqCMFRbt4nRWNKcNKDJZ0rUs.svg\",\"title_es\":\"TypeScript\",\"title_en\":\"TypeScript\",\"description_es\":\"TypeScript\",\"description_en\":\"TypeScript\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:51:34.000000Z\",\"updated_at\":\"2021-09-06T21:51:34.000000Z\"},{\"id\":7,\"code\":\"Angular\",\"icon_path\":\"\\/storage\\/YbjE8InSN5g5lUtVuamVGJuzbAzNLpjm6hLwRWQN.svg\",\"title_es\":\"Angular\",\"title_en\":\"Angular\",\"description_es\":\"Angular\",\"description_en\":\"Angular\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:19:47.000000Z\",\"updated_at\":\"2021-09-08T03:44:35.000000Z\"},{\"id\":12,\"code\":\"bootstrap\",\"icon_path\":\"\\/storage\\/DvoWIGHbe0N2nFoigeevZJsbwUAQ5Q2bat9DjjRJ.svg\",\"title_es\":\"Bootstrap\",\"title_en\":\"Bootstrap\",\"description_es\":\"Bootstrap\",\"description_en\":\"Bootstrap\",\"years_experience\":4,\"knowledge_level\":100,\"portfolio_categories_id\":3,\"created_at\":\"2021-09-07T03:11:49.000000Z\",\"updated_at\":\"2021-09-07T03:17:05.000000Z\"},{\"id\":28,\"code\":\"SQL Server\",\"icon_path\":\"\\/storage\\/cy8zePNKaFHxnkS23qLq33LIhhSnvpTAcTnDRkm2.svg\",\"title_es\":\"SQL Server\",\"title_en\":\"SQL Server\",\"description_es\":\"SQL Server\",\"description_en\":\"SQL Server\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":5,\"created_at\":\"2021-09-07T04:00:04.000000Z\",\"updated_at\":\"2021-09-07T04:00:04.000000Z\"},{\"id\":29,\"code\":\"Ionic\",\"icon_path\":\"\\/storage\\/eXb6KC63m6iqbPDPMGNDJ7XzteoP4TV8ofPR3s2X.svg\",\"title_es\":\"Ionic\",\"title_en\":\"Ionic\",\"description_es\":\"Ionic\",\"description_en\":\"Ionic\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-08T03:25:38.000000Z\",\"updated_at\":\"2021-09-08T03:25:38.000000Z\"}]', 1, '2021-09-07 05:04:52', '2022-01-21 13:50:42'),
                                                                                                                                                                                                                                             (2, 'MYTRANSFERS', 'Desarrollador Web', 'Web developer', '2021-04-25', '2021-07-30', '<ul><li>Actualizar, rediseñar e implementar funciones de la aplicación web basado en las necesidades de la empresa.</li><li>Identificación de las necesidades del cliente, proporcionando soluciones que garanticen su satisfacción.</li><li>Creación de funciones para callcenter para la modificación, cancelación de reservas.</li><li>Mantenimiento al panel administrativo de proveedores de la empresa mytransfer.</li><li><strong>Trabajando para la empresa GO1 Technologies.</strong></li><li>Link: <a href=\"https://www.mytransfers.com/en/\">https://www.mytransfers.com/en/</a></li></ul>', '<ul><li>Update, redesign, and implement web application features based on business needs.</li><li>Identification of customer needs, providing solutions that guarantee their satisfaction.</li><li>Creation of functions for callcenter for the modification, cancellation of reservations.</li><li>Maintenance to the administrative panel of suppliers of the mytransfer company.</li><li><strong>Working for GO1 Technologies company.</strong></li><li>Link: <a href=\"https://www.mytransfers.com/en/\">https://www.mytransfers.com/en/</a></li></ul>', 'GO1 TECHNOLOGIES', 'GO1 TECHNOLOGIES', '/storage/831Wnsp4MpK9tmFODrxxswq8U8kX0fvx8Pqs8k3N.svg', '[{\"id\":1,\"code\":\"javascript\",\"icon_path\":\"\\/storage\\/b0yNHu68FP5WyEcjf61e596fFSfychw0ZQHgvhws.svg\",\"title_es\":\"JavaScript\",\"title_en\":\"JavaScript\",\"description_es\":\"Conocimiento de javascript\",\"description_en\":\"Conocimiento de javascript\",\"years_experience\":2,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:38:09.000000Z\",\"updated_at\":\"2021-09-06T21:38:09.000000Z\"},{\"id\":2,\"code\":\"php\",\"icon_path\":\"\\/storage\\/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg\",\"title_es\":\"PHP\",\"title_en\":\"PHP\",\"description_es\":\"PHP\",\"description_en\":\"PHP\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:43:58.000000Z\",\"updated_at\":\"2021-09-06T21:43:58.000000Z\"},{\"id\":7,\"code\":\"Angular\",\"icon_path\":\"\\/storage\\/YbjE8InSN5g5lUtVuamVGJuzbAzNLpjm6hLwRWQN.svg\",\"title_es\":\"Angular\",\"title_en\":\"Angular\",\"description_es\":\"Angular\",\"description_en\":\"Angular\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:19:47.000000Z\",\"updated_at\":\"2021-09-08T03:44:35.000000Z\"},{\"id\":8,\"code\":\"Laravel\",\"icon_path\":\"\\/storage\\/9VcCyi1DP0GpWReFncHT3sYI8Gs5mHgbvnt8Qbor.svg\",\"title_es\":\"Laravel\",\"title_en\":\"Laravel\",\"description_es\":\"Laravel\",\"description_en\":\"Laravel\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:20:20.000000Z\",\"updated_at\":\"2021-09-06T22:20:31.000000Z\"},{\"id\":12,\"code\":\"bootstrap\",\"icon_path\":\"\\/storage\\/DvoWIGHbe0N2nFoigeevZJsbwUAQ5Q2bat9DjjRJ.svg\",\"title_es\":\"Bootstrap\",\"title_en\":\"Bootstrap\",\"description_es\":\"Bootstrap\",\"description_en\":\"Bootstrap\",\"years_experience\":4,\"knowledge_level\":100,\"portfolio_categories_id\":3,\"created_at\":\"2021-09-07T03:11:49.000000Z\",\"updated_at\":\"2021-09-07T03:17:05.000000Z\"},{\"id\":24,\"code\":\"MySQL\",\"icon_path\":\"\\/storage\\/NsREmgDDjCGgyhqt2gqOakltYGn2ROy7s4xZrW1T.svg\",\"title_es\":\"MySQL\",\"title_en\":\"MySQL\",\"description_es\":\"MySQL\",\"description_en\":\"MySQL\",\"years_experience\":4,\"knowledge_level\":50,\"portfolio_categories_id\":5,\"created_at\":\"2021-09-07T03:53:57.000000Z\",\"updated_at\":\"2021-09-07T04:02:20.000000Z\"}]', 1, '2021-09-08 03:55:22', '2022-01-21 13:51:17'),
                                                                                                                                                                                                                                             (3, 'EVOLUTION-EVENTS', 'Desarrollador Web', 'Web Developer', '2021-05-01', '2021-08-30', '<ul><li>https://www.evolution-events.com.mx/</li><li>&nbsp;Análisis y desarrollo de página web para la presentación de evento LEOSA</li><li>Link:<a href=\" https://leosa2021.com/es/login\"> https://leosa2021.com/es/login</a></li><li>&nbsp;Análisis y desarrollo de aplicación web administrativo para la creación de eventos, sitios, creación de usuarios con diferentes roles, ponentes entre muchas otras opciones.</li><li>Análisis y desarrollo de página web dinámica para la presentación de eventos.</li><li><strong>Trabajando para la empresa GO1 Technologies.</strong></li><li><a href=\"http://evento.evolution-events.com.mx/\">http://evento.evolution-events.com.mx/</a></li></ul>', '<ul><li>https://www.evolution-events.com.mx/</li><li>&nbsp; Analysis and development of web page for the presentation of the LEOSA event</li><li>Link: https://leosa2021.com/es/login</li><li>&nbsp; Analysis and development of administrative web application for the creation of events, sites, creation of users with different roles, speakers among many other options.</li><li>Analysis and development of a dynamic web page for the presentation of events.</li><li><strong>Working for GO1 Technologies company.</strong></li><li>http://evento.evolution-events.com.mx/</li></ul>', 'GO1 TECHNOLOGIES', 'GO1 TECHNOLOGIES', '/storage/SWnVSoktCmTv8rvhGm7alrQ59asj4ULDcQGIUYhJ.svg', '[{\"id\":1,\"code\":\"javascript\",\"icon_path\":\"\\/storage\\/b0yNHu68FP5WyEcjf61e596fFSfychw0ZQHgvhws.svg\",\"title_es\":\"JavaScript\",\"title_en\":\"JavaScript\",\"description_es\":\"Conocimiento de javascript\",\"description_en\":\"Conocimiento de javascript\",\"years_experience\":2,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:38:09.000000Z\",\"updated_at\":\"2021-09-06T21:38:09.000000Z\"},{\"id\":2,\"code\":\"php\",\"icon_path\":\"\\/storage\\/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg\",\"title_es\":\"PHP\",\"title_en\":\"PHP\",\"description_es\":\"PHP\",\"description_en\":\"PHP\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:43:58.000000Z\",\"updated_at\":\"2021-09-06T21:43:58.000000Z\"},{\"id\":7,\"code\":\"Angular\",\"icon_path\":\"\\/storage\\/YbjE8InSN5g5lUtVuamVGJuzbAzNLpjm6hLwRWQN.svg\",\"title_es\":\"Angular\",\"title_en\":\"Angular\",\"description_es\":\"Angular\",\"description_en\":\"Angular\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:19:47.000000Z\",\"updated_at\":\"2021-09-08T03:44:35.000000Z\"},{\"id\":8,\"code\":\"Laravel\",\"icon_path\":\"\\/storage\\/9VcCyi1DP0GpWReFncHT3sYI8Gs5mHgbvnt8Qbor.svg\",\"title_es\":\"Laravel\",\"title_en\":\"Laravel\",\"description_es\":\"Laravel\",\"description_en\":\"Laravel\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:20:20.000000Z\",\"updated_at\":\"2021-09-06T22:20:31.000000Z\"},{\"id\":12,\"code\":\"bootstrap\",\"icon_path\":\"\\/storage\\/DvoWIGHbe0N2nFoigeevZJsbwUAQ5Q2bat9DjjRJ.svg\",\"title_es\":\"Bootstrap\",\"title_en\":\"Bootstrap\",\"description_es\":\"Bootstrap\",\"description_en\":\"Bootstrap\",\"years_experience\":4,\"knowledge_level\":100,\"portfolio_categories_id\":3,\"created_at\":\"2021-09-07T03:11:49.000000Z\",\"updated_at\":\"2021-09-07T03:17:05.000000Z\"},{\"id\":24,\"code\":\"MySQL\",\"icon_path\":\"\\/storage\\/NsREmgDDjCGgyhqt2gqOakltYGn2ROy7s4xZrW1T.svg\",\"title_es\":\"MySQL\",\"title_en\":\"MySQL\",\"description_es\":\"MySQL\",\"description_en\":\"MySQL\",\"years_experience\":4,\"knowledge_level\":50,\"portfolio_categories_id\":5,\"created_at\":\"2021-09-07T03:53:57.000000Z\",\"updated_at\":\"2021-09-07T04:02:20.000000Z\"}]', 1, '2021-09-08 04:05:50', '2022-01-21 13:51:51'),
                                                                                                                                                                                                                                             (4, 'IQIT', 'Desarrollador Web', 'Developer Web', '2020-09-10', '2021-05-01', '<ul><li>Análisis y Desarrollo de una API para la digitalización del tramite para el Acta de extravió por placa para la institución gubernamental de la FGE de quintana Roo</li></ul>', '<ul><li>Analysis and Development of an API for the digitization of the procedure for the Act of loss by plate for the governmental institution of the FGE of Quintana Roo</li></ul><div><br></div>', 'México', 'Mexico', '/storage/sqi89AcMGZ8qK12vpd0sg4BYzE6XuUnvilL4Ei35.svg', '[{\"id\":2,\"code\":\"php\",\"icon_path\":\"\\/storage\\/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg\",\"title_es\":\"PHP\",\"title_en\":\"PHP\",\"description_es\":\"PHP\",\"description_en\":\"PHP\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:43:58.000000Z\",\"updated_at\":\"2021-09-06T21:43:58.000000Z\"},{\"id\":8,\"code\":\"Laravel\",\"icon_path\":\"\\/storage\\/9VcCyi1DP0GpWReFncHT3sYI8Gs5mHgbvnt8Qbor.svg\",\"title_es\":\"Laravel\",\"title_en\":\"Laravel\",\"description_es\":\"Laravel\",\"description_en\":\"Laravel\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:20:20.000000Z\",\"updated_at\":\"2021-09-06T22:20:31.000000Z\"},{\"id\":24,\"code\":\"MySQL\",\"icon_path\":\"\\/storage\\/NsREmgDDjCGgyhqt2gqOakltYGn2ROy7s4xZrW1T.svg\",\"title_es\":\"MySQL\",\"title_en\":\"MySQL\",\"description_es\":\"MySQL\",\"description_en\":\"MySQL\",\"years_experience\":4,\"knowledge_level\":50,\"portfolio_categories_id\":5,\"created_at\":\"2021-09-07T03:53:57.000000Z\",\"updated_at\":\"2021-09-07T04:02:20.000000Z\"}]', 1, '2021-09-08 04:12:34', '2021-09-08 04:20:33'),
                                                                                                                                                                                                                                             (5, 'America Car Rental', 'Desarrollador Web', 'Web developer', '2020-01-20', '2021-06-30', '<ul><li>Maquetación, desarrollo y programación de páginas web en HTML,&nbsp; CSS, JavaScript, PHP, MySQL, adaptadas a todo tipo de dispositivos y soportes, y servicio de mantenimiento web (contenidos, copias de seguridad, actualizaciones...)</li><li>Adaptaciones y rediseños de páginas web para cumplir con estándares xHTML, CSS, HTML5...</li><li>Paginas donde se trabajó:</li><li><a href=\"Https://americacarrental.com.mx/\">Https://americacarrental.com.mx/</a></li><li><a href=\"Https://www.cancunrentacar.com/\">Https://www.cancunrentacar.com/</a></li><li>Pagina privada administrativa de contratos de la empresa america car rental</li><li>Pagina privada administrativa de empleados de la empresa america car rental</li></ul>', '<ul><li>Layout, development and programming of web pages in HTML, CSS, JavaScript, PHP, MySQL, adapted to all types of devices and supports, and web maintenance service (content, backups, updates ...)</li><li>Adaptations and redesigns of web pages to comply with xHTML, CSS, HTML5 standards ...</li><li>Pages where it was worked:<ul><li><a href=\"Https://americacarrental.com.mx/\">Https://americacarrental.com.mx/</a></li><li><a href=\"Https://www.cancunrentacar.com/\">Https://www.cancunrentacar.com/</a></li></ul></li><li>Private administrative page of contracts of the company america car rental</li><li>Private administrative page for employees of the america car rental company</li></ul>', 'México', 'Mexico', '/storage/aGFxe929MFmidWByIjBNqDa3kTMof6fAq5FZRfpY.svg', '[{\"id\":2,\"code\":\"php\",\"icon_path\":\"\\/storage\\/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg\",\"title_es\":\"PHP\",\"title_en\":\"PHP\",\"description_es\":\"PHP\",\"description_en\":\"PHP\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:43:58.000000Z\",\"updated_at\":\"2021-09-06T21:43:58.000000Z\"},{\"id\":8,\"code\":\"Laravel\",\"icon_path\":\"\\/storage\\/9VcCyi1DP0GpWReFncHT3sYI8Gs5mHgbvnt8Qbor.svg\",\"title_es\":\"Laravel\",\"title_en\":\"Laravel\",\"description_es\":\"Laravel\",\"description_en\":\"Laravel\",\"years_experience\":3,\"knowledge_level\":50,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:20:20.000000Z\",\"updated_at\":\"2021-09-06T22:20:31.000000Z\"},{\"id\":12,\"code\":\"bootstrap\",\"icon_path\":\"\\/storage\\/DvoWIGHbe0N2nFoigeevZJsbwUAQ5Q2bat9DjjRJ.svg\",\"title_es\":\"Bootstrap\",\"title_en\":\"Bootstrap\",\"description_es\":\"Bootstrap\",\"description_en\":\"Bootstrap\",\"years_experience\":4,\"knowledge_level\":100,\"portfolio_categories_id\":3,\"created_at\":\"2021-09-07T03:11:49.000000Z\",\"updated_at\":\"2021-09-07T03:17:05.000000Z\"},{\"id\":24,\"code\":\"MySQL\",\"icon_path\":\"\\/storage\\/NsREmgDDjCGgyhqt2gqOakltYGn2ROy7s4xZrW1T.svg\",\"title_es\":\"MySQL\",\"title_en\":\"MySQL\",\"description_es\":\"MySQL\",\"description_en\":\"MySQL\",\"years_experience\":4,\"knowledge_level\":50,\"portfolio_categories_id\":5,\"created_at\":\"2021-09-07T03:53:57.000000Z\",\"updated_at\":\"2021-09-07T04:02:20.000000Z\"},{\"id\":30,\"code\":\"Yii PHP\",\"icon_path\":\"\\/storage\\/zlj2ghdTlHvkNAggbyeJJuL1OVgpkU5ewUbirhGh.svg\",\"title_es\":\"Yii PHP\",\"title_en\":\"Yii PHP\",\"description_es\":\"Yii PHP\",\"description_en\":\"Yii PHP\",\"years_experience\":1,\"knowledge_level\":null,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-08T03:31:01.000000Z\",\"updated_at\":\"2021-09-08T03:31:01.000000Z\"}]', 1, '2021-09-08 04:19:02', '2021-09-08 04:19:45'),
                                                                                                                                                                                                                                             (6, 'Etransfers Cancún', 'Desarrollador Web', 'Web Developer', '2021-12-07', '2022-03-01', '<ul><li>Maquetación completa de la página web Xcaret tours, para la reservación de tours de Xcaret México&nbsp;</li><li>Maquetación completa de la página web Etravel, para la reservación de hoteles, tours, transportación.&nbsp;</li><li>Mejoras de la interfaz de usuario para Etransfers&nbsp;</li><li>Administración y correcciones en el panel administrativo de conductores&nbsp;</li><li>Análisis y desarrollo de proyectos de modulo para la asignación de conductores para etransfers&nbsp;</li><li>Implementación de estrategia para SEO para etransfers&nbsp;</li><li>Yii 2.0, Vanilla JS, SCSS, Vue JS, GTM, users&nbsp;</li></ul>', '<ul><li>Complete layout of the Xcaret tours website, for the Xcaret Mexico tour reservation</li><li>Complete layout of the Etravel website, for the hotel reservation, tours, transportation.</li><li>UI improvements for Etransfers</li><li>Administration and corrections in the administrative panel of drivers</li><li>Analysis and development of module projects for the assignment of drivers for etransfers</li><li>Implementation of strategy for SEO for etransfers</li><li>Yii 2.0, Vanilla JS, SCSS, Vue JS, GTM, users</li></ul><div><br></div><div><br></div><div><br></div>', 'México', 'Mexico', '/storage/KvMaOJqMWjsX13romJFks7TyrjmpAk4MpJWjMu01.png', '[{\"id\":1,\"code\":\"javascript\",\"icon_path\":\"\\/storage\\/b0yNHu68FP5WyEcjf61e596fFSfychw0ZQHgvhws.svg\",\"title_es\":\"JavaScript\",\"title_en\":\"JavaScript\",\"description_es\":\"Conocimiento de javascript\",\"description_en\":\"Conocimiento de javascript\",\"years_experience\":2,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:38:09.000000Z\",\"updated_at\":\"2021-09-06T21:38:09.000000Z\"},{\"id\":2,\"code\":\"php\",\"icon_path\":\"\\/storage\\/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg\",\"title_es\":\"PHP\",\"title_en\":\"PHP\",\"description_es\":\"PHP\",\"description_en\":\"PHP\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:43:58.000000Z\",\"updated_at\":\"2021-09-06T21:43:58.000000Z\"},{\"id\":10,\"code\":\"Vue\",\"icon_path\":\"\\/storage\\/bKmb91V3ExdP0BROrD0nSWSLh2bslOGQFIrIh0AX.svg\",\"title_es\":\"Vue\",\"title_en\":\"Vue\",\"description_es\":\"Vue\",\"description_en\":\"Vue\",\"years_experience\":2,\"knowledge_level\":60,\"portfolio_categories_id\":2,\"created_at\":\"2021-09-06T22:21:22.000000Z\",\"updated_at\":\"2022-02-22T06:41:38.000000Z\"},{\"id\":16,\"code\":\"GitHub\",\"icon_path\":\"\\/storage\\/c3KdWxSaVdHNIQmIGPeyFRlczSFAHCUgNP9DbnQV.svg\",\"title_es\":\"GitHub\",\"title_en\":\"GitHub\",\"description_es\":\"GitHub\",\"description_en\":\"GitHub\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":4,\"created_at\":\"2021-09-07T03:29:26.000000Z\",\"updated_at\":\"2021-09-07T03:29:26.000000Z\"},{\"id\":34,\"code\":\"vuex\",\"icon_path\":\"\\/storage\\/ZjGTO6YQd8ojn6UjqBTLLCWuhuoY2tKN0U3s9elw.svg\",\"title_es\":\"Vuex(Redux)\",\"title_en\":\"Vuex(Redux)\",\"description_es\":\"knowledge with the Vue js library\",\"description_en\":\"conocimientos con la librer\\u00eda de Vue js\",\"years_experience\":1,\"knowledge_level\":50,\"portfolio_categories_id\":4,\"created_at\":\"2022-02-22T06:20:36.000000Z\",\"updated_at\":\"2022-02-22T06:20:49.000000Z\"},{\"id\":36,\"code\":\"gulpjs\",\"icon_path\":\"\\/storage\\/qNVKORp8aHjJn8R55Cf4ZLOm5bWxpiNsQk3KLAmy.svg\",\"title_es\":\"Gulp js\",\"title_en\":\"Gulp js\",\"description_es\":\"knowledge with the Gulp js library\",\"description_en\":\"conocimientos con la librer\\u00eda de Gulp js\",\"years_experience\":2,\"knowledge_level\":50,\"portfolio_categories_id\":4,\"created_at\":\"2022-02-22T06:24:24.000000Z\",\"updated_at\":\"2022-02-22T06:32:47.000000Z\"},{\"id\":37,\"code\":\"scss\",\"icon_path\":\"\\/storage\\/JMzgXnAzGC9ugkt6xtQ6DfcAroHbh5si42SoXKpp.svg\",\"title_es\":\"Sass(Scss)\",\"title_en\":\"Sass(Scss)\",\"description_es\":\"High knowledge in layout with Sass\",\"description_en\":\"Alto conocimiento en el maquetado con Sass\",\"years_experience\":4,\"knowledge_level\":null,\"portfolio_categories_id\":4,\"created_at\":\"2022-02-22T06:25:56.000000Z\",\"updated_at\":\"2022-02-22T06:25:56.000000Z\"}]', 1, '2022-02-22 05:43:04', '2022-07-19 20:19:17'),
                                                                                                                                                                                                                                             (7, 'Price travel', 'Analista y desarrollador web', 'Analyst and web developer', '2022-07-14', '2022-07-19', '<ul><li>Maquetación de la interfaz de tiquetes baratos&nbsp;</li><li>Implementación de estrategia para seo en tiquetes baratos y Price travel&nbsp;</li><li>Mejoras en la interfaz de usuario&nbsp;</li><li>Predicciones y mejoras de la paina web de tiquetes baratos para una mejor recepción y experiencia por parte de los clientes&nbsp;</li><li>Refactorización de la pagina web Tiquetesbaratos.com.&nbsp;</li><li>Desarrollado con: Joomla 3, Vanilla JS, SCSS, GTM,users</li><li><strong>Representando a GO1 Technologies</strong>&nbsp;</li></ul>', '<ul><li>Layout of the tiquetesbaratos.com interface</li><li>Implementation of strategy for seo in tiquetesbaratos.com and price travel</li><li>Improvements in the user\'s interface</li><li>Predictions and improvements of the tiquetesbaratos.com website.</li><li>for a better reception and experience by the customers</li><li>Refactoring of the website Tiquetesbaratos.com.</li><li>Developed with: Joomla 3, Vanilla JS, SCSS, GTM, users</li></ul><div><br></div>', 'México', 'Mexico', '/storage/oSXddK2tgR7P6Bl407eWmlKKLfHvhvPtUS9kgfeK.png', '[{\"id\":1,\"code\":\"javascript\",\"icon_path\":\"\\/storage\\/b0yNHu68FP5WyEcjf61e596fFSfychw0ZQHgvhws.svg\",\"title_es\":\"JavaScript\",\"title_en\":\"JavaScript\",\"description_es\":\"Conocimiento de javascript\",\"description_en\":\"Conocimiento de javascript\",\"years_experience\":2,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:38:09.000000Z\",\"updated_at\":\"2021-09-06T21:38:09.000000Z\"},{\"id\":2,\"code\":\"php\",\"icon_path\":\"\\/storage\\/eJrvIIjhts9bIrBgj98Suw5kwudBiUaJpdlGaYD8.svg\",\"title_es\":\"PHP\",\"title_en\":\"PHP\",\"description_es\":\"PHP\",\"description_en\":\"PHP\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":1,\"created_at\":\"2021-09-06T21:43:58.000000Z\",\"updated_at\":\"2021-09-06T21:43:58.000000Z\"},{\"id\":12,\"code\":\"bootstrap\",\"icon_path\":\"\\/storage\\/DvoWIGHbe0N2nFoigeevZJsbwUAQ5Q2bat9DjjRJ.svg\",\"title_es\":\"Bootstrap\",\"title_en\":\"Bootstrap\",\"description_es\":\"Bootstrap\",\"description_en\":\"Bootstrap\",\"years_experience\":4,\"knowledge_level\":100,\"portfolio_categories_id\":3,\"created_at\":\"2021-09-07T03:11:49.000000Z\",\"updated_at\":\"2021-09-07T03:17:05.000000Z\"},{\"id\":28,\"code\":\"SQL Server\",\"icon_path\":\"\\/storage\\/cy8zePNKaFHxnkS23qLq33LIhhSnvpTAcTnDRkm2.svg\",\"title_es\":\"SQL Server\",\"title_en\":\"SQL Server\",\"description_es\":\"SQL Server\",\"description_en\":\"SQL Server\",\"years_experience\":3,\"knowledge_level\":null,\"portfolio_categories_id\":5,\"created_at\":\"2021-09-07T04:00:04.000000Z\",\"updated_at\":\"2021-09-07T04:00:04.000000Z\"},{\"id\":36,\"code\":\"gulpjs\",\"icon_path\":\"\\/storage\\/qNVKORp8aHjJn8R55Cf4ZLOm5bWxpiNsQk3KLAmy.svg\",\"title_es\":\"Gulp js\",\"title_en\":\"Gulp js\",\"description_es\":\"knowledge with the Gulp js library\",\"description_en\":\"conocimientos con la librer\\u00eda de Gulp js\",\"years_experience\":2,\"knowledge_level\":50,\"portfolio_categories_id\":4,\"created_at\":\"2022-02-22T06:24:24.000000Z\",\"updated_at\":\"2022-02-22T06:32:47.000000Z\"},{\"id\":37,\"code\":\"scss\",\"icon_path\":\"\\/storage\\/JMzgXnAzGC9ugkt6xtQ6DfcAroHbh5si42SoXKpp.svg\",\"title_es\":\"Sass(Scss)\",\"title_en\":\"Sass(Scss)\",\"description_es\":\"High knowledge in layout with Sass\",\"description_en\":\"Alto conocimiento en el maquetado con Sass\",\"years_experience\":4,\"knowledge_level\":null,\"portfolio_categories_id\":4,\"created_at\":\"2022-02-22T06:25:56.000000Z\",\"updated_at\":\"2022-02-22T06:25:56.000000Z\"}]', 1, '2022-07-19 20:25:34', '2022-07-19 20:27:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `studies`
--

-- Volcando estructura para tabla herandr1_portafolio_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_es` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description_es` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `table_name_key_uindex` (`key`),
  UNIQUE KEY `table_name_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla herandr1_portafolio_db.roles: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT IGNORE INTO `roles` (`id`, `key`, `name_es`, `name_en`, `description_es`, `description_en`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'admin', 'Administrador', 'Administrator', 'permiso total', 'Total permission', NULL, NULL, NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Volcando estructura para tabla herandr1_portafolio_db.studies
CREATE TABLE IF NOT EXISTS `studies` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `caerrer_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `caerrer_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `school_es` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `school_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `folio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `user_id` bigint(20) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `studies_user_id_foreign` (`user_id`),
    CONSTRAINT `studies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `styleguide_basics`
--

-- Volcando estructura para tabla herandr1_portafolio_db.styleguide_basics
CREATE TABLE IF NOT EXISTS `styleguide_basics` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `headings` tinyint(1) DEFAULT NULL,
    `text` tinyint(1) DEFAULT NULL,
    `lists` tinyint(1) DEFAULT NULL,
    `blockquote` tinyint(1) DEFAULT NULL,
    `rule` tinyint(1) DEFAULT NULL,
    `table` tinyint(1) DEFAULT NULL,
    `breadcrumbs` tinyint(1) DEFAULT NULL,
    `forms` tinyint(1) DEFAULT NULL,
    `buttons` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `styleguide_colors`
--

-- Volcando estructura para tabla herandr1_portafolio_db.styleguide_colors
CREATE TABLE IF NOT EXISTS `styleguide_colors` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `class` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `hex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `styleguide_patterns`
--

-- Volcando datos para la tabla herandr1_portafolio_db.styleguide_colors: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `styleguide_colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `styleguide_colors` ENABLE KEYS */;

-- Volcando estructura para tabla herandr1_portafolio_db.styleguide_patterns
CREATE TABLE IF NOT EXISTS `styleguide_patterns` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `pattern` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--



-- Volcando estructura para tabla herawaeg_portafolio_db_prod.data_herandro
CREATE TABLE IF NOT EXISTS `data_herandro` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `uid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    `ip` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
    `domain` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    `user_id` bigint(20) unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_users` (`user_id`),
    CONSTRAINT `FK_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='tabla de data_herandro';

-- Volcando datos para la tabla herawaeg_portafolio_db_prod.data_herandro: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `data_herandro` DISABLE KEYS */;
INSERT INTO `data_herandro` (`id`, `uid`, `ip`, `domain`, `created_at`, `updated_at`, `deleted_at`, `user_id`) VALUES
                                                                                                                   (7, '039a00c1-6cfd-4367-8903-e2c44bd6a461', '::1', 'portfolio-design.test', '2023-03-01 23:36:41', '2023-03-01 23:36:41', NULL, 1),
                                                                                                                   (8, 'b64523b1-9f91-45a8-90f9-49dd9fb8dffb', '::1', 'portfolio-design.test', '2023-03-01 23:37:01', '2023-03-01 23:37:01', NULL, 1),
                                                                                                                   (9, 'a790e109-ee2b-4b57-a19c-79c1bbf70e55', '::1', 'portfolio-design.test', '2023-03-01 23:39:29', '2023-03-01 23:39:29', NULL, 1);
/*!40000 ALTER TABLE `data_herandro` ENABLE KEYS */;

-- Volcando estructura para tabla herawaeg_portafolio_db_prod.data_herandro_event
CREATE TABLE IF NOT EXISTS `data_herandro_event` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
    `description` longtext COLLATE utf8_unicode_ci,
    `user_id` bigint(20) unsigned DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    `eventCode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    `n_repeat` int(11) DEFAULT '1',
    PRIMARY KEY (`id`),
    KEY `FK_user_id` (`user_id`),
    CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='acciones de data_herandro';

-- Volcando datos para la tabla herawaeg_portafolio_db_prod.data_herandro_event: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `data_herandro_event` DISABLE KEYS */;
INSERT INTO `data_herandro_event` (`id`, `name`, `description`, `user_id`, `created_at`, `updated_at`, `deleted_at`, `eventCode`, `n_repeat`) VALUES

    (1, 'CLICK_POST_FORM', 'Evento de cambio de lenguaje', 1, '2023-03-03 08:59:31', '2023-03-03 08:59:31', NULL, 'CLICK_POST_FORM', 1);
/*!40000 ALTER TABLE `data_herandro_event` ENABLE KEYS */;

-- Volcando estructura para tabla herawaeg_portafolio_db_prod.data_herandro_event_action
CREATE TABLE IF NOT EXISTS `data_herandro_event_action` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `label` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
    `value` longtext COLLATE utf8_unicode_ci,
    `data_herandro_event_id` bigint(20) unsigned DEFAULT NULL,
    `user_id` bigint(20) unsigned DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_data_herandro_event` (`data_herandro_event_id`),
    KEY `FK_user_id_event` (`user_id`),
    CONSTRAINT `FK_data_herandro_event` FOREIGN KEY (`data_herandro_event_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_user_id_event` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla herawaeg_portafolio_db_prod.data_herandro_event_action: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `data_herandro_event_action` DISABLE KEYS */;
INSERT INTO `data_herandro_event_action` (`id`, `label`, `value`, `data_herandro_event_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
                                                                                                                                                     (1, NULL, 'es', 1, 1, '2023-03-02 23:26:51', '2023-03-02 23:26:51', NULL),
                                                                                                                                                     (2, 'cambio lenguaje', 'es', 1, 1, '2023-03-02 23:27:56', '2023-03-02 23:27:56', NULL),
                                                                                                                                                     (3, 'CLICK_CHANGE_LANGUAGE', 'es', 1, 1, '2023-03-02 23:28:13', '2023-03-02 23:28:13', NULL),
                                                                                                                                                     (4, 'CLICK_CHANGE_LANGUAGE', 'es', 1, 1, '2023-03-03 08:58:18', '2023-03-03 08:58:18', NULL);
/*!40000 ALTER TABLE `data_herandro_event_action` ENABLE KEYS */;
