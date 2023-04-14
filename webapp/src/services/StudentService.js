import axios from "axios";

const STUDENT_REST_API_BASE_URL = 'http://localhost:8080/student';//http://localhost:8080/student/8a8a95ad876097f1018760cce81a000a

class StudentService{
    getAllStudents(){
        return axios.get(STUDENT_REST_API_BASE_URL)
    }

    createStudent(student){
        return axios.post(STUDENT_REST_API_BASE_URL,student)
    }
    getStudentById(studentId){
         return axios.get(STUDENT_REST_API_BASE_URL + '/' +studentId);
    }
    updateStudent(studentId,student){
        return axios.put(STUDENT_REST_API_BASE_URL+'/'+studentId, student)
    }
    deleteStudent(studentId){
        return axios.delete(STUDENT_REST_API_BASE_URL+'/'+studentId)
    }
}

export default new StudentService();