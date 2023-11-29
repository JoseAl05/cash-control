
import Footer from '@/components/footer/Footer';
import HeroComponent from '@/components/hero/HeroComponent';
import Navbar from '@/components/navbar/Navbar';



export default async function Home() {

  return (
    <main>
      <Navbar />
      <HeroComponent />
      <Footer />
    </main>
  )
}
