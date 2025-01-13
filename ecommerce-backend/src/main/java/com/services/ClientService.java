package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Cart;
import com.domain.Client;
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
        
        clientRepository.save(client);
    }
}

