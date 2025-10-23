import axios from 'axios'

/** API 서버 기본 URL */
const API_BASE_URL = 'http://localhost:4000'

/**
 * Axios 클라이언트 인스턴스
 *
 * 모든 API 요청에 사용되는 공통 설정을 포함합니다.
 * - baseURL: API 서버 주소
 * - timeout: 요청 타임아웃 (10초)
 * - headers: 기본 헤더 (JSON 형식)
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})