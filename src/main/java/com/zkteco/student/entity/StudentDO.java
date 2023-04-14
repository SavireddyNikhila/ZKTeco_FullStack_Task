package com.zkteco.student.entity;

import java.sql.Date;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "student_tbl")
public class StudentDO {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	@Column(name = "student_id", length = 36, unique = true)
	private String id;
	@NotBlank
	@Column(name = "first_name", length = 50)
	private String firstName;
	@Column(name = "last_name", length = 50)
	private String lastName;
	@Column(name = "gender", length = 1)
	private String gender;
	@NotBlank
	@Column(name = "branch")
	private String branch;
	@Column(name = "date_of_birth")
	private Date dateOfBirth;
	@NotBlank
	@Column(name = "mobile", unique = true)
	private String mobile;
	@NotBlank
	@Column(name = "email", unique = true)
	private String email;
	@Column(name = "address")
	private String address;
	@Column(name = "profile")
	@Lob
	private String profile;
	@Column(name = "created_date")
	private String createdDate;
	@Column(name = "updated_date")
	private String updatedDate;

}
