import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Header(props) {
    console.log(props.title);
    return (
        <header>
            <h1>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </a>
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
                <a
                    id={t.id} // props.onChangeMode(t.id); 이렇게 작동할 때 없어도 작동됨
                    href={`/read/${t.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onChangeMode(Number(e.target.id));
                        // console.dir(e);
                        // props.onChangeMode(t.id); // 동일하게 동작함
                    }}
                >
                    {t.title}
                </a>
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
    const [mode, setMode] = useState("WELCOME");
    /*
    const _mode = useState('WELCOME');
    const mode = _mode[0];
    const setMode = _mode[1];
    >> const [mode, setMode] = useState("WELCOME"); 위에 세줄이 이 한줄과 같은 문법임

    console.log("_mode", _mode);
    _mode (2) ['WELCOME', function] 출력
    */

    const [id, setId] = useState(null);

    const topics = [
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "javascript", body: "javascript is ..." },
    ];

    let content = null;

    if (mode === "WELCOME") {
        content = <Article title="Welcome" body="Hello, WEB"></Article>;
    } else if (mode === "READ") {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            // console.log(topics[i].id, id);
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>;
    }

    return (
        <div className="App">
            <Header
                title="WEB"
                onChangeMode={() => {
                    setMode("WELCOME");
                }}
            ></Header>
            <Nav
                topics={topics}
                onChangeMode={(_id) => {
                    setMode("READ");
                    setId(_id);
                }}
            ></Nav>
            {content}
            {/* <Article title="Welcome" body="Hello, WEB"></Article> */}
            {/* <Article title="Hi" body="Hello, React"></Article> */}
        </div>
    );
}

export default App;
