import React from 'react'
import './style.css'
import qrcode from "../../images/img/qr_code.png"
import qrAppStore from "../../images/img/app_store.png"
import qrGooglePlay from "../../images/img/google_play.png"
import { FaFacebook,FaInstagram,FaLinkedin,FaLaptop } from 'react-icons/fa'
const Footer = () => {
  return (
    <div className="app">
        <footer className="footer">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__column-2-5">
                        <h3 className="footer__heading">Chăm sóc khách hàng</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Trung tâm trợ giúp</a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Shop Laptop Mall</a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Hướng dẫn mua hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-5">
                        <h3 className="footer__heading">Giới thiệu</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Giới thiệu</a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Tuyển dụng</a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Điều khoản</a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-5">
                        <h3 className="footer__heading">Danh mục</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Laptop giá rẻ</a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Laptop gamming</a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">Laptop văn phòng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-5">
                        <h3 className="footer__heading">Theo dõi</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">
                                    
                                    <FaFacebook className="footer__item-icon fab fa-facebook"/>
                                    Facebook
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">
                                    
                                    <FaInstagram className="footer__item-icon fab fa-instagram"/>
                                    Instagram
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__item-link">
                                 
                                    <FaLinkedin className="footer__item-icon fab fa-linkedin"/>
                                    Linkedin
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-5">
                        <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
                        <div className="footer__link">
                            <img src={qrcode} alt="QR Code" className="footer__qr-img"/>
                            <div className="footer__link-apps">
                                <a href="" className="link__app-store">
                                    <img src={qrAppStore} alt="App Store" className="footer__app-download"/>
                                </a>
                                <a href="" className="link__google-store">
                                    <img src={qrGooglePlay} alt="Google Play" className="footer__app-download"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="grid">
                    <p className="footer__text">© 2021 - Bản quyền thuộc về Shop Laptop</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer