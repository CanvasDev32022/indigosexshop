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
		$idioma 	= $_POST['idioma'];
		$busqueda 	= $_POST['busqueda'];
		$pagina 	= $_POST['pagina'];
		$max 		= $cms_max_results['general'];
		$busqueda = "%".$busqueda."%";

		$prepare 	= "SELECT COUNT(1) AS registros FROM productos prd INNER JOIN _productos_estados prs ON prs.prs_id = prd.prs_id INNER JOIN _boolean boo ON(boo.boo_id = prd.prd_visible) WHERE prd_borrado = 0 AND prd_padre = 0 AND (prd_nombre LIKE ? OR boo.boo_nombre_$idioma LIKE ? OR prd_precio LIKE ? OR prd_promocion LIKE ?)";
		$params 	= [$busqueda, $busqueda, $busqueda, $busqueda];
		$types 		= ['s','s','s','s'];
		$prdS 		= $toolSQL->selectSQL($prepare, $types, $params);
		// print_r($prepare);
		if($prdS < 0)
			echo -1;
		else
		{
			$registros = $prdS[0]['registros'];
			if($registros == 0)
				echo "0::".$_SESSION['adm_rol'];
			else
			{
				//calculamos el número de páginas
				$paginas = ceil($registros / $max);
				//Ajustamos la página actual en caso de que no exista
				if($pagina > $paginas)
					$pagina = $paginas;
				//Calculamos el rango inferior de registros a traer
				$inferior = $max * ($pagina - 1);
				//Consulta de Búsqueda
				$prepare 	= "SELECT prd_id, prd_imagen, prd_nombre, prd_precio, prd_promocion, prd_preciopromocion, prs.prs_nombre, prd_visible, prd_destacado FROM productos prd INNER JOIN _productos_estados prs ON prs.prs_id = prd.prs_id INNER JOIN _boolean boo ON(boo.boo_id = prd.prd_visible) WHERE prd_borrado = 0 AND prd_padre = 0 AND (prd_nombre LIKE ? OR boo.boo_nombre_$idioma LIKE ? OR prd_precio LIKE ? OR prd_promocion LIKE ?) ORDER BY prd_nombre ASC LIMIT $inferior, $max";
				$params 	= [$busqueda, $busqueda, $busqueda, $busqueda];
				$types 		= ['s','s','s','s'];
				$prdS 		= $toolSQL->selectSQL($prepare, $types, $params);
				// print_r($prdS);
				if($prdS < 0)
					echo -2;
				 else
					echo json_encode($prdS)."::".$paginas."::".$pagina."::".$registros."::".$_SESSION['adm_rol'];
			}
		}
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
		{
			$prepare = "SELECT prd_id, prd_nombre FROM productos WHERE ?";
			$params = [1];
			$types = ['i'];
			$prdS = $toolSQL->selectSQL($prepare, $types, $params);
			if($prdS < 0) 
				echo -2;
			else
				echo json_encode($pctS)."::".json_encode($prdS);
		}
	}
	elseif($_POST['action'] == "crear")
	{
		$ruta = "../../uploads/productos/";
		$ruta_tmp = "../../uploads/archivos/";
		if($_POST['archivos_input-0'] != "") {

			$archivos = explode(";;", $_POST['archivos_input-0']);
			foreach ($archivos as $key => $arc) {
				$archivo = explode("||", $arc);
				$webp = explode(".", $archivo[1]);
				rename($ruta_tmp.$archivo[1], $ruta.$archivo[1]);	
				rename($ruta_tmp.$webp[0].".webp", $ruta.$webp[0].".webp");	
			}
		}

		$categorias = [];
		for ($i=0; $i < count($_POST['pct_id']); $i++) { 
			
			if(!intval($_POST['pct_id'][$i])) {
				
				$prepare = "INSERT INTO productos_categorias (pct_nombre, pct_creado) VALUES (?,?)";
				$params = [
					$_POST['pct_id'][$i],
					$creado
				];
				$types = ['s','s'];
				$pctI = $toolSQL->insertSQL($prepare, $types, $params);
				if($pctI < 0) {
					echo -1;
					exit;
				}

			} else {
				array_push($categorias, $_POST['pct_id'][$i]);
			}
		}

		$prepare = "SELECT pct_id FROM productos_categorias WHERE pct_creado = ?";
		$params = [$creado];
		$types = ['s'];
		$pctS = $toolSQL->selectSQL($prepare, $types, $params);
		if($pctS < 0) {
			echo -1;
		} else {

			if($pctS > 0) {
				for ($i=0; $i < count($pctS); $i++) { 
					array_push($categorias, $pctS[$i]['pct_id']);
				}
			}

			$categorias = implode(",", $categorias);
			
			// TODO: Imagen SEO 1200
			if($_FILES['prd_metaimagena']['type'] != "") {

				$prd_metaimagena = "";
				$tmp_extension = mime_content_type($_FILES['prd_metaimagena']['tmp_name']);
				$extension = explode("/", $tmp_extension)[1];
				$nombre = $tools->getCode(20).$hora;
				$prd_metaimagena = $nombre.".".$extension;
				move_uploaded_file($_FILES['prd_metaimagena']['tmp_name'], $ruta.$prd_metaimagena);

				// TODO: Verificamos que la imagen no supere el tamaño máximo
				$size = getimagesize($ruta.$prd_metaimagena);
				if($size > $cms_image_width['imagenc']['imagen'])
					// TODO: Redimensionamos la imagen y generamos el imagen
					$tools->imageResize($ruta, $prd_metaimagena, $cms_image_width['imagenc']['imagen']);
				else
					// TODO: Creamos la imagen WEBP
					$tools->img2webp($prd_metaimagena, $nombre.".webp");

			} else {
				$prd_metaimagena = "";
			}

			// TODO: Imagen SEO 200
			if($_FILES['prd_metaimagenb']['type'] != "") {

				$prd_metaimagenb = "";
				$tmp_extension = mime_content_type($_FILES['prd_metaimagenb']['tmp_name']);
				$extension = explode("/", $tmp_extension)[1];
				$nombre = $tools->getCode(20).$hora;
				$prd_metaimagenb = $nombre.".".$extension;
				move_uploaded_file($_FILES['prd_metaimagenb']['tmp_name'], $ruta.$prd_metaimagenb);

				// TODO: Verificamos que la imagen no supere el tamaño máximo
				$size = getimagesize($ruta.$prd_metaimagenb);
				if($size > $cms_image_width['imagend']['imagen'])
					// TODO: Redimensionamos la imagen y generamos el imagen
					$tools->imageResize($ruta, $prd_metaimagenb, $cms_image_width['imagend']['imagen']);
				else
					// TODO: Creamos la imagen WEBP
					$tools->img2webp($prd_metaimagenb, $nombre.".webp");

			} else {
				$prd_metaimagenb = "";
			}

			$prd_visible = isset($_POST['prd_mostrar']) ? 1 : 0;
			$prd_precio = $tools->desajustar_valor($_POST['prd_precio']);
			$prd_destacado = isset($_POST['prd_destacado']) ? 1 : 0;
			$prd_nuevo = isset($_POST['prd_nuevo']) ? 1 : 0;
			$prd_vendido = isset($_POST['prd_vendido']) ? 1 : 0;
			$prd_relacionado = isset($_POST['prd_relacionado']) ? implode(",", $_POST['prd_relacionado']) : "";
			$prd_metakeywords = trim($_POST['prd_metakeywords'], ", ");
			$prd_oferta = isset($_POST['prd_oferta']) ? 1 : 0;
			$prd_porcentajepromocion = isset($_POST['prd_porcentajepromocion']) ? $tools->desajustar_valor($_POST['prd_porcentajepromocion']) : 0;
			$prd_preciopromocion = isset($_POST['prd_preciopromocion']) ? $tools->desajustar_valor($_POST['prd_preciopromocion']) : 0;

			$prepare = "
				INSERT INTO productos (prd_imagen, prd_nombre, prd_descripcion_corta, prd_descripcion_larga, prt_id, prd_visible, pct_ids, prd_precio, prd_promocion, prd_porcentajepromocion, prd_preciopromocion, prs_id, prd_destacado, prd_nuevo, prd_vendido, prd_referencia, prd_padre, prd_relacionado, prd_metatitulo, prd_metadescripcion, prd_metakeywords, prd_metaimagenc, prd_metaimagend, prd_creado)
				VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			$params = [
				$_POST['archivos_input-0'],
				$_POST['prd_nombre'],
				$_POST['prd_descripcioncorta'],
				$_POST['prd_descripcionlarga'],
				intval(1),
				intval($prd_visible),
				$categorias,
				doubleval($prd_precio),
				intval($prd_oferta),
				doubleval($prd_porcentajepromocion),
				doubleval($prd_preciopromocion),
				intval(1),
				intval($prd_destacado),
				intval($prd_nuevo),
				intval($prd_vendido),
				$_POST['prd_referencia'],
				intval(0),
				$prd_relacionado,
				$_POST['prd_metatitulo'],
				$_POST['prd_metadescripcion'],
				$prd_metakeywords,
				$prd_metaimagena,
				$prd_metaimagenb,
				$creado
			];
			$types = ['s','s','s','s','i','i','s','d','i','d','d','i','i','i','i','s','i','s','s','s','s','s','s','s'];
			$prdI = $toolSQL->insertSQL($prepare, $types, $params);
			echo $prdI;
		}
	}
	elseif($_POST['action'] == "obtener_editar")
	{
		$prepare = "SELECT prd_id, prd_imagen, prd_nombre, prd_descripcion_corta, prd_descripcion_larga, prt_id, prd_visible, pct_ids, prd_precio, prd_promocion, prd_porcentajepromocion, prd_preciopromocion, prs_id, prd_destacado, prd_nuevo, prd_vendido, prd_referencia, prd_padre, prd_relacionado, prd_metatitulo, prd_metadescripcion, prd_metakeywords, prd_metaimagenc, prd_metaimagend FROM productos WHERE prd_id = ?";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prdS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prdS <= 0)
			echo -1;
		else
		{
			$prepare = "SELECT pct_id, pct_nombre FROM productos_categorias WHERE ?";
			$params = [1];
			$types = ['i'];
			$pctS = $toolSQL->selectSQL($prepare, $types, $params);
			if($pctS < 0)
				echo -2;
			else 
			{
				$prepare = "SELECT prd_id, prd_nombre FROM productos WHERE prd_id <> ?";
				$params = [intval($_POST['id'])];
				$types = ['i'];
				$relS = $toolSQL->selectSQL($prepare, $types, $params);
				if($relS < 0) 
					echo -3;
				else
					echo json_encode($prdS)."::".json_encode($pctS)."::".json_encode($relS);
			}
		}
	}
	elseif($_POST['action'] == "editar")
	{
		$ruta = "../../uploads/productos/";
		$ruta_tmp = "../../uploads/archivos/";
		$prepare = "SELECT prd_id, prd_imagen, prd_metaimagenc, prd_metaimagend FROM productos WHERE prd_id = ?";
		$params = [intval($_POST['prd_id'])];
		$types = ['i'];
		$prdS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prdS <= 0) 
			echo -1;
		else 
		{
			// TODO: Creamos las Categorias
			$categorias = [];
			for ($i=0; $i < count($_POST['pct_id']); $i++) { 
				
				if(!intval($_POST['pct_id'][$i])) {
					
					$prepare = "INSERT INTO productos_categorias (pct_nombre, pct_creado) VALUES (?,?)";
					$params = [
						$_POST['pct_id'][$i],
						$creado
					];
					$types = ['s','s'];
					$pctI = $toolSQL->insertSQL($prepare, $types, $params);
					if($pctI < 0) {
						echo -1;
						exit;
					}

				} else {
					array_push($categorias, $_POST['pct_id'][$i]);
				}
			}

			$prepare = "SELECT pct_id FROM productos_categorias WHERE pct_creado = ?";
			$params = [$creado];
			$types = ['s'];
			$pctS = $toolSQL->selectSQL($prepare, $types, $params);
			if($pctS < 0) {
				echo -1;
			} else {

				if($pctS > 0) {
					for ($i=0; $i < count($pctS); $i++) { 
						array_push($categorias, $pctS[$i]['pct_id']);
					}
				}

				// TODO: Unimos las categorias
				$categorias = implode(",", $categorias);
				// TODO: ARCHIVOS DE IMAGEN 
				$archivosFRONT 	= $_POST['archivos_input-0'] 	!= "" 	? explode(";;", $_POST['archivos_input-0']) : [];
				$archivosDB 	= $prdS[0]['prd_imagen'] 	!= ""	? explode(";;", $prdS[0]['prd_imagen']) : [];
					
				$archivosMOVE = [];
				$archivosDEL = [];

				// TODO: VERIFICACION DE IMAGEN(ES)
				if(count($archivosFRONT) > 0) {

					if(count($archivosDB) > 0) {

						foreach ($archivosFRONT as $keyF => $archivoF) {
							
							$index = array_search($archivoF, $archivosDB);
							if($index === false) {
								array_push($archivosMOVE, $archivoF);
							}
						}

						foreach ($archivosDB as $keyD => $archivoD) {

							$index = array_search($archivoD, $archivosFRONT);
							if($index === false) {
								array_push($archivosDEL, $archivoD);
							}
						}

					} else {
						$archivosMOVE = $archivosFRONT;
					}

				} else {
					$archivosDEL = $archivosDB;
				}

				if(count($archivosMOVE) > 0) {

					// TODO: MOVEMOS LOS ARCHIVOS
					foreach ($archivosMOVE as $arcM) {
						$mover = explode("||", $arcM);
						$webp = explode(".", $mover[1]);
						rename($ruta_temp.$mover[1], $ruta.$mover[1]);
						rename($ruta_temp.$webp[0].".webp", $ruta.$webp[0].".webp");
					}
				}

				if(count($archivosDEL) > 0) {

					// TODO: ELIMINARMOS LOS ARCHIVOS
					foreach ($archivosDEL as $arcD) {
						$eliminar = explode("||", $arcD);
						$webp = explode(".", $eliminar[1]);
						unlink($ruta.$eliminar[1]);
						unlink($ruta.$webp[0].".webp");
					}
				}

				// TODO: Imagen SEO 1200
				if($_FILES['prd_metaimagena']['type'] == "")
				{
					// Verifico si se eliminó la imagen
					if($_POST['prd_metaimagenaC'] == "")
					{
						if($prdS[0]['prd_metaimagenc'] != "")
						{
							$webp = explode(".", $prdS[0]['prd_metaimagenc']);
							unlink($ruta.$prdS[0]['prd_metaimagenc']);
							unlink($ruta.$webp[0].".webp");
						}
						
						$prd_metaimagena = "";
					}
					else
						$prd_metaimagena = $prdS[0]['prd_metaimagenc'];
				}
				else
				{
					// Si existía imagen la elimino
					if($prdS[0]['prd_metaimagenc'] != "") {

						$webp = explode(".", $prdS[0]['prd_metaimagenc']);
						unlink($ruta.$prdS[0]['prd_metaimagenc']);
						unlink($ruta.$webp[0].".webp");
					}

					$prd_metaimagena = "";
					$tmp_extension = mime_content_type($_FILES['prd_metaimagena']['tmp_name']);
					$extension = explode("/", $tmp_extension)[1];
					$nombre = $tools->getCode(20).$hora;
					$prd_metaimagena = $nombre.".".$extension;
					move_uploaded_file($_FILES['prd_metaimagena']['tmp_name'], $ruta.$prd_metaimagena);

					// TODO: Verificamos que la imagen no supere el tamaño máximo
					$size = getimagesize($ruta.$prd_metaimagena);
					if($size > $cms_image_width['imagenc']['imagen'])
						// TODO: Redimensionamos la imagen y generamos el imagen
						$tools->imageResize($ruta, $prd_metaimagena, $cms_image_width['imagenc']['imagen']);
					else
						// TODO: Creamos la imagen WEBP
						$tools->img2webp($prd_metaimagena, $nombre.".webp");
				}

				// TODO: Imagen SEO 200
				if($_FILES['prd_metaimagenb']['type'] == "")
				{
					// Verifico si se eliminó la imagen
					if($_POST['prd_metaimagenbC'] == "")
					{
						if($prdS[0]['prd_metaimagend'] != "")
						{
							$webp = explode(".", $prdS[0]['prd_metaimagend']);
							unlink($ruta.$prdS[0]['prd_metaimagend']);
							unlink($ruta.$webp[0].".webp");
						}
						
						$prd_metaimagenb = "";
					}
					else
						$prd_metaimagenb = $prdS[0]['prd_metaimagend'];
				}
				else
				{
					// Si existía imagen la elimino
					if($prdS[0]['prd_metaimagend'] != "") {

						$webp = explode(".", $prdS[0]['prd_metaimagend']);
						unlink($ruta.$prdS[0]['prd_metaimagend']);
						unlink($ruta.$webp[0].".webp");
					}
					
					$prd_metaimagenb = "";
					$tmp_extension = mime_content_type($_FILES['prd_metaimagenb']['tmp_name']);
					$extension = explode("/", $tmp_extension)[1];
					$nombre = $tools->getCode(20).$hora;
					$prd_metaimagenb = $nombre.".".$extension;
					move_uploaded_file($_FILES['prd_metaimagenb']['tmp_name'], $ruta.$prd_metaimagenb);

					// TODO: Verificamos que la imagen no supere el tamaño máximo
					$size = getimagesize($ruta.$prd_metaimagenb);
					if($size > $cms_image_width['imagend']['imagen'])
						// TODO: Redimensionamos la imagen y generamos el imagen
						$tools->imageResize($ruta, $prd_metaimagenb, $cms_image_width['imagend']['imagen']);
					else
						// TODO: Creamos la imagen WEBP
						$tools->img2webp($prd_metaimagenb, $nombre.".webp");
				}

				$prd_visible = isset($_POST['prd_mostrar']) ? 1 : 0;
				$prd_precio = $tools->desajustar_valor($_POST['prd_precio']);
				$prd_destacado = isset($_POST['prd_destacado']) ? 1 : 0;
				$prd_nuevo = isset($_POST['prd_nuevo']) ? 1 : 0;
				$prd_vendido = isset($_POST['prd_vendido']) ? 1 : 0;
				$prd_relacionado = isset($_POST['prd_relacionado']) ? implode(",", $_POST['prd_relacionado']) : "";
				$prd_metakeywords = trim($_POST['prd_metakeywords'], ", ");
				$prd_oferta = isset($_POST['prd_oferta']) ? 1 : 0;
				$prd_porcentajepromocion = isset($_POST['prd_porcentajepromocion']) ? $tools->desajustar_valor($_POST['prd_porcentajepromocion']) : 0;
				$prd_preciopromocion = isset($_POST['prd_preciopromocion']) ? $tools->desajustar_valor($_POST['prd_preciopromocion']) : 0;

				$prepare = "
					UPDATE productos SET prd_imagen = ?, prd_nombre = ?, prd_descripcion_corta = ?, prd_descripcion_larga = ?, prt_id = ?, prd_visible = ?, pct_ids = ?, prd_precio = ?, prd_promocion = ?, prd_porcentajepromocion = ?, prd_preciopromocion = ?, prs_id = ?, prd_destacado = ?, prd_nuevo = ?, prd_vendido = ?, prd_referencia = ?, prd_padre = ?, prd_relacionado = ?, prd_metatitulo = ?, prd_metadescripcion = ?, prd_metakeywords = ?, prd_metaimagenc = ?, prd_metaimagend = ?
					WHERE prd_id = ?";
				$params = [
					$_POST['archivos_input-0'],
					$_POST['prd_nombre'],
					$_POST['prd_descripcioncorta'],
					$_POST['prd_descripcionlarga'],
					intval(1),
					intval($prd_visible),
					$categorias,
					doubleval($prd_precio),
					intval($prd_oferta),
					doubleval($prd_porcentajepromocion),
					doubleval($prd_preciopromocion),
					intval(1),
					intval($prd_destacado),
					intval($prd_nuevo),
					intval($prd_vendido),
					$_POST['prd_referencia'],
					intval(0),
					$prd_relacionado,
					$_POST['prd_metatitulo'],
					$_POST['prd_metadescripcion'],
					$prd_metakeywords,
					$prd_metaimagena,
					$prd_metaimagenb,
					intval($_POST['prd_id'])
				];
				$types = ['s','s','s','s','i','i','s','d','i','d','d','i','i','i','i','s','i','s','s','s','s','s','s','i'];
				$prdU = $toolSQL->updateSQL($prepare, $types, $params);
				echo $prdU;

			}
		}
	}
	elseif($_POST['action'] == "mostrar")
	{
		$activo = $_POST['activo'];
		$prepare = "UPDATE productos SET prd_visible = $activo WHERE prd_id = ?";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prdU = $toolSQL->updateSQL($prepare, $types, $params);
		echo $prdU;
	}
	elseif($_POST['action'] == "destacado")
	{
		$activo = $_POST['activo'];
		$prepare = "UPDATE productos SET prd_destacado = $activo WHERE prd_id = ?";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prdU = $toolSQL->updateSQL($prepare, $types, $params);
		echo $prdU;
	}
	elseif($_POST['action'] == "eliminar")
	{
		$prepare = "UPDATE productos SET prd_borrado = 1 WHERE prd_id = ?";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prdU = $toolSQL->updateSQL($prepare, $types, $params);
		echo $prdU;
	}
?>