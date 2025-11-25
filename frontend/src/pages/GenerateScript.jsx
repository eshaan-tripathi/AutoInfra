'use client'

import React, { useState, useRef } from "react";
import ServiceSelector from "../components/ServiceSelector";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// AWS Forms
import LambdaForm from "../components/forms/AWS/LambdaForm";
import S3Form from "../components/forms/AWS/S3Form";
import EC2Form from "../components/forms/AWS/EC2Form";
import RDSForm from "../components/forms/AWS/RDSForm";
import DynamoDBForm from "../components/forms/AWS/DynamoDBForm";

// GCP Forms
import CloudFunctionForm from "../components/forms/GCP/CloudFunctionForm";
import StorageForm from "../components/forms/GCP/StorageForm";
import ComputeEngineForm from "../components/forms/GCP/ComputeEngineForm";
import CloudSQLForm from "../components/forms/GCP/CloudSQLForm";

// Azure Forms
import FunctionAppForm from "../components/forms/AZURE/FunctionAppForm";
import StorageAccountForm from "../components/forms/AZURE/StorageAccountForm";
import VMForm from "../components/forms/AZURE/VMForm";
import SQLDatabaseForm from "../components/forms/AZURE/SQLDatabaseForm";

export default function GenerateScript() {
  const s3FormRef = useRef();

  const [cloudProvider, setCloudProvider] = useState("");
  const [selectedServices, setSelectedServices] = useState({});

  // AWS States
  const [lambdaData, setLambdaData] = useState(null);
  const [s3Data, setS3Data] = useState(null);
  const [ec2Data, setEC2Data] = useState(null);
  const [rdsData, setRDSData] = useState(null);
  const [dynamoData, setDynamoData] = useState(null);

  // GCP States
  const [cloudFunctionData, setCloudFunctionData] = useState(null);
  const [storageData, setStorageData] = useState(null);
  const [computeEngineData, setComputeEngineData] = useState(null);
  const [cloudSQLData, setCloudSQLData] = useState(null);

  // Azure States
  const [functionAppData, setFunctionAppData] = useState(null);
  const [storageAccountData, setStorageAccountData] = useState(null);
  const [vmData, setVMData] = useState(null);
  const [sqlDatabaseData, setSQLDatabaseData] = useState(null);

  const cloudOptions = ["AWS", "GCP", "Azure"];

  const awsServiceList = [
    { key: "lambda", label: "AWS Lambda" },
    { key: "s3", label: "Amazon S3" },
    { key: "ec2", label: "Amazon EC2" },
    { key: "rds", label: "Amazon RDS" },
    { key: "dynamodb", label: "Amazon DynamoDB" },
  ];

  const gcpServiceList = [
    { key: "cloudFunction", label: "Cloud Functions" },
    { key: "storage", label: "Cloud Storage" },
    { key: "computeEngine", label: "Compute Engine" },
    { key: "cloudSQL", label: "Cloud SQL" },
  ];

  const azureServiceList = [
    { key: "functionApp", label: "Azure Function App" },
    { key: "storageAccount", label: "Azure Storage Account" },
    { key: "vm", label: "Virtual Machines" },
    { key: "sqlDatabase", label: "Azure SQL Database" },
  ];

  // ✅ Full Validation Logic
  const validateInputs = () => {
    if (!cloudProvider) {
      alert("Please select a cloud provider.");
      return false;
    }

    if (Object.values(selectedServices).every((v) => !v)) {
      alert("Select at least one service.");
      return false;
    }

    // AWS
    if (cloudProvider === "AWS") {
      if (selectedServices.lambda && !lambdaData) return alert("Lambda: Fill all mandatory fields.");
      if (selectedServices.s3 && (!s3Data || !s3FormRef.current.validate())) return alert("S3: Fill all mandatory fields.");
      if (selectedServices.ec2 && !ec2Data) return alert("EC2: Fill all mandatory fields.");
      if (selectedServices.rds && !rdsData) return alert("RDS: Fill all mandatory fields.");
      if (selectedServices.dynamodb && !dynamoData) return alert("DynamoDB: Fill all mandatory fields.");
    }

    // GCP
    if (cloudProvider === "GCP") {
      if (selectedServices.cloudFunction && !cloudFunctionData) return alert("Cloud Function: Fill all mandatory fields.");
      if (selectedServices.storage && !storageData) return alert("Storage: Fill all mandatory fields.");
      if (selectedServices.computeEngine && !computeEngineData) return alert("Compute Engine: Fill all mandatory fields.");
      if (selectedServices.cloudSQL && !cloudSQLData) return alert("Cloud SQL: Fill all mandatory fields.");
    }

    // Azure
    if (cloudProvider === "Azure") {
      if (selectedServices.functionApp && !functionAppData) return alert("Function App: Fill all mandatory fields.");
      if (selectedServices.storageAccount && !storageAccountData) return alert("Storage Account: Fill all mandatory fields.");
      if (selectedServices.vm && !vmData) return alert("VM: Fill all mandatory fields.");
      if (selectedServices.sqlDatabase && !sqlDatabaseData) return alert("SQL Database: Fill all mandatory fields.");
    }

    return true;
  };

  // ✅ Terraform Generation Logic
  const handleGenerate = async () => {
    if (!validateInputs()) return;

    let providerTf = "";
    let variablesTf = "";
    let mainTf = "";
    let outputsTf = "";
    let tfvars = "";

    // AWS Terraform
    if (cloudProvider === "AWS") {
      providerTf = `
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.5.0"
}

provider "aws" {
  region = var.region
}
`.trim();

      variablesTf = `variable "region" { type = string }`;

      if (selectedServices.lambda) {
        mainTf += `
resource "aws_lambda_function" "demo_lambda" {
  function_name = "${lambdaData.functionName}"
  runtime       = "${lambdaData.runtime}"
  handler       = "${lambdaData.handler}"
  role          = "${lambdaData.roleArn}"
  memory_size   = ${lambdaData.memorySize}
  timeout       = ${lambdaData.timeout}
}
`;
      }

      if (selectedServices.s3) {
        mainTf += `
resource "aws_s3_bucket" "demo_s3" {
  bucket = "${s3Data.bucketName}"
  acl    = "${s3Data.acl}"
}
`;
      }

      if (selectedServices.ec2) {
        mainTf += `
resource "aws_instance" "demo_ec2" {
  ami           = "${ec2Data.ami}"
  instance_type = "${ec2Data.instanceType}"
  key_name      = "${ec2Data.keyName}"
}
`;
      }

      if (selectedServices.rds) {
        mainTf += `
resource "aws_db_instance" "demo_rds" {
  allocated_storage    = ${rdsData.allocatedStorage}
  engine               = "${rdsData.engine}"
  instance_class       = "${rdsData.instanceClass}"
  name                 = "${rdsData.dbName}"
  username             = "${rdsData.username}"
  password             = "${rdsData.password}"
  skip_final_snapshot  = true
}
`;
      }

      if (selectedServices.dynamodb) {
        mainTf += `
resource "aws_dynamodb_table" "demo_dynamodb" {
  name         = "${dynamoData.tableName}"
  billing_mode = "${dynamoData.billingMode}"
  hash_key     = "${dynamoData.hashKey}"

  attribute {
    name = "${dynamoData.hashKey}"
    type = "${dynamoData.attributeType}"
  }
}
`;
      }
    }

    // ✅ GCP Terraform
    if (cloudProvider === "GCP") {
      providerTf = `
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
}
`.trim();

      if (selectedServices.cloudFunction) {
        mainTf += `
resource "google_cloudfunctions_function" "demo_function" {
  name        = "${cloudFunctionData.name}"
  runtime     = "${cloudFunctionData.runtime}"
  entry_point = "${cloudFunctionData.entryPoint}"
  region      = "${cloudFunctionData.region}"
}
`;
      }

      if (selectedServices.storage) {
        mainTf += `
resource "google_storage_bucket" "demo_bucket" {
  name     = "${storageData.name}"
  location = "${storageData.location}"
}
`;
      }

      if (selectedServices.computeEngine) {
        mainTf += `
resource "google_compute_instance" "demo_instance" {
  name         = "${computeEngineData.name}"
  machine_type = "${computeEngineData.machineType}"
  zone         = "${computeEngineData.zone}"
}
`;
      }

      if (selectedServices.cloudSQL) {
        mainTf += `
resource "google_sql_database_instance" "demo_sql" {
  name             = "${cloudSQLData.name}"
  database_version = "${cloudSQLData.databaseVersion}"
  region           = "${cloudSQLData.region}"
}
`;
      }
    }

    // ✅ Azure Terraform
    if (cloudProvider === "Azure") {
      providerTf = `
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}
`.trim();

      if (selectedServices.functionApp) {
        mainTf += `
resource "azurerm_function_app" "demo_function" {
  name                = "${functionAppData.name}"
  resource_group_name = "${functionAppData.resourceGroupName}"
  location            = "${functionAppData.location}"
}
`;
      }

      if (selectedServices.storageAccount) {
        mainTf += `
resource "azurerm_storage_account" "demo_storage" {
  name                     = "${storageAccountData.name}"
  resource_group_name      = "${storageAccountData.resourceGroupName}"
  location                 = "${storageAccountData.location}"
  account_tier             = "${storageAccountData.accountTier}"
  account_replication_type = "${storageAccountData.replicationType}"
}
`;
      }

      if (selectedServices.vm) {
        mainTf += `
resource "azurerm_linux_virtual_machine" "demo_vm" {
  name                = "${vmData.name}"
  resource_group_name = "${vmData.resourceGroupName}"
  location            = "${vmData.location}"
  size                = "${vmData.size}"
}
`;
      }

      if (selectedServices.sqlDatabase) {
        mainTf += `
resource "azurerm_mssql_database" "demo_sql" {
  name                = "${sqlDatabaseData.name}"
  resource_group_name = "${sqlDatabaseData.resourceGroupName}"
  server_id           = "${sqlDatabaseData.serverName}"
}
`;
      }
    }

    const zip = new JSZip();
    zip.file("provider.tf", providerTf);
    zip.file("variables.tf", variablesTf.trim());
    zip.file("main.tf", mainTf.trim());
    zip.file("outputs.tf", outputsTf.trim());
    zip.file("terraform.tfvars", tfvars.trim());

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "terraform_infra.zip");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Select Cloud Provider</h2>
      <select
        value={cloudProvider}
        onChange={(e) => {
          setCloudProvider(e.target.value);
          setSelectedServices({});
        }}
        className="bg-gray-800 text-white p-2 rounded w-full"
      >
        <option value="">-- Select Cloud --</option>
        {cloudOptions.map((cloud) => (
          <option key={cloud} value={cloud}>
            {cloud}
          </option>
        ))}
      </select>

      {cloudProvider && (
        <>
        <span className="flex">  <h2 className="text-xl font-semibold text-white">Select Services</h2> <h3 className="text-blue-600 ml-8 py-1"> We are adding more services soon!!!</h3></span>
          <ServiceSelector
            services={
              cloudProvider === "AWS"
                ? awsServiceList
                : cloudProvider === "GCP"
                ? gcpServiceList
                : azureServiceList
            }
            onChange={setSelectedServices}
          />
        </>
      )}

      {/* AWS Forms */}
      {cloudProvider === "AWS" && selectedServices.lambda && <LambdaForm onChange={setLambdaData} />}
      {cloudProvider === "AWS" && selectedServices.s3 && <S3Form ref={s3FormRef} onChange={setS3Data} />}
      {cloudProvider === "AWS" && selectedServices.ec2 && <EC2Form onChange={setEC2Data} />}
      {cloudProvider === "AWS" && selectedServices.rds && <RDSForm onChange={setRDSData} />}
      {cloudProvider === "AWS" && selectedServices.dynamodb && <DynamoDBForm onChange={setDynamoData} />}

      {/* GCP Forms */}
      {cloudProvider === "GCP" && selectedServices.cloudFunction && <CloudFunctionForm onChange={setCloudFunctionData} />}
      {cloudProvider === "GCP" && selectedServices.storage && <StorageForm onChange={setStorageData} />}
      {cloudProvider === "GCP" && selectedServices.computeEngine && <ComputeEngineForm onChange={setComputeEngineData} />}
      {cloudProvider === "GCP" && selectedServices.cloudSQL && <CloudSQLForm onChange={setCloudSQLData} />}

      {/* Azure Forms */}
      {cloudProvider === "Azure" && selectedServices.functionApp && <FunctionAppForm onChange={setFunctionAppData} />}
      {cloudProvider === "Azure" && selectedServices.storageAccount && <StorageAccountForm onChange={setStorageAccountData} />}
      {cloudProvider === "Azure" && selectedServices.vm && <VMForm onChange={setVMData} />}
      {cloudProvider === "Azure" && selectedServices.sqlDatabase && <SQLDatabaseForm onChange={setSQLDatabaseData} />}

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition-colors"
      >
        Generate Terraform Files
      </button>
    </div>
  );
}