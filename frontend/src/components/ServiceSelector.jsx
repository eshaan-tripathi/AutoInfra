import React, { useState } from "react";

export default function ServiceSelector({ onChange }) {
  const [selectedServices, setSelectedServices] = useState({
    lambda: false,
    s3: false,
  });

  const handleToggle = (service) => {
    const updated = { ...selectedServices, [service]: !selectedServices[service] };
    setSelectedServices(updated);
    onChange(updated); // pass selection to parent
  };

  return (
    <div className="space-x-4 mb-6">
      <label>
        <input
          type="checkbox"
          checked={selectedServices.lambda}
          onChange={() => handleToggle("lambda")}
        />{" "}
        Lambda
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedServices.s3}
          onChange={() => handleToggle("s3")}
        />{" "}
        S3
      </label>
    </div>
  );
}
