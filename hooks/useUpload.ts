import { useCallback, useRef, useState } from "react";
import { LayoutAnimation } from "react-native";
import { supabase } from "../lib/supabase";

export default function useUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const hasFetchedOnce = useRef(false); 
Animation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      


  
const uploadFile = async (file: any) => {
  setLoading(true);
  setError(null);

  try {
    const fileUri = file.uri;
    const fileName = file.name;
    const mimeType = file.mimeType || 'application/octet-stream'; // Use mimeType from the picker if available

    console.log("Uploading file:", fileName);
    console.log("URI:", fileUri);
    console.log("MimeType:", mimeType);

    const formData = new FormData();
.
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: mimeType,
    } as any);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, formData, { 
        contentType: mimeType, 
        upsert: false,
      });

    if (error) {
      console.error("❌ Supabase upload error:", error.message);
      setError("Upload failed: " + error.message);
      return;
    }

    console.log("✅ Uploaded:", data);
    await fetchFiles(true);
    return data;
  } catch (err: any) {
    console.error("Upload failed:", err.message || err);
    setError("Upload failed: " + (err.message || "unknown error"));
  } finally {
    setLoading(false);
  }
};


const fetchFiles = useCallback(async (force = false) => {
  console.log("Fetching files from Supabase...", force);
    if (hasFetchedOnce.current && !force) return; 
    hasFetchedOnce.current = true;

    setLoading(true);
    setError(null);

    try {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      
      const { data, error: fetchError } = await supabase.storage
        .from("uploads")
        .list("", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (fetchError) throw fetchError;

      const filesWithUrls = (data || []).map((file) => {
        const { data: urlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(`${file.name}`);

        return {
          id: file.name,
          name: file.name,
          url: urlData.publicUrl,
        };  
      });
console.log("filesWithUrls  @@@@@@@@  ", filesWithUrls)
      setFiles(filesWithUrls.slice(1));
    } catch (fetchError: any) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [])  ;
  

  const deleteFile = async (fileName: string) => {
      const filePath = `${fileName}`; 

  
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const { error } = await supabase.storage.from("uploads").remove([filePath]);

  if (error) {
    console.error("Error deleting file:", error);
    throw error;
  }

    await fetchFiles(true); 
  console.log("File deleted successfully");
};


  return {
    loading,
    error,
    uploadFile,
    fetchFiles,
      deleteFile, 

    files,
  };
}

