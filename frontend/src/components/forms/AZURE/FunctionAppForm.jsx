'use client'
import React, { useState, useEffect } from 'react'

const regions = ["East US", "West US", "Central US"]

export default function FunctionAppForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    resourceGroupName: "",
    location: "East US",
    storageAccountName: "",
    appServicePlanId: "",
    runtime: "dotnet",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Function App Name
    if (!data.name) {
      err.name = "Function App name is required."
    } else if (!/^[a-zA-Z0-9-_]{1,60}$/.test(data.name)) {
      err.name = "Invalid name format (letters, numbers, hyphens, underscores only)."
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

    // ✅ Mandatory: Storage Account Name
    if (!data.storageAccountName) {
      err.storageAccountName = "Storage Account name is required."
    } else if (!/^[a-z0-9]{3,24}$/.test(data.storageAccountName)) {
      err.storageAccountName = "Invalid Storage Account name (3–24 lowercase letters or numbers)."
    }

    // ✅ Mandatory: App Service Plan ID
    if (!data.appServicePlanId) {
      err.appServicePlanId = "App Service Plan ID is required."
    }

    // ✅ Optional: Runtime
    if (data.runtime && !/^[a-zA-Z0-9]+$/.test(data.runtime)) {
      err.runtime = "Invalid runtime format."
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">⚡ Azure Function App Configuration</h2>

      {/* Function App Name */}
      <div>
        <label className="block font-medium">
          Function App Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="Function App Name"
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

      {/* Storage Account Name */}
      <div>
        <label className="block font-medium">
          Storage Account Name <span className="text-red-500">*</span>
        </label>
        <input
          name="storageAccountName"
          placeholder="Storage Account Name"
          value={formData.storageAccountName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.storageAccountName && <p className="text-red-500 text-sm">{errors.storageAccountName}</p>}
      </div>

      {/* App Service Plan ID */}
      <div>
        <label className="block font-medium">
          App Service Plan ID <span className="text-red-500">*</span>
        </label>
        <input
          name="appServicePlanId"
          placeholder="App Service Plan ID"
          value={formData.appServicePlanId}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.appServicePlanId && <p className="text-red-500 text-sm">{errors.appServicePlanId}</p>}
      </div>

      {/* Runtime */}
      <div>
        <label className="block font-medium">Runtime</label>
        <input
          name="runtime"
          placeholder="Runtime (e.g., dotnet, node)"
          value={formData.runtime}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.runtime && <p className="text-red-500 text-sm">{errors.runtime}</p>}
      </div>
    </div>
  )
}