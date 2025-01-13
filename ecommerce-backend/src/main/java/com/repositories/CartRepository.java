package com.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{

	Optional<Cart> findByClientId(Long clientId);
}
