package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/{clientId}")
	public ResponseEntity<GetClientDetailsDTO> getClientDetails(@PathVariable Long clientId){
		Client client = clientService.findById(clientId);
		GetClientDetailsDTO dto = new GetClientDetailsDTO(client);
		
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/{clientId}")
	public ResponseEntity<Void> updateDetailsClient(@PathVariable Long clientId, @RequestBody ClientUpdateDTO clientUpdateDTO) {		
	    clientService.updateClient(clientId, clientUpdateDTO);	
	    return ResponseEntity.ok().build();
	}

}
