import {Box} from "@suid/material";

export const MainPage = () => {
  return (
    <Box displayRaw="flex" flexDirection={"column"} alignItems="center" justifyContent="center" height={"200px"}
         fontSize={"25px"}>
      <Box>这个项目主要是用来学习Direct2d，把一些不太好理解的部分可视化、动画化</Box>
      <Box color={"red"} fontSize={"30px"} mt={"10px"}>
        <Box>注意：请以微软的官方文档为准，本网站的内容仅仅是为了让你更好理解，有很多地方无法做到与Direct2D一致。</Box>
        <Box>最好的做法是自己写代码，经过测试再使用。</Box>
      </Box>
    </Box>
  )
}
