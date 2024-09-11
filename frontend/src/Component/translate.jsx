import { Box, Heading, Input, Text, Button, VStack, Spinner, Flex, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import { MdMic } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

const Translate = () => {
    
    const [text,setText]=useState("")
    const [convertLanguage,setConvertLanguage]=useState("")
    const [result,setResult]=useState("")
    const [loading,setLoading]=useState(false)
    const [recognizing, setRecognizing] = useState(false);

    const handleClickContentGen=async(e)=>{
        e.preventDefault()

        if(text!==""){
            setLoading(true)
            try {
        
                const response=await axios.post(`https://translate-vm1s.onrender.com/contentgen`,{text:text})
                setResult(response.data.contentGeneration)
                console.log(response.data.contentGeneration)
                setLoading(false)
        
        
                
            } catch (error) {
                console.log(error)
                
            }finally{
                setLoading(false)
            }

        }else{
            alert("Provide some Text")
            setLoading(false)
        }

   

    }
    const handleClickContentSummarize=async()=>{
        if(text!==""){
            setLoading(true)
            try {
        
                const response=await axios.post(`https://translate-vm1s.onrender.com/summary`,{text:text})
                setResult(response.data.summarize)
                console.log(response.data.summarize)
                setLoading(false)
                setText("")
        
                
            } catch (error) {
                console.log(error)
                setLoading(false)
                
            }finally{
                setLoading(false)
            }
        

        }else{
            alert("Provide some Text")
            setLoading(false)
        }
        
    }
    const handleClickContentTranslate=async()=>{
        if(text!==""&& convertLanguage!==""){
            setLoading(true)

            try {
        
                const response=await axios.post(`https://translate-vm1s.onrender.com/translate`,{text:text,language:convertLanguage})
                setResult(response.data.translate)
                console.log(response.data.translate)
                setConvertLanguage("")
                setText("")
                setLoading(false)
                
        
        
                
            } catch (error) {
                console.log(error)
                setLoading(false)
                
            }finally{
                setLoading(false)
            }
        

        }else{
            alert("Provide some Text")
            setLoading(false)

        }
    }
    const handleSpeechRecognition = () => {
        if (!recognizing) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.onresult = (event) => {
              const spokenText = event.results[0][0].transcript;
              setText(spokenText);
            };
      
            recognition.onend = () => {
              setRecognizing(false);
            };
      
            setRecognizing(true);
            recognition.start();
          }

      };

  return (
    <Box p={4}>
    <Heading p={2} color={"violet"} textAlign="center">
      Content Generation and Translator
    </Heading>
    <VStack
      bgColor={"white"}
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      w={["90%", "80%", "70%"]} // Responsive width for mobile, tablet, and PC
      m={"auto"}
      p={5}
      spacing={4}
    >
      <Text
        as="textarea"
        placeholder="Enter text"
        h="200px"
        w="100%"
        overflowY="auto"
        borderWidth="1px"
        p={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSpeechRecognition} w="15%" p={1}>
    <Icon as={MdMic} />
      </Button>
      <Input
        placeholder="Enter language"
        w="100%"
        value={convertLanguage}
        p={1}
        onChange={(e) => setConvertLanguage(e.target.value)}
      />
      <Button onClick={handleClickContentGen} w="100%">
        Generate
      </Button>
      <Flex w="100%" justify="space-between" p="5px">
        <Button onClick={handleClickContentSummarize} flex="1">
          Summarize
        </Button>
        <Button onClick={handleClickContentTranslate} flex="1" ml={2}>
          Translate
        </Button>
      </Flex>
    </VStack>
    <Box
      width={["90%", "80%", "70%"]} // Responsive width for mobile, tablet, and PC
      bgColor={"gray.50"}
      m={"auto"}
      mt={2}
      p={5}
    >

    
      {!loading ? (
        <Box p={5} mt={"10px"}>
        
     
          {result}
        </Box>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="md"
          mx="auto"
        />
      )}
      {!result ? <Text textAlign="center">Generated data coming here..</Text> : ""}
    </Box>
    <Button
isDisabled={!result}
right={2}
top={2}
size="sm"
colorScheme="blue"
leftIcon={<FaCopy />}
onClick={() => {
  navigator.clipboard.writeText(result);
}}
>
Copy Text
</Button>
    
  </Box>

  )
}

export default Translate