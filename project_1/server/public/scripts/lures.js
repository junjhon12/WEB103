const renderLures = async () => {
  const response = await fetch('/lures')
  const data = await response.json()
  const mainContent = document.getElementById('main-content')

  if (data && data.length > 0) {
    data.forEach(lure => {
      // Card wrapper
      const card = document.createElement('div')
      card.classList.add('card')

      // Top container (image)
      const topContainer = document.createElement('div')
      topContainer.classList.add('top-container')
      topContainer.style.backgroundImage = `url(${lure.imageUrl})`

      // Bottom container (text info)
      const bottomContainer = document.createElement('div')
      bottomContainer.classList.add('bottom-container')

      const name = document.createElement('h3')
      name.textContent = lure.name
      bottomContainer.appendChild(name)

      const brandName = document.createElement('h4')
      brandName.textContent = lure.brand
      bottomContainer.appendChild(brandName)

      const category = document.createElement('h5')
      category.textContent = lure.category
      bottomContainer.appendChild(category)

      const type = document.createElement('h5')
      type.textContent = lure.type
      bottomContainer.appendChild(type)

      const color = document.createElement('h5')
      color.textContent = `Color: ${lure.color}`
      bottomContainer.appendChild(color)

      const size = document.createElement('h5')
      size.textContent = `Size: ${lure.size}`
      bottomContainer.appendChild(size)

      const weight = document.createElement('h5')
      weight.textContent = `Weight: ${lure.weight}`
      bottomContainer.appendChild(weight)

      const divingDepth = document.createElement('h5')
      divingDepth.textContent = `Depth: ${lure.divingDepth}`
      bottomContainer.appendChild(divingDepth)

      const targetSpecies = document.createElement('h5')
      targetSpecies.textContent = `Targets: ${lure.targetSpecies.join(', ')}`
      bottomContainer.appendChild(targetSpecies)

      const price = document.createElement('h5')
      price.textContent = `$${lure.price.toFixed(2)}`
      bottomContainer.appendChild(price)

      const rating = document.createElement('h5')
      rating.textContent = `⭐ ${lure.rating} (${lure.reviews} reviews)`
      bottomContainer.appendChild(rating)

      const stock = document.createElement('h5')
      stock.textContent = lure.inStock
        ? `In Stock (${lure.stockCount})`
        : 'Out of Stock'
      bottomContainer.appendChild(stock)

      // Assemble the card
      card.appendChild(topContainer)
      card.appendChild(bottomContainer)

      // Click → go to detail page
      card.addEventListener('click', () => {
        window.location = `/lures/${lure.id}`
      })

      mainContent.appendChild(card)
    })
  } else {
    const message = document.createElement('h2')
    message.textContent = 'No Lures Available 😞'
    mainContent.appendChild(message)
  }

}

renderLures()