package com.exceptions;

public class IncompleteDataException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;

	public IncompleteDataException(String message) {
        super(message);
    }
}
