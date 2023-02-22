<?php
	session_start();
	require("_funciones.php");
	$toolSQL = new toolSQL();
	$tools   = new tools();

	$creado = date("Y-m-d H:i:s");
	$hora = date("His");


	if($_POST['action'] == "vdetalles")
	{
		$prepare = "SELECT vrd_id, var_id, vrd_nombre, vrd_color FROM variaciones_detalles WHERE var_id = ? AND vrd_borrado = 0";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
		if($vrdS < 0)
			echo -2;
		else
			echo json_encode($vrdS);
	}
?>