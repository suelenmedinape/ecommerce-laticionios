package com.dtos;

public class LoginResponseDTO {

	private String token;

	public LoginResponseDTO() {
		super();
	}

	public LoginResponseDTO(String token) {
		super();
		this.token = token;
	}



	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
