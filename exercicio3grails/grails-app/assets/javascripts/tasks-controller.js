tasksController = function() {
	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	
	var taskPage;
	var initialised = false;
	var totalRegister = 0;
	var item1;	
	
	return {		
		init : function(page, callback) {
			if (initialised) {
				callback()
			} else {
				if(!initialised) {
					taskPage = page;
					storageEngine.init(function() {
						storageEngine.initObjectStore('task', function() {
							callback();
						}, errorLogger) 
					}, errorLogger);
				
					$(taskPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
					$(taskPage).find('tbody tr:even').addClass('even');

					$(taskPage).find('#btnAddTask').click(function(evt) {
						evt.preventDefault();
						$(taskPage).find('#taskCreation').removeClass('not');
					});

					$(taskPage).find('tbody tr').click(function(evt) {
						$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHighlight');
					});


					//listener for completeRow 
					$(taskPage).find('#tblTasks tbody').on('click', '.completeRow', function(evt) {
						storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							console.log(task.completed);
							task.completed = 1;
							console.log(task.completed);
							storageEngine.save('task', task, function() {
								$(taskPage).find('#tblTasks tbody').empty();
								tasksController.loadTasks();
							}, errorLogger);
						}, errorLogger);
					});


					//listener for deleteRow
					$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow',
						function(evt) {
							console.log('teste');
							storageEngine.delete('task', $(evt.target).data().taskId,
								function() {
									$(taskPage).find('#tblTasks tbody').empty();
									tasksController.loadTasks();
								}, errorLogger);
						}
					);

				
					//listener for editRow
					$(taskPage).find('#tblTasks tbody').on('click', '.editRow',
						function(evt) {
							$(taskPage).find('#taskCreation').removeClass('not');
							storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
								$(taskPage).find('form').fromObject(task);
							}, errorLogger);
						}
					);				
						
					//listener for saveTask	
					$(taskPage).find('#saveTask').click(function(evt) {
						evt.preventDefault();
						if ($(taskPage).find('form').valid()) {
							var task = $(taskPage).find('form').toObject();
							storageEngine.save('task',
								task,
								function() {
									$(taskPage).find('#tblTasks tbody').empty();
									tasksController.loadTasks();
									$(taskPage).find('form').trigger('reset');
									$(taskPage).find('#taskCreation').addClass('not');
								}, errorLogger);
						}
					});
	

					/**************************************************
					* 2 - Com esse listner é possiovel ativar a ação  *
					* de limpar o conteúdo do formulário com o uso do *
					* trigger do jQuery que dispara uma funcao nativa *
					* do java script denominada  'reset'              *
					**************************************************/
					$(taskPage).find('#clearTask').click(function(evt) {
						evt.preventDefault();
						$(taskPage).find('form').trigger('reset');
					});
					

					//listener for sorting registers when clicking in head
					$('#tblTasks').each(function() {
						var $table = $(this);
						$('th', $table).each(function(column) {
							var $header = $(this);
							$header
								.addClass('clickable')
								.hover(
									function() {
										$header.addClass('hover');
									},
									function() {
										$header.removeClass('hover');
									})
								.click(function() {
									$header.hasClass('asc') ?
										$header.removeClass('asc').addClass('desc') : $header.removeClass('desc').addClass('asc');
									var rows = $table.find('tbody > tr').get();

									rows.sort(function(a, b) {
										var keyA = $(a).children('td').eq(column).text().toUpperCase();
										var keyB = $(b).children('td').eq(column).text().toUpperCase();

										if (keyA > keyB) {
											return ($header.hasClass('asc')) ? 1 : -1;
										}
										if (keyA < keyB) {
											return ($header.hasClass('asc')) ? -1 : 1;
										}
										return 0;
									});

									$.each(rows, function(index, row) {
										$table.find('tbody').append(row);
									});
								});
						});
					});

					initialised = true;
				}
			}
    	},
		loadTasks : function() {
			storageEngine.findAll('task', 
			function(tasks) {
				
				/******************************************************************
				* 5 - Exibindo as tarefas de forma ordenadas na aplicação atraves *
				* da função sort, ordenando com base na data da tarefa. Para isso *
				* recupero todo registros do grid, pego especificamente o valor   *
				* da propriedade requiredBy (onde consta as datas), comparo entre * 
				* si e ordendo do menor para o maior para exibição                *
		        ******************************************************************/

				tasks.sort(function(x, y){
				return ((x.requiredBy < y.requiredBy) ? -1 : ((x.requiredBy > y.requiredBy) ? 1 : 0));
				});
				
				//zera o contador
				totalRegister = 0;
				
				$.each(tasks, function(index, task) {
					$('#taskRow').tmpl(task ).appendTo( $(taskPage ).find( '#tblTasks tbody'));
					
					var myRowId = "#"+task.id;

					if(Date.today().compareTo( Date.parse(task.requiredBy)) == 1){
						$(myRowId).addClass('overdue');
					}else{
						$(myRowId).addClass('warning');
					}

					
					if (!task.completed){
						totalRegister++; 
					}
				});


				/************************************************************* 
				* 1 - Atualizo a contagem no rodapé ao carregar os registros * 
				* ou quando a as acoes Salvar, Editar,Completar e Deletar    *
				* são realizadas fazendo uso do contado totalRegister que    * 
				* armazena apenas o total de registros não completados       *
				*************************************************************/
				$("#taskCount").html(totalRegister);
			}, 
			errorLogger);
		}
	}
}();