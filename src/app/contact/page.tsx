export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 text-blue-400">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Contact Us</h1>
            <p className="mb-8 text-lg leading-relaxed">
                Have questions, feedback, or need help? Fill out the form below and we’ll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-blue-300 rounded-md bg-white text-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-blue-300 rounded-md bg-white text-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block mb-1 font-medium">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 border border-blue-300 rounded-md bg-white text-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Your message"
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
