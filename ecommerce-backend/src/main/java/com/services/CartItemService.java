package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.repositories.CartItemRepository;

@Service
public class CartItemService {

	@Autowired
	private CartItemRepository cartItemRepository;
	
}
