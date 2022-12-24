const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const dataContainer = document.querySelector('#data-container')

function toggleLoader() {
  const loaderHTML = document.querySelector('#loader')
  const isHidden = loaderHTML.hasAttribute('hidden')
  if (isHidden) {
    loaderHTML.removeAttribute('hidden')
  } else {
    loaderHTML.setAttribute('hidden', '')
  }
}

function getAllUsers() {
  toggleLoader()
  const users = fetch(USERS_URL)

  users
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка запроса!')
      }
      return response.json()
    })
    .then((result) => {
      result.forEach((user) => {
        const userHTML = createUserElement(user.name)
        dataContainer.append(userHTML)
      })
    })
    .catch(console.error())
    .finally(() => {
      toggleLoader()
    })
}

function createUserElement(text) {
  const userElement = document.createElement('li')
  const userElementAnchor = document.createElement('a')
  userElementAnchor.href = '#'
  userElementAnchor.textContent = text
  userElement.append(userElementAnchor)

  return userElementAnchor
}

getAllUsers()
