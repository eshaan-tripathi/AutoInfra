// src/data/cloudServices.js

export const cloudProviders = [
  {
    name: "AWS",
    services: [
      {
        name: "EC2",
        config: [
          { key: "Instance Name", required: true },
          { key: "Region", required: true },
          { key: "Instance Type", required: true },
          { key: "AMI ID", required: true },
          { key: "Key Pair Name", required: false },
          { key: "Security Group", required: false }
        ]
      },
      {
        name: "S3",
        config: [
          { key: "Bucket Name", required: true },
          { key: "Region", required: true },
          { key: "Storage Class", required: false },
          { key: "Versioning Enabled", required: false }
        ]
      },
      {
        name: "RDS",
        config: [
          { key: "DB Name", required: true },
          { key: "Region", required: true },
          { key: "Engine", required: true },
          { key: "Instance Type", required: true },
          { key: "Username", required: true },
          { key: "Password", required: true },
          { key: "Multi-AZ", required: false }
        ]
      },
      {
        name: "Lambda",
        config: [
          { key: "Function Name", required: true },
          { key: "Runtime", required: true },
          { key: "Region", required: true },
          { key: "Memory Size", required: false },
          { key: "Timeout", required: false }
        ]
      },
      {
        name: "VPC",
        config: [
          { key: "VPC Name", required: true },
          { key: "Region", required: true },
          { key: "CIDR Block", required: true }
        ]
      },
      {
        name: "CloudFront",
        config: [
          { key: "Distribution Name", required: true },
          { key: "Origin Domain", required: true },
          { key: "Region", required: true }
        ]
      },
      {
        name: "DynamoDB",
        config: [
          { key: "Table Name", required: true },
          { key: "Region", required: true },
          { key: "Primary Key", required: true },
          { key: "Read Capacity", required: false },
          { key: "Write Capacity", required: false }
        ]
      }
    ]
  },
  {
    name: "Azure",
    services: [
      {
        name: "VM",
        config: [
          { key: "VM Name", required: true },
          { key: "Region", required: true },
          { key: "Size", required: true },
          { key: "Image", required: true }
        ]
      },
      {
        name: "Storage Account",
        config: [
          { key: "Account Name", required: true },
          { key: "Region", required: true },
          { key: "SKU", required: false },
          { key: "Replication Type", required: false }
        ]
      },
      {
        name: "SQL Database",
        config: [
          { key: "DB Name", required: true },
          { key: "Server Name", required: true },
          { key: "Region", required: true },
          { key: "Edition", required: true }
        ]
      },
      {
        name: "App Service",
        config: [
          { key: "App Name", required: true },
          { key: "Region", required: true },
          { key: "Runtime Stack", required: true },
          { key: "SKU", required: false }
        ]
      },
      {
        name: "Virtual Network (VNet)",
        config: [
          { key: "VNet Name", required: true },
          { key: "Region", required: true },
          { key: "Address Space", required: true }
        ]
      },
      {
        name: "Azure Functions",
        config: [
          { key: "Function Name", required: true },
          { key: "Runtime", required: true },
          { key: "Region", required: true },
          { key: "Memory", required: false }
        ]
      },
      {
        name: "Blob Storage",
        config: [
          { key: "Container Name", required: true },
          { key: "Account Name", required: true },
          { key: "Region", required: true }
        ]
      }
    ]
  },
  {
    name: "GCP",
    services: [
      {
        name: "Compute Engine",
        config: [
          { key: "Instance Name", required: true },
          { key: "Region", required: true },
          { key: "Machine Type", required: true },
          { key: "Image", required: true },
          { key: "Network", required: false }
        ]
      },
      {
        name: "Cloud Storage",
        config: [
          { key: "Bucket Name", required: true },
          { key: "Region", required: true },
          { key: "Storage Class", required: false },
          { key: "Versioning", required: false }
        ]
      },
      {
        name: "Cloud SQL",
        config: [
          { key: "Instance Name", required: true },
          { key: "Region", required: true },
          { key: "DB Version", required: true },
          { key: "Username", required: true },
          { key: "Password", required: true }
        ]
      },
      {
        name: "Cloud Functions",
        config: [
          { key: "Function Name", required: true },
          { key: "Runtime", required: true },
          { key: "Region", required: true },
          { key: "Memory", required: false }
        ]
      },
      {
        name: "VPC Network",
        config: [
          { key: "VPC Name", required: true },
          { key: "Region", required: true },
          { key: "CIDR Block", required: true }
        ]
      },
      {
        name: "Cloud Pub/Sub",
        config: [
          { key: "Topic Name", required: true },
          { key: "Region", required: true }
        ]
      },
      {
        name: "BigQuery",
        config: [
          { key: "Dataset Name", required: true },
          { key: "Region", required: true }
        ]
      }
    ]
  }
];
