import React from 'react'
import './inforsBtns.css'
const InforsBtns = () => {
  return (
    <div className='inforbtnsbox'>
        <div className='infor-bts-rows row1'>
            <div>
              <a href="#">
                <img src="./../../../img/icons/iconmonstr-police-10.svg"/>
                <p>Imigração</p>
              </a>
            </div>
            <div>
              <a href="#">
                <img src="./../../../img/icons/iconmonstr-building-46.svg"/>
                <p>Acomodação</p>
              </a>
            </div>
        </div>
        <div className='infor-bts-rows'>
            <div>
                <a href="#">
                    <img src="./../../../img/icons/iconmonstr-delivery-7.svg"/>
                <p>Trabalho</p>
              </a>
            </div>
            <div>
                <a href="#">
                   <img src="./../../../img/icons/iconmonstr-party-14.svg"/>
                <p>Estilo de Vida</p>
              </a>
            </div>
        </div>
        <div className='infor-bts-rows'>
            <div>
                <a href="#">
                  <img src="./../../../img/icons/iconmonstr-weather-95.svg"/>
                <p>Passeios</p>
              </a>
            </div>
            <div>
                <a href="#">
                   <img src="./../../../img/icons/iconmonstr-shopping-bag-4.svg"/>
                <p>Compras</p>
              </a>
            </div>
        </div>
    </div>
  )
}

export default InforsBtns