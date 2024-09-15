package com.botanice.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.botanice.model.Flower;
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
	@GetMapping("/getFlowers")
	public ResponseEntity<List<Flower>> getFlowers() {
		return new ResponseEntity<List<Flower>>(flowerRepository.findAll(), HttpStatus.OK);
	}
	@GetMapping("/checkFlowerId/{flowerId}")
    public ResponseEntity<Boolean> checkFlowerIdAvailability(@PathVariable String flowerId) {
        boolean isFlowerIdAvailable = flowerRepository.findByFlowerId(flowerId).isEmpty();
        return new ResponseEntity<>(isFlowerIdAvailable, HttpStatus.OK);
    }
}
