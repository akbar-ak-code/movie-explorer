import React from 'react'

export default function Footer() {
  return (
    <div>
       <div style={{ background: 'linear-gradient(to right,black,rgb(30, 28, 28))',color:"orange",marginBottom:"0",}}>
        <div className="container text-center d-flex justify-content-center " style={{flexDirection:"column",alignItems:"center",justifyContent:"center",height:"8vh"}}  >
            <p style={{margin:"auto 0"}}>Movies-Explorer</p>
            <p style={{margin:"auto 0"}}>Akbar <span style={{color:"blue"}}>&copy;</span> copyright</p>
        </div>
      </div>
    </div>
  )
}
