package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
