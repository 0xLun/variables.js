/*

MIT License

Copyright (c) 2020 Evenson Jeunesse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/*
BE CAREFUL !!!!!! This library might spoil your SEO efforts because search engine's bots may not execute javascript.

*/


class Variables{

  constructor(tag="var", keep_tag=false, html=true){
    this.keep_tag = keep_tag; //if you want to preserve the variable tag after treatment
    this.html = html; //if you want html tag to not be escaped
    this.tag = tag; //HTML to consider as a variable
    this.prepare_document();
    this.logs = ""; //logs buffer

  }

  //append data in the log's buffer
  log(string){
    this.logs += "\n\n"+string;
  }

  //setting the document (css and events) to make sure the library will work well without
  //arming host's program
  prepare_document(){
    var style = document.createElement("style");
    style.innerHTML = "\
      var{font-size: inherit !important; font-style: inherit !important; margin: 0px !important; }\
    ";
    document.body.appendChild(style);
    //  window.onload =  this.execute;
  }

  //clean some css that may have modified textContent
  set_tag_css(elements){
    for (var i = 0; i < elements.length; i++) elements[i].style.textTransform = "none";
  }

  // Remove all useless css that was added during treatment
  remove_tag_css(){
    var els = document.getElementsByTagName(this.tag);
    for (var i = 0; i < els.length; i++) els[i].removeAttribute('style');
  }

  //replace all variable tags by their textContent evaluation.
  // allows transformation from text to javascript object/variable.
  render_tags(){
       var els = Array.from(document.getElementsByTagName(this.tag));
       var to_remove = [];
       this.set_tag_css(els);
       var el;
       for(var i=0; i < els.length; i++){
         try {
           if(this.html){
             if(this.keep_tag) els[i].insertAdjacentHTML("beforebegin", "<var>"+eval(els[i].textContent)+"</var>");
             else els[i].insertAdjacentHTML("beforebegin", eval(els[i].textContent));
             to_remove.push(els[i]);
           }
           else{
<<<<<<< HEAD
              if(this.keep_tag) els[i].innerHTML(eval(els[i].textContent));
              else els[i].replaceWith(document.createTextNode(eval(els[i].textContent)));
           }
        }catch(error){console.error(error);}
=======
            els[i].replaceWith(document.createTextNode(eval(els[i].textContent)));
           } 
        }catch(error){/*console.error(error);*/}
>>>>>>> c1c7dbd22176802028548e73387cff61c848889f
       }
       for(var i=0; i < to_remove.length; i++){
         to_remove[i].remove();
       }
       this.remove_tag_css();
  }

  //Allows usage of loops
  //Allow to render recursively all occurence in an array
  // <var data-loop="<array_object_name>">.....</var>
  render_loops(){
    var loop_els = document.querySelectorAll('[data-loop]');
    for(var i=0; i < loop_els.length; i++){
      try {
        this.loop_fill(loop_els[i], loop_els[i].getAttribute('data-loop'));
      }catch(error){/*console.error(error);*/}
    }
  }

  //given a loop element , this fonction will fill and render elements inner it.
  loop_fill(loop, string){

    var loop_again = false;
    var prefix;
    var replica = loop.innerHTML;
    loop.innerHTML = "";
    var array = eval(string);

    for(var i=0; i < array.length; i++){
      prefix = string+"["+i+"]";
      var node = document.createElement('div');
      node.innerHTML = replica;
      var els = Array.from(node.getElementsByTagName(this.tag));
      loop_again = this.parse(els, prefix);
      try{loop.insertAdjacentHTML("beforebegin", node.innerHTML);}
      catch(error){console.log(error);}
      }
    loop.remove();
    return loop_again;
  }

  //transform loops tags in several simple variable tags using the array name (prefix) given in the
  //data-loop attribute. If several loops are nested. A recursive call to loop_fill is used.
  parse(els, prefix){
    var loop_again = false;
    for(var t=0; t < els.length; t++){
      var str = els[t].getAttribute('data-loop');
      if(!els[t].getAttribute('data-done')){
        //if the element is a loop itself
        if(str){
          els[t].setAttribute('data-loop', prefix+"."+str);//propagation of information
          this.loop_fill(els[t], prefix+"."+str);
          loop_again = true;
        }
        //if the element contain a attribute. it's a dictionnary
        else if(els[t].textContent) els[t].innerHTML = prefix+"."+els[t].textContent+";";

        //if the element is empty --> it's an classic array !
        else els[t].innerHTML = prefix+";";
      }
      //mark the element as already analysed
      //!els[t].getAttribute('data-done') avoid double checking of an element when we do $tag(this.tag);
      // I should find a way to avoid that
      els[t].setAttribute('data-done',1);
  }
  return loop_again;
}

  //fill variable tags whith their corresponding values
  fill(){
    this.render_loops();
    this.render_tags();
  }
}
