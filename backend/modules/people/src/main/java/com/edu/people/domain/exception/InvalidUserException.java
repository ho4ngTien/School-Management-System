package com.edu.people.domain.exception;

import com.edu.shared.kernel.exception.BusinessException;
import com.edu.shared.kernel.exception.ErrorCode;

import java.util.UUID;

public class InvalidUserException extends BusinessException {

    public InvalidUserException(UUID userId) {
        super(
                ErrorCode.RESOURCE_NOT_FOUND,
                String.format("User with id '%s' does not exist in identity system", userId),
                422
        );
    }
}

