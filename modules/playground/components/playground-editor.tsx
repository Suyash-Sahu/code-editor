"use client";
import { useRef, useEffect, useCallback } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import { TemplateFile } from "../lib/path-to-json"
import { configureMonaco, defaultEditorOptions, getEditorLanguage } from "../lib/editor-config"

const PlaygroundEditor = () => {
  return (
    <div>PlaygroundEditor</div>
  )
}

export default PlaygroundEditor