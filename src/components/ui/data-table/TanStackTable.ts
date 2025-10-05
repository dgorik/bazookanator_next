// Corrected code
import { RowData } from '@tanstack/react-table'

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    displayName?: string // Made optional, as it is custom metadata
  }
}