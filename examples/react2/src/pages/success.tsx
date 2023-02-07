import { VStack, Card } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Success = () => {
  return (
    <VStack minH="100vh" justifyContent="center">
      <Card p={6} w={96}>
      <VStack minH="100%" justifyContent="center">
        <CheckIcon alignSelf="center" w={8} h={8} color="green.500" />
        <h2>Check your email</h2>
        </VStack>
      </Card>
    </VStack>
  );
};

export default Success;
