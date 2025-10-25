import * as React from "react" 
import { Slot } from "@radix-ui/react-slot" 
import { cva, type VariantProps } from "class-variance-authority" 
 
import { cn } from "@/lib/utils" 
 
const buttonVariants = cva( 
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", 
  { 
    variants: { 
      variant: { 
        default: 
          "bg-gradient-to-r from-[#256DA4] to-[#83B7DE] text-white shadow-xs hover:from-[#256DA4]/90 hover:to-[#83B7DE]/90 active:from-[#256DA4]/80 active:to-[#83B7DE]/80", 
        destructive: 
          "bg-gradient-to-r from-destructive to-destructive/90 text-white shadow-xs hover:from-destructive/90 hover:to-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:from-destructive/80 active:to-destructive/70", 
        outline: 
          "border border-[#256DA4] bg-background text-[#256DA4] shadow-xs hover:bg-[#256DA4]/10 hover:border-[#83B7DE] dark:border-[#83B7DE]/50 dark:text-[#83B7DE] dark:hover:bg-[#83B7DE]/20 dark:hover:border-[#74FF9E]", 
        secondary: 
          "bg-gradient-to-r from-[#F2FF58] to-[#ABB900] text-black shadow-xs hover:from-[#F2FF58]/90 hover:to-[#ABB900]/90 active:from-[#F2FF58]/80 active:to-[#ABB900]/80", 
        ghost: 
          "hover:bg-[#256DA4]/10 hover:text-[#256DA4] dark:hover:bg-[#74FF9E]/10 dark:hover:text-[#74FF9E]", 
        link: "text-[#256DA4] underline-offset-4 hover:text-[#83B7DE] dark:text-[#83B7DE] dark:hover:text-[#74FF9E] hover:underline", 
        brand: "bg-gradient-to-r from-[#74FF9E] to-[#DAE039] text-black shadow-xs hover:from-[#74FF9E]/90 hover:to-[#DAE039]/90 active:from-[#74FF9E]/80 active:to-[#DAE039]/80", 
      }, 
      size: { 
        default: "h-9 px-4 py-2 has-[>svg]:px-3", 
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5", 
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4", 
        icon: "size-9", 
      }, 
    }, 
    defaultVariants: { 
      variant: "default", 
      size: "default", 
    }, 
  } 
) 
 
function Button({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  ...props 
}: React.ComponentProps<"button"> & 
  VariantProps<typeof buttonVariants> & { 
    asChild?: boolean 
  }) { 
  const Comp = asChild ? Slot : "button" 
 
  return ( 
    <Comp 
      data-slot="button" 
      className={cn(buttonVariants({ variant, size, className }))} 
      {...props} 
    /> 
  ) 
} 
 
export { Button, buttonVariants }