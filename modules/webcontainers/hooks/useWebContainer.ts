import { useState, useEffect, useCallback, useRef } from "react";
import { WebContainer } from "@webcontainer/api";
import { TemplateFolder } from "@/modules/playground/lib/path-to-json";

// Global reference to the WebContainer instance
let globalWebContainerInstance: WebContainer | null = null;
let isBooting = false;
const bootPromiseMap = new Map();

interface UseWebContainerProps {
  templateData: TemplateFolder;
}

interface UseWebContaierReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destroy: () => void;
}

export const useWebContainer = ({
  templateData,
}: UseWebContainerProps): UseWebContaierReturn => {
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [instance, setInstance] = useState<WebContainer | null>(null);
  const instanceRef = useRef<WebContainer | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeWebContainer() {
      try {
        // Check if we already have a global instance
        if (globalWebContainerInstance) {
          if (mounted) {
            setInstance(globalWebContainerInstance);
            instanceRef.current = globalWebContainerInstance;
            setIsLoading(false);
          }
          return;
        }

        // Check if we're already booting
        if (isBooting) {
          // Wait for the existing boot process to complete
          const bootPromise = bootPromiseMap.get('default') || new Promise(resolve => {
            const interval = setInterval(() => {
              if (globalWebContainerInstance) {
                clearInterval(interval);
                resolve(globalWebContainerInstance);
              }
            }, 100);
          });
          
          const webcontainerInstance = await bootPromise;
          if (mounted) {
            setInstance(webcontainerInstance as WebContainer);
            instanceRef.current = webcontainerInstance as WebContainer;
            setIsLoading(false);
          }
          return;
        }

        // Set booting flag
        isBooting = true;
        
        // Create a new boot promise
        const bootPromise = WebContainer.boot();
        bootPromiseMap.set('default', bootPromise);

        const webcontainerInstance = await bootPromise;
        
        // Store the global instance
        globalWebContainerInstance = webcontainerInstance;
        isBooting = false;

        if (mounted) {
          setInstance(webcontainerInstance);
          instanceRef.current = webcontainerInstance;
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to initialize WebContainer:", error);
        isBooting = false;
        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize WebContainer"
          );
          setIsLoading(false);
        }
      }
    }

    initializeWebContainer();

    return () => {
      mounted = false;
      // Don't teardown the global instance here, let destroy() handle it
    };
  }, []);

  // Cache for folder creation to avoid redundant mkdir calls
  const folderCreationCache = useRef<Set<string>>(new Set());

  const writeFileSync = useCallback(
    async (path: string, content: string): Promise<void> => {
      const currentInstance = instanceRef.current || instance;
      if (!currentInstance) {
        throw new Error("WebContainer instance is not available");
      }

      try {
        const pathParts = path.split("/");
        const folderPath = pathParts.slice(0, -1).join("/");

        // Only create folder if it doesn't exist in cache
        if (folderPath && !folderCreationCache.current.has(folderPath)) {
          await currentInstance.fs.mkdir(folderPath, { recursive: true });
          folderCreationCache.current.add(folderPath);
        }

        await currentInstance.fs.writeFile(path, content);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to write file";
        console.error(`Failed to write file at ${path}:`, err);
        throw new Error(`Failed to write file at ${path}: ${errorMessage}`);
      }
    },
    [instance]
  );

  const destroy = useCallback(() => {
    if (globalWebContainerInstance) {
      globalWebContainerInstance.teardown();
      globalWebContainerInstance = null;
      setInstance(null);
      instanceRef.current = null;
      setServerUrl(null);
    }
  }, []);

  return { serverUrl, isLoading, error, instance, writeFileSync, destroy };
};