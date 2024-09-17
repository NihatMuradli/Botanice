package com.botanice.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Robot {
	@Id
	private String robotId;

	private String version;
	
	private String capacity;
	
	private LocalDate addingTime;
	
	private LocalDate workTime;
	
	private String status;

	@Lob
	@Column(name = "image", columnDefinition = "BLOB")
	private byte[] image;
	
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User user;
}
