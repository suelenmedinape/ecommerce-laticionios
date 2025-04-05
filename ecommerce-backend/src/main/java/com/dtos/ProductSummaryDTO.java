package com.dtos;

import java.math.BigDecimal;

import com.domain.Product;
import com.enums.Category;

public class ProductSummaryDTO {
	
	private Long id;
	private String productName;
	private BigDecimal price;
	private Integer quantity;
	private Category category;

	public ProductSummaryDTO() {
	}
	
	public ProductSummaryDTO(Long id, String productName, BigDecimal price, Integer quantity, Category category) {
		super();
		this.id = id;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
		this.category = category;
	}



	public ProductSummaryDTO(Product product) {
		this.id = product.getId();
		this.productName = product.getProductName();
		this.price = product.getPrice();
		this.quantity = product.getQuantity();
		this.category = product.getCategories();
	}

	public Long getId() {
		return id;
	}

	public String getProductName() {
		return productName;
	}

	public BigDecimal getPrice() {
		return price;
	}
	
	public String getCategories() {
		return category.getDescricao();
	}

	public void setCategory(String category) {
	    this.category = Category.fromDescricao(category);
	}
	
	public Integer getQuantity() {
		return quantity;
	}
}
