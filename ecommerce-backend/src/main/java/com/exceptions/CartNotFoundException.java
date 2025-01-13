package com.exceptions;

public class CartNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public CartNotFoundException(String messsage) {
		super(messsage);
	}
}
