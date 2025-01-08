package com.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Client;
import com.dtos.ClientDTO;
import com.services.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private ClientService clientService;
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@Valid @RequestBody ClientDTO clientDTO) {
	    Client newClient = new Client();
	    newClient.setName(clientDTO.getName());
	    newClient.setEmail(clientDTO.getEmail());
	    newClient.setPassword(clientDTO.getPassword());

	    clientService.register(newClient);

	    Map<String, String> response = Map.of("message", "Cadastro realizado com sucesso!");
	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}
