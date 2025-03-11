package com.exceptions;

public class InvalidCategoryException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public InvalidCategoryException(String msg) {
		super(msg);
	}

}
