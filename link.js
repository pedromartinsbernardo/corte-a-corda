class Link{
constructor(bodyA,bodyB){
var lestLink = bodyA.body.bodies.length- 2


this.link = Constraint.create({
    bodyA:bodyA.body.bodies[lestLink],
    pointA:{x:0,y:0},
    bodyB:bodyB,
    pointB:{x:0,y:0},
    length: -10,
    stiffness:0.01

  
})

World.add(engine.world,this.link)
}


corta(){
    World.remove(engine.world,this.link)
}

}