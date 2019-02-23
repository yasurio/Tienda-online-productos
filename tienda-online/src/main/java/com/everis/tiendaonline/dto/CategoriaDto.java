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
public class CategoriaDto extends BaseDto {
private String codigo;
private String descripcion;
private List<ProductoDto> producto;
}
