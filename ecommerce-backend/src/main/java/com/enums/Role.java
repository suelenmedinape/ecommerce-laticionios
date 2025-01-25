package com.enums;

public enum Role {
	ROLE_ADMIN("ADMIN"), 
	ROLE_CLIENT("CLIENT");

	private final String roleName;

	Role(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleName() {
		return roleName;
	}
}
