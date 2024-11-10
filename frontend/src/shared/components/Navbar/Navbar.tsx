import { Button, Flex, Link } from "@chakra-ui/react"
import { Link as LinkRouter, useLocation } from 'react-router-dom'

export const Navbar = () => {
    const location = useLocation()

    const links = [
        { label: "New", path: "/" },
        { label: "Arhived", path: "/archived" }
    ]

    return (
        <Flex
            w="100%"
            px="60px"
            py="15px"
            justifyContent="space-between"
            alignItems="center"
            gap="100px"
        >
            <Flex flex="1" />

            <Flex
                flex="1"
                gap="40px"
            >
                {links?.map(({ label, path }) => (
                    <Link asChild
                        fontSize="16px"
                        fontWeight="400"
                        textDecoration="none"
                        _focus={{
                            outline: "none"
                        }}
                        _hover={{
                            borderBottom: "1px solid"
                        }}
                        borderBottom={location?.pathname === path ? "1px solid" : "none"}
                        color="black"
                        px="5px"
                        rounded="0"
                        py="10px"
                    >
                        <LinkRouter
                            to={path}
                        >
                            {label}
                        </LinkRouter>
                    </Link>
                ))}
            </Flex>

            <Button
                bg="white"
                color="black"
                border="1px solid"
                borderColor="black"
                fontSize="16px"
                fontWeight="400"
                h="fit-content"
                w="fit-content"
                px="20px"
                py="10px"
                _hover={{
                    bg: "#E6E6E6"
                }}
            >
                Post
            </Button>
        </Flex>
    )
}