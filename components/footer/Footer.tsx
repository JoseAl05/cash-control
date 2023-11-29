import Link from 'next/link';

const Footer = () => {
    return (
        // Create a footer component using tailwindcss, detailing the author, the year, the copyrigth and links to linkedin and github.
        <footer className='flex justify-center items-center'>
            <div className="mx-auto px-6 py-4 gap-x-2 text-center text-gray-600 dark:text-gray-300 lg:gap-x-5">
                <p>© 2021 Cash Control</p>
                <span>
                    Created by
                    <a href="https://www.linkedin.com/in/alejandro-fernandez-fernandez-1a7b1b1a4/" className="text-sky-500 ml-2 transition duration-300 ease-in-out dark:text-sky-300 hover:text-sky-300 dark:hover:text-sky-400">
                        José Pablo Arancibia Linker
                    </a>
                </span>
            </div>
        </footer>


    );
}

export default Footer;