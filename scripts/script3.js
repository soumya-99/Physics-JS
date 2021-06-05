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
let ground = Matter.Bodies.rectangle(1200, 500, 300, 20, { isStatic: true }) //the 1st two params are the position (center bottom)

let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false },
	},
})

render.mouse = mouse

// Create a ball to fire
let ball = Matter.Bodies.circle(300, 600, 20)
let sling = Matter.Constraint.create({
	pointA: { x: 300, y: 600 }, // this will fix the point of the sling, we set it with the same position with the 'ball'
	bodyB: ball, // it's an object we want to attatch to the sling... so set it to the 'ball'
	stiffness: 0.05, // stiffness of the string
})

let stack = Matter.Composites.stack(1100, 270, 4, 4, 0, 0, (x, y) => {
	return Matter.Bodies.polygon(x, y, 8, 30)
})

let firing = false
Matter.Events.on(mouseConstraint, "enddrag", (e) => {
	if (e.body === ball) firing = true
})
// then we'll keep checking the position of the ball on every screen update using after update event
Matter.Events.on(engine, "afterUpdate", () => {
	// if the firing flag is true, and the ball position is very  close to original point then we'll release the ball from the sling and replace it with the new one
	if (
		firing &&
		Math.abs(ball.position.x - 300) < 20 &&
		Math.abs(ball.position.y - 600) < 20
	) {
		// if the condition is true, then create a ball at the starting position
		ball = Matter.Bodies.circle(300, 600, 20)
		// and add it to the world
		Matter.World.add(engine.world, ball)
		// then set the new bodyB to the new ball
		sling.bodyB = ball
		// set firing flag to false
		firing = false
	}
})

Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]) // pass the world instance and pass the arrry of objects
Matter.Engine.run(engine)
Matter.Render.run(render)
