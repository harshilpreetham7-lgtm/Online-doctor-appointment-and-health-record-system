export function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window && window.Razorpay) return resolve(window.Razorpay)
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay))
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay')))
      return
    }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    s.onload = () => resolve(window.Razorpay)
    s.onerror = () => reject(new Error('Failed to load Razorpay script'))
    document.body.appendChild(s)
  })
}
