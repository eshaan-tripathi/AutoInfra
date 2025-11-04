import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const regions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "ap-south-1", "ap-northeast-1", "ap-southeast-1",
  "eu-central-1", "eu-west-1",
];

const acls = [
  "private",
  "public-read",
  "public-read-write",
  "authenticated-read",
  "aws-exec-read",
  "bucket-owner-read",
  "bucket-owner-full-control",
];

const encryptions = ["none", "AES256", "aws:kms"];

const S3Form = forwardRef(({ onChange }, ref) => {
  const [formData, setFormData] = useState({
    bucketName: "",
    region: "us-east-1",
    acl: "private",
    versioning: false,
    encryption: "none",
    forceDestroy: false,
  });

  const [errors, setErrors] = useState({});

  const validate = (data = formData) => {
    const err = {};

    if (!/^[a-z0-9.-]{3,63}$/.test(data.bucketName)) {
      err.bucketName =
        "Bucket name must be 3–63 chars, lowercase letters, numbers, dots, or hyphens.";
    }
    if (
      data.bucketName.startsWith(".") ||
      data.bucketName.endsWith(".") ||
      data.bucketName.includes("..")
    ) {
      err.bucketName =
        "Bucket name cannot start/end with dot or contain consecutive dots.";
    }

    if (!regions.includes(data.region)) err.region = "Invalid region.";
    if (!acls.includes(data.acl)) err.acl = "Invalid ACL.";
    if (!encryptions.includes(data.encryption)) err.encryption = "Invalid encryption.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate: () => validate(),
    getData: () => formData,
  }));

  useEffect(() => {
    if (validate(formData)) onChange?.(formData);
    else onChange?.(null);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🪣 S3 Configuration</h2>

      <div>
        <label className="block font-medium">Bucket Name</label>
        <input
          type="text"
          name="bucketName"
          value={formData.bucketName}
          onChange={handleChange}
          placeholder="my-unique-bucket"
          className="border p-2 rounded w-full"
        />
        {errors.bucketName && <p className="text-red-500 text-sm">{errors.bucketName}</p>}
      </div>

      <div>
        <label className="block font-medium">Region</label>
        <select name="region" value={formData.region} onChange={handleChange} className="border p-2 rounded w-full">
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
      </div>

      <div>
        <label className="block font-medium">ACL</label>
        <select name="acl" value={formData.acl} onChange={handleChange} className="border p-2 rounded w-full">
          {acls.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        {errors.acl && <p className="text-red-500 text-sm">{errors.acl}</p>}
      </div>

      <label className="flex items-center space-x-2">
        <input type="checkbox" name="versioning" checked={formData.versioning} onChange={handleChange} />
        <span>Enable Versioning</span>
      </label>

      <div>
        <label className="block font-medium">Encryption</label>
        <select name="encryption" value={formData.encryption} onChange={handleChange} className="border p-2 rounded w-full">
          {encryptions.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        {errors.encryption && <p className="text-red-500 text-sm">{errors.encryption}</p>}
      </div>

      <label className="flex items-center space-x-2">
        <input type="checkbox" name="forceDestroy" checked={formData.forceDestroy} onChange={handleChange} />
        <span>Force Destroy (delete even if not empty)</span>
      </label>
    </div>
  );
});

export default S3Form;
