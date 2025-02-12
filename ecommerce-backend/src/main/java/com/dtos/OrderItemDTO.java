package com.dtos;

import java.math.BigDecimal;

import com.domain.OrderItem;
import com.domain.Product;

public class OrderItemDTO {

	private Long id;
	private BigDecimal unitPrice;
	private Integer quantity;
	private BigDecimal totalPrice;
    private Product product;
    
	public OrderItemDTO(OrderItem orderItem) {
		this.id = orderItem.getId();
		this.unitPrice = orderItem.getUnitPrice();
		this.quantity = orderItem.getQuantity();
		this.totalPrice = orderItem.getTotalPrice();
		this.product = orderItem.getProduct();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
}
