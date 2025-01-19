package com.dtos;

import java.math.BigDecimal;

import com.domain.Product;

public class ProductSummaryDTO {
	
	private Long id;
	private String productName;
	private BigDecimal price;

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

	public BigDecimal getPrice() {
		return price;
	}
}
