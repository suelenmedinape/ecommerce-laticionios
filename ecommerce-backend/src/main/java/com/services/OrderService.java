package com.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Order;
import com.dtos.DetailsOrderDTO;
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
	
	public DetailsOrderDTO findOrderById(Long id) {	
		Order order = orderRepository.findById(id)
				.orElseThrow(() -> new OrderNotFoundException("Pedido com id: " + id + " não encontrado"));
		
		DetailsOrderDTO detailsOrderDTO = new DetailsOrderDTO(order);
		
		return detailsOrderDTO;
	}

	public void updateOrderStatus(Long id, String status) {
		Order order =  orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("Pedido com id: " + id + " não encontrado"));
		
		if(status.equalsIgnoreCase(OrderStatus.FINALIZADO.name())) {
			order.setOrderStatus(OrderStatus.FINALIZADO);
		}
		
		if(status.equalsIgnoreCase(OrderStatus.CANCELADO.name())) {
			order.setOrderStatus(OrderStatus.CANCELADO);
		}
		
		order.setDate(new Date());
		
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

	public void cancelOrderById(Long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Pedido com id: " + orderId + " não encontrado"));
		
		if(order.getOrderStatus().equals(OrderStatus.SOLICITADO)) {		
			orderRepository.deleteById(orderId);
		}
		
	}
}
