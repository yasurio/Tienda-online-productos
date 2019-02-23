package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Producto;
import com.everis.tiendaonline.dto.ProductoDto;
import com.everis.tiendaonline.repository.ProductoRepository;

@RequestMapping("/producto")
@RestController("ProductoController")
public class ProductoController extends GenericController<ProductoDto, Producto, BigDecimal, ProductoRepository>{

	public ProductoController() {
		super(ProductoDto.class, Producto.class);
	}
	

}