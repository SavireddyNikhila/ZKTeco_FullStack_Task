package com.zkteco.student.service.Impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zkteco.student.dto.ResultDTO;
import com.zkteco.student.dto.StudentDTO;
import com.zkteco.student.entity.StudentDO;
import com.zkteco.student.repository.StudentRepository;
import com.zkteco.student.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository stdRepo;

	@Autowired
	private ModelMapper modelMapper;

	Date date = new Date();
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

	@Override
	public ResultDTO addStudent(StudentDTO stdDto) {
		ResultDTO res = validate(stdDto);
		if (Objects.isNull(res)) {
			StudentDO std = convertToDO(stdDto);
			std.setCreatedDate(sdf.format(date));
			std.setUpdatedDate(sdf.format(date));
			stdRepo.save(std);
			return new ResultDTO("OK", "Student added Successully", convertToDTO(std));
		}
		return res;
	}

	@Override
	public ResultDTO getStudent(String id) {
		Optional<StudentDO> std = stdRepo.findById(id);
		if (std.isEmpty()) {
			return new ResultDTO("SMSE002", "Failed to fetch! No student found with the given id");
		}
		return new ResultDTO("OK", "Student fetched successfully", convertToDTO(std.get()));
	}


	@Override
	public ResultDTO getAllStudents() {
		List<StudentDO> students = stdRepo.findAll();
		if (students.isEmpty()) {
			return new ResultDTO("SMSE003", "Failed to fetch! No student found");
		}
		List<StudentDTO> studentsDto = new ArrayList<>();
		for (StudentDO std : students) {
			studentsDto.add(convertToDTO(std));
		}
		return new ResultDTO("OK", "Students fetched successfully", studentsDto);
	}

	@Override
	public ResultDTO updateStudent(String id, StudentDTO stdDto) {
		Optional<StudentDO> student = stdRepo.findById(id);
		if (student.isEmpty()) {
			return new ResultDTO("SMSE004", "Failed to update! No student found with the given id");
		} else {
			ResultDTO res = isValidToUpdate(stdDto, id);
			if (!Objects.isNull(res)) {
				return res;
			}
		}
		StudentDO std = convertToDO(stdDto);
		std.setCreatedDate(student.get().getCreatedDate());
	    std.setUpdatedDate(sdf.format(date));
		stdRepo.save(std);
		return new ResultDTO("OK", "Student Updated successfully", convertToDTO(std));
	}

	@Override
	public ResultDTO deleteStudent(String id) {
		Optional<StudentDO> std = stdRepo.findById(id);
		if (std.isEmpty()) {
			return new ResultDTO("SMSE005", "Failed to delete! No student found with the given id");
		}
		stdRepo.deleteById(id);
		return new ResultDTO("OK", "Student deleted successfully", convertToDTO(std.get()));
	}

	// DO and DTO conversions
	private StudentDTO convertToDTO(StudentDO std) {
		return modelMapper.map(std, StudentDTO.class);
	}

	private StudentDO convertToDO(StudentDTO stdDto) {
		return modelMapper.map(stdDto, StudentDO.class);
	}

	// Validations
	public ResultDTO validate(StudentDTO std) {

		// validating firstname
		if (!isNullOrEmpty(std.getFirstName())) {
			if (!isValidLength(std.getFirstName()))
				return new ResultDTO("SMSE006", "Length of firstname should not exceed 50 characters");
		} else
			return new ResultDTO("SMSE007", "firstName should not be null");

		// validating lastname
		if (!isNullOrEmpty(std.getLastName()) && !isValidLength(std.getLastName())) {
			return new ResultDTO("SMSE008", "Length of lastname should not exceed 50 characters");
		}

		// validating gender
		if (!isNullOrEmpty(std.getGender()) && !(std.getGender().matches("(?:[M|F|O])"))) {
			return new ResultDTO("SMSE009", "Provide proper gender[M|F|O]");
		}

		// validating branch
		if (isNullOrEmpty(std.getBranch()))
			return new ResultDTO("SMSE010", "Branch should not be null");

		// validating mobile
		if (!isNullOrEmpty(std.getMobile())) {
			if ((std.getMobile().matches("[//+]+[0-9]{2}+[-]+[0-9]{10}"))) {
				if (!isUniq(std.getMobile()))
					return new ResultDTO("SMSE011", "Mobile number should be unique");
			} else {
				return new ResultDTO("SMSE012",
						"PhoneNumber should match with proper format like (+[countrycode]-[10 digit mobile number]",
						"[]");
			}
		} else
			return new ResultDTO("SMSE013", "Mobile number should not be null");

		// validating email
		if (!isNullOrEmpty(std.getEmail())) {
			if ((std.getEmail().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}"))) {
				if (!isUniq(std.getEmail()))
					return new ResultDTO("SMSE014", "Email should be unique");
			} else
				return new ResultDTO("SMSE015", "Email should be in proper format");
		} else
			return new ResultDTO("SMSE016", "Email should not be null");

		return null;
	}

	public ResultDTO isValidToUpdate(StudentDTO std, String id) {

		// validating firstname
		if (!isNullOrEmpty(std.getFirstName()) && !isValidLength(std.getFirstName()))
			return new ResultDTO("SMSE006", "Length of firstname should not exceed 50 characters");

		// validating lastname
		if (!isNullOrEmpty(std.getLastName()) && !isValidLength(std.getLastName())) {
			return new ResultDTO("SMSE008", "Length of lastname should not exceed 50 characters");
		}

		// validating gender
		if (!isNullOrEmpty(std.getGender()) && !(std.getGender().matches("(?:[M|F|O])"))) {
			return new ResultDTO("SMSE010", "Provide proper gender[M|F|O]");
		}

		// validating mobile
		if (!isNullOrEmpty(std.getMobile())) {
			if ((std.getMobile().matches("[//+]+[0-9]{2}+[-]+[0-9]{10}"))) {
				if (!isUnique(std.getMobile(), id))
					return new ResultDTO("SMSE011", "Mobile number should be unique");
			} else {
				return new ResultDTO("SMSE012",
						"PhoneNumber should match with proper format like (+[countrycode]-[10 digit mobile number]",
						"[]");
			}
		}

		// validating email
		if (!isNullOrEmpty(std.getEmail())) {
			if ((std.getEmail().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}"))) {
				if (!isUnique(std.getEmail(), id))
					return new ResultDTO("SMSE014", "Email should be unique");
			} else
				return new ResultDTO("SMSE015", "Email should be in proper format");
		}

		return null;
	}

	public boolean isNullOrEmpty(String str) {
		return Objects.isNull(str) || str.isEmpty();
	}

	public boolean isValidLength(String str) {
		return str.length() <= 50;
	}

	public boolean isUnique(String str, String id) {
		List<StudentDO> students = stdRepo.findAll();
		for (int i = 0; i < students.size(); i++) {
			if (students.get(i).getEmail().equals(str) && students.get(i).getId() != id)
				return false;
		}
		return true;
	}

	public boolean isUniq(String str) {
		List<StudentDO> students = stdRepo.findAll();
		for (int i = 0; i < students.size(); i++) {
			if (students.get(i).getEmail().equals(str))
				return false;
		}
		return true;
	}
}
