export const useFetch = async (url, params) => {
    try {
        const response = await fetch(url, params)
        return await response.json()
    } catch (e) {
        return e
    }
}