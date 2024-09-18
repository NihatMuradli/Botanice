# Use an official OpenJDK runtime as a base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file from the target directory of your Maven build
COPY target/Botanice-0.0.1-SNAPSHOT.jar /app/Botanice-0.0.1-SNAPSHOT.jar

# Expose the port your application runs on
EXPOSE 5000

# Environment variables
ENV BACKEND_URL=http://localhost:5000

# Command to run the application
CMD ["java", "-jar", "/app/Botanice-0.0.1-SNAPSHOT.jar"]
