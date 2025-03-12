package com.dtos;

import java.math.BigDecimal;

public class OrderComparisonDTO {
	private int year;
	private int month;
	private long totalOrders;
	private BigDecimal totalRevenue;
	
	public OrderComparisonDTO() {
		super();
	}

	public OrderComparisonDTO(int year, int month, long totalOrders, BigDecimal totalRevenue) {
		this.year = year;
		this.month = month;
		this.totalOrders = totalOrders;
		this.totalRevenue = totalRevenue;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public long getTotalOrders() {
		return totalOrders;
	}

	public void setTotalOrders(long totalOrders) {
		this.totalOrders = totalOrders;
	}

	public BigDecimal getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(BigDecimal totalRevenue) {
		this.totalRevenue = totalRevenue;
	}
}
