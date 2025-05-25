import Link from "next/link";

export default function PurchaseComplete() {
    return (
        <section className="p-8 text-center">
            <h1 className="text-2xl font-bold">Purchase Complete!</h1>
            <Link href="/">Go back to the main page to see more games,</Link>
            <br />
            <Link href="/profile">or head to your profile.</Link>

            <br /><br />

            <h1 className="text-2xl font-bold">Don't forget to play and enjoy your games!</h1>
        </section>
    );
}