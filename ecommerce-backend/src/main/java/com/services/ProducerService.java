package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Producer;
import com.repositories.ProducerRepository;

@Service
public class ProducerService {

	@Autowired
	private ProducerRepository producerRepository;
	
	public Producer findByEmail(String email) {
		return producerRepository.findByEmail(email);
	}
}
