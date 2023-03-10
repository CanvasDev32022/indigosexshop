<?php
	include('inc/_vars.php');
	include('inc/_funciones.php');
	include('inc/_accesos.php');

	$tools = new tools();
	$usr_rol = $_SESSION['adm_rol'];
	$roles = explode(",", $cms_seccion[$index]['acceso']);

	if($cms_seccion[$index]['buscar'])
	{
		if(count($cms_url) > 1)
		{
			$variables = explode("&", $cms_url[1]);
			// Verificamos si la variables es Búsqueda
			if(count($variables) > 0)
			{
				$value = explode("=", $variables[0]);
				if($value[0] == "s")
					$cms_busqueda = $value[1];
				if(count($variables) > 1)
				{
					// Verificamos si la variables es Búsqueda
					$value = explode("=", $variables[1]);
					if($value[0] == "p")
						$cms_pagina = $value[1]; 
				}
			}
		}
	}

?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<title><?php echo ucfirst($cms_seccion[$index]['nombre'])." - ".SITENAME ?></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
		<link href="css/materialize.min.css" rel="stylesheet" type="text/css"/>
		<link href="css/_componentes.css?0.0.0" rel="stylesheet" type="text/css"/>
		<link href="css/selectize.css?0.0.0" rel="stylesheet" type="text/css"/>
		<link href="css/_helpers.css?0.0.0" rel="stylesheet" type="text/css"/>
		<link href="css/_app.css?0.0.0" rel="stylesheet" type="text/css"/>
		<link href="css/dropify.min.css" rel="stylesheet" type="text/css"/>
		<link href="css/daterangepicker.css" rel="stylesheet" type="text/css"/>
		<!-- TODO: FUENTES -->
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
		<!-- TODO: FAVICON -->
		<link rel="icon" type="image/svg+xml" href="img/home/favicon.svg">
        <link rel="icon" type="image/png" href="img/home/favicon.png">

		<meta name="robots" content="noindex">
		<meta name="googlebot" content="noindex">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<link rel="shortcut icon" sizes="196x196" href="img/app.png">
		<script src="https://www.gstatic.com/charts/loader.js"></script>
		<link rel="stylesheet" type="text/css" href="css/spectrum.css">
	</head>
<body class="dark">
	<div id="lng" data="<?php echo $_SESSION['idioma'] ?>"></div>
	<header class="page-topbar" id="header">
		<div class="navbar navbar-fixed">
			<nav class="navbar-main navbar-color nav-collapsible navbar-light nav-expanded sideNav-lock">
				<div class="nav-wrapper">
<?php if($cms_seccion[$index]['buscar']): ?>
					<div class="header-search-wrapper hide-on-med-and-down c"><i class="material-icons">search</i>
						<input class="header-search-input" type="search" id="search" placeholder="<?php echo 'Buscar'." ".$cms_seccion[$index]['nombre']?>... Presiona ENTER" autofocus value="<?php echo $cms_busqueda ?>" onkeyup="buscar(<?php echo "'".$cms_seccion[$index]['slug']."'" ?>, 'search')">
					</div>
<?php endif; ?>
					<ul class="navbar-list right">
						
						<li class="hide-on-med-and-down"><a class="waves-effect waves-block waves-light" id="fullscreen" title="Pantalla completa" ><i class="material-icons">settings_overscan</i></a></li>
<?php if($cms_seccion[$index]['buscar']): ?>
						<li class="hide-on-large-only search-input-wrapper"><a class="waves-effect waves-block waves-light search-button" id="search-btn" ><i class="material-icons">search</i></a></li>
<?php endif; ?>
						<li><a class="dropdown-trigger waves-effect waves-block waves-light profile-button"  data-target="profile-dropdown">
							<i class="material-icons left">person_outline</i><span class="hide-on-med-and-down">Hola! <b><?php echo $_SESSION['adm_nombre'] ?></b></span>
						</a></li>
					</ul>
					
					<!-- Perfil -->
					<ul class="dropdown-content" id="profile-dropdown">
						<li><a id="usuario-logout"><i class="material-icons">keyboard_tab</i>Cerrar sesión</a></li>
					</ul>
				</div>
<?php if($cms_seccion[$index]['buscar']): ?>
				<nav class="display-none search-sm" style="display: none" id="search-ctn">
					<div class="nav-wrapper">
						<div class="input-field search-input-sm">
							<input type="search" id="msearch" placeholder="<?php echo 'Buscar'." ".$cms_seccion[$index]['nombre']?>... Presiona ENTER" value="<?php echo $cms_busqueda ?>" onkeyup="buscar(<?php echo "'".$cms_seccion[$index]['slug']."'" ?>, 'msearch')">
							<label class="label-icon" for="search">
								<i class="material-icons search-sm-icon">search</i>
							</label>
							<i class="material-icons search-sm-close" id="search-close">close</i>
						</div>
					</div>
				</nav>
<?php endif; ?>
			</nav>
		</div>
<?php if($cms_seccion[$index]['buscar']): ?>
				<nav class="display-none search-sm" style="display: none" id="search-ctn">
					<div class="nav-wrapper">
						<div class="input-field search-input-sm">
							<input class="header-search-input" type="search" id="search" placeholder="<?php echo 'Buscar'." ".$cms_seccion[$index]['nombre']?>... Presiona ENTER" autofocus value="<?php echo $cms_busqueda ?>" onkeyup="buscar(<?php echo "'".$cms_seccion[$index]['slug']."'" ?>, 'search')">
							<label class="label-icon" for="search"> 
								<i class="material-icons search-sm-icon">search</i>
							</label>
							<i class="material-icons search-sm-close" id="search-close">close</i>
						</div>
					</div>
				</nav>
<?php endif; ?>
			</nav>
		</div>
	</header>
	