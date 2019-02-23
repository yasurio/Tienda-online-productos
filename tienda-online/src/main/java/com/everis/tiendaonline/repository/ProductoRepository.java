package com.everis.tiendaonline.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

import com.everis.tiendaonline.controller.entinty.Producto;

@Repository
public interface ProductoRepository extends JpaRepositoryImplementation<Producto, BigDecimal> {

}
