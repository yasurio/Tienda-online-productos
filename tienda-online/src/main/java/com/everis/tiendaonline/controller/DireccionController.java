package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Direccion;
import com.everis.tiendaonline.dto.DireccionDto;
import com.everis.tiendaonline.repository.DireccionRepository;

@RequestMapping("/direccion")
@RestController("DireccionController")
public class DireccionController extends GenericController<DireccionDto,Direccion,BigDecimal,DireccionRepository>{

	public DireccionController() {
		super(DireccionDto.class, Direccion.class);
		// TODO Auto-generated constructor stub
	}

}
