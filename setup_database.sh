#!/bin/bash
# Database setup script for Lancelot

echo "Checking MySQL connection..."
echo "Initializing database..."
mysql -u root < back-end/database/init.sql
echo "Database setup complete!"
