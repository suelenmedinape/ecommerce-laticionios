package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Cart;
import com.domain.CartItem;
import com.domain.Product;
import com.exceptions.CartNotFoundException;
import com.exceptions.ProductNotFoundException;
import com.repositories.CartRepository;
import com.repositories.ProductRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;

	public void addItemToCart(Long clientId, Long productId, int quantity) {
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho do cliente não encontrado"));
		
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));
	
		CartItem existsItemToCart = cart.getCartItems().stream()
				.filter(item -> item.getProduct().getId().equals(product))
				.findFirst().orElse(null);
		
		if(existsItemToCart != null) {
			existsItemToCart.setQuantity(quantity);
			existsItemToCart.setTotalPrice(existsItemToCart.getQuantity() * existsItemToCart.getUnitPrice());
		}else {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(quantity);
			cartItem.setUnitPrice(product.getPrice());
			cartItem.setTotalPrice(product.getPrice() * quantity);
			
			cart.getCartItems().add(cartItem);
		}
		
		cartRepository.save(cart);
	}
}
