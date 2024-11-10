import { Button, Flex, Link } from "@chakra-ui/react"
import { Link as LinkRouter, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from "../../context/user.context"

export const Navbar = () => {
    const { user, logout } = useUserContext()
    const location = useLocation()
    const navigate = useNavigate()

    const links = [
        { label: "Nuevas", path: "/" },
        { label: "Archivadas", path: "/archived" },
        { label: "Publicar", path: "/create" }
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
            <Flex w="30%" />

            <Flex
                flex="1"
                gap="40px"
            >
                {links?.map(({ label, path }, index: number) => (
                    <Link
                        key={index}
                        asChild
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
                onClick={() => !user?.auth ? navigate('/login') : logout(navigate)}
            >
                {!user?.auth ? "Iniciar sesión" : "Cerrar sesión"}
            </Button>
        </Flex>
    )
}