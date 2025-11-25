'use client'
import React, { useState, useEffect } from 'react'

const locations = ["US", "ASIA", "EU"]
const storageClasses = ["STANDARD", "NEARLINE", "COLDLINE", "ARCHIVE"]

export default function StorageForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "US",
    storageClass: "STANDARD",
    forceDestroy: false,
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // Bucket name validation
    if (!data.name.trim()) {
      err.name = "Bucket name is required."
    } else if (!/^[a-z0-9-_]{3,63}$/.test(data.name)) {
      err.name = "Bucket name must be 3–63 chars, lowercase letters, numbers, hyphens."
    }

    // Location validation
    if (!data.location) {
      err.location = "Location is required."
    } else if (!locations.includes(data.location)) {
      err.location = "Invalid location."
    }

    // Storage class validation
    if (!data.storageClass) {
      err.storageClass = "Storage class is required."
    } else if (!storageClasses.includes(data.storageClass)) {
      err.storageClass = "Invalid storage class."
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  useEffect(() => {
    if (validate(formData)) {
      onChange(formData)
    } else {
      onChange(null)
    }
  }, [formData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🗄 Cloud Storage Configuration</h2>

      {/* Bucket Name */}
      <label className="block font-medium text-gray-700">
        Bucket Name <span className="text-red-500">*</span>
      </label>
      <input
        name="name"
        placeholder="Enter bucket name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      {/* Location */}
      <label className="block font-medium text-gray-700">
        Location <span className="text-red-500">*</span>
      </label>
      <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Location</option>
        {locations.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

      {/* Storage Class */}
      <label className="block font-medium text-gray-700">
        Storage Class <span className="text-red-500">*</span>
      </label>
      <select
        name="storageClass"
        value={formData.storageClass}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Storage Class</option>
        {storageClasses.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      {errors.storageClass && <p className="text-red-500 text-sm">{errors.storageClass}</p>}

      {/* Force Destroy */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="forceDestroy"
          checked={formData.forceDestroy}
          onChange={handleChange}
        />
        <span>Force Destroy</span>
      </label>
    </div>
  )
}
