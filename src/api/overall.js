import axios from '../http';
//注册
let loginUser = params => {
    return axios.post('/user/signin', params)
}

let signUp = params => {
    return axios.post('/user/signup', params)
}

let logout = params => {
    return axios.post('/user/signout')
}

//overall
let getListByrevNum = params => {
    return axios.get('/overall/revisenumrank')
}

let getListByuserNum = params => {
    return axios.get('/overall/reviseuserank')
}

let getListByhistory = params => {
    return axios.get('/overall/historyrank')
}

let getOverallStatistic = params => {
    return axios.get('/overall/statistic')
}

//article
let getSelectArticle = params => {
    return axios.get('/indiv/select', { params: params })
}
let getArticleRevnum = params => {
    return axios.get('/indiv/article/' + params.name)
}
let getTopfiveEditor = params => {
    return axios.get('/indiv/topfive/' + params.name)
}

let getIndivStatistic = params => {
    return axios.get('/indiv/statistic/' + params.name)
}

let getTopfiveStatistic = params => {
    return axios.get('/indiv/topfivestatistic',  { params: params } )
}


//author
let getSelectAuthor = params => {
    return axios.get('/author/select', { params: params })
}
let getRevisonByauthor = params => {
    return axios.get('/author/revisions/' + params.name)
}

export default {
    loginUser,
    logout,
    signUp,

    getListByrevNum,
    getListByuserNum,
    getListByhistory,
    getOverallStatistic,

    getSelectArticle,
    getArticleRevnum,
    getTopfiveEditor,
    getIndivStatistic,
    getTopfiveStatistic,

    getSelectAuthor,
    getRevisonByauthor,
}