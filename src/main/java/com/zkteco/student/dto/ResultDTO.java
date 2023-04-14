package com.zkteco.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResultDTO {

	private String code;
	private String message;
	private Object data;

	public ResultDTO(String code, String message) {
		this.code = code;
		this.message = message;
	}
}
