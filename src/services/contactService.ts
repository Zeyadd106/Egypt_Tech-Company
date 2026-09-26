import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { ContactMessageInput } from '../types/contact'

export interface SubmitResult {
  ok: boolean
  demo: boolean
  message: string
}

/**
 * Save a contact / product inquiry message.
 * Uses Supabase when configured; otherwise simulates a successful
 * submission (demo mode) so the brochure is testable immediately.
 */
export async function submitContactMessage(
  input: ContactMessageInput,
): Promise<SubmitResult> {
  if (!isSupabaseConfigured || !supabase) {
    await new Promise((r) => setTimeout(r, 700))
    try {
      const outbox = JSON.parse(
        localStorage.getItem('egypttech_demo_inbox') ?? '[]',
      ) as unknown[]
      outbox.push({ ...input, created_at: new Date().toISOString(), status: 'new' })
      localStorage.setItem('egypttech_demo_inbox', JSON.stringify(outbox))
    } catch {
      /* storage unavailable — still report success in demo mode */
    }
    return {
      ok: true,
      demo: true,
      message: 'Thank you for contacting us. Our team will get back to you soon.',
    }
  }

  const { error } = await supabase.from('contact_messages').insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company || null,
    subject: input.subject,
    message: input.message,
    product_id: input.product_id || null,
    product_name: input.product_name || null,
    status: 'new',
  })

  if (error) {
    throw new Error('Unable to send your message. Please try again later.')
  }
  return {
    ok: true,
    demo: false,
    message: 'Thank you for contacting us. Our team will get back to you soon.',
  }
}

export async function submitProductInquiry(
  productId: string | null,
  productName: string,
  input: Omit<ContactMessageInput, 'subject' | 'product_id' | 'product_name'>,
): Promise<SubmitResult> {
  return submitContactMessage({
    ...input,
    subject: `Product Inquiry: ${productName}`,
    product_id: productId,
    product_name: productName,
  })
}
