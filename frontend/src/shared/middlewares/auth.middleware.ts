import _axios from "../services/http.service"
import { EndpointTypes } from "../utils/types/EndpointTypes"

export const getTokenAuth = async (
    data: {
        email: string;
        password: string;
    }
) => _axios.post(
    EndpointTypes.LOGIN,
    data
)
    .then((response) => response)