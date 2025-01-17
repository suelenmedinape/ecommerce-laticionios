package com.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Cart;
import com.domain.CartItem;
import com.domain.Order;
import com.domain.OrderItem;
import com.domain.Product;
import com.enums.OrderStatus;
import com.exceptions.CartNotFoundException;
import com.exceptions.ProductNotFoundException;
import com.repositories.CartItemRepository;
import com.repositories.CartRepository;
import com.repositories.OrderRepository;
import com.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
    private OrderRepository orderRepository;

	public void addItemToCart(Long clientId, Long productId, int quantity) {
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho do cliente não encontrado"));

		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));

		CartItem existsItemToCart = cart.getCartItems().stream()
				.filter(item -> item.getProduct().getId().equals(productId)).findFirst().orElse(null);

		if (existsItemToCart != null) {
			existsItemToCart.setQuantity(quantity);
			existsItemToCart.setTotalPrice(existsItemToCart.getQuantity() * existsItemToCart.getUnitPrice());
		} else {
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

	public Cart findByClientId(Long clientId) {
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho não encontrado"));
		return cart;
	}

	@Transactional
	public Cart removeProductByCartItems(Long clientId, Long productId) {
		cartItemRepository.deleteByProductId(productId);
		return findByClientId(clientId);
	}

	@Transactional
	public void buyItemsFromCart(Long clientId) {
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho não encontrado"));

		Order order = new Order();
		order.setClient(cart.getClient());
		order.setDate(new Date());
		order.setOrderStatus(OrderStatus.SOLICITADO);
		
		double totalValue = 0.0;
		for (CartItem cartItem : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setUnitPrice(cartItem.getUnitPrice());
			orderItem.setTotalPrice(cartItem.getTotalPrice());
			orderItem.setOrder(order);

			order.getOrderItems().add(orderItem);

			totalValue += cartItem.getTotalPrice();
		}
		
		 order.setTotalValue(totalValue);

	     orderRepository.save(order);
	     
	     for(CartItem cartItem : cart.getCartItems()) {
	    	 Product updateProduct = productRepository.findById(cartItem.getProduct().getId())
	    			 .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));
	    	 updateProduct.setQuantity(updateProduct.getQuantity() - cartItem.getQuantity());
	    	 productRepository.save(updateProduct);
	     }

		 cartItemRepository.deleteAllByCartId(cart.getId());
	}
}
