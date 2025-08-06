import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { recentSessions } from "@/constants"


const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'> Popular Courses</h1>

      <section className="home-section">
        <CompanionCard 
          id="123"
          name="Learn Javascript"
          topic="code"
          subject="..."
          duration={45}
          color="#9CEECD"/>
        <CompanionCard
          id="123"
          name="Learn python"
          topic="code"
          subject="..."
          duration={45}
          color="#F9DA4A"/>
        <CompanionCard
            id="123"
            name="Learn Ruby"
            topic="code"
            subject="..."
            duration={45}
            color="#E36559"/>
      </section>

      <section className="home-section">
          <CompanionsList
          title="recents completed sessions"
          companions={recentSessions} 
          className="w-2/3 max-lg:w-full"
          />
          <CTA/>
      </section>
    </main>
  )
}

export default Page