maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,1,1,1],
    ['p',0,0,1,0,1,0,0,0,1],
    [1,1,1,0,0,1,0,1,0,1],
    [1,1,1,0,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,1,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,1,1],
    [1,0,0,0,1,1,'F',1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
]

var el = document.getElementById('world');

function draw_maze() {
    document
        .getElementById('world')
        .innerHTML = "";
    for (var i = 0; i < maze.length; i++) {
        for (var j = 0; j < maze[i].length; j++) {
            if (maze[i][j] == 1) {
                document
                    .getElementById('world')
                    .innerHTML += "<div class='base wall'></div>";
            } else if (maze[i][j] == 0) {
                document
                    .getElementById('world')
                    .innerHTML += "<div class='base jalanyangbisadilewati'></div>";
            } else if (maze[i][j] == 'p') {
                document
                    .getElementById('world')
                    .innerHTML += "<div class='base jalan'></div>";
            } else if (maze[i][j] == 'F') {
                document
                    .getElementById('world')
                    .innerHTML += "<div class='base finish'></div>";
            } else {
                document
                    .getElementById('world')
                    .innerHTML += "<div class='base'></div>";
            }
        }
        el.innerHTML += "<br>";
    }
}
kondisijalan = true;
draw_maze();
jalan = {
    tag: 0,
    x: 0,
    y: 0
};
pattern=[];
Alur =[];
locakisudahdipakai = [];
function searchcurrentlocP() {
    cek = false;
    for (let i = 0; i < maze.length; i++) {
        temp = [];
        if (maze[i].indexOf('p') != -1) {
            jalan.y=maze[i].indexOf('p');
            jalan.x=i;
            locakisudahdipakai.push(jalan);
            return true;
        }    
    }
    if (cek==false) {
        return false;
    }
} 

function kanan(x, y) { //kode 6
    
    maze[x][y] = 'jalur';
    return maze[x][y + 1];
}
function kiri(x, y) { //kode 4
    
    maze[x][y] = 'jalur';
    return maze[x][y - 1];
}
function atas(x, y) { //kode 8
    
    maze[x][y] = 'jalur';
    return maze[x - 1][y];
}
function bawah(x, y) { //kode 2
    
    maze[x][y] = 'jalur';
    return maze[x + 1][y];
}
function searchmovenext(params) {
    searchcurrentlocP();
    console.log('titik awal = ', jalan.x, ' ', jalan.y);
    if (atas(jalan.x, jalan.y) == 0) {
        Alur.push(8);
        console.log('masuk atas');
        return move(jalan.x - 1, jalan.y);
    } else if (bawah(jalan.x, jalan.y) == 0) {
        Alur.push(2);
        console.log('masuk bawah');
        return move(jalan.x + 1, jalan.y);
    } else if (kanan(jalan.x, jalan.y) == 0) {
        Alur.push(6);
        console.log('masuk kanan');
        return move(jalan.x, jalan.y + 1);
    } else if (kiri(jalan.x, jalan.y) == 0) {
        Alur.push(4);
        console.log('masuk kiri');
        return move(jalan.x, jalan.y-1);
    } else {
        console.log('gabisa gerak bos');
        kondisijalan=false;
        return false
    }
}
function backtrack(lastindex) {
    searchcurrentlocP();
    if (lastindex == 6) {
        Alur.pop();
        console.log('Alur baru = ',Alur);
        kondisijalan =true;
        move(jalan.x,jalan.y-1);
    }else if (lastindex == 4) {
        Alur.pop();
        console.log('Alur baru = ',Alur);
        kondisijalan =true;
        move(jalan.x,jalan.y+1);
    }else if (lastindex == 2) {
        Alur.pop();
        console.log('Alur baru = ',Alur);
        kondisijalan =true;
        move(jalan.x-1,jalan.y);
    }else if (lastindex == 8) {
        Alur.pop();
        console.log('Alur baru = ',Alur);
        kondisijalan =true;
        move(jalan.x+1,jalan.y);
    }
}
function move(x, y) {
    console.log('nilai x y= ', x, ' ', y);
    searchcurrentlocP();
    maze[x][y] = 'x';
    jalan.x = x;
    jalan.y = y;
    maze[x][y] = 'p';
    draw_maze();
    console.log(maze[2])
    searchcurrentlocP();
    console.log(jalan.x, jalan.y);
    console.log(locakisudahdipakai);
    console.log(locakisudahdipakai[1]);
}
function next() {
    if (kondisijalan) {
        searchmovenext();
        console.log(maze);
        console.log('Alur = ',Alur);
    }else{
        lastindex = Alur[Alur.length-1];
        console.log(lastindex);
        backtrack(lastindex);
    }
    
}
