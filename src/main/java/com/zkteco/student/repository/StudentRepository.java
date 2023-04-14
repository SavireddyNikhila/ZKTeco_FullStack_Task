package com.zkteco.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zkteco.student.entity.StudentDO;

@Repository
public interface StudentRepository extends JpaRepository<StudentDO, String> {

}