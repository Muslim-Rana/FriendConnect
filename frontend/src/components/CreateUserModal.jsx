import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import {BiAddToQueue} from "react-icons/bi";
import {useState} from "react";
import { BASE_URL } from "../App";

const CreateUserModal = ({setUsers}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name:"",
        role:"",
        description:"",
    })
    const toast = useToast()

    const handleCreateUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(inputs)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error)
            }

            toast({
                status:"success",
                title:"Yay",
                description:"Friend created successfully",
                duration:2000,
                position:"top-center",
            })

            onClose()
            setUsers((prevUsers) => [...prevUsers, data])

        } catch (error) {
            toast({
                status:"error",
                title:"an error occurred",
                description:error.message,
                duration:4000,
            })
        } finally {
            setIsLoading(false)
            setInputs({
                name:"",
                role:"",
                description:"",
            })
        }

    }


    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button>

        <Modal
        isOpen={isOpen}
        onClose={onClose}>

            <ModalOverlay/>
            <form onSubmit={handleCreateUser}>
            <ModalContent>
                <ModalHeader>My New Friend</ModalHeader>
                <ModalCloseButton/>

                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            {/* left */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder="John Doe"
                                    value={inputs.name}
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                />
                            </FormControl>

                            {/*right*/}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="SWE"
                                    value={inputs.role}
                                    onChange={(e) => setInputs({...inputs, role:e.target.value})}
                                />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                            resize={"none"}
                            overflow={"hidden"}
                            placeholder="he's a SWE who loves to code"
                            value={inputs.description}
                            onChange={(e) => setInputs({...inputs, description: e.target.value})}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type='submit'>
                            Add
                        </Button>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
            </ModalContent>
            </form>

        </Modal>

    </>
    
}
export default CreateUserModal