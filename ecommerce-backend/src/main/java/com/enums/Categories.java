package com.enums;

public enum Categories {
	LEITE("Leite"), QUEIJO("Queijo"), IOGURTE("Iogurte"), MANTEIGA("Manteiga"), CREME_DE_LEITE("Creme de Leite"),
	REQUEIJÃO("Requeijão"), LEITE_CONDENSADO("Leite Condensado"), DOCE_DE_LEITE("Doce de Leite");

	private final String descricao;

	Categories(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
}
