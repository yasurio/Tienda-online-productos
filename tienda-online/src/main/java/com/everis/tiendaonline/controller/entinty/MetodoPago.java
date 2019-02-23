package com.everis.tiendaonline.controller.entinty;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="METODOPAGO")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MetodoPago implements Serializable{
	
	/**
	 * Generated serial version
	 */
	private static final long serialVersionUID = 2188323797665831290L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private BigDecimal id;
	
	@Column(name="descripcion")
	private String descripcion;
	
	@OneToOne(fetch=FetchType.LAZY,
			cascade= CascadeType.ALL,
			mappedBy="metodopago")
	private Pedido pedido;
}
