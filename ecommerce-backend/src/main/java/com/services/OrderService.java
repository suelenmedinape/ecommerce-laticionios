package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Order;
import com.dtos.OrderDTO;
import com.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	public List<OrderDTO> listOrders(){
		List<Order> orders = orderRepository.findAll();
		List<OrderDTO> orderDTOs = orders
				.stream().map(x -> new OrderDTO(x)).toList();
		
		return orderDTOs;
	}
}
