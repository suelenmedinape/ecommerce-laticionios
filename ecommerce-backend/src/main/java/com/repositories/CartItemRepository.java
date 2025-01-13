package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

}
