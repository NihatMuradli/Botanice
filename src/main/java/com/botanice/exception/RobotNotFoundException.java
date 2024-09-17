package com.botanice.exception;

public class RobotNotFoundException extends RuntimeException {
	public RobotNotFoundException(String message) {
		super(message);
	}
}
