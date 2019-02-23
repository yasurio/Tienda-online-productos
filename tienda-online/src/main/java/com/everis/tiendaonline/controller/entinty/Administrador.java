package com.everis.tiendaonline.controller.entinty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="PRODUCTO")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Administrador extends Usuario{
	
	@Column(name="ean")
	private String ean;
}
