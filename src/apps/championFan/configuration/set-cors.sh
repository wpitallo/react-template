#!/bin/bash
export PYTHONWARNINGS="ignore"

# Set your Firebase Storage bucket name
BUCKET_NAME="championfan-co-dev-be77b.appspot.com"

# Define the CORS configuration JSON
CORS_CONFIG='[
  {
    "origin": ["http://localhost:3000"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]'

# Create a temporary file to store the CORS configuration
TEMP_FILE=$(mktemp)

# Write the CORS configuration to the temporary file
echo "$CORS_CONFIG" > $TEMP_FILE

# Set the CORS configuration for the specified bucket using gsutil
gsutil cors set $TEMP_FILE gs://$BUCKET_NAME

# Remove the temporary file
rm $TEMP_FILE

echo "CORS configuration has been set for the bucket: $BUCKET_NAME"