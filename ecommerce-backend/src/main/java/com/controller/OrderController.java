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

import com.dtos.DetailsOrderDTO;
import com.dtos.OrderDTO;
import com.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping
	public ResponseEntity<List<OrderDTO>> listAllOrders(){
			
		return ResponseEntity.ok(orderService.listOrders());
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<DetailsOrderDTO> listOrderById(@PathVariable Long orderId){
					
		return ResponseEntity.ok(orderService.findOrderById(orderId));
	}
	
	@GetMapping("/status")
	public ResponseEntity<List<OrderDTO>> listAllOrdersByStatus(@RequestParam String status){
		
		return ResponseEntity.ok(orderService.findAllOrdersBystatus(status));
	}
	
	@PutMapping("{orderId}")
	public ResponseEntity<Void> updateOrderStatus(@PathVariable Long orderId , @RequestParam String status){
		orderService.updateOrderStatus(orderId, status);
		
		return ResponseEntity.ok().build();
	}
	
}
