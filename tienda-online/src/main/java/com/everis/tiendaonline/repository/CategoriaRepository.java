package com.everis.tiendaonline.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everis.tiendaonline.controller.entinty.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, BigDecimal> {

	
}
