const renderLures = async () => {
  try {
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

        // Bottom container
        const bottomContainer = document.createElement('div')
        bottomContainer.classList.add('bottom-container')

        const name = document.createElement('h3')
        name.textContent = lure.name
        bottomContainer.appendChild(name)

        const brandName = document.createElement('h4')
        brandName.textContent = lure.brand
        bottomContainer.appendChild(brandName)

        // Specs badges (Category, Type, Color, Size, Weight, Depth)
        const specs = document.createElement('div')
        specs.classList.add('specs')

        const specItems = [
          lure.category,
          lure.type,
          lure.color,
          lure.size,
          lure.weight,
          lure.divingDepth
        ]

        specItems.forEach(item => {
          if (item) {
            const span = document.createElement('span')
            span.textContent = item
            specs.appendChild(span)
          }
        })
        bottomContainer.appendChild(specs)

        // Footer (Price, Rating, Stock)
        const footer = document.createElement('div')
        footer.classList.add('footer')

        const price = document.createElement('span')
        price.classList.add('price')
        price.textContent = `$${lure.price.toFixed(2)}`
        footer.appendChild(price)

        const rating = document.createElement('span')
        rating.classList.add('rating')
        rating.textContent = `⭐ ${lure.rating}`
        footer.appendChild(rating)

        const stock = document.createElement('span')
        stock.classList.add('stock', lure.inStock ? 'in' : 'out')
        stock.textContent = lure.inStock ? 'In Stock' : 'Out of Stock'
        footer.appendChild(stock)

        bottomContainer.appendChild(footer)

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
  } catch (error) {
    console.error('Error fetching lures:', error)
  }
}

renderLures()