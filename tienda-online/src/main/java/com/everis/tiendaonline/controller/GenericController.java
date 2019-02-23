package com.everis.tiendaonline.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import com.everis.tiendaonline.dto.BaseDto;
import com.everis.tiendaonline.util.Response;

/*
 * T->CategoriaDto
 * O->Categoria
 * V -> CategoriaRepository extends JpaRepository<O, BigDecimal>
 */
public class GenericController<T extends BaseDto,O, ID extends Number,V extends JpaRepository<O, ID>> {
	
	@Autowired
	private ModelMapper mp;
	
	@Autowired
	private V v;
	
	private Class<T> tParameter;
	
	private Class<O> oParameter;
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	public GenericController(Class<T> tParameter, Class<O> oParameter) {
		super();
		this.tParameter=tParameter;
		this.oParameter=oParameter;
	}
	
	@PostMapping("/find")
	public ResponseEntity<T> find(@RequestBody T object){
		logger.debug("----------/Find-------------");
		O cat= null;	
		Optional<O> catOpt=v.findOne(Example.of(convertDtoToEntity(object)));
		if(catOpt.isPresent()) {
			cat = catOpt.get();
		}
		return new ResponseEntity<>(convertEntityToDto(cat),HttpStatus.OK);
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<T>> findAll(){
		logger.debug("----------/FindAll-------------");
		List<O> lista = v.findAll();
		return new ResponseEntity<>(convertEntityToDto(lista),HttpStatus.OK);
	}

	@GetMapping("/findAllByListId")
	public ResponseEntity<List<T>> findAllByListId(@RequestHeader List<ID> lista){
		logger.debug("----------/findAllByListId-------------");
		/*List<ID> listaDtoFinal =new ArrayList<>(); 
		for (ID id : lista) {
			listaDtoFinal.add(id);
		}      */
		List<O> itrator =v.findAllById(lista);
		return new ResponseEntity<>(convertEntityToDto(itrator),HttpStatus.OK);
	}
	@PostMapping("/findAllByExample")
	public ResponseEntity <List<T>> findAllByExample(@RequestBody T object){
		List<T> result = (List<T>) convertEntityToDto(v.findAll(Example.of(convertDtoToEntity(object))));
		return new ResponseEntity<>(result, !result.isEmpty() ? HttpStatus.OK : HttpStatus.NO_CONTENT);
	}
	@GetMapping("/findByID")
	public ResponseEntity<T> findByID(@RequestParam ID id){
		O object= null;
		Optional<O> objectOpt=v.findById(id);
		if(objectOpt.isPresent()) {
			object = objectOpt.get();
		}
		return new ResponseEntity<>(convertEntityToDto(object),HttpStatus.OK);
	}
	@GetMapping("/existsById")
	public ResponseEntity <Boolean> existByID (@RequestParam ID id){
		if(v.existsById(id)) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.OK);
		
	}
	
	@PostMapping("/existByExample")
	public ResponseEntity <Boolean> existByExample(@RequestBody T objectDto){
		if(v.exists(Example.of(convertDtoToEntity(objectDto)))){
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String>delete(@RequestBody T objectDto){
		v.delete(convertDtoToEntity(objectDto));
		return new ResponseEntity<>("Se ha eliminado "+objectDto.getId()+" con exito",HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteAll")
	public ResponseEntity<String> deleteAll(){
		v.deleteAll();
		return new ResponseEntity<>("Elementos eliminados correctamente",HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteByID")
	public ResponseEntity<String> deleteByID(@RequestParam ID id){
		try {
			v.deleteById(id);
		}catch (IllegalArgumentException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"El parametro introducido es incorrecto",e);
		}
		return new ResponseEntity<>("Se ha eliminado el objeto con el id " +id+" correctamente",HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Response> save(@RequestBody T objectDto){
		v.save(convertDtoToEntity(objectDto));
		Response response=new Response("Muy bien todo");
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping("/saveListExample")
	public ResponseEntity<Response> saveListExample(@RequestBody List<T> objectDto){
		v.saveAll( convertDtoToEntity(objectDto));
		Response response=new Response("Muy bien todo");
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	/**
	 * Convierte clases Entity a Dto
	 * @param catDto
	 * @return
	 */
	
	private O convertDtoToEntity(T catDto) {
		if(catDto!=null)
			return mp.map(catDto, this.oParameter);
		else 
			return null;
	}
	
	/**
	 * Convierte clases Dto a Entity
	 * @param cat
	 * @return
	 */
	private T convertEntityToDto(O cat) {
		if(cat!=null)
			return mp.map(cat, this.tParameter);
		else
			return null;
	}
	/**
	 * Convierte una lista Entity a Dto
	 * @param cat
	 * @return
	 */
	private List<T> convertEntityToDto(List<O> listaO){
		List<T> list =new ArrayList<T>();
		for (O objectO : listaO) {
			list.add(convertEntityToDto(objectO));
		}
		return list;
		/*@SuppressWarnings("unchecked")
		List<T> map = (List<T>) (listaO.stream().map(
				o -> convertEntityToDto(o))
				);
		return map;*/
	}
	
	/**
	 * Convierte una lista Entity a Dto
	 * @param cat
	 * @return
	 */
	private List<O> convertDtoToEntity(List<T> listT){
		List<O> list =new ArrayList<O>();
		for (T objectT : listT) {
			list.add(convertDtoToEntity(objectT));
		}
		return list;
		/*@SuppressWarnings("unchecked")
		List<O> map = (List<O>) (listT.stream().map(
				t -> convertDtoToEntity(t))
				);
		return map;*/
	}
}
