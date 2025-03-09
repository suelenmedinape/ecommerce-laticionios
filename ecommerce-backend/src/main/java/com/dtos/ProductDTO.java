package com.dtos;

import java.math.BigDecimal;

import com.domain.Product;
import com.enums.Category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductDTO{
	
    @NotBlank(message = "Nome não pode estar vazio.")
	private String productName;
	
    @NotBlank(message = "Descrição não pode estar vazio.")
	private String description;
	
    @NotNull(message = "Preço não pode estar vazio.")
	private BigDecimal price;
	
	private Integer quantity;
	
	private Category category;

	public ProductDTO(){	
	}
	
	public ProductDTO(Product product) {
		this.productName = product.getProductName();
		this.description = product.getDescription();
		this.price = product.getPrice();
		this.quantity = product.getQuantity();
		this.category = product.getCategories();
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getCategories() {
		return category.getDescricao();
	}

	public void setCategory(String category) {
	    this.category = Category.fromDescricao(category);
	}

}
