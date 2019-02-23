package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Administrador;
import com.everis.tiendaonline.dto.AdministradorDto;
import com.everis.tiendaonline.repository.AdministradorRepository;



@RequestMapping("/administrador")
@RestController("AdministradorController")
public class AdministadorController extends GenericController< AdministradorDto, Administrador, BigDecimal, AdministradorRepository>{

	public AdministadorController() {
		super(AdministradorDto.class, Administrador.class);
		// TODO Auto-generated constructor stub
	}

	

}