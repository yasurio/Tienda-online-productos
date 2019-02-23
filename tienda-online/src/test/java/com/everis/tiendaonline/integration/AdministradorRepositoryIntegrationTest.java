package com.everis.tiendaonline.integration;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.everis.tiendaonline.controller.entinty.Administrador;
import com.everis.tiendaonline.repository.AdministradorRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AdministradorRepositoryIntegrationTest {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private AdministradorRepository administradorRepository;
	
	@Test
	public void whenFindAll_thenReturnAdministadorList() {
		List<Administrador> list = new ArrayList<>();
		Administrador admin = new Administrador("1234");
		admin.setNombre("Paco");
		admin.setApellidos("Martinez");
		admin.setUsuario("pmart");
		admin.setContrasenya("123456");
		list.add(admin);
		
		for (Administrador administrador : list) {
			entityManager.persist(administrador);
		}
		entityManager.flush();
		
		List<Administrador> result = administradorRepository.findAll();
		
		assertThat(result.get(0).getNombre()).isEqualTo(list.get(0).getNombre());
	}
}
