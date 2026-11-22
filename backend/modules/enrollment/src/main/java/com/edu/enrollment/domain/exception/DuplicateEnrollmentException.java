package com.edu.enrollment.domain.exception;

import com.edu.shared.kernel.exception.BusinessException;
import com.edu.shared.kernel.exception.ErrorCode;

public class DuplicateEnrollmentException extends BusinessException {
    public DuplicateEnrollmentException() {
        super(ErrorCode.DUPLICATE_RESOURCE, "Student is already enrolled in this subject for the semester", 409);
    }
}
