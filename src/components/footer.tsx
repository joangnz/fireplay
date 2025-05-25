import '../styles/footer.css';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <p>© {new Date().getFullYear()} <Link href="/">Fireplay</Link>. Todos los derechos reservados.</p>
            <Link href="/info">Sobre Fireplay</Link>
            <Link href="/contact">Contacto</Link>
        </footer>
    );
}