import Link from 'next/link';

const HeroComponent = () => {
    return (
        // Create a hero compoent using tailwindcss, with an image and text explaining the app.
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="lg:text-9xl md:text-7xl sm:text-5xl text-4xl font-black mb-14">
                <span className="text-sky-500">Cash</span> Control
            </h1>
            <div className='flex flex-col justify-center items-center gap-y-10 px-10 lg:flex-row lg:gap-x-10 lg:px-0'>
                <div className='flex flex-col items-center'>
                    <h2 className=" text-xl text-sky-500 font-semibold lg:text-6xl md:text-4xl sm:text-2xl">Controla tu dinero!</h2>
                    <p className="text-black dark:text-white">Registra tus ingresos y gastos para que no gastes de más!.</p>
                </div>
                <Link href="/manage-cash" className="flex items-center py-2 px-4 bg-sky-500 rounded-full text-lg transition duration-300 ease-in-out hover:bg-sky-300 lg:py-4 lg:px-6 lg:text-xl">
                    Iniciar!
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-4 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default HeroComponent;