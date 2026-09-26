export type InquiryStatus = 'new' | 'contacted' | 'resolved'

export interface ContactMessageInput {
  name: string
  email: string
  phone: string
  company?: string
  subject: string
  message: string
  product_id?: string | null
  product_name?: string | null
}

export interface ContactMessage extends ContactMessageInput {
  id: string
  status: InquiryStatus
  created_at: string
}
