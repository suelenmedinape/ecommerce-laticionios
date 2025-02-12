package com.dtos;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.domain.Order;
import com.enums.OrderStatus;

public class DetailsOrderDTO {

	private Long id;
	private Date date;
	private BigDecimal totalValue;
	private OrderStatus orderStatus;
	private ClientDTO clientDTO;
	private List<OrderItemDTO> items;

	public DetailsOrderDTO() {

	}

	public DetailsOrderDTO(Order order) {
		this.id = order.getId();
		this.date = order.getDate();
		this.totalValue = order.getTotalValue();
		this.orderStatus = order.getOrderStatus();
		this.clientDTO = new ClientDTO(order.getClient());
		this.items = order.getOrderItems().stream().map(x -> new OrderItemDTO(x)).toList();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public BigDecimal getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(BigDecimal totalValue) {
		this.totalValue = totalValue;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public ClientDTO getClientDTO() {
		return clientDTO;
	}

	public void setClientDTO(ClientDTO clientDTO) {
		this.clientDTO = clientDTO;
	}

	public List<OrderItemDTO> getItems() {
		return items;
	}

	public void setItems(List<OrderItemDTO> items) {
		this.items = items;
	}
}
