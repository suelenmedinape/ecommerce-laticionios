package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dtos.CartItemDTO;
import com.services.CartService;

@RestController
@RequestMapping("/cart")
public class CartItemController {

	@Autowired
	private CartService cartService;
	
	@PostMapping("/add")
	public ResponseEntity<Void> addItemToCart(@RequestBody CartItemDTO cartItemDTO){
		cartService.addItemToCart(cartItemDTO.getClientId(), cartItemDTO.getProductId(), cartItemDTO.getQuantity());
		
		return ResponseEntity.ok().build();
	}
}
