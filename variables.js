

class Variables{
  constructor(tag="var"){
    this.tag = tag;
  //  window.onload =  this.execute;
  }

  render_tags(){
       var els = Array.from(document.getElementsByTagName(this.tag));
       var remove = [];
       var el;
       for(var i=0; i < els.length; i++){
         //els[i].parentNode.insertBefore(document.createTextNode(window[els[i].innerText]), els[i]);
         try {
             els[i].parentNode.insertBefore(document.createTextNode(eval(els[i].innerText)), els[i]);
             remove.push(els[i]);
        }catch(error){console.error(error);}
       }
       for(var i=0; i < remove.length; i++) remove[i].remove();
     }

     render_loops(){
       var loop_els = document.querySelectorAll('[data-loop]');
       for(var i=0; i < loop_els.length; i++){
         this.loop_fill(loop_els[i], loop_els[i].getAttribute('data-loop'));
       }
     }

     loop_fill(loop, string){
       console.log(string);
       console.log(loop);
       var loop_again = false;
       var prefix;
       var replica = loop.innerHTML;
       var array = eval(string);
       console.log(replica);
       //console.log(array);

       loop.innerHTML = "";
       for(var i=0; i < array.length; i++){
         prefix = string+"["+i+"]";
          var node = document.createElement('div');
          node.innerHTML = replica;
          var els = Array.from(node.getElementsByTagName(this.tag));
          console.log("Traitement");
          console.log(els);
          console.log(string+"-----------"+els.length);
          loop_again = this.parse(els, prefix);
          try{loop.insertAdjacentHTML("beforebegin", node.innerHTML);}
          catch(error){console.log(error);}
          }
       loop.remove();
       console.log("endof"+string);
       console.log(loop_again);
       return loop_again;
     }


     parse(els, prefix){
       console.log(els);
       var loop_again = false;
       for(var t=0; t < els.length; t++){
         console.log(prefix+"____________"+t);
         console.log(els[t].innerHTML);
         var str = els[t].getAttribute('data-loop');
         console.log("témoin"+str);
         if(!els[t].getAttribute('data-done')){
           if(str){//if the element is a loop itself
             els[t].setAttribute('data-loop', prefix+"."+str);//propagation of information
             console.log(t+"loop>>>>>>>");
             this.loop_fill(els[t], prefix+"."+str);
             console.log(t+"enthis.render_loops>>>>>>>");
             //els[t].innerHTML = prefix+"."+str;
             loop_again = true;
           }
           //if the element contain a attribute. it's a dictionnary
           else if(els[t].innerText){
             console.log("Inner-text"+prefix+"."+els[t].innerText+";")
             els[t].innerHTML = prefix+"."+els[t].innerText+";";
           }
           //if the element is empty --> it's an classic array !
           else{
             console.log(";end");
             els[t].innerHTML = prefix+";";
           }
         }
         //mark the element as already analysed
         //!els[t].getAttribute('data-done') avoid double checking of an element when we do $tag(this.tag);
         // I should find a way to avoid that
         els[t].setAttribute('data-done',1);
     }
     return loop_again;
    }


    fill(){
      this.render_loops();
      this.render_tags();
    }
}

var logs = "";

var $l = console.log;
var $tag = document.getElementsByTagName;
var $class = document.getElementsByClassName;
var $id = document.getElementById;
var $attr = document.querySelectorAll;
