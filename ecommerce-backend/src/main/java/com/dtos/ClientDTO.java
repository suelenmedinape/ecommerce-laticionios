package com.dtos;

import com.domain.Address;
import com.domain.Client;

public class ClientDTO {

	private String name;
	private String email;
	private String phone;
	private Address address;
	
	public ClientDTO() {	
	}
	
	public ClientDTO(Client client) {
		this.name = client.getName();
		this.email = client.getEmail();
		this.phone = client.getPhone();
		this.address = client.getAddress();
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
}
