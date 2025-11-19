'use client';

import { useState, useRef, useEffect } from 'react';
import ToastContainer, { ToastMessage } from '@/components/ToastContainer';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface DownloadHistoryItem {
  id: string;
  filename: string;
  format: string;
  timestamp: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<'pdf' | 'zpl' | 'png'>('pdf');
  const [labelSize, setLabelSize] = useState<'auto' | '4x6' | '4x4' | '2.25x4'>('auto');
  const [darkMode, setDarkMode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [generatedZpl, setGeneratedZpl] = useState<string | null>(null);
  const [eplContent, setEplContent] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [labelCount, setLabelCount] = useState(1);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [zoom, setZoom] = useState(100);
  const [fullScreen, setFullScreen] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Load download history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('downloadHistory');
    if (stored) {
      try {
        setDownloadHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse download history:', e);
      }
    }
  }, []);

  // Save download to history
  const addToHistory = (filename: string, format: string) => {
    const newItem: DownloadHistoryItem = {
      id: Date.now().toString(),
      filename,
      format,
      timestamp: Date.now(),
    };
    const updated = [newItem, ...downloadHistory].slice(0, 10); // Keep last 10
    setDownloadHistory(updated);
    localStorage.setItem('downloadHistory', JSON.stringify(updated));
  };

  // Clear download history
  const clearHistory = () => {
    setDownloadHistory([]);
    localStorage.removeItem('downloadHistory');
    showToast('Download history cleared', 'success');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`File too large! Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        showToast(`File exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`, 'error');
        return;
      }

      // Validate file extension
      const validExtensions = ['.epl', '.txt'];
      const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
      if (!validExtensions.includes(fileExtension)) {
        setError('Invalid file type! Please upload an .epl or .txt file');
        showToast('Invalid file type. Please upload .epl or .txt files', 'error');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setWarnings([]);
      showToast('File uploaded successfully', 'success');
      
      // Read and display EPL content
      const content = await selectedFile.text();
      setEplContent(content);
      setEditedContent(content);
      setIsEdited(false);
      
      // Detect number of labels (count P commands)
      const pCommands = content.match(/^P\d*/gim);
      const detectedLabelCount = pCommands ? pCommands.length : 1;
      setLabelCount(detectedLabelCount);
      
      showToast(`Detected ${detectedLabelCount} label${detectedLabelCount > 1 ? 's' : ''}`, 'info');
      
      // Generate preview
      await generatePreview(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      // Validate file size
      if (droppedFile.size > MAX_FILE_SIZE) {
        setError(`File too large! Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        showToast(`File exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`, 'error');
        return;
      }

      // Validate file extension
      const validExtensions = ['.epl', '.txt'];
      const fileExtension = droppedFile.name.toLowerCase().substring(droppedFile.name.lastIndexOf('.'));
      if (!validExtensions.includes(fileExtension)) {
        setError('Invalid file type! Please upload an .epl or .txt file');
        showToast('Invalid file type. Please upload .epl or .txt files', 'error');
        return;
      }

      setFile(droppedFile);
      setError(null);
      setWarnings([]);
      showToast('File uploaded successfully', 'success');
      
      // Read and display EPL content
      const content = await droppedFile.text();
      setEplContent(content);
      setEditedContent(content);
      setIsEdited(false);
      
      // Detect number of labels (count P commands)
      const pCommands = content.match(/^P\d*/gim);
      const detectedLabelCount = pCommands ? pCommands.length : 1;
      setLabelCount(detectedLabelCount);
      
      showToast(`Detected ${detectedLabelCount} label${detectedLabelCount > 1 ? 's' : ''}`, 'info');
      
      // Generate preview
      await generatePreview(droppedFile);
    }
  };

  const handleConvert = async () => {
    if (!file && !editedContent) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setWarnings([]);

    try {
      const formData = new FormData();
      
      // Use edited content if available, otherwise use original file
      if (isEdited && editedContent) {
        const blob = new Blob([editedContent], { type: 'text/plain' });
        const editedFile = new File([blob], file?.name || 'edited.epl', { type: 'text/plain' });
        formData.append('file', editedFile);
      } else if (file) {
        formData.append('file', file);
      }
      
      formData.append('format', outputFormat);
      formData.append('labelSize', labelSize); // Include label size

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Conversion error details:', errorData);
        
        let errorMessage = errorData.error || 'Conversion failed';
        if (errorData.details) {
          errorMessage += `\n\nDetails: ${errorData.details}`;
        }
        if (errorData.statusCode) {
          errorMessage += `\n\nHTTP Status: ${errorData.statusCode}`;
        }
        if (errorData.apiUrl) {
          errorMessage += `\n\nAPI URL: ${errorData.apiUrl}`;
        }
        
        // If ZPL is available, still show warnings
        if (errorData.warnings && errorData.warnings.length > 0) {
          setWarnings(errorData.warnings);
        }
        
        // Store the generated ZPL for debugging
        if (errorData.zpl) {
          setGeneratedZpl(errorData.zpl);
        }
        
        throw new Error(errorMessage);
      }

      // Get warnings from headers
      const warningsHeader = response.headers.get('X-Conversion-Warnings');
      if (warningsHeader && warningsHeader !== 'none') {
        try {
          const parsedWarnings = JSON.parse(warningsHeader);
          setWarnings(parsedWarnings);
        } catch (e) {
          console.error('Failed to parse warnings:', e);
        }
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const extension = outputFormat;
      const fileName = file?.name || 'label.epl';
      const downloadFileName = fileName.replace(/\.[^/.]+$/, `.${extension}`);
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Add to download history
      addToHistory(downloadFileName, extension.toUpperCase());
      showToast(`Successfully converted to ${extension.toUpperCase()}!`, 'success');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during conversion';
      setError(errorMessage);
      showToast(errorMessage.split('\n')[0], 'error');
    } finally {
      setLoading(false);
    }
  };

  const generatePreview = async (file: File) => {
    setLoadingPreview(true);
    setPreviewImage(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', 'png'); // Always use PNG for preview
      formData.append('labelSize', labelSize); // Include label size

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPreviewImage(imageUrl);
        
        // Get warnings from headers
        const warningsHeader = response.headers.get('X-Conversion-Warnings');
        if (warningsHeader && warningsHeader !== 'none') {
          try {
            const parsedWarnings = JSON.parse(warningsHeader);
            setWarnings(parsedWarnings);
          } catch (e) {
            console.error('Failed to parse warnings:', e);
          }
        }
      } else {
        console.error('Preview generation failed');
      }
    } catch (err) {
      console.error('Error generating preview:', err);
    } finally {
      setLoadingPreview(false);
    }
  };

  const generatePreviewFromText = async (eplText: string) => {
    setLoadingPreview(true);
    
    try {
      // Create a blob from the text content
      const blob = new Blob([eplText], { type: 'text/plain' });
      const file = new File([blob], 'edited.epl', { type: 'text/plain' });
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', 'png');
      formData.append('labelSize', labelSize); // Include label size

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Clean up old preview
        if (previewImage) {
          URL.revokeObjectURL(previewImage);
        }
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPreviewImage(imageUrl);
        
        // Get warnings from headers
        const warningsHeader = response.headers.get('X-Conversion-Warnings');
        if (warningsHeader && warningsHeader !== 'none') {
          try {
            const parsedWarnings = JSON.parse(warningsHeader);
            setWarnings(parsedWarnings);
          } catch (e) {
            console.error('Failed to parse warnings:', e);
          }
        } else {
          setWarnings([]);
        }
      } else {
        const errorData = await response.json();
        console.error('Preview generation failed:', errorData);
        setWarnings(errorData.warnings || []);
      }
    } catch (err) {
      console.error('Error generating preview:', err);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setEditedContent(newContent);
    setIsEdited(newContent !== eplContent);
    
    // Debounce preview generation
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    
    previewTimeoutRef.current = setTimeout(() => {
      generatePreviewFromText(newContent);
    }, 1000); // Wait 1 second after user stops typing
  };

  const handleRefreshPreview = () => {
    if (editedContent) {
      generatePreviewFromText(editedContent);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
    setWarnings([]);
    setGeneratedZpl(null);
    setEplContent(null);
    setEditedContent(null);
    setIsEdited(false);
    
    // Clear any pending preview timeout
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    
    // Clean up preview image URL to prevent memory leaks
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Apply dark mode when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Regenerate preview when label size changes
  useEffect(() => {
    if (file && editedContent) {
      generatePreviewFromText(editedContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelSize]);

  // Cleanup preview image on unmount
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, [previewImage]);

  return (
    <main className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} py-10 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 relative">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-0 right-0 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <h1 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            EPL Editor & Converter
          </h1>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Edit, preview, and convert EPL (Eltron Programming Language) to ZPL, PDF, or PNG
          </p>
          <div className={`flex items-center justify-center gap-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="flex items-center gap-1.5">
              <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Live Preview
            </span>
            <span className="flex items-center gap-1.5">
              <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Code Editor
            </span>
            <span className="flex items-center gap-1.5">
              <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Multi-Format Export
            </span>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload & Controls */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl p-8 border transition-colors duration-300`}>
          {/* File Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".epl,.txt"
              className="hidden"
            />
            
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {file ? (
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Click to change file
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Drop your EPL file here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supports .epl and .txt files
                </p>
              </div>
            )}
          </div>

          {/* Output Format Selection */}
          <div className="mt-8">
            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
              Output Format:
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setOutputFormat('pdf')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  outputFormat === 'pdf'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📄 PDF
              </button>
              <button
                onClick={() => setOutputFormat('zpl')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  outputFormat === 'zpl'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📝 ZPL
              </button>
              <button
                onClick={() => setOutputFormat('png')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  outputFormat === 'png'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🖼️ PNG
              </button>
            </div>
          </div>

          {/* Label Size Selection */}
          <div className="mt-6">
            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
              Label Size:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLabelSize('auto')}
                className={`py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  labelSize === 'auto'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📐 Auto Detect
              </button>
              <button
                onClick={() => setLabelSize('4x6')}
                className={`py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  labelSize === '4x6'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📦 4×6 Shipping
              </button>
              <button
                onClick={() => setLabelSize('4x4')}
                className={`py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  labelSize === '4x4'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⬜ 4×4 Square
              </button>
              <button
                onClick={() => setLabelSize('2.25x4')}
                className={`py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  labelSize === '2.25x4'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📮 2.25×4 USPS
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleConvert}
              disabled={!file || loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Converting...
                </span>
              ) : (
                `Convert to ${outputFormat.toUpperCase()}`
              )}
            </button>
            
            {file && (
              <button
                onClick={handleReset}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                Reset
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-1 text-sm text-red-700 whitespace-pre-wrap font-mono">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generated ZPL Debug */}
          {generatedZpl && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-blue-800">Generated ZPL (for debugging)</h3>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedZpl], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'generated.zpl';
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Download ZPL
                </button>
              </div>
              <pre className="mt-2 text-xs text-blue-900 bg-white p-3 rounded border border-blue-200 overflow-x-auto max-h-48 overflow-y-auto">
                {generatedZpl}
              </pre>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Conversion Warnings
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      {warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>

          {/* Right Column - Preview */}
          {file && (
            <div className="space-y-6">
              {/* EPL Content Editor */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl p-6 border transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                      <span className="mr-2">📝</span> EPL Content
                    </h3>
                    {isEdited && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        ✎ Edited
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isEdited && (
                      <button
                        onClick={handleRefreshPreview}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        title="Refresh preview now"
                      >
                        🔄 Refresh
                      </button>
                    )}
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {file?.name}
                    </span>
                  </div>
                </div>
                <textarea
                  value={editedContent || ''}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className={`w-full ${darkMode ? 'bg-gray-900 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'} rounded-lg p-4 border font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                  rows={15}
                  placeholder="EPL content will appear here..."
                  spellCheck={false}
                />
                <div className={`mt-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex justify-between`}>
                  <span>Lines: {editedContent?.split('\n').length || 0}</span>
                  <span className="flex items-center gap-2">
                    {loadingPreview && (
                      <span className="text-blue-600">⟳ Updating preview...</span>
                    )}
                    <span>Size: {(new Blob([editedContent || '']).size / 1024).toFixed(2)} KB</span>
                  </span>
                </div>
                <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  💡 Edit the EPL code above - preview updates automatically after 1 second
                </p>
              </div>

              {/* Label Preview */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl p-6 border transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                      <span className="mr-2">👁️</span> Label Preview
                    </h3>
                    {labelCount > 1 && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        📄 {labelCount} labels detected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {previewImage && (
                      <>
                        <button
                          onClick={() => setZoom(Math.max(25, zoom - 25))}
                          className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                          title="Zoom Out"
                          disabled={zoom <= 25}
                        >
                          ➖
                        </button>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {zoom}%
                        </span>
                        <button
                          onClick={() => setZoom(Math.min(200, zoom + 25))}
                          className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                          title="Zoom In"
                          disabled={zoom >= 200}
                        >
                          ➕
                        </button>
                        <button
                          onClick={() => setRotation((rotation + 90) % 360)}
                          className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                          title="Rotate preview 90°"
                        >
                          🔄
                        </button>
                        <button
                          onClick={() => setFullScreen(true)}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          title="Fullscreen Preview"
                        >
                          ⛶
                        </button>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          ✓ Rendered
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300 min-h-[500px] flex items-center justify-center">
                  {loadingPreview ? (
                    <div className="text-center">
                      <div className="relative inline-flex">
                        <svg
                          className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Generating preview...</p>
                      <p className="text-gray-500 text-xs mt-1">This may take a few seconds</p>
                    </div>
                  ) : previewImage ? (
                    <div className="w-full overflow-auto max-h-[450px]">
                      <img
                        src={previewImage}
                        alt="Label Preview"
                        className="max-w-full h-auto mx-auto border-2 border-gray-400 shadow-lg rounded bg-white transition-all duration-300"
                        style={{ 
                          transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                          transformOrigin: 'center'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg
                        className="h-16 w-16 mx-auto mb-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p>Preview will appear here</p>
                    </div>
                  )}
                </div>
                
                {previewImage && (
                  <div className={`mt-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p className="text-xs">
                      {labelCount > 1 
                        ? `Preview of label 1 of ${labelCount} • All labels included in download`
                        : 'Preview of label • Full quality available on download'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Test API Connection Button */}
        <div className="mt-8 text-center">
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/test-zpl');
                const data = await response.json();
                if (data.success) {
                  alert('✅ Labelary API is working!\n\nImage size: ' + data.imageSize + ' bytes');
                } else {
                  alert('❌ Labelary API test failed:\n\n' + (data.error || 'Unknown error') + '\n\nStatus: ' + data.status);
                }
              } catch (err) {
                alert('❌ Test failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
              }
            }}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            🔍 Test Labelary API Connection
          </button>
        </div>

        {/* Download History */}
        {downloadHistory.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600 flex items-center gap-2`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Download History ({downloadHistory.length})
                <svg className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showHistory && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-600 hover:text-red-800 underline"
                >
                  Clear History
                </button>
              )}
            </div>
            {showHistory && (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border p-4`}>
                <div className="space-y-2">
                  {downloadHistory.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded`}>
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.filename}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.format} • {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-green-100 text-green-800'} px-2 py-1 rounded`}>
                        Downloaded
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            ℹ️ About this EPL Editor & Converter
          </h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <strong>File Size Limit:</strong> Maximum file size is {MAX_FILE_SIZE / (1024 * 1024)}MB. 
              Supported formats: .epl, .txt
            </p>
            <p>
              <strong>Edit EPL Code:</strong> Our live editor lets you modify EPL (Eltron Programming Language) 
              code with real-time preview. Changes update automatically after 1 second.
            </p>
            <p>
              <strong>Convert to Multiple Formats:</strong> Export your edited labels to ZPL 
              (Zebra Programming Language), PDF, or PNG formats using the Labelary API.
            </p>
            <p>
              <strong>Supported EPL commands:</strong> Text (A), Barcodes (B), 
              Lines (LO, LS), Label dimensions (Q, q), Print quantity (P), and more.
            </p>
            <p>
              <strong>Privacy:</strong> All processing happens client-side or through temporary conversion. 
              We do not store your files or data.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {fullScreen && previewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4" onClick={() => setFullScreen(false)}>
          <button
            onClick={() => setFullScreen(false)}
            className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
          <div className="flex items-center gap-4 absolute top-4 left-4">
            <button
              onClick={(e) => { e.stopPropagation(); setZoom(Math.max(25, zoom - 25)); }}
              className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg"
            >
              ➖
            </button>
            <span className="text-white font-medium">{zoom}%</span>
            <button
              onClick={(e) => { e.stopPropagation(); setZoom(Math.min(200, zoom + 25)); }}
              className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg"
            >
              ➕
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setRotation((rotation + 90) % 360); }}
              className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg"
            >
              🔄 Rotate
            </button>
          </div>
          <div className="max-w-full max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="Label Preview Fullscreen"
              className="max-w-full h-auto"
              style={{ 
                transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </main>
  );
}

