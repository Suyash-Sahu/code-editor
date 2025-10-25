"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoadingStep from "@/modules/playground/components/loader";
import {PlaygroundEditor} from "@/modules/playground/components/playground-editor";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";
import ToggleAI from "@/modules/playground/components/toggle-ai";
import { useAISuggestions } from "@/modules/playground/hooks/useAISuggestion";
import { useFileExplorer } from "@/modules/playground/hooks/useFileExplorer";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { findFilePath } from "@/modules/playground/lib";
import {
  TemplateFile,
  TemplateFolder,
} from "@/modules/playground/lib/path-to-json";
import WebContainerPreview from "@/modules/webcontainers/components/webcontainer-preview";
import { useWebContainer } from "@/modules/webcontainers/hooks/useWebContainer";
import {
  AlertCircle,
  Bot,
  FileText,
  FolderOpen,
  Save,
  Settings,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const { playgroundData, templateData, isLoading, error, saveTemplateData } =
    usePlayground(id);

  const aiSuggestions = useAISuggestions();

  const {
    setTemplateData,
    setActiveFileId,
    setPlaygroundId,
    setOpenFiles,
    activeFileId,
    closeAllFiles,
    closeFile,
    openFile,
    openFiles,
    handleAddFile,
    handleAddFolder,
    handleDeleteFile,
    handleDeleteFolder,
    handleRenameFile,
    handleRenameFolder,
    updateFileContent
  } = useFileExplorer();

  const {
    serverUrl,
    isLoading: containerLoading,
    error: containerError,
    instance,
    writeFileSync,
    // @ts-ignore
  } = useWebContainer({ templateData });

  const lastSyncedContent = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    setPlaygroundId(id);
  }, [id, setPlaygroundId]);

  useEffect(() => {
    if (templateData && !openFiles.length) {
      setTemplateData(templateData);
    }
  }, [templateData, setTemplateData, openFiles.length]);

  // Create wrapper functions that pass saveTemplateData
  const wrappedHandleAddFile = useCallback(
    (newFile: TemplateFile, parentPath: string) => {
      return handleAddFile(
        newFile,
        parentPath,
        writeFileSync!,
        instance,
        saveTemplateData
      );
    },
    [handleAddFile, writeFileSync, instance, saveTemplateData]
  );

  const wrappedHandleAddFolder = useCallback(
    (newFolder: TemplateFolder, parentPath: string) => {
      return handleAddFolder(newFolder, parentPath, instance, saveTemplateData);
    },
    [handleAddFolder, instance, saveTemplateData]
  );

  const wrappedHandleDeleteFile = useCallback(
    (file: TemplateFile, parentPath: string) => {
      return handleDeleteFile(file, parentPath, saveTemplateData);
    },
    [handleDeleteFile, saveTemplateData]
  );

  const wrappedHandleDeleteFolder = useCallback(
    (folder: TemplateFolder, parentPath: string) => {
      return handleDeleteFolder(folder, parentPath, saveTemplateData);
    },
    [handleDeleteFolder, saveTemplateData]
  );

  const wrappedHandleRenameFile = useCallback(
    (
      file: TemplateFile,
      newFilename: string,
      newExtension: string,
      parentPath: string
    ) => {
      return handleRenameFile(
        file,
        newFilename,
        newExtension,
        parentPath,
        saveTemplateData
      );
    },
    [handleRenameFile, saveTemplateData]
  );

  const wrappedHandleRenameFolder = useCallback(
    (folder: TemplateFolder, newFolderName: string, parentPath: string) => {
      return handleRenameFolder(
        folder,
        newFolderName,
        parentPath,
        saveTemplateData
      );
    },
    [handleRenameFolder, saveTemplateData]
  );

  const activeFile = openFiles.find((file) => file.id === activeFileId);
  const hasUnsavedChanges = openFiles.some((file) => file.hasUnsavedChanges);

  const handleFileSelect = (file: TemplateFile) => {
    openFile(file);
  };

  const handleSave = useCallback(
    async (fileId?: string) => {
      const targetFileId = fileId || activeFileId;
      if (!targetFileId) return;

      const fileToSave = openFiles.find((f) => f.id === targetFileId);

      if (!fileToSave) return;

      const latestTemplateData = useFileExplorer.getState().templateData;
      if (!latestTemplateData) return

      try {
        const filePath = findFilePath(fileToSave, latestTemplateData);
        if (!filePath) {
          toast.error(
            `Could not find path for file: ${fileToSave.filename}.${fileToSave.fileExtension}`
          );
          return;
        }

        const updatedTemplateData = JSON.parse(
          JSON.stringify(latestTemplateData)
        );

        // @ts-ignore
        const updateFileContent = (items: any[]) =>
          // @ts-ignore
          items.map((item) => {
            if ("folderName" in item) {
              return { ...item, items: updateFileContent(item.items) };
            } else if (
              item.filename === fileToSave.filename &&
              item.fileExtension === fileToSave.fileExtension
            ) {
              return { ...item, content: fileToSave.content };
            }
            return item;
          });
        updatedTemplateData.items = updateFileContent(
          updatedTemplateData.items
        );

        // Sync with WebContainer
        if (writeFileSync) {
          await writeFileSync(filePath, fileToSave.content);
          lastSyncedContent.current.set(fileToSave.id, fileToSave.content);
        }

        const newTemplateData = await saveTemplateData(updatedTemplateData);
        setTemplateData(newTemplateData ?? updatedTemplateData);

        // Update open files
        const updatedOpenFiles = openFiles.map((f) =>
          f.id === targetFileId
            ? {
                ...f,
                content: fileToSave.content,
                originalContent: fileToSave.content,
                hasUnsavedChanges: false,
              }
            : f
        );
        setOpenFiles(updatedOpenFiles);

        toast.success(
          `Saved ${fileToSave.filename}.${fileToSave.fileExtension}`
        );
      } catch (error) {
        console.error("Error saving file:", error);
        toast.error(
          `Failed to save ${fileToSave.filename}.${fileToSave.fileExtension}`
        );
        throw error;
      }
    },
    [
      activeFileId,
      openFiles,
      writeFileSync,
      instance,
      saveTemplateData,
      setTemplateData,
      setOpenFiles,
    ]
  );

  const handleSaveAll = async () => {
    const unsavedFiles = openFiles.filter((f) => f.hasUnsavedChanges);

    if (unsavedFiles.length === 0) {
      toast.info("No unsaved changes");
      return;
    }

    const toastId = toast.loading(`Saving ${unsavedFiles.length} file(s)...`);
    
    try {
      // Save files sequentially to avoid overwhelming the WebContainer
      for (const file of unsavedFiles) {
        await handleSave(file.id);
      }
      toast.success(`Saved ${unsavedFiles.length} file(s)`, { id: toastId });
    } catch (error) {
      toast.error("Failed to save some files", { id: toastId });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-400/20 to-red-500/20 blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="p-4 rounded-full bg-red-500/10 dark:bg-red-500/20 mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
              Something went wrong
            </h2>
            <p className="text-[#256DA4] dark:text-[#83B7DE] mb-4 text-center max-w-md">
              {error}
            </p>
            <Button onClick={() => window.location.reload()} variant="destructive">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-[#83B7DE]/20 dark:border-[#74FF9E]/20 bg-gradient-to-br from-white to-[#83B7DE]/5 dark:from-zinc-900 dark:to-[#74FF9E]/5">
          <h2 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-[#256DA4] via-[#83B7DE] to-[#74FF9E] dark:from-[#83B7DE] dark:via-[#74FF9E] dark:to-[#F2FF58] bg-clip-text text-transparent">
            Loading Playground
          </h2>
          <div className="mb-8">
            <LoadingStep
              currentStep={1}
              step={1}
              label="Loading playground data"
            />
            <LoadingStep
              currentStep={2}
              step={2}
              label="Setting up environment"
            />
            <LoadingStep currentStep={3} step={3} label="Ready to code" />
          </div>
        </div>
      </div>
    );
  }

  // No template data
  if (!templateData) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ABB900]/20 via-[#DAE039]/20 to-[#F2FF58]/20 blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="p-4 rounded-full bg-[#ABB900]/10 dark:bg-[#F2FF58]/20 mb-4">
              <FolderOpen className="h-12 w-12 text-[#ABB900] dark:text-[#F2FF58]" />
            </div>
            <h2 className="text-xl font-semibold text-[#ABB900] dark:text-[#F2FF58] mb-2">
              No template data available
            </h2>
            <Button onClick={() => window.location.reload()} variant="outline">
              Reload Template
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <>
        <TemplateFileTree
          data={templateData!}
          onFileSelect={handleFileSelect}
          selectedFile={activeFile}
          title="File Explorer"
          onAddFile={wrappedHandleAddFile}
          onAddFolder={wrappedHandleAddFolder}
          onDeleteFile={wrappedHandleDeleteFile}
          onDeleteFolder={wrappedHandleDeleteFolder}
          onRenameFile={wrappedHandleRenameFile}
          onRenameFolder={wrappedHandleRenameFolder}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#83B7DE]/20 dark:border-[#74FF9E]/20 px-4 bg-gradient-to-r from-white via-[#83B7DE]/5 to-white dark:from-zinc-950 dark:via-[#74FF9E]/5 dark:to-zinc-950">
            <SidebarTrigger className="-ml-1 text-[#256DA4] dark:text-[#83B7DE] hover:text-[#83B7DE] dark:hover:text-[#74FF9E]" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-[#83B7DE]/30 dark:bg-[#74FF9E]/30" />

            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-col flex-1">
                <h1 className="text-sm font-semibold bg-gradient-to-r from-[#256DA4] to-[#83B7DE] dark:from-[#83B7DE] dark:to-[#74FF9E] bg-clip-text text-transparent">
                  {playgroundData?.title || "Code Playground"}
                </h1>
                <p className="text-xs text-[#256DA4]/70 dark:text-[#83B7DE]/70">
                  {openFiles.length} File(s) Open
                  {hasUnsavedChanges && (
                    <span className="text-[#DAE039] dark:text-[#F2FF58]">
                      {" "}• Unsaved changes
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSave()}
                      disabled={!activeFile || !activeFile.hasUnsavedChanges}
                      className="border-[#83B7DE]/30 dark:border-[#74FF9E]/30 hover:bg-[#83B7DE]/10 dark:hover:bg-[#74FF9E]/10 hover:border-[#83B7DE] dark:hover:border-[#74FF9E]"
                    >
                      <Save className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#256DA4] dark:bg-[#74FF9E] text-white dark:text-black border-none">
                    Save (Ctrl+S)
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSaveAll}
                      disabled={!hasUnsavedChanges}
                      className="border-[#83B7DE]/30 dark:border-[#74FF9E]/30 hover:bg-[#83B7DE]/10 dark:hover:bg-[#74FF9E]/10 hover:border-[#83B7DE] dark:hover:border-[#74FF9E]"
                    >
                      <Save className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE]" /> 
                      <span className="text-[#256DA4] dark:text-[#83B7DE]">All</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#256DA4] dark:bg-[#74FF9E] text-white dark:text-black border-none">
                    Save All (Ctrl+Shift+S)
                  </TooltipContent>
                </Tooltip>

                <ToggleAI
                  isEnabled={aiSuggestions.isEnabled}
                  onToggle={aiSuggestions.toggleEnabled}
                  suggestionLoading={aiSuggestions.isLoading}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#83B7DE]/30 dark:border-[#74FF9E]/30 hover:bg-[#83B7DE]/10 dark:hover:bg-[#74FF9E]/10 hover:border-[#83B7DE] dark:hover:border-[#74FF9E]"
                    >
                      <Settings className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-[#83B7DE]/20 dark:border-[#74FF9E]/20">
                    <DropdownMenuItem
                      onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                      className="text-[#256DA4] dark:text-[#83B7DE] focus:bg-[#83B7DE]/10 dark:focus:bg-[#74FF9E]/10 focus:text-[#256DA4] dark:focus:text-[#74FF9E]"
                    >
                      {isPreviewVisible ? "Hide" : "Show"} Preview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#83B7DE]/20 dark:bg-[#74FF9E]/20" />
                    <DropdownMenuItem 
                      onClick={closeAllFiles}
                      className="text-[#256DA4] dark:text-[#83B7DE] focus:bg-[#83B7DE]/10 dark:focus:bg-[#74FF9E]/10 focus:text-[#256DA4] dark:focus:text-[#74FF9E]"
                    >
                      Close All Files
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <div className="h-[calc(100vh-4rem)]">
            {openFiles.length > 0 ? (
              <div className="h-full flex flex-col">
                <div className="border-b border-[#83B7DE]/20 dark:border-[#74FF9E]/20 bg-gradient-to-r from-white via-[#83B7DE]/5 to-white dark:from-zinc-950 dark:via-[#74FF9E]/5 dark:to-zinc-950">
                  <Tabs
                    value={activeFileId || ""}
                    onValueChange={setActiveFileId}
                  >
                    <div className="flex items-center justify-between px-4 py-2">
                      <TabsList className="h-8 bg-transparent p-0">
                        {openFiles.map((file) => (
                          <TabsTrigger
                            key={file.id}
                            value={file.id}
                            className="relative h-8 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#83B7DE]/10 data-[state=active]:to-[#74FF9E]/10 dark:data-[state=active]:from-[#83B7DE]/20 dark:data-[state=active]:to-[#74FF9E]/20 data-[state=active]:border-b-2 data-[state=active]:border-[#83B7DE] dark:data-[state=active]:border-[#74FF9E] data-[state=active]:shadow-sm group transition-all duration-200"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-3 w-3 text-[#256DA4] dark:text-[#83B7DE] group-data-[state=active]:text-[#83B7DE] dark:group-data-[state=active]:text-[#74FF9E]" />
                              <span className="text-[#256DA4] dark:text-[#83B7DE] group-data-[state=active]:text-[#256DA4] dark:group-data-[state=active]:text-[#74FF9E] group-data-[state=active]:font-medium">
                                {file.filename}.{file.fileExtension}
                              </span>
                              {file.hasUnsavedChanges && (
                                <span className="h-2 w-2 rounded-full bg-[#DAE039] dark:bg-[#F2FF58] animate-pulse" />
                              )}
                              <span
                                className="ml-2 h-4 w-4 hover:bg-destructive hover:text-destructive-foreground rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  closeFile(file.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </span>
                            </div>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {openFiles.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={closeAllFiles}
                          className="h-6 px-2 text-xs text-[#256DA4] dark:text-[#83B7DE] hover:text-[#83B7DE] dark:hover:text-[#74FF9E] hover:bg-[#83B7DE]/10 dark:hover:bg-[#74FF9E]/10"
                        >
                          Close All
                        </Button>
                      )}
                    </div>
                  </Tabs>
                </div>
                <div className="flex-1">
                  <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full"
                  >
                    <ResizablePanel defaultSize={isPreviewVisible ? 50 : 100}>
                      <PlaygroundEditor
                        activeFile={activeFile}
                        content={activeFile?.content || ""}
                        onContentChange={(value) => 
                          activeFileId && updateFileContent(activeFileId, value)
                        }
                        suggestion={aiSuggestions.suggestion}
                        suggestionLoading={aiSuggestions.isLoading}
                        suggestionPosition={aiSuggestions.position}
                        onAcceptSuggestion={(editor, monaco) => aiSuggestions.acceptSuggestion(editor, monaco)}
                        onRejectSuggestion={(editor) =>
                          aiSuggestions.rejectSuggestion(editor)
                        }
                        onTriggerSuggestion={(type, editor) =>
                          aiSuggestions.fetchSuggestion(type, editor)
                        }
                      />
                    </ResizablePanel>

                    {isPreviewVisible && (
                      <>
                        <ResizableHandle className="bg-[#83B7DE]/20 dark:bg-[#74FF9E]/20 hover:bg-[#83B7DE]/40 dark:hover:bg-[#74FF9E]/40" />
                        <ResizablePanel defaultSize={50}>
                          <WebContainerPreview
                            templateData={templateData}
                            instance={instance}
                            writeFileSync={writeFileSync}
                            isLoading={containerLoading}
                            error={containerError}
                            serverUrl={serverUrl!}
                            forceResetup={false}
                          />
                        </ResizablePanel>
                      </>
                    )}
                  </ResizablePanelGroup>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full items-center justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#83B7DE]/20 via-[#74FF9E]/20 to-[#F2FF58]/20 blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="p-6 rounded-full bg-[#83B7DE]/10 dark:bg-[#74FF9E]/10 mb-4">
                      <FileText className="h-16 w-16 text-[#83B7DE] dark:text-[#74FF9E]" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-[#256DA4] dark:text-[#83B7DE] mb-2">
                        No files open
                      </p>
                      <p className="text-sm text-[#256DA4]/70 dark:text-[#83B7DE]/70">
                        Select a file from the sidebar to start editing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </>
    </TooltipProvider>
  );
};

export default MainPlaygroundPage;