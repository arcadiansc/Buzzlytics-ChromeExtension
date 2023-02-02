import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Buzzlytics</h1>
      <h3>
        Join our community to ask for help regarding the tool or to give
        suggestions about new features!
      </h3>
      <h2>
        <a
          onClick={() =>
            chrome.tabs.create({ url: "https://discord.gg/AZ3asm2qSh" })
          }
          href="https://discord.gg/AZ3asm2qSh"
        >
          Click Here To Join Discord
        </a>
      </h2>
      <p>
        For more detailed metrics and a historical tracking of any account go to{" "}
        <a
          onClick={() => chrome.tabs.create({ url: "https://buzzlytics.io" })}
          href="https://buzzlytics.io"
        >
          https://buzzlytics.io
        </a>
      </p>
    </div>
  );
}

export default App;
