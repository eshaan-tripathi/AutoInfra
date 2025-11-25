'use client'
import React, { useState, useEffect } from 'react'

const regions = ["East US", "West US", "Central US"]
const accountTiers = ["Standard", "Premium"]
const replicationTypes = ["LRS", "GRS", "ZRS"]

export default function StorageAccountForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    resourceGroupName: "",
    location: "East US",
    accountTier: "Standard",
    replicationType: "LRS",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Storage Account Name
    if (!data.name) {
      err.name = "Storage Account name is required."
    } else if (!/^[a-z0-9]{3,24}$/.test(data.name)) {
      err.name = "Invalid format (3–24 lowercase letters or numbers)."
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

    // ✅ Account Tier
    if (!accountTiers.includes(data.accountTier)) {
      err.accountTier = "Invalid account tier selected."
    }

    // ✅ Replication Type
    if (!replicationTypes.includes(data.replicationType)) {
      err.replicationType = "Invalid replication type selected."
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📦 Azure Storage Account Configuration</h2>

      {/* Storage Account Name */}
      <div>
        <label className="block font-medium">
          Storage Account Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="Storage Account Name"
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

      {/* Account Tier */}
      <div>
        <label className="block font-medium">Account Tier</label>
        <select
          name="accountTier"
          value={formData.accountTier}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {accountTiers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.accountTier && <p className="text-red-500 text-sm">{errors.accountTier}</p>}
      </div>

      {/* Replication Type */}
      <div>
        <label className="block font-medium">Replication Type</label>
        <select
          name="replicationType"
          value={formData.replicationType}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {replicationTypes.map(rt => <option key={rt} value={rt}>{rt}</option>)}
        </select>
        {errors.replicationType && <p className="text-red-500 text-sm">{errors.replicationType}</p>}
      </div>
    </div>
  )
}