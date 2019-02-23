package com.everis.tiendaonline.Unit;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.everis.tiendaonline.controller.entinty.Administrador;
import com.everis.tiendaonline.repository.AdministradorRepository;

@RunWith(MockitoJUnitRunner.class)
public class AdministradorRepositoryUnitTest {
	
	@Mock
	private AdministradorRepository administradorRepository;
	
	@Test
	public void whenFindAll_thenReturnAdministadorList() {
		List<Administrador> list = new ArrayList<>();
		Administrador admin = new Administrador();
		admin.setNombre("Paco");
		admin.setApellidos("Martinez");
		admin.setUsuario("pmart");
		admin.setContrasenya("123456");
		list.add(admin);
		
		when(administradorRepository.findAll()).thenReturn(list);
		
		List<Administrador> result = administradorRepository.findAll();
		
		assertThat(result.get(0).getNombre()).isEqualTo(list.get(0).getNombre());
	}
}