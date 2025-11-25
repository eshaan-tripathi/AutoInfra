'use client'
import React, { useState, useEffect } from 'react'

const regions = ["us-central1", "us-east1", "us-west1", "asia-south1"]
const runtimes = ["nodejs18", "python311", "go121"]

export default function CloudFunctionForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    runtime: "nodejs18",
    entryPoint: "helloWorld",
    region: "us-central1",
    sourceArchiveUrl: "",
    triggerHttp: true,
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Function Name
    if (!data.name) {
      err.name = "Function name is required."
    } else if (!/^[a-zA-Z0-9-_]{1,63}$/.test(data.name)) {
      err.name = "Invalid format (1–63 chars, letters, numbers, hyphens)."
    }

    // ✅ Mandatory: Runtime
    if (!runtimes.includes(data.runtime)) {
      err.runtime = "Invalid runtime selected."
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid region selected."
    }

    // ✅ Mandatory: Source Archive URL
    if (!data.sourceArchiveUrl) {
      err.sourceArchiveUrl = "Source Archive URL is required."
    } else if (!data.sourceArchiveUrl.startsWith("gs://")) {
      err.sourceArchiveUrl = "Source must be a GCS URL (gs://bucket/object)."
    }

    // ✅ Optional: Entry Point
    if (data.entryPoint && !/^[a-zA-Z0-9-_]+$/.test(data.entryPoint)) {
      err.entryPoint = "Invalid entry point format."
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  useEffect(() => {
    if (validate(formData)) onChange(formData)
    else onChange(null)
  }, [formData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">☁️ Cloud Function Configuration</h2>

      {/* Function Name */}
      <div>
        <label className="block font-medium">
          Function Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="Function Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
          {runtimes.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.runtime && <p className="text-red-500 text-sm">{errors.runtime}</p>}
      </div>

      {/* Entry Point */}
      <div>
        <label className="block font-medium">Entry Point</label>
        <input
          name="entryPoint"
          placeholder="Entry Point"
          value={formData.entryPoint}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.entryPoint && <p className="text-red-500 text-sm">{errors.entryPoint}</p>}
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

      {/* Source Archive URL */}
      <div>
        <label className="block font-medium">
          Source Archive URL <span className="text-red-500">*</span>
        </label>
        <input
          name="sourceArchiveUrl"
          placeholder="Source Archive URL (gs://...)"
          value={formData.sourceArchiveUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.sourceArchiveUrl && <p className="text-red-500 text-sm">{errors.sourceArchiveUrl}</p>}
      </div>

      {/* Trigger HTTP */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="triggerHttp"
          checked={formData.triggerHttp}
          onChange={handleChange}
        />
        <span>Trigger HTTP</span>
      </label>
    </div>
  )
}