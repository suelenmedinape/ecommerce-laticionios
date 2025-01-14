package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.domain.CartItem;

import jakarta.transaction.Transactional;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	void deleteByProductId(Long productId);

	@Modifying
	@Transactional
	@Query("DELETE FROM CartItem c WHERE c.cart.id = :cartId")
	void deleteAllByCartId(@Param("cartId") Long cartId);
}
