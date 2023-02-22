const cargar_registros = (seccion,pagina,busqueda,action="lista", id=0) => {
	// console.log({seccion, pagina, busqueda, action, id});

	const url = id ? "?s="+busqueda+"&p="+pagina+"&c="+id : "?s="+busqueda+"&p="+pagina;
	const cmp = document.getElementById(seccion);
	var xhr 	= new XMLHttpRequest();
	var params 	= "busqueda="+busqueda+"&pagina="+pagina+"&idioma="+cms_idioma+"&action="+action+"&id="+id;
	xhr.open("POST", "inc/"+seccion+".php",true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
	//console.log(params);
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4)
		{
			if(xhr.status == 200)
			{
				var tmpA = xhr.responseText.trim().split("::");
				data = xhr.responseText.trim().split("::")[0];
				var rol = xhr.responseText.trim().split("::")[tmpA.length - 1];

				if(document.getElementById(seccion+'-container') == null)
					document.getElementById(seccion).innerHTML = plantillas(seccion, "", rol, pagina, busqueda);

				// console.log(data);
				if(data < 0)
					M.toast({html: "Ha ocurrido un error. Por favor, intente de nuevo. Código: "+data, classes: 'toasterror'});
				else
				if(data == 0)
				{
					document.getElementById('resultado').innerHTML = "";
					document.getElementById('paginador').innerHTML = "";
					document.getElementById('paginadorB').innerHTML = "";
					var registrosC = document.getElementById('registros');
					registrosC.innerHTML = "No hay registros";
					busqueda = "";
					pagina = 1;
					history.pushState(null, "", url);
				}
				else
				{
					data = xhr.responseText.trim();
					// Separamos los resultados del número de páginas y página actual
					// console.log(data);
					data = data.split("::");
					var datos 	= JSON.parse(data[0]);
					var paginas = parseInt(data[1]);
					var pagina 	= parseInt(data[2]);
					var registros = parseInt(data[3]);
					

					// Mostramos los resultados
					var contenedor = document.getElementById('resultado');
					contenedor.innerHTML = "";
					for(var i=0; i<datos.length; i++)
						contenedor.innerHTML = contenedor.innerHTML + plantillas(seccion+'_lista', datos[i], rol, pagina, busqueda);

					// Paginación
					var paginador  = document.getElementById('paginador');
					var paginadorB = document.getElementById('paginadorB');
					// Verificamos qué números de páginas deben mostrarse
					if(paginas > 5 && pagina > 3)
					{
						if((pagina + 2) > paginas)
							superior = paginas;
						else
							superior = pagina + 2;

						if((superior - 4) < 1)
							inferior = 1;
						else
							inferior = superior - 4;
					}
					else
					if(paginas > 5)
					{
						var inferior = 1;
						var superior = 5;
					}
					else
					{
						var inferior = 1;
						var superior = paginas;
					}
					// Mostramos las páginas del paginador
					paginador.innerHTML = "";
					for(var i=inferior; i<=superior; i++)
					{
						if(i == (pagina))
							paginador.innerHTML = paginador.innerHTML +
								'<li class="active"><a>'+i+'</a></li>';
						else
							paginador.innerHTML = paginador.innerHTML +
								`<li class="waves-effect"><a onclick="cargar_registros('${seccion}',${i},'${busqueda}')">${i}</a></li>`;
					}
					paginadorB.innerHTML = paginador.innerHTML;
					// Verificamos si el botón atrás está activo

					//variable de idioma
					var p1 = "Primera página";
					var pU = "Ultima página";

					if(pagina == 1)
					{
						paginador.innerHTML = `<li title="${p1}" class="disabled"><a><i class="material-icons">first_page</i></a></li>` + paginador.innerHTML;
						paginadorB.innerHTML = `<li title="${p1}" class="disabled"><a><i class="material-icons">first_page</i></a></li>` + paginadorB.innerHTML;
					}
					else
					{
						paginador.innerHTML = `<li title="${p1}" class="waves-effect"><a onclick="cargar_registros('${seccion}',1,'${busqueda}','${action}')"><i class="material-icons">first_page</i></a></li>` + paginador.innerHTML;
						paginadorB.innerHTML = `<li title="${p1}" class="waves-effect"><a onclick="cargar_registros('${seccion}',1,'${busqueda}','${action}')"><i class="material-icons">first_page</i></a></li>` + paginadorB.innerHTML;
					}
					// Verificamos si el botón adelante está activo
					if(pagina == paginas)
					{
						paginador.innerHTML = paginador.innerHTML + `<li title="${pU}" class="disabled"><a><i class="material-icons">last_page</i></a></li>`;
						paginadorB.innerHTML = paginadorB.innerHTML + `<li title="${pU}" class="disabled"><a><i class="material-icons">last_page</i></a></li>`;
					}
					else
					{
						paginador.innerHTML = paginador.innerHTML + `<li title="${pU}" class="waves-effect"><a onclick="cargar_registros('${seccion}',${paginas},'${busqueda}','${action}')"><i class="material-icons">last_page</i></a></li>`;
						paginadorB.innerHTML = paginadorB.innerHTML + `<li title="${pU}" class="waves-effect"><a onclick="cargar_registros('${seccion}',${paginas},'${busqueda}','${action}')"><i class="material-icons">last_page</i></a></li>`;
						//console.log(paginador);
					}
					// Cargamos la info de registros
					var registrosC = document.getElementById('registros');
					registrosC.innerHTML = `<b>Registros:</b> ${registros} - <b>Páginas: </b>${paginas}`;
					// Modificamos la URL
					history.pushState(null, "", url);
				}
			}
			else
				M.toast({html: "Ha ocurrido un error. verifique su conexión a Internet", classes: 'toasterror'});
		}
	}
}
const eliminar_registro = (id, seccion, pagina, busqueda, action='lista', datos) => {
	Swal.fire({
		title: "¿Estás seguro de eliminar el registro?",
		text:  "Una vez eliminado no podrá ser recuperado",
		icon: "error",
		showCancelButton: true,
		confirmButtonColor: '#19a0c9',
		cancelButtonColor: '#003359',
		confirmButtonText: "Confirmar",
		cancelButtonText: "Cancelar",
		reverseButtons: true
	})

		.then((result) => {
			if (result.isConfirmed)
		{
			var xhr_usr = new XMLHttpRequest();
			var params = "id="+id+"&action=eliminar";
			xhr_usr.open("POST", "inc/"+seccion+".php",true);
			xhr_usr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr_usr.send(params);
			xhr_usr.onreadystatechange = function()
			{
				if(xhr_usr.readyState == 4)
				{
					if(xhr_usr.status == 200)
					{
						var data = xhr_usr.responseText.trim();
						console.log(data);
						if(data < 0)
							M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+data, classes: 'toasterror'});
						else
						{
							M.toast({html: "El registro ha sido eliminado correctamente.", classes: 'toastdone'});
							cargar_registros(seccion, pagina, busqueda, action, datos);

						}
					}
					else
						M.toast({html: "Ha ocurrido un error, verifique su conexión a Internet", classes: 'toasterror'});
				}
			}
		} 
	});
}

/*TODO: FUNCION DE ACCESO */
const validar_acceso = (indice, rol) => {
	const boton = indice;
	const accesos = accesos_botones[boton].split(",");

	const acceso = accesos.indexOf(rol) > -1 ? 1 : 0;
	return acceso;
}

/* Secundarias */
function texto2moneda(cmp){
	if(cmp.value != "")
	{
		var valor = cmp.value;
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		var entero = parseInt(valor);
		if(isNaN(entero))
			cmp.value = 0;
		else
			cmp.value = '$'+new Intl.NumberFormat("de-DE").format(entero);
	}
}

function moneda2texto(valor){
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	return valor;
}

function copiar_contenido(cmp){
	var seleccion = document.createRange();
	seleccion.selectNodeContents(cmp);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(seleccion);
	var res = document.execCommand('copy');
	window.getSelection().removeRange(seleccion);
	if(res)
		M.toast({html: cms_traducciones[0][cms_idioma]['mensaje5'], classes: 'toastdone'});
}

// TODO: Formatear fecha
const formato_fecha = (fecha, idioma="es", metodo=0) => {
	if(fecha == '0000-00-00 00:00:00')
		return '0000-00-00';
	else
	{
		var tmp = fecha.split(" ");
		var tmpF = tmp[0].split("-");
		//console.log(tmpF);
		if(tmp[1] != undefined)
		var hora = tmp[1].split(":");

		if(tmpF[1] == "01")
			var mes = 'Enero';
		else
		if(tmpF[1] == "02")
			var mes = 'Febrero';
		else
		if(tmpF[1] == "03")
			var mes = 'Marzo';
		else
		if(tmpF[1] == "04")
			var mes = 'Abril';
		else
		if(tmpF[1] == "05")
			var mes = 'Mayo';
		else
		if(tmpF[1] == "06")
			var mes = 'Junio';
		else
		if(tmpF[1] == "07")
			var mes = 'Julio';
		else
		if(tmpF[1] == "08")
			var mes = 'Agosto';
		else
		if(tmpF[1] == "09")
			var mes = 'Septiembre';
		else
		if(tmpF[1] == "10")
			var mes = 'Octubre';
		else
		if(tmpF[1] == "11")
			var mes = 'Noviembre';
		else
		if(tmpF[1] == "12")
			var mes = 'Diciembre';
		else
			return 'Sin establecer';

		mesA = mes.substring(0,3); // Abreviación del mes a 3 caracteres desde el primer caracter.
	 
		if(tmp[1] != undefined){
				if(metodo == 0){
						return mes+" "+tmpF[2]+" / "+tmpF[0]+" - "+hora[0]+":"+hora[1];
				}
				if(metodo == 1){
						return mesA+" "+tmpF[2]+" / "+tmpF[0]+" - "+hora[0]+":"+hora[1];
				}
		}else{
				if(metodo == 0){
						return mes+" "+tmpF[2]+" / "+tmpF[0];
				}
				if(metodo == 1){
						return mesA+" "+tmpF[2]+" / "+tmpF[0];
				}
		}
	}
};

function obtener_variables(){
	var url = window.location.search.split("?");
	url = url[1].split("&");
	var variables = [];
	for(var i=0; i<url.length; i++)
	{
		var temp = url[i].split("=");
		if(temp[0] == 'p')
			variables[0] = temp[1];
		if(temp[0] == 's')
			variables[1] = temp[1];
	}

	return variables;
}

function cambiar_idioma(idioma){
	console.log(idioma);
	var xhr 	= new XMLHttpRequest();
	var params 	= "idioma="+idioma+"&action=set_idioma";
	xhr.open('POST', 'inc/configuracion.php',true);
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
					M.toast({html: cms_traducciones[0][cms_idioma]['mensaje4'+":"]+data, classes: 'toasterror'});
				else
				{
					
					location.reload();
				}
			}
			else
				M.toast({html: cms_traducciones[0][cms_idioma]['mensaje3']+".", classes: 'toasterror'});
		}
	}
}

function decimal(x) {
	return Number.parseFloat(x).toFixed(1);
}

const ajustarPrecio = (valor) => {
	const precio = `$ ${valor.toLocaleString('de-DE')}`;
	return precio;
}

function zeroFill( number, width )
{
	width -= number.toString().length;
	if ( width > 0 )
	{
		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
	}
	return number + ""; // always return a string
}

function buscar(seccion, cmp){
	var variables = obtener_variables();
	var busqueda = document.getElementById(cmp).value;
	var pagina = variables[0];

	if(event.which == 13 || event.which == 9)
	{
		if(localStorage.busqueda == "")
			var action = "lista";
		else
			var action = localStorage.busqueda;

		cargar_registros(seccion, pagina, busqueda, action);
	}
}

function mostrar_detalle(cmp)
{
	var detalles = cmp;
	document.getElementById('modal-auxiliar1').innerHTML = 
	`
		<div class="modal-content">
			<span class="modal-action modal-close"><i class="material-icons">cancel</i></span>
			<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
				<div class="container mt-0">
					<div class="row mb-0">
						<div class="col s12 m11 l11">
							<h5 class="breadcrumbs-title mt-0 mb-0"><span>${cms_traducciones[0][cms_idioma]['Detalles del registro']}</span></h5>
						</div>
					</div>
				</div>
			</div>

			<div class="panel">
				<div class="row">
					
					<div class="col m12 s12">

						${detalles}
					</div>
				</div>
			</div>
		</div>;
	`;;
	$('#modal-auxiliar1').modal({dismissible: false});
	var instance = M.Modal.getInstance(document.getElementById('modal-auxiliar1'));
	instance.open();
}

// TODO: ESTABLECER ESTADO ACTIVO | INACTIVO
const establecer_estado = (estado) => {
	if(estado)
		return `<span class="verde_ hide-on-med-and-down" title="Activo">■</span><span class="verde_ hide-on-large-only">•</span>`;
	else
		return `<span class="rojo_ hide-on-med-and-down" title="Inactivo">■</span><span class="rojo_ hide-on-large-only">•</span>`;
}

// TODO: AJUSTAR PRECIO EN MODULOS
const ajustar_valor = (cmp) => {

	if(cmp.value != "") {

		var valor = cmp.value;
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace(".", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		valor = valor.replace("$", "");
		var entero = parseInt(valor);

		cmp.value = isNaN(entero) ? 0 : `$ ${new Intl.NumberFormat("de-DE").format(entero)}`;
	}
}

function desajustar_valor(valor){
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace(".", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	valor = valor.replace("$", "");
	return valor;
}

// TODO: AJUSTAR PORCENTAJE EN MODULOS
const ajustar_porcentaje = (cmp) => {

	if(cmp.value != "") {

		var dato = cmp.value;
		dato = dato.replace("%", "");
		dato = dato.replace("%", "");
		dato = dato.replace("%", "");
		dato = dato.replace("%", "");
		var entero = parseInt(dato);

		cmp.value = isNaN(entero) ? 0 : entero+"%";
	}
}

function desajustar_procentaje(valor){
	valor = valor.replace("%", "");
	valor = valor.replace("%", "");
	valor = valor.replace("%", "");
	valor = valor.replace("%", "");
	return valor;
}

// TODO: CREAR HIPERVINCULO EMAIL
const boton_email = (email) => {
	const boton = email != "" ? `<a href="mailto:${email}">${email}</a>` : "";
	return boton;
}

// TODO: CREAR HIPERVINCULO TELEFONO
const boton_telefono = (telefono) => {
	const boton = telefono != "" ? `<a href="tel:${telefono}">${telefono}</a>` : "";
	return boton;
}

function vacio(valor) 
{
	if(valor == "" || valor == '0000-00-00 00:00:00')
		return 'Sin registro';
	else
		return valor;
}

function locacion(valor, ruta="")
{
	if(valor == 'Sin registro')
		return 'Sin registro';
	else
		return `<a href="../uploads/cotizaciones/${ruta}/${valor}" target="blank">${valor}</a>`;
}

function mostrar_mes(mes)
{
	if(mes == 1)
		return "Ene";
	else
	if(mes == 2)
		return "Feb";
	else
	if(mes == 3)
		return "Mar";
	else
	if(mes == 4)
		return "Abr";
	else
	if(mes == 5)
		return "May";
	else
	if(mes == 6)
		return "Jun";
	else
	if(mes == 7)
		return "Jul";
	else
	if(mes == 8)
		return "Ago";
	else
	if(mes == 9)
		return "Sep";
	else
	if(mes == 10)
		return "Oct";
	else
	if(mes == 11)
		return "Nov";
	else
	if(mes == 12)
		return "Dic";
}

function obtenerFecha(id, type){
	if(type == "start")
	{

			if(id == 'Últimos 30 días')
					return moment().subtract(29, 'days');
			else
			if(id == 'Esta semana')
					return moment().startOf('week');
			else
			if(id == 'Última semana')
					return moment().subtract(1,'week').startOf('week');
			else
			if(id == 'Este mes')
					return moment().startOf('month');
			else
			if(id == 'Último mes')
					return moment().subtract(1, 'month').startOf('month');
			else
			if(id == 'Este año')
					return moment().startOf('year');
			else
			if(id == 'El año pasado')
					return moment().subtract(1, 'year').startOf('year');
			else
					return moment(localStorage.firstDate);
	}
	else
	{

			if(id == 'Últimos 30 días')
					return moment();
			else
			if(id == 'Esta semana')
					return moment().endOf('week');
			else
			if(id == 'Última semana')
					return moment().subtract(1,'week').endOf('week');
			else
			if(id == 'Este mes')
					return moment().endOf('month');
			else
			if(id == 'Último mes')
					return moment().subtract(1, 'month').endOf('month');
			else
			if(id == 'Este año')
					return moment().endOf('year');
			else
			if(id == 'El año pasado')
					return moment().subtract(1, 'year').endOf('year');
			else
					return moment();
	}
}

// TODO: VALIDAR SI ES URL
const url_valida = (url) => {
	try {
		new URL(url);
	} catch (e) {
		return false;
	}
	return true;
};

// TODO: SOBRE ESCRIBIT TITULO COLLAPSIBLE
const titulo_collapsible = (cmp) => {

	const texto = cmp.value;
	const id = cmp.id.split("_").pop();
	document.getElementById(`titulo-${id}`).innerHTML = texto;
}

function generarContraseña(tamaño){
	var slug ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var codigo= ' ';
		var max = slug.length;
		for (var i = 0; i < tamaño; i++ ) {
				codigo += slug.charAt(Math.floor(Math.random() * max));
		}

	document.getElementById('modal-auxiliar1').innerHTML = `
		<div class="modal-content">
			<h4>Modal Header</h4>
			<p>Contraseña: ${codigo}</p>
		</div>
		<div class="modal-footer">
			<a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
		</div>
	</div>
	`;
	$('#modal-auxiliar1').modal('open');
}

// TODO: Funciom para convertir string para url
const generar_slug = (cadena)  => {
	// Reemplaza los carácteres especiales | simbolos con un espacio 
	slug = cadena.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
 
	// Corta los espacios al inicio y al final del sluging 
	slug = slug.replace(/^\s+|\s+$/gm, '');
 
	// Reemplaza el espacio con guión  
	slug = slug.replace(/\s+/g, '-');

	return slug;
}

// TODO: Eliminar detalle de proyecto
const eliminar_detalle = (cmp, seccion) => {
	
	const padre = document.getElementById(seccion);
	const id = cmp.getAttribute("idC");
	const hijo = document.getElementById(id);

	const tmpE = padre.querySelectorAll("tr");
	const elements = padre.querySelectorAll("tr")[tmpE.length - 1];

	if(elements.id == id) {
		M.toast({html: 'No se puede remover, se debe mantener al menos (1) elementos vacios.', classes: 'toastwarning'});
	} else {
		
		const hijo_elements = hijo.querySelectorAll("input");
		for (var i = 0; i < validaciones_dproyecto.length; i++) {

			for (var j = 0; j < hijo_elements.length; j++) {

				const hijo_id = hijo_elements[j].id;

				if(validaciones_dproyecto[i][0] == hijo_id) {
					validaciones_dproyecto.splice(i, 1);
				}
			}
		}
		padre.removeChild(hijo)
	}
}

// TODO: Verificar los detalles existentes
const verificar_detalles = (cmp, seccion) => {

	let valor = cmp.value;
	let id = cmp.id.split("-")[0];
	let indice = cmp.id.split("-")[1];
	// // TODO: Verificamos que el item no esté vacío
	if(valor != "")
	{
		// TODO: Generamos un ID válido
		do{
			indice++;
		}
		while(document.getElementById(`${id}-${indice}`) != null);
		if(document.getElementById(`${id}-${indice - 1}`).value != "") {
			cargar_detalles_proyecto(indice, [], seccion);
		}
	}
}

// TODO: Cargar estdisticas index
const cargar_estadisticas = () => {

	var xhr = new XMLHttpRequest();
	var params 	= "action=estadisticas";
	xhr.open("POST", "inc/index.php",true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4)
		{
			if(xhr.status == 200)
			{
				res = xhr.responseText.trim();
				// console.log(res);
				if(res < 0)
					M.toast({html: 'Ha ocurrido un error. Por favor, intente de nuevo. Código: '+res, classes: 'toasterror'});
				else
				{
					const tmp = res.split("::");
					const whatsapp = JSON.parse(tmp[0]);
					const llamadas = JSON.parse(tmp[1]);
					const contactos = JSON.parse(tmp[2]);


					let lineChart = "";
					let mayor = 0;
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

					const WhatsApp = [];
					const Llamadas = [];
					const Contacto = [];
					labels.forEach((mes, i) => {

						const id = i + 1;

						whatsapp.forEach((whats, w) => {

							if(whats['whatsapp'] > mayor)
								mayor = whats['whatsapp'];

							if(id == whats['mes']) {
								WhatsApp.push(whats['whatsapp']);
							} else {
								WhatsApp.push(0);
							}

						});

						llamadas.forEach((llamada, l) => {

							if(llamada['llamada'] > mayor)
								mayor = llamada['llamada'];

							if(id == llamada['mes']) {
								Llamadas.push(llamada['llamada']);
							} else {
								Llamadas.push(0);
							}

						});

						contactos.forEach((contacto, c) => {

							if(contacto['contacto'] > mayor)
								mayor = contacto['contacto'];

							if(id == contacto['mes']) {
								Contacto.push(contacto['contacto']);
							} else {
								Contacto.push(0);
							}

						});

					});


					const data = {
						labels: labels,
						datasets: [
							{
								label: 'Llamadas',
								data: Llamadas,
								borderColor: '#003359',
								backgroundColor: '#003359'
							},
							{
								label: 'WhatsApp',
								data: WhatsApp,
								borderColor: '#0cc243',
								backgroundColor: '#0cc243'
							},
							{
								label: 'Formulario de Contacto',
								data: Contacto,
								borderColor: '#ff6223',
								backgroundColor: '#ff6223'
							}
						]
					};

					const config = {
						type: 'line',
						data: data,
						options: {
							respnsive: true,
							maintainAspectRatio: false,
							plugins: {
								legend: {
									position: 'top',
								},
								title: {
									display: true,
									text: "Estadisticas"
								}
							},
							scales: 
							{
								y: {
									beginAtZero: true,
									// the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
									suggestedMax: mayor + Math.ceil(mayor * 20 / 100),
									suggestedMin: 0,
								}
							}
						}
					}
					const ctx = document.getElementById('line-chart').getContext('2d');
					lineChart = new Chart(ctx, config);
				}
			} else {
				M.toast({html: "Ha ocurrido un error, verifique su conexión a Internet", classes: 'toasterror'});
			}
		}
	}
}

// TODO: funcion para generar password encrypt
function generarContraseña(tamaño){
	var slug ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var codigo= ' ';
		var max = slug.length;
		for (var i = 0; i < tamaño; i++ ) {
				codigo += slug.charAt(Math.floor(Math.random() * max));
		}

	document.getElementById('modal-auxiliar1').innerHTML = `
		<div class="modal-content">
			<h4>Modal Header</h4>
			<p>Contraseña: ${codigo}</p>
		</div>
		<div class="modal-footer">
			<a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
		</div>
	</div>
	`;
	$('#modal-auxiliar1').modal('open');
}

// TODO: Obtener parametro de URL
const getUrlParam = (param) => {
	const location = window.location.href;
	const url = new URL(location);
	const dato = url.searchParams.get(param) != null ? url.searchParams.get(param) : 0;
	return dato;
}

// TODO: Seleccion de colores aleatorios
const color_aleatorio = () => {
	hexadecimal = [
		'#22d5ff',
		'#1a6da0',
		'#003359',
		'#004f7f',
		'#1f9edd', 
		'#99ecff',
		'#00b7e0', 
		'#1f9eff',
		'#007fe0',
		'#17a0c8'
	];
	var color = hexadecimal.sort((a, b) => 0.5 - Math.random());
	return color;
}

// TODO: CheckBox dinamico
const checkedInput = (cmp, id, action="checked") => {

	const seccion = cmp.getAttribute("data-input");
	const activo = cmp.checked ? 1 : 0;
	var xhr = new XMLHttpRequest();
	var params 	= `idioma=${cms_idioma}&activo=${activo}&id=${id}&action=${action}`;
	xhr.open("POST", `inc/${seccion}.php`,true);
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
				} else {
					
				}
	
			} else {
				M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
			}
		}
	}
}

// TODO: Opciones de promocion par formulario productos
const activarPromocion = (cmp, porentaje = 0) => {
	const container = document.querySelector("#oferta-container");
	const checked = cmp.checked;

	if(checked) {
		container.innerHTML = `
		<div class="row m-0">
			<div class="col s12 m6 input-field">
				<input type="text" name="prd_porcentajepromocion" id="prd_porcentajepromocion" autocomplete="off" placeholder="" onkeyup="validar(this)" onchange="calcularPromocion()" value="${porentaje}">
				<label>Descuento (%)</label>
				<div class="form-error" id="error.prd_porcentajepromocion"></div>
			</div>
			<div class="col s12 m6 input-field">
				<input type="text" name="prd_preciopromocion" id="prd_preciopromocion" autocomplete="off" placeholder="" onkeyup="validar(this)" readonly>
				<label>Precio en oferta</label>
				<div class="form-error" id="error.prd_preciopromocion"></div>
			</div>
		</div>`;

		calcularPromocion();
		// TODO: Agregar Validaciones
		validaciones_global.push(
			['prd_porcentajepromocion', '','required'],
			['prd_preciopromocion', 	'','required']
		);

	} else {
		container.innerHTML = ``;
		
		const validaciones = [];
		for (var i = 0; i < validaciones_global.length; i++) {
			if(validaciones_global[i][0] != "prd_porcentajepromocion" && validaciones_global[i][0] != "prd_preciopromocion") {
				validaciones.push(validaciones_global[i]);
			}
		}
		validaciones_global = validaciones;
	}

	M.updateTextFields();
}

// TODO: Calculo de promocion para formulario productos
const calcularPromocion = () => {
	
	const precioTmp = document.getElementById('prd_precio') != null ? document.getElementById('prd_precio').value : 0;
	const precio = desajustar_valor(precioTmp);
	const porcentaje = document.getElementById('prd_porcentajepromocion') != null ? document.getElementById('prd_porcentajepromocion').value : 0;
	const descuento = parseFloat(precio) * parseFloat(porcentaje) / 100;
	const total = parseFloat(precio) - parseFloat(descuento);

	if(document.getElementById("prd_preciopromocion") != null) {
		document.getElementById("prd_preciopromocion").value = ajustarPrecio(total);
	}
}

// TODO: funcion para añadir productos relacionados
const aniadirRelacionados = (e) => {
	e.preventDefault();

	const select = document.getElementById("prd_relacionado");
	const option = select.querySelector('option[selected]');
	const id = select.value;
	const producto = option.innerHTML;

	if(id) {
		let contenido = `
		<li class="collection-item custom-item" id="rel-${id}">
			<input type="hidden" name="prd_relacionado[]" value="${id}">
			<span class="custom-title">${producto}</span>
			<div class="item-actions">
				<a onclick="eliminar_relacionado(this)" idC="rel-${id}" class="button-item btn-floating btn-small btn-xs waves-effect waves-light outline-blue" title="Eliminar"><i class="material-icons">close</i></a>
			</div>
		</li>`;

		$('#relacionado-collection').append(contenido);
		const $relacionado = $('#prd_relacionado').selectize();
		const control = $relacionado[0].selectize;
		control.clear();


	} else {
		document.getElementById("error.prd_relacionado").innerHTML = "Debe seleccionar un producto primero.";
	}
}

// TODO: Funcion para remover productos relacionados
const eliminar_relacionado = (cmp) => {

	const padre = document.getElementById("relacionado-collection");
	const id = cmp.getAttribute("idC");
	const hijo = padre.querySelector(`li[id="${id}"]`);

	padre.removeChild(hijo);
}

// TODO: Remover acentos / Tildes String
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

// TODO: 
const agregarVariantes = () => {

	const modulo = "variantes";
	const seccion_legible = "Variante";
	const seccion_singular = "variante";

	const modal = document.getElementById(`modal-archivos`);
	modal.innerHTML = loaderComponent();

	let optionVariacion = "";
	for(varaicion of validaciones_global) {
		optionVariacion = optionVariacion + `<option value="${varaicion['var_id']}">${varaicion['var_nombre']}</option>`;
	}

	modal.innerHTML = `
	<form method="POST" id="${seccion_singular}_form">
		<div id="breadcrumbs-wrapper" class="breadcrumbs-bg-image">
			<div class="container mt-0">
				<div class="row mb-0">
					<div class="col s12 m11 l11">
						<h5 class="breadcrumbs-title mt-0 mb-0"><span>Agregar ${seccion_legible}</span></h5>
					</div>
					<span class="modal-action modal-close"><i class="material-icons">close</i></span>
				</div>
			</div>
		</div>
		<div class="modal-content">
			<div class="panel">
				<div class="row">
					<div class="col s12 m8 select">
						<label>Variaciones</label>
						<select name="var_id" id="var_id">
							<option value="" selected disabled>Seleccione una opción</option>
							${optionVariacion}
						</select>
						<div class="form-error" id="error.var_id"></div>
					</div>
					<div class="col s12 m12 select">
						<label>Variaciones</label>
						<select name="vrd_id[]" id="vrd_id" multiple>
							<option value="" selected disabled>Seleccione una opción</option>
							
						</select>
						<div class="form-error" id="error.vrd_id"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<div class="row m-0">
				<div class="col s12 m4 offset-m8">
					<input type="hidden" name="action" id="action" value="crear">
					<button type="submit" id="action_${seccion_singular}" class="btn waves-effect waves-light azulclaro">Añadir</button>
				</div>
			</div>
		</div>
	</form>`;

	const $detalles = $('#vrd_id').selectize({
		plugins: ['remove_button']
	});

	const $variaciones = $('#var_id').selectize({
		onChange: (value) => {
			if(value != "") {
				cargar_select("vdetalles", 0, $detalles, value);
			}
		}
	});

	M.updateTextFields();
	validacion_variantes(modulo);

	// Configura el Modal y lo Abre 
	$(`#modal-archivos`).modal({dismissible: false});
	var instance = M.Modal.getInstance(modal);
	instance.open();
}