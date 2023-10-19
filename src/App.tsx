import {Routes, Route, A} from "@solidjs/router";
import {MainPage} from "./pages";
import {AboutPage} from "./pages/about";

function App() {

  return (
    <div flex flex-col h-screen>
      <div >
        <A href="/">主页</A>
        <A href="/about">关于</A>
      </div>
      <div flex-1 style={{
        color: "#f0f"
      }}>
          <Routes>
            <Route path="/" component={MainPage} />
            <Route path="/about" component={AboutPage} />
          </Routes>
      </div>
    </div>

  )
}

export default App
