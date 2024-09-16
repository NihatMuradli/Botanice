package com.botanice.exception;

public class FlowerNotFoundException extends RuntimeException {
	public FlowerNotFoundException(String message) {
		super(message);
	}
}
