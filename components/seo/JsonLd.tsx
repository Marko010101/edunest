/** Injects a JSON-LD <script> tag. Always rendered server-side. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled server-rendered JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
