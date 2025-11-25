'use client'
import React, { useState, useEffect } from 'react'

const regions = ["us-east-1", "us-west-2", "ap-south-1"]
const engines = ["mysql", "postgres"]

export default function RDSForm({ onChange }) {
  const [formData, setFormData] = useState({
    region: "us-east-1", // Default region
    dbName: "",
    engine: "mysql", // Default engine
    instanceClass: "db.t3.micro",
    username: "",
    password: "",
    allocatedStorage: 20,
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Database Name
    if (!data.dbName) {
      err.dbName = "Database name is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.dbName)) {
      err.dbName = "Invalid database name format (letters, numbers, hyphens, underscores only)."
    }

    // ✅ Mandatory: Engine
    if (!engines.includes(data.engine)) {
      err.engine = "Invalid engine selected."
    }

    // ✅ Mandatory: Username
    if (!data.username) {
      err.username = "Username is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.username)) {
      err.username = "Invalid username format."
    }

    // ✅ Mandatory: Password
    if (!data.password) {
      err.password = "Password is required."
    } else if (data.password.length < 8) {
      err.password = "Password must be at least 8 characters."
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid AWS region."
    }

    // ✅ Optional: Instance Class
    if (data.instanceClass && !/^db\.[a-z0-9.]+$/.test(data.instanceClass)) {
      err.instanceClass = "Invalid instance class format (e.g., db.t3.micro)."
    }

    // ✅ Allocated Storage
    if (data.allocatedStorage < 5 || data.allocatedStorage > 65536) {
      err.allocatedStorage = "Allocated storage must be between 5 and 65536 GB."
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  useEffect(() => {
    if (validate(formData)) onChange(formData)
    else onChange(null)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "allocatedStorage" ? Number(value) : value,
    })
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🗄 RDS Configuration</h2>

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

      {/* Database Name */}
      <div>
        <label className="block font-medium">
          Database Name <span className="text-red-500">*</span>
        </label>
        <input
          name="dbName"
          placeholder="Database Name"
          value={formData.dbName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.dbName && <p className="text-red-500 text-sm">{errors.dbName}</p>}
      </div>

      {/* Engine */}
      <div>
        <label className="block font-medium">
          Engine <span className="text-red-500">*</span>
        </label>
        <select
          name="engine"
          value={formData.engine}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {engines.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        {errors.engine && <p className="text-red-500 text-sm">{errors.engine}</p>}
      </div>

      {/* Instance Class */}
      <div>
        <label className="block font-medium">Instance Class</label>
        <input
          name="instanceClass"
          placeholder="Instance Class (e.g., db.t3.micro)"
          value={formData.instanceClass}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.instanceClass && <p className="text-red-500 text-sm">{errors.instanceClass}</p>}
      </div>

      {/* Username */}
      <div>
        <label className="block font-medium">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block font-medium">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      {/* Allocated Storage */}
      <div>
        <label className="block font-medium">Allocated Storage (GB)</label>
        <input
          name="allocatedStorage"
          type="number"
          placeholder="Allocated Storage (GB)"
          value={formData.allocatedStorage}
          onChange={handleChange}
          min="5"
          max="65536"
          className="border p-2 rounded w-full"
        />
        {errors.allocatedStorage && <p className="text-red-500 text-sm">{errors.allocatedStorage}</p>}
      </div>
    </div>
  )
}