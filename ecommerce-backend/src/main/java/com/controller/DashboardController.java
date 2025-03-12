package com.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Product;
import com.dtos.OrderComparisonDTO;
import com.dtos.OrderStatusSummaryDTO;
import com.dtos.OrderSummaryDTO;
import com.dtos.ProductRankingDTO;
import com.services.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

	@Autowired
	private DashboardService dashboardService;

	@GetMapping("/orders/current-month")
	public ResponseEntity<OrderSummaryDTO> getTotalCompletedOrdersCurrentMonth() {

		return ResponseEntity.ok().body(dashboardService.getOrdersByCurrentMonth());
	}

	@GetMapping("/orders/total-revenue")
	public ResponseEntity<OrderSummaryDTO> getTotalRevenueAllTime() {

		return ResponseEntity.ok().body(dashboardService.findAllOrdersByStatus());
	}

	@GetMapping("/orders/total-revenue/count")
	public ResponseEntity<OrderSummaryDTO> getTotalRevenueByPeriod(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

		OrderSummaryDTO summary = dashboardService.getTotalRevenueByPeriod(startDate, endDate);

		return ResponseEntity.ok(summary);
	}

	@GetMapping("/orders/comparison")
	public ResponseEntity<List<OrderComparisonDTO>> compareOrderByMonth(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate monthOne,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate monthTwo) {

		List<OrderComparisonDTO> list = dashboardService.compareOrderByMonth(monthOne, monthTwo);
		
		return ResponseEntity.ok(list);
	}

	@GetMapping("/orders/status-summary")
	public ResponseEntity<OrderStatusSummaryDTO> getOrdersStatusSummary() {
		OrderStatusSummaryDTO summary = dashboardService.getOrdersStatusSummary();
		return ResponseEntity.ok(summary);
	}

	@GetMapping("/products/best-sellers")
	public ResponseEntity<List<ProductRankingDTO>> getTopBestSellingProducts() {
		return ResponseEntity.ok().body(dashboardService.findTop5BestSellingProducts());
	}

	@GetMapping("/products/worst-sellers")
	public ResponseEntity<List<ProductRankingDTO>> getTopLeastSellingProducts() {
		return ResponseEntity.ok().body(dashboardService.findBottom5LeastSellingProducts());
	}

	@GetMapping("/products/low-stock")
	public ResponseEntity<List<Product>> getLowStockProducts(
			@RequestParam(required = false, defaultValue = "10") int quantity) {
		List<Product> list = dashboardService.listProductsLowStock(quantity);
		return ResponseEntity.ok().body(list);
	}
}
