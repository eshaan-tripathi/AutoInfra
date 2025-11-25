'use client'
import React, { useState, useEffect } from "react";

const regions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "ap-south-1", "ap-northeast-1", "ap-southeast-1",
  "eu-central-1", "eu-west-1",
];

const runtimes = ["nodejs18.x", "python3.11", "java11", "go1.x"];

export default function LambdaForm({ onChange }) {
  const [formData, setFormData] = useState({
    functionName: "",
    runtime: "nodejs18.x",
    handler: "index.handler",
    roleArn: "",
    memorySize: 128,
    timeout: 3,
    region: "us-east-1",
  });

  const [errors, setErrors] = useState({});

  const validate = (data = formData) => {
    const err = {};

    // ✅ Mandatory: Function Name
    if (!data.functionName) {
      err.functionName = "Function name is required.";
    } else if (!/^[a-zA-Z0-9-_]{1,64}$/.test(data.functionName)) {
      err.functionName = "Invalid format (1–64 chars, letters, numbers, hyphens, underscores).";
    }

    // ✅ Mandatory: Runtime
    if (!runtimes.includes(data.runtime)) {
      err.runtime = "Invalid runtime selected.";
    }

    // ✅ Mandatory: Handler
    if (!data.handler) {
      err.handler = "Handler is required.";
    } else if (!/^[\w.-]+\.?[\w.-]*$/.test(data.handler)) {
      err.handler = "Invalid handler format.";
    }

    // ✅ Mandatory: Role ARN
    if (!data.roleArn) {
      err.roleArn = "Role ARN is required.";
    } else if (!/^arn:aws:iam::\d{12}:role\/[a-zA-Z0-9+=,.@-_\/]+$/.test(data.roleArn)) {
      err.roleArn = "Invalid IAM Role ARN format.";
    }

    // ✅ Memory Size
    if (data.memorySize < 128 || data.memorySize > 10240) {
      err.memorySize = "Memory size must be between 128 and 10240 MB.";
    }

    // ✅ Timeout
    if (data.timeout <= 0 || data.timeout > 900) {
      err.timeout = "Timeout must be between 1 and 900 seconds.";
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid AWS region.";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  useEffect(() => {
    if (validate(formData)) onChange(formData);
    else onChange(null);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["memorySize", "timeout"].includes(name) ? Number(value) : value,
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🛠 Lambda Configuration</h2>

      {/* Function Name */}
      <div>
        <label className="block font-medium">
          Function Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="functionName"
          value={formData.functionName}
          onChange={handleChange}
          placeholder="my-lambda-fn"
          className="border p-2 rounded w-full"
        />
        {errors.functionName && <p className="text-red-500 text-sm">{errors.functionName}</p>}
      </div>

      {/* Runtime */}
      <div>
        <label className="block font-medium">
          Runtime <span className="text-red-500">*</span>
        </label>
        <select
          name="runtime"
          value={formData.runtime}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {runtimes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.runtime && <p className="text-red-500 text-sm">{errors.runtime}</p>}
      </div>

      {/* Handler */}
      <div>
        <label className="block font-medium">
          Handler <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="handler"
          value={formData.handler}
          onChange={handleChange}
          placeholder="index.handler"
          className="border p-2 rounded w-full"
        />
        {errors.handler && <p className="text-red-500 text-sm">{errors.handler}</p>}
      </div>

      {/* Role ARN */}
      <div>
        <label className="block font-medium">
          Role ARN <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="roleArn"
          value={formData.roleArn}
          onChange={handleChange}
          placeholder="arn:aws:iam::123456789012:role/MyLambdaRole"
          className="border p-2 rounded w-full"
        />
        {errors.roleArn && <p className="text-red-500 text-sm">{errors.roleArn}</p>}
      </div>

      {/* Memory Size */}
      <div>
        <label className="block font-medium">Memory Size (MB)</label>
        <input
          type="number"
          name="memorySize"
          value={formData.memorySize}
          onChange={handleChange}
          min="128"
          max="10240"
          step="64"
          className="border p-2 rounded w-full"
        />
        {errors.memorySize && <p className="text-red-500 text-sm">{errors.memorySize}</p>}
      </div>

      {/* Timeout */}
      <div>
        <label className="block font-medium">Timeout (seconds)</label>
        <input
          type="number"
          name="timeout"
          value={formData.timeout}
          onChange={handleChange}
          min="1"
          max="900"
          className="border p-2 rounded w-full"
        />
        {errors.timeout && <p className="text-red-500 text-sm">{errors.timeout}</p>}
      </div>

      {/* Region */}
      <div>
        <label className="block font-medium">
          Region <span className="text-red-500">*</span>
        </label>
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
      </div>
    </div>
  );
}