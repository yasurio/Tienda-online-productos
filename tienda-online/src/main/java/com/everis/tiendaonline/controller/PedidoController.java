package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Pedido;
import com.everis.tiendaonline.dto.PedidoDto;
import com.everis.tiendaonline.repository.PedidoRepository;

@RequestMapping("/pedido")
@RestController("PedidoController")
public class PedidoController extends GenericController<PedidoDto, Pedido, BigDecimal, PedidoRepository>{

	public PedidoController() {
		super(PedidoDto.class,Pedido.class);
		// TODO Auto-generated constructor stub
	}
	

}
