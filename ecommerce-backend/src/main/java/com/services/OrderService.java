package com.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Order;
import com.domain.OrderItem;
import com.domain.Product;
import com.dtos.DetailsOrderDTO;
import com.dtos.OrderDTO;
import com.enums.OrderStatus;
import com.exceptions.OrderNotFoundException;
import com.exceptions.ProductNotFoundException;
import com.repositories.OrderItemRepository;
import com.repositories.OrderRepository;
import com.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private OrderItemRepository itemRepository;
	
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
	
	@Transactional
	public void updateOrderStatus(Long id, String status) {
		Order order =  orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("Pedido com id: " + id + " não encontrado"));
		List<OrderItem> items = itemRepository.findByOrderId(order.getId());
		
		if(status.equalsIgnoreCase(OrderStatus.FINALIZADO.name())) {
			if (order.getOrderStatus() == OrderStatus.SOLICITADO) {		
				order.setOrderStatus(OrderStatus.FINALIZADO);
			}
		}
		
		if(status.equalsIgnoreCase(OrderStatus.CANCELADO.name())) {
			if (order.getOrderStatus() == OrderStatus.SOLICITADO) {			
				order.setOrderStatus(OrderStatus.CANCELADO);
				for (OrderItem item : items) {
					Product product = productRepository.findById(item.getProduct().getId())
							.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado: " + item.getProduct().getId()));
					
					product.setQuantity(product.getQuantity() + item.getQuantity());
					
					productRepository.save(product);
				}	
			}
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
}
