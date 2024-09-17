package com.botanice.controller;


import java.time.LocalDate;
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

import com.botanice.exception.RobotNotFoundException;
import com.botanice.model.Robot;
import com.botanice.model.Robot;
import com.botanice.model.User;
import com.botanice.repository.RobotRepository;

@RestController
@CrossOrigin("http://127.0.0.1:5500")
@RequestMapping("/api/robots")
public class RobotController {
	@Autowired
	private RobotRepository robotRepository;
	
	
	@PostMapping("/addRobot")
	public ResponseEntity<Robot> addRobot(@RequestBody Robot robot) {
		robot.setAddingTime(LocalDate.now());
		robotRepository.save(robot);
		Robot resultRobot = robotRepository.save(robot);

		return new ResponseEntity<Robot>(resultRobot, HttpStatus.CREATED);
	}
	@GetMapping("/findRobotsByUserId/{userId}")
	public ResponseEntity<List<Robot>> getRobotsByUserId(@PathVariable Integer userId) {
		User user = new User();
		user.setId(userId);
		List<Robot> userRobots = robotRepository.findAllByUser(user);
		return new ResponseEntity(userRobots,HttpStatus.OK);
	}
	@GetMapping("/{robotId}")
	public ResponseEntity<Robot> getRobotById(@PathVariable String robotId) {
		Optional<Robot> resultRobot = robotRepository.findById(robotId);
		if(resultRobot.isEmpty()) {
			throw new RobotNotFoundException("Robot has not found");
		}
		return new ResponseEntity<Robot>(robotRepository.findById(robotId).get(), HttpStatus.OK);
	}
	@GetMapping("/checkRobotId/{robotId}")
    public ResponseEntity<Boolean> checkRobotIdAvailability(@PathVariable String robotId) {
        boolean isRobotIdAvailable = robotRepository.findByRobotId(robotId).isEmpty();
        return new ResponseEntity<>(isRobotIdAvailable, HttpStatus.OK);
    }
	@DeleteMapping("/deleteRobot/{robotId}")
	public ResponseEntity<Robot> deleteRobot(@PathVariable String robotId){
		Optional<Robot> robotResult = robotRepository.findById(robotId);
		if(!robotResult.isEmpty()) {
			Robot robot = robotResult.get();
			robotRepository.delete(robot);
		} else {
			throw new RobotNotFoundException("Robot not found");
		}
		return new ResponseEntity<Robot>(robotResult.get(),HttpStatus.OK);
	}
}
