const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const userIds = [5, 6, 2, 1]

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

function createUserElement(text) {
  const userElement = document.createElement('li')
  const userElementAnchor = document.createElement('a')
  userElementAnchor.href = '#'
  userElementAnchor.textContent = text
  userElement.append(userElementAnchor)

  return userElementAnchor
}

function getUsersByids(usersIds) {
  toggleLoader()
  const requests = usersIds.map((user) => fetch(`${USERS_URL}/${user}`))
  Promise.all(requests)
    .then((responses) => {
      const results = responses.map((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса!')
        }
        return response.json()
      })
      console.log(results)
      return Promise.all(results)
    })
    .then((users) => {
      users.forEach((user) => {
        const userHTML = createUserElement(user.name)
        dataContainer.append(userHTML)
      })
    })
    .catch(console.error)
    .finally(() => {
      toggleLoader()
    })
}

getUsersByids(userIds)
