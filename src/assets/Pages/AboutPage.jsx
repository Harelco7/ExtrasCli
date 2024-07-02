import React from 'react'
 import "..//..//Styles/AboutPage.css" 
 import photo from "..//..//..//public/Images/GreenWorld.jpeg"
 import { LuHeartHandshake } from "react-icons/lu";
 import { GiTakeMyMoney } from "react-icons/gi";
 import { ImEarth } from "react-icons/im";
 import { motion } from 'framer-motion';

 export default function AboutPage() {
   return (
   
      <div className= "container">
        <br></br>
        <h1 className='title'>קצת עלינו</h1>
         <div className="photo-about">
            <br></br>
            <motion.img
            src={photo}
            alt="photo"
            className="animated-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 , ease: 'easeOut'}}
           />
          </div>
          <div className="text-about">
              <br></br>
              <span>מדי שנה נזרקות כמויות מזון אדירות ברשתות המזון והמסעדנות.
                <br></br>
                גם בענפים אחרים ניכרת תופעה של בזבוז משאבים.
                <br></br>
                כאן נולד EXTRA'S - פרויקט שמטרתו העיקרית היא לצמצם את בזבוז שאריות המזון ושאר המשאבים.
                <br></br> <br></br>
                <h4>"BOTH WIN"</h4>
                אצלנו גם בעלי עסקים וגם לקוחות יכולים להרוויח!
              </span>
          </div>
          <br></br> <br></br>
          <div className="icons-about">
            <div className="icon-item">
            <LuHeartHandshake size={100} color='#d67d00'/>
            <br></br> <br></br>
          <h4>מכירת עודפים</h4>
          <p>עסקים מרוויחים ממכירת מארזים המורכבים מעודפים של סוף היום</p>
            </div>
            <div className="icon-item">
          <GiTakeMyMoney size={100} color='#d67d00'/>
          <br></br> <br></br>
          <h4>חסכון בכסף</h4>
          <p>לקוחות נהנים ממארזים מוזלים במחירים המותאמים לכל כיס</p>
          </div>
          <div className="icon-item">
            <ImEarth size={100} color='#d67d00' />
            <br></br> <br></br>
            <h4>איכות הסביבה</h4>
          <p>צמצום מירבי של תופעת בזבוז משאבים וזריקת עודפי מזון</p>
            </div>
          </div>
        </div>
   )
 };
;