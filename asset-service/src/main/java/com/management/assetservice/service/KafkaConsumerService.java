package com.management.assetservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class KafkaConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerService.class);

    @KafkaListener(topics = "asset-topic", groupId = "asset-service-group")
    public void consume(String message) {
        logger.info("Consumed message: {}", message);
    }
}
