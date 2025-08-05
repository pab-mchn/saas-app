import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"

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
          <CompanionsList/>
          <CompanionsList/>
          <CompanionsList/>
          <CTA/>
      </section>
    </main>
  )
}

export default Page