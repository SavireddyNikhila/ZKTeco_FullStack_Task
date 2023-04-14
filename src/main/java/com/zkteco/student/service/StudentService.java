package com.zkteco.student.service;

import com.zkteco.student.dto.ResultDTO;
import com.zkteco.student.dto.StudentDTO;

public interface StudentService {

	public ResultDTO addStudent(StudentDTO std);

	public ResultDTO getStudent(String id);

	public ResultDTO getAllStudents();

	public ResultDTO updateStudent(String id, StudentDTO std);

	public ResultDTO deleteStudent(String id);

}
