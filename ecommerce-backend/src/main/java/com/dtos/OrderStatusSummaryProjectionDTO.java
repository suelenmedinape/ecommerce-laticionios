package com.dtos;

public class OrderStatusSummaryProjectionDTO {
	private Integer year;
	private Integer month;
	private String status;
	private Long total;

	public OrderStatusSummaryProjectionDTO() {

	}

	public OrderStatusSummaryProjectionDTO(Integer year, Integer month, String status, Long total) {
		this.year = year;
		this.month = month;
		this.status = status;
		this.total = total;
	}

	public Integer getYear() {
		return year;
	}

	public Integer getMonth() {
		return month;
	}

	public String getStatus() {
		return status;
	}

	public Long getTotal() {
		return total;
	}
}
