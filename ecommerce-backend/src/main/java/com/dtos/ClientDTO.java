package com.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClientDTO {

    @NotBlank(message = "Nome não pode estar vazio.")
    @Size(min = 4, message = "Nome deve ter pelo menos 4 caracteres.")
    private String name;

    @NotBlank(message = "Email não pode estar vazio.")
    @Email(message = "Email inválido.")
    private String email;

    @NotBlank(message = "Senha não pode estar vazia.")
    @Size(min = 8, message = "Senha deve ter pelo menos 6 caracteres.")
    private String password;
    
	public ClientDTO() {
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}

