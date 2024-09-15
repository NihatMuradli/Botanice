package com.botanice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.botanice.model.Flower;
import com.botanice.model.User;



@Repository
public interface FlowerRepository extends JpaRepository<Flower, String> {
	public Optional<Flower> findByFlowerId(String flowerId);
	List<Flower> findAllByUser(User user);
}