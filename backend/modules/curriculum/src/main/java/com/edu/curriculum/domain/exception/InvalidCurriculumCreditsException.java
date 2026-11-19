package com.edu.curriculum.domain.exception;

import com.edu.shared.kernel.exception.BusinessException;
import com.edu.shared.kernel.exception.ErrorCode;

public class InvalidCurriculumCreditsException extends BusinessException {

    public InvalidCurriculumCreditsException(int totalCredits, int requiredCredits) {
        super(
                ErrorCode.BUSINESS_RULE_VIOLATION,
                String.format(
                        "Curriculum total credits (%d) must cover required subjects credits (%d)",
                        totalCredits,
                        requiredCredits
                ),
                422
        );
    }
}
