package com.botanice.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.botanice.exception.UserDetailsAreIncorrect;
import com.botanice.model.Message;



@RestControllerAdvice
public class ApplicationErrorHandler {
	@ExceptionHandler(UserDetailsAreIncorrect.class)
	public ResponseEntity<Message> handleUserDetailsAreIncorrect(UserDetailsAreIncorrect exception){
		return new ResponseEntity<Message>(new Message(exception.getMessage()),HttpStatus.UNAUTHORIZED);
	}
}
