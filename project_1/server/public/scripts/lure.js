const renderLureDetail = async () => {
  try {
    const lureId = window.location.pathname.split('/')[2]

    const response = await fetch('/lures')
    const data = await response.json()

    const lure = data.find(item => item.id == lureId)
    const mainContent = document.getElementById('lure-content')

    if (!lure) {
      mainContent.innerHTML = '<h2>Lure not found 😞</h2>'
      return
    }

    // --- Try to fetch a better image from Channel3 ---
    let imageUrl = lure.imageUrl

    try {
      const imgRes = await fetch(`/api/lure-images?q=${encodeURIComponent(lure.name)}`)
      const imgData = await imgRes.json()

      // Debug: open DevTools Console to see the shape of this response
      console.log('Channel3 response for', lure.name, imgData)

      // Try all the likely field paths — the first one that yields a real URL wins
      const candidates = [
        imgData.products?.[0]?.images?.[0]?.url,
        imgData.products?.[0]?.images?.[0],
        imgData.products?.[0]?.image,
        imgData.products?.[0]?.image_url,
        imgData.results?.[0]?.image,
        imgData.results?.[0]?.image_url,
        imgData.hits?.[0]?.image,
        imgData.hits?.[0]?.image_url,
        imgData[0]?.image,
        imgData[0]?.image_url
      ]

      const found = candidates.find(url => typeof url === 'string' && url.startsWith('http'))
      if (found) {
        imageUrl = found
        console.log('✅ Using Channel3 image:', imageUrl)
      } else {
        console.warn('⚠️ No image URL found in Channel3 response, using fallback')
      }
    } catch (err) {
      console.warn('Could not fetch Channel3 image for', lure.name, err)
    }

    // Inline SVG fallback — always renders, no network needed
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23efe6d6%22/><text x=%2250%25%22 y=%2250%25%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22%238b6b4a%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>No Image</text></svg>`

    mainContent.innerHTML = `
      <div class="detail-image-container">
        <img src="${imageUrl}" alt="${lure.name}" class="detail-image"
            onerror="this.onerror=null; this.src='${fallbackSvg}'">
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