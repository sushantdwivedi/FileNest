import { useRef, useState } from "react";
import { supabase } from "../lib/supabase"; // Ensure this is configured
import { isValidFile } from "../utils/validation"; // Your custom file validation

export default function useUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const hasFetchedOnce = useRef(false); // ✅ Track if already fetched


  const uploadFile = async (file: any) => {
    setLoading(true);
    setError(null);

    const { valid, error: validationError } = isValidFile(file);
    if (!valid) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const { data, error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(`uploads/${file.name}`, file.uri, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Optional: refresh files list after upload
      await fetchFiles();

      return data;
    } catch (uploadError: any) {
      setError(uploadError.message);
    } finally {
      setLoading(false);
    }
  };

   const fetchFiles = async () => {
    if (hasFetchedOnce.current) return; // ✅ Prevent repeat fetching
    hasFetchedOnce.current = true;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.storage
        .from("uploads")
        .list("uploads/", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (fetchError) throw fetchError;

      const filesWithUrls = (data || []).map((file) => {
        const { data: urlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(`uploads/${file.name}`);

        return {
          id: file.name,
          name: file.name,
          url: urlData.publicUrl,
        };
      });

      setFiles(filesWithUrls);
    } catch (fetchError: any) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };
  

  return {
    loading,
    error,
    uploadFile,
    fetchFiles,
    files,
  };
}
