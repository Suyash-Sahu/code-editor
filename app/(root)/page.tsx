import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <div className="flex flex-col justify-center items-center my-5">
        {/* Hero Image with hover effect */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#83B7DE]/20 via-[#74FF9E]/20 to-[#F2FF58]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          <Image
            src={"/hero.svg"}
            alt="Hero-Section"
            height={500}
            width={500}
            className="relative z-10 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Main Heading with enhanced gradient */}
        <h1 className="z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#256DA4] via-[#83B7DE] to-[#74FF9E] dark:from-[#83B7DE] dark:via-[#74FF9E] dark:to-[#F2FF58] tracking-tight leading-[1.3] animate-gradient">
          Codyn IDE
        </h1>

        {/* Subtitle with accent color */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#83B7DE] to-transparent"></div>
          <p className="text-sm font-semibold text-[#256DA4] dark:text-[#83B7DE] tracking-wider uppercase">
            Code Smarter, Build Faster
          </p>
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#83B7DE] to-transparent"></div>
        </div>
      </div>

      {/* Description with improved styling */}
      <p className="mt-2 text-lg text-center text-[#256DA4]/80 dark:text-[#83B7DE]/90 px-5 py-10 max-w-2xl leading-relaxed">
        Codyn IDE is a{" "}
        <span className="font-semibold text-[#256DA4] dark:text-[#74FF9E]">
          powerful and intelligent
        </span>{" "}
        code editor that enhances your coding experience with advanced features
        and seamless integration. It is designed to help you{" "}
        <span className="font-semibold text-[#256DA4] dark:text-[#74FF9E]">
          write, debug, and optimize
        </span>{" "}
        your code efficiently.
      </p>

      {/* CTA Button with enhanced styling */}
      <Link href={"/dashboard"} className="group">
        <Button
          variant={"brand"}
          className="mb-4 shadow-lg shadow-[#74FF9E]/20 hover:shadow-xl hover:shadow-[#74FF9E]/30 transition-all duration-300"
          size={"lg"}
        >
          Get Started
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </Link>

      {/* Feature badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8 px-4">
        <span className="px-4 py-2 rounded-full bg-[#83B7DE]/10 dark:bg-[#83B7DE]/20 text-[#256DA4] dark:text-[#83B7DE] text-sm font-medium border border-[#83B7DE]/20 dark:border-[#83B7DE]/30">
          ⚡ Lightning Fast
        </span>
        <span className="px-4 py-2 rounded-full bg-[#74FF9E]/10 dark:bg-[#74FF9E]/20 text-[#256DA4] dark:text-[#74FF9E] text-sm font-medium border border-[#74FF9E]/20 dark:border-[#74FF9E]/30">
          🎨 Beautiful UI
        </span>
        <span className="px-4 py-2 rounded-full bg-[#ABB900]/10 dark:bg-[#F2FF58]/20 text-[#256DA4] dark:text-[#F2FF58] text-sm font-medium border border-[#ABB900]/20 dark:border-[#F2FF58]/30">
          🚀 AI Powered
        </span>
      </div>
    </div>
  );
}