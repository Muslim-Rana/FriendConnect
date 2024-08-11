import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Textarea, useDisclosure } from "@chakra-ui/react";
import {BiAddToQueue} from "react-icons/bi";

const CreateUserModal = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button>

        <Modal
        isOpen={isOpen}
        onClose={onClose}>

            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>My New Friend</ModalHeader>
                <ModalCloseButton/>

                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            {/* left */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder="John Doe"/>
                            </FormControl>

                            {/*right*/}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="SWE"/>
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                            resize={"none"}
                            overflow={"hidden"}
                            placeholder={"he's a SWE who loves to code"}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Add
                        </Button>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
            </ModalContent>

        </Modal>

    </>
    
}
export default CreateUserModal