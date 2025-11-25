'use client'
import React, { useState, useEffect } from 'react'

const regions = ["us-east-1", "us-west-2", "ap-south-1"]
const instanceTypes = ["t2.micro", "t3.micro", "t3.small"]

export default function EC2Form({ onChange }) {
  const [formData, setFormData] = useState({
    region: "us-east-1", // Default region
    ami: "",
    instanceType: "t2.micro", // Default instance type
    keyName: "",
    subnetId: "",
    securityGroupIds: "",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: AMI
    if (!data.ami) {
      err.ami = "AMI ID is required."
    } else if (!/^ami-[a-z0-9]+$/.test(data.ami)) {
      err.ami = "Invalid AMI ID format (e.g., ami-123abc)."
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid AWS region."
    }

    // ✅ Mandatory: Instance Type
    if (!instanceTypes.includes(data.instanceType)) {
      err.instanceType = "Invalid instance type."
    }

    // ✅ Optional: Key Name
    if (data.keyName && !/^[a-zA-Z0-9-_]+$/.test(data.keyName)) {
      err.keyName = "Invalid key name format (letters, numbers, hyphens, underscores only)."
    }

    // ✅ Optional: Subnet ID
    if (data.subnetId && !/^subnet-[a-z0-9]+$/.test(data.subnetId)) {
      err.subnetId = "Invalid Subnet ID format (e.g., subnet-abc123)."
    }

    // ✅ Optional: Security Groups
    if (data.securityGroupIds && !/^sg-[a-z0-9]+(,\s*sg-[a-z0-9]+)*$/.test(data.securityGroupIds)) {
      err.securityGroupIds = "Invalid Security Group IDs format (comma-separated, e.g., sg-123abc, sg-456def)."
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  useEffect(() => {
    if (validate(formData)) onChange(formData)
    else onChange(null)
  }, [formData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">💻 EC2 Configuration</h2>

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
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
      </div>

      {/* AMI */}
      <div>
        <label className="block font-medium">
          AMI ID <span className="text-red-500">*</span>
        </label>
        <input
          name="ami"
          placeholder="AMI ID (e.g., ami-123abc)"
          value={formData.ami}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.ami && <p className="text-red-500 text-sm">{errors.ami}</p>}
      </div>

      {/* Instance Type */}
      <div>
        <label className="block font-medium">
          Instance Type <span className="text-red-500">*</span>
        </label>
        <select
          name="instanceType"
          value={formData.instanceType}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {instanceTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.instanceType && <p className="text-red-500 text-sm">{errors.instanceType}</p>}
      </div>

      {/* Key Name */}
      <div>
        <label className="block font-medium">Key Pair Name</label>
        <input
          name="keyName"
          placeholder="Key Pair Name"
          value={formData.keyName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.keyName && <p className="text-red-500 text-sm">{errors.keyName}</p>}
      </div>

      {/* Subnet ID */}
      <div>
        <label className="block font-medium">Subnet ID</label>
        <input
          name="subnetId"
          placeholder="Subnet ID (e.g., subnet-abc123)"
          value={formData.subnetId}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.subnetId && <p className="text-red-500 text-sm">{errors.subnetId}</p>}
      </div>

      {/* Security Group IDs */}
      <div>
        <label className="block font-medium">Security Group IDs</label>
        <input
          name="securityGroupIds"
          placeholder="Comma-separated (e.g., sg-123abc, sg-456def)"
          value={formData.securityGroupIds}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.securityGroupIds && <p className="text-red-500 text-sm">{errors.securityGroupIds}</p>}
      </div>
    </div>
  )
}