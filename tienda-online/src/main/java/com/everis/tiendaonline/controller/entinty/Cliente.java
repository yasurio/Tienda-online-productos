package com.everis.tiendaonline.controller.entinty;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="CLIENTE")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cliente extends Usuario{
	
	
	@Column(name="email")
	private String email;
	
	@OneToMany(mappedBy = "cliente")
	private Set<Pedido> pedido ;
	
	@OneToMany(fetch = FetchType.LAZY,
				cascade = CascadeType.ALL)
	@JoinColumn(name="cliente_id")
	private Set<Direccion> direccion = new HashSet<Direccion>(); 
}
