import React from 'react';
import './LandingPage.css';

function LandingPage() {


  return (
    <div style={{width:'100%', margin: ' auto'}}>
      <div className='Hero'>
       Despite the forecast, live like it's spring
      </div>
      <div className='ImgCon'> 
    

        <div>
          <img src="https://res.cloudinary.com/seoyoung/image/upload/v1680774055/landscape-1192669_p7d2yc.jpg" style={{width:'100%'}} alt="" />
          <p style={{position:'absolute', bottom:'30px', left:'10px', color:'#fff'}}>Laugh Often :)</p>
        </div>
        <div>
          <img src="https://res.cloudinary.com/seoyoung/image/upload/v1680774055/boats-3051610_axveop.jpg" style={{width:'100%'}} alt="" />
          <p style={{position:'absolute', bottom:'30px', left:'10px', color:'#fff'}}>Love what you do</p>
        </div>
        <div>
          <img src="https://res.cloudinary.com/seoyoung/image/upload/v1680774055/lake-5756911_u9zvhg.jpg" style={{width:'100%'}} alt="" />
          <p style={{position:'absolute', bottom:'30px', left:'10px', color:'#fff'}}>Follow your heart</p>
        </div>
        <div>
          <img src="https://res.cloudinary.com/seoyoung/image/upload/v1680774054/ferris-wheel-7637669_1920_svmnvx.jpg" style={{width:'100%'}} alt="" />
          <p style={{position:'absolute', bottom:'30px', left:'10px', color:'#fff'}}>Don't beat yourself up</p>
        </div>
        <div>
          <img src="https://res.cloudinary.com/seoyoung/image/upload/v1680774056/candle-3885652_cigmzi.jpg" style={{width:'100%'}} alt="" />
          <p style={{position:'absolute', bottom:'30px', left:'10px', color:'#fff'}}>When they go low, we go high</p>
        </div>
        <div>
          <img src="https://res.cloudinary.com/seoyoung/image/upload/v1680774054/lamps-2178743_xtxeej.jpg" style={{width:'100%'}} alt="" />
          <p style={{position:'absolute', bottom:'30px', left:'10px', color:'#fff'}}>Be brave</p>
        </div>
    
            
     </div>
  </div>
  )
}

export default LandingPage