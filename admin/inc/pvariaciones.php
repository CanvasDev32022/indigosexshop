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
		$idioma = $_POST['idioma'];
		$prepare = "SELECT prv_id, prv.var_id, var.var_nombre, var.var_tipo, vrd_ids FROM productos_variaciones prv INNER JOIN variaciones var ON(var.var_id = prv.var_id) WHERE prd_id = ? AND prv_borrado = 0 ORDER BY var.var_nombre ASC";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prvS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prvS < 0)
			echo -1;
		else
		{
			if($prvS == 0) {
				echo "0::0::".$_SESSION['adm_rol'];
			} else {

				$prepare = "SELECT vrd_id, var_id, vrd_nombre, vrd_color FROM variaciones_detalles WHERE ? ORDER BY var_id ASC";
				$params = [1];
				$types = ['i'];
				$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
				if($vrdS < 0)
					echo -2;
				else
					echo json_encode($prvS)."::".json_encode($vrdS)."::".$_SESSION['adm_rol'];

			}
		}
	}
	elseif($_POST['action'] == "obtener_crear")
	{
		$prepare = "SELECT var_id, var_nombre FROM variaciones WHERE ? ORDER BY var_nombre ASC";
		$params = [1];
		$types = ['i'];
		$varS = $toolSQL->selectSQL($prepare, $types, $params);
		if($varS < 0) {
			echo -1;
		} else {

			$prepare = "SELECT vrd_id, var_id, vrd_nombre FROM variaciones_detalles WHERE ? ORDER BY vrd_nombre ASC";
			$params = [1];
			$types = ['i'];
			$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
			if($vrdS < 0) {
				 echo -2;

			} else {
				echo json_encode($varS)."::".json_encode($vrdS);
			}
		}			
	}
	elseif($_POST['action'] == "crear")
	{
		$vrd_ids = implode(",", $_POST['vrd_id']);
		$prepare = "INSERT INTO productos_variaciones (prd_id, var_id, vrd_ids, prv_creado) VALUES (?,?,?,?)";
		$params = [
			intval($_POST['prd_id']),
			intval($_POST['var_id']),
			$vrd_ids,
			$creado
		];
		$types = ['i','i','s','s'];
		$prvI = $toolSQL->insertSQL($prepare, $types, $params);
		echo $prvI;
	}
	elseif($_POST['action'] == "editar")
	{
		$vrd_ids = implode(",", $_POST['vrd_id']);
		$prepare = "UPDATE productos_variaciones SET var_id = ?, vrd_ids = ? WHERE prv_id = ?";
		$params = [
			intval($_POST['var_id']),
			$vrd_ids,
			intval($_POST['prv_id'])
		];
		$types = ['i','s','i'];
		$prvU = $toolSQL->updateSQL($prepare, $types, $params);
		echo $prvU;
	}
	elseif($_POST['action'] == "obtener_editar")
	{
		$prepare = "SELECT prv_id, var_id, vrd_ids FROM productos_variaciones WHERE prv_id = ?";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prvS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prvS <= 0)
			echo -1;
		else
		{
			$prepare = "SELECT var_id, var_nombre FROM variaciones WHERE ? ORDER BY var_nombre ASC";
			$params = [1];
			$types = ['i'];
			$varS = $toolSQL->selectSQL($prepare, $types, $params);
			if($varS < 0) {
				echo -2;
			} else {

				$var_id = $prvS[0]['var_id'];
				$prepare = "SELECT vrd_id, var_id, vrd_nombre FROM variaciones_detalles WHERE var_id = ? ORDER BY vrd_nombre ASC";
				$params = [intval($var_id)];
				$types = ['i'];
				$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
				if($vrdS < 0) {
					 echo -3;

				} else {
					echo json_encode($prvS)."::".json_encode($varS)."::".json_encode($vrdS);
				}
			}
		}
	}
	elseif($_POST['action'] == "eliminar")
	{
		$prepare = "UPDATE productos_variaciones SET prv_borrado = 1 WHERE prv_id = ?";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prvU = $toolSQL->updateSQL($prepare, $types, $params);
		echo $prvU;
	}
?>