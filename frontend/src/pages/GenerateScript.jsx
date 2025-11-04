import React, { useState, useRef } from "react";
import LambdaForm from "../components/LambdaForm";
import S3Form from "../components/S3Form";
import ServiceSelector from "../components/ServiceSelector";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function GenerateScript() {
  const s3FormRef = useRef();
  const [selectedServices, setSelectedServices] = useState({});
  const [lambdaData, setLambdaData] = useState(null);
  const [s3Data, setS3Data] = useState(null);

  const handleGenerate = async () => {
    // --- Validation ---
    if (selectedServices.lambda) {
      if (!lambdaData || Object.values(lambdaData).some((v) => v === "" || v === null)) {
        alert("Please fill all Lambda details correctly.");
        return;
      }
    }

    if (selectedServices.s3) {
      if (!s3Data || !s3FormRef.current.validate()) {
        alert("Please fill all S3 details correctly.");
        return;
      }
    }

    if (!selectedServices.lambda && !selectedServices.s3) {
      alert("Select at least one service.");
      return;
    }

    // --- Terraform Files ---
    const providerTf = `
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

    let variablesTf = `
variable "region" {
  type        = string
  description = "AWS region"
}
`.trim();

    let mainTf = "";
    let outputsTf = "";
    let tfvars = "";

    // --- Lambda Configuration ---
    if (selectedServices.lambda && lambdaData) {
      variablesTf += `

variable "function_name" {
  type        = string
  description = "Lambda function name"
}

variable "runtime" {
  type        = string
  description = "Lambda runtime"
}

variable "handler" {
  type        = string
  description = "Lambda handler"
}

variable "role_arn" {
  type        = string
  description = "Lambda IAM role ARN"
}

variable "memory_size" {
  type        = number
  description = "Lambda memory size"
}

variable "timeout" {
  type        = number
  description = "Lambda timeout"
}
`;

      mainTf += `
# Lambda
resource "aws_lambda_function" "demo_lambda" {
  function_name    = var.function_name
  runtime          = var.runtime
  handler          = var.handler
  role             = var.role_arn
  memory_size      = var.memory_size
  timeout          = var.timeout
  filename         = "lambda_function_payload.zip"
  source_code_hash = filebase64sha256("lambda_function_payload.zip")
}
`;

      outputsTf += `
# Lambda Outputs
output "lambda_function_name" {
  value = aws_lambda_function.demo_lambda.function_name
}

output "lambda_function_arn" {
  value = aws_lambda_function.demo_lambda.arn
}
`;

      tfvars += `
# Lambda
region        = "${lambdaData.region}"
function_name = "${lambdaData.functionName}"
runtime       = "${lambdaData.runtime}"
handler       = "${lambdaData.handler}"
role_arn      = "${lambdaData.roleArn}"
memory_size   = ${lambdaData.memorySize}
timeout       = ${lambdaData.timeout}
`;
    }

    // --- S3 Configuration ---
    if (selectedServices.s3 && s3Data) {
      variablesTf += `

variable "s3_bucket_name" {
  type        = string
  description = "S3 bucket name"
}

variable "s3_acl" {
  type        = string
  description = "S3 ACL (e.g. private, public-read)"
}

variable "s3_versioning" {
  type        = bool
  description = "Enable S3 bucket versioning"
}

variable "s3_encryption" {
  type        = string
  description = "S3 encryption type (AES256, aws:kms, or none)"
}

variable "s3_force_destroy" {
  type        = bool
  description = "Force destroy the bucket on deletion"
}
`;

      mainTf += `
# S3 Bucket
resource "aws_s3_bucket" "demo_s3" {
  bucket        = var.s3_bucket_name
  acl           = var.s3_acl
  force_destroy = var.s3_force_destroy

  versioning {
    enabled = var.s3_versioning
  }

  dynamic "server_side_encryption_configuration" {
    for_each = var.s3_encryption != "none" ? [1] : []
    content {
      rule {
        apply_server_side_encryption_by_default {
          sse_algorithm = var.s3_encryption
        }
      }
    }
  }
}
`;

      outputsTf += `
# S3 Outputs
output "s3_bucket_name" {
  value = aws_s3_bucket.demo_s3.bucket
}
`;

      tfvars += `
# S3
region            = "${s3Data.region}"
s3_bucket_name    = "${s3Data.bucketName}"
s3_acl            = "${s3Data.acl}"
s3_versioning     = ${s3Data.versioning}
s3_encryption     = "${s3Data.encryption}"
s3_force_destroy  = ${s3Data.forceDestroy}
`;
    }

    // --- Generate Zip ---
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
    <div className="min-h-screen bg-gray-100 p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Select Services</h2>
      <ServiceSelector onChange={setSelectedServices} />

      {selectedServices.lambda && <LambdaForm onChange={setLambdaData} />}
      {selectedServices.s3 && <S3Form ref={s3FormRef} onChange={setS3Data} />}

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition-colors"
      >
        Generate Terraform Files
      </button>
    </div>
  );
}
