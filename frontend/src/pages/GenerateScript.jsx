// src/pages/ScriptGenerator.jsx
import { useState } from "react";
import { cloudProviders } from "../data/cloudServices";

export default function ScriptGenerator() {
  const [selectedCloud, setSelectedCloud] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceConfigs, setServiceConfigs] = useState({});
  const [generatedScript, setGeneratedScript] = useState("");

  const toggleService = (service) => {
    const serviceObj = cloudProviders
      .find(c => c.name === selectedCloud)
      .services.find(s => s.name === service);

    if (selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(s => s !== service));
      const newConfigs = { ...serviceConfigs };
      delete newConfigs[service];
      setServiceConfigs(newConfigs);
    } else {
      setSelectedServices(prev => [...prev, service]);
      const defaultConfigs = {};
      serviceObj.config.forEach(cfg => defaultConfigs[cfg.key] = "");
      setServiceConfigs(prev => ({ ...prev, [service]: defaultConfigs }));
    }
  };

  const handleConfigChange = (service, key, value) => {
    setServiceConfigs(prev => ({
      ...prev,
      [service]: { ...prev[service], [key]: value }
    }));
  };

  const generateScript = () => {
    if (!selectedCloud || selectedServices.length === 0) {
      alert("Select a cloud provider and at least one service!");
      return;
    }

    // Validate required fields
    for (let service of selectedServices) {
      const serviceObj = cloudProviders
        .find(c => c.name === selectedCloud)
        .services.find(s => s.name === service);

      for (let cfg of serviceObj.config) {
        if (cfg.required && !serviceConfigs[service][cfg.key]) {
          alert(`Please fill the required field: ${cfg.key} for ${service}`);
          return;
        }
      }
    }

    let script = `# Generated script for ${selectedCloud}\n\n`;
    selectedServices.forEach(service => {
      script += `# Service: ${service}\n`;
      const configs = serviceConfigs[service];
      Object.keys(configs).forEach(key => {
        script += `# ${key}: ${configs[key]}\n`;
      });
      script += "\n";
    });

    setGeneratedScript(script);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl mb-4">Cloud Script Generator</h1>

      {/* Cloud Provider Selection */}
      <div className="mb-6">
        <label>Select Cloud Provider:</label>
        <select
          className="ml-2 p-2 rounded text-black"
          onChange={(e) => {
            setSelectedCloud(e.target.value);
            setSelectedServices([]);
            setServiceConfigs({});
          }}
          value={selectedCloud || ""}
        >
          <option value="" disabled>Select</option>
          {cloudProviders.map(cloud => (
            <option key={cloud.name} value={cloud.name}>{cloud.name}</option>
          ))}
        </select>
      </div>

      {/* Services */}
      {selectedCloud && (
        <div className="mb-6">
          <h2 className="mb-2">Select Services:</h2>
          {cloudProviders
            .find(c => c.name === selectedCloud)
            .services.map(service => (
              <div key={service.name}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.name)}
                    onChange={() => toggleService(service.name)}
                  />
                  <span className="ml-2">{service.name}</span>
                </label>
              </div>
            ))}
        </div>
      )}

      {/* Service Configurations */}
      {selectedServices.map(service => (
        <div key={service} className="mb-4 border-t border-gray-700 pt-2">
          <h3 className="font-semibold">{service} Configs:</h3>
          {Object.keys(serviceConfigs[service]).map(key => {
            const serviceObj = cloudProviders.find(c => c.name === selectedCloud)
              .services.find(s => s.name === service);
            const cfgObj = serviceObj.config.find(c => c.key === key);
            return (
              <div key={key} className="mb-2">
                <label>
                  {key}{cfgObj.required && <span className="text-red-500 ml-1">*</span>}:
                </label>
                <input
                  className="ml-2 p-1 rounded text-black"
                  value={serviceConfigs[service][key]}
                  onChange={e => handleConfigChange(service, key, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      ))}

      <button
        onClick={generateScript}
        className="mt-4 px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-400"
      >
        Generate Script
      </button>

      {generatedScript && (
        <pre className="mt-6 p-4 bg-gray-800 rounded whitespace-pre-wrap">{generatedScript}</pre>
      )}
    </div>
  );
}
