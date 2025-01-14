package com.dtos;

import com.domain.Address;
import com.domain.Client;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClientUpdateDTO {

	@NotBlank(message = "Nome não pode estar vazio.")
	@Size(min = 4, message = "Nome deve ter pelo menos 4 caracteres.")
	private String name;

	private String phone;	
	private Address address;
	private String cpf;
	
	public ClientUpdateDTO() {
	}
	
	public ClientUpdateDTO(Client client) {
		this.name = client.getName();
		this.phone = client.getPhone();
		this.address = client.getAddress();
		this.cpf = client.getCpf();
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
}
