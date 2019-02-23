package com.everis.tiendaonline.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everis.tiendaonline.controller.entinty.Categoria;
import com.everis.tiendaonline.dto.CategoriaDto;
import com.everis.tiendaonline.repository.CategoriaRepository;

@RequestMapping("/categoria")
@RestController("CategoriaController")
public class CategoriaController extends GenericController<CategoriaDto, Categoria, BigDecimal, CategoriaRepository>{

	public CategoriaController() {
		super(CategoriaDto.class, Categoria.class);
		// TODO Auto-generated constructor stub
	}/*
	@Autowired
	private ModelMapper mp;
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Override
	@PostMapping("/find")
	public ResponseEntity<CategoriaDto> find(@RequestBody CategoriaDto categoria){
		Categoria cat= null;	
		Optional<Categoria> catOpt=categoriaRepository.findOne(Example.of(convertDtoToEntity(categoria)));
		if(catOpt.isPresent()) {
			cat = catOpt.get();
		}
		return new ResponseEntity<>(convertEntityToDto(cat),HttpStatus.OK);
	}
	
	@Override
	@GetMapping("/findAll")
	public ResponseEntity<List<CategoriaDto>> findAll(){
		List<Categoria> lista = categoriaRepository.findAll();
		return new ResponseEntity<>(convertEntitytoDto(lista),HttpStatus.OK);
	}
	
	@Override
	@GetMapping("/findByID")
	public ResponseEntity<CategoriaDto> findByID(@RequestParam BigDecimal ID){
		Categoria cat= null;
		Optional<Categoria> catOpt=categoriaRepository.findById(ID);
		if(catOpt.isPresent()) {
			cat = catOpt.get();
		}
		return new ResponseEntity<>(convertEntityToDto(cat),HttpStatus.OK);
	}
	
	@Override
	@DeleteMapping("/delete")
	public ResponseEntity<String>delete(@RequestBody CategoriaDto categoriadto){
		categoriaRepository.delete(convertDtoToEntity(categoriadto));
		return new ResponseEntity<>("Se ha eliminado "+categoriadto.getCodigo()+" con exito",HttpStatus.OK);
	}
	
	@Override
	@DeleteMapping("/deleteAll")
	public ResponseEntity<String> deleteAll(){
		categoriaRepository.deleteAll();
		return new ResponseEntity<>("Elementos eliminados correctamente",HttpStatus.OK);
	}
	
	@Override
	@DeleteMapping("/deleteByID")
	public ResponseEntity<String> deleteByID(@RequestParam BigDecimal id){
		categoriaRepository.deleteById(id);
		return new ResponseEntity<>("Se ha eliminado el objeto con el id " +id+" correctamente",HttpStatus.OK);
	}
	
	@Override
	@PostMapping("/save")
	public ResponseEntity<String> save(@RequestBody CategoriaDto catDto){
		categoriaRepository.save(convertDtoToEntity(catDto));
		return new ResponseEntity<>(catDto.getId()+" "+catDto.getCodigo()+" "+catDto.getDescripcion()+" "+catDto.getProducto()+" añadido correctamente",HttpStatus.OK);
	}
	
	/**
	 * Convierte clases Entity a Dto
	 * @param catDto
	 * @return
	 */
	/*
	private Categoria convertDtoToEntity(CategoriaDto catDto) {
		if(catDto!=null)
			return mp.map(catDto, Categoria.class);
		else 
			return null;
	}
	
	/**
	 * Convierte clases Dto a Entity
	 * @param cat
	 * @return
	 */
	/*
	private CategoriaDto convertEntityToDto(Categoria cat) {
		if(cat!=null)
			return mp.map(cat, CategoriaDto.class);
		else
			return null;
	}
	/**
	 * Convierte una lista Entity a Dto
	 * @param cat
	 * @return
	 *//*
	private List<CategoriaDto> convertEntitytoDto(List<Categoria> cat){
		List<CategoriaDto> list =new ArrayList<CategoriaDto>();
		for (Categoria categoria : cat) {
			list.add(convertEntityToDto(categoria));
		}
		return list;
	}*/
}