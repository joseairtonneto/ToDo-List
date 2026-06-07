import React from 'react'
import { cva, cx, type VariantProps } from 'class-variance-authority'
import { textVariants } from './text'

export const inputTextVariants = cva(
  'border-b border-solid border-gray-200 focus:border-pink-base bg-transparent outline-none',
  {
    variants: {
      size: {
        md: 'pb-2 px-2',
      },
      disabled: {
        true: 'pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
)

interface InputTextProps
  extends
    Omit<React.ComponentProps<'input'>, 'size' | 'disabled'>,
    VariantProps<typeof inputTextVariants> {}

export default function inputText({ size, disabled, className, ...props }: InputTextProps) {
  return (
    <input
      className={cx(inputTextVariants({ size, disabled, className }), textVariants, className)}
      {...props}
    />
  )
}
