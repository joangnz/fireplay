export default function Footer() {
    return (
        <footer className="bg-gray-100 text-sm text-center py-4 mt-10 border-t">
            <p>© {new Date().getFullYear()} Fireplay. Todos los derechos reservados.</p>
        </footer>
    );
}