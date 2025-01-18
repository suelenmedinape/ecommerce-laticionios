package com.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Order;
import com.dtos.OrderDTO;
import com.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long>{

	List<OrderDTO> findAllByOrderStatus(OrderStatus status);
}
