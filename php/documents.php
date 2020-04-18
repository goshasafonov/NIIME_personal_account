<?php 
if (!empty($_FILES['niime_documents']['tmp_name'])) { 
	$path = $_SERVER['DOCUMENT_ROOT']."/upload/".$_FILES['niime_documents']['name'];

	if (copy($_FILES['niime_documents']['tmp_name'], $path)){
		
		echo $path.'<br>'.$_POST['niime_documents_comment'];
	}
}



?>