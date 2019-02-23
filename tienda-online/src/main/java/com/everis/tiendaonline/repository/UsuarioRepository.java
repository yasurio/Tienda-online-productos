package com.everis.tiendaonline.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

import com.everis.tiendaonline.controller.entinty.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepositoryImplementation<Usuario, BigDecimal> {

}
