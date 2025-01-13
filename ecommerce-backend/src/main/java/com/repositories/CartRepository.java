package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{

}
