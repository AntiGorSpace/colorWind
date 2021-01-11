let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

let nstepsx = 80;

if(window.innerWidth < window.innerHeight){
    nstepsx = 30;
}

let xi = 0,
    yi = 0,
    border = 0,
    stepx = (window.innerWidth)/nstepsx,
    nstepsy,
    stepy,
    canvasArray = [];


for (let i=0; i<nstepsx; i++){
    canvasArray.push([]);
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stepx = (window.innerWidth)/nstepsx,
    nstepsy = Math.trunc(window.innerHeight/stepx);
    stepy = (window.innerHeight)/nstepsy;

    if (canvasArray[0].length<nstepsy){
        canvasArray.forEach(i => {
            for (let k=0; k<nstepsy; k++){
                i.push([125,125,125]);
            }
        });
    }
    if (canvasArray[0].length>nstepsy){
        canvasArray.forEach(i => {
            for (let j of i){
                for (let k=canvasArray[0].length ; k<nstepsy; k++){
                    canvasArray.pop();
                }
            }
        });
    }
    draw();
}
    

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);  
    for (let i=0; i<nstepsx; i++){
        for (let j=0; j<nstepsy; j++){
            xi = stepx*(i);
            yi = stepy*(j);
            context.fillStyle = `rgb(${canvasArray[i][j][0]}, ${canvasArray[i][j][1]}, ${canvasArray[i][j][2]})`;
            context.fillRect(xi+border/2, yi+border/2, stepx-border, stepy-border); 
        }
    }
    context.fillStyle = `rgba(255, 255, 255, 0.1)`;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight); 
}

function shuffle(array){
    let counter = 0,
        range = 20,
        max = 220,
        min = 50;
    array.forEach(element => {
        counter = counter+element;
    });
    counter = counter/array.length + (Math.random()*range-range/2);
    if (counter>max){
        counter=max-range;
    }else if (counter<min){
        counter=min+range;
    }
    return counter;
}

function colored(callback) {
    canvasArray[0][0] = [shuffle([canvasArray[0][0][0]]),
    shuffle([canvasArray[0][0][1]]),
    shuffle([canvasArray[0][0][2]])
                        ];
    for (let j =1; j< nstepsx; j++){
        canvasArray[j][0] = [shuffle([canvasArray[j-1][0][0],canvasArray[j][0][0]]),
        shuffle([canvasArray[j-1][0][1],canvasArray[j][0][1]]),
        shuffle([canvasArray[j-1][0][2],canvasArray[j][0][2]])
                            ];
    }
    
    for (let i = 1; i< nstepsy; i++){
        canvasArray[0][i] = [shuffle([canvasArray[0][i-1][0],canvasArray[0][i][0]]),
        shuffle([canvasArray[0][i-1][1],canvasArray[0][i][1]]),
        shuffle([canvasArray[0][i-1][2],canvasArray[0][i][2]])
                            ];
        for (let j = 1; j< nstepsx; j++){
            canvasArray[j][i] = [shuffle([canvasArray[j-1][i-1][0],canvasArray[j][i-1][0],canvasArray[j-1][i][0],canvasArray[j][i][0]]),
            shuffle([canvasArray[j-1][i-1][1],canvasArray[j][i-1][1],canvasArray[j-1][i][1],canvasArray[j][i][1]]),
            shuffle([canvasArray[j-1][i-1][2],canvasArray[j][i-1][2],canvasArray[j-1][i][2],canvasArray[j][i][2]])
                                ];
        }
    }
    draw();
}


//Надо поставить ограничение на рост значений
//Надо разобраться с ресайзом

window.onload = function() {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
};

setInterval(colored, 100);








