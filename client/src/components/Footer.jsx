import React from 'react'
import instagramImg from '../assets/instagram.webp'
import pinterest from '../assets/pinterest.png'
import tiktokImg from '../assets/tiktok.png'
import { Pointer } from 'lucide-react'



export default function Footer() {
  return (
    <div className="container-fluid p-3" style={{boxShadow:'0 0px 5px yellow', borderRadius: '5px'}}>
      <div className="row p-4" style={{ backgroundColor: '#0a0a0adc' }}>
        
        <div className="col text-white">
          <p className="fw-bold fs-5">Help</p>
          <a className="text-white d-block" style={{textDecoration: 'none', cursor: 'pointer'}} href='/help'>Help</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='/aboutUs'>About us</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='/earnWithUs'>Earn with us</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='ContactUs'>Contact Us</a>
        </div>

        <div className="col text-white">
          <p className="fw-bold fs-5">Shop</p>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='/products'>Shop with us</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='/'>Shopping</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='/privacy-policy'>Privacy Policy</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='/terms-of-service'>Terms of Service</a>
        </div>

        <div className="col text-white ">
          <p className="fw-bold fs-5">Social</p>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='https://www.instagram.com/amazonfashionin/'>@instagram </a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href="https://in.pinterest.com/ideas/women's-clothing/915335281916/">@pinterest</a>
          <a className="text-white d-block" style={{textDecoration: 'none'}} href='https://www.tiktok.com/@amazonfashionin'>@tiktok</a>
        </div>

        <div className="col">
            <a href="https://www.instagram.com/amazonfashionin/"><img src={instagramImg} alt="Instagram" className="me-2 m-3 border rounded" style={{width: '27px', height: '27px'}} /></a>
            <a href="https://in.pinterest.com/ideas/women's-clothing/915335281916/"><img src={pinterest} alt="Pinterest" className="me-2 m-3 border rounded" style={{width: '27px', height: '27px'}} /></a>
            <a href=""><img src={tiktokImg} alt="tiktok" className='me-2 m-3 border rounded' style={{width: '27px', height: '27px'}}/></a>
            {/* Add tiktok image if available */}
        </div>

        

      </div>
      
    </div>
  )
}
