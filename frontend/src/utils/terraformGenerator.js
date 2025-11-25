// src/utils/terraformGenerator.js
export function generateTerraformScripts(config) {
  const { functionName, runtime, handler, roleArn, memorySize, timeout, region, s3Bucket, s3Key } = config;

  const mainTf = `
provider "aws" {
  region = "${region}"
}

resource "aws_lambda_function" "lambda" {
  function_name = "${functionName}"
  s3_bucket     = "${s3Bucket}"
  s3_key        = "${s3Key}"
  handler       = "${handler}"
  runtime       = "${runtime}"
  role          = "${roleArn}"
  memory_size   = ${memorySize}
  timeout       = ${timeout}
}
`;

  const variablesTf = `
variable "region" {
  description = "AWS region"
  default     = "${region}"
}

variable "function_name" {
  description = "Lambda function name"
  default     = "${functionName}"
}
`;

  const outputsTf = `
output "lambda_function_name" {
  value = aws_lambda_function.lambda.function_name
}

output "lambda_arn" {
  value = aws_lambda_function.lambda.arn
}
`;

  return { mainTf, variablesTf, outputsTf };
}
