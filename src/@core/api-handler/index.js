import axios from 'axios'
import toast from 'react-hot-toast'

export const checkLoginError = err => {
  if (err.response?.data?.chkLogin === false) {
    toast.error('Your token has expired, Kindly login again!')
    localStorage.clear()
    // setTimeout(() => {
    window.location.reload()
    // }, 500)
    return true
  } else {
    toast.error(
      typeof err?.response?.data?.message === 'string'
        ? err?.response?.data?.message
        : 'Something went wrong on our side'
    )
  }
}

export const debounce = func => {
  let timer
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, 1000)
  }
}

export const localStorageToken = () => {
  let storedToken
  if (typeof window !== 'undefined') {
    storedToken = localStorage.getItem('accessToken')
  }
  if (storedToken) {
    return storedToken
  } else {
    return null
  }
}

export function debouncing(func, wait, immediate) {
  var timeout

  return (...args) => {
    var context = this

    var later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    var callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

export const fetchProjectListData = async () => {
  try {
    // ** token from local storage
    const response = await axios.get(`${process.env.BASE_URL}/projects`, {
      headers: { Authorization: `Bearer ${localStorageToken()}` }
    })
    return response.data
  } catch (err) {
    checkLoginError(err)
  }
}

export const previewFile = file => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    let fileView = reader.result
    return fileView
  }
}


export async function handlePostAPI(url, data, msg) {
  try {
    const response = await axios.post(process.env.BASE_URL + url, data, {
      headers: { Authorization: `Bearer ${localStorageToken()}` }
    })
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message)
      }

      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}
export async function handlePostAPIWithoutHeader(url, data, msg) {
  try {
    const response = await axios.post(process.env.BASE_URL + url, data)
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message)
      }
      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}

export async function handlePutAPIWithoutHeader(url, data, msg) {
  try {
    const response = await axios.put(process.env.BASE_URL + url, data)
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message)
      }
      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}

export async function handlePutAPI(url, data, msg) {
  try {
    const response = await axios.put(process.env.BASE_URL + url, data, {
      headers: { Authorization: `Bearer ${localStorageToken()}` }
    })
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message)
      }
      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}

export async function handleGetAPI(url, msg) {
  try {
    const response = await axios.get(process.env.BASE_URL + url, {
      headers: { Authorization: `Bearer ${localStorageToken()}` }
    })
    if (response.data) {
      if (msg) {
        toast.success(msg || response.data.message)
      }
      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}
export async function handleDeleteAPI(url, msg) {
  try {
    const response = await axios.delete(process.env.BASE_URL + url, {
      headers: { Authorization: `Bearer ${localStorageToken()}` }
    })
    if (response.data) {
      if (msg) {
        toast.success(msg || response.data.message)
      }
      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}

export async function handleGetAPIHeaderLess(url, msg) {
  try {
    const response = await axios.get(process.env.BASE_URL + url)
    if (response.data) {
      if (msg) {
        toast.success(msg || response.data.message)
      }
      return response.data
    }
  } catch (e) {
    console.log(e)
    checkLoginError(e)
  }
}

export async function uploadImage(data) {
  if (Object.keys(data).length > 0) {
    let url = '/Master/gallery/add'
    let bodyData = new FormData()
    bodyData.append('imageUrl', data.image)
    let value = await handlePostAPI(url, bodyData, null)
    return value
  } else {
    return ''
  }
}

export async function uploadGLobalImage(data) {
  let url = '/Master/gallery/add'
  let bodyData = new FormData()
  bodyData.append('imageUrl', data)
  let value = await handlePostAPI(url, bodyData, null)
  return value?.baseUrl
}

export const getStates = async country => {
  const response = await handleGetAPI(`/list/states/${country}`)
  if (response) {
    return response.list
  }
}

export const downloadFile = async url => {
  const response = await fetch(url)
  const blob = await response.blob()
  const filename = getFilenameFromURL(url)
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const getFilenameFromURL = url => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export const handleKeyPress = event => {
  const keyCode = event.keyCode || event.which
  const keyValue = String.fromCharCode(keyCode)
  const isValidInput = /^[-]?[0-9]+([.,][0-9]{0,2})?$/.test(keyValue) || keyCode === 46 || keyCode === 8

  if (!isValidInput) {
    event.preventDefault()
  }
}


