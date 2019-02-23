package com.everis.tiendaonline.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import com.everis.tiendaonline.controller.entinty.Cliente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PedidoDto extends BaseDto{
private Date fecha;
private Cliente usuario;
private BigDecimal importe;
private Set<ProductoDto> metodo_pago;
}
