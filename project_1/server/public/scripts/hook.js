const hook = document.getElementById('hook-banner')

if (hook) {
  const hookContainer = document.createElement('div')
  hookContainer.className = 'hook-container'

  const hookLeft = document.createElement('div')
  hookLeft.className = 'hook-left'

  const hookRight = document.createElement('div')
  hookRight.className = 'hook-right'

  const hookMessage = document.createElement('h2')
  hookMessage.textContent = 'Hooks for Days!'
  hookLeft.appendChild(hookMessage)

  const variety = document.createElement('p')
  variety.textContent = 'We got Crankbait, Hard Bait, Spoon, and More!'
  hookRight.appendChild(variety)

  hookContainer.appendChild(hookLeft)
  hookContainer.appendChild(hookRight)
  hook.appendChild(hookContainer)
}