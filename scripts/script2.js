// import Matter from "matter-js"
let engine = Matter.Engine.create() // create matter engine instance
let render = Matter.Render.create({
	element: document.body,
	engine: engine,
	options: {
		width: 1600,
		height: 800,
		wireframes: false,
	},
})
// creating object instances
let ground = Matter.Bodies.rectangle(400, 600, 810, 60, { isStatic: true }) //the 1st two params are the position (center bottom)

let stack = Matter.Composites.stack(200, 200, 4, 4, 0, 0, (x, y) => {
	let sides = Math.round(Matter.Common.random(2, 8))
	return Matter.Bodies.polygon(x, y, sides, Matter.Common.random(20, 50))
})

let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false },
	},
})

render.mouse = mouse

Matter.World.add(engine.world, [stack, ground, mouseConstraint]) // pass the world instance and pass the arrry of objects
Matter.Engine.run(engine)
Matter.Render.run(render)	

