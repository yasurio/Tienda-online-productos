package com.everis.tiendaonline.controller.entinty;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PEDIDO")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Pedido implements Serializable {

	/**
	 * Generated serial version
	 */
	private static final long serialVersionUID = 1962330027185825622L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigDecimal id;

	@Column(name = "fecha")
	private Date fecha;

	@Column(name = "importe")
	private BigDecimal importe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_clientes")
	private Cliente cliente;

	@OneToOne
	@JoinColumn(name = "id_metodo_pago")
	private MetodoPago metodopago;

	@ManyToMany
	private Set<Producto> producto = new HashSet<Producto>();

}
