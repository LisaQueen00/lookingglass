import { useEffect, useState } from 'react'
import banner1 from '../../assets/blog/banners/banner1.png'

const slides = [
  { id: 1, title: 'banner1', image: banner1 },
//   { id: 2, title: 'New Articles', image: '/banners/articles.png' },
//   { id: 3, title: 'Coming Soon', image: '/banners/coming-soon.png' },
]

function CarouselBanner() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <img
        src={slides[activeIndex].image}
        alt={slides[activeIndex].title}
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`切换到第 ${index + 1} 张`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-5 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default CarouselBanner