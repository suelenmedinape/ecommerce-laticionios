package com.dtos;

import com.domain.Product;

public class ProductSummaryDTO {
	
	private Long id;
	private String productName;
	private Double price;

	public ProductSummaryDTO() {
	}
	
	public ProductSummaryDTO(Product product) {
		this.id = product.getId();
		this.productName = product.getProductName();
		this.price = product.getPrice();
	}

	public Long getId() {
		return id;
	}

	public String getProductName() {
		return productName;
	}

	public Double getPrice() {
		return price;
	}
}
