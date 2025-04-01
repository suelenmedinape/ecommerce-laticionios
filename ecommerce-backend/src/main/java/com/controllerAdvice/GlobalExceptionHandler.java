package com.controllerAdvice;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.exceptions.CartNotFoundException;
import com.exceptions.ClientNotFoundException;
import com.exceptions.EmailAlreadyRegisteredException;
import com.exceptions.IncompleteDataException;
import com.exceptions.InsufficientStockException;
import com.exceptions.InvalidCategoryException;
import com.exceptions.OrderNotFoundException;
import com.exceptions.ProductNotFoundException;
import com.exceptions.UserUnauthorizedException;
import com.responses.ValidationErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    public ResponseEntity<Map<String, String>> handleEmailAlreadyRegisteredException(EmailAlreadyRegisteredException ex) {
	    Map<String, String> response = Map.of("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ValidationErrorResponse>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ValidationErrorResponse> errors = ex.getBindingResult().getFieldErrors().stream()
            .map(error -> new ValidationErrorResponse(error.getField(), error.getDefaultMessage()))
            .toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
    
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, String>> handlerProductNotFoundException(ProductNotFoundException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(UserUnauthorizedException.class)
    public ResponseEntity<Map<String, String>> handlerClientNotFoundException(UserUnauthorizedException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    
    @ExceptionHandler(CartNotFoundException.class)
    public ResponseEntity<Map<String, String>> handlerCartNotFoundException(CartNotFoundException ex){
    	Map<String, String> response = Map.of("message" , ex.getMessage());
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Map<String, String>> handlerOrderNotFoundExcepetion(OrderNotFoundException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<Map<String, String>> handlerInsufficientStockException(InsufficientStockException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handlerBadCredentialsException(BadCredentialsException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(ClientNotFoundException.class)
    public ResponseEntity<Map<String, String>> handlerClientNotFoundException(ClientNotFoundException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(InvalidCategoryException.class)
    public ResponseEntity<Map<String, String>> handlerInvalidCategoryException(InvalidCategoryException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(IncompleteDataException.class)
    public ResponseEntity<Map<String, String>> handlerIncompleteDataException(IncompleteDataException ex){
    	Map<String, String> response = Map.of("message", ex.getMessage());
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
	    Map<String, String> response = Map.of("message", "Erro interno no servidor.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

