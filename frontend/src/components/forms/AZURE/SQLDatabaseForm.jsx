'use client'
import React, { useState, useEffect } from 'react'

const regions = ["East US", "West US", "Central US"]
const skuTiers = ["Basic", "Standard", "Premium"]

export default function SQLDatabaseForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    resourceGroupName: "",
    location: "East US",
    serverName: "",
    adminUsername: "",
    adminPassword: "",
    skuTier: "Basic",
    maxSizeGB: 5,
    collation: "SQL_Latin1_General_CP1_CI_AS",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Database Name
    if (!data.name) {
      err.name = "Database name is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.name)) {
      err.name = "Invalid database name format (letters, numbers, hyphens, underscores only)."
    }

    // ✅ Mandatory: Resource Group Name
    if (!data.resourceGroupName) {
      err.resourceGroupName = "Resource Group name is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.resourceGroupName)) {
      err.resourceGroupName = "Invalid Resource Group name format."
    }

    // ✅ Mandatory: Location
    if (!regions.includes(data.location)) {
      err.location = "Invalid location selected."
    }

    // ✅ Mandatory: Server Name
    if (!data.serverName) {
      err.serverName = "Server name is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.serverName)) {
      err.serverName = "Invalid server name format."
    }

    // ✅ Mandatory: Admin Username
    if (!data.adminUsername) {
      err.adminUsername = "Admin username is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.adminUsername)) {
      err.adminUsername = "Invalid username format."
    }

    // ✅ Mandatory: Admin Password
    if (!data.adminPassword) {
      err.adminPassword = "Password is required."
    } else if (data.adminPassword.length < 8) {
      err.adminPassword = "Password must be at least 8 characters."
    }

    // ✅ Max Size
    if (data.maxSizeGB < 1 || data.maxSizeGB > 1024) {
      err.maxSizeGB = "Size must be between 1 and 1024 GB."
    }

    // ✅ SKU Tier
    if (!skuTiers.includes(data.skuTier)) {
      err.skuTier = "Invalid SKU tier selected."
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
      [name]: name === "maxSizeGB" ? Number(value) : value,
    })
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🗄 Azure SQL Database Configuration</h2>

      {/* Database Name */}
      <div>
        <label className="block font-medium">
          Database Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="Database Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Resource Group */}
      <div>
        <label className="block font-medium">
          Resource Group Name <span className="text-red-500">*</span>
        </label>
        <input
          name="resourceGroupName"
          placeholder="Resource Group Name"
          value={formData.resourceGroupName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.resourceGroupName && <p className="text-red-500 text-sm">{errors.resourceGroupName}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium">
          Location <span className="text-red-500">*</span>
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>

      {/* Server Name */}
      <div>
        <label className="block font-medium">
          SQL Server Name <span className="text-red-500">*</span>
        </label>
        <input
          name="serverName"
          placeholder="SQL Server Name"
          value={formData.serverName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.serverName && <p className="text-red-500 text-sm">{errors.serverName}</p>}
      </div>

      {/* Admin Username */}
      <div>
        <label className="block font-medium">
          Admin Username <span className="text-red-500">*</span>
        </label>
        <input
          name="adminUsername"
          placeholder="Admin Username"
          value={formData.adminUsername}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.adminUsername && <p className="text-red-500 text-sm">{errors.adminUsername}</p>}
      </div>

      {/* Admin Password */}
      <div>
        <label className="block font-medium">
          Admin Password <span className="text-red-500">*</span>
        </label>
        <input
          name="adminPassword"
          type="password"
          placeholder="Admin Password"
          value={formData.adminPassword}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.adminPassword && <p className="text-red-500 text-sm">{errors.adminPassword}</p>}
      </div>

      {/* SKU Tier */}
      <div>
        <label className="block font-medium">SKU Tier</label>
        <select
          name="skuTier"
          value={formData.skuTier}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {skuTiers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.skuTier && <p className="text-red-500 text-sm">{errors.skuTier}</p>}
      </div>

      {/* Max Size */}
      <div>
        <label className="block font-medium">Max Size (GB)</label>
        <input
          name="maxSizeGB"
          type="number"
          min="1"
          max="1024"
          value={formData.maxSizeGB}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.maxSizeGB && <p className="text-red-500 text-sm">{errors.maxSizeGB}</p>}
      </div>

      {/* Collation */}
      <div>
        <label className="block font-medium">Collation</label>
        <input
          name="collation"
          placeholder="Collation"
          value={formData.collation}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  )
}