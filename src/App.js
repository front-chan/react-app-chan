import logo from "./logo.svg";
import "./App.css";

function Header(props) {
    console.log(props.title);
    return (
        <header>
            <h1>
                <a href="/">{props.title}</a>
            </h1>
        </header>
    );
}

function Nav(props) {
    const lis = [
        // <li>
        //     <a href="/read/1">html</a>
        // </li>,
        // <li>
        //     <a href="/read/2">css</a>
        // </li>,
        // <li>
        //     <a href="/read/3">js</a>
        // </li>,
    ];
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <a href={`/read/${t.id}`}>{t.title}</a>
            </li>
        );
    }
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}

function App() {
    const topics = [
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "javascript", body: "javascript is ..." },
    ];
    return (
        <div className="App">
            <Header title="REACT"></Header>
            <Nav topics={topics}></Nav>
            <Article title="Welcome" body="Hello, WEB"></Article>
            <Article title="Hi" body="Hello, React"></Article>
        </div>
    );
}

export default App;
