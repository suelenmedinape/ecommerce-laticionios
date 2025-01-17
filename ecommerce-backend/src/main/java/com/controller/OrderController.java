package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Order;
import com.dtos.OrderDTO;
import com.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping()
	public ResponseEntity<List<OrderDTO>> listAllOrders(){
			
		return ResponseEntity.ok(orderService.listOrders());
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> listOrderById(@PathVariable Long orderId){
					
		return ResponseEntity.ok(orderService.findOrderById(orderId));
	}
	
	@PutMapping("{orderId}")
	public ResponseEntity<Void> updateOrderStatus(@PathVariable Long orderId , @RequestParam String status){
		orderService.updateOrderStatus(orderId, status);
		
		return ResponseEntity.ok().build();
	}
	
}
