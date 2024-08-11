package com.botanice.controller;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.botanice.exception.UserDetailsAreIncorrect;
import com.botanice.model.Message;
import com.botanice.model.User;
import com.botanice.repository.UserRepository;
import com.botanice.util.JwtUtil;






@RestController
@CrossOrigin("http://127.0.0.1:5500")
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/signup")
	public ResponseEntity<User> signup(@RequestBody User user) {
		user.setId(0);
		User resultUser = userRepository.save(user);

		return new ResponseEntity<User>(resultUser, HttpStatus.CREATED);
	}
	@GetMapping("/checkUsername/{username}")
    public ResponseEntity<Boolean> checkUsernameAvailability(@PathVariable String username) {
        boolean isUsernameAvailable = userRepository.findByUsername(username).isEmpty();
        return new ResponseEntity<>(isUsernameAvailable, HttpStatus.OK);
    }
	
	@PostMapping("/login")
	public ResponseEntity<Message> login(@RequestBody User user) {
		Optional<User> result = userRepository.findByUsername(user.getUsername());
		if (result.isEmpty()) {
			throw new UserDetailsAreIncorrect("Username and password are incorrect");
		} else if (!result.isEmpty()) {
			if (!result.get().getPassword().equals(user.getPassword())) {
				throw new UserDetailsAreIncorrect("Username and password are incorrect");
			}
		}
		final String jwt = jwtUtil.generateToken(result.get().getUsername());
		return new ResponseEntity<Message>(new Message(jwt), HttpStatus.OK);
	}
	
	@GetMapping("/validate")
	public ResponseEntity<HashMap<String, Object>> getProtectedResource(@RequestHeader("Authorization") String token) {
	    String jwt = "";
	    HashMap<String, Object> resultMap = new HashMap<>();

	    try {
	        if (token != null && token.startsWith("Bearer ")) {
	            jwt = token.substring(7);
	            if (jwtUtil.validateTokenWithSigningKey(jwt)) {
	                String username = jwtUtil.extractUsername(jwt);
	                Optional<User> userOptional = userRepository.findByUsername(username);

	                if (!userOptional.isEmpty()) {
	                    User user = userOptional.get();

	                    resultMap.put("message", "Access granted to the protected resource!");
	                    resultMap.put("username", username);
	                    resultMap.put("userId", user.getId());

	                    return new ResponseEntity(resultMap, HttpStatus.OK);
	                }
	            }
	        }

	        resultMap.put("message", "Invalid or expired token.");
	        return new ResponseEntity(resultMap, HttpStatus.UNAUTHORIZED);
	    } catch (Exception e) {
	        e.printStackTrace();

	        resultMap.put("message", "Error during token validation.");
	        resultMap.put("error", e.getMessage()); // Add more details if needed
	        return new ResponseEntity(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
