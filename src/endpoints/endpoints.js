//\src\endpoints\endpoints.js
export const API_BASE_URL = 'https://cherrywintkyaw.pythonanywhere.com/api';
export const IMAGE_BASE_URL = 'https://cherrywintkyaw.pythonanywhere.com';

export const ENDPOINTS = {
    // Auth & Users
    REGISTER: `${API_BASE_URL}/register/`,
    LOGIN: `${API_BASE_URL}/login/`,
    TOKEN_REFRESH: `${API_BASE_URL}/token/refresh/`,
    USERS_LIST: `${API_BASE_URL}/users_list/`,
    USERS_DETAIL: (id) => `${API_BASE_URL}/users_detail/${id}/`,
    USERS_UPDATE: (id) => `${API_BASE_URL}/users_update/${id}/`,
    USERS_DELETE: (id) => `${API_BASE_URL}/users_delete/${id}/`,
    USERS_DELETE_ALL: `${API_BASE_URL}/users_delete_all/`,

    // Banners
    BANNER_LIST: `${API_BASE_URL}/banner_list/`,
    BANNER_CREATE: `${API_BASE_URL}/banner_create/`,
    BANNER_DETAIL: (id) => `${API_BASE_URL}/banner_detail/${id}/`,
    BANNER_UPDATE: (id) => `${API_BASE_URL}/banner_update/${id}/`,
    BANNER_DELETE: (id) => `${API_BASE_URL}/banner_delete/${id}/`,
    BANNER_DELETE_ALL: `${API_BASE_URL}/banner_delete_all/`,

    // Movies
    MOVIE_LIST: `${API_BASE_URL}/movie_list/`,
    MOVIE_CREATE: `${API_BASE_URL}/movie_create/`,
    MOVIE_DETAIL: (id) => `${API_BASE_URL}/movie_detail/${id}/`,
    MOVIE_UPDATE: (id) => `${API_BASE_URL}/movie_update/${id}/`,
    MOVIE_DELETE: (id) => `${API_BASE_URL}/movie_delete/${id}/`,
    MOVIE_DELETE_ALL: `${API_BASE_URL}/movie_delete_all/`,

    // Genres
    GENRE_LIST: `${API_BASE_URL}/genre_list/`,
    GENRE_CREATE: `${API_BASE_URL}/genre_create/`,
    GENRE_DETAIL: (id) => `${API_BASE_URL}/genre_detail/${id}/`,
    GENRE_UPDATE: (id) => `${API_BASE_URL}/genre_update/${id}/`,
    GENRE_DELETE: (id) => `${API_BASE_URL}/genre_delete/${id}/`,
    GENRE_DELETE_ALL: `${API_BASE_URL}/genre_delete_all/`,

    // Countries
    COUNTRY_LIST: `${API_BASE_URL}/country_list/`,
    COUNTRY_CREATE: `${API_BASE_URL}/country_create/`,
    COUNTRY_DETAIL: (id) => `${API_BASE_URL}/country_detail/${id}/`,
    COUNTRY_UPDATE: (id) => `${API_BASE_URL}/country_update/${id}/`,
    COUNTRY_DELETE: (id) => `${API_BASE_URL}/country_delete/${id}/`,
    COUNTRY_DELETE_ALL: `${API_BASE_URL}/country_delete_all/`,

    // Directors
    DIRECTOR_LIST: `${API_BASE_URL}/director_list/`,
    DIRECTOR_CREATE: `${API_BASE_URL}/director_create/`,
    DIRECTOR_DETAIL: (id) => `${API_BASE_URL}/director_detail/${id}/`,
    DIRECTOR_UPDATE: (id) => `${API_BASE_URL}/director_update/${id}/`,
    DIRECTOR_DELETE: (id) => `${API_BASE_URL}/director_delete/${id}/`,
    DIRECTOR_DELETE_ALL: `${API_BASE_URL}/director_delete_all/`,

    // Cast
    CAST_LIST: `${API_BASE_URL}/cast_list/`,
    CAST_CREATE: `${API_BASE_URL}/cast_create/`,
    CAST_DETAIL: (id) => `${API_BASE_URL}/cast_detail/${id}/`,
    CAST_UPDATE: (id) => `${API_BASE_URL}/cast_update/${id}/`,
    CAST_DELETE: (id) => `${API_BASE_URL}/cast_delete/${id}/`,
    CAST_DELETE_ALL: `${API_BASE_URL}/cast_delete_all/`,

    // Premieres
    PREMIERE_LIST: `${API_BASE_URL}/premiere_list/`,
    PREMIERE_CREATE: `${API_BASE_URL}/premiere_create/`,
    PREMIERE_DETAIL: (id) => `${API_BASE_URL}/premiere_detail/${id}/`,
    PREMIERE_UPDATE: (id) => `${API_BASE_URL}/premiere_update/${id}/`,
    PREMIERE_DELETE: (id) => `${API_BASE_URL}/premiere_delete/${id}/`,
    PREMIERE_DELETE_ALL: `${API_BASE_URL}/premiere_delete_all/`,

    // Ratings
    RATING_LIST: `${API_BASE_URL}/rating_list/`,
    RATING_CREATE: `${API_BASE_URL}/rating_create/`,
    RATING_DETAIL: (id) => `${API_BASE_URL}/rating_detail/${id}/`,
    RATING_UPDATE: (id) => `${API_BASE_URL}/rating_update/${id}/`,
    RATING_DELETE: (id) => `${API_BASE_URL}/rating_delete/${id}/`,
    RATING_DELETE_ALL: `${API_BASE_URL}/rating_delete_all/`,

    // Permissions & Groups
    PERMISSIONS: `${API_BASE_URL}/permissions/`,
    GROUPS_LIST: `${API_BASE_URL}/groups_list/`,
    GROUPS_CREATE: `${API_BASE_URL}/groups_create/`,
    GROUPS_DETAIL: (id) => `${API_BASE_URL}/groups_detail/${id}/`,
    GROUPS_UPDATE: (id) => `${API_BASE_URL}/groups_update/${id}/`,
    GROUPS_DELETE: (id) => `${API_BASE_URL}/groups_delete/${id}/`,
    GROUPS_DELETE_ALL: `${API_BASE_URL}/groups_delete_all/`,
};