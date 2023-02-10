<?php 
	session_start();
	require("_funciones.php");
	$toolSQL = new toolSQL();
	$tools = new tools();
	$sesion = new session();
	$sesion->obtenerCredenciales();

	$creado = date("Y-m-d H:i:s");
	$hora = date("His");

	if($_POST['action'] == "lista")
	{
		echo "0::".$_SESSION['adm_rol'];
	}
	elseif($_POST['action'] == "obtener_crear")
	{
		$prepare = "SELECT pct_id, pct_nombre FROM productos_categorias WHERE ?";
		$params = [1];
		$types = ['i'];
		$pctS = $toolSQL->selectSQL($prepare, $types, $params);
		if($pctS < 0)
			echo -1;
		else
			echo json_encode($pctS);
	}
	elseif($_POST['action'] == "crear")
	{
		print_r($_POST);
	}

?>