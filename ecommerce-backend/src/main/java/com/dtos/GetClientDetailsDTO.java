package com.dtos;

import com.domain.Address;
import com.domain.Client;

public class GetClientDetailsDTO {
	
	private String name;

	private String email;
	private String phone;	
	private Address address;
	private String cpf;

	public GetClientDetailsDTO() {
	}
	
	public GetClientDetailsDTO(Client client) {
		this.name = client.getName();
		this.email = client.getEmail();
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
