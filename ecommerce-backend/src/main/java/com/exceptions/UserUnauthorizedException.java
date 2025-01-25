package com.exceptions;

public class UserUnauthorizedException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public UserUnauthorizedException(String message) {
		super(message);
	}
}
