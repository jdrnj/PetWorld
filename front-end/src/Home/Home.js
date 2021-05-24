import React, { useEffect, useRef } from 'react'
import { Button } from '@material-ui/core'
import './Home.css'
import AnimalList from '../PetAdoption/AnimalList'

const scrollToRef = (ref) => {
  window.scrollTo({ top: ref.current.offsetTop, left: 0, behavior: 'smooth' })
}
function Home() {
  const homePetsRef = useRef(null)
  const handleScroll = () => {
    scrollToRef(homePetsRef)
  }

  return (
    <main>
      <section className='home-landing'>
        <h1 className="title">Welcome to our pet world!</h1>
        <p className="title-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industry's standard dummy text  ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a typespecimen book.</p>
        <div style={{ paddingTop: '5vw' }}>
          <Button variant="outlined" color="default" onClick={handleScroll}>
            Разгледайте нашите животни
            </Button>
        </div>
      </section>
      <section className='home-pets' ref={homePetsRef}>
        <AnimalList />

      </section>
    </main>

  );
}

export default Home;
