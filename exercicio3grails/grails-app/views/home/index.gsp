<html>
<head>
	<meta name="layout" content="main">
</head>
<body>

	<main id="taskPage">
	<span style="margin:20px;">
		<a href="categoria">Categorias</a>
	</span>

		<section id="taskCreation" class="not">
			<form id="taskForm">
				<input type="hidden" name="id" />															
				<input type="hidden" name="completed"  />	
				<div>
					<label>Tarefa</label> 
					<input type="text" required="required" name="task" class="large" placeholder="Estudar e programar" maxlength="200" />
				</div>
				<div>
					<label>Finalizar até</label> <input type="date" required="required" name="requiredBy" />
				</div>
				<div>
					<label>Categoria</label> 
					<select name="category" required="required">
						<g:each in="${categorias}">
							<option value="${it.id}">${it.descricao}</option>						
						</g:each>
					</select>
				</div>
				<nav>
					<a href="#" id="saveTask">Salvar tarefa</a> <a href="#" id="clearTask">Limpar tarefa</a>
				</nav>
			</form>
		</section>
		<section>
			<table id="tblTasks">
				<colgroup>
				<col width="40%">
				<col width="15%">
				<col width="15%">
				<col width="30%">
			</colgroup>
			<thead>
				<tr>
					<th>Nome</th>
					<th>Deadline</th>
					<th>Categoria</th>
					<th>Ações</th>						
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>
		<nav>
			<a href="#" id="btnAddTask">Adicionar tarefa</a>
		</nav>
	</section>
</main>


<script id="taskRow" type="text/x-jQuery-tmpl">
<tr id="{{= id }}">
	<td {{if completed == true}} class="taskCompleted" {{/if}} >
  		{{= task }}
	</td>
	<td {{if completed == true}} class="taskCompleted" {{/if}} >
		<time datetime="{{= requiredBy }}"> {{= requiredBy }} </time>
	</td>
	<td {{if completed == true}} class="taskCompleted" {{/if}} >
	{{= category_desc }}
	</td>
	<td>
		<nav>			
			<a href="#" {{if completed != true}} class="editRow" {{/if}} data-task-id="{{= id }}">Editar</a>
			<a href="#"  {{if completed != true}} class="completeRow" {{else}} class="required" {{/if}} data-task-id="{{= id }}">Completar</a>	
			<a href="#" class="deleteRow" data-task-id="{{= id }}">Deletar</a>
		</nav>
	</td>
</tr>
</script>

<script>
	$(document).ready(function() {
		tasksController.init($('#taskPage'), function() {
			tasksController.loadTasks();
		});	
	});


	
</script>




</body>
</html>