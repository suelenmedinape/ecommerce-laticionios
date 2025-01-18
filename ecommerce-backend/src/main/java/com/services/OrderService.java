package com.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Order;
import com.dtos.OrderDTO;
import com.enums.OrderStatus;
import com.exceptions.OrderNotFoundException;
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
	
	public Order findOrderById(Long id) {
		return orderRepository.findById(id)
				.orElseThrow(() -> new OrderNotFoundException("Pedido com id: " + id + " não encontrado"));
	}

	public void updateOrderStatus(Long id, String status) {
		Order order = findOrderById(id);
		
		if(status.equalsIgnoreCase(OrderStatus.FINALIZADO.name())) {
			order.setOrderStatus(OrderStatus.FINALIZADO);
		}
		
		if(status.equalsIgnoreCase(OrderStatus.CANCELADO.name())) {
			order.setOrderStatus(OrderStatus.CANCELADO);
		}
		
		orderRepository.save(order);
	}

	public List<OrderDTO> findAllOrdersBystatus(String status) {
		List<OrderDTO> orderDTOs = new ArrayList<>();
		
		if(status.equalsIgnoreCase(OrderStatus.SOLICITADO.name())) {
			orderDTOs = orderRepository.findAllByOrderStatus(OrderStatus.SOLICITADO);
		}
		
		if(status.equalsIgnoreCase(OrderStatus.FINALIZADO.name())) {
			orderDTOs = orderRepository.findAllByOrderStatus(OrderStatus.FINALIZADO);
		}
		
		if(status.equalsIgnoreCase(OrderStatus.CANCELADO.name())) {
			orderDTOs = orderRepository.findAllByOrderStatus(OrderStatus.CANCELADO);
		}
		
		return orderDTOs;
	}
}
