const boids = []

let alignSlider, cohesionSlider, separationSlider, perceptionRadius

function setup(){
    createCanvas(1280,720)
    createDiv()
    alignmentLabel = createSpan('Alignment')
    cohesionLabel = createSpan('Cohesion')
    separationLabel = createSpan('Separation')
    //perceptionLabel = createSpan('Perception Angle')
    perceptionLabel = createSpan('Perception Radius')
    createDiv()
    alignmentSlider = createSlider(0, 2, 1, 0.1)
    cohesionSlider = createSlider(0, 2, 1, 0.1)
    separationSlider = createSlider(0, 2, 1, 0.1)
    //perceptionSlider = createSlider(0, 180, 90, 5)
    perceptionRadiusSlider = createSlider(0, 200, 100, 10)
    trailBox = createCheckbox('Trails', false)
    resetButton = createButton('Reset')
    resetButton.mouseClicked(reset)
    makeBoids() 
}

function makeBoids(){
    for (let i = 0; i < 100; i++){
        boids.push(new Boid())
    }
}

function reset(){
    boids.splice(0,boids.length)
    makeBoids()
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