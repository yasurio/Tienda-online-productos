package com.everis.tiendaonline.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.everis.tiendaonline.util.Response;

@ControllerAdvice
public class DefaultExceptionHandler {

	@ExceptionHandler({ IllegalArgumentException.class, NullPointerException.class,
			HttpMessageNotReadableException.class })

	public ResponseEntity<Response> handleException(Exception exception) {
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		String message = "Error ene el servidor";
		if (exception instanceof NullPointerException) {
			message = "Error de putero nulo";
			httpStatus = HttpStatus.BAD_REQUEST;
		} else if (exception instanceof IllegalArgumentException) {
			message = "Error numero de parametros recibido no es correcto, cheñor";
			httpStatus = HttpStatus.BAD_REQUEST;

		} else if (exception instanceof HttpMessageNotReadableException) {
			message = "Error en el formato de JSON rechibido";
			httpStatus = HttpStatus.BAD_REQUEST;
		}
		return new ResponseEntity<>(new Response(message, httpStatus.value()), httpStatus);
	}
}

