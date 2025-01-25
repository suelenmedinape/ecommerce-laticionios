package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Producer;

public interface ProducerRepository extends JpaRepository<Producer, Long>{

	Producer findByEmail(String email);
}
