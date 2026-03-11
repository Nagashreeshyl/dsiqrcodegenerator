"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "h-12 w-12 border-2 border-border rounded-none bg-background hover:bg-primary hover:text-black transition-all"
      )}>
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-2 border-border rounded-none bg-background">
        <DropdownMenuItem onClick={() => setTheme("light")} className="uppercase font-bold tracking-tighter cursor-pointer hover:bg-primary hover:text-black">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="uppercase font-bold tracking-tighter cursor-pointer hover:bg-primary hover:text-black">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="uppercase font-bold tracking-tighter cursor-pointer hover:bg-primary hover:text-black">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
