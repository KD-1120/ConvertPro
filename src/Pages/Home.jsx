import React, { useState, useRef, useCallback } from "react";
import { 
  Upload, 
  Download, 
  Settings, 
  Trash2, 
  File, 
  X, 
  Type, 
  Layers, 
  Archive 
} from "lucide-react";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import "./Home.css";


function Home() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({});
  const [settings, setSettings] = useState({
    delimiter: ",",
    encoding: "UTF-8",
    includeHeaders: true,
    convertAllSheets: false,
    zipOutput: false
  });
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info' // 'success', 'error', 'warning', 'info'
  });

  // Show notification
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, open: false }));
    }, 4000);
  };

  // Close notification
  const closeNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Process the selected files
  const handleFiles = (selectedFiles) => {
    const newFiles = selectedFiles.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ext === 'xlsx' || ext === 'xls';
    });
    
    if (newFiles.length === 0) {
      showNotification("Please upload Excel files (.xlsx or .xls)", "error");
      return;
    }
    
    const filesWithStatus = newFiles.map(file => ({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      status: "Ready to convert"
    }));
    
    setFiles(prev => [...prev, ...filesWithStatus]);
    showNotification(`${newFiles.length} files added successfully`, "success");
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Toggle setting
  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    // Show notification for setting change
    showNotification(`${setting} ${!settings[setting] ? 'enabled' : 'disabled'}`, "info");
  };

  // Remove file
  const removeFile = (index) => {
    const fileName = files[index].name;
    setFiles(prev => prev.filter((_, i) => i !== index));
    showNotification(`${fileName} removed`, "info");
  };

  // Start batch conversion
  const startBatchConversion = () => {
    if (files.length === 0) {
      showNotification("Please upload files to convert", "error");
      return;
    }
    
    showNotification("Starting batch conversion", "info");
    files.forEach((fileObj, index) => {
      convertFile(fileObj, index);
    });
  };

  // Start single conversion
  const startConversion = (index) => {
    if (index >= 0 && index < files.length) {
      showNotification(`Converting ${files[index].name}`, "info");
      convertFile(files[index], index);
    }
  };

  // Convert file
  const convertFile = (fileObj, index) => {
    setConversionProgress(prev => ({
      ...prev,
      [index]: { status: "Converting...", progress: 0 }
    }));
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update file status once complete
        setFiles(prev => prev.map((f, i) => {
          if (i === index) {
            const outputName = f.name.replace(/\.(xlsx|xls)$/i, '.csv');
            return {
              ...f,
              status: "Completed",
              outputName,
              csvData: f.csvData // Store the CSV data for download
            };
          }
          return f;
        }));
        
        setConversionProgress(prev => ({
          ...prev,
          [index]: { status: "Completed", progress: 100 }
        }));
        
        showNotification(`${fileObj.name} converted successfully`, "success");
      } else {
        setConversionProgress(prev => ({
          ...prev,
          [index]: { status: "Converting...", progress }
        }));
      }
    }, 200);
    
    // Actual conversion logic
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      try {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const csvContent = Papa.unparse(XLSX.utils.sheet_to_json(sheet), {
          delimiter: settings.delimiter,
          header: settings.includeHeaders
        });
        
        // Store the CSV data for later download
        setFiles(prev => prev.map((f, i) => {
          if (i === index) {
            return {
              ...f,
              csvData: csvContent
            };
          }
          return f;
        }));
      } catch (error) {
        console.error("Error converting file:", error);
        clearInterval(interval);
        setConversionProgress(prev => ({
          ...prev,
          [index]: { status: "Error", progress: 0 }
        }));
        
        setFiles(prev => prev.map((f, i) => {
          if (i === index) {
            return {
              ...f,
              status: "Error"
            };
          }
          return f;
        }));
        
        showNotification(`Error converting ${fileObj.name}`, "error");
      }
    };
    
    reader.readAsArrayBuffer(fileObj.file);
  };

  // Download converted file
  const downloadFile = (index) => {
    const file = files[index];
    if (!file.csvData) {
      showNotification(`No data available for ${file.name}`, "error");
      return;
    }
    
    const blob = new Blob([file.csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.outputName || `${file.name.split('.')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`${file.outputName} downloaded`, "success");
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
    setConversionProgress({});
    showNotification("All files cleared", "info");
  };

  // Download all files
  const downloadAll = () => {
    const completedFiles = files.filter(file => file.status === "Completed" && file.csvData);
    
    if (completedFiles.length === 0) {
      showNotification("No completed conversions to download", "warning");
      return;
    }
    
    if (settings.zipOutput) {
      showNotification("Zip functionality requires JSZip library. Please install it first.", "warning");
      return;
    }
    
    completedFiles.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.outputName || `${file.name.split('.')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 100); // Slight delay between downloads
    });
    
    showNotification(`Downloading ${completedFiles.length} files`, "success");
  };

  return (
    <div className="container">
      <h1 className="title">Excel to CSV Converter</h1>
      <p className="subtitle">Convert Excel files to CSV format with advanced options and batch processing</p>

      <div className="steps-container">
        <div className="step-card">
          <div className="step-icon">
            <Upload size={20} />
          </div>
          <p className="step-number">Step 1</p>
          <h3 className="step-title">Upload Files</h3>
          <p className="step-description">Drag & drop Excel files here or click to browse. Supports .xlsx, .xls formats.</p>
          <button className="btn" onClick={() => fileInputRef.current.click()}>
            Browse Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
            accept=".xlsx,.xls"
            multiple
          />
        </div>

        <div className="step-card">
          <div className="step-icon">
            <Settings size={20} />
          </div>
          <p className="step-number">Step 2</p>
          <h3 className="step-title">Configure Options</h3>
          <p className="step-description">Set delimiter, encoding, and sheet selection for your conversion.</p>
          <button className="btn">
            Configure
          </button>
        </div>

        <div className="step-card">
          <div className="step-icon">
            <Download size={20} />
          </div>
          <p className="step-number">Step 3</p>
          <h3 className="step-title">Convert & Download</h3>
          <p className="step-description">Process files and download individually or as a zip archive.</p>
          <button className="btn btn-primary" onClick={startBatchConversion}>
            Start Conversion
          </button>
        </div>
      </div>

      <h2 className="section-title">Uploaded Files</h2>
      <div 
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        Drag and drop Excel files here or click to browse
      </div>

      <div className="file-list">
        {files.map((file, index) => (
          <div className="file-item" key={index}>
            <div className="file-icon">
              <File size={20} />
            </div>
            <div className="file-name">{file.name}</div>
            <div className="file-size">{file.size}</div>
            <div className="file-status">{file.status}</div>
            <div className="action-icons">
              <button className="action-icon" onClick={() => startConversion(index)}>
                <Settings size={16} />
              </button>
              <button className="action-icon" onClick={() => removeFile(index)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="settings-section">
        <h2 className="settings-title">Conversion Settings</h2>
        <div className="settings-grid">
          <div className="settings-input">
            <label>Delimiter</label>
            <input 
              type="text" 
              value={settings.delimiter} 
              onChange={(e) => setSettings({...settings, delimiter: e.target.value})}
            />
          </div>
          <div className="settings-input">
            <label>Encoding</label>
            <input 
              type="text" 
              value={settings.encoding} 
              onChange={(e) => setSettings({...settings, encoding: e.target.value})}
            />
          </div>
        </div>

        <div className="setting-option">
          <div className="setting-icon">
            <Type size={16} />
          </div>
          <div className="setting-text">
            <div className="setting-title">Include Headers</div>
            <div className="setting-description">First row will be treated as column headers</div>
          </div>
          <div 
            className={`toggle ${settings.includeHeaders ? 'on' : ''}`} 
            onClick={() => toggleSetting('includeHeaders')}
          ></div>
        </div>

        <div className="setting-option">
          <div className="setting-icon">
            <Layers size={16} />
          </div>
          <div className="setting-text">
            <div className="setting-title">Convert All Sheets</div>
            <div className="setting-description">Process all sheets in workbooks</div>
          </div>
          <div 
            className={`toggle ${settings.convertAllSheets ? 'on' : ''}`} 
            onClick={() => toggleSetting('convertAllSheets')}
          ></div>
        </div>

        <div className="setting-option">
          <div className="setting-icon">
            <Archive size={16} />
          </div>
          <div className="setting-text">
            <div className="setting-title">Zip Output Files</div>
            <div className="setting-description">Download all converted files as a single ZIP archive</div>
          </div>
          <div 
            className={`toggle ${settings.zipOutput ? 'on' : ''}`} 
            onClick={() => toggleSetting('zipOutput')}
          ></div>
        </div>
      </div>

      <div className="progress-section">
        <h2 className="section-title">Conversion Progress</h2>
        {files.map((file, index) => {
          const progress = conversionProgress[index] || { status: "Waiting...", progress: 0 };
          return (
            <div className="progress-item" key={index}>
              <div className="file-icon">
                <File size={20} />
              </div>
              <div className="file-name">{file.name}</div>
              <div className="file-status">{progress.status}</div>
              <div className="progress-bar" style={{
                "--progress": `${progress.progress}%`
              }}></div>
              <div className="progress-percentage">{Math.round(progress.progress)}%</div>
              {progress.status === "Completed" && (
                <button className="action-icon" onClick={() => downloadFile(index)}>
                  <Download size={16} />
                </button>
              )}
              {progress.status === "Waiting..." && (
                <button className="action-icon" onClick={() => removeFile(index)}>
                  <X size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="button-container">
        <button className="btn btn-primary" onClick={startBatchConversion}>
          Start Batch Conversion
        </button>
        <button className="btn" onClick={downloadAll}>
          Download All
        </button>
        <button className="btn" onClick={clearAll}>
          Clear All
        </button>
      </div>

      {notification.open && (
        <div className={`notification ${notification.severity}`}>
          <p>{notification.message}</p>
          <button className="notification-close" onClick={closeNotification}>×</button>
        </div>
      )}
    </div>
  );
}

export default Home;