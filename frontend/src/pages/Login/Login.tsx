import { Button, Flex, Input, Spinner, Text } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useUserContext } from "../../shared/context/user.context";
import { getTokenAuth } from "../../shared/middlewares/auth.middleware";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginInt {
    email: string;
    password: string;
}

interface InputInt {
    name: string;
    label: string;
    type: "text" | "number" | "password" | "email";
}

export const Login = () => {
    const { login } = useUserContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const inputs: InputInt[] = [
        { name: "email", label: "Correo electronico", type: "email" },
        { name: "password", label: "Contraseña", type: "password" }
    ]

    const initialValues: LoginInt = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("El email debe ser válido")
            .required("Debe ingresar un email válido"),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("Debe ingresar una contraseña")
    })

    const handleLogin = async (values: LoginInt) => {
        setLoading(true)

        getTokenAuth(values)
            .then((response) => login(response?.data?.token, response?.data?.user, navigate))
            .catch((e) => {
                console.error(e)
                if (e?.response?.data?.message) toast.error(e?.response?.data?.message)
            })
            .finally(() => setLoading(false))
    }

    return (
        <Flex
            w="100%"
            mt="200px"
            justifyContent="center"
            alignItems="center"
        >
            <Flex
                rounded="4px"
                bg="white"
                boxShadow="0px 8px 16px 0px rgba(33, 30, 30, 0.09)"
                direction="column"
                gap="50px"
                px="100px"
                py="40px"
                justifyContent="center"
                alignItems="center"
            >
                <Text
                    color="black"
                    fontSize="32px"
                    fontWeight="700"
                >
                    Ingresar como Autor
                </Text>

                <Formik
                    onSubmit={handleLogin}
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
                            >
                                <Flex
                                    direction="column"
                                    gap="20px"
                                >
                                    {inputs?.map(({ name, label, type }: InputInt, index: number) => (
                                        <Flex
                                            key={index}
                                            direction="column"
                                            minW="540px"
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