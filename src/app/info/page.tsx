import Link from "next/link";

export default function Info() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 text-blue-400">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">About Fireplay</h1>
            <p className="mb-8 text-lg leading-relaxed">
                Welcome to Fireplay! This page provides information about the purpose,
                features, and technologies used in this project.
                All made by Joan Gonzàlez Àlvarez
            </p>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Purpose</h2>
                <p className="text-base leading-relaxed">
                    This application is designed to help users manage their games efficiently and
                    stay organized.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Features</h2>
                <ul className="list-disc list-inside space-y-1 text-base">
                    <li>User authentication</li>
                    <li>Game Search</li>
                    <li>Game Listing and Sale</li>
                    <li>Responsive design</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
                <ul className="list-disc list-inside space-y-1 text-base">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS and CSS</li>
                    <li>Firebase / RAWG API</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">Contact</h2>
                <p className="text-base">
                    For support or inquiries, please{' '}
                    <Link href="/contact" className="text-blue-500 hover:underline">
                        click here
                    </Link>.
                </p>
            </section>
        </div>
    );
}
