# variables.js

# Getting Started
#### 1 . Download the ```variables.js``` file
#### 2 . Link ```variables.js``` with your html file. 
```html
 <script src="variables.js"></script>
```
#### 3 . Create javascript variable 
```html
<script>
 var variable =  "Hello World !";
</script>
```

#### 4 . Display your variable in the html

```html
<var>variable</var>
```

#### 5 . Fill variables with their corresponding values
past this code at the end of the body element.
```html
<script>
  vars = new Variables("var");
  vars.fill();
</script>
```
#### Example

my_file.js
```javascript
var variable =  "Hello World !";
var object = {
  title : "Super Heroes !",
  array : [
    {id: "Deadpool", names : ["Wade Wilson","wiwi"]},
    {id: "BlackPanther", names :["T'Challa"]},
  ]
}
```
index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="variables.js"></script>
    <script src="my_file.js"></script>
  </head>
  <body>
    <var>variable</var> <br>
    <var>variable="Oups !.."</var> <br>
    <hr>
    <var data-loop="object.array">
      <h2><i><var>id</var></i></h2> 
      <p>
        <i>
          <var data-loop="names">
            <var></var>,
          </var>
        </i>
      </p>
    </var>
    <script>
      vars = new Variables("var");
      vars.fill();
    </script>
 </body>
</html>
```

The last part in the previous code allows you to fill variables with their corresponding values.
```html
    <script>
      vars = new Variables("var");
      vars.fill();
    </script>
```

```Variables("var")``` specify that you want to use ```var``` tags to display your variables. 

```vars.fill()``` fill each variable with it corresponding values.

# Advanced features 
