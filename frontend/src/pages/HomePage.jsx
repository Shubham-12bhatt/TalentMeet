import React from 'react'
import { Video } from 'lucide-react'
import { Link } from 'react-router'
const HomePage = () => {
  return (
    <div>
      {/* navbar */}
      <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg'>
        <div>
          {/* logo */}
          <Link to={'/'}>
            <div className='size-10 rounded-xl bg-gradient-to-r from-secondary to-accent flex items-center justify-center' >
              <Video className='size-6 text-white'/>
          </div>
            <div>
              <span>
                TalentMeet
              </span>
          </div>
          
          
          </Link>
        
        
        
        
        </div>

      </nav>

    </div>
  )
}

export default HomePage