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
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="DIRECCION")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Direccion implements Serializable{
	
	/**
	 * Generated Serial Version
	 */
	private static final long serialVersionUID = 8283420477180012192L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigDecimal id;	
	
	@Column(name="direccion")
	private String direccion;
	
	@Column(name="numero")
	private String numero;
	
	@Column(name="piso")
	private String piso;
	
	@Column(name="puerta")
	private String puerta;
	
	@Column(name="codigoPostal")
	private Integer codigoPostal;
	
	@Column(name="poblacion")
	private String poblacion;
	
	@Column(name="provincia")
	private String provincia;
	
	@Column(name="pais")
	private String pais;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Cliente cliente;
}
