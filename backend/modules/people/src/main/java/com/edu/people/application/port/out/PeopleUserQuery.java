package com.edu.people.application.port.out;

import java.util.UUID;

public interface PeopleUserQuery {
    boolean userExists(UUID userId);
}

