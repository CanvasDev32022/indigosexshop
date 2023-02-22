const plantillas = (seccion, datos, rol=0, pagina=1, busqueda="", id=0, cmp) => {
	
	validaciones_global = [];

	// TODO: MODULO USUARIOS
	if(seccion == "usuarios")
	{
		const seccion_singular = "usuario";
		const seccion_legible = "Usuario";

		let botones_accesos = "";
		if(validar_acceso('usuario_crear', rol)){
			botones_accesos = `
				<div class="fixed-action-btn">
					<a class="btn-floating btn-large btnppal" title="Crear ${seccion_legible}" onclick="plantillas('${seccion_singular}_crear', '')" id="crear_${seccion_singular}">
						<i class="large material-icons">add</i>
					</a>
				</div>`; 
		}

		return`
		${botones_accesos}
		<div class="row mb-5" id="${seccion}-container">
			<div class="col m5 s12 pl-10">
				<div id="registros" class="paginador-left"></div>
			</div>
			<div class="col m7 s12 pr-0">
				<div class="paginador-right">
					<ul class="pagination" id="paginador"></ul>
				</div>
			</div>
		</div>
		<div class="tabla">
			<table class="custom-table">
				<thead>
					<tr>
						<th class="table-40">Nombres</th>
						<th class="table-30">Rol</th>
						<th class="table-30">Acciones</th>
					</tr>
				</thead>
				<tbody id="resultado"></tbody>
			</table>
		</div>
		<div class="row mt-5">
			<div class="col m5 s12"></div>
			<div class="col m7 s12 pr-0">
				<div class="paginador-right">
					<ul class="pagination" id="paginadorB"></ul>
				</div>
			</div>
		</div>`;
	}
	else
	if(seccion == "usuarios_lista")
	{
		const modulo = "usuarios";
		const seccion_legible = "Usuario";
		const seccion_singular = "usuario";

		//Acceso para botones
		var botones_accesos = "";
		if(validar_acceso('usuario_ver', rol))
			botones_accesos = botones_accesos + 
			`<a onclick="plantillas('${seccion_singular}_ver','','','${pagina}','${busqueda}',${datos['usr_id']})" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Ver ${seccion_legible}"><i class="material-icons">visibility</i></a>`;
		
		if(validar_acceso('usuario_editar', rol))
			botones_accesos = botones_accesos + 
			`<a onclick="plantillas('${seccion_singular}_editar','','','${pagina}','${busqueda}',${datos['usr_id']})" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Editar ${seccion_legible}"><i class="material-icons">edit</i></a>`;

		if(validar_acceso('usuario_eliminar', rol))
			botones_accesos = botones_accesos + 
			`<a onclick="eliminar_registro(${datos['usr_id']}, '${modulo}', ${pagina}, '${busqueda}')" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Eliminar ${seccion_legible}"><i class="material-icons">delete</i></a>`;

		
		var contenedor = `  
			<td>${datos['usr_nombres']} ${datos['usr_apellidos']} ${establecer_estado(datos['est_id'])}</td>
			<td>${datos['rol_nombre']}</td>
			<td>${botones_accesos}</td>`;

		return contenedor;
	}
	else
	if(seccion == "usuario_crear")
	{
		const modulo = "usuarios";
		const seccion_legible = "Usuario";
		const seccion_singular = "usuario";

		const modal = document.getElementById(`modal-${modulo}`);
		modal.innerHTML = loaderComponent();

		var xhr = new XMLHttpRequest();
		var params = "idioma="+cms_idioma+"&action=obtener_crear";
		xhr.open("POST", "inc/"+modulo+".php",true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					var data = xhr.responseText.trim();
					// console.log(data);
					if(data < 0)
						M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, classes: 'toasterror'});
					else
					{
						const tmp = data.split("::");
						const roles = JSON.parse(tmp[0]);
						const estados = JSON.parse(tmp[1]);

						var optionsRol = "";
						for(var i=0; i<roles.length; i++)
							optionsRol = optionsRol + `<option value="${roles[i]['rol_id']}">${roles[i]['rol_nombre']}</option>`;

						var optionEstados = "";
						for(var i = 0; i<estados.length; i++)
							optionEstados = optionEstados + `<option value="${estados[i]['est_id']}">${estados[i]['est_nombre_'+cms_idioma]}</option>`

						modal.innerHTML = `
						<form method="POST" id="${seccion_singular}_form">
							<div class="modal-header">
								<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
									<div class="container mt-0">
										<div class="row mb-0">
											<div class="col s12 m11 l11">
												<h5 class="breadcrumbs-title mt-0 mb-0"><span>Crear ${seccion_legible}</span></h5>
											</div>
											<span class="modal-action modal-close"><i class="material-icons">close</i></span>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-content">
								<div class="panel">
									<div class="row">
										<div class="col s12 m6 input-field">
											<input type="text" name="usr_nombres" id="usr_nombres" placeholder="" autocomplete="off" onkeyup="validar(this)">
											<label for="usr_nombres">Nombres<i class="requerido">*</i></label>
											<div id="error.usr_nombres" class="form-error"></div>
										</div>
										<div class="col s12 m6 input-field">
											<input type="text" name="usr_apellidos" id="usr_apellidos" placeholder="" autocomplete="off" onkeyup="validar(this)">
											<label for="usr_apellidos">Apellidos<i class="requerido">*</i></label>
											<div id="error.usr_apellidos" class="form-error"></div>
										</div>
										<div class="col s12 m6 input-field">
											<input type="email" name="usr_email" id="usr_email" placeholder="" autocomplete="off" onkeyup="validar(this)">
											<label for="usr_email">Correo electrónico<i class="requerido">*</i></label>
											<div id="error.usr_email" class="form-error"></div>
										</div>
										<div class="col s12 m6 select">
											<label for="usr_rol">Rol</label><i class="requerido">*</i>
											<select name="usr_rol" id="usr_rol" onchange="validar(this)">
												${optionsRol}
											</select>
											<div id="error.usr_rol" class="form-error"></div>
										</div>
										<div class="col s12 m6 input-field">
											<input type="password" name="usr_password" id="usr_password" placeholder="" autocomplete="off" onkeyup="validar(this)">
											<label for="usr_password">Contraseña<i class="requerido">*</i></label>
											<div id="error.usr_password" class="form-error"></div>
										</div>
										<div class="col s12 m6 input-field">
											<input type="password" name="usr_password2" id="usr_password2" placeholder="" autocomplete="off" onkeyup="validar(this)">
											<label for="usr_password2">Cofirmar contraseña<i class="requerido">*</i></label>
											<div id="error.usr_password2" class="form-error"></div>
										</div>
										<div class="col s12 m6 select">
											<label for="est_id">Estado</label><i class="requerido">*</i>
											<select name="est_id" id="est_id" onchange="validar(this)">
												${optionEstados}
											</select>
											<div id="error.est_id" class="form-error"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<div class="row m-0">
									<div class="col s12 m4 offset-m8 nput-field">
										<input type="hidden" name="action" id="action" value="crear">
										<button type="submit" id="action_${seccion_singular}" class="btn waves-effect waves-light azulclaro">Crear ${seccion_legible}</button>
									</div>
								</div>
							</div>
						</form>`;
						
						$('#usr_rol').selectize();
						$('#est_id').selectize();
						$('#usr_padre').selectize();
						M.updateTextFields();

						const validaciones = [
							['usr_nombres',		'Nombres', 				'required', 'length=1,100'],
							['usr_apellidos', 	'Apellidos', 			'required', 'length=1,100'],
							['usr_email', 		'Correo electrónico', 	'required', 'email'],
							['usr_password', 	'Contraseña', 			'required', 'length=8,60', 'confirmacion'],
							['usr_password2', 	'Confirmar contraseña', 'required', 'length=8,60', 'confirmacion'],
							['usr_rol', 		'Rol', 					'required'],
							['est_id', 			'Estado', 				'required'],
						];

						validacion_usuarios(modulo, validaciones);						
						// Hacemos FOCUS y seleccionamos el texto del primer campo
						document.getElementById('usr_nombres').focus();
						document.getElementById('usr_nombres').select();
					}
				}
				else
					M.toast({html: "Ha ocurrido un error, verifique su conexión a Internet", classes: 'toasterror'});
			}
		}

		// Configura el Modal y lo Abre 
		$('#modal-'+modulo).modal({dismissible: false});
		var instance = M.Modal.getInstance(modal);
		instance.open();
	}
	else
	if(seccion == "usuario_editar")
	{
		const modulo = "usuarios";
		const seccion_legible = "Usuario";
		const seccion_singular = "usuario";

		const modal = document.getElementById(`modal-${modulo}`);
		modal.innerHTML = loaderComponent();

		var xhr = new XMLHttpRequest();
		var params = "idioma="+cms_idioma+"&id="+id+"&action=obtener_editar";
		xhr.open("POST", "inc/"+modulo+".php",true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					var data = xhr.responseText.trim();
					// console.log(data);
					if(data < 0)
						M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, classes: 'toasterror'});
					else
					{
						data = data.split("::");
						const datos 	= JSON.parse(data[0]);
						const roles 	= JSON.parse(data[1]);
						const estados = JSON.parse(data[2]);

						var optionsRol = "";
						for(var i=0; i<roles.length; i++) {

							const selected  = roles[i]['rol_id'] == datos[0]['rol_id'] ? "selected": "";
							optionsRol = optionsRol + `<option value="${roles[i]['rol_id']}" ${selected}>${roles[i]['rol_nombre']}</option>`;
						}

						var optionEstados = "";
						for(var i = 0; i<estados.length; i++) {

							const selected = estados[i]['est_id'] == datos[0]['est_id'] ? "selected" : "";
							optionEstados = optionEstados + `<option value="${estados[i]['est_id']}" ${selected}>${estados[i]['est_nombre_'+cms_idioma]}</option>`;
						}

						modal.innerHTML = `
							<form method="POST" id="${seccion_singular}_form">
								<div class="modal-header">
									<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
										<div class="container mt-0">
											<div class="row mb-0">
												<div class="col s12 m11 l11">
													<h5 class="breadcrumbs-title mt-0 mb-0"><span>Editar ${seccion_legible}</span></h5>
												</div>
												<span class="modal-action modal-close"><i class="material-icons">close</i></span>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-content">
									<div class="panel">
									<input type="hidden" name="usr_id" id="usr_id" value="${datos[0]['usr_id']}">
										<div class="row">
											<div class="col s12 m6 input-field">
												<input type="text" name="usr_nombres" id="usr_nombres" placeholder="" autocomplete="off" onkeyup="validar(this)" value="${datos[0]['usr_nombres']}">
												<label for="usr_nombres">Nombres<i class="requerido">*</i></label>
												<div id="error.usr_nombres" class="form-error"></div>
											</div>
											<div class="col s12 m6 input-field">
												<input type="text" name="usr_apellidos" id="usr_apellidos" placeholder="" autocomplete="off" onkeyup="validar(this)" value="${datos[0]['usr_apellidos']}">
												<label for="usr_apellidos">Apellidos<i class="requerido">*</i></label>
												<div id="error.usr_apellidos" class="form-error"></div>
											</div>
											<div class="col s12 m6 input-field">
												<input type="email" id="usr_email" placeholder="" autocomplete="off" onkeyup="validar(this)" value="${datos[0]['usr_email']}" disabled>
												<label for="usr_email">Correo electrónico<i class="requerido">*</i></label>
												<div id="error.usr_email" class="form-error"></div>
											</div>
											<div class="col s12 m6 select">
												<label for="usr_rol">Rol</label><i class="requerido">*</i>
												<select name="usr_rol" id="usr_rol" onchange="validar(this)">
													${optionsRol}
												</select>
												<div id="error.usr_rol" class="form-error"></div>
											</div>
											<div class="col s12 m6 input-field">
												<input type="password" name="usr_password" id="usr_password" placeholder="" autocomplete="off" onkeyup="validar(this)">
												<label for="usr_password">Contraseña</label>
												<div id="error.usr_password" class="form-error"></div>
											</div>
											<div class="col s12 m6 input-field">
												<input type="password" name="usr_password2" id="usr_password2" placeholder="" autocomplete="off" onkeyup="validar(this)">
												<label for="usr_password2">Cofirmar contraseña</label>
												<div id="error.usr_password2" class="form-error"></div>
											</div>
											<div class="col s12 m6 select">
												<label for="est_id">Estado</label><i class="requerido">*</i>
												<select name="est_id" id="est_id" onchange="validar(this)">
													${optionEstados}
												</select>
												<div id="error.est_id" class="form-error"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<div class="row m-0">
										<div class="col s12 m4 offset-m8 nput-field">
											<input type="hidden" name="action" id="action" value="editar">
											<button type="submit" id="action_${seccion_singular}" class="btn waves-effect waves-light azulclaro">Editar ${seccion_legible}</button>
										</div>
									</div>
								</div>
							</form>`;

						//Inicializamos los Select
						$('#usr_rol').selectize();
						$('#est_id').selectize();
						$('#usr_padre').selectize();
						M.updateTextFields();

						const validaciones = [
							['usr_nombres',		'Nombres', 				'required', 'length=1,100'],
							['usr_apellidos', 	'Apellidos', 			'required', 'length=1,100'],
							['usr_email', 		'Correo electrónico', 	'required', 'email'],
							['usr_password', 	'Contraseña', 			'lengthPass=8,60', 'confirmacion'],
							['usr_password2', 	'Confirmar contraseña', 'lengthPass=8,60', 'confirmacion'],
							['usr_rol', 		'Rol', 					'required'],
							['est_id', 			'Estado', 				'required'],
						];
						validacion_usuarios(modulo, validaciones);
				
						// Hacemos FOCUS y seleccionamos el texto del primer campo
						document.getElementById('usr_nombres').focus();
						document.getElementById('usr_nombres').select();
					}
				}
				else
					M.toast({html: "Ha ocurrido un error, verifique su conexión a Internet", classes: 'toasterror'});
			}
		}

		$('#modal-'+modulo).modal({dismissible: false});
		var instance = M.Modal.getInstance(modal);
		instance.open();
	}
	else
	if(seccion == "usuario_ver")
	{
		var modulo = "usuarios";
		var seccion_legible = cms_traducciones[0][cms_idioma]['usuario'];
		var seccion_singular = "usuario";

		// TODO: Abrimos el modal con el complemento de carga
		carga_loader(`modal-${modulo}`, true);

		$('#modal-'+modulo).modal({
			dismissible: false,
			onCloseEnd: () => {
				document.getElementById(`modal-${modulo}`).innerHTML = "";
			}
		});
		var instance = M.Modal.getInstance(document.getElementById('modal-'+modulo));
		instance.open();

		// TODO: Obtenemos los datos para el formulario
		var xhr = new XMLHttpRequest();
		var params = "idioma="+cms_idioma+"&id="+id+"&action=obtener_ver";
		xhr.open("POST", "inc/"+modulo+".php",true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					var data = xhr.responseText.trim();
					// console.log(data);
					if(data <= 0)
						M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, classes: 'toasterror'});
					else
					{
						var tmp = data.split("::");
						var datos = JSON.parse(tmp[0]);
						var extras = JSON.parse(tmp[1]);

						var campos_extra = "";
						var valor_select = "";

						if(extras != 0)
						{
							extras.forEach(function(element){
								if(element['cpe_tipo'] == 'select')
								{
									var temp = element['cpe_valores_'+cms_idioma].split(",");
									temp.forEach(function(selects){
										var select = selects.split("=>");
										if(parseInt(select[0]) == parseInt(datos[0][element['cpe_slug']]))
											valor_select = select[1];
									});
								}
								else
									valor_select = datos[0][element['cpe_slug']];

								campos_extra = campos_extra + 
									`<div class="table-40v ver-titulo">${element['cpe_nombre_'+cms_idioma]}</div>
									<div class="table-60v" ondblclick="copiar_contenido(this)" onclick="mostrar_detalle(this)">${valor_select}</div>
									<div class="table-copy"><i onclick="mostrar_detalle('${valor_select}')" class="material-icons">open_in_new</i></div>`;
							});
						}

						if(datos[0]['padre_nombre'] == null && datos[0]['padre_apellidos'] == null)
							var padre = cms_traducciones[0][cms_idioma]['sin padre'];
						else
							padre = datos[0]['padre_nombre']+" "+datos[0]['padre_apellidos'];

						document.getElementById('modal-'+modulo).innerHTML = 
							`<div class="modal-content">
								<span class="modal-action modal-close"><i class="material-icons">cancel</i></span>
								<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
									<div class="container mt-0">
										<div class="row mb-0">
											<div class="col s12 m11 l11">
												<h5 class="breadcrumbs-title mt-0 mb-0"><span>${cms_traducciones[0][cms_idioma]['Información del usuario']}</span></h5>
											</div>
										</div>
									</div>
								</div>

								<div class="panel">
									<div class="row">
										<div class="col m12 s12 sugerencias">
											${cms_traducciones[0][cms_idioma]['mensaje8']}
										</div>
										<div class="col m12 s12">
											<div class="table-40v ver-titulo">ID</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${id}</div>
											<div class="table-copy"><i class="material-icons">open_in_new</i></div>

											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['nombre']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${datos[0]['usr_nombres']}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${datos[0]['usr_nombres']}')" class="material-icons">open_in_new</i></div>

											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['apellido']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${datos[0]['usr_apellidos']}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${datos[0]['usr_apellidos']}')" class="material-icons">open_in_new</i></div>

											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['correo electronico']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${email(datos[0]['usr_email'])}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${datos[0]['usr_email']}')" class="material-icons">open_in_new</i></div>

											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['rol']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${datos[0]['rol_nombre_'+cms_idioma]}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${datos[0]['rol_nombre_'+cms_idioma]}')" class="material-icons">open_in_new</i></div>

											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['estado']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${datos[0]['est_nombre_'+cms_idioma]}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${datos[0]['est_nombre_'+cms_idioma]}')" class="material-icons">open_in_new</i></div>

											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['padre']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${padre}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${padre}')" class="material-icons">open_in_new</i></div>
										
											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['mensaje11']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${formato_fecha(datos[0]['usr_modificado'])}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${formato_fecha(datos[0]['usr_modificado'])}')" class="material-icons">open_in_new</i></div>
											
											<div class="table-40v ver-titulo">${cms_traducciones[0][cms_idioma]['creado']}</div>
											<div class="table-60v" ondblclick="copiar_contenido(this)">${formato_fecha(datos[0]['usr_creado'])}</div>
											<div class="table-copy"><i onclick="mostrar_detalle('${formato_fecha(datos[0]['usr_creado'])}')" class="material-icons">open_in_new</i></div>

											${campos_extra}
										</div>
									</div>
								</div>
							</div>`;
					}
				}
				else
					M.toast({html:cms_traducciones[0][cms_idioma]['mensaje3'], classes: 'toasterror'});
			}
		}
	}
	// TODO: MODULO CLIENTES
	// TODO: MODULO PRODUCTOS
	else
	if(seccion == "productos")
	{
		const seccion_singular = "producto";
		const seccion_legible = "Producto";

		let botones_accesos = "";
		if(validar_acceso('producto_crear', rol)) {

			botones_accesos = `
			<div class="fixed-action-btn">
				<a class="btn-floating btn-large btnppal" title="Crear ${seccion_legible}" onclick="plantillas('${seccion_singular}_crear', '')">
					<i class="large material-icons">add</i>
				</a>
			</div>`;
		}

		return `
		${botones_accesos}
		<div class="row mb-5">
			<div class="col m5 s12 pl-10">
				<div id="registros" class="paginador-left"></div>
			</div>
			<div class="col m7 s12 pr-0">
				<div class="paginador-right">
					<ul class="pagination" id="paginador"></ul>
				</div>
			</div>
		</div>
		<div class="tabla">
			<table class="custom-table">
				<thead>
					<tr>
						<th class="table-10">Imagen</th>
						<th class="table-20">Nombre</th>
						<th class="table-20">Precio</th>
						<th class="table-10">Mostrar</th>
						<th class="table-10">Destacar</th>
						<th class="table-10">Estado</th>
						<th class="table-20">Acciones</th>
					</tr>
				</thead>
				<tbody id="resultado"></tbody>
			</table>
		</div>
		<div class="row mt-5">
			<div class="col m5 s12"></div>
			<div class="col m7 s12 pr-0">
				<div class="paginador-right">
					<ul class="pagination" id="paginadorB"></ul>
				</div>
			</div>
		</div>`;
	}
	else
	if(seccion == "productos_lista")
	{
		const modulo = "productos";
		const seccion_singular = "producto";
		const seccion_legible = "Producto";

		const slug_producto = generar_slug(datos['prd_nombre']);
		let botones_accesos = "";
		if(validar_acceso('producto_ver', rol))
			botones_accesos = botones_accesos + `<a href="/${datos['prd_id']}/producto/${slug_producto}" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Ver ${seccion_legible}"><i class="material-icons">visibility</i></a>`;

		if(validar_acceso('producto_variaciones', rol))
			botones_accesos = botones_accesos + `<a href="producto-variaciones?s=${busqueda}&p=${pagina}&c=${datos['prd_id']}" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Variaciones"><i class="material-icons">spoke</i></a>`;

		if(validar_acceso('producto_editar', rol))
			botones_accesos = botones_accesos + `<a onclick="plantillas('${seccion_singular}_editar','', '', '${pagina}','${busqueda}',${datos['prd_id']})" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Editar ${seccion_legible}"><i class="material-icons">edit</i></a>`;

		if(validar_acceso('producto_eliminar', rol))
			botones_accesos = botones_accesos + `<a onclick="eliminar_registro(${datos['prd_id']}, '${modulo}', ${pagina}, '${busqueda}')" class="btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Eliminar ${seccion_legible}"><i class="material-icons">delete</i></a>`;


		const mostrar = datos['prd_visible'] ? "checked" : "";
		const destacar = datos['prd_destacado'] ? "checked" : "";
		const tmpGaleria = datos['prd_imagen'].split(";;");
		const tmpImagen = tmpGaleria[0].split("||");
		const imagen = `../uploads/productos/${tmpImagen[1]}`;

		let estado = datos['prs_nombre'];
		let precioContainer = `<td>${ajustarPrecio(datos['prd_precio'])}</td>`;
		if(datos['prd_promocion']) {
			estado = "Promoción";
			precioContainer = `<td>${ajustarPrecio(datos['prd_preciopromocion'])} - <span class="tachado">${ajustarPrecio(datos['prd_precio'])}</span></td>`;
		}
		

		let contenedor = `
		<td>
			<img src="${imagen}" alt="${tmpImagen[0]}" height="70">
		</td>
		<td>${datos['prd_nombre']}</td>
		${precioContainer}
		<td>
			<div class="switch custom-switch">
				<label>
					<input type="checkbox" id="prd_visible" name="prd_visible" ${mostrar} onclick="checkedInput(this, ${datos['prd_id']}, 'mostrar')" data-input="productos">
					<span class="lever custom-leaver"></span>
				</label>
			</div>
		</td>
		<td>
			<div class="switch custom-switch">
				<label>
					<input type="checkbox" id="prd_destacado" name="prd_destacado" ${destacar} onclick="checkedInput(this, ${datos['prd_id']}, 'destacado')" data-input="productos">
					<span class="lever custom-leaver"></span>
				</label>
			</div>
		</td>
		<td class="${removeAccents(estado).toLowerCase()}">${estado}</td>
		<td>
			${botones_accesos}
		</td>`;
		return contenedor;
	}
	else
	if(seccion == "producto_crear")
	{
		const modulo = "productos";
		const seccion_singular = "producto";
		const seccion_legible = "Producto";

		const modal = document.getElementById(`modal-${modulo}`);
		modal.innerHTML = loaderComponent();

		var xhr = new XMLHttpRequest();
		var params 	= `idioma=${cms_idioma}&action=obtener_crear`;
		xhr.open("POST", `inc/${modulo}.php`,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					data = xhr.responseText.trim();
					// console.log(data);
					if(data < 0) {
						M.toast({html: `Ha ocurrido un error. Por favor, intente de nuevo. Código: ${data}`, classes: 'toasterror'});
						$(`#modal-${modulo}`).modal('close');
					} else {

						const tmp = data.split("::");
						const categorias = JSON.parse(tmp[0]);
						const productos = JSON.parse(tmp[1]);

						let optionCategorias = "";
						for (var i = 0; i < categorias.length; i++) {
							optionCategorias = optionCategorias + `<option value="${categorias[i]['pct_id']}">${categorias[i]['pct_nombre']}</option>`;
						}

						let optionsRelacionado = "";
						for (var i = 0; i < productos.length; i++) {
							optionsRelacionado = optionsRelacionado + `<option value="${productos[i]['prd_id']}">${productos[i]['prd_nombre']}</option>`;
						}


						modal.innerHTML = `
						<form method="POST" id="${seccion_singular}_form">
							<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
								<div class="container mt-0">
									<div class="row mb-0">
										<div class="col s12 m11 l11">
											<h5 class="breadcrumbs-title mt-0 mb-0"><span>Crear ${seccion_legible}</span></h5>
										</div>
										<span class="modal-action modal-close"><i class="material-icons">close</i></span>
									</div>
								</div>
							</div>
							<div class="modal-content">
								<div class="panel">
									<input type="hidden" name="archivos_input-0" id="archivos_input-0" value="">
									<div class="row">
										<div class="col s12 m8 p-0">
											<div class="row m-0">
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Imagenes<i class="requerido">*</i></div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m12">
																		<div class="archivos-container" id="archivosC-0">
																			<a class="archivo" onclick="cargar_archivos(0, 'imagena')">
																				<div class="archivo-container">
																					<img src="img/tipos/mas.png" alt="" loading="lazy">
																				</div>
																				<div class="archivo-footer">Cargar Imágenes</div>
																			</a>
																		</div>
																	</div>
																	<div class="col s12 m12">
																		<div class="form-error" id="error.archivos_input-0"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Información del producto</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m8 input-field">
																		<input type="text" name="prd_nombre" id="prd_nombre" autocomplete="off" placeholder="" onkeyup="validar(this)">
																		<label>Nombre<i class="requerido">*</i></label>
																		<div class="form-error" id="error.prd_nombre"></div>
																	</div>
																	<div class="col s12 m4 input-field">
																		<input type="text" name="prd_referencia" id="prd_referencia" autocomplete="off" placeholder="" onkeyup="validar(this)">
																		<label>Referencia</label>
																		<div class="form-error" id="error.prd_referencia"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Descripción<i class="requerido">*</i></label>
																		<textarea class="materialize-textarea" name="prd_descripcioncorta" id="prd_descripcioncorta" onkeyup="validar(this)"></textarea>
																		<div class="form-error" id="error.prd_descripcioncorta"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Descripción larga<i class="requerido">*</i></label>
																		<textarea id="prd_descripcionlarga" name="prd_descripcionlarga" onkeyup="validar(this)"></textarea>
																		<div class="form-error" id="error.prd_descripcionlarga"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">SEO</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m12 input-field">
																		<input type="text" name="prd_metatitulo" id="prd_metatitulo" autocomplete="off" placeholder="" onkeyup="validar(this)">
																		<label>Titulo</label>
																		<div class="form-error" id="error.prd_metatitulo"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Descripción</label>
																		<textarea class="materialize-textarea" name="prd_metadescripcion" id="prd_metadescripcion"></textarea>
																		<div class="form-error" id="error.prd_metadescripcion"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Keywords</label>
																		<div class="chips" id="prd_metakeywords"></div>
																	</div>
																	<div class="col s12 m6 mt-10">
																		<label>Imagen 1200x630</label>
																		<input type="file" id="prd_metaimagena" name="prd_metaimagena" class="dropify" data-default-file="" onchange="validar(this)" data-max-width="1200" accept="image/.png, .jpg, .jpeg, .gif">
																		<label>Únicos formatos admitidos jpg, png, gif</label>
																		<div id="error.prd_metaimagena" class="form-error"></div>
																	</div>
																	<div class="col s12 m6 mt-10">
																		<label>Imagen 200x200</label>
																		<input type="file" id="prd_metaimagenb" name="prd_metaimagenb" class="dropify" data-default-file="" onchange="validar(this)" data-max-width="210" accept="image/.png, .jpg, .jpeg, .gif">
																		<label>Únicos formatos admitidos jpg, png, gif</label>
																		<div id="error.prd_metaimagenb" class="form-error"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div class="col s12 m4 p-0">
											<div class="row m-0">
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Precios</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m6 input-field">
																		<input type="text" name="prd_precio" id="prd_precio" autocomplete="off" placeholder="" onkeyup="validar(this); ajustar_valor(this)" onchange="calcularPromocion()" value="0">
																		<label>Precio<i class="requerido">*</i></label>
																		<div class="form-error" id="error.prd_precio"></div>
																	</div>
																	<div class="col s12 m6">
																		<div class="switch custom-switch mt-30">
																			<label>
																				<input type="checkbox" id="switch-oferta" name="prd_oferta" onchange="activarPromocion(this)">
																				<span class="lever custom-leaver"></span>
																				Oferta
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m12 p-0" id="oferta-container"></div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Categorias</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m12 select">
																		<label>Categorias<i class="requerido">*</i></label>
																		<select name="pct_id[]" id="pct_id" multiple>
																			<option value="" selected disabled>Seleccióne una opción</option>
																			${optionCategorias}
																		</select>
																		<div class="form-error" id="error.pct_id"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Opciones</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_mostrar" name="prd_mostrar">
																				<span class="lever custom-leaver"></span>
																				Mostrar <br> Producto
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_destacado" name="prd_destacado">
																				<span class="lever custom-leaver"></span>
																				Destacar <br> Producto
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_vendido" name="prd_vendido">
																				<span class="lever custom-leaver"></span>
																				¿Más Vendido?
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_nuevo" name="prd_nuevo">
																				<span class="lever custom-leaver"></span>
																				Producto <br> Nuevo
																			</label>
																		</div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">PRODUCTOS RELACIONADOS</div>
															<div class="collapsible-body">
																<div class="row">
																	<div class="col s12 m9 select">
																		<select id="prd_relacionado" onchange="validar(this)">
																			<option value="">Seleccione una opción</option>
																			${optionsRelacionado}
																		</select>
																		<div id="error.prd_relacionado" class="form-error"></div>
																	</div>
																	<div class="col s12 m3">
																		<a id="agregar-relacionado" class="btn waves-effect waves-light btnppal azulclaro"><i class="material-icons">check</i></a>
																	</div>
																	<div class="col s12 m12">
																		<ul class="collection" id="relacionado-collection"></ul>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<div class="row m-0">
									<div class="col s12 m4 offset-m8">
										<input type="hidden" name="action" id="action" value="crear">
										<button type="submit" id="action_${seccion_singular}" class="btn waves-effect waves-light azulclaro">Crear ${seccion_legible}</button>
									</div>
								</div>
							</div>
						</form>`;

						$('#pct_id').selectize({
							plugins: ['remove_button'],
							create: (input) => {
								return { value: input, text: input }
							}
						});
						$('#prd_relacionado').selectize({
							onChange: (value) => {
								if(value != "") {
									document.getElementById("error.prd_relacionado").innerHTML = "";
								}
							}
						});
						$('.collapsible').collapsible();
						$('.chips').chips();
						$('.dropify').dropify({
							messages: {
								'default': 'Selecciona o arrastra una imagen de perfil',
								'replace': 'Selecciona o arrastra una imagen de perfil',
								'remove':  'eliminar',
								'error':   'Ooops, Algo ha salido mal',
							},
						});

						const editor = document.querySelector('#prd_descripcionlarga');
						ClassicEditor
							.create(editor, basicCkeditor)
							.catch(error => { console.error( error ); } );

						document.getElementById("agregar-relacionado").addEventListener("click", aniadirRelacionados, false);
						M.updateTextFields();
						validacion_productos(modulo);
					}
		
				} else {
					M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
					$(`#modal-${modulo}`).modal('close');	
				}
			}
		}

		// Configura el Modal y lo Abre 
		$('#modal-'+modulo).modal({dismissible: false});
		var instance = M.Modal.getInstance(modal);
		instance.open();
	}
	else
	if(seccion == "producto_editar")
	{
		const modulo = "productos";
		const seccion_singular = "producto";
		const seccion_legible = "Producto";

		const modal = document.getElementById(`modal-${modulo}`);
		modal.innerHTML = loaderComponent();

		var xhr = new XMLHttpRequest();
		var params 	= `idioma=${cms_idioma}&id=${id}&action=obtener_editar`;
		xhr.open("POST", `inc/${modulo}.php`,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					data = xhr.responseText.trim();
					// console.log(data);
					if(data < 0) {
						M.toast({html: `Ha ocurrido un error. Por favor, intente de nuevo. Código: ${data}`, classes: 'toasterror'});
						$(`#modal-${modulo}`).modal('close');
					} else {

						const tmp = data.split("::");
						const datos = JSON.parse(tmp[0]);
						const categorias = JSON.parse(tmp[1]);
						const productos = JSON.parse(tmp[2]);

						let optionCategorias = "";
						for (var i = 0; i < categorias.length; i++) {
							optionCategorias = optionCategorias + `<option value="${categorias[i]['pct_id']}">${categorias[i]['pct_nombre']}</option>`;
						}

						let optionsRelacionado = "";
						for (var i = 0; i < productos.length; i++) {
							optionsRelacionado = optionsRelacionado + `<option value="${productos[i]['prd_id']}">${productos[i]['prd_nombre']}</option>`;
						}

						// TODO: Imagenes principales
						let contenedorImagenes = "";
						if(datos[0]['prd_imagen'] != "") {
							const imagenes = datos[0]['prd_imagen'].split(";;");
							imagenes.forEach((imagen, i) => {

								const titulo = imagen.split("||")[0];
								const archivo = imagen.split("||")[1];

								contenedorImagenes = `
								<a class="archivo" id="${archivo.split(".")[0]}">
									<span class="borrable" onclick="anular_archivo(this, 0)" idC="${archivo.split(".")[0]}" archivo="${archivo}"><i class="material-icons">close</i></span>
									<div class="archivo-container">
										<img src="../uploads/productos/${archivo}" alt="${titulo}" loading="lazy">
									</div>
									<div class="archivo-footer">${titulo}</div>
								</a>` + contenedorImagenes;	
							});
						}
						
						// TODO: MetaKeywords (SEO)
						let metakeywordsObj = [];
						if(datos[0]['prd_metakeywords'] != "") {

							const metakey = datos[0]['prd_metakeywords'].split(", ");
							metakey.forEach((key, i) => {
								metakeywordsObj.push({
									tag: key
								});
							});
						}

						// TODO: Metaimagenes (SEO)
						const metaimagena = datos[0]['prd_metaimagenc'] != "" ? `../uploads/productos/${datos[0]['prd_metaimagenc']}` : "";
						const metaimagenb = datos[0]['prd_metaimagend'] != "" ? `../uploads/productos/${datos[0]['prd_metaimagend']}` : "";

						// TODO: Promocion
						let promocionActiva = "";
						let contenedorPromocion = "";
						if(datos[0]['prd_promocion']) {
							promocionActiva = "checked";
							contenedorPromocion = `
							<div class="row m-0">
								<div class="col s12 m6 input-field">
									<input type="text" name="prd_porcentajepromocion" id="prd_porcentajepromocion" autocomplete="off" placeholder="" onkeyup="validar(this)" onchange="calcularPromocion()" value="${datos[0]['prd_porcentajepromocion']}">
									<label>Descuento (%)</label>
									<div class="form-error" id="error.prd_porcentajepromocion"></div>
								</div>
								<div class="col s12 m6 input-field">
									<input type="text" name="prd_preciopromocion" id="prd_preciopromocion" autocomplete="off" placeholder="" onkeyup="validar(this)" readonly>
									<label>Precio en oferta</label>
									<div class="form-error" id="error.prd_preciopromocion"></div>
								</div>
							</div>`;
						}
						
						// TODO: Mostrar Producto
						const mostrarProducto = datos[0]['prd_visible'] ? "checked" : "";
						// TODO: Destacar Producto
						const destacarProducto = datos[0]['prd_destacado'] ? "checked" : "";
						// TODO: Destacar Producto
						const vendidoProducto = datos[0]['prd_vendido'] ? "checked" : "";
						// TODO: Destacar Producto
						const nuevoProducto = datos[0]['prd_nuevo'] ? "checked" : "";

						// TODO: Productos Relacionados
						let contenedorRelacionados = "";
						if(datos[0]['prd_relacionado'] != "") {

							const relacionados = datos[0]['prd_relacionado'].split(",");
							relacionados.map((relacionado) => {
							
								for (var i = 0; i < productos.length; i++) {
									
									if(relacionado == productos[i]['prd_id']) {

										contenedorRelacionados = contenedorRelacionados + `
										<li class="collection-item custom-item" id="rel-${relacionado}">
											<input type="hidden" name="prd_relacionado[]" value="${relacionado}">
											<span class="custom-title">${productos[i]['prd_nombre']}</span>
											<div class="item-actions">
												<a onclick="eliminar_relacionado(this)" idC="rel-${relacionado}" class="button-item btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Eliminar"><i class="material-icons">close</i></a>
											</div>
										</li>`;
									}
								}
							});
						}

						modal.innerHTML = `
						<form method="POST" id="${seccion_singular}_form">
							<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
								<div class="container mt-0">
									<div class="row mb-0">
										<div class="col s12 m11 l11">
											<h5 class="breadcrumbs-title mt-0 mb-0"><span>Editar ${seccion_legible}</span></h5>
										</div>
										<span class="modal-action modal-close"><i class="material-icons">close</i></span>
									</div>
								</div>
							</div>
							<div class="modal-content">
								<div class="panel">
									<input type="hidden" name="prd_id" id="prd_id" value="${datos[0]['prd_id']}">
									<input type="hidden" name="archivos_input-0" id="archivos_input-0" value="${datos[0]['prd_imagen']}">
									<input type="hidden" name="prd_metaimagenaC" id="prd_metaimagenaC" value="${datos[0]['prd_metaimagenc']}">
									<input type="hidden" name="prd_metaimagenbC" id="prd_metaimagenbC" value="${datos[0]['prd_metaimagend']}">
									<div class="row">
										<div class="col s12 m8 p-0">
											<div class="row m-0">
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Imagenes<i class="requerido">*</i></div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m12">
																		<div class="archivos-container" id="archivosC-0">
																			${contenedorImagenes}
																			<a class="archivo" onclick="cargar_archivos(0, 'imagena')">
																				<div class="archivo-container">
																					<img src="img/tipos/mas.png" alt="" loading="lazy">
																				</div>
																				<div class="archivo-footer">Cargar Imágenes</div>
																			</a>
																		</div>
																	</div>
																	<div class="col s12 m12">
																		<div class="form-error" id="error.archivos_input-0"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Información del producto</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m8 input-field">
																		<input type="text" name="prd_nombre" id="prd_nombre" autocomplete="off" placeholder="" onkeyup="validar(this)" value="${datos[0]['prd_nombre']}">
																		<label>Nombre<i class="requerido">*</i></label>
																		<div class="form-error" id="error.prd_nombre"></div>
																	</div>
																	<div class="col s12 m4 input-field">
																		<input type="text" name="prd_referencia" id="prd_referencia" autocomplete="off" placeholder="" onkeyup="validar(this)" value="${datos[0]['prd_referencia']}">
																		<label>Referencia</label>
																		<div class="form-error" id="error.prd_referencia"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Descripción<i class="requerido">*</i></label>
																		<textarea class="materialize-textarea" name="prd_descripcioncorta" id="prd_descripcioncorta" onkeyup="validar(this)">${datos[0]['prd_descripcion_corta']}</textarea>
																		<div class="form-error" id="error.prd_descripcioncorta"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Descripción larga<i class="requerido">*</i></label>
																		<textarea id="prd_descripcionlarga" name="prd_descripcionlarga" onkeyup="validar(this)">${datos[0]['prd_descripcion_larga']}</textarea>
																		<div class="form-error" id="error.prd_descripcionlarga"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">SEO</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m12 input-field">
																		<input type="text" name="prd_metatitulo" id="prd_metatitulo" autocomplete="off" placeholder="" onkeyup="validar(this)" value="${datos[0]['prd_metatitulo']}">
																		<label>Titulo</label>
																		<div class="form-error" id="error.prd_metatitulo"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Descripción</label>
																		<textarea class="materialize-textarea" name="prd_metadescripcion" id="prd_metadescripcion">${datos[0]['prd_metadescripcion']}</textarea>
																		<div class="form-error" id="error.prd_metadescripcion"></div>
																	</div>
																	<div class="col s12 m12">
																		<label>Keywords</label>
																		<div class="chips" id="prd_metakeywords"></div>
																	</div>
																	<div class="col s12 m6 mt-10">
																		<label>Imagen 1200x630</label>
																		<input type="file" id="prd_metaimagena" name="prd_metaimagena" class="dropify" data-default-file="${metaimagena}" onchange="validar(this)" data-max-width="1200" accept="image/.png, .jpg, .jpeg, .gif">
																		<label>Únicos formatos admitidos jpg, png, gif</label>
																		<div id="error.prd_metaimagena" class="form-error"></div>
																	</div>
																	<div class="col s12 m6 mt-10">
																		<label>Imagen 200x200</label>
																		<input type="file" id="prd_metaimagenb" name="prd_metaimagenb" class="dropify" data-default-file="${metaimagenb}" onchange="validar(this)" data-max-width="210" accept="image/.png, .jpg, .jpeg, .gif">
																		<label>Únicos formatos admitidos jpg, png, gif</label>
																		<div id="error.prd_metaimagenb" class="form-error"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div class="col s12 m4 p-0">
											<div class="row m-0">
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Precios</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m6 input-field">
																		<input type="text" name="prd_precio" id="prd_precio" autocomplete="off" placeholder="" onkeyup="validar(this); ajustar_valor(this)" onchange="calcularPromocion()" value="${ajustarPrecio(datos[0]['prd_precio'])}">
																		<label>Precio<i class="requerido">*</i></label>
																		<div class="form-error" id="error.prd_precio"></div>
																	</div>
																	<div class="col s12 m6">
																		<div class="switch custom-switch mt-30">
																			<label>
																				<input type="checkbox" id="switch-oferta" name="prd_oferta" onchange="activarPromocion(this, ${datos[0]['prd_porcentajepromocion']})" ${promocionActiva}>
																				<span class="lever custom-leaver"></span>
																				Oferta
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m12 p-0" id="oferta-container">
																		${contenedorPromocion}
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Categorias</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m12 select">
																		<label>Categorias<i class="requerido">*</i></label>
																		<select name="pct_id[]" id="pct_id" multiple>
																			<option value="" selected disabled>Seleccióne una opción</option>
																			${optionCategorias}
																		</select>
																		<div class="form-error" id="error.pct_id"></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">Opciones</div>
															<div class="collapsible-body">
																<div class="row m-0">
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_mostrar" name="prd_mostrar" ${mostrarProducto}>
																				<span class="lever custom-leaver"></span>
																				Mostrar <br> Producto
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_destacado" name="prd_destacado" ${destacarProducto}>
																				<span class="lever custom-leaver"></span>
																				Destacar <br> Producto
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_vendido" name="prd_vendido" ${vendidoProducto}>
																				<span class="lever custom-leaver"></span>
																				¿Más Vendido?
																			</label>
																		</div>
																	</div>
																	<div class="col s12 m4 center-align">
																		<div class="switch custom-switch">
																			<label>
																				<input type="checkbox" id="prd_nuevo" name="prd_nuevo" ${nuevoProducto}>
																				<span class="lever custom-leaver"></span>
																				Producto <br> Nuevo
																			</label>
																		</div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div class="col s12 m12">
													<ul class="collapsible custom-collapsible">
														<li class="active">
															<div class="collapsible-header">PRODUCTOS RELACIONADOS</div>
															<div class="collapsible-body">
																<div class="row">
																	<div class="col s12 m9 select">
																		<select id="prd_relacionado" onchange="validar(this)">
																			<option value="">Seleccione una opción</option>
																			${optionsRelacionado}
																		</select>
																		<div id="error.prd_relacionado" class="form-error"></div>
																	</div>
																	<div class="col s12 m3">
																		<a id="agregar-relacionado" class="btn waves-effect waves-light btnppal azulclaro"><i class="material-icons">check</i></a>
																	</div>
																	<div class="col s12 m12">
																		<ul class="collection" id="relacionado-collection">
																			${contenedorRelacionados}
																		</ul>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<div class="row m-0">
									<div class="col s12 m4 offset-m8">
										<input type="hidden" name="action" id="action" value="editar">
										<button type="submit" id="action_${seccion_singular}" class="btn waves-effect waves-light azulclaro">Editar ${seccion_legible}</button>
									</div>
								</div>
							</div>
						</form>`;

						const pct_ids = datos[0]['pct_ids'] != "" ? datos[0]['pct_ids'].split(",") : [];
						const $categorias = $('#pct_id').selectize({
							plugins: ['remove_button'],
							create: (input) => {
								return { value: input, text: input }
							}
						});
						const control = $categorias[0].selectize;
						control.setValue(pct_ids);

						$('#prd_relacionado').selectize({
							onChange: (value) => {
								if(value != "") {
									document.getElementById("error.prd_relacionado").innerHTML = "";
								}
							}
						});
						$('.collapsible').collapsible();
						$('.chips').chips({
							data: metakeywordsObj
						});
						$('.dropify').dropify({
							messages: {
								'default': 'Selecciona o arrastra una imagen de perfil',
								'replace': 'Selecciona o arrastra una imagen de perfil',
								'remove':  'eliminar',
								'error':   'Ooops, Algo ha salido mal',
							},
						});

						const imagena = $('#prd_metaimagena').dropify();
						imagena.on('dropify.afterClear', (event, element) => {
							document.getElementById('prd_metaimagenaC').value = "";
						})

						const imagenb = $('#prd_metaimagenb').dropify();
						imagenb.on('dropify.afterClear', (event, element) => {
							document.getElementById('prd_metaimagenbC').value = "";
						})

						const editor = document.querySelector('#prd_descripcionlarga');
						ClassicEditor
							.create(editor, basicCkeditor)
							.catch(error => { console.error( error ); } );

						document.getElementById("agregar-relacionado").addEventListener("click", aniadirRelacionados, false);
						calcularPromocion();
						M.updateTextFields();
						validacion_productos(modulo);
					}
		
				} else {
					M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
					$(`#modal-${modulo}`).modal('close');	
				}
			}
		}

		// Configura el Modal y lo Abre 
		$('#modal-'+modulo).modal({dismissible: false});
		var instance = M.Modal.getInstance(modal);
		instance.open();
	}
	else
	if(seccion == "producto_variaciones")
	{
		const modulo = "productos";
		const seccion_singular = "producto";
		const seccion_legible = "Producto";

		const modal = document.getElementById(`modal-${modulo}`);
		modal.innerHTML = loaderComponent();

		var xhr = new XMLHttpRequest();
		var params 	= `idioma=${cms_idioma}&id=${id}&action=obtener_variaciones`;
		xhr.open("POST", `inc/${modulo}.php`,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					data = xhr.responseText.trim();
					console.log(data);
					if(data < 0) {
						M.toast({html: `Ha ocurrido un error. Por favor, intente de nuevo. Código: ${data}`, classes: 'toasterror'});
						$(`#modal-${modulo}`).modal('close');
					} else {
						
						modal.innerHTML = `
						<form method="POST" id="${seccion_singular}_form">
							<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
								<div class="container mt-0">
									<div class="row mb-0">
										<div class="col s12 m11 l11">
											<h5 class="breadcrumbs-title mt-0 mb-0"><span>Variaciones</span></h5>
										</div>
										<span class="modal-action modal-close"><i class="material-icons">close</i></span>
									</div>
								</div>
							</div>
							<div class="modal-content">
								<div class="panel">

								</div>
							</div>
							<div class="modal-footer">
								<div class="row m-0">
									<div class="col s12 m4 offset-m8">
										<input type="hidden" name="action" id="action" value="">
										<button type="submit" id="action_${seccion_singular}" class="btn waves-effect waves-light azulclaro">Guardar</button>
									</div>
								</div>
							</div>
						</form>`;

					}
		
				} else {
					M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
					$(`#modal-${modulo}`).modal('close');
				}
			}
		}

		// Configura el Modal y lo Abre 
		$('#modal-'+modulo).modal({dismissible: false});
		var instance = M.Modal.getInstance(modal);
		instance.open();
	}
	else
	if(seccion == "pvariaciones")
	{
		const modulo = "productos";
		const seccion_singular = "producto";
		const seccion_legible = "Producto";

		const cmp = document.getElementById('pvariaciones');
		cmp.innerHTML = loaderComponent();

		var xhr = new XMLHttpRequest();
		var params 	= `idioma=${cms_idioma}id=${id}&action=obtener_variaciones`;
		xhr.open("POST", `inc/${modulo}.php`,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.status == 200)
				{
					data = xhr.responseText.trim();
					// console.log(data);
					if(data < 0) {
						M.toast({html: `Ha ocurrido un error. Por favor, intente de nuevo. Código: ${data}`, classes: 'toasterror'});
					} else {
						
						const tmp = data.split("::");
						const variaciones = JSON.parse(tmp[0]);
						const detalles = JSON.parse(tmp[1]);
						validaciones_global = variaciones;
						dataGlobal = detalles;

						cmp.innerHTML = `
						<form action="">
							<input type="" name="var_ids" id="var_ids" value="">
							<input type="" name="vrd_ids" id="vrd_ids" value="">
							<div class="row">
								<div class="col s12 m2">
									<input type="hidden" name="action" id="action" value="">
									<a onclick="agregarVariantes()" class="btn waves-effect waves-light azulclaro"><i class="material-icons right">add</i>Agregar</a>
								</div>
								<div class="col s12 m4  offset-m4">
									<div class="switch custom-switch">
										<label>
											<input type="checkbox" id="prd_destacado" name="prd_destacado" disabled>
											<span class="lever custom-leaver"></span>
											Inventario por variacion
										</label>
									</div>
								</div>
								<div class="col s12 m12">
									<ul class="collection " id="variaciones-container">
										
									</ul>
								</div>
							</div>
						</form>`;

						
					}
		
				} else {
					M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
				}
			}
		}
	}
}
