@echo off
echo Starting Xebia LMS Backend Services...
set JAVA_TOOL_OPTIONS=-Duser.timezone=UTC

cd api-gateway
start "API Gateway" cmd /k "mvnw spring-boot:run"
cd ..

cd user-service
start "User Service" cmd /k "mvnw spring-boot:run"
cd ..

cd batch-service
start "Batch Service" cmd /k "mvnw spring-boot:run"
cd ..

cd assessment-service
start "Assessment Service" cmd /k "mvnw spring-boot:run"
cd ..

echo All services are spinning up in separate windows!
