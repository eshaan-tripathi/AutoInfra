'use client'
import React, { useState, useEffect } from 'react'

const regions = ["us-central1", "us-east1", "us-west1"]
const dbVersions = ["MYSQL_8_0", "POSTGRES_14"]

export default function CloudSQLForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    region: "us-central1",
    databaseVersion: "MYSQL_8_0",
    tier: "db-f1-micro",
    rootPassword: "",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Instance Name
    if (!data.name) {
      err.name = "Instance name is required."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(data.name)) {
      err.name = "Invalid instance name format (letters, numbers, hyphens, underscores only)."
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid region selected."
    }

    // ✅ Mandatory: Database Version
    if (!dbVersions.includes(data.databaseVersion)) {
      err.databaseVersion = "Invalid database version selected."
    }

    // ✅ Mandatory: Root Password
    if (!data.rootPassword) {
      err.rootPassword = "Root password is required."
    } else if (data.rootPassword.length < 8) {
      err.rootPassword = "Password must be at least 8 characters."
    }

    // ✅ Optional: Tier
    if (data.tier && !/^db-[a-z0-9-]+$/.test(data.tier)) {
      err.tier = "Invalid tier format (e.g., db-f1-micro)."
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🗄 Cloud SQL Configuration</h2>

      {/* Instance Name */}
      <div>
        <label className="block font-medium">
          Instance Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="Instance Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
      </div>

      {/* Database Version */}
      <div>
        <label className="block font-medium">
          Database Version <span className="text-red-500">*</span>
        </label>
        <select
          name="databaseVersion"
          value={formData.databaseVersion}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {dbVersions.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        {errors.databaseVersion && <p className="text-red-500 text-sm">{errors.databaseVersion}</p>}
      </div>

      {/* Tier */}
      <div>
        <label className="block font-medium">Tier</label>
        <input
          name="tier"
          placeholder="Tier (e.g., db-f1-micro)"
          value={formData.tier}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.tier && <p className="text-red-500 text-sm">{errors.tier}</p>}
      </div>

      {/* Root Password */}
      <div>
        <label className="block font-medium">
          Root Password <span className="text-red-500">*</span>
        </label>
        <input
          name="rootPassword"
          type="password"
          placeholder="Root Password"
          value={formData.rootPassword}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.rootPassword && <p className="text-red-500 text-sm">{errors.rootPassword}</p>}
      </div>
    </div>
  )
}