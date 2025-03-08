import axios from "@/axios.js";

/**
 * 获取问题列表
 * @param page
 * @param size
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function questionList(page, size) {
    return axios.get(`/question/list/${page}/${size}`)
}

/**
 * 搜索问题
 * @param questionSearchRequest
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function questionSearch(questionSearchRequest) {
    return axios.post("/question/search", questionSearchRequest)
}

/**
 * 保存问题
 * @param QuestionRequest
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function questionSave(QuestionRequest) {
    return axios.post("/question/save", QuestionRequest)
}

/**
 * 点赞
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function questionTumb(id) {
    return axios.get("/question/id")
}