'use client'

import React, { useState } from 'react'

export default function ServiceSelector({ services, onChange }) {
  const [selectedServices, setSelectedServices] = useState(
    Object.fromEntries(services.map((service) => [service.key, false]))
  )

  const handleToggle = (serviceKey) => {
    const updated = { ...selectedServices, [serviceKey]: !selectedServices[serviceKey] }
    setSelectedServices(updated)
    onChange(updated)
  }

  return (
    <div className="flex flex-wrap gap-6 mb-6">
      {services.map((service) => (
        <label key={service.key} className="flex items-center space-x-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={selectedServices[service.key]}
            onChange={() => handleToggle(service.key)}
            className="h-5 w-5 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold">{service.label}</span>
        </label>
      ))}
    </div>
  )
}