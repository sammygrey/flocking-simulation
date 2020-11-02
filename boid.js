

class Boid{
  constructor(){
    //constructs new boid object
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.perceptionRadius = perceptionRadiusSlider.value()
    this.r = 3
    this.maxForce = .1
    this.maxSpeed = 10
    this.history = []
  }

  edges(){
    //allows boids to wrap around the screen
    if (this.position.x > width){
      this.position.x = 0
    } else if (this.position.x < 0){
      this.position.x = width
    }
    if (this.position.y > height){
      this.position.y = 0
    } else if (this.position.y < 0){
      this.position.y = height
    }
  }

  //fix visual radius to allow an angle without visual
  //add flake
  align(boids){
    //alignment algorithm for boids in relation to other boids within perception radius
    let steering = createVector()
    let total = 0
    for (let other of boids){
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      if (other != this && d < this.perceptionRadius){
        steering.add(other.velocity)
        total++
      }
    }
    if (total > 0){
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering;
  }

  separation(boids){
    //separation algorithm for boids in relation to other boids within perception radius
    let steering = createVector()
    let total = 0
    for (let other of boids){
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      if (other != this && d < this.perceptionRadius){
        let diff = p5.Vector.sub(this.position, other.position)
        diff.div(d * d)
        steering.add(diff)
        total++
      }
    }
    if (total > 0){
      steering.div(total);
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }

  cohesion(boids){
    //cohesion algorithm for boids in relation to other boids within perception radius
    let steering = createVector()
    let total = 0
    for (let other of boids){
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      if (other != this && d < this.perceptionRadius){
        steering.add(other.position)
        total++
      }
    }
    if (total > 0){
      steering.div(total)
      steering.sub(this.position)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }

  flock(boids){
    //changes acceleration value based on alignment,cohesion,separation algorithms
    //changes alignment,cohesion,separation values based on sliders
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)

    alignment.mult(alignmentSlider.value())
    cohesion.mult(cohesionSlider.value())
    separation.mult(separationSlider.value())
    //this.angle = perceptionSlider.value()
    this.perceptionRadius = perceptionRadiusSlider.value()

    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
  }

  checkCollision(){

  }

  update(){
    //if(trailBox.checked() == true){
      //this.history.push(this.position.x, this.position.y)
    //}
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.acceleration.mult(0)
  }

  //trails dont work, figure out later
  show(){
    //draws each boid based on its vector location and angle
    //translate moves drawing position from origin (top of screen) to specified pos
    let theta = this.velocity.heading() + radians(90)

    push()
    fill(255)
    stroke(255)
    translate(this.position.x, this.position.y)
    rotate(theta)
    beginShape()
    vertex(0, this.r * -2)
    vertex(-this.r, this.r * 2)
    vertex(this.r, this.r * 2)
    endShape(CLOSE)
    pop()
  }


  //doesn't work, fix later
  showTrail(){
    if(this.history.length > 5){
      push()
      stroke(200)
      beginShape()
      for (let i = 0; i < this.history.length; i++){
        let pos = this.history[i]
        noFill()
        vertex(pos[0], pos[1])
        endShape()
      }
      this.history.pop()
      pop()
    }
  }
}