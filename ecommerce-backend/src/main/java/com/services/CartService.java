package com.services;

import java.math.BigDecimal;
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
import com.exceptions.ClientNotFoundException;
import com.exceptions.InsufficientStockException;
import com.exceptions.ProductNotFoundException;
import com.repositories.CartItemRepository;
import com.repositories.CartRepository;
import com.repositories.ClientRepository;
import com.repositories.OrderRepository;
import com.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {
	
	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OrderRepository orderRepository;

	public void addItemToCart(Long clientId, Long productId, int quantity) {
		clientRepository.findById(clientId)
				.orElseThrow(() -> new ClientNotFoundException("Cliente não encontrado"));
		
		Cart cart = cartRepository.findByClientId(clientId)
				.orElseThrow(() -> new CartNotFoundException("Carrinho do cliente não encontrado"));

		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));

		CartItem existsItemToCart = cart.getCartItems().stream()
				.filter(item -> item.getProduct().getId().equals(productId)).findFirst().orElse(null);

		BigDecimal totalPrice = BigDecimal.ZERO;

		if (existsItemToCart != null) {
			if (quantity <= product.getQuantity()) {
				existsItemToCart.setQuantity(quantity);
			} else {
				throw new InsufficientStockException("Quantidade não disponível em estoque");
			}
			totalPrice = existsItemToCart.getUnitPrice().multiply(BigDecimal.valueOf(quantity));

			existsItemToCart.setTotalPrice(totalPrice);
		} else {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);

			if (quantity <= product.getQuantity()) {
				cartItem.setQuantity(quantity);
			} else {
				throw new InsufficientStockException("Quantidade não disponível em estoque");
			}

			cartItem.setUnitPrice(product.getPrice());
			totalPrice = cartItem.getUnitPrice().multiply(BigDecimal.valueOf(quantity));

			cartItem.setTotalPrice(totalPrice);

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

		BigDecimal totalValue = BigDecimal.ZERO;
		for (CartItem cartItem : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setProduct(cartItem.getProduct());

			Product product = productRepository.findById(cartItem.getProduct().getId())
					.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));

			if (cartItem.getQuantity() <= product.getQuantity()) {
				orderItem.setQuantity(cartItem.getQuantity());
			} else {
				throw new InsufficientStockException("Quantidade não disponível em estoque");
			}

			orderItem.setUnitPrice(cartItem.getUnitPrice());
			orderItem.setTotalPrice(cartItem.getTotalPrice());
			orderItem.setOrder(order);

			order.getOrderItems().add(orderItem);

			totalValue = totalValue.add(cartItem.getTotalPrice());
		}

		order.setTotalValue(totalValue);

		orderRepository.save(order);

		for (CartItem cartItem : cart.getCartItems()) {
			Product updateProduct = productRepository.findById(cartItem.getProduct().getId())
					.orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));
			updateProduct.setQuantity(updateProduct.getQuantity() - cartItem.getQuantity());
			productRepository.save(updateProduct);
		}

		cartItemRepository.deleteAllByCartId(cart.getId());
	}
}
