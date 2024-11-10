import _axios from "../services/http.service";
import { EndpointTypes } from "../utils/types/EndpointTypes";

// SortBy por defecto createdAt y Order por defecto desc
export const getNews = async (
    querys?: {
        archives?: boolean,
        sortBy?: "createdAt" | "archiveDate",
        order?: "asc" | "desc",
    }
) => {
    let parseQuerys: string = ""

    if (querys)
        Object.entries(querys || {})?.map(([key, value], index) => index === 0
            ? parseQuerys = `?${key}=${value}`
            : parseQuerys = `${parseQuerys}&${key}=${value}`
        )

    return _axios.get(
        EndpointTypes.NEWS + parseQuerys,
    )
        .then((response) => response)
        .catch((error) => error)
}

export const createNew = async (
    data: {
        title: string;
        description: string;
        category: string;
        content: string;
        image: File
    }
) => {
    const formData = new FormData()

    formData.append('title', data?.title)
    formData.append('description', data?.description)
    formData.append('category', data?.category)
    formData.append('content', data?.content)
    formData.append('image', data?.image)

    return _axios.post(
        EndpointTypes.NEWS,
        formData
    )
        .then((response) => response)
        .catch((error) => error)
}

export const archivedNew = async (id: string) =>
    _axios.put(
        EndpointTypes.NEWS + "/" + id, { archived: true }
    )
        .then((response) => response)
        .catch((error) => error)

export const deleteNew = async (id: string) =>
    _axios.delete(
        EndpointTypes.NEWS + "/" + id
    )
        .then((response) => response)
        .catch((error) => error)