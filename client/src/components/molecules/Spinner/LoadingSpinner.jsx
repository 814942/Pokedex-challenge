import Image from 'next/image'

const LoadingSpinner = () => (
  <div className='absolute top-2/4	right-1/2	'>
    <Image 
      className="animate-spin	w-8" 
      alt="Loading..." 
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
    />
  </div>
)

export default LoadingSpinner
