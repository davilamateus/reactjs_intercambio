import './btnStyle.css'
import { useEffect, useState } from 'react'

const BtnStyle = ({style} ) => {

  const [active ,setActive ] = useState('light')

  function changeStyle(value){

    setActive(value)
    
    localStorage.setItem('style', value)

    style()
  }







  return (
    <div className="style-box">
        <div onClick={()=>{changeStyle('light')}} className={`light-box ${active === "light" ? 'style-selected':''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="27.5" height="27.5" viewBox="0 0 27.5 27.5">
            <g id="ic-weather-sunny" transform="translate(0.773 0.378)">
              <circle id="Elipse_146" data-name="Elipse 146" cx="9" cy="9" r="9" transform="translate(3.977 4.372)" fill="none" stroke="#fff"    />
              <line id="Linha_504" data-name="Linha 504" y1="4" transform="translate(12.977 0.372)" fill="none" stroke="#fff"  />
              <line id="Linha_505" data-name="Linha 505" y1="4" transform="translate(12.977 22.372)" fill="none" stroke="#fff"    />
              <line id="Linha_506" data-name="Linha 506" x2="4" transform="translate(21.977 13.372)" fill="none" stroke="#fff"    />
              <line id="Linha_507" data-name="Linha 507" x2="4" transform="translate(-0.023 13.372)" fill="none" stroke="#fff"    />
              <line id="Linha_508" data-name="Linha 508" x2="2.761" y2="2.761" transform="translate(19.47 19.47)" fill="none" stroke="#fff"    />
              <line id="Linha_509" data-name="Linha 509" x2="2.644" y2="2.644" transform="translate(3.816 3.816)" fill="none" stroke="#fff"    />
              <line id="Linha_510" data-name="Linha 510" x1="2.761" y2="2.761" transform="translate(3.816 19.47)" fill="none" stroke="#fff"    />
              <line id="Linha_511" data-name="Linha 511" x1="2.761" y2="2.761" transform="translate(19.47 3.816)" fill="none" stroke="#fff"    />
            </g>
          </svg>

        </div>
        <div onClick={()=>{changeStyle('dark')}}  className={`dark-box ${active === "dark" ? 'style-selected':''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24.078" height="28.169" viewBox="0 0 24.078 28.169">
      <path id="Caminho_420" data-name="Caminho 420" d="M5.229,21.828A13.425,13.425,0,0,1,14.292,1.8,1.22,1.22,0,0,1,15.5,3.715a12.2,12.2,0,0,0,9.218,19.36,1.22,1.22,0,0,1,.721,2.149,13.428,13.428,0,0,1-20.215-3.4Z" transform="translate(-2.57 -1.018)" fill="none" stroke="#838383"     />
            </svg>
        </div>
    </div>
  )
}

export default BtnStyle