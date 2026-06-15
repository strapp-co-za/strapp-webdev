import { useEffect, useRef } from "react";

// IndexedDB util (minimal, brutalist)
function saveDraft(key: string, data: any) {
  if (!window.indexedDB) return;
  const req = window.indexedDB.open("strapp-drafts", 1);
  req.onupgradeneeded = () => {
    req.result.createObjectStore("drafts");
  };
  req.onsuccess = () => {
    const tx = req.result.transaction("drafts", "readwrite");
    tx.objectStore("drafts").put(data, key);
    tx.oncomplete = () => req.result.close();
  };
}

export function useAppLifecycleManager({
  formState,
  formKey,
  isDirty,
}: {
  formState: any;
  formKey: string;
  isDirty: boolean;
}) {
  const lastDraft = useRef<any>(null);
  const debounce = useRef<NodeJS.Timeout | null>(null);

  // Debounced draft save
  useEffect(() => {
    if (!isDirty) return;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      saveDraft(formKey, formState);
      lastDraft.current = formState;
    }, 500);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, isDirty]);

  // Instant backup on visibility loss (slide-down, home button)
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === "hidden" && isDirty) {
        saveDraft(formKey, formState);
        lastDraft.current = formState;
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, isDirty]);

  // Block exit if dirty
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Do you want to exit and discard drafts?";
        return "Do you want to exit and discard drafts?";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);
}
