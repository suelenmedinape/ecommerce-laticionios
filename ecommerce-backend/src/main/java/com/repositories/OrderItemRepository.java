package com.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

	List<OrderItem> findByOrderId(Long id);
}
