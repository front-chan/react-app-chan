import "./App.css";
import { useState } from "react";

function Header(props) {
    // console.log(props.title);
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

function Create(props) {
    return (
        <article>
            <h2>Create</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const body = e.target.body.value;
                    props.onCreate(title, body);
                }}
            >
                <p>
                    <input type="text" name="title" placeholder="title" />
                </p>
                <p>
                    <textarea name="body" placeholder="body" />
                </p>
                <p>
                    <input type="submit" value="Create" />
                </p>
            </form>
        </article>
    );
}

function Update(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    return (
        <article>
            <h2>Update</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const body = e.target.body.value;
                    props.onUpdate(title, body);
                }}
            >
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => {
                            // console.log(e.target.value);
                            setTitle(e.target.value);
                        }}
                    />
                </p>
                <p>
                    <textarea
                        name="body"
                        placeholder="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </p>
                <p>
                    <input type="submit" value="Update" />
                </p>
            </form>
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
    const [nextId, setNextId] = useState(4);

    const [topics, setTopics] = useState([
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "javascript", body: "javascript is ..." },
    ]);

    let content = null;
    let contextControl = null;

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
        contextControl = (
            <>
                <li>
                    <a
                        href={`/update/${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("UPDATE");
                        }}
                    >
                        Update
                    </a>
                </li>
                <li>
                    <input
                        type="button"
                        value="Delete"
                        onClick={() => {
                            const newTopics = [];
                            for (let i = 0; i < topics.length; i++) {
                                if (topics[i].id !== id) {
                                    newTopics.push(topics[i]);
                                }
                            }
                            setTopics(newTopics);
                            setMode("WELCOME");
                        }}
                    />
                </li>
            </>
        );
    } else if (mode === "CREATE") {
        content = (
            <Create
                onCreate={(title, body) => {
                    const newTopic = { id: nextId, title, body };
                    const newTopics = [...topics];
                    newTopics.push(newTopic);
                    setTopics(newTopics);
                    setMode("READ");
                    setId(nextId);
                    setNextId(nextId + 1);
                }}
            ></Create>
        );
    } else if (mode === "UPDATE") {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            // console.log(topics[i].id, id);
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = (
            <Update
                title={title}
                body={body}
                onUpdate={(title, body) => {
                    // console.log(title, body);
                    const newTopics = [...topics];
                    const updatedTopic = { id, title, body };
                    for (let i = 0; i < newTopics.length; i++) {
                        if (newTopics[i].id === id) {
                            newTopics[i] = updatedTopic;
                            break;
                        }
                    }
                    setTopics(newTopics);
                    setMode("READ");
                }}
            ></Update>
        );
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

            <ul>
                <li>
                    <a
                        href="/create"
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("CREATE");
                        }}
                    >
                        Create
                    </a>
                </li>
                {contextControl}
            </ul>
        </div>
    );
}

export default App;
