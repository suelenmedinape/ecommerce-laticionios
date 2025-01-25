package com.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Client;
import com.domain.Person;
import com.dtos.LoginDTO;
import com.dtos.LoginResponseDTO;
import com.dtos.RegisterClientDTO;
import com.security.TokenService;
import com.services.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private ClientService clientService;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterClientDTO clientDTO) {
		Client newClient = new Client();
		newClient.setName(clientDTO.getName());
		newClient.setEmail(clientDTO.getEmail());
		
		String encryptedPassword = new BCryptPasswordEncoder().encode(clientDTO.getPassword());
		
		newClient.setPassword(encryptedPassword);

		clientService.register(newClient);

		Map<String, String> response = Map.of("message", "Cadastro realizado com sucesso!");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
		var userNamePassword = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());
		
		var auth = this.authenticationManager.authenticate(userNamePassword);
		
		var token = tokenService.generateToken((Person)auth.getPrincipal());
		
		return ResponseEntity.ok(new LoginResponseDTO(token));
	}
}
