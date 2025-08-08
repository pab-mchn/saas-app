import { getAllcompanions } from "@/lib/actions/companion.actions"
import CompanionCard from "@/components/CompanionCard"
import { getSubjectColor } from "@/lib/utils"


const companionsLibrary = async ({searchParams}: SearchParams) => {
  const filters = await searchParams
  const subject = filters.subjects ? filters.subjects : ''
  const topic = filters.topic ? filters.topic : ''

  const companions = await getAllcompanions({subject, topic})
  console.log(companions)

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>companions library</h1>
          <div className="flex gap-4">Filters</div>
          { companions.map((companion) => (
              <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
          ))
          }
      </section>
    </main>
  )
}

export default companionsLibrary