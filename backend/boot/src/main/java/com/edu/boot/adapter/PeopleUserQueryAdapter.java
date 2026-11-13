package com.edu.boot.adapter;

import com.edu.identity.infrastructure.persistence.repository.UserJpaRepository;
import com.edu.people.application.port.out.PeopleUserQuery;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PeopleUserQueryAdapter implements PeopleUserQuery {

    private final UserJpaRepository userRepository;

    public PeopleUserQueryAdapter(UserJpaRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean userExists(UUID userId) {
        return userRepository.existsById(userId);
    }
}

