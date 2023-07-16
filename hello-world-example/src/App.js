function Profile() {
    return (
        <img
            src="https://i.imgur.com/MK3eW3As.jpg"
            alt="Katherine Johnson"
        />
    );
}
function Links() {
    return (
        <button href="https://youtube.com">youtube</button>
    );
}

export default function Gallery() {
    return (
        <section>
            <h1>Amazing scientists 1</h1>
            <Profile />
            <Profile />
            <Profile />
            <Links />
        </section>
    );
}
