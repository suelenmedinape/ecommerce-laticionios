package com.dtos;

import java.math.BigDecimal;
import java.util.Date;

import com.domain.Order;
import com.enums.OrderStatus;

public class OrderDTO {

	private Long id;
	private Date date;
	private BigDecimal totalValue;	
	private OrderStatus orderStatus;
	
	public OrderDTO() {		
	}
	
	public OrderDTO(Order order) {	
		this.id = order.getId();
		this.date = order.getDate();
		this.totalValue = order.getTotalValue();
		this.orderStatus = order.getOrderStatus();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public BigDecimal getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(BigDecimal totalValue) {
		this.totalValue = totalValue;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
}
