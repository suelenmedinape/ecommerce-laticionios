package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.repositories.CartRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;
	
}
