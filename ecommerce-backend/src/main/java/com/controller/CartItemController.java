package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Cart;
import com.domain.CartItem;
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
	
	@GetMapping("/{clientId}")
	public ResponseEntity<List<CartItem>> listCartItems(@PathVariable Long clientId){
		Cart cart = cartService.findByClientId(clientId);
		
		return ResponseEntity.ok(cart.getCartItems());
	}
}
