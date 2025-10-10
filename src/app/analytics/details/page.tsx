import { SimpleTable } from '@/src/components/ui/data-table/SimpleTable'
import { usage } from '@/src/data/usage'

export default function Details() {
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Details
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <SimpleTable data={usage} />
      </div>
    </>
  )
}
