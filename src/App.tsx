import React, { useEffect, useState } from 'react'
import './App.css'
import wineryImage from './assets/winery.jpg'
import images from './assets/images.json'

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [storyInverted, setStoryInverted] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      // Check if navbar has reached the "A Winery with Heart" title
      const heroTitle = document.querySelector('.hero-title')
      if (heroTitle) {
        const heroTitleRect = heroTitle.getBoundingClientRect()
        const navbarHeight = 80 // approximate navbar height
        const navbarReachedTitle = heroTitleRect.top <= navbarHeight
        setScrolled(navbarReachedTitle)
      }
      
      // Check color scheme based on story card positions and current section
      const aboutSection = document.getElementById('about')
      const visitSection = document.getElementById('visit')
      
      if (aboutSection && visitSection) {
        const navbarHeight = 80 // approximate navbar height
        const visitRect = visitSection.getBoundingClientRect()
        
        // Check if we've reached the Visit Us section
        if (visitRect.top <= navbarHeight) {
          // In Visit Us section - white background, so don't invert navbar (keep red)
          setStoryInverted(false)
        } else {
          // Still in story section - check story card positions
          const storyRows = aboutSection.querySelectorAll('.story-row')
          let shouldInvert = false
          
          // Find the last story row that has passed the navbar
          let currentRowIndex = -1
          for (let i = 0; i < storyRows.length; i++) {
            const rowRect = storyRows[i].getBoundingClientRect()
            if (rowRect.top <= navbarHeight) {
              currentRowIndex = i
            }
          }
          
          // Check if we've reached the story section at all
          const storyHeader = aboutSection.querySelector('h2')
          if (storyHeader) {
            const headerRect = storyHeader.getBoundingClientRect()
            const passedHeader = headerRect.top <= navbarHeight
            
            if (passedHeader) {
              // Determine color scheme based on the current row index
              if (currentRowIndex >= 0) {
                // Cards 0,1: Red background (intro, "A Son's Quest")
                // Cards 2,3: White background ("Nature's Hidden Treasure", "From Vision to Vineyard") 
                // Cards 4,5: Red background ("The Harvest of Health", "A Legacy of Wellness")
                if (currentRowIndex <= 1 || currentRowIndex >= 4) {
                  shouldInvert = true
                } else {
                  shouldInvert = false
                }
              } else {
                // Just passed header but no story cards yet - start with red
                shouldInvert = true
              }
            }
          }
          
          setStoryInverted(shouldInvert)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${scrolled && storyInverted ? 'inverted' : ''}`}>
        <div className="nav-container">
          <h1 className="nav-logo">Woodmill Winery</h1>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="https://vinoshipper.com/shop/woodmill_winery_inc" target="_blank" rel="noopener noreferrer">Wines</a></li>
            <li><a href="#visit">Visit</a></li>

          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero" style={{backgroundImage: `url(${wineryImage})`}}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">A Winery with Heart</h1>
          <p className="hero-subtitle">Located in Vale, North Carolina, WoodMill Winery is the perfect place to visit with friends & family. Offering some of the best wine in the world made from Muscadines, Scuppernongs, Blackberries & Blueberries.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`about ${storyInverted ? 'story-inverted' : ''}`}>
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-grid">
            {/* Story Card 1 - Left */}
            <div className="story-row">
              <div className="story-card">
                <p>
                  In the heart of the Southern Appalachian Mountains, where the rolling foothills of Vale, North Carolina stretch toward the horizon, a father and son's journey of love, dedication, and discovery gave birth to something extraordinary. What began as a search for hope became a testament to the power of family, the wisdom of nature, and the healing properties hidden within a humble grape.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <img src={images.winery_1} alt="Winery with fall leaves" />
                </div>
              </div>
            </div>

            {/* Story Card 2 - Right */}
            <div className="story-row">
              <div className="story-card">
                <h3>A Son's Quest</h3>
                <p>
                  When Larry Cagle, Jr. watched his father's heart condition worsen, he refused to stand by helplessly. Driven by a family history shadowed by cardiovascular disease, he turned to medical journals and university studies, searching for answers. It was during this dedicated research that Larry discovered "The French Paradox"—a groundbreaking study revealing that moderate daily consumption of red wine could reduce heart disease occurrence by up to forty percent. The secret lay in a powerful antioxidant called Resveratrol, a natural compound that blocks harmful free radicals known to cause cell damage and contribute to heart disease, stroke, aging, and certain cancers.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <img src={images.father_son_1} alt="Father and son at the winery" />
                </div>
              </div>
            </div>

            {/* Story Card 3 - Left */}
            <div className="story-row">
              <div className="story-card">
                <h3>Nature's Hidden Treasure</h3>
                <p>
                  Larry's search led him to an extraordinary discovery right in his own backyard: the Muscadine grape, nature's healthiest grape, contains one of the highest known concentrations of Resveratrol. Studies from North Carolina State University revealed that red and white Muscadines contain 40 times higher Resveratrol concentrations than any other grape ever tested. Here, growing in the Carolina mountains, was the answer he'd been seeking.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <img src={images.wine_1} alt="Wine bottles" />
                </div>
              </div>
            </div>

            {/* Story Card 4 - Right */}
            <div className="story-row">
              <div className="story-card">
                <h3>From Vision to Vineyard</h3>
                <p>
                  In the spring of 2001, father and son planted their first half-acre with approximately 100 Muscadine vines. What started as a leap of faith has flourished into a 40-acre vineyard with nearly 9,000 vines, positioned perfectly at 1,100 feet above sea level on a plateau above the piedmont region. The vineyard's gradual northeastern slope, constant air movement, and excellent soil drainage create ideal conditions for cultivating premium Muscadine varieties including Ison, Tara, Dixie Red, Nesbit, Carlos, Noble, Summit, Trumpit, and the legendary Scuppernong.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <img src={images.winery_2} alt="Winery building" />
                </div>
              </div>
            </div>

            {/* Story Card 5 - Left */}
            <div className="story-row">
              <div className="story-card">
                <h3>The Harvest of Health</h3>
                <p>
                  Each fall, from mid-to-late September through October, the mountains come alive with the harvest of these remarkable grapes. During this seven-to-eight-week window, the Muscadines reach their peak, carrying within them not just the sweet, complex flavors that make exceptional wine, but also concentrated health benefits. Recent studies continue to unveil Resveratrol's remarkable properties: reducing joint inflammation associated with arthritis, improving cardiovascular health, lowering harmful molecules linked to Alzheimer's disease, strengthening the body's natural immune system, and helping fight certain types of cancer cells.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder smaller-image">
                  <img src={images.winery_4} alt="Winery harvest scene" />
                </div>
              </div>
            </div>

            {/* Story Card 6 - Right */}
            <div className="story-row">
              <div className="story-card">
                <h3>A Legacy of Wellness</h3>
                <p>
                  Today, WoodMill Vineyard stands as more than just a winery nestled in the shadows of the Southern Appalachian Mountains—it's a testament to the belief that nature provides powerful tools for healing and wellness. Every bottle of our Muscadine wine carries this story of hope, health, and the extraordinary power of the grape that these mountains have nurtured for generations. When you visit our handicap-accessible winery, you're not just tasting wine; you're experiencing a piece of our family's journey toward wellness, one sip at a time. Here's to your health, naturally.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <img src={images.winery_5} alt="Morning view of WoodMill Winery" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="story-cta">
            <a href="https://vinoshipper.com/shop/woodmill_winery_inc" target="_blank" rel="noopener noreferrer" className="story-wine-button">
              Shop Our Wines
            </a>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="visit">
        <div className="container">
          <h2>Visit Us</h2>
          <div className="visit-location">
            <p>1350 Woodmill Winery Ln, Vale, NC 28168 | (704) 276-9911</p>
            <p>events@woodmillwinery.com</p>
          </div>
          <div className="visit-content">
            <div className="visit-info">
              <div className="hours-container">
                <div className="hours">
                  <h4>Winery Hours</h4>
                  <div className="hours-grid">
                    <div className="day-hours closed">
                      <span className="day">Monday</span>
                      <span className="time">CLOSED</span>
                    </div>
                    <div className="day-hours">
                      <span className="day">Tuesday</span>
                      <span className="time">10am – 5pm</span>
                    </div>
                    <div className="day-hours">
                      <span className="day">Wednesday</span>
                      <span className="time">10am – 5pm</span>
                    </div>
                    <div className="day-hours">
                      <span className="day">Thursday</span>
                      <span className="time">10am – 5pm</span>
                    </div>
                    <div className="day-hours">
                      <span className="day">Friday</span>
                      <span className="time">10am – 5pm</span>
                    </div>
                    <div className="day-hours">
                      <span className="day">Saturday</span>
                      <span className="time">10am – 5pm</span>
                    </div>
                    <div className="day-hours">
                      <span className="day">Sunday</span>
                      <span className="time">1pm – 5pm</span>
                    </div>
                  </div>
                  
                  <div className="hours-note">
                    <p><strong>ADA Service Animals ONLY</strong></p>
                  </div>
                </div>

                <div className="farmers-market">
                  <h4>Farmers Market Locations & Hours</h4>
                  
                  <div className="market-container">
                    <div className="market-location">
                      <h5>Charlotte Market</h5>
                      <div className="market-address">
                        <p>1801 Yorkmont Rd<br />Charlotte, NC 28217</p>
                      </div>
                      <div className="market-hours">
                        <div className="day-hours">
                          <span className="day">Friday</span>
                          <span className="time">10am – 3pm</span>
                        </div>
                        <div className="day-hours">
                          <span className="day">Saturday</span>
                          <span className="time">9am – 5pm</span>
                        </div>
                        <div className="day-hours">
                          <span className="day">Sunday</span>
                          <span className="time">10am – 3pm</span>
                        </div>
                      </div>
                    </div>

                    <div className="market-location">
                      <h5>Piedmont Triad Market</h5>
                      <div className="market-address">
                        <p>2914 Sandy Ridge Rd<br />Colfax, NC</p>
                        <p><em>Outside Location</em></p>
                      </div>
                      <div className="market-hours">
                        <div className="day-hours">
                          <span className="day">Saturday</span>
                          <span className="time">9am – 5pm</span>
                        </div>
                        <div className="day-hours">
                          <span className="day">Sunday</span>
                          <span className="time">10am – 5pm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Woodmill Winery. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/woodmillwinery/" target="_blank" rel="noopener noreferrer" className="social-link">
              📷 Follow us on Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
