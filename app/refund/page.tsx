import type { Metadata } from "next"
import { RefundClient } from "./refund-client"

export const metadata: Metadata = {
  title: "Refund Policy | Arabdevs",
  description:
    "Learn about Arabdevs refund and return policy for digital services including VPS hosting, premium accounts, and automation tools.",
}

export default function RefundPage() {
  return <RefundClient />
}
