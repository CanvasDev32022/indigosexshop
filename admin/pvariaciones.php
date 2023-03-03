<?php 
	$index = 4;
	include("mod/header.php");
	include("mod/aside.php");
?>

<div class="container">
	<div class="card-panel" id="pvariaciones">
	</div>
</div>
<div id="modal-pvariaciones" class="modal modal-meddium modal-fixed-footer"></div>
<div id="modal-archivos" class="modal modal-small modal-fixed-footer"></div>
<div id="modal-auxiliar1" class="modal modal-full modal-fixed-footer"></div>
<div id="modal-auxiliar2" class="modal modal-full modal-fixed-footer"></div>

<?php
	include("mod/footer.php");
?>
<script>
	document.addEventListener("DOMContentLoaded", () => {
		const id = getUrlParam('c');
		plantillas('pvariaciones', '', <?php echo $usr_rol ?>, cms_pagina, cms_busqueda, id);
	});
</script>