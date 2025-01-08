package com.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductDTO{
	
    @NotBlank(message = "Nome não pode estar vazio.")
	private String productName;
	
    @NotBlank(message = "Descrição não pode estar vazio.")
	private String description;
	
    @NotNull(message = "Preço não pode estar vazio.")
	private Double price;
	
	private Integer quantity;

	public ProductDTO(){	
	}
	
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
}
