# Hudge Template 
Hudge Template Engine by - Fahid Mohammad

### Description
Hudge is a lightweight JavaScript template engine with a footprint of 1kb inspired by the article writen by [Krasimir Tsone].

### Basic Usage
Include source to your project
```html
<script src="hudge.js"></script>
```
Dynamic template with hudge markdown **(template.hudge)**
```html
<script type="text/x-tmpl" id="your-template-id">  
  <head>
    <title>{%=_h.title %}</title>
  </head>
  <body>
    <h1>{%= _h.headings %}</h1>
  </body>
</script>
```
Static Html page
```html
<html id="loadTemplate"></html>
```
Load dynamic template using jQuery to hudge with data object
```js
var data = {
  title:'My Title',
  headings:'Hudge Template Engine',
};
$.get('template.hudge',{},function(template){
  template = $(template);
  var target = $('#loadTemplate');
  var template =hudge(template.filter(template).html(),data);
  target.empty().append(template);
});
```
[Krasimir Tsone]: <http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line>
