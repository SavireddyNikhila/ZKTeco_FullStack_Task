package com.zkteco.student.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zkteco.student.dto.ResultDTO;
import com.zkteco.student.dto.StudentDTO;
import com.zkteco.student.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

	@Autowired
	private StudentService stdService;

	private final Logger logger = LoggerFactory.getLogger(StudentController.class);

	@PostMapping
	public ResultDTO addStudent(@RequestBody StudentDTO stdDto) {
		logger.info("creating a student");
		return stdService.addStudent(stdDto);
	}

	@GetMapping("/{id}")
	public ResultDTO getStudent(@PathVariable("id") String id) {
		logger.info("fetching a student by id");
		return stdService.getStudent(id);
	}

	@GetMapping
	public ResultDTO getAllStudents() {
		logger.info("fetching all the students");
		return stdService.getAllStudents();
	}

	@PutMapping("/{id}")
	public ResultDTO updateStudent(@PathVariable("id") String id, @RequestBody StudentDTO stdDto) {
		logger.info("updating a student by id");
		return stdService.updateStudent(id, stdDto);
	}

	@DeleteMapping("/{id}")
	public ResultDTO deleteStudent(@PathVariable("id") String id) {
		logger.info("deleting a student by id");
		return stdService.deleteStudent(id);
	}

}