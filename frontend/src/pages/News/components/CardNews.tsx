import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { UserInt } from "../../../interfaces/UserInt";
import { BiChevronRight, BiTrash } from "react-icons/bi";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { archivedNew, deleteNew } from "../../../shared/middlewares/new.middleware";
import toast from "react-hot-toast";
import { useUserContext } from "../../../shared/context/user.context";
import { useState } from "react";

interface Props {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    content: string;
    author: UserInt;
    archiveDate: Date;
    createdAt: Date;
    refreshData: () => void;
}

export const CardNews = ({
    _id,
    title,
    description,
    category,
    content,
    image,
    author,
    archiveDate,
    createdAt,
    refreshData
}: Props) => {
    const { user } = useUserContext();
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    const handleArchived = async (id: string) => {
        archivedNew(id)
            .then(() => {
                refreshData()
                toast.success('Post archivado correctamente')
            })
            .catch(() => toast.error('Error al archivar el post'))
    }

    const handleDelete = async (id: string) => {
        deleteNew(id)
            .then(() => {
                refreshData()
                toast.success('Post borrado correctamente')
            })
            .catch(() => toast.error('Error al borrar el post'))
    }

    return (
        <Flex
            direction="column"
            border="1px solid"
            borderColor="black"
        >
            <Image
                src={image}
                w="100%"
                h="300px"
                objectFit="cover"
            />

            <Flex
                direction="column"
                px="25px"
                py="25px"
            >
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text
                        fontSize="24px"
                        fontWeight="700"
                    >
                        {title}
                    </Text>

                    <Text
                        fontSize="14px"
                        fontWeight="600"
                        bg="#F4F4F4"
                        px="8px"
                        py="4px"
                    >
                        {author?.name} {author?.lastname}
                    </Text>
                </Flex>

                <Text
                    textTransform="uppercase"
                    color="#8B8B8B"
                    fontSize="16px"
                    fontWeight="400"
                >
                    {category}
                </Text>

                <Text
                    mt="15px"
                    fontSize="16px"
                    fontWeight="400"
                >
                    {description}
                </Text>

                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt="25px"
                >
                    {!archiveDate ?
                        <Button
                            h="fit-content"
                            w="fit-content"
                            px="10px"
                            py="10px"
                            fontSize="16px"
                            fontWeight="400"
                            rounded="0px"
                            color="black"
                            bg="white"
                            border="1px solid"
                            borderColor="black"
                            onClick={() => handleArchived(_id)}
                        >
                            Archivar

                            <BiChevronRight />
                        </Button>
                        :
                        <Flex
                            alignItems="center"
                            gap="20px"
                        >
                            <Box
                                position="relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <Button
                                    h="fit-content"
                                    w="fit-content"
                                    px="10px"
                                    py="5px"
                                    fontSize="16px"
                                    fontWeight="400"
                                    color="black"
                                    bg="white"
                                    border="1px solid"
                                    borderColor="black"
                                    disabled={!user?.auth || author?._id !== user?._id}
                                    onClick={() => handleDelete(_id)}
                                >
                                    <BiTrash />
                                </Button>

                                <Text
                                    display={(showTooltip && (!user.auth || author?._id !== user?._id)) ? "block" : "none"}
                                    position="absolute"
                                    w="fit-content"
                                    whiteSpace="nowrap"
                                    bottom={"40px"}
                                    left="0"
                                    bg="black"
                                    color="white"
                                    rounded="4px"
                                    px={"10px"}
                                    py="5px"
                                    textAlign="center"
                                    transition="all ease 0.3s"
                                >
                                    {!user.auth
                                        ? "Primero debes iniciar sesión como Autor"
                                        : "Debes ser el autor de la noticia para poder eliminarla"
                                    }
                                </Text>
                            </Box>

                            <Text
                                px="10px"
                                py="5px"
                                fontSize="16px"
                                fontWeight="400"
                                bg="green.500"
                                color="white"
                            >
                                Archivada
                            </Text>
                        </Flex>
                    }

                    <Flex
                        direction="column"
                    >
                        <Text
                            fontSize="14px"
                            fontWeight="400"
                        >
                            {archiveDate ? "Archivado:" : "Creada:"}
                        </Text>

                        <Text
                            fontSize="14px"
                            fontWeight="600"
                        >
                            {format(archiveDate ? archiveDate : createdAt, "dd 'de' MMMM", { locale: es })}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}