package com.everis.tiendaonline.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClienteDto extends UsuarioDto{
	
	private String email;
	
	private List<DireccionDto> direccion;
}
