import Image from "next/image"
import Link from "next/link"
const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning your way</div>
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning
      </h2>
      <p>Lorem ipsum dolor sit. Dolorem, ex ea a, enim cupiditate i
        ste labore provident esse modi incidunt, officiis dignissimos 
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={12}/>
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
        <Link href="/companions/new">
        <p>build sometihng new</p>
        </Link>
      </button>

    </section>
  )
}

export default CTA