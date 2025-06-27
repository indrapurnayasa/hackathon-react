import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const documentList = [
  "NPWP",
  "NIB",
  "SIUP",
  "Surat Keterangan Asal Barang (SKA)",
  "Packing List",
  "Invoice",
  "Bill of Lading",
  "Pemberitahuan Ekspor Barang (PEB)",
];

export default function UploadDocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (e, docName) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [docName]: file,
      }));
    }
  };

  const handleSubmit = () => {
    // Ini buat testing doang, nanti temen lo bisa handle backend-nya
    console.log("Files to upload:", uploadedFiles);
    alert("Dokumen berhasil disubmit (mock).");
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Upload Dokumen Ekspor
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Silakan unggah dokumen-dokumen berikut untuk melanjutkan proses ekspor
        Anda.
      </p>

      <div className="space-y-6">
        {documentList.map((doc, idx) => (
          <div key={idx}>
            <label className="block font-medium text-gray-700 mb-1">
              {doc}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={(e) => handleFileChange(e, doc)}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploadedFiles[doc] && (
                <span className="text-sm text-green-600">
                  {uploadedFiles[doc].name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4" />
          Submit Dokumen
        </button>
      </div>
    </div>
  );
}
