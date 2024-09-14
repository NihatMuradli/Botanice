package com.botanice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.botanice.model.Flower;


@Repository
public interface FlowerRepository extends JpaRepository<Flower, String> {
	
}