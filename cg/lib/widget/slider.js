import React, {useState, useRef, useEffect} from 'react'
import './slider.css'
import _ from 'lodash'

const useMouseDrag = () => {

  const [move, setMove] = useState(0)
  const [dragging, setDragging] = useState(false)
  const x = useRef(null)
  const startMove = useRef(0)

  useEffect(() => {
    const handler = () => {
      setDragging(false)
    }
    document.addEventListener('mouseup', handler)
    return () => {
      document.removeEventListener('mouseup', handler)
    }
  }, [])

  return {
    move,
    sliderHandlers : {
      onMouseMove : (e) => {
        if(dragging) {
          const currentX = e.clientX
          if(x.current !== null) {
            setMove(() => {
              const diff = currentX - x.current
              const move = diff / 140 + startMove.current
              if(move <= 0) return 0
              if(move > 1) return 1
              return move
              
            })
          }
        }
      }
    },
    barHandlers : {
      onMouseDown : (e) => {
        setDragging(true)
        startMove.current = move
        x.current = e.clientX
      },


    }
  }
}

export default ({range, onChange}) => {
  const {barHandlers, sliderHandlers, move} = useMouseDrag()
  useEffect(() => {
    onChange && onChange(move * range[1] + range[0])
  }, [move])
  return (
    <div className="slider">
      <div className="slider-slot" {...sliderHandlers}>
        <div
          {...barHandlers}
          style={{
            left: Math.floor(move * 140) + "px",
          }}
          className="slider-bar"
        ></div>
      </div>
      <div className="slider-value">{Number(range[0] + (range[1] - range[0]) * move).toFixed(4)}</div>
    </div>
  );
}