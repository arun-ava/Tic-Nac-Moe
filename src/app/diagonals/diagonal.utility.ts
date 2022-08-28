export function getMajorDiagonalLine(){
    let line = new HTMLDivElement()
    line.style.position = 'absolute';
    line.style.transform = 'rotate(45deg)';
    line.style.translate =  '-15px 25px';
    line.style.height = '0px';
    line.style.width = '9.5vw';
    line.style.borderTop = '5px solid black';
    return line;
}

export function getMinorDiagonalLine(){
    let line = new HTMLDivElement()
    line.style.position = 'absolute';
    line.style.transform = 'rotate(135deg)';
    line.style.translate =  '-15px 25px';
    line.style.height = '0px';
    line.style.width = '9.5vw';
    line.style.borderTop = '5px solid black';
    return line;
}

export function getHorizontalLine(){
    let line = new HTMLDivElement()
    line.style.position = 'absolute';
    line.style.translate =  '-5px 25px';
    line.style.height = '0px';
    line.style.width = '9.5vw';
    line.style.borderTop = '5px solid black';
    return line;
}

export function getVerticalLine(){
    let line = new HTMLDivElement()
    line.style.position = 'absolute';
    line.style.translate =  '-15px 20px';
    line.style.height = '0px';
    line.style.width = '9.5vw';
    line.style.borderTop = '5px solid black';
    return line;
}