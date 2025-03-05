package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Client;
import com.domain.OrderItem;
import com.dtos.ClientUpdateDTO;
import com.dtos.GetClientDetailsDTO;
import com.dtos.OrderDTO;
import com.enums.OrderStatus;
import com.services.ClientService;
import com.services.OrderService;

@RestController
@RequestMapping("/my")
public class ClientController {

	@Autowired
	private ClientService clientService;
	
	@Autowired 
	private OrderService orderService;
	
<<<<<<< HEAD
	@GetMapping("/profile") //ok
=======
	@GetMapping("/profile")
>>>>>>> d7bfabc9803f9c1d6a198a4039b3600f27b2bd22
	public ResponseEntity<GetClientDetailsDTO> getClientDetails(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

		Client client = clientService.findByEmail(email);
		GetClientDetailsDTO dto = new GetClientDetailsDTO(client);
		
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/details") //ok
	public ResponseEntity<Void> updateDetailsClient(@RequestBody ClientUpdateDTO clientUpdateDTO) {		
	    String email = SecurityContextHolder.getContext().getAuthentication().getName();
		Client client = clientService.findByEmail(email);

		clientService.updateClient(client.getId(), clientUpdateDTO);	
	    return ResponseEntity.ok().build();
	}
	
	@GetMapping("/orders") //ok
	public ResponseEntity<List<OrderDTO>> listAllOrders(){
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		Client client = clientService.findByEmail(email);	
		
		return ResponseEntity.ok(clientService.listAllOrdersByClient(client.getId()));
	}
	
	@GetMapping("/orders/details/{orderId}")
	public ResponseEntity<List<OrderItem>> listOrderDetails(@PathVariable Long orderId){
		
		return ResponseEntity.ok(clientService.listOrderDetailsByClient(orderId));
	}
	
	@PutMapping("/orders/remove/{orderId}") //ok
	public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId){
		orderService.updateOrderStatus(orderId, OrderStatus.CANCELADO.name());
		
		return ResponseEntity.ok().build();
	}

}
