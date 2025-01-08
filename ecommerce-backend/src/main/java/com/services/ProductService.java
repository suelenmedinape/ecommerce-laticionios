package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Product;
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
}
