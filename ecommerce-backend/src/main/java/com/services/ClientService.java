package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Cart;
import com.domain.Client;
import com.domain.OrderItem;
import com.dtos.ClientUpdateDTO;
import com.dtos.OrderDTO;
import com.enums.Role;
import com.exceptions.ClientNotFoundException;
import com.exceptions.EmailAlreadyRegisteredException;
import com.repositories.ClientRepository;
import com.repositories.OrderItemRepository;
import com.repositories.OrderRepository;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderItemRepository itemRepository;

	public Client findByEmail(String email) {
		return clientRepository.findByEmail(email);
	}

	public void register(Client client) {
		if (clientRepository.findByEmail(client.getEmail()) != null) {
			throw new EmailAlreadyRegisteredException("Email já registrado.");
		}

		Cart cart = new Cart();
		cart.setClient(client);
		client.setCart(cart);
		client.setRole(Role.ROLE_CLIENT);

		clientRepository.save(client);
	}

	public Client findById(Long id) {
		return clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException("Cliente não encontrado"));
	}

	public void updateClient(Long clientId, ClientUpdateDTO dto) {
		Client client = clientRepository.findById(clientId)
				.orElseThrow(() -> new ClientNotFoundException("Cliente não encontrado"));

		if (dto.getName() != null) {
			client.setName(dto.getName());
		}
		
		if (dto.getPhone() != null) {
			client.setPhone(dto.getPhone());
		}
		
		if (dto.getCpf() != null) {
			client.setCpf(dto.getCpf());
		}
		
		if (dto.getAddress() != null) {
			client.setAddress(dto.getAddress());
		}

		clientRepository.save(client);
	}
	
	public List<OrderDTO> listAllOrdersByClient(Long id) {
		
		return orderRepository.findAllByClientId(id);
	}

	public List<OrderItem> listOrderDetailsByClient(Long id) {
		
		return itemRepository.findByOrderId(id);
	}
}
