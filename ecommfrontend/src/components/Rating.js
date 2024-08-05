import React from "react";


function Rating(color, value, text) {
    // console.log(color)
    let newcolor= color.color
    // console.log(newcolor)
    let newval=color.value
    let newtext=color.text
  return (
   
    <div className="rating">
        
<span>
        
        <i
          
          style={{color:newcolor}}
          className={
            newval >= 1
              ? 'fas fa-star'
              : newval >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }

        ></i>
      </span>
      <span>
        <i
          style={{color:newcolor}}
          className={
            newval >= 2
              ? 'fas fa-star'
              : newval >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color:newcolor }}
          className={
            newval >= 3
              ? 'fas fa-star'
              : newval >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color:newcolor }}
          className={
            newval >= 4
              ? 'fas fa-star'
              : newval >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color:newcolor }}
          className={
            newval >= 5
              ? 'fas fa-star'
              : newval >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    <span>
       {newtext && newtext} 
    </span>
    </div>
  )
}

export default Rating