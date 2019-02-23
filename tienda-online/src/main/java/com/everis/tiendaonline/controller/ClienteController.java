package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Cliente;
import com.everis.tiendaonline.dto.ClienteDto;
import com.everis.tiendaonline.repository.ClienteRepository;

@RequestMapping("/cliente")
@RestController("ClienteController")
public class ClienteController extends GenericController<ClienteDto, Cliente, BigDecimal, ClienteRepository>{

	public ClienteController() {
		super(ClienteDto.class, Cliente.class);
		// TODO Auto-generated constructor stub
	}


	

}