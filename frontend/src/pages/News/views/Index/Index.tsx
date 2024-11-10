import { Flex, Skeleton, Text } from "@chakra-ui/react"
import { NewInt } from "../../../../interfaces/NewInt"
import { useEffect, useState } from "react"
import { StatusEnum } from "../../../../shared/utils/types/StatusTypes"
import { getNews } from "../../../../shared/middlewares/new.middleware"
import { CardNews } from "../../components/CardNews"

export const NewsIndex = () => {
    const [news, setNews] = useState<NewInt[]>()
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.IDLE)

    useEffect(() => {
        if (status === StatusEnum.IDLE) {
            setStatus(StatusEnum.LOADING)

            getNews()
                .then((response) => {
                    setNews(response?.data?.data)
                    setStatus(StatusEnum.SUCCESS)
                })
                .catch((e) => {
                    console.error(e)
                    setStatus(StatusEnum.ERROR)
                })
        }
    }, [status])

    return (
        <Flex
            direction="column"
            py="100px"
            px="150px"
            gap="80px"
        >
            {status === StatusEnum.SUCCESS ?
                news?.map((n: NewInt) => (
                    <CardNews
                        {...n}
                        refreshData={() => setStatus(StatusEnum.IDLE)}
                    />
                ))
                : status === StatusEnum.ERROR ?
                    <Text
                        textAlign="center"
                        fontSize="24px"
                        fontWeight="700"
                    >
                        No se pudiron cargar las noticias
                    </Text>
                    :
                    Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            h="516px"
                            w="100%"
                        />
                    ))
            }

        </Flex >
    )
}