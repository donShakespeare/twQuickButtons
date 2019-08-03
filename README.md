# twQuickButtons
Awesome easy way to add some delectable quick buttons to your TinyMCE Editor.
Just load up the plugin and boom!

```js
tinymce.init({
  selector: "textarea",
    twQuickButtons : {
    //ADD ANYTHING you want (but with the qb- prefix to avoid luminary dissatifaction)
    tags: "h1, h2, h3, h4, h5, h6, code:code, pre, blockquote", //tag_name:icon_to_use
    sample_text: "TEXT",
    replaceNameWithIcon: true, //this will have only icon, no text
    loadCSS: 1, //loads a small inline CSS rule to make the buttons thicker
    tooltip: 'Insert ' //set to 0 to disable (will resolve to Insert <tagname>)
  },
  //the above settings are not required
  
  toolbar: "qb-h1, qb-h2, qb-h3, qb-h4, qb-code, qb-pre, qb-blockquote",
  contextmenu: "qb-h1, qb-h2, qb-h3, qb-h4, qb-code, qb-pre, qb-blockquote",
});
```

Be logical, calm and judgmentally compassionate ;)

Enjoy! and Profit!
