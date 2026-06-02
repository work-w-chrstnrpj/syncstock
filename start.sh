#!/bin/bash
echo "Building and starting Docker containers..."
docker compose up -d --build

echo "Waiting for services to initialize..."
sleep 5

echo "Opening frontend in browser..."
if which xdg-open > /dev/null; then
  xdg-open http://localhost:3000/
elif which open > /dev/null; then
  open http://localhost:3000/
else
  echo "Could not detect the web browser to open. Please navigate to http://localhost:3000/ manually."
fi
echo "Done!"
