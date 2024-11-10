import { Button, Flex, Input, Spinner, Text, Textarea } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { NewInt } from "../../../../interfaces/NewInt";
import { useEffect, useState } from "react";
import { BiCheck, BiUpload } from "react-icons/bi";
import { createNew } from "../../../../shared/middlewares/new.middleware";

interface InputInt {
    name: string;
    label: string;
    type: "text" | "number" | "password" | "email";
}

export const CreateNew = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [file, setFile] = useState<{ load: boolean; image: File | null; error: string | null }>({
        load: false,
        image: null,
        error: null
    })

    const inputs: InputInt[] = [
        { name: "title", label: "Titulo", type: "text" },
        { name: "category", label: "Categoria", type: "text" }
    ]

    const textareas: Partial<InputInt>[] = [
        { name: "description", label: "Descripcion" },
        { name: "content", label: "Contenido" }
    ]

    const initialValues: Partial<NewInt> = {
        title: "",
        description: "",
        category: "",
        content: "",
        image: "",
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("El título es obligatorio")
            .max(20, "El título debe tener menos de 20 caracteres"),
        category: Yup.string()
            .required("La categoría es obligatoria")
            .max(20, "La categoría debe tener menos de 20 caracteres"),
        description: Yup.string()
            .required("La descripción es obligatoria")
            .max(150, "La descripción debe tener menos de 150 caracteres"),
        content: Yup.string()
            .required("El contenido es obligatorio")
            .max(700, "El contenido debe tener menos de 700 caracteres")
    })

    const handleCreateNew = async (values: Partial<NewInt>) => {
        if (!file?.load || !file?.image) return setFile({ load: false, image: null, error: "La imagen es obligatoria" })
        setLoading(true)

        createNew({
            title: values.title!,
            description: values.description!,
            category: values.category!,
            content: values.content!,
            image: file?.image
        })
            .then(() => {
                toast.success("Publicación creada con éxito")
                navigate("/")
            })
            .catch((e) => {
                console.error(e)
                toast.error("Error al crear la publicación.")
            })
            .finally(() => setLoading(false))
    }

    return (
        <Flex
            w="100%"
            py="100px"
            px="150px"
            justifyContent="center"
            alignItems="center"
        >
            <Flex
                direction="column"
                gap="50px"
                w="100%"
                justifyContent="center"
                alignItems="center"
            >
                <Text
                    color="black"
                    fontSize="32px"
                    fontWeight="700"
                >
                    Crear una nueva publicación
                </Text>

                <Formik
                    onSubmit={handleCreateNew}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {(formik) => {
                        const {
                            handleSubmit,
                            values,
                            setFieldValue,
                            touched,
                            errors
                        } = formik;

                        return (
                            <Form
                                onSubmit={handleSubmit}
                                style={{
                                    width: "100%"
                                }}
                            >
                                <Flex
                                    direction="column"
                                    gap="20px"
                                >
                                    {inputs?.map(({ name, label, type }: InputInt, index: number) => (
                                        <Flex
                                            key={index}
                                            direction="column"
                                        >
                                            <Text
                                                color={"#848588"}
                                                fontSize="12px"
                                                fontWeight="500"
                                                mb="10px"
                                            >
                                                {label}
                                            </Text>

                                            <Input
                                                name={name}
                                                type={type}
                                                value={(values as any)[name]}
                                                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => setFieldValue(target.name, target.value)}
                                            />

                                            <Text
                                                opacity={((errors as any)[name] && (touched as any)[name]) ? 1 : 0}
                                                mt="5px"
                                                color="red.500"
                                                fontSize="10px"
                                                fontWeight="500"
                                            >
                                                *{(errors as any)[name]}
                                            </Text>
                                        </Flex>
                                    ))}

                                    {textareas?.map(({ name, label }: Partial<InputInt>, index: number) => (
                                        <Flex
                                            key={index}
                                            direction="column"
                                        >
                                            <Text
                                                color={"#848588"}
                                                fontSize="12px"
                                                fontWeight="500"
                                                mb="10px"
                                            >
                                                {label}
                                            </Text>

                                            <Textarea
                                                size="xl"
                                                name={name}
                                                value={(values as any)[name!]}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue(e.target.name, e.target.value)}
                                            />

                                            <Text
                                                opacity={((errors as any)[name!] && (touched as any)[name!]) ? 1 : 0}
                                                mt="5px"
                                                color="red.500"
                                                fontSize="10px"
                                                fontWeight="500"
                                            >
                                                *{(errors as any)[name!]}
                                            </Text>
                                        </Flex>
                                    ))}

                                    <Flex
                                        direction="column"
                                    >
                                        <Text
                                            color={"#848588"}
                                            fontSize="12px"
                                            fontWeight="500"
                                            mb="10px"
                                        >
                                            Imagen de portada
                                        </Text>

                                        <Flex
                                            border="1px solid"
                                            borderColor="#E4E4E7"
                                            rounded="4px"
                                            direction="column"
                                            position="relative"
                                        >
                                            <Flex
                                                position="absolute"
                                                left="0"
                                                right="0"
                                                top="0"
                                                bottom="0"
                                                justifyContent="center"
                                                alignItems="center"
                                                direction="column"
                                                zIndex="-1"
                                            >
                                                {
                                                    file.load
                                                        ? <BiCheck size={22} />
                                                        : <BiUpload size={22} />
                                                }

                                                <Text
                                                    fontSize="14px"
                                                    fontWeight="500"
                                                >
                                                    {file?.load ? file?.image?.name : "Presione aquí para cargar su imagen"}
                                                </Text>

                                                <Text
                                                    display={file?.image?.size ? "block" : "none"}
                                                    fontSize="14px"
                                                    fontWeight="500"
                                                >
                                                    {file?.image?.size && (file?.image?.size / (1024 * 1024)).toFixed(2)} MB
                                                </Text>
                                            </Flex>

                                            <Input
                                                cursor="pointer"
                                                h="100px"
                                                w="100%"
                                                position="relative"
                                                zIndex="99"
                                                opacity="0"
                                                name={"imagen"}
                                                type={"file"}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const files = e.target.files;

                                                    if (files && files.length > 0) {
                                                        if (files[0]?.size > 19999999) setFile({ load: false, image: null, error: "La imagen debe ser inferior a 20MB" })
                                                        else if (!["image/png", "image/jpg", "image/jpeg"].includes(files[0]?.type)) setFile({ load: false, image: null, error: "El formato debe ser png, jpg o jpeg" })
                                                        else
                                                            setFile({
                                                                load: true,
                                                                image: files[0],
                                                                error: null
                                                            });
                                                    }
                                                }}
                                            />
                                        </Flex>

                                        <Text
                                            opacity={file?.error ? 1 : 0}
                                            mt="5px"
                                            color="red.500"
                                            fontSize="10px"
                                            fontWeight="500"
                                        >
                                            *{file.error}
                                        </Text>
                                    </Flex>

                                    <Button
                                        mt="10px"
                                        bg="white"
                                        color="black"
                                        border="1px solid"
                                        borderColor="black"
                                        fontSize="16px"
                                        fontWeight="400"
                                        h="fit-content"
                                        w="100%"
                                        px="20px"
                                        py="10px"
                                        _hover={{
                                            bg: "#E6E6E6"
                                        }}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {!loading ? "Continuar" : <Spinner size="md" />}
                                    </Button>
                                </Flex>
                            </Form>
                        )
                    }}
                </Formik>
            </Flex>
        </Flex>
    )
}