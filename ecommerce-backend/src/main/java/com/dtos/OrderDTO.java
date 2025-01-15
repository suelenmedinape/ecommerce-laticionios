package com.dtos;

import java.util.Date;

import com.domain.Order;

public class OrderDTO {

	private Long id;
	private Date date;
	private Double totalValue;		
	
	public OrderDTO() {		
	}
	
	public OrderDTO(Order order) {	
		this.id = order.getId();
		this.date = order.getDate();
		this.totalValue = order.getTotalValue();
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

	public Double getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(Double totalValue) {
		this.totalValue = totalValue;
	}
}
