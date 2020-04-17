class TextElement {
  constructor(count, x, y, bw, bh, fontSize, content) {
    //id
    this.type = "text";
    this.i = count;
    this.name = 't_' + count;
    // x, y
    this.colX = x;
    this.colY = y;
    this.x = x * w + padding + gap/2;
    this.y = y * h + padding*2;
    this.offsetX = 0;
    this.offsetY = 0;
    // height, width
    this.colH = bh;
    this.colW = bw;
    this.h = bh * h;
    this.w = bw * w - gap;
    //content
    this.txt = content;
    this.fs = fontSize;
    this.fontSize = this.checkfontsize(fontSize);
    //check
    this.hover = false;
    this.dragging = false;
    this.dragger = 15;
    this.remove = false;


    /*
      Containers
    */
    //Element
    let el_container = document.createElement('div');
    el_container.classList = 'el_container isDraggable';
    el_container.id = 'el_container' + this.name;    
    //Elements
    let elements_container = document.querySelector("#elements_container");
    elements_container.appendChild(el_container);
    
    /*
      Dragging handle
    */
    let el_handle = document.createElement('div');
    el_handle.classList = 'handle';
    el_handle.innerHTML = "=";
    el_container.appendChild(el_handle);

    /*
     Settings
    */
    let el_content = createElement('textarea', this.txt).id(this.name + '-input');
    el_content.parent(el_container.id);
    let el_settings = document.createElement('div');
    el_settings.id = 'el_settings' + this.name;
    el_container.appendChild(el_settings);
    
    /*
     Settings
    */
    //WIDTH
    let el_width = createInput(this.colW, 'number').id(this.name + '-width').attribute('min', '1').attribute('max', colV);
    el_width.parent(el_settings.id);
    //TEXTSIZE
    let el_textSize = createSelect().id(this.name + '-fontSize');
    el_textSize.option('Testo grande');
    el_textSize.option('Testo');
    el_textSize.option('Titolo');
    el_textSize.option('Didascalia');
    el_textSize.changed(redraw);
    el_textSize.parent(el_settings.id);
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
      this.x = round((mouseX + this.offsetX)/w)*w + padding + gap/2;
      this.y = round((mouseY + this.offsetY)/h)*h + padding*2;
      this.colX = round((this.x - (padding + gap/2)) / w);
      this.colY = round((this.y - (padding + padding)) / h);
    }
  }

  show() {  
    if(!this.remove){
      this.txt = document.getElementById(this.name + '-input').value;
      this.fontSize = this.checkfontsize(document.getElementById(this.name + '-fontSize').value);
      this.w = document.getElementById(this.name + '-width').value * w - gap;
      
      if(!rec && grid){
        fill('rgba(0, 180, 255, 0.1)');
        rect(this.x, this.y, this.w, this.h);
      }
      
      fill(0);
      noStroke();
      textSize(this.fontSize);
      if(this.fontSize == 15){
        textStyle(ITALIC);
      }else{
        textStyle(NORMAL);
      }
      text(this.txt, this.x, this.y + this.fontSize/1.5, this.w);    
      if(!rec && grid){
        fill('rgba(200, 0, 140, 0.25)');
        ellipse(this.x, this.y, draggerSize*2, draggerSize*2);
      }
    }
  }
  
  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x - draggerSize && mouseX < this.x + draggerSize*2 && mouseY > this.y - draggerSize && mouseY < this.y + draggerSize*2 && !draggingElement) {
      this.dragging = true;
      draggingElement = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
    draggingElement = false;
  }
  
  checkfontsize(fontSize){
    if(fontSize == 't' || fontSize == 'Titolo'){
      return 39;
    }else if(fontSize == 'd' || fontSize == 'Didascalia'){
      return 15;
    }else if(fontSize == 'tg' || fontSize == 'Testo grande'){
      return 26;
    }else{
      return 18;
    }
  }
}
