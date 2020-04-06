/*------VARIABILE GLOBALE IMMAGINE -> THIS.IMG-------*/
let img;

class ImageElement {
  constructor(count, x, y, bw, bh) {
    //id
    this.i = count;
    this.name = 'i_' + count;
    //x, y 
    this.x = x * w + padding + gap/2;
    this.y = y * h + padding*2;
    this.offsetX = 0;
    this.offsetY = 0;
    //height, width
    this.colH = bh;
    this.colW = bw;
    this.h = bh * h;
    this.w = bw * w - gap;
    //content
    this.img;
    this.hover = false;
    this.dragging = false;
    
    /*
      Containers
    */
    //Element
    let el_container = document.createElement('div');
    el_container.classList = 'el_container';
    el_container.id = 'el_container' + this.name;    
    //Elements
    let elements_container = document.querySelector("#elements_container");
    elements_container.appendChild(el_container);
    
    /*
     Settings
    */
    /*-----CALLBACK TO HANDLE FILE------*/
    let el_content = createFileInput(this.handelFile).id(this.name + '-file');
    el_content.parent(el_container.id);
    let el_settings = document.createElement('div');
    el_settings.id = 'el_settings' + this.name;
    el_container.appendChild(el_settings);
    
    //Settings
    let el_width = createInput(this.colW, 'number').id(this.name + '-width').attribute('min', '1').attribute('max', colV).parent(el_settings.id);
    let el_height = createInput(this.colH, 'number').id(this.name + '-height').attribute('min', '1').attribute('max', colH).parent(el_settings.id);
    //REMOVE
    let removeButton = document.createElement('button');
    removeButton.classList = "remove";
    removeButton.innerHTML = "× Rimuovi";
    removeButton.setAttribute('parentId', this.name);
    removeButton.onclick = function(){removeElement(this);};
    el_settings.appendChild(removeButton);

   }
  
  over() {
    // Is mouse over object
    if (mouseX > this.x - draggerSize && mouseX < this.x + draggerSize*2 && mouseY > this.y - draggerSize && mouseY < this.y + draggerSize*2){
      this.hover = true;
    } else {
      this.hover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = round((mouseX + this.offsetX)/w) * w + padding + gap/2;
      this.y = round((mouseY + this.offsetY)/h) * h + padding*2;
    }
    
    this.h = document.getElementById(this.name + '-height').value * h;
    this.w = document.getElementById(this.name + '-width').value * w - gap; 
  }

  show() {
    if(img){
      let prop = img.width/this.w;
      let propH = img.height/this.h;
      image(img, this.x, this.y, this.w, this.h, 0, 0, propH*this.w, prop*this.h);
    }else{
       fill('rgba(200, 200, 200, 0.25)');
       noStroke();
       rect(this.x, this.y, this.w, this.h);
    }
    
    if(!rec && grid){
      fill('rgba(200, 0, 140, .25)');
      ellipse(this.x, this.y, draggerSize*2, draggerSize*2);
    }
  }
  
  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x - draggerSize && mouseX < this.x + draggerSize*2 && mouseY > this.y - draggerSize && mouseY < this.y + draggerSize*2) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
  /*-----HANDLE FILE------*/
   handelFile(file) {
    if (file.type === 'image') {
      let i = createImg(file.data, '');
      img = i;
      i.hide();
    }
  }
}
