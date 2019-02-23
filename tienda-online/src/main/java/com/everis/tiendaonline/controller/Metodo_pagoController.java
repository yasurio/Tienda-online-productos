package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.MetodoPago;
import com.everis.tiendaonline.dto.Metodo_pagoDto;
import com.everis.tiendaonline.repository.Metodo_pagoRepository;

@RequestMapping("/metodo_pago")
@RestController("Metodo_pagoController")
public class Metodo_pagoController extends GenericController<Metodo_pagoDto,MetodoPago,BigDecimal,Metodo_pagoRepository>{

	public Metodo_pagoController() {
		super(Metodo_pagoDto.class, MetodoPago.class);
		// TODO Auto-generated constructor stub
	}
	

}