package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Product;
import com.dtos.ProductDTO;
import com.exceptions.ProductNotFoundException;
import com.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public void insert(Product product) {
		productRepository.save(product);
	}

	public List<Product> listProducts() {
		return productRepository.findAll();
	}

	public Product findById(Long id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado."));
	}

	public List<Product> listProductsByName(String name) {

		return productRepository.findByProductNameContainingIgnoreCase(name);
	}

	public void updateProduct(Long productId, ProductDTO dto) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado."));
		
		if (dto.getProductName() != null) {
			product.setProductName(dto.getProductName());
		}
		
		if(dto.getDescription() != null) {
			product.setDescription(dto.getDescription());
		}
		if(dto.getPrice() != null) {
			product.setPrice(dto.getPrice());
		}
		
		product.setQuantity(dto.getQuantity());

		productRepository.save(product);
	}
	
	public void removeProduct(Long productId) {
		productRepository.findById(productId)
		.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));
		
		productRepository.deleteById(productId);
	}
}
