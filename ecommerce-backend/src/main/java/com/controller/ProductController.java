package com.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Product;
import com.dtos.ProductDTO;
import com.dtos.ProductSummaryDTO;
import com.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@PostMapping
	public ResponseEntity<Map<String, String>> insert(@Valid @RequestBody ProductDTO productDTO){
		Product product = new Product();
		product.setProductName(productDTO.getProductName());
		product.setDescription(productDTO.getDescription());
		product.setPrice(productDTO.getPrice());
		product.setQuantity(productDTO.getQuantity());
	
		productService.insert(product);
		
		Map<String, String> response = Map.of("message","Cadastro realizado com sucesso");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<List<ProductSummaryDTO>> listProducts(){
		List<Product> products = productService.listProducts();
		List<ProductSummaryDTO> productSummaryDTO = products.stream()
				.map(x -> new ProductSummaryDTO(x)).toList();
		
		return ResponseEntity.ok(productSummaryDTO);
	}
}
