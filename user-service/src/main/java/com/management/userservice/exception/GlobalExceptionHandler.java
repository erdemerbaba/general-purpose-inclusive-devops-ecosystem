package com.management.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ValidationErrorResponse(LocalDateTime.now(), errors), HttpStatus.BAD_REQUEST);
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

    static class ValidationErrorResponse {
        private LocalDateTime timestamp;
        private List<String> errors;

        public ValidationErrorResponse(LocalDateTime timestamp, List<String> errors) {
            this.timestamp = timestamp;
            this.errors = errors;
        }

        public LocalDateTime getTimestamp() {
            return timestamp;
        }

        public List<String> getErrors() {
            return errors;
        }
    }
}
