'use client'
import React, { useState, useEffect } from 'react'

const regions = ["us-east-1", "us-west-2", "ap-south-1"]

export default function DynamoDBForm({ onChange }) {
  const [formData, setFormData] = useState({
    region: "us-east-1", // Default region
    tableName: "",
    hashKey: "id",
    attributeType: "S",
    billingMode: "PAY_PER_REQUEST",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Table Name
    if (!data.tableName) {
      err.tableName = "Table name is required."
    } else if (!/^[a-zA-Z0-9-_]{3,255}$/.test(data.tableName)) {
      err.tableName = "Invalid table name format (3-255 chars, letters, numbers, hyphens, underscores)."
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid AWS region."
    }

    // ✅ Mandatory: Hash Key
    if (!data.hashKey) {
      err.hashKey = "Hash key is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.hashKey)) {
      err.hashKey = "Invalid hash key format (letters, numbers, hyphens, underscores only)."
    }

    // ✅ Attribute Type (must be S, N, or B)
    if (!["S", "N", "B"].includes(data.attributeType)) {
      err.attributeType = "Invalid attribute type."
    }

    // ✅ Billing Mode
    if (!["PAY_PER_REQUEST", "PROVISIONED"].includes(data.billingMode)) {
      err.billingMode = "Invalid billing mode."
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📦 DynamoDB Configuration</h2>

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
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
      </div>

      {/* Table Name */}
      <div>
        <label className="block font-medium">
          Table Name <span className="text-red-500">*</span>
        </label>
        <input
          name="tableName"
          placeholder="Table Name"
          value={formData.tableName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.tableName && <p className="text-red-500 text-sm">{errors.tableName}</p>}
      </div>

      {/* Hash Key */}
      <div>
        <label className="block font-medium">
          Hash Key <span className="text-red-500">*</span>
        </label>
        <input
          name="hashKey"
          placeholder="Hash Key"
          value={formData.hashKey}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.hashKey && <p className="text-red-500 text-sm">{errors.hashKey}</p>}
      </div>

      {/* Attribute Type */}
      <div>
        <label className="block font-medium">Attribute Type</label>
        <select
          name="attributeType"
          value={formData.attributeType}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="S">String</option>
          <option value="N">Number</option>
          <option value="B">Binary</option>
        </select>
        {errors.attributeType && <p className="text-red-500 text-sm">{errors.attributeType}</p>}
      </div>

      {/* Billing Mode */}
      <div>
        <label className="block font-medium">Billing Mode</label>
        <select
          name="billingMode"
          value={formData.billingMode}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="PAY_PER_REQUEST">PAY_PER_REQUEST</option>
          <option value="PROVISIONED">PROVISIONED</option>
        </select>
        {errors.billingMode && <p className="text-red-500 text-sm">{errors.billingMode}</p>}
      </div>
    </div>
  )
}