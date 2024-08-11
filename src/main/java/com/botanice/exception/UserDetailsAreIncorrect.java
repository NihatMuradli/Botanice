package com.botanice.exception;

public class UserDetailsAreIncorrect extends RuntimeException {
	public UserDetailsAreIncorrect(String message) {
		super(message);
	}
}
