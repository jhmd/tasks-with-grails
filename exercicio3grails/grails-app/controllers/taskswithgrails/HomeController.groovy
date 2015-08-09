package taskswithgrails

import taskswithgrails.Categoria;
import taskswithgrails.Tasks;

class HomeController {

    def index() { 
    	[categorias: Categoria.findAll()]
    }

    def add() {
    	
    }

    def list(){
    		def map = [:]
    		Tasks.findAll().each(){
    			map.put(it.id, it.toArray())
    		}
    	render(contentType: "text/json") {
    		map
    	}
    }

    def getById() {  
    	def	task
    	task = Tasks.get(params.id)    	
    	render(contentType: "text/json") {
    		task.toArray()
    	}    	
    }

    def deletar(){    	
    	def task = Tasks.get(params.id)
    	task.delete(flush:true)
    	render(contentType: "text/json") {
    		task.toArray()
    	}
    }

    def save(){    	
    	def category = Categoria.get(params.category) 	
    	def task    	
    	task = Tasks.get(params.id)
    	if (params.id == '') {
    		task = new Tasks()
    	}
		task.completed = params.completed  	        	
    	task.task = params.task	
    	task.category = category
    	task.requiredBy = new Date().parse('yyyy-MM-dd',params.requiredBy)
    	task.save(flush: true)
    	render(contentType: "text/json") {
    		json
    	}	
    }

}
