// tinymce.init({
//   selector: "textarea",
//   twQuickButtons : { //ADD ANYTHING you want with the qb- prefix to avoid chaotic inflamation
//     tags: "h1, h2, h3, h4, h5, h6, code:code, pre, blockquote", //tag_name:icon_to_use
//     sample_text: "TEXT",
//     replaceNameWithIcon: true,
//     loadCSS: 1, //loads a small inline CSS rule to make the buttons bolder
//     tooltip: 'Insert ' //set to 0 to disable (will resolve to Insert <tagname>)
//   },
  
//   toolbar: "qb-h1, qb-h2, qb-h3, qb-h4, qb-code, qb-pre, qb-blockquote",
//   toolbar: "qb-h1, qb-h2, qb-h3, qb-h4, qb-code, qb-pre, qb-blockquote",
//   contextmenu: "qb-h1, qb-h2, qb-h3, qb-h4, qb-code, qb-pre, qb-blockquote",
// });

tinymce.PluginManager.add("twQuickButtons", function(editor) {
  var twQuickButtonsCSS = '<style id="twQuickButtonsCSS">.mce-twQuickButtonsCSS .mce-txt{font-weight:bold;text-transform:uppercase;font-size:larger}</style>';
  var twQuickButtons = editor.getParam("twQuickButtons",{}).tags || "h1, h2, h3, h4, h5, h6, code:code, pre, blockquote";
  twQuickButtons = twQuickButtons.split(',');
  var sample_text = editor.getParam("twQuickButtons",{}).sample_text || "TEXT";
  var replaceNameWithIcon = editor.getParam("twQuickButtons",{}).replaceNameWithIcon || true;
  var tooltip = "";
  if(!$("#twQuickButtonsCSS").length && editor.getParam("twQuickButtons",{}).loadCSS !== 0){
    $('head').append(twQuickButtonsCSS);
  }
  if(editor.getParam("twQuickButtons",{}).tooltip && editor.getParam("twQuickButtons",{}).tooltip !== 0){
    tooltip = editor.getParam("twQuickButtons",{}).tooltip;
  }
  else if(editor.getParam("twQuickButtons",{}).tooltip !== 0){
    tooltip = "Insert ";
  }
  else if(editor.getParam("twQuickButtons",{}).tooltip == 0){
    tooltip = "";
  }
  var insertHTMLtag = function(editor,firstPart,lorem,lastPart) {
    var range = editor.selection.getContent();
    if (range.trim() !== '') {
      lorem = range.trim();
    }
    editor.undoManager.transact(function() {
      editor.selection.setContent(firstPart+lorem+lastPart);
    });
  };
  editor.on("init", function(){
    editor.settings.twQuickButtons = true;
  });
  twQuickButtons.forEach(function(name, index) {
    var numTag, icon, openTag, closeTag;
    index = index + 1;
    numTag = "#".repeat(index) + " ";
    name = name.replace(/ /g, "");
    icon = name.split(':')[1] || "";
    name = name.split(":")[0];
    name = name.toLowerCase();
    // openTag = "<"+name+">"; //can tweaked for those tags that do what they do differently
    // closeTag = "</"+name+">"; //can tweaked for those tags that do what they do differently
    editor.addMenuItem("qb-" + name, {
      text: name.toLowerCase(),
      icon: icon,
      tooltip: tooltip ? tooltip + name : "",
      classes: "twQuickButtonsCSS",
      onClick: function() {
        if(editor.getParam('twExoticMarkdownEditor', false)){
           insertHTMLtag(editor, numTag, "", "");
        }
        else{
          editor.execCommand("mceToggleFormat", false, name);
        }
      },
      onPostRender: function() {
        var self = this, setup = function() {
          editor.formatter.formatChanged(name, function(state) {
            self.active(state);
          });
        };
        editor.formatter ? setup() : editor.on("init", setup);
      }
    });
    editor.addButton("qb-" + name, {
      text: (replaceNameWithIcon && icon) ? '' : name.toLowerCase(),
      icon: icon,
      tooltip: tooltip ? tooltip + name : "",
      classes: "twQuickButtonsCSS",
      onClick: function() {
        if(editor.getParam('twExoticMarkdownEditor', false)){
           insertHTMLtag(editor, numTag, "", "");
        }
        else{
          editor.execCommand("mceToggleFormat", false, name);
        }
      },
      onPostRender: function() {
        var self = this, setup = function() {
          editor.formatter.formatChanged(name, function(state) {
            self.active(state);
          });
        };
        editor.formatter ? setup() : editor.on("init", setup);
      }
    });
  });
});
