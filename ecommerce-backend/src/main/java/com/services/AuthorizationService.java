package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.repositories.ClientRepository;
import com.repositories.ProducerRepository;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProducerRepository producerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = producerRepository.findByEmail(username);

        if (user == null) {
            user = clientRepository.findByEmail(username);
        }

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        return user;
    }
}

