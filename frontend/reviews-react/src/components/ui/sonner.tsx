import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-center"
      toastOptions={{
        style: {
          padding: '16px 24px',
          fontSize: '16px',
          minHeight: '60px',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
