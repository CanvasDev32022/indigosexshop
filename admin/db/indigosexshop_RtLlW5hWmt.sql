-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-03-2023 a las 17:59:02
-- Versión del servidor: 8.0.30
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `indigosexshop_rtllw5hwmt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios_rotativos`
--

CREATE TABLE `anuncios_rotativos` (
  `anr_id` int NOT NULL,
  `anr_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anr_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anr_mostrar` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `anr_borrado` tinyint(1) NOT NULL,
  `anr_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `anr_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banners`
--

CREATE TABLE `banners` (
  `ban_id` int NOT NULL,
  `ban_titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_imagene` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_imagenm` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_mostrar` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `ban_borrado` tinyint(1) NOT NULL,
  `ban_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ban_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE `blog` (
  `blg_id` int NOT NULL,
  `blg_imagen` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_autor` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_mostrar` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `blg_fecha` date NOT NULL,
  `blg_contenido` blob NOT NULL,
  `blg_metatitulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_metadescripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_metakeywords` blob NOT NULL,
  `blg_imagenc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_imagend` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_borrado` tinyint(1) NOT NULL,
  `blg_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blg_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `cht_id` int NOT NULL,
  `cht_prefijo` int NOT NULL,
  `cht_numero` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cht_textoactivo` blob NOT NULL,
  `cht_textoinactivo` blob NOT NULL,
  `cht_mostrar` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `cht_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cht_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cli_id` int NOT NULL,
  `cli_nombres` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cli_apellidos` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cli_telefono` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cli_email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cli_password` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cli_direccion` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cli_complemento` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pai_id` int NOT NULL,
  `dep_id` int NOT NULL,
  `ciu_id` int NOT NULL,
  `cli_borrado` tinyint(1) NOT NULL,
  `cli_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cli_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `con_id` int NOT NULL,
  `con_facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_instagram` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_youtube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_tiktok` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_modiifcado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `con_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correo`
--

CREATE TABLE `correo` (
  `cor_id` int NOT NULL,
  `cor_contacto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_servidorsmtp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_servidorpop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_smtp` int NOT NULL COMMENT '587',
  `cor_pop` int NOT NULL COMMENT '995',
  `cor_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cor_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria`
--

CREATE TABLE `galeria` (
  `gal_id` int NOT NULL,
  `gal_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_imagena` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_imagenb` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_mostrar` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `gal_borrado` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `gal_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gal_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habeas`
--

CREATE TABLE `habeas` (
  `hab_id` int NOT NULL,
  `hab_titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hab_contenido` blob NOT NULL,
  `hab_borrado` tinyint(1) NOT NULL,
  `hab_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `hab_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pdd_id` int NOT NULL,
  `cli_id` int NOT NULL,
  `pdd_referencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_cliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_complemento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pai_id` int NOT NULL,
  `dep_id` int NOT NULL,
  `ciu_id` int NOT NULL,
  `pdd_total` double NOT NULL,
  `pds_id` int NOT NULL,
  `pag_id` int NOT NULL,
  `pgs_id` int NOT NULL,
  `pdd_observacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pdd_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_productos`
--

CREATE TABLE `pedidos_productos` (
  `pdp_id` int NOT NULL,
  `pdd_id` int NOT NULL,
  `prd_id` int NOT NULL,
  `pdp_valor` double NOT NULL,
  `pdp_cantidad` int NOT NULL,
  `pdp_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pdp_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_frecuentes`
--

CREATE TABLE `preguntas_frecuentes` (
  `pqr_id` int NOT NULL,
  `pqr_pregunta` blob NOT NULL,
  `pqr_respuesta` blob NOT NULL,
  `pqc_id` int NOT NULL COMMENT 'Categoría',
  `pqr_mostrar` blob NOT NULL COMMENT '0:No, 1: Si',
  `pqr_borrado` tinyint(1) NOT NULL,
  `pqr_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pqr_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `prd_id` int NOT NULL,
  `prd_imagen` blob NOT NULL,
  `prd_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_descripcion_corta` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_descripcion_larga` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prt_id` int NOT NULL COMMENT 'Tipo de producto',
  `prd_visible` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `vrd_ids` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pct_ids` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'categorías',
  `prd_precio` double NOT NULL,
  `prd_promocion` tinyint(1) NOT NULL,
  `prd_porcentajepromocion` double NOT NULL,
  `prd_preciopromocion` double NOT NULL,
  `prs_id` int NOT NULL COMMENT 'Estado del Producto',
  `prd_destacado` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `prd_nuevo` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `prd_vendido` tinyint(1) NOT NULL,
  `prd_referencia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_padre` int NOT NULL,
  `prd_ajustarimagen` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `prd_relacionado` blob NOT NULL,
  `prd_metatitulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_metadescripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_metakeywords` blob NOT NULL,
  `prd_metaimagenc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_metaimagend` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prd_borrado` tinyint(1) NOT NULL,
  `prd_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prd_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_categorias`
--

CREATE TABLE `productos_categorias` (
  `pct_id` int NOT NULL,
  `pct_imagene` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_imagenm` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_padre` int NOT NULL,
  `pct_metatitulo` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_metadescripcion` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_metakeywords` blob NOT NULL,
  `pct_metaimagenc` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_metaimagend` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pct_borrado` tinyint(1) NOT NULL,
  `pct_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pct_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_galeria`
--

CREATE TABLE `productos_galeria` (
  `prg_id` int NOT NULL,
  `prd_id` int NOT NULL,
  `vrd_id` int NOT NULL,
  `prg_galeria` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `prg_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prg_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_inventario`
--

CREATE TABLE `productos_inventario` (
  `pri_id` int NOT NULL,
  `prd_id` int NOT NULL,
  `vrd_ids` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pri_inventario` int NOT NULL,
  `pri_preciodiferencia` double NOT NULL,
  `pri_visible` tinyint(1) NOT NULL,
  `pri_borrado` tinyint(1) NOT NULL,
  `pri_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pri_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_variaciones`
--

CREATE TABLE `productos_variaciones` (
  `prv_id` int NOT NULL,
  `prd_id` int NOT NULL,
  `var_id` int NOT NULL,
  `vrd_ids` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `prv_borrado` tinyint(1) NOT NULL,
  `prv_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prv_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int NOT NULL,
  `rol_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Administrador',
  `rol_borrado` tinyint(1) NOT NULL COMMENT '0:Activo, 1:Borrado',
  `rol_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rol_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `rol_nombre`, `rol_borrado`, `rol_modificado`, `rol_creado`) VALUES
(1, 'Administrador', 0, '2023-02-09 14:29:36', '2023-02-09 14:29:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seo`
--

CREATE TABLE `seo` (
  `seo_id` int NOT NULL,
  `seo_titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_keywords` blob NOT NULL,
  `seo_imagena` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_imagenb` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `seo_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` int NOT NULL,
  `usr_codigo` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_nombres` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_apellidos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol_id` int NOT NULL COMMENT 'Administrador',
  `est_id` int NOT NULL COMMENT '0:Activo, 1:Inactivo',
  `usr_borrado` tinyint(1) NOT NULL COMMENT '0:Activo, 1:Borrado',
  `usr_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usr_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usr_id`, `usr_codigo`, `usr_nombres`, `usr_apellidos`, `usr_email`, `usr_password`, `rol_id`, `est_id`, `usr_borrado`, `usr_modificado`, `usr_creado`) VALUES
(1, 'B95ktmy90HqJnsvXuBRI', 'Canvas', 'Dev3', 'canvas.desarrollo3@gmail.com', '$2y$10$TncdfgVboYqcZ2KGo.r6duFytXdLp.CX1xA4MCCbwWRvhpa2Sgzoy', 0, 1, 0, '2023-02-09 14:38:20', '2023-02-09 14:33:59'),
(2, 'zABHxqe66eH0kyKWdilj', 'Harvy', 'Vargas', 'canvas.comercial@gmail.com', '$2y$10$ivoIKcrYG3GRk70XZsh/IO6kt8jMPwcFypAQhoTbw8t2bo0wHb5.e', 1, 1, 0, '2023-02-09 14:50:53', '2023-02-09 14:50:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variaciones`
--

CREATE TABLE `variaciones` (
  `var_id` int NOT NULL,
  `var_nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `var_tipo` int NOT NULL COMMENT '1:Color, 2:Lista',
  `var_borrado` tinyint(1) NOT NULL,
  `var_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `var_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `variaciones`
--

INSERT INTO `variaciones` (`var_id`, `var_nombre`, `var_tipo`, `var_borrado`, `var_modificado`, `var_creado`) VALUES
(1, 'Tallas', 1, 0, '2023-02-13 17:05:09', '2023-02-13 17:05:09'),
(2, 'Color', 2, 0, '2023-02-13 17:05:09', '2023-02-13 17:05:09'),
(3, 'Sabores', 1, 0, '2023-03-09 15:10:40', '2023-03-09 15:10:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variaciones_detalles`
--

CREATE TABLE `variaciones_detalles` (
  `vrd_id` int NOT NULL,
  `var_id` int NOT NULL,
  `vrd_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `vrd_color` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `vrd_borrado` tinyint(1) NOT NULL,
  `vrd_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vrd_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `variaciones_detalles`
--

INSERT INTO `variaciones_detalles` (`vrd_id`, `var_id`, `vrd_nombre`, `vrd_color`, `vrd_borrado`, `vrd_modificado`, `vrd_creado`) VALUES
(1, 1, 'S', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(2, 1, 'M', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(3, 1, 'L', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(4, 1, 'XL', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(5, 1, '2XL', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(6, 1, '3XL', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(7, 1, '4XL', '', 0, '2023-02-13 17:08:16', '2023-02-13 17:08:16'),
(8, 2, 'Azul', '#26204c', 0, '2023-02-13 17:09:50', '2023-02-13 17:09:50'),
(9, 2, 'Rojo', '#9c2229', 0, '2023-02-13 17:09:50', '2023-02-13 17:09:50'),
(10, 2, 'Negro', '#141319', 0, '2023-02-13 17:09:50', '2023-02-13 17:09:50'),
(11, 2, 'Blanco', '#cad4d6', 0, '2023-02-13 17:09:50', '2023-02-13 17:09:50'),
(12, 3, 'Iris Cream', '', 0, '2023-03-09 15:12:41', '2023-03-09 15:12:41'),
(13, 3, 'Mojito', '', 0, '2023-03-09 15:12:41', '2023-03-09 15:12:41'),
(14, 3, 'Vino Pasión', '', 0, '2023-03-09 15:12:41', '2023-03-09 15:12:41'),
(15, 3, 'Coco Vainilla', '', 0, '2023-03-09 15:12:41', '2023-03-09 15:12:41'),
(16, 3, 'Fresa', '', 0, '2023-03-09 15:12:41', '2023-03-09 15:12:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_boolean`
--

CREATE TABLE `_boolean` (
  `boo_id` int NOT NULL,
  `boo_nombre_es` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `boo_nombre_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_boolean`
--

INSERT INTO `_boolean` (`boo_id`, `boo_nombre_es`, `boo_nombre_en`) VALUES
(1, 'Si', 'Yes'),
(0, 'No', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_estados`
--

CREATE TABLE `_estados` (
  `est_id` int NOT NULL,
  `est_nombre_es` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Activo, Inactivo',
  `est_nombre_en` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Enabled, Disabled'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_estados`
--

INSERT INTO `_estados` (`est_id`, `est_nombre_es`, `est_nombre_en`) VALUES
(1, 'Activo', 'Enabled'),
(0, 'Inactivo', 'Disabled');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_pagos`
--

CREATE TABLE `_pagos` (
  `pag_id` int NOT NULL,
  `pag_slug` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pag_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_pagos_estados`
--

CREATE TABLE `_pagos_estados` (
  `pgs_id` int NOT NULL,
  `pgs_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_productos_estados`
--

CREATE TABLE `_productos_estados` (
  `prs_id` int NOT NULL,
  `prs_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_productos_estados`
--

INSERT INTO `_productos_estados` (`prs_id`, `prs_nombre`) VALUES
(1, 'Activo'),
(2, 'Agotado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_productos_tipos`
--

CREATE TABLE `_productos_tipos` (
  `prt_id` int NOT NULL,
  `prt_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_productos_tipos`
--

INSERT INTO `_productos_tipos` (`prt_id`, `prt_nombre`) VALUES
(1, 'Único'),
(2, 'Variable');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_recuperar`
--

CREATE TABLE `_recuperar` (
  `rec_id` int NOT NULL,
  `usr_id` int NOT NULL,
  `cli_id` int NOT NULL,
  `rec_codigo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rec_estado` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `rec_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rec_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anuncios_rotativos`
--
ALTER TABLE `anuncios_rotativos`
  ADD PRIMARY KEY (`anr_id`);

--
-- Indices de la tabla `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`ban_id`);

--
-- Indices de la tabla `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blg_id`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`cht_id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cli_id`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`con_id`);

--
-- Indices de la tabla `correo`
--
ALTER TABLE `correo`
  ADD PRIMARY KEY (`cor_id`);

--
-- Indices de la tabla `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`gal_id`);

--
-- Indices de la tabla `habeas`
--
ALTER TABLE `habeas`
  ADD PRIMARY KEY (`hab_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pdd_id`);

--
-- Indices de la tabla `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  ADD PRIMARY KEY (`pdp_id`);

--
-- Indices de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  ADD PRIMARY KEY (`pqr_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prd_id`);

--
-- Indices de la tabla `productos_categorias`
--
ALTER TABLE `productos_categorias`
  ADD PRIMARY KEY (`pct_id`);

--
-- Indices de la tabla `productos_galeria`
--
ALTER TABLE `productos_galeria`
  ADD PRIMARY KEY (`prg_id`);

--
-- Indices de la tabla `productos_inventario`
--
ALTER TABLE `productos_inventario`
  ADD PRIMARY KEY (`pri_id`);

--
-- Indices de la tabla `productos_variaciones`
--
ALTER TABLE `productos_variaciones`
  ADD PRIMARY KEY (`prv_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `seo`
--
ALTER TABLE `seo`
  ADD PRIMARY KEY (`seo_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`);

--
-- Indices de la tabla `variaciones`
--
ALTER TABLE `variaciones`
  ADD PRIMARY KEY (`var_id`);

--
-- Indices de la tabla `variaciones_detalles`
--
ALTER TABLE `variaciones_detalles`
  ADD PRIMARY KEY (`vrd_id`);

--
-- Indices de la tabla `_boolean`
--
ALTER TABLE `_boolean`
  ADD PRIMARY KEY (`boo_id`);

--
-- Indices de la tabla `_estados`
--
ALTER TABLE `_estados`
  ADD PRIMARY KEY (`est_id`);

--
-- Indices de la tabla `_pagos`
--
ALTER TABLE `_pagos`
  ADD PRIMARY KEY (`pag_id`);

--
-- Indices de la tabla `_pagos_estados`
--
ALTER TABLE `_pagos_estados`
  ADD PRIMARY KEY (`pgs_id`);

--
-- Indices de la tabla `_productos_estados`
--
ALTER TABLE `_productos_estados`
  ADD PRIMARY KEY (`prs_id`);

--
-- Indices de la tabla `_productos_tipos`
--
ALTER TABLE `_productos_tipos`
  ADD PRIMARY KEY (`prt_id`);

--
-- Indices de la tabla `_recuperar`
--
ALTER TABLE `_recuperar`
  ADD PRIMARY KEY (`rec_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios_rotativos`
--
ALTER TABLE `anuncios_rotativos`
  MODIFY `anr_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `banners`
--
ALTER TABLE `banners`
  MODIFY `ban_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `blg_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `cht_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cli_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `con_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `correo`
--
ALTER TABLE `correo`
  MODIFY `cor_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `galeria`
--
ALTER TABLE `galeria`
  MODIFY `gal_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habeas`
--
ALTER TABLE `habeas`
  MODIFY `hab_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pdd_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  MODIFY `pdp_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  MODIFY `pqr_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prd_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_categorias`
--
ALTER TABLE `productos_categorias`
  MODIFY `pct_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_galeria`
--
ALTER TABLE `productos_galeria`
  MODIFY `prg_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_inventario`
--
ALTER TABLE `productos_inventario`
  MODIFY `pri_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_variaciones`
--
ALTER TABLE `productos_variaciones`
  MODIFY `prv_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `seo`
--
ALTER TABLE `seo`
  MODIFY `seo_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usr_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `variaciones`
--
ALTER TABLE `variaciones`
  MODIFY `var_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `variaciones_detalles`
--
ALTER TABLE `variaciones_detalles`
  MODIFY `vrd_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `_boolean`
--
ALTER TABLE `_boolean`
  MODIFY `boo_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `_estados`
--
ALTER TABLE `_estados`
  MODIFY `est_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `_pagos`
--
ALTER TABLE `_pagos`
  MODIFY `pag_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_pagos_estados`
--
ALTER TABLE `_pagos_estados`
  MODIFY `pgs_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_productos_estados`
--
ALTER TABLE `_productos_estados`
  MODIFY `prs_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `_productos_tipos`
--
ALTER TABLE `_productos_tipos`
  MODIFY `prt_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `_recuperar`
--
ALTER TABLE `_recuperar`
  MODIFY `rec_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
