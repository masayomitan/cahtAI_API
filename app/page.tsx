'use client'
import { useState } from "react"
import { Heading, Text, Box, Flex, Button, Textarea } from "@chakra-ui/react"
import { POSTAPI } from "./api/chat"
export default function Home() {
  const [prompt, setPrompt] = useState<String>("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value)
  }

  const handleSubmitPromptBtnClicked = () => {
    setIsLoading(true)
    POSTAPI(prompt)
      .then((res) => res.text())
      .then((text) => {
        setResult(text)
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
        setTimeout(function() {
          setIsLoading(false)
        }, 3000)
      })
  }

  const handleClearBtnClicked = () => {
    setPrompt("")
    setResult("")
  }

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
      bgGradient="linear(to-b, #005C97, #0083B0)"
    >
      <Box maxW="2xl" m="0 auto" p="20px">
        <Heading
          as="h1"
          textAlign="center"
          fontSize="5xl"
          mt="100px"
          bgGradient="linear(to-l, #C9FFBF, #FFAFBD)"
          bgClip="text"
        >
          Practise Next.js 13 & ChatGPT API
        </Heading>
        <Textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Insert your prompt here ..."
          mt="30px"
          size="lg"
        />
        <Button
          isLoading={isLoading}
          loadingText="Loading..."
          colorScheme="teal"
          size="lg"
          mt="30px"
          onClick={handleSubmitPromptBtnClicked}
        >
          Submit Prompt
        </Button>
        <Button
          colorScheme="teal"
          size="lg"
          mt="30px"
          ml="20px"
          onClick={handleClearBtnClicked}
        >
          Clear
        </Button>
        {result != "" && (
          <Box maxW="2xl" m="0 auto">
            <Heading as="h5" textAlign="left" fontSize="lg" mt="40px">
              Result:
            </Heading>
            <Text fontSize="lg" textAlign="left" mt="20px">
              {result}
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  )
}