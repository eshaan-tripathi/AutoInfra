'use client'
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

const regions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "ap-south-1", "ap-northeast-1", "ap-southeast-1",
  "eu-central-1", "eu-west-1",
]

const S3Form = forwardRef(({ onChange }, ref) => {
  const [formData, setFormData] = useState({
    region: "us-east-1", // Default region
    bucketName: "",
    acl: "private",
    versioning: false,
    encryption: "none",
    forceDestroy: false,
  })

  const [errors, setErrors] = useState({})

  const validate = (data = formData) => {
    const err = {}

    // ✅ Mandatory: Bucket Name
    if (!data.bucketName) {
      err.bucketName = "Bucket name is required."
    } else if (!/^[a-z0-9.-]{3,63}$/.test(data.bucketName)) {
      err.bucketName = "Invalid format (3–63 chars, lowercase letters, numbers, dots, hyphens)."
    }

    // ✅ Mandatory: Region
    if (!regions.includes(data.region)) {
      err.region = "Invalid AWS region."
    }

    // ✅ ACL (optional but must be valid)
    if (!["private", "public-read"].includes(data.acl)) {
      err.acl = "Invalid ACL option."
    }

    // ✅ Encryption (optional but must be valid)
    if (!["none", "AES256", "aws:kms"].includes(data.encryption)) {
      err.encryption = "Invalid encryption option."
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  useEffect(() => {
    if (validate(formData)) onChange(formData)
    else onChange(null)
  }, [formData])

  useImperativeHandle(ref, () => ({
    validate: () => validate(),
  }))

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🪣 S3 Configuration</h2>

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

      {/* Bucket Name */}
      <div>
        <label className="block font-medium">
          Bucket Name <span className="text-red-500">*</span>
        </label>
        <input
          name="bucketName"
          value={formData.bucketName}
          onChange={handleChange}
          placeholder="my-bucket"
          className="border p-2 rounded w-full"
        />
        {errors.bucketName && <p className="text-red-500 text-sm">{errors.bucketName}</p>}
      </div>

      {/* ACL */}
      <div>
        <label className="block font-medium">ACL</label>
        <select
          name="acl"
          value={formData.acl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="private">private</option>
          <option value="public-read">public-read</option>
        </select>
        {errors.acl && <p className="text-red-500 text-sm">{errors.acl}</p>}
      </div>

      {/* Versioning */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="versioning"
          checked={formData.versioning}
          onChange={handleChange}
        />
        <span>Enable Versioning</span>
      </label>

      {/* Encryption */}
      <div>
        <label className="block font-medium">Encryption</label>
        <select
          name="encryption"
          value={formData.encryption}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="none">None</option>
          <option value="AES256">AES256</option>
          <option value="aws:kms">aws:kms</option>
        </select>
        {errors.encryption && <p className="text-red-500 text-sm">{errors.encryption}</p>}
      </div>

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
})

export default S3Form