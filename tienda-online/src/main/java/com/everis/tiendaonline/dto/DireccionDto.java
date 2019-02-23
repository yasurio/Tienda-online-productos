package com.everis.tiendaonline.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DireccionDto extends BaseDto{

	
	private String direccion;
	
	private String piso;
	
	private String puerta;
	
	private String codigoPostal;
	
	private String poblacion;
	
	private String pais;
		
}
