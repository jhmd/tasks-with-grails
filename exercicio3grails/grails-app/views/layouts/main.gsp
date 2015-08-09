<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Tarefas</title>
	<asset:stylesheet src="02-tasks.css"/>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<asset:javascript src="jquery.validate.min.js"/>
	<asset:javascript src="date.js"/>
	<asset:javascript src="jquery.tmpl.min.js"/>
	<asset:javascript src="jquery-serialization.js"/>
	<asset:javascript src="tasks-controller.js"/>
	<asset:javascript src="tasks-storage.js"/>

	<g:layoutHead/>
</head>
<body>
	<header>
		<span>Lista de Tarefas</span>
	</header>
	<g:layoutBody/>
	
	
	<footer>Você tem <span id="taskCount">0</span> tarefas</footer>
</body>

</html>



