const boids = []

let alignSlider, cohesionSlider, separationSlider, perceptionRadius

function setup(){
    createCanvas(1280,720)
    alignmentLabel = createDiv('Alignment')
    alignmentSlider = createSlider(0, 2, 1, 0.1)
    cohesionLabel = createDiv('Cohesion')
    cohesionSlider = createSlider(0, 2, 1, 0.1)
    separationLabel = createDiv('Separation')
    separationSlider = createSlider(0, 2, 1, 0.1)
    //perceptionLabel = createDiv('Perception Angle')
    //perceptionSlider = createSlider(0, 180, 90, 5)
    perceptionLabel = createDiv('Perception Radius')
    perceptionRadiusSlider = createSlider(0, 200, 100, 10)
    trailBox = createCheckbox('Trails', false)
    for (let i = 0; i < 100; i++){
    boids.push(new Boid())
    }
}

function draw(){
    background(51)
    for(let boid of boids){
        boid.edges()
        boid.flock(boids)
        boid.update()
        boid.show()
    }
}