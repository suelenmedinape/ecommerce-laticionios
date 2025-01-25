package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Cart;
import com.domain.Client;
import com.dtos.ClientUpdateDTO;
import com.enums.Role;
import com.exceptions.UserUnauthorizedException;
import com.exceptions.EmailAlreadyRegisteredException;
import com.repositories.ClientRepository;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;

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
		return clientRepository.findById(id).orElseThrow(() -> new UserUnauthorizedException("Cliente não encontrado"));
	}

	public void updateClient(Long clientId, ClientUpdateDTO dto) {
		Client client = clientRepository.findById(clientId)
				.orElseThrow(() -> new UserUnauthorizedException("Cliente não encontrado"));

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
}
