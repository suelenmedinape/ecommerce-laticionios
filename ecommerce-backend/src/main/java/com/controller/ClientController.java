package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Client;
import com.dtos.ClientUpdateDTO;
import com.dtos.GetClientDetailsDTO;
import com.services.ClientService;

@RestController
@RequestMapping("/profile")
public class ClientController {

	@Autowired
	private ClientService clientService;
	
	@GetMapping()
	public ResponseEntity<GetClientDetailsDTO> getClientDetails(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

		Client client = clientService.findByEmail(email);
		GetClientDetailsDTO dto = new GetClientDetailsDTO(client);
		
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping
	public ResponseEntity<Void> updateDetailsClient(@RequestBody ClientUpdateDTO clientUpdateDTO) {		
	    String email = SecurityContextHolder.getContext().getAuthentication().getName();
		Client client = clientService.findByEmail(email);

		
		clientService.updateClient(client.getId(), clientUpdateDTO);	
	    return ResponseEntity.ok().build();
	}

}
