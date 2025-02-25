package com.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	/* Só o admin */
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	@CrossOrigin(origins = "http://localhost:4201")
    public ResponseEntity<Map<String, String>> insert(@Valid @RequestBody ProductDTO productDTO) {
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

	@CrossOrigin(origins = "http://localhost:4201")
	@GetMapping("/info-product-admin")
	public ResponseEntity<List<Product>> listProductsAdmin(){
		List<Product> products = productService.listProducts();
		
		return ResponseEntity.ok(products);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> detailProduct(@PathVariable Long id){
		Product product = productService.findById(id);
		return ResponseEntity.ok(product);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<ProductSummaryDTO>> listProductsByName(@RequestParam String name){
		List<Product> products = productService.listProductsByName(name);
		List<ProductSummaryDTO> dtos = products.stream()
				.map(x -> new ProductSummaryDTO(x)).toList();
			
		return ResponseEntity.ok(dtos);
	}
	
	@CrossOrigin(origins = "http://localhost:4201")
	@PutMapping("/{productId}")
	public ResponseEntity<Void> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO dto){
		productService.updateProduct(productId, dto);
				
		return ResponseEntity.ok().build();
	}
	
	@CrossOrigin(origins = "http://localhost:4201")
	@DeleteMapping("/{productId}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long productId){
		productService.removeProduct(productId);
		return ResponseEntity.ok().build();
	}
}
