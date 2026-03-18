import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select } from './FormElements';
import { Plus, Trash2, Upload, FileIcon } from 'lucide-react';
import React, { useState } from 'react';

export function DocumentUpload() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents"
  });

  const [isUploading, setIsDarkMode] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to base64 for simulation
    const reader = new FileReader();
    reader.onloadend = () => {
      append({
        type: 'Driver Record',
        fileName: file.name,
        fileSize: file.size,
        base64: reader.result as string,
        description: ''
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Document Upload</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please upload any supporting documents (MVR, Reference Letters, etc.).</p>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center group-hover:border-logistics-blue transition-all bg-slate-50/50 dark:bg-slate-800/20">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="text-logistics-blue" size={32} />
            </div>
            <h3 className="text-lg font-bold">Tap to upload a file</h3>
            <p className="text-slate-500 text-sm mt-1">PDF, JPG, or PNG — max 10MB</p>
          </div>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6 items-start shadow-sm">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                <FileIcon className="text-slate-400" size={24} />
              </div>
              
              <div className="flex-grow space-y-4 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm truncate max-w-[200px]">{(field as any).fileName}</p>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-tight">
                      {Math.round((field as any).fileSize / 1024)} KB
                    </p>
                  </div>
                  <button type="button" onClick={() => remove(index)} className="text-rose-500 hover:text-rose-600 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select 
                    name={`documents.${index}.type`} 
                    label="Document Type" 
                    options={[
                      { label: 'Driver Record (MVR)', value: 'Driver Record' },
                      { label: 'Reference Letter', value: 'Reference Letter' },
                      { label: 'Other', value: 'Other' },
                    ]} 
                  />
                  <Input 
                    name={`documents.${index}.description`} 
                    label="Description" 
                    placeholder="Brief description of the document" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
