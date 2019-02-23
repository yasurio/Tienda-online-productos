package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Usuario;
import com.everis.tiendaonline.dto.UsuarioDto;
import com.everis.tiendaonline.repository.UsuarioRepository;

@RequestMapping("/usuario")
@RestController("UsuarioController")
public class UsuarioController extends GenericController<UsuarioDto, Usuario, BigDecimal, UsuarioRepository>{

	public UsuarioController() {
		super(UsuarioDto.class,Usuario.class);
		// TODO Auto-generated constructor stub
	}
	

}