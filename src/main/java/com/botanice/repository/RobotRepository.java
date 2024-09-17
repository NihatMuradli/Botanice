package com.botanice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.botanice.model.Robot;
import com.botanice.model.User;

@Repository
public interface RobotRepository extends JpaRepository<Robot, String> {
	public Optional<Robot> findByRobotId(String robotId);
	List<Robot> findAllByUser(User user);
}
