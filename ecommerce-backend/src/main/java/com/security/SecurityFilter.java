package com.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.exceptions.UserUnauthorizedException;
import com.services.ClientService;
import com.services.ProducerService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

	@Autowired
	private TokenService tokenService;

	@Autowired
	private ClientService clientService;

	@Autowired
	private ProducerService producerService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String token = this.recoverToken(request);

			if (token != null && !token.isEmpty()) {
				String login = tokenService.validateToken(token);

				if (login != null && !login.isEmpty()) {

					UserDetails user = producerService.findByEmail(login);

					if (user == null) {
						user = clientService.findByEmail(login);
					}

					if (user == null) {
						throw new UserUnauthorizedException("Usuário não autorizado");
					}

					var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

					SecurityContextHolder.getContext().setAuthentication(authentication);
				} else {
					throw new UserUnauthorizedException("Token inválido ou expirado");
				}
			}

			filterChain.doFilter(request, response);
		} catch (UserUnauthorizedException ex) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType("application/json");
			response.getWriter().write("{\"message\": \"" + ex.getMessage() + "\"}");
			response.getWriter().flush();
		}
	}

	private String recoverToken(HttpServletRequest request) {
		var authHeader = request.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return null;
		}

		return authHeader.replace("Bearer ", "").trim();
	}
}
