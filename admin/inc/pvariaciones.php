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
		$prepare = "SELECT COUNT(1) AS conteo FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0";
		$params = [intval($_POST['id'])];
		$types = ['i'];
		$prdS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prdS < 0) {
			echo -1;
		} else {

			$prepare = "SELECT prd_id, prv_id, prv.var_id, var.var_nombre, var.var_tipo, vrd_ids FROM productos_variaciones prv INNER JOIN variaciones var ON(var.var_id = prv.var_id) WHERE prd_id = ? AND prv_borrado = 0 ORDER BY var.var_nombre ASC";
			$params = [intval($_POST['id'])];
			$types = ['i'];
			$prvS = $toolSQL->selectSQL($prepare, $types, $params);
			if($prvS < 0)
				echo -1;
			else
			{
				if($prvS == 0) {
					echo "0::0::0::".$_SESSION['adm_rol'];
				} else {

					$prepare = "SELECT vrd_id, var_id, vrd_nombre, vrd_color FROM variaciones_detalles WHERE ? ORDER BY var_id ASC";
					$params = [1];
					$types = ['i'];
					$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
					if($vrdS < 0) {
						echo -2;
					} else {
						echo json_encode($prvS)."::".json_encode($vrdS)."::".json_encode($prdS)."::".$_SESSION['adm_rol'];
					}
				}
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
		if($prvI < 0) {
			echo -1;
		} else {
			
			$prepare = "SELECT COUNT(prd.vrd_ids) AS conteo, prd_precio, pri.pri_inventario FROM productos prd INNER JOIN productos_inventario pri ON(pri.prd_id = prd.prd_id) WHERE prd.prd_id = ? AND pri.vrd_ids <> 0";
			$params = [intval($_POST['prd_id'])];
			$types = ['i'];
			$prdS = $toolSQL->selectSQL($prepare, $types, $params);
			if($prdS < 0) {
				echo -2;
			} else {

				$registros = $prdS[0]['conteo'];
				if($registros == 0) {
					echo $prvI;
				} else {

					$prepare = "SELECT var_id, vrd_ids FROM productos_variaciones WHERE prd_id = ? AND prv_borrado = 0 ORDER BY prv_id ASC";
					$params = [intval($_POST['prd_id'])];
					$types = ['i'];
					$prvS = $toolSQL->selectSQL($prepare, $types, $params);
					if($prvS < 0) {
						echo -1;
					} else {

						$variacionesPadre = [];
						$combinaciones = [];
						$combinacionesTMP = [];

						foreach ($prvS as $keyP => $variacion) {

							$opciones = explode(",", $variacion['vrd_ids']);
							if(count($combinacionesTMP) == 0) {
								
								$index = array_search(intval($variacion['var_id']), $variacionesPadre);
								if($index === false) {
									array_push($variacionesPadre, intval($variacion['var_id']));
								}

								foreach($opciones as $keyO => $detalle) {
									array_push($combinaciones, $detalle);
								}
								$combinacionesTMP = $combinaciones;

							} else {
								
								$index = array_search(intval($variacion['var_id']), $variacionesPadre);
								if($index === false) {
									array_push($variacionesPadre, intval($variacion['var_id']));
								}

								$combinaciones = [];

								foreach ($combinacionesTMP as $keyC => $comb) {
									foreach($opciones as $keyO => $detalle) {
										array_push($combinaciones, $comb.",".$detalle);
									}
								}

								if(count($combinaciones) > 0) {
									$combinacionesTMP = $combinaciones;
								}
							}
						};

						$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
						$params = [intval($_POST['prd_id'])];
						$types = ['i'];
						$priS = $toolSQL->selectSQL($prepare, $types, $params);
						if($priS < 0) {
							echo -1;
						} else {

							$cantidadInventario = $prdS[0]['pri_inventario'];
							$variacionesDB = [];
							foreach($combinaciones as $keyC => $combinacion) {

								$estado = "INSERT";
								foreach($priS as $inventario) {

									if($combinacion == $inventario['vrd_ids']) {
										$estado = "UPDATE";
									}
								}
								
								if($estado == "INSERT") {

									$prepare = "INSERT INTO productos_inventario (prd_id, vrd_ids, pri_inventario, pri_preciodiferencia, pri_visible, pri_creado) VALUES (?,?,?,?,?,?)";
									$params = [
										intval($_POST['prd_id']),
										$combinacion,
										intval($cantidadInventario),
										doubleval(0),
										intval(1),
										$creado
									];
									$types = ['i','s','i','d','i','s'];
									$priI = $toolSQL->insertSQL($prepare, $types, $params);
									if($priI < 0) {
										echo -3;
										exit;
									}
								}
							} 

							$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
							$params = [intval($_POST['prd_id'])];
							$types = ['i'];
							$priS = $toolSQL->selectSQL($prepare, $types, $params);
							if($priS < 0) {
								echo -1;
							} else {

								foreach ($priS as $keyI => $inventario) {
									
									$indexI = array_search($inventario['vrd_ids'], $combinaciones);
									if($indexI === false) {
										
										$prepare = "DELETE FROM productos_inventario WHERE pri_id = ?";
										$params = [intval($inventario['pri_id'])];
										$types = ['i'];
										$priD = $toolSQL->deleteSQl($prepare, $types, $params);
										if($priD < 0) {
											echo -4;
											exit;
										}
									}
								}

							}
							echo 2;
						}
					}
				}
			}
		}
	}
	elseif($_POST['action'] == "obtener_editar")
	{
		$prepare = "SELECT prd_id, prv_id, var_id, vrd_ids FROM productos_variaciones WHERE prv_id = ?";
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
		if($prvU < 0) {
			echo -1;
		} else {

			$prepare = "SELECT COUNT(prd.vrd_ids) AS conteo, prd_precio, pri.pri_inventario FROM productos prd INNER JOIN productos_inventario pri ON(pri.prd_id = prd.prd_id) WHERE prd.prd_id = ? AND pri.vrd_ids <> 0";
			$params = [intval($_POST['prd_id'])];
			$types = ['i'];
			$prdS = $toolSQL->selectSQL($prepare, $types, $params);
			if($prdS < 0) {
				echo -2;
			} else {

				$registros = $prdS[0]['conteo'];
				if($registros == 0) {
					echo $prvU;
				} else {

					$prepare = "SELECT var_id, vrd_ids FROM productos_variaciones WHERE prd_id = ? AND prv_borrado = 0 ORDER BY prv_id ASC";
					$params = [intval($_POST['prd_id'])];
					$types = ['i'];
					$prvS = $toolSQL->selectSQL($prepare, $types, $params);
					if($prvS < 0) {
						echo -1;
					} else {

						$variacionesPadre = [];
						$combinaciones = [];
						$combinacionesTMP = [];

						foreach ($prvS as $keyP => $variacion) {

							$opciones = explode(",", $variacion['vrd_ids']);
							if(count($combinacionesTMP) == 0) {
								
								$index = array_search(intval($variacion['var_id']), $variacionesPadre);
								if($index === false) {
									array_push($variacionesPadre, intval($variacion['var_id']));
								}

								foreach($opciones as $keyO => $detalle) {
									array_push($combinaciones, $detalle);
								}
								$combinacionesTMP = $combinaciones;

							} else {
								
								$index = array_search(intval($variacion['var_id']), $variacionesPadre);
								if($index === false) {
									array_push($variacionesPadre, intval($variacion['var_id']));
								}

								$combinaciones = [];

								foreach ($combinacionesTMP as $keyC => $comb) {
									foreach($opciones as $keyO => $detalle) {
										array_push($combinaciones, $comb.",".$detalle);
									}
								}

								if(count($combinaciones) > 0) {
									$combinacionesTMP = $combinaciones;
								}
							}
						};

						$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
						$params = [intval($_POST['prd_id'])];
						$types = ['i'];
						$priS = $toolSQL->selectSQL($prepare, $types, $params);
						if($priS < 0) {
							echo -1;
						} else {

							$cantidadInventario = $prdS[0]['pri_inventario'];
							$variacionesDB = [];
							foreach($combinaciones as $keyC => $combinacion) {

								$estado = "INSERT";
								foreach($priS as $inventario) {

									if($combinacion == $inventario['vrd_ids']) {
										$estado = "UPDATE";
									}
								}
								
								if($estado == "INSERT") {

									$prepare = "INSERT INTO productos_inventario (prd_id, vrd_ids, pri_inventario, pri_preciodiferencia, pri_visible, pri_creado) VALUES (?,?,?,?,?,?)";
									$params = [
										intval($_POST['prd_id']),
										$combinacion,
										intval($cantidadInventario),
										doubleval(0),
										intval(1),
										$creado
									];
									$types = ['i','s','i','d','i','s'];
									$priI = $toolSQL->insertSQL($prepare, $types, $params);
									if($priI < 0) {
										echo -3;
										exit;
									}
								}
							} 

							$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
							$params = [intval($_POST['prd_id'])];
							$types = ['i'];
							$priS = $toolSQL->selectSQL($prepare, $types, $params);
							if($priS < 0) {
								echo -1;
							} else {

								foreach ($priS as $keyI => $inventario) {
									
									$indexI = array_search($inventario['vrd_ids'], $combinaciones);
									if($indexI === false) {

										$prepare = "DELETE FROM productos_inventario WHERE pri_id = ?";
										$params = [intval($inventario['pri_id'])];
										$types = ['i'];
										$priD = $toolSQL->deleteSQl($prepare, $types, $params);
										if($priD < 0) {
											echo -4;
											exit;
										}
									}
								}

							}
							echo 2;
						}
					}
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
		if($prvU < 0) {
			echo -1;
		} else {
			
			$prepare = "SELECT COUNT(prd.vrd_ids) AS conteo, prd_precio, pri.pri_inventario FROM productos prd INNER JOIN productos_inventario pri ON(pri.prd_id = prd.prd_id) WHERE prd.prd_id = ? AND pri.vrd_ids <> 0";
			$params = [intval($_POST['prd_id'])];
			$types = ['i'];
			$prdS = $toolSQL->selectSQL($prepare, $types, $params);
			if($prdS < 0) {
				echo -2;
			} else {

				$registros = $prdS[0]['conteo'];
				if($registros == 0) {
					echo $prvU;
				} else {

					$prepare = "SELECT var_id, vrd_ids FROM productos_variaciones WHERE prd_id = ? AND prv_borrado = 0 ORDER BY prv_id ASC";
					$params = [intval($_POST['prd_id'])];
					$types = ['i'];
					$prvS = $toolSQL->selectSQL($prepare, $types, $params);
					if($prvS < 0) {
						echo -1;
					} else {

						if($prvS == 0) {

							$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
							$params = [intval($_POST['prd_id'])];
							$types = ['i'];
							$priS = $toolSQL->selectSQL($prepare, $types, $params);
							if($priS < 0) {
								echo -1;
							} else {

								foreach($priS as $inventario) {

									$prepare = "DELETE FROM productos_inventario WHERE pri_id = ?";
									$params = [intval($inventario['pri_id'])];
									$types = ['i'];
									$priD = $toolSQL->deleteSQl($prepare, $types, $params);
									if($priD < 0) {
										echo -4;
										exit;
									}
								}
								echo 1;
							}

						} else {

							$variacionesPadre = [];
							$combinaciones = [];
							$combinacionesTMP = [];

							foreach ($prvS as $keyP => $variacion) {

								$opciones = explode(",", $variacion['vrd_ids']);
								if(count($combinacionesTMP) == 0) {
									
									$index = array_search(intval($variacion['var_id']), $variacionesPadre);
									if($index === false) {
										array_push($variacionesPadre, intval($variacion['var_id']));
									}

									foreach($opciones as $keyO => $detalle) {
										array_push($combinaciones, $detalle);
									}
									$combinacionesTMP = $combinaciones;

								} else {
									
									$index = array_search(intval($variacion['var_id']), $variacionesPadre);
									if($index === false) {
										array_push($variacionesPadre, intval($variacion['var_id']));
									}

									$combinaciones = [];

									foreach ($combinacionesTMP as $keyC => $comb) {
										foreach($opciones as $keyO => $detalle) {
											array_push($combinaciones, $comb.",".$detalle);
										}
									}

									if(count($combinaciones) > 0) {
										$combinacionesTMP = $combinaciones;
									}
								}
							};

							$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
							$params = [intval($_POST['prd_id'])];
							$types = ['i'];
							$priS = $toolSQL->selectSQL($prepare, $types, $params);
							if($priS < 0) {
								echo -1;
							} else {

								$cantidadInventario = $prdS[0]['pri_inventario'];
								$variacionesDB = [];
								foreach($combinaciones as $keyC => $combinacion) {

									$estado = "INSERT";
									foreach($priS as $inventario) {

										if($combinacion == $inventario['vrd_ids']) {
											$estado = "UPDATE";
										}
									}
									
									if($estado == "INSERT") {

										$prepare = "INSERT INTO productos_inventario (prd_id, vrd_ids, pri_inventario, pri_preciodiferencia, pri_visible, pri_creado) VALUES (?,?,?,?,?,?)";
										$params = [
											intval($_POST['prd_id']),
											$combinacion,
											intval($cantidadInventario),
											doubleval(0),
											intval(1),
											$creado
										];
										$types = ['i','s','i','d','i','s'];
										$priI = $toolSQL->insertSQL($prepare, $types, $params);
										if($priI < 0) {
											echo -3;
											exit;
										}
									}
								} 

								$prepare = "SELECT pri_id, pri_id, vrd_ids FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
								$params = [intval($_POST['prd_id'])];
								$types = ['i'];
								$priS = $toolSQL->selectSQL($prepare, $types, $params);
								if($priS < 0) {
									echo -1;
								} else {

									foreach ($priS as $keyI => $inventario) {
										
										$indexI = array_search($inventario['vrd_ids'], $combinaciones);
										if($indexI === false) {
											
											$prepare = "DELETE FROM productos_inventario WHERE pri_id = ?";
											$params = [intval($inventario['pri_id'])];
											$types = ['i'];
											$priD = $toolSQL->deleteSQl($prepare, $types, $params);
											if($priD < 0) {
												echo -4;
												exit;
											}
										}
									}

								}
								echo 2;
							}
						}
					}
				}
			}
		}
	}
	elseif($_POST['action'] == "obtener_variaciones")
	{
		$idioma = $_POST['idioma'];
		$prepare = "SELECT var_id, vrd_ids FROM productos_variaciones WHERE prd_id = ? AND prv_borrado = 0 ORDER BY prv_id ASC";
		$params = [intval($_POST['producto'])];
		$types = ['i'];
		$prvS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prvS < 0)
			echo -1;
		else
		{
			if($prvS == 0)
				echo 0;
			else
			{
				$variacionesPadre = [];
				$combinaciones = [];
				$combinacionesTMP = [];

				foreach ($prvS as $keyP => $variacion) {

					$opciones = explode(",", $variacion['vrd_ids']);
					if(count($combinacionesTMP) == 0) {
						
						$index = array_search(intval($variacion['var_id']), $variacionesPadre);
						if($index === false) {
							array_push($variacionesPadre, intval($variacion['var_id']));
						}

						foreach($opciones as $keyO => $detalle) {
							array_push($combinaciones, $detalle);
						}
						$combinacionesTMP = $combinaciones;

					} else {
						
						$index = array_search(intval($variacion['var_id']), $variacionesPadre);
						if($index === false) {
							array_push($variacionesPadre, intval($variacion['var_id']));
						}

						$combinaciones = [];

						foreach ($combinacionesTMP as $keyC => $comb) {
							foreach($opciones as $keyO => $detalle) {
								array_push($combinaciones, $comb.",".$detalle);
							}
						}

						if(count($combinaciones) > 0) {
							$combinacionesTMP = $combinaciones;
						}
					}
				};


				if(count($combinaciones) > 0) {

					if(isset($_POST['producto'])) { 

						$prepare = "SELECT prd.prd_id, prd_nombre, prd_precio, pri.pri_inventario FROM productos prd INNER JOIN productos_inventario pri ON(pri.prd_id = prd.prd_id) WHERE prd.prd_id = ? AND pri.vrd_ids = 0";
						$params = [intval($_POST['producto'])];
						$types = ['i'];
						$padS = $toolSQL->selectSQL($prepare, $types, $params);
						if($padS < 0) {
							echo -3;
						} else {

							$prepare = "
								SELECT pri_id, prd_id, vrd_ids, pri_inventario, pri_preciodiferencia, pri_visible
								FROM productos_inventario
								WHERE prd_id = ? AND vrd_ids <> 0 ORDER BY pri_id ASC";
							$params = [intval($_POST['producto'])];
							$types = ['i'];
							$prdS = $toolSQL->selectSQL($prepare,$types,$params);
							if($prdS < 0) {
								echo -4;
							} else {

								$prepare = "SELECT * FROM variaciones_detalles WHERE ? ORDER BY var_id ASC";
								$params = [1];
								$types = ['i'];
								$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
								if($vrdS < 0) {
									echo -5;
								} else {
									echo json_encode($variacionesPadre)."::".json_encode($combinaciones)."::".json_encode($padS)."::".json_encode($prdS)."::".json_encode($vrdS);
								}
							}
						}

					} else {
						echo -2;
					}

				} else {
					echo 0;
				}
			}
		}
	}
	elseif($_POST['action'] == "pviventario")
	{
		$prepare = "SELECT pri_id, prd_id, vrd_ids, pri_inventario FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0";
		$params = [intval($_POST['prd_id'])];
		$types = ['i'];
		$priS = $toolSQL->selectSQL($prepare, $types, $params);
		if($priS < 0)
			echo -1;
		else
		{
			if($priS == 0) {
				
				$prepare = "UPDATE productos SET vrd_ids = ? WHERE prd_id = ?";
				$params = [
					$_POST['var_ids'],
					intval($_POST['prd_id'])
				];
				$types = ['s','i'];
				$prdU = $toolSQL->updateSQL($prepare, $types, $params);
				if($prdU < 0) {
					echo -2;
				} else {

					foreach ($_POST['pri_id'] as $key => $inventario) {
						
						$cantidadInventario = $_POST['stockBefore'][$key] + $_POST['stock'][$key];
						$precioDiferencia = $tools->desajustar_valor($_POST['pricediff'][$key]);
						$prepare = "INSERT INTO productos_inventario (prd_id, vrd_ids, pri_inventario, pri_preciodiferencia, pri_visible, pri_creado) VALUES (?,?,?,?,?,?)";
						$params = [
							intval($_POST['prd_id']),
							$_POST['vrd_id'][$key],
							intval($cantidadInventario),
							doubleval($precioDiferencia),
							intval($_POST['visible'][$key]),
							$creado
						];
						$types = ['i','s','i','d','i','s'];
						$priI = $toolSQL->insertSQL($prepare, $types, $params);
						if($priI < 0) {
							echo -3;
							exit;
						}
					}
					echo 1;
				}
			} else {
				
				foreach ($_POST['pri_id'] as $key => $inventario) {
						
					$cantidadInventario = $_POST['stockBefore'][$key] + $_POST['stock'][$key];
					$precioDiferencia = $tools->desajustar_valor($_POST['pricediff'][$key]);
					$prepare = "UPDATE productos_inventario SET pri_inventario = ?, pri_preciodiferencia = ?, pri_visible = ? WHERE pri_id = ?";
					$params = [
						intval($cantidadInventario),
						doubleval($precioDiferencia),
						intval($_POST['visible'][$key]),
						intval($_POST['pri_id'][$key])
					];
					$types = ['i','d','i','i'];
					$priU = $toolSQL->updateSQL($prepare, $types, $params);
					if($priU < 0) {
						echo -3;
						exit;
					}
				}
				echo 1;
			}
		}
	}
	elseif($_POST['action'] == "eliminar_inventario")
	{
		$prepare = "UPDATE productos SET vrd_ids = 0 WHERE prd_id = ?";
		$params = [intval($_POST['producto'])];
		$types = ['i'];
		$prdU = $toolSQL->updateSQL($prepare, $types, $params);
		if($prdU < 0) {
			echo -1;
		} else {

			$prepare = "DELETE FROM productos_inventario WHERE prd_id = ? AND vrd_ids <> 0";
			$params = [intval($_POST['producto'])];
			$types = ['i'];
			$priD = $toolSQL->deleteSQl($prepare, $types, $params);
			echo $priD;
		}
	}
	elseif($_POST['action'] == "obtener_galeria") 
	{
		$prepare = "SELECT prg_id, vrd.var_id, prg.vrd_id, vrd.vrd_nombre, prg_galeria FROM productos_galeria prg INNER JOIN variaciones_detalles vrd ON(vrd.vrd_id = prg.vrd_id) WHERE prd_id = ?";
		$params = [intval($_POST['producto'])];
		$types = ['i'];
		$prgS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prgS < 0) {
			echo -1;
		} else {

			$prepare = "SELECT prd_id, prv.var_id, vrd_ids, var.var_nombre FROM productos_variaciones prv INNER JOIN variaciones var ON(var.var_id = prv.var_id) WHERE prd_id = ? AND prv_borrado = 0";
			$params = [intval($_POST['producto'])];
			$types = ['i'];
			$prvS = $toolSQL->selectSQL($prepare, $types, $params);
			if($prvS <= 0) {
				echo -1;
			} else {

				$prepare = "SELECT vrd_id, var_id, vrd_nombre FROM variaciones_detalles WHERE ? ORDER BY vrd_nombre ASC";
				$params = [1];
				$types = ['i'];
				$vrdS = $toolSQL->selectSQL($prepare, $types, $params);
				if($vrdS < 0) {
					 echo -2;
				} else {
					echo json_encode($prgS)."::".json_encode($prvS)."::".json_encode($vrdS);
				}
			}
		}
	}
	elseif($_POST['action'] == "galeria") 
	{
		$ruta = "../../uploads/productos/galeria/";
		$ruta_tmp = "../../uploads/archivos/";
		$prepare = "SELECT prg_id, vrd_id, prg_galeria FROM productos_galeria WHERE prd_id = ?";
		$params = [intval($_POST['prd_id'])];
		$types = ['i'];
		$prgS = $toolSQL->selectSQL($prepare, $types, $params);
		if($prgS < 0) 
			echo -1;
		else
		{
			$prepare = "SELECT vrd_id FROM variaciones_detalles WHERE ? ORDER BY var_id ASC";
			$params = [1];
			$types = ['i'];
			$vrdS = $toolSQL->selectSQL($prepare, $types, $params);

			if($prgS == 0) {
				
				foreach ($vrdS as $keyV => $variacion) {
					
					if(isset($_POST['archivos_input-'.$variacion['vrd_id']])) {

						if($_POST['archivos_input-'.$variacion['vrd_id']] != "") {
							$archivos = explode(";;", $_POST['archivos_input-'.$variacion['vrd_id']]);
							foreach ($archivos as $key => $arc) {
								$archivo = explode("||", $arc);
								$webp = explode(".", $archivo[1]);
								rename($ruta_tmp.$archivo[1], $ruta.$archivo[1]);	
								rename($ruta_tmp.$webp[0].".webp", $ruta.$webp[0].".webp");	
							}
						}

						$prepare = "INSERT INTO productos_galeria (prd_id, vrd_id, prg_galeria, prg_creado) VALUES (?,?,?,?)";
						$params = [
							intval($_POST['prd_id']),
							intval($variacion['vrd_id']),
							$_POST['archivos_input-'.$variacion['vrd_id']],
							$creado
						];
						$types = ['i','i','s','s'];
						$prgI = $toolSQL->insertSQL($prepare, $types, $params);
						if($prgI < 0) {
							echo -3;
							exit;
						}
					}
				}

			} else {

				foreach ($prgS as $key => $galeria) {
					
					// TODO: GALERIA
					$archivosFRONT 	= $_POST['archivos_input-'.$galeria['vrd_id']] 	!= "" 	? explode(";;", $_POST['archivos_input-'.$galeria['vrd_id']]) : [];
					$archivosDB 	= $galeria['prg_galeria'] 	!= ""	? explode(";;", $galeria['prg_galeria']) : [];

					$archivosMOVE = [];
					$archivosDEL = [];

					// TODO: VERIFICACION DE LA GALERIA
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
							rename($ruta_tmp.$mover[1], $ruta.$mover[1]);
							rename($ruta_tmp.$webp[0].".webp", $ruta.$webp[0].".webp");
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

					$prepare = "UPDATE productos_galeria SET  prg_galeria = ? WHERE prg_id = ?";
					$params = [
						$_POST['archivos_input-'.$galeria['vrd_id']],
						intval($galeria['prg_id'])
					];
					$types = ['s','i'];
					$prgU = $toolSQL->updateSQL($prepare, $types, $params);
					if($prgU < 0) {
						echo -3;
						exit;
					}
				}

			}
			echo 1;
		}
	}
?>