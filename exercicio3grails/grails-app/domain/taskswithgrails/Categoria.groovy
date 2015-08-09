package taskswithgrails

class Categoria {

    static constraints = {
    	descricao(unique: true)
    }

    

    static mapping = {
    	sort descricao: "asc"
    }

    String descricao

    String toString(){
    	return descricao
    }

}
