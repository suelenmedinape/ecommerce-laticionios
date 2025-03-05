package com.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.enums.Role;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private SecurityFilter securityFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
	    return httpSecurity
	            .csrf(csrf -> csrf.disable())
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authorizeHttpRequests(authorize -> authorize
	                    .requestMatchers("/h2-console/**").permitAll()
	                    .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
	                    .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
	                    .requestMatchers(HttpMethod.GET, "/products").permitAll()
	                    .requestMatchers(HttpMethod.GET, "/products/{id}").permitAll()
	                    .requestMatchers(HttpMethod.GET, "/products/search").permitAll()

	                    .requestMatchers(HttpMethod.POST, "/products").hasRole(Role.ROLE_ADMIN.getRoleName())
	                    .requestMatchers(HttpMethod.PUT, "/products/{productId}").hasRole(Role.ROLE_ADMIN.getRoleName())
	                    .requestMatchers(HttpMethod.DELETE, "/products/{productId}").hasRole(Role.ROLE_ADMIN.getRoleName())
	                    .requestMatchers(HttpMethod.GET, "/list-categories").hasRole(Role.ROLE_ADMIN.getRoleName())
	                    .requestMatchers("/orders/**").hasRole(Role.ROLE_ADMIN.getRoleName())
	          
	                    .requestMatchers("/my/**").hasRole(Role.ROLE_CLIENT.getRoleName())
	                    .requestMatchers("/cart/**").hasRole(Role.ROLE_CLIENT.getRoleName())
	                    
	                    .anyRequest().authenticated())
	            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
	            .headers(headers -> headers.frameOptions().sameOrigin())
	            .build();
	}

    
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    	return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    PasswordEncoder passwordEncoder() {
    	return new BCryptPasswordEncoder();
    }
}
