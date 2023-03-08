// TODO: VALIDACION LOGIN
const validacion_login = () => {

	const formulario = document.getElementById('login_form');
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.getElementById('action_login');
		boton.setAttribute("disabled", "disabled");

		const validaciones = [
			['user', '', 'required', 'email'],
			['pass', '', 'required', 'length=8,60']
		];

		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			var xhr = new XMLHttpRequest();
			var params 	= $(formulario).serialize();
			xhr.open("POST", "inc/login.php",true);
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
						if(data < 0)
							new Toast({message: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, type: 'danger'});
						else
						if(data == 0){
							new Toast({message: 'El correo electrónico y/o contraseña no coincide con nuestros registros.', type: 'warning'});
						} else {

							window.open("dashboard", "_self");

						}

					} else {
						new Toast({message: "Ha ocurrido un error, verifique su conexión a Internet", type: 'danger'});
					}
					boton.removeAttribute("disabled");
				}
			}

		} else {
			boton.removeAttribute("disabled");
		}
	});
}

// TODO: VALIDACION RECUPERAR
const validacion_recuperar = () => {

	const formulario = document.getElementById('recuperar_form');
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.getElementById('action_recuperar');
		boton.setAttribute("disabled", "disabled");

		const validaciones = [
			['user', '', 'required', 'email'],
		];

		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			var xhr = new XMLHttpRequest();
			var params 	= $(formulario).serialize();
			xhr.open("POST", "inc/login.php",true);
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
						if(data < 0)
							new Toast({message: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, type: 'danger'});
						else
						if(data == 0){
							new Toast({message: 'El correo electrónico no coincide con nuestros registros.', type: 'warning'});
						} else {
							new Toast({message: 'Se ha enviado un correo de verficación, por favor revisa tu bandeja.', type: 'success'});
							setTimeout(() => { window.open("login", "_self"); }, 2000);

						}

					} else {
						new Toast({message: "Ha ocurrido un error, verifique su conexión a Internet", type: 'danger'});
					}
					boton.removeAttribute("disabled");
				}
			}

		} else {
			boton.removeAttribute("disabled");
		}
	});
}

// TODO: VALIDACION CAMBIO CONTRASEN
const validar_contrasena = () => {

	const formulario = document.getElementById('recuperar_form');
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.getElementById('action_recuperar');
		boton.setAttribute("disabled", "disabled");

		const validaciones = [
			['usr_password', '', 'required', 'length=8,60', 'confirmacion'],
			['usr_password2', '', 'required', 'length=8,60', 'confirmacion'],
		];

		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			var xhr = new XMLHttpRequest();
			var params 	= $(formulario).serialize();
			xhr.open("POST", "inc/login.php",true);
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
						if(data < 0)
							new Toast({message: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, type: 'danger'});
						else
						if(data == 0){
							new Toast({message: 'El correo electrónico no coincide con nuestros registros.', type: 'warning'});
						} else {

							new Toast({message: 'La contraseña se ha recuperado con exito.', type: 'success'});
							setTimeout(() => { window.open("login", "_self"); }, 2000);

						}

					} else {
						new Toast({message: "Ha ocurrido un error, verifique su conexión a Internet", type: 'danger'});
					}
					boton.removeAttribute("disabled");
				}
			}

		} else {
			boton.removeAttribute("disabled");
		}
	});
}

// TODO: VALIDACION MODULO USUARIOS
const validacion_usuarios = (seccion, validaciones) => {

	const seccion_singular = "usuario";
	const seccion_legible = "Usuario";

	const formulario = document.getElementById(`${seccion_singular}_form`);
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.getElementById(`action_${seccion_singular}`);
		boton.setAttribute("disabled", "disabled");

		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			const id = document.getElementById('usr_id') != null ? document.getElementById('usr_id').value : 0;
			var xhr = new XMLHttpRequest();
			var params 	= $(formulario).serialize();
			xhr.open("POST", "inc/"+seccion+".php",true);
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
						if(data < 0)
							M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, classes: 'toasterror'});
						else
						if(data == 0) {
							M.toast({html: 'El correo electrónico ya existe en nuestros registros', classes: 'toastwarning'});
						} else {

							if(id == 0)
								M.toast({html: `El ${seccion_legible} se ha creado correctamente.`, classes: 'toastdone'});
							else
								M.toast({html: `El ${seccion_legible} se ha editado correctamente.`, classes: 'toastdone'});

							$(`#modal-${seccion}`).modal('close');
							var variables = obtener_variables();
							formulario.innerHTML = "";
							cargar_registros(seccion, variables[0],variables[1]);
						}
						boton.removeAttribute("disabled");
					}
					else
						M.toast({html: "Ha ocurrido un error, verifique su conexión a Internet", classes: 'toasterror'});
				}
			}

		} else {
			boton.removeAttribute("disabled");
		}
	});
}

// TODO: VALIDACION MODULO CLIENTES

// TODO: VALIDACION MODULO PRODUCTOS
const validacion_productos = (seccion) => {

	const seccion_singular = "producto";
	const seccion_legible = "Producto";

	const formulario = document.getElementById(`${seccion_singular}_form`);
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.getElementById(`action_${seccion_singular}`);
		boton.setAttribute("disabled", "disabled");

		validacionesGlobal.push(
			['archivos_input-0', 		'', 'required'],
			['prd_nombre', 				'', 'required', 'length=1,100'],
			['prd_referencia',			'', 'lengthPass=1,50'],
			['prd_descripcioncorta',	'', 'required', 'length=1, 255'],
			['prd_descripcionlarga',	'', 'required'],
			['prd_metatitulo',			'', 'lengthPass=1,100'],
			['prd_metadescripcion',		'', 'lengthPass=1,255'],
			['prd_metadescripcion',		'', 'lengthPass=1,255'],
			['prd_precio',				'', 'required', 'precio'],
			['pct_id',					'', 'required'],
		);
		
		const respuesta = validar_formulario(validacionesGlobal, false);
		if(respuesta) {

			let prd_metakeywords = "";
			let instance = M.Chips.getInstance(document.querySelector(".chips"));
			let tmpKeywords = instance.chipsData;
			for (var i = 0; i < tmpKeywords.length; i++) {
				prd_metakeywords = `${prd_metakeywords}, ${tmpKeywords[i].tag}`;
			}
			const id = document.getElementById('prd_id') != null ? document.getElementById('prd_id').value : 0;
			var xhr = new XMLHttpRequest();
			var params = new FormData(formulario);
			params.append("prd_metakeywords", prd_metakeywords);
			xhr.addEventListener("error", errorHandler, false);
			xhr.addEventListener("abort", abortHandler, false);
			xhr.open("POST", `inc/${seccion}.php`,true);
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
						} else {
							
							if(id == 0)
								M.toast({html: `La ${seccion_legible} se ha creado correctamente.`, classes: 'toastdone'});
							else
								M.toast({html: `La ${seccion_legible} se ha editado correctamente.`, classes: 'toastdone'});

							// $(`#modal-${seccion}`).modal('close');
							var variables = obtener_variables();
							// formulario.innerHTML = "";
							cargar_registros(seccion, variables[0],variables[1]);

						}
			
					} else {
						M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
					}
					boton.removeAttribute('disabled');
				}
			}

		} else {
			boton.removeAttribute('disabled');
		}
	});
}

// TODO: VALIDACION ARCHIVOS (IMG)
const validacion_documento = (item, tamanio) => {
	
	const seccion_singular = "archivo";
	const seccion_legible = "Archvio";

	const formulario = document.getElementById(`${seccion_singular}_form`);
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.getElementById(`action_${seccion_singular}`);
		boton.setAttribute("disabled", "disabled");

		const validaciones = [
			['prd_galeria', '', 'imagen'],
			['titulo',		'', 'required', 'length=1,100']
		];

		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			const xhr = new XMLHttpRequest();
			let data = new FormData(document.getElementById(seccion_singular+'_form'));
			data.append("tamanio", tamanio);
			xhr.addEventListener("error", errorHandler, false);
			xhr.addEventListener("abort", abortHandler, false);
			xhr.open('POST', "inc/documentos.php",true);
			xhr.send(data);
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4)
				{
					if(xhr.status == 200)
					{
						data = xhr.responseText.trim();
						// console.log(data);
						if(data < 0)
							M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, classes: 'toasterror'});
						else
						{
							if(data == 0) {
						        M.toast({html: 'El archivo no puede ser cargado.', classes: 'toasterror'});
						        
						    } else {
						        const nombre = document.getElementById("titulo").value;
    							const archivo = data;
    							let actual = document.getElementById(`archivos_input-${item}`).value;
    							actual = actual == "" ? nombre+"||"+archivo : actual+";;"+nombre+"||"+archivo;
    							document.getElementById(`archivos_input-${item}`).value = actual;
    							cargar_archivo_thumb(archivo, nombre, 'archivos/', item);
    				            $('#modal-archivos').modal('close');
						    }

						}

					} else {
						M.toast({html: "Ha ocurrido un error, verifique su conexión a Internet", classes: 'toasterror'});
					}
					boton.removeAttribute("disabled");
				}
			}

		} else {
			boton.removeAttribute("disabled");
		}

	});
}

// TODO: VALIDACION MODULO VARIACIONES DE PRODUCTO
const validacion_pvariaciones = (seccion, rol, producto) => {

	const seccion_singular = "pvariacion";
	const seccion_legible = "Variacion";

	const formulario = document.querySelector(`#${seccion_singular}_form`);
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.querySelector(`#action_${seccion_singular}`);
		boton.setAttribute("disabled", "disabled");

		const validaciones = [
			['var_id', '', 'required'],
			['vrd_id', '', 'required']
		];		
		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			const id = document.getElementById('prv_id') != null ? document.getElementById('prv_id').value : 0;
			const xhr = new XMLHttpRequest();
			let data = new FormData(formulario);
			xhr.addEventListener("error", errorHandler, false);
			xhr.addEventListener("abort", abortHandler, false);
			xhr.open('POST', `inc/${seccion}.php`,true);
			xhr.send(data);
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
						} else {

							if(id == 0)
								M.toast({html: `La ${seccion_legible} se ha creado correctamente.`, classes: 'toastdone'});
							else
								M.toast({html: `La ${seccion_legible} se ha editado correctamente.`, classes: 'toastdone'});

							$(`#modal-archivos`).modal('close');
							var variables = obtener_variables();
							formulario.innerHTML = "";
							plantillas(seccion, '', rol,  variables[0],variables[1], producto);
						}
			
					} else {
						M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
					}
					boton.removeAttribute("disabled");
				}
			}
				
		} else {
			boton.removeAttribute("disabled");
		}
	});
}

// TODO: VALIDACION INVENTARIO VARIACIONES DE PRODUCTO
const validacion_pvinventario = (seccion) => {

	const seccion_singular = "pvinventario";
	const seccion_legible = "Variacion";

	const formulario = document.querySelector(`#${seccion_singular}_form`);
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();

		const boton = document.querySelector(`#action_${seccion_singular}`);
		boton.disabled = true;

		const validaciones = [];
		const respuesta = validar_formulario(validaciones, false);
		if(respuesta) {

			var xhr = new XMLHttpRequest();
			var params 	= new FormData(formulario);
			xhr.open("POST", `inc/pvariaciones.php`,true);
			xhr.addEventListener("error",errorHandler, false);
			xhr.addEventListener("abort", abortHandler, false);
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
						} else {
							
						}
			
					} else {
						M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
					}
					boton.disabled = false;
				}
			}

		} else {
			boton.disabled = false;
		}
	});
}

// TODO: funciones de error par FORM DATA
function errorHandler(event) {
	app.toast.show({text: 'Ha ocurrido un error. Intente de nuevo.',closeTimeout: 2000, cssClass: 'toasterror'});
	popup_carga.close();
}

function abortHandler(event) {
	app.toast.show({text: 'Ha cancelado el proceso.',closeTimeout: 2000, cssClass: 'toastwarning'});
	popup_carga.close();
}

// TODO: FUNCIONES PARA VALIDACION DE FORMULARIO Y LIMPIEZA DE INPUT, SELECT(Mejorar a futuro) PD: Cuando tenga tiempo

// TODO: Limpieza de input y div error
const validar = (cmp) => {

	var tipo = cmp.tagName;
	var id = cmp.id;
	var clase = cmp.classList;

	if(tipo == "INPUT")
	{
		if(clase[clase.length -1] == "input-error")
		{
			document.getElementById(id).classList.remove("input-error");
			if(document.getElementById('error.'+id) == undefined) {
				document.querySelector(`[data-field="${id}"]`).innerHTML = "";
			} else {
				document.getElementById('error.'+id).innerHTML = "";
			}
		}
	}
	else
	if(tipo == "SELECT")
	{
		if(clase[clase.length -1] == "input-error")
		{
			document.getElementById(id).classList.remove("input-error");
			if(document.getElementById('error.'+id) == undefined) {
				document.querySelector(`[data-field="${id}"]`).innerHTML = "";
			} else {
				document.getElementById('error.'+id).innerHTML = "";
			}
		}
	}
	if(tipo == "TEXTAREA")
	{
		if(clase[clase.length -1] == "input-error")
		{
			document.getElementById(id).classList.remove("input-error");
			if(document.getElementById('error.'+id) == undefined) {
				document.querySelector(`[data-field="${id}"]`).innerHTML = "";
			} else {
				document.getElementById('error.'+id).innerHTML = "";
			}
		}
	}
}

// TODO: Validacion de campos del formulario
const validar_formulario = (validaciones, toast = false) => {
	var errores = [];
	var valor = "";
	var enviar = true;
	var tmp = "";
	validaciones.forEach(function(validacion, i){

		// console.log(validacion[0])
		if(validacion[0]) 
		{
			var valor = document.getElementById(validacion[0]).value;

			for (var i = 2; i < validacion.length; i++) {
				var tmp = validacion[i].split("=");

				if(tmp[0] == 'required')
				{
					if(valor == "" || valor == null)
					{
						errores.push([validacion[0], "Este campo es obligatorio.", "El campo "+validacion[1]+" es obligarorio."]);
						break;
					}
				}
				else
				if(tmp[0] == 'length')
				{
					var valores = tmp[1].split(",");

					if(valor.length < valores[0] || valores.length > valores[1])
					{
						errores.push([validacion[0], 'El campo debe contener entre '+valores[0]+' y '+valores[1]+' caracteres.', 'El campo debe contener entre '+valores[0]+' y '+valores[1]+' caracteres.']);
						break;
					}
				}
				else
				if(tmp[0] == 'lengthPass')
				{
					var valores = tmp[1].split(",");
					if(valor != "")
					{
						if(valor.length < valores[0] || valor.length > valores[1])
						{
							errores.push([validacion[0], 'El campo debe contener entre '+valores[0]+' y '+valores[1]+' caracteres.', 'El campo debe contener entre '+valores[0]+' y '+valores[1]+' caracteres.']);
							break;
						}
					}
				}
				else
				if(tmp[0] == 'email') 
				{
					if(!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)))
					{
						errores.push([validacion[0], 'El correo electrónico debe ser válido. Ej: nombre@correo.com', 'El correo electrónico debe ser válido. Ej: nombre@correo.com']);
						break;
					}
				}
				else 
				if(tmp[0] == 'confirmacion')
				{
					var tmpC = validacion[0].split("_");
					var password = document.getElementById(tmpC[0]+'_password').value;
					var password2 = document.getElementById(tmpC[0]+'_password2').value;
					if(password != password2)
					{
						errores.push([validacion[0], "Los campos deben coincidir", 'El campo '+validacion[1]+ ' es obligatorio']);
					}
				}
				else 
				if(tmp[0] == 'telefono')
				{
					if(valor.length < 10)
					{
						errores.push([validacion[0], 'El numero debe ser válido. Ej: 1234567890 o (602)1234567', 'El numero debe ser válido. Ej: 1234567890 o (602)1234567']);
						break;
					}
				}
				else 
				if(tmp[0] == 'imagen')
				{
					if(document.getElementById(`${validacion[0]}C`) != null) {

						var imagen = document.getElementById(`${validacion[0]}C`)
						if(!imagen.value)
						{
							var tmp = document.getElementById(validacion[0]).files;
							if(tmp.length == 0)
								errores.push([validacion[0], "Este campo es obligatorio.", "El campo "+validacion[1]+" es obligarorio."]);
						}

					} else {

						var tmp = document.getElementById(validacion[0]).files;
						if(tmp.length == 0) {
							errores.push([validacion[0], "Este campo es obligatorio.", "El campo "+validacion[1]+" es obligarorio."]);
							break;
						}

					}
				}
				else
				if(tmp[0] == 'numero')
				{
					if(!(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(valor)))
					{
						errores.push([validacion[0], "El numero debe ser válido. Ej: 1234567890", "El numero debe ser válido. Ej: 1234567890"]);
						break;
					}
				}
				else
				if(tmp[0] == 'precio')
				{
					var precio = desajustar_valor(valor);
					if(isNaN(precio))
					{
						errores.push([validacion[0], "El precio debe ser válido. Ej: $1.000", "El precio debe ser válido. Ej: $1.000"]);
						break;
					}
				}
				else
				if(tmp[0] == 'porcentaje')
				{
					var precio = desajustar_procentaje(valor);
					if(!(/^-?\d+$/.test(precio)))
					{
						errores.push([validacion[0], "El precio debe ser válido. Ej: 1%", "El precio debe ser válido. Ej: 1%"]);
						break;
					}
				}
				else
				if(tmp[0] == 'url')
				{
					const url = url_valida(valor);
					if(valor > 0 && !url) {
						errores.push([validacion[0], "La url tiene que ser valida", "La url tiene que ser valida"]);
						break;
					}
				}
				else
				if(tmp[0] == "archivo")
				{
					var tmp = document.getElementById(validacion[0]).files;
					if(!tmp.length) {
						errores.push([validacion[0], "Este campo es obligatorio.", "El campo "+validacion[1]+" es obligarorio."]);
						break;
					}
				}
				else
				if(tmp[0] == "ckeditor")
				{
					const instances = CKEDITOR.instances;
					const contenido = instances[validacion[0]].getData();

					if(contenido == "" || contenido == null) {
						errores.push([validacion[0], "Este campo es obligatorio.", "El campo "+validacion[1]+" es obligarorio."]);
						break;
					}
						
				}
			}
		}

		
	})


	if(toast && errores.length > 0)
	{
		errores.forEach(function(errorT, index){
			M.toast({html: errorT[2], classes: 'toastdone'});
			document.getElementById(errorT[0]).classList.add("input-error");
		});
		enviar = false;
	}
	else
	if(errores.length > 0)
	{
		for (var i = 0; i < errores.length; i++) {
			document.getElementById(errores[i][0]).classList.add("input-error");
			
			if(document.getElementById('error.'+errores[i][0]) == undefined) {
				document.querySelector(`[data-field="${errores[i][0]}"]`).innerHTML = errores[i][1];
			} else {
				document.getElementById('error.'+errores[i][0]).innerHTML = errores[i][1];
			}
		}		

		enviar = false;
	}
	return enviar;
}