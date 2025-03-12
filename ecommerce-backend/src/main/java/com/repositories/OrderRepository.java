package com.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.domain.Order;
import com.dtos.OrderComparisonDTO;
import com.dtos.OrderDTO;
import com.dtos.OrderStatusSummaryProjectionDTO;
import com.dtos.OrderSummaryDTO;
import com.dtos.ProductRankingDTO;
import com.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<OrderDTO> findAllByOrderStatus(OrderStatus status);

	List<OrderDTO> findAllByClientId(Long id);

	@Query("SELECT new com.dtos.OrderSummaryDTO(COUNT(o), COALESCE(SUM(o.totalValue), 0)) "
			+ "FROM Order o WHERE o.orderStatus = 'FINALIZADO' " + "AND o.date BETWEEN :startDate AND :endDate")
	OrderSummaryDTO findTotalRevenueAndCountByPeriod(@Param("startDate") Date startDate,
			@Param("endDate") Date endDate);

	@Query("SELECT new com.dtos.OrderSummaryDTO(COUNT(o), COALESCE(SUM(o.totalValue), 0)) "
			+ "FROM Order o WHERE YEAR(o.date) = YEAR(CURRENT_DATE) "
			+ "AND MONTH(o.date) = MONTH(CURRENT_DATE) AND o.orderStatus = 'FINALIZADO'")
	OrderSummaryDTO findCurrentMonthOrderSummary();

	@Query("SELECT new com.dtos.OrderSummaryDTO(COUNT(o), COALESCE(SUM(o.totalValue), 0)) "
			+ "FROM Order o WHERE o.orderStatus = 'FINALIZADO'")
	OrderSummaryDTO findAllOrdersByStatus();

	@Query("SELECT new com.dtos.OrderStatusSummaryProjectionDTO(YEAR(o.date), MONTH(o.date), CAST(o.orderStatus AS string), COUNT(o)) "
			+ "FROM Order o " + "WHERE o.date >= :startDate AND o.orderStatus IN ('FINALIZADO', 'CANCELADO') "
			+ "GROUP BY YEAR(o.date), MONTH(o.date), o.orderStatus " + "ORDER BY YEAR(o.date), MONTH(o.date)")
	List<OrderStatusSummaryProjectionDTO> findOrderStatusSummary(@Param("startDate") Date startDate);

	@Query("SELECT new com.dtos.OrderComparisonDTO("
			+ "YEAR(o.date), MONTH(o.date), COUNT(o), COALESCE(SUM(o.totalValue), 0)) " + "FROM Order o "
			+ "WHERE o.orderStatus = 'FINALIZADO' "
			+ "AND ((YEAR(o.date) = YEAR(:monthOne) AND MONTH(o.date) = MONTH(:monthOne)) "
			+ "OR (YEAR(o.date) = YEAR(:monthTwo) AND MONTH(o.date) = MONTH(:monthTwo))) "
			+ "GROUP BY YEAR(o.date), MONTH(o.date)")
	List<OrderComparisonDTO> compareOrderCompletion(@Param("monthOne") Date monthOne, @Param("monthTwo") Date monthTwo);

	@Query("""
			    SELECT new com.dtos.ProductRankingDTO(
			        p.id, p.productName, p.price, p.category, SUM(oi.quantity))
			    FROM OrderItem oi
			    JOIN oi.order o
			    JOIN oi.product p
			    WHERE o.orderStatus = 'FINALIZADO'
			    GROUP BY p.id, p.productName, p.price, p.category
			    ORDER BY SUM(oi.quantity) DESC
			    LIMIT 5
			""")
	List<ProductRankingDTO> findTop5BestSellingProducts();

	@Query("""
			    SELECT new com.dtos.ProductRankingDTO(p.id, p.productName, p.price, p.category, COALESCE(SUM(oi.quantity), 0))
			    FROM Product p
			    LEFT JOIN OrderItem oi ON p.id = oi.product.id
			    LEFT JOIN Order o ON oi.order.id = o.id AND o.orderStatus = 'FINALIZADO'
			    GROUP BY p.id, p.productName, p.price, p.category
			    ORDER BY COALESCE(SUM(oi.quantity), 0) ASC
			    LIMIT 5
			""")
	List<ProductRankingDTO> findBottom5LeastSellingProducts();

}
