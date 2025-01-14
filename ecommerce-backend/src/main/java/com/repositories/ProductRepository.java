package com.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findByProductNameContainingIgnoreCase(String name);
}
