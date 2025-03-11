package com.dtos;

import java.math.BigDecimal;

public class OrderSummaryDTO {

    private Long totalOrders;
    private BigDecimal totalSales;

    public OrderSummaryDTO() {
	}

	public OrderSummaryDTO(Long totalOrders, BigDecimal totalSales) {
        this.totalOrders = totalOrders;
        this.totalSales = totalSales;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(BigDecimal totalSales) {
        this.totalSales = totalSales;
    }
}
