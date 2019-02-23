package com.everis.tiendaonline.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioDto extends BaseDto{
	private String usuario;
	private String contrasenya;
	private String nombre;
	private String apellidos;
}
