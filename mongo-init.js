db = connect("localhost:27017/userdb");

db.users.insertOne({
  "username": "main",
  "password": "$2a$10$F22DilwUvHTbIpfzSi5LU.HhnK7wQs3xQUrxSvqndgNe20eJqdTku",
  "name": "main",
  "email": "main@gmail.com",
  "_class": "com.management.userservice.document.User"
});
