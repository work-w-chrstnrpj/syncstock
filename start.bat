@echo off
echo Building and starting Docker containers...
docker compose up -d --build

echo Waiting for services to initialize...
timeout /t 5 /nobreak >nul

echo Opening frontend in browser...
start http://localhost:3000/
echo Done!
