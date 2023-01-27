import { Button, FormControl, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Form from "./components/Form/Form";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <VStack minH="100vh" justifyContent="center">
      {showForm?
          <Form/>
        :
            <Button
            onClick={() => setShowForm(true)}
            size="lg"
            colorScheme="teal"
            variant="solid"
            textTransform="uppercase"
          >
            donate and claim NFT
          </Button>

      }

    </VStack>
  );
};

export default App;
