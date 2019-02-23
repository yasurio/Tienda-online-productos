package com.everis.tiendaonline.controller.entinty;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
public class Producto implements Serializable{
	
	/**
	 * Generated serial version
	 */
	private static final long serialVersionUID = 2400561271363817669L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private BigDecimal id;
	
	@Column(name="ean")
	private String ean;
	
	@Column(name="descripcion")
	private String descripcion;
	
	@Column(name="imagen")
	private String imagen;
	
	@Column(name="precio")
	private BigDecimal precio;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="id_categoria")
	private Categoria categoria;
	
	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(
			name="PEDIDO_PRODUCTO",
			joinColumns = { @JoinColumn(name ="producto_id")},
			inverseJoinColumns = {@JoinColumn(name="pedido_id")}		
			)
	private Set<Pedido> pedido =new HashSet<Pedido>();
}
