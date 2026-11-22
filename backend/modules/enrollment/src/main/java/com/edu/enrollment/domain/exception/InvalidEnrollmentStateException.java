package com.edu.enrollment.domain.exception;

import com.edu.shared.kernel.exception.BusinessException;
import com.edu.shared.kernel.exception.ErrorCode;

public class InvalidEnrollmentStateException extends BusinessException {
    public InvalidEnrollmentStateException(String message) {
        super(ErrorCode.BUSINESS_RULE_VIOLATION, message, 422);
    }
}
