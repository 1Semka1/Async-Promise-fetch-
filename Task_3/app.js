const USERS_URL = 'https://jsonplaceholder.typicode.com/photos'

const Ids = [4, 2, 42, 4242]

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

function createImageElement(url, text) {
  const photoElement = document.createElement('li')
  photoElement.className = 'photo-item'
  const photoElementImage = document.createElement('img')
  photoElementImage.className = 'photo-item__image'
  photoElementImage.src = url
  const titlePhoto = document.createElement('h3')
  titlePhoto.textContent = text
  photoElement.append(photoElementImage)
  photoElement.append(titlePhoto)

  return photoElement
}

function getFastestLoadedPhoto(Ids) {
  toggleLoader()
  const requests = Ids.map((id) => fetch(`${USERS_URL}/${id}`))
  console.log(requests)
  Promise.all(requests)
    .then((responses) => {
      console.log(responses)
      const results = responses.map((response) => response.json())
      return Promise.race(results)
    })
    .then((image) => {
      console.log(image)
      const imageHTML = createImageElement(image.url, image.title)
      dataContainer.append(imageHTML)
    })
    .catch(console.log)
    .finally(() => {
      toggleLoader()
    })
}

getFastestLoadedPhoto(Ids)
