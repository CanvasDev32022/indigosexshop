/* Variables Globales */
let cms_traducciones = "";
let cms_idioma = "";
let cms_datos = [];
let rol_global = 0;
let validaciones_global = [];

// TODO: Arreglo de meses para graficas
const meses = [
	{id:1, name:'Enero'}, 
	{id:2, name:'Febrero'}, 
	{id:3, name:'Marzo'}, 
	{id:4, name:'Abril'}, 
	{id:5, name:'Mayo'}, 
	{id:6, name:'Junio'}, 
	{id:7, name:'Julio'}, 
	{id:8, name:'Agosto'}, 
	{id:9, name:'Septiembre'},
	{id:10, name:'Octubre'}, 
	{id:11, name:'Noviembre'}, 
	{id:12, name:'Diciembre'}
];

// TODO: Configuración Basica del
const basicCkeditor = {
	toolbar: ['heading', '|', 'bold', 'italic', 'fontSize', 'alignment', '|', 'blockQuote', 'undo', 'redo']
}