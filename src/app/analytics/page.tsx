import BrandComparison from './components/visuals/BrandComparison'
import Filter from './components/data-filter/Filter'
import { getBrandComparisonData } from '@/src/lib/fetcher/brand_comparison/server'

export default async function Member() {
  const data = await getBrandComparisonData()

  return (
    <>
      <section>
        <Filter />
        <dl className="grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Inherent risk
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Risk scenarios over time grouped by risk level
              </dd>
            </div>
            <BrandComparison data={data} />
          </div>
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Inherent risk
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Risk scenarios over time grouped by risk level
              </dd>
            </div>
            <BrandComparison data={data} />
          </div>
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Inherent risk
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Risk scenarios over time grouped by risk level
              </dd>
            </div>
            <BrandComparison data={data} />
          </div>
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Inherent risk
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Risk scenarios over time grouped by risk level
              </dd>
            </div>
            <BrandComparison data={data} />
          </div>
        </dl>
      </section>
    </>
  )
}
