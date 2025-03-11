package com.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Product;
import com.dtos.OrderStatusSummaryDTO;
import com.dtos.OrderStatusSummaryProjectionDTO;
import com.dtos.OrderSummaryDTO;
import com.repositories.OrderItemRepository;
import com.repositories.OrderRepository;
import com.repositories.ProductRepository;

@Service
public class DashboardService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository itemRepository;

	public OrderSummaryDTO getTotalRevenueByPeriod(LocalDate start, LocalDate end) {
		Date startDate = convertToDate(start);
		Date endDate = convertToDate(end.plusDays(1));

		return orderRepository.findTotalRevenueAndCountByPeriod(startDate, endDate);
	}

	public List<Product> listProductsLowStock(int quantity) {
		List<Product> list = productRepository.findByQuantityLessThanEqual(quantity);
		return list;
	}

	public OrderSummaryDTO getOrdersByCurrentMonth() {
		return orderRepository.findCurrentMonthOrderSummary();
	}

	public OrderSummaryDTO findAllOrdersByStatus() {

		return orderRepository.findAllOrdersByStatus();
	}

	public OrderStatusSummaryDTO getOrdersStatusSummary() {
	    LocalDate startDate = LocalDate.now().minusMonths(11).withDayOfMonth(1);
	    Date start = convertToDate(startDate);

	    List<OrderStatusSummaryProjectionDTO> results = orderRepository.findOrderStatusSummary(start);

	    OrderStatusSummaryDTO summaryDTO = new OrderStatusSummaryDTO();
	    Map<Integer, String> monthMap = getMonthMap();

	    Map<String, List<Integer>> statusMap = new HashMap<>();
	    statusMap.put("FINALIZADO", new ArrayList<>());
	    statusMap.put("CANCELADO", new ArrayList<>());

	    Set<String> orderedMonths = results.stream()
	        .map(dto -> monthMap.get(dto.getMonth()))
	        .distinct()
	        .collect(Collectors.toCollection(LinkedHashSet::new));
	    
	    summaryDTO.getMonths().addAll(orderedMonths);

	    statusMap.forEach((status, list) -> {
	        list.addAll(Collections.nCopies(orderedMonths.size(), 0));
	    });

	    for (OrderStatusSummaryProjectionDTO dto : results) {
	        String monthLabel = monthMap.get(dto.getMonth());
	        int monthIndex = new ArrayList<>(orderedMonths).indexOf(monthLabel);
	        
	        if (monthIndex != -1) {
	            String status = dto.getStatus();
	            statusMap.get(status).set(monthIndex, dto.getTotal().intValue());
	        }
	    }

	    statusMap.forEach((status, data) -> {
	        summaryDTO.addStatus(status.toLowerCase(), data);
	    });

	    return summaryDTO;
	}
	
	private Date convertToDate(LocalDate localDate) {
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	private Map<Integer, String> getMonthMap() {
		Map<Integer, String> monthMap = new HashMap<>();
		monthMap.put(1, "Jan");
		monthMap.put(2, "Feb");
		monthMap.put(3, "Mar");
		monthMap.put(4, "Apr");
		monthMap.put(5, "May");
		monthMap.put(6, "Jun");
		monthMap.put(7, "Jul");
		monthMap.put(8, "Aug");
		monthMap.put(9, "Sep");
		monthMap.put(10, "Oct");
		monthMap.put(11, "Nov");
		monthMap.put(12, "Dec");
		return monthMap;
	}
}
