package com.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_order_item")
public class OrderItem {

	@EmbeddedId
    private OrderItemPK id;

	private Double unitPrice;
	private Integer quantity;
	private Double totalPrice;

	public OrderItem() {
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
		this.totalPrice = calculateTotalPrice();
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
		this.totalPrice = calculateTotalPrice();
	}

	public Double getTotalPrice() {
		return totalPrice;
	}
	
	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public OrderItemPK getId() {
		return id;
	}

	public void setId(OrderItemPK id) {
		this.id = id;
	}

	public Double calculateTotalPrice() {
		if (unitPrice != null && quantity != null) {
			return unitPrice * quantity;
		}
		return 0.0;
	}
}
