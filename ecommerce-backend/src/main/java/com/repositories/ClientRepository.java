package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Client;

public interface ClientRepository extends JpaRepository<Client, Long>{

}
