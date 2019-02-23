package com.everis.tiendaonline.controller.entinty;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="CATEGORIA")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Categoria implements Serializable{
	
	/**
	 * Generated serial versions
	 */
	private static final long serialVersionUID = 5353821859840716136L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigDecimal id;
	
	@Column(name="codigo")
	private String codigo;
	
	@Column(name="descripcion")
	private String descripcion;
	
	@OneToMany(cascade= CascadeType.ALL,
			mappedBy = "categoria")
	private Set<Producto> producto = new HashSet<Producto>();

}
