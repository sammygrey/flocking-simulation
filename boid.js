

class Boid{
  constructor(){
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.perceptionRadius = perceptionRadiusSlider.value()
    this.angle = perceptionSlider.value()
    this.r = 3
    this.maxForce = .1
    this.maxSpeed = 10
    this.history = []
  }

  edges(){
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
  //x = (360 - this.angle)/2
  // 
  align(boids){
    let steering = createVector()
    let total = 0
    for (let other of boids){
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      let a = abs(degrees(this.position.angleBetween(other.position)))
      if (other != this && d < this.perceptionRadius && a < this.angle){
        steering.add(other.velocity)
        total++
      }
    }
    if (total > 0){
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
      console.log('a')
    }
    return steering;
  }

  separation(boids){
    let steering = createVector()
    let total = 0
    for (let other of boids){
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      let a = abs(degrees(this.position.angleBetween(other.position)))
      if (other != this && d < this.perceptionRadius && a < this.angle){
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
    let steering = createVector()
    let total = 0
    for (let other of boids){
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      let a = abs(degrees(this.position.angleBetween(other.position)))
      if (other != this && d < this.perceptionRadius && a < this.angle){
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

  angle(other){
    let a = degrees(this.position.angleBetween(other.position))
    let x = (360 - this.angle)/2
    if(a < 0){
        a *= -1
      }
    else{
      a *= -1
      a += 360
    }
    a += 90
    a.limit(360)

  }

  flock(boids){
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)

    alignment.mult(alignmentSlider.value())
    cohesion.mult(cohesionSlider.value())
    separation.mult(separationSlider.value())
    this.angle = perceptionSlider.value()
    this.perceptionRadius = perceptionRadiusSlider.value()

    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
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
    //push to start drawing state, pop to end
    //translate moves drawing position from origin (top of screen) to specified pos
    let theta = this.velocity.heading() + radians(90)
   // stroke(200)
   // beginShape()
   // for (let i = 0; i < this.history.length; i++){
     // let pos = this.history[i]
     // noFill()
      //vertex(pos.x, pos.y)
     // endShape()
    //}
    //this.history.pop()

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
    stroke(255)
  }
}