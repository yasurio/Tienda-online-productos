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

import com.everis.tiendaonline.controller.entinty.Categoria;
import com.everis.tiendaonline.repository.CategoriaRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CategoriaRepositoryIntegrationTest {
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Test
	public void whenFindAll_thenReturnAdministadorList() {
		List<Categoria> list = new ArrayList<>();
		Categoria cat = new Categoria();
		cat.setCodigo("1");
		cat.setDescripcion("CATEGORIA 1");
		list.add(cat);
		
		for (Categoria categoria : list) {
			entityManager.persist(categoria);
		}
		entityManager.flush();
		
		List<Categoria> result = categoriaRepository.findAll();
		
		assertThat(result.get(0).getDescripcion()).isEqualTo(list.get(0).getDescripcion());
	}
}
