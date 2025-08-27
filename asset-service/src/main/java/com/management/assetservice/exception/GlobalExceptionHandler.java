package com.management.assetservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex) {
        System.out.println("Exception caught: " + ex.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>(new ErrorResponse(LocalDateTime.now(), ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> handleAuthenticationException(AuthenticationException ex) {
        System.out.println("AuthenticationException caught: " + ex.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>(new ErrorResponse(LocalDateTime.now(), "Authentication failed"), HttpStatus.UNAUTHORIZED);
    }


    static class ErrorResponse {
        private LocalDateTime timestamp;
        private String message;

        public ErrorResponse(LocalDateTime timestamp, String message) {
            this.timestamp = timestamp;
            this.message = message;
        }

        public LocalDateTime getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }


    }
}
