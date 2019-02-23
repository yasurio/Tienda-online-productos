package com.everis.tiendaonline.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductoDto extends BaseDto{
	private String ean;
	private String descripcion;
	private String imagen;
	private BigDecimal precio;
	private CategoriaDto categoria;

}
