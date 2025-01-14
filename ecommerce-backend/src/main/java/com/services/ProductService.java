package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Product;
import com.exceptions.ProductNotFoundException;
import com.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	public void insert(Product product) {
		productRepository.save(product);
	}
	
	public List<Product> listProducts(){
		return productRepository.findAll();
	}
	
	public Product findById(Long id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado."));
	}

	public List<Product> listProductsByName(String name) {
		
		return productRepository.findByProductNameContainingIgnoreCase(name);
	}
}
