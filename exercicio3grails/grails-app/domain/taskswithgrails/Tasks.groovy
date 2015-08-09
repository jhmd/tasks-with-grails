package taskswithgrails

import org.grails.databinding.BindingFormat

class Tasks {

    static constraints = {
    }

    Integer id

    String task

    Boolean completed = 0

    @BindingFormat('yyyy-MM-dd')
    Date requiredBy

    Categoria category

    static belongsTo = Categoria

    def toArray() {
    	return [id: this.id, task: this.task, requiredBy: this.requiredBy.format('yyyy-MM-dd'), completed: this.completed, category_desc: this.category.descricao, category: this.category.id]
    }

}
