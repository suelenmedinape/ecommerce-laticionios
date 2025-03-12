package com.dtos;

import java.math.BigDecimal;

import com.domain.Product;
import com.enums.Category;

public class ProductRankingDTO {
	
	private Long id;
	private String productName;
	private BigDecimal price;
	private Category category;
	private Long totalSold;

	public ProductRankingDTO() {
	}
	
	public ProductRankingDTO(Long id, String productName, BigDecimal price, Category category, Long totalSold) {
		super();
		this.id = id;
		this.productName = productName;
		this.price = price;
		this.category = category;
		this.totalSold = totalSold;
	}

	public ProductRankingDTO(Product product) {
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

	public Long getTotalSold() {
		return totalSold;
	}

	public void setTotalSold(Long totalSold) {
		this.totalSold = totalSold;
	}
}
