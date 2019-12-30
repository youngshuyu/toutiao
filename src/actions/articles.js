import { API_CHANNELS, API_ARTICLES } from '../constant/api'
import request from '../utils/request'
export function getChannels () {
  return request({
    url: API_CHANNELS
  })
}
export function getArticles (params) {
  return request({
    url: API_ARTICLES,
    params
  })
}
