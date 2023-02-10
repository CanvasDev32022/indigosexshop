-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-02-2023 a las 09:11:44
-- Versión del servidor: 5.7.41
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `indigosexshop_RtLlW5hWmt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios_rotativos`
--

CREATE TABLE `anuncios_rotativos` (
  `anr_id` int(11) NOT NULL,
  `anr_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `anr_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `ban_id` int(11) NOT NULL,
  `ban_titulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_imagene` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_imagenm` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `blg_id` int(11) NOT NULL,
  `blg_imagen` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_titulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_autor` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_mostrar` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `blg_fecha` date NOT NULL,
  `blg_contenido` blob NOT NULL,
  `blg_metatitulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_metadescripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_metakeywords` blob NOT NULL,
  `blg_imagenc` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_imagend` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blg_borrado` tinyint(1) NOT NULL,
  `blg_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blg_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `cht_id` int(11) NOT NULL,
  `cht_prefijo` int(11) NOT NULL,
  `cht_numero` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `cli_id` int(11) NOT NULL,
  `cli_nombres` varchar(100) CHARACTER SET latin1 NOT NULL,
  `cli_apellidos` varchar(100) CHARACTER SET latin1 NOT NULL,
  `cli_telefono` varchar(20) CHARACTER SET latin1 NOT NULL,
  `cli_email` varchar(100) CHARACTER SET latin1 NOT NULL,
  `cli_password` varchar(60) CHARACTER SET latin1 NOT NULL,
  `cli_direccion` varchar(255) CHARACTER SET latin1 NOT NULL,
  `cli_complemento` varchar(255) CHARACTER SET latin1 NOT NULL,
  `pai_id` int(11) NOT NULL,
  `dep_id` int(11) NOT NULL,
  `ciu_id` int(11) NOT NULL,
  `cli_borrado` tinyint(1) NOT NULL,
  `cli_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cli_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `con_id` int(11) NOT NULL,
  `con_facebook` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_instagram` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_youtube` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_tiktok` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_correo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `con_modiifcado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `con_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correo`
--

CREATE TABLE `correo` (
  `cor_id` int(11) NOT NULL,
  `cor_contacto` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_servidorsmtp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_servidorpop` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor_smtp` int(11) NOT NULL COMMENT '587',
  `cor_pop` int(11) NOT NULL COMMENT '995',
  `cor_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cor_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria`
--

CREATE TABLE `galeria` (
  `gal_id` int(11) NOT NULL,
  `gal_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_imagena` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gal_imagenb` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `hab_id` int(11) NOT NULL,
  `hab_titulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `pdd_id` int(11) NOT NULL,
  `cli_id` int(11) NOT NULL,
  `pdd_referencia` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_cliente` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_complemento` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pai_id` int(11) NOT NULL,
  `dep_id` int(11) NOT NULL,
  `ciu_id` int(11) NOT NULL,
  `pdd_total` double NOT NULL,
  `pds_id` int(11) NOT NULL,
  `pag_id` int(11) NOT NULL,
  `pgs_id` int(11) NOT NULL,
  `pdd_observacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdd_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pdd_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_productos`
--

CREATE TABLE `pedidos_productos` (
  `pdp_id` int(11) NOT NULL,
  `pdd_id` int(11) NOT NULL,
  `prd_id` int(11) NOT NULL,
  `pdp_valor` double NOT NULL,
  `pdp_cantidad` int(11) NOT NULL,
  `pdp_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pdp_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_frecuentes`
--

CREATE TABLE `preguntas_frecuentes` (
  `pqr_id` int(11) NOT NULL,
  `pqr_pregunta` blob NOT NULL,
  `pqr_respuesta` blob NOT NULL,
  `pqc_id` int(11) NOT NULL COMMENT 'Categoría',
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
  `prd_id` int(11) NOT NULL,
  `prd_imagen` varchar(100) CHARACTER SET latin1 NOT NULL,
  `prd_nombre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `prd_descripcion_corta` varchar(255) CHARACTER SET latin1 NOT NULL,
  `prd_descripcion_larga` varchar(255) CHARACTER SET latin1 NOT NULL,
  `prt_id` int(11) NOT NULL COMMENT 'Tipo de producto',
  `prd_visible` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `vrd_ids` varchar(255) CHARACTER SET latin1 NOT NULL,
  `pct_id` int(11) NOT NULL COMMENT 'categoría',
  `prd_precio` double NOT NULL,
  `prs_id` int(11) NOT NULL COMMENT 'Estado del Producto',
  `prd_destacado` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `prd_nuevo` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `prd_referencia` varchar(100) CHARACTER SET latin1 NOT NULL,
  `prd_padre` int(11) NOT NULL,
  `prd_ajustarimagen` tinyint(1) NOT NULL COMMENT '0:No, 1: Si',
  `prd_relacionado` blob NOT NULL,
  `prd_metatitulo` varchar(100) CHARACTER SET latin1 NOT NULL,
  `prd_metadescripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  `prd_metakeywords` blob NOT NULL,
  `prd_metaimagenc` varchar(100) CHARACTER SET latin1 NOT NULL,
  `prd_metaimagend` varchar(100) CHARACTER SET latin1 NOT NULL,
  `prd_borrado` tinyint(1) NOT NULL,
  `prd_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prd_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_categorias`
--

CREATE TABLE `productos_categorias` (
  `pct_id` int(11) NOT NULL,
  `pct_imagene` varchar(100) CHARACTER SET latin1 NOT NULL,
  `pct_imagenm` varchar(100) CHARACTER SET latin1 NOT NULL,
  `pct_nombre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `pct_padre` int(11) NOT NULL,
  `pct_metatitulo` varchar(100) CHARACTER SET latin1 NOT NULL,
  `pct_metadescripcion` varchar(255) CHARACTER SET latin1 NOT NULL,
  `pct_metakeywords` blob NOT NULL,
  `pct_metaimagenc` varchar(100) CHARACTER SET latin1 NOT NULL,
  `pct_metaimagend` varchar(100) CHARACTER SET latin1 NOT NULL,
  `pct_borrado` tinyint(1) NOT NULL,
  `pct_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pct_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_inventario`
--

CREATE TABLE `productos_inventario` (
  `pri_id` int(11) NOT NULL,
  `prd_id` int(11) NOT NULL,
  `pri_inventario` int(11) NOT NULL,
  `pri_borrado` tinyint(1) NOT NULL,
  `pri_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pri_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `rol_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Administrador',
  `rol_borrado` tinyint(1) NOT NULL COMMENT '0:Activo, 1:Borrado',
  `rol_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rol_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seo`
--

CREATE TABLE `seo` (
  `seo_id` int(11) NOT NULL,
  `seo_titulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_keywords` blob NOT NULL,
  `seo_imagena` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_imagenb` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `seo_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` int(11) NOT NULL,
  `usr_codigo` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_nombres` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_apellidos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `usr_password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol_id` int(11) NOT NULL COMMENT 'Administrador',
  `est_id` int(11) NOT NULL COMMENT '0:Activo, 1:Inactivo',
  `usr_borrado` tinyint(1) NOT NULL COMMENT '0:Activo, 1:Borrado',
  `usr_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usr_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variaciones`
--

CREATE TABLE `variaciones` (
  `var_id` int(11) NOT NULL,
  `var_nombre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `var_tipo` int(11) NOT NULL COMMENT '1:Color, 2:Lista',
  `var_borrado` tinyint(1) NOT NULL,
  `var_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `var_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variaciones_detalles`
--

CREATE TABLE `variaciones_detalles` (
  `vrd_id` int(11) NOT NULL,
  `vrd_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `vrd_color` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `vrd_borrado` tinyint(1) NOT NULL,
  `vrd_modificado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vrd_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_boolean`
--

CREATE TABLE `_boolean` (
  `boo_id` int(11) NOT NULL,
  `boo_nombre_es` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `boo_nombre_en` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
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
  `est_id` int(11) NOT NULL,
  `est_nombre_es` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Activo, Inactivo',
  `est_nombre_en` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Enabled, Disabled'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_estados`
--

INSERT INTO `_estados` (`est_id`, `est_nombre_es`, `est_nombre_en`) VALUES
(1, 'Activo', 'Enabled'),
(2, 'Inactivo', 'Disabled');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_pagos`
--

CREATE TABLE `_pagos` (
  `pag_id` int(11) NOT NULL,
  `pag_slug` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pag_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_pagos_estados`
--

CREATE TABLE `_pagos_estados` (
  `pgs_id` int(11) NOT NULL,
  `pgs_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_productos_estados`
--

CREATE TABLE `_productos_estados` (
  `prs_id` int(11) NOT NULL,
  `prs_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_productos_tipos`
--

CREATE TABLE `_productos_tipos` (
  `prt_id` int(11) NOT NULL,
  `prt_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_recuperar`
--

CREATE TABLE `_recuperar` (
  `rec_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
  `cli_id` int(11) NOT NULL,
  `rec_codigo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Indices de la tabla `productos_inventario`
--
ALTER TABLE `productos_inventario`
  ADD PRIMARY KEY (`pri_id`);

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
  MODIFY `anr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `banners`
--
ALTER TABLE `banners`
  MODIFY `ban_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `blg_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `cht_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `correo`
--
ALTER TABLE `correo`
  MODIFY `cor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `galeria`
--
ALTER TABLE `galeria`
  MODIFY `gal_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habeas`
--
ALTER TABLE `habeas`
  MODIFY `hab_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pdd_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  MODIFY `pdp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  MODIFY `pqr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prd_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_categorias`
--
ALTER TABLE `productos_categorias`
  MODIFY `pct_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_inventario`
--
ALTER TABLE `productos_inventario`
  MODIFY `pri_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seo`
--
ALTER TABLE `seo`
  MODIFY `seo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `variaciones`
--
ALTER TABLE `variaciones`
  MODIFY `var_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `variaciones_detalles`
--
ALTER TABLE `variaciones_detalles`
  MODIFY `vrd_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_boolean`
--
ALTER TABLE `_boolean`
  MODIFY `boo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `_estados`
--
ALTER TABLE `_estados`
  MODIFY `est_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `_pagos`
--
ALTER TABLE `_pagos`
  MODIFY `pag_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_pagos_estados`
--
ALTER TABLE `_pagos_estados`
  MODIFY `pgs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_productos_estados`
--
ALTER TABLE `_productos_estados`
  MODIFY `prs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_productos_tipos`
--
ALTER TABLE `_productos_tipos`
  MODIFY `prt_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `_recuperar`
--
ALTER TABLE `_recuperar`
  MODIFY `rec_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
