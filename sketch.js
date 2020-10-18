const boids = []

let alignSlider, cohesionSlider, separationSlider, perceptionRadius

function setup(){
    var canvas = createCanvas(1280,720)
    canvas.parent('sketch-div')
    alignmentLabel = createSpan('Alignment')
    alignmentLabel.parent('labels')
    cohesionLabel = createSpan('Cohesion')
    cohesionLabel.parent('labels')
    separationLabel = createSpan('Separation')
    separationLabel.parent('labels')
    //perceptionAngleLabel = createSpan('Perception Angle')
    //perceptionAngleLabel.parent('labels')
    perceptionRadiusLabel = createSpan('Perception Radius')
    perceptionRadiusLabel.parent('labels')

    alignmentSlider = createSlider(0, 2, 1, 0.1)
    alignmentSlider.parent('sliders')
    cohesionSlider = createSlider(0, 2, 1, 0.1)
    cohesionSlider.parent('sliders')
    separationSlider = createSlider(0, 2, 1, 0.1)
    separationSlider.parent('sliders')
    //perceptionAngleSlider = createSlider(0, 180, 90, 5)
    //perceptionAngleSlider.parent('sliders')
    perceptionRadiusSlider = createSlider(0, 200, 100, 10)
    perceptionRadiusSlider.parent('sliders')

    trailBox = createCheckbox('Trails (Dont work right now)', false)
    trailBox.parent('checkBoxes')
    resetButton = createButton('Reset')
    resetButton.parent('buttons')
    resetButton.mouseClicked(reset)
    resetButton.size(100,AUTO)
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
        //boid.showTrail()
    }
}