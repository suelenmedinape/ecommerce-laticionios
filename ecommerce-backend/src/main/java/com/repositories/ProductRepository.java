package com.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Product;
import com.enums.Category;

public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findByProductNameContainingIgnoreCase(String name);

	List<Product> findByCategory(Category category);
	
	List<Product> findByQuantityLessThanEqual(int quantity);
}
