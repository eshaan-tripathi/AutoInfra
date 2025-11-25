'use client'
import React, { useState, useEffect } from 'react'

const regions = ["East US", "West US", "Central US"]
const sizes = ["Standard_B1s", "Standard_B2s"]

export default function VMForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    resourceGroupName: "",
    location: "East US",
    size: "Standard_B1s",
    adminUsername: "",
    adminPassword: "",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: VM Name
    if (!data.name) {
      err.name = "VM name is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.name)) {
      err.name = "Invalid VM name format (letters, numbers, hyphens, underscores only)."
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

    // ✅ Mandatory: Size
    if (!sizes.includes(data.size)) {
      err.size = "Invalid VM size selected."
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">💻 Azure VM Configuration</h2>

      {/* VM Name */}
      <div>
        <label className="block font-medium">
          VM Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="VM Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Resource Group Name */}
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

      {/* Size */}
      <div>
        <label className="block font-medium">
          VM Size <span className="text-red-500">*</span>
        </label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
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
    </div>
  )
}