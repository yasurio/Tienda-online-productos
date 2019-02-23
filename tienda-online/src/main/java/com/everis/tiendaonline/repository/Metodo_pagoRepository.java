package com.everis.tiendaonline.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everis.tiendaonline.controller.entinty.MetodoPago;

@Repository
public interface Metodo_pagoRepository extends JpaRepository<MetodoPago, BigDecimal> {

}
