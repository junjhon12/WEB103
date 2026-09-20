const renderLureDetail = async () => {
  try {
    // Get the ID from the URL (e.g., /lures/3 -> "3")
    const lureId = window.location.pathname.split('/')[2]

    const response = await fetch('/lures')
    const data = await response.json()

    const lure = data.find(item => item.id == lureId)
    const mainContent = document.getElementById('lure-content')

    if (!lure) {
      mainContent.innerHTML = '<h2>Lure not found 😞</h2>'
      return
    }

    mainContent.innerHTML = `
      <div class="detail-image-container">
        <img src="${lure.imageUrl}" alt="${lure.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      </div>
      
      <div class="detail-info">
        <div class="detail-header">
          <h1>${lure.name}</h1>
          <h3>${lure.brand}</h3>
        </div>

        <div class="detail-price-row">
          <span class="detail-price">$${lure.price.toFixed(2)}</span>
          <span class="detail-rating">⭐ ${lure.rating} (${lure.reviews} reviews)</span>
          <span class="detail-stock ${lure.inStock ? 'in' : 'out'}">
            ${lure.inStock ? `In Stock (${lure.stockCount})` : 'Out of Stock'}
          </span>
        </div>

        <p class="detail-description">${lure.description}</p>

        <div class="detail-specs-grid">
          <div class="spec-item"><strong>Category:</strong> ${lure.category}</div>
          <div class="spec-item"><strong>Type:</strong> ${lure.type}</div>
          <div class="spec-item"><strong>Color:</strong> ${lure.color}</div>
          <div class="spec-item"><strong>Size:</strong> ${lure.size}</div>
          <div class="spec-item"><strong>Weight:</strong> ${lure.weight}</div>
          <div class="spec-item"><strong>Diving Depth:</strong> ${lure.divingDepth}</div>
          <div class="spec-item"><strong>Buoyancy:</strong> ${lure.buoyancy}</div>
          <div class="spec-item"><strong>Sound:</strong> ${lure.sound}</div>
          <div class="spec-item"><strong>Hook Size:</strong> ${lure.hookSize}</div>
          <div class="spec-item"><strong>Water Type:</strong> ${lure.waterType}</div>
          <div class="spec-item"><strong>SKU:</strong> ${lure.sku}</div>
        </div>

        <div class="detail-species">
          <strong>Target Species:</strong> 
          ${lure.targetSpecies.map(species => `<span class="species-tag">${species}</span>`).join('')}
        </div>
      </div>
    `
  } catch (error) {
    console.error('Error loading lure details:', error)
    document.getElementById('lure-content').innerHTML = '<h2>Error loading data.</h2>'
  }
}

renderLureDetail()