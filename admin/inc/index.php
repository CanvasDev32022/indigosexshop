<?php 
	session_start();
	require '_funciones.php';
	$toolSQL = new toolSQL();
	$tools 	 = new tools();


	$creado = date("Y-m-d H:i:s");
	$hora = date("His");

	if($_POST['action'] == "obtener_valores")
	{
		$prepare = "SELECT ban_id, ban_nombre, ban_numero, ban_monto FROM bancos WHERE ?";
		$params = [1];
		$types = ['i'];
		$banS = $toolSQL->selectSQL($prepare, $types, $params);
		if($banS < 0)
			echo -1;
		else
		{
			$prepare = "SELECT caj_id, caj_nombre, caj_monto FROM cajas WHERE ?";
			$params = [1];
			$types = ['i'];
			$cajS = $toolSQL->selectSQL($prepare, $types, $params);
			if($cajS < 0)
				echo -2;
			else
				echo json_encode($banS)."::".json_encode($cajS);
		}
	}
	elseif($_POST['action'] == "obtener_igresos_egresos")
	{
		$anio = date("Y");
		$fecha_inicial = $anio."-01-01 00:00:00";
		$fecha_final = $anio."-12-31 23:59:00";

		$prepare = "SELECT SUM(mov_valor) AS valores, mov.mtp_id, mtp.mtp_nombre, MONTH(mov_fecha) AS mes FROM movimientos mov INNER JOIN _movimientos_tipos mtp ON(mtp.mtp_id = mov.mtp_id) INNER JOIN centro_costos cco ON(cco.cco_id = mov.cco_id) WHERE cco.cco_codigo <> ? AND mov.borrado_logico = 0 AND mov_fecha BETWEEN '".$fecha_inicial."' AND '".$fecha_final."' GROUP BY mov.mtp_id, MONTH(mov_fecha) ORDER BY mes ASC";
		$params = ['13'];
		$types = ['s'];
		$movS = $toolSQL->selectSQL($prepare, $types, $params);
		if($movS < 0)
			echo -1;
		else
			echo json_encode($movS);
	}
	elseif($_POST['action'] == "obtener_pagos_ccostos")
	{
		$tmp_fecha = explode("::", $_POST['fechas']);
		$fecha_inicial = $tmp_fecha[0];
		$fecha_final = $tmp_fecha[1];

		$prepare = "SELECT SUM(mov_valor) AS valor, cco.cco_nombre FROM movimientos mov INNER JOIN centro_costos cco ON(cco.cco_id = mov.cco_id) WHERE cco.cco_codigo <> ? AND mov.borrado_logico = 0 AND mov_fecha BETWEEN '".$fecha_inicial."' AND '".$fecha_final."' GROUP BY cco.cco_id ORDER BY valor DESC";
		$params = ['13'];
		$types = ['s'];
		$movS = $toolSQL->selectSQL($prepare, $types, $params);
		if($movS < 0)
			echo -1;
		else 
			echo json_encode($movS);
	}
	elseif($_POST['action'] == "obtener_pasivos")
	{
		$anio = date("Y");
		$fecha_inicial = $anio."-01-01 00:00:00";
		$fecha_final = $anio."-12-31 23:59:00";

		$prepare = "SELECT count(1) AS registros, SUM(pas_valor) AS conteo, MONTH(pas_fechapago) AS mes FROM pasivos pas WHERE pas.borrado_logico = ? AND pas_fechapago BETWEEN '".$fecha_inicial."' AND '".$fecha_final."' GROUP BY MONTH(pas_fechapago) ORDER BY mes ASC";
		$params = [0];
		$types = ['i'];
		$pasivos = $toolSQL->selectSQL($prepare, $types, $params);
		if($pasivos < 0)
			echo -1;
		else
		{
			$prepare = "SELECT count(1) AS registros, SUM(pab_valor) AS conteo, MONTH(pab_fechaabono) AS mes FROM pasivos_abonos WHERE ? AND pab_fechaabono BETWEEN '".$fecha_inicial."' AND '".$fecha_final."' GROUP BY MONTH(pab_fechaabono) ORDER BY mes ASC";
			$params = [1];
			$types = ['i'];
			$abonados = $toolSQL->selectSQL($prepare, $types, $params);
			if($abonados < 0)
				echo -2;
			else
			{
				$prepare = "SELECT count(1) AS registros, SUM(pas_valor) AS conteo, MONTH(pas_fechapago) AS mes FROM pasivos pas WHERE pas.borrado_logico = ? AND pas.pgs_id = 2 AND pas_fechapago BETWEEN '".$fecha_inicial."' AND '".$fecha_final."' GROUP BY MONTH(pas_fechapago) ORDER BY mes ASC";
				$params = [1];
				$types = ['i'];
				$pagados = $toolSQL->selectSQL($prepare, $types, $params);
				if($pagados < 0)
					echo -3;
				else
					echo json_encode($pasivos)."::".json_encode($abonados)."::".json_encode($pagados);
			}
		}
	}
?>