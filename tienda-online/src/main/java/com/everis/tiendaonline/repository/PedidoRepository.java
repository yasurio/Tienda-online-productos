package com.everis.tiendaonline.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

import com.everis.tiendaonline.controller.entinty.Pedido;

@Repository
public interface PedidoRepository extends JpaRepositoryImplementation<Pedido, BigDecimal> {

}
