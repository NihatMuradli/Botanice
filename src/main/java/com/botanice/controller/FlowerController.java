package com.botanice.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.botanice.exception.FlowerNotFoundException;
import com.botanice.model.Flower;
import com.botanice.model.User;
import com.botanice.repository.FlowerRepository;

@RestController
@CrossOrigin("http://127.0.0.1:5500")
@RequestMapping("/api/flowers")
public class FlowerController {
	@Autowired
	private FlowerRepository flowerRepository;
	
	
	@PostMapping("/addFlower")
	public ResponseEntity<Flower> addFlower(@RequestBody Flower flower) {
		Flower resultFlower = flowerRepository.save(flower);

		return new ResponseEntity<Flower>(resultFlower, HttpStatus.CREATED);
	}
	@GetMapping("/findFlowersByUserId/{userId}")
	public ResponseEntity<List<Flower>> getFlowersByUserId(@PathVariable Integer userId) {
		User user = new User();
		user.setId(userId);
		List<Flower> userFlowers = flowerRepository.findAllByUser(user);
		return new ResponseEntity(userFlowers,HttpStatus.OK);
	}
	@GetMapping("/{flowerId}")
	public ResponseEntity<Flower> getFlowerById(@PathVariable String flowerId) {
		Optional<Flower> resultFlower = flowerRepository.findById(flowerId);
		if(resultFlower.isEmpty()) {
			throw new FlowerNotFoundException("Flower has not found");
		}
		return new ResponseEntity<Flower>(flowerRepository.findById(flowerId).get(), HttpStatus.OK);
	}
	@GetMapping("/checkFlowerId/{flowerId}")
    public ResponseEntity<Boolean> checkFlowerIdAvailability(@PathVariable String flowerId) {
        boolean isFlowerIdAvailable = flowerRepository.findByFlowerId(flowerId).isEmpty();
        return new ResponseEntity<>(isFlowerIdAvailable, HttpStatus.OK);
    }
	@DeleteMapping("/deleteFlower/{flowerId}")
	public ResponseEntity<Flower> deleteFlower(@PathVariable String flowerId){
		Optional<Flower> flowerResult = flowerRepository.findById(flowerId);
		if(!flowerResult.isEmpty()) {
			Flower flower = flowerResult.get();
			flowerRepository.delete(flower);
		} else {
			throw new FlowerNotFoundException("Flower not found");
		}
		return new ResponseEntity<Flower>(flowerResult.get(),HttpStatus.OK);
	}
}
