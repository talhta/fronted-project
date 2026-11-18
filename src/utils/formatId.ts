// 25 -> "#025"
export function formatId(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}
