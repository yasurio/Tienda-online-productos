package com.everis.tiendaonline.util;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Response {
	
	private String message;
	
	private Integer status;
	
	public Response (String message) {
		super();
		this.message=message;
		
	}
}
