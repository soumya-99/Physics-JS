// import Matter from "./matter"
let engine = Matter.Engine.create() // create matter engine instance
let render = Matter.Render.create({
	element: document.body,
	engine: engine,
})
// creating object instances
let ground = Matter.Bodies.rectangle(400, 600, 810, 60, { isStatic: true }) //the 1st two params are the position (center bottom)

let boxA = Matter.Bodies.rectangle(400, 200, 80, 80)
let boxB = Matter.Bodies.rectangle(450, 50, 80, 80)

let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false },
	},
})

render.mouse = mouse

Matter.World.add(engine.world, [boxA, boxB, ground, mouseConstraint]) // pass the world instance and pass the arrry of objects
Matter.Engine.run(engine)
Matter.Render.run(render)
