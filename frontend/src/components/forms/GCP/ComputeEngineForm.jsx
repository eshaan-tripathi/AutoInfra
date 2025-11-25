'use client'
import React, { useState, useEffect } from 'react'

const zones = ["us-central1-a", "us-east1-b", "us-west1-a"]
const machineTypes = ["e2-medium", "n1-standard-1"]

export default function ComputeEngineForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    zone: "us-central1-a",
    machineType: "e2-medium",
    image: "debian-cloud/debian-11",
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}
    if (!data.name) err.name = "Instance name is required."
    if (!zones.includes(data.zone)) err.zone = "Invalid zone."
    if (!machineTypes.includes(data.machineType)) err.machineType = "Invalid machine type."
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">💻 Compute Engine Configuration</h2>
      <input name="name" placeholder="Instance Name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      <select name="zone" value={formData.zone} onChange={handleChange} className="border p-2 rounded w-full">
        {zones.map(z => <option key={z} value={z}>{z}</option>)}
      </select>
      <select name="machineType" value={formData.machineType} onChange={handleChange} className="border p-2 rounded w-full">
        {machineTypes.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <input name="image" placeholder="Image (e.g., debian-cloud/debian-11)" value={formData.image} onChange={handleChange} className="border p-2 rounded w-full" />
    </div>
  )
}