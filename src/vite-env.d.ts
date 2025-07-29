/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYMENT_RECIPIENT_ADDRESS: string
  readonly VITE_PAYMENT_DEFAULT_AMOUNT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}