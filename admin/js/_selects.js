const cargar_select = (select, valor, cmp, id=0) => {
	
	if(select == "vdetalles") 
	{
		var xhr = new XMLHttpRequest();
		var params 	= `id=${id}&action=${select}`;
		xhr.open("POST", `inc/selects.php`,true);
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

						let index = 0;
						const datos 	= JSON.parse(data);
						// Eliminamos las opciones del select, exceptuando las dos primeras
						var control = cmp[0].selectize;
						control.setValue(0);
						control.clearOptions();
						control.addOption({'value': "", 'text': "Selecciona una opción", 'disabled': true});
						// Cargamos los datos
						for(var i=0; i < datos.length; i++)
							control.addOption({'value': datos[i]['vrd_id'], 'text': datos[i]['vrd_nombre']});
						//Refrescamos
						control.refreshOptions();
					}
		
				} else {
					M.toast({html: `Ha ocurrido un error, verifique su conexión a Internet`, classes: 'toasterror'});
				}
			}
		}
	}
	
}


function reiniciar_select(cmp, mensaje)
{
	var control = cmp[0].selectize;
	control.setValue(0);
	control.clearOptions();
	control.addOption({'value': "", 'text': mensaje});
	//control.refreshOptions();
}