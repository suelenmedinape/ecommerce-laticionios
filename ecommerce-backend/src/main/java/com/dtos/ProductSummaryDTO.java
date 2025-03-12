package com.dtos;

import java.math.BigDecimal;

import com.domain.Product;
import com.enums.Category;

public class ProductSummaryDTO {
	
	private Long id;
	private String productName;
	private BigDecimal price;
	private Category category;

	public ProductSummaryDTO() {
	}
	
	public ProductSummaryDTO(Long id, String productName, BigDecimal price, Category category) {
		super();
		this.id = id;
		this.productName = productName;
		this.price = price;
		this.category = category;
	}



	public ProductSummaryDTO(Product product) {
		this.id = product.getId();
		this.productName = product.getProductName();
		this.price = product.getPrice();
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
}
