package com.botanice.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Flower {
	@Id
	private String flowerId;

	private String specie;

	private LocalDate birthdate;

	private Double nitrogen;

	private Double phosphorus;

	private Double potassium;

	@Lob
	@Column(name = "image", columnDefinition = "BLOB")
	private byte[] image;
	
	private Double humidity;
	
	private Double temperature;
	
	private Double conductivity;
	
	private Double ph;
	
	private Boolean onsale;
	
	private Double price;

	private LocalDateTime timestamp;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User user;
}
