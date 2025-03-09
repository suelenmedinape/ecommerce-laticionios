package com.enums;

public enum Category {
	LEITE("Leite"), QUEIJO("Queijo"), IOGURTE("Iogurte"), MANTEIGA("Manteiga"), CREME_DE_LEITE("Creme de Leite"),
	REQUEIJÃO("Requeijão"), LEITE_CONDENSADO("Leite Condensado"), DOCE_DE_LEITE("Doce de Leite");

	private final String descricao;

	Category(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
	public static Category fromDescricao(String descricao) {
	    for (Category categoria : Category.values()) {
	        if (categoria.getDescricao().equalsIgnoreCase(descricao.trim())) {
	            return categoria;
	        }
	    }
	    throw new IllegalArgumentException("Categoria inválida: " + descricao);
	}
}
