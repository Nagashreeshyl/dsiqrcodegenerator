"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-bold uppercase tracking-tighter transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap active:scale-95 rounded-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:scale-105",
        outline: "border-2 border-border text-foreground bg-transparent hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:text-accent",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        default: "h-14 px-8 text-lg",
        lg: "h-20 px-12 text-2xl",
        icon: "size-12 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
