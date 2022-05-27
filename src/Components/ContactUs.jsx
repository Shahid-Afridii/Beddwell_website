import React from 'react'

const ContactUs = () => {
  return (
    <>
 <div class="main-wrapper main-wrapper-2">

 <div class="contact-form-area pt-90 pb-100">
            <div class="container">
                <div class="section-title-4 text-center mb-55" data-aos="fade-up" data-aos-delay="200">
                    <h2>Ask Us Anything Here</h2>
                </div>
                <div class="contact-form-wrap" data-aos="fade-up" data-aos-delay="200">
                    <form class="contact-form-style" id="contact-form" action="https://htmlmail.hasthemes.com/tasnim/urdan/mail.php" method="post">
                        <div class="row">
                            <div class="col-lg-4">
                                <input name="name" type="text" placeholder="Name*"/>
                                <input name="email" type="email" placeholder="Email*"/>
                                <input name="subject" type="text" placeholder="Subject*"/>
                                <input name="phone" type="text" placeholder="Phone*"/>
                            </div>
                            <div class="col-lg-8">
                                <textarea name="message" placeholder="Message"></textarea>
                            </div>
                            <div class="col-lg-12 col-md-12 col-12 contact-us-btn btn-hover">
                                <button class="submit" type="submit">Send Message</button>
                            </div>
                        </div>
                    </form>
                    <p class="form-messege"></p>
                </div>
            </div>
        </div>
 </div>
 <div class="off-canvas-active">
          <a class="off-canvas-close">
            <i class=" ti-close "></i>
          </a>
          <div class="off-canvas-wrap">
            {/* <div class="welcome-text off-canvas-margin-padding">
              <p>Default Welcome Msg! </p>
            </div> */}
            <div class="mobile-menu-wrap off-canvas-margin-padding-2">
              <div id="mobile-menu" class="slinky-mobile-menu text-left">
                <ul>
                  <li>
                    <a href="/">HOME</a>
                  </li>
                  <li>
                    <a href="/products">SHOP</a>
                  </li>
                  <li>
                    <a href="/categories">CATEGORIES </a>
                  </li>

                  <li>
                    <a href="/aboutus">ABOUT US</a>
                  </li>
                  <li>
                    <a href="/contactus">CONTACT US</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ContactUs