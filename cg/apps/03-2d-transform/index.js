import { Model, loop, primitives, Scene } from "../../lib";
import Widget from '../../lib/widget'

function main() {

  const model = new Model()
  let x = 0, y = 0
  /* 设置控制面板 */
  const canvas = document.getElementById('canvas')
  const widget = new Widget([
    {
      type : "slider",
      range : [0, canvas.width],
      onChange : (value) => {
        x = value
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, canvas.height],
      onChange : (value) => {
        y = value
      },
      label : "y"
    },
  ])

  model.initialize( () => {
    return {
      buffers : {
        a_position : {
          size : 2,
          data : primitives.d2_rect(100, 100, 200, 200),
          type : 'VERTEX'
        }
      },
      uniforms : {
        u_color: { value: [Math.random(), Math.random(), Math.random(), 1.0] },
        u_resolution: { value: [model.gl.canvas.width, model.gl.canvas.height] }
      }
    }
  })

  model.mutator( () => {
    return {
      buffers : {
        a_position : {
          data : primitives.d2_rect(x, y, 200, 200)
        }
      }
    }
  })


  const scene = new Scene()
  scene.add(model)
  widget.render()

  loop(() => {
    scene.render()
  })
}

main()