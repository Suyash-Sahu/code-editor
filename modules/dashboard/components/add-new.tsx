
"use client";

import { Button } from "@/components/ui/button"
// import { createPlayground } from "@/features/playground/actions";
import { Plus } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { toast } from "sonner";
import TemplateSelectingModel from "./template-selecting-model";
import { createPlayground } from "../actions/index";

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  } | null>(null)
  const [isClient, setIsClient] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server
  if (!isClient) {
    return null;
  }


  const handleSubmit = async (data:{
      title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  })=>{
    try {
      setSelectedTemplate(data)
      const res = await createPlayground(data);
      
      if (res) {
        toast.success("Playground Created successfully");
        setIsModalOpen(false);
        router.push(`/playground/${res.id}`);
      } else {
        toast.error("Failed to create playground");
      }
    } catch (error) {
      console.error("Error creating playground:", error);
      toast.error("Failed to create playground: " + (error as Error).message);
      setIsModalOpen(false);
    }
  }


  return (
    <>
      <div
        onClick={() => {
          console.log("Add New button clicked");
          setIsModalOpen(true);
        }}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:bg-background hover:border-[#256DA4] hover:scale-[1.02]
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        hover:shadow-[0_10px_30px_rgba(37,109,164,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white group-hover:bg-[#f0f8ff] group-hover:border-[#256DA4] group-hover:text-[#256DA4] transition-colors duration-300"
            size={"icon"}
          >
            <Plus size={30} className="transition-transform duration-300 group-hover:rotate-90" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#256DA4] to-[#83B7DE] bg-clip-text text-transparent">Add New</h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">Create a new playground</p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={"/add-new.svg"}
            alt="Create new playground"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <TemplateSelectingModel
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      onSubmit={handleSubmit}
      />
   
    </>
  )
}

export default AddNewButton
