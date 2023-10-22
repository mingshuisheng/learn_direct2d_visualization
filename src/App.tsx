import {Routes, Route, A} from "@solidjs/router";
import {MainPage} from "./pages";
import {DrawLine} from "./pages/draw_line.tsx";
import {Box} from "@suid/material";

function App() {

  return (
    <Box displayRaw={"flex"} flexDirection={"column"} height={"100vh"}>
      <Box displayRaw={"flex"} gap={"10px"} justifyContent={"center"} alignItems={"center"} fontSize={"30px"} mt={"20px"}>
        <A href="/">主页</A>
        <A href="/draw_line">画线</A>
      </Box>
      <Box sx={{
        flex: "1"
      }}>
        <Routes>
          <Route path="/" component={MainPage}/>
          <Route path="/draw_line" component={DrawLine}/>
        </Routes>
      </Box>
    </Box>

  )
}

export default App
