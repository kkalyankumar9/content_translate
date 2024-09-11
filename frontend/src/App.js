import logo from './logo.svg';
import './App.css';
import Translate from './Component/translate';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Box minHeight="100vh" bgColor={"#e6f7ff"}>
     <Translate/>
     </Box>
    </div>
  );
}

export default App;
