import { Flex, Skeleton, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { NewInt } from "../../../../interfaces/NewInt"
import { StatusEnum } from "../../../../shared/utils/types/StatusTypes"
import { getNews } from "../../../../shared/middlewares/new.middleware"
import { CardNews } from "../../components/CardNews"

export const NewsArchived = () => {
    const [news, setNews] = useState<NewInt[]>()
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.IDLE)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    useEffect(() => {
        if (status === StatusEnum.IDLE) {
            setStatus(StatusEnum.LOADING)

            getNews({
                archives: true,
                sortBy: "archiveDate",
                order: sortOrder
            })
                .then((response) => {
                    setNews(response?.data?.data)
                    setStatus(StatusEnum.SUCCESS)
                })
                .catch((e) => {
                    console.error(e)
                    setStatus(StatusEnum.ERROR)
                })
        }
    }, [status, sortOrder])

    return (
        <Flex
            direction="column"
            py="100px"
            px="150px"
            gap="20px"
        >
            <Flex
                w="100%"
                justifyContent="end"
            >
                <select
                    value={sortOrder}
                    onChange={(e) => {
                        setStatus(StatusEnum.IDLE)
                        setSortOrder(e.target.value as 'asc' | 'desc')
                    }}
                    style={{
                        padding: '10px',
                        width: '200px',
                        borderRadius: "4px",
                        background: "transparent",
                        border: "1px solid",
                        borderColor: "#202020"
                    }}
                >
                    <option value="desc">Más recientes primero</option>
                    <option value="asc">Más antiguas primero</option>
                </select>
            </Flex>

            <Flex
                direction="column"
                gap="80px"
            >
                {status === StatusEnum.SUCCESS ?
                    news?.map((n: NewInt, index: number) => (
                        <CardNews
                            key={index}
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
                                key={index}
                                h="516px"
                                w="100%"
                            />
                        ))
                }
            </Flex>
        </Flex >
    )
}