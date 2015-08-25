function highlight() {
  var teacher = document.getElementById('teachertab');
  teacher.style.backgroundColor = "rgb(124, 124, 124)";
  teacher.style.color = "white";
}

function selected(element) {
  var tab = document.getElementById(element.id);
  var unameplaceholder = document.getElementById('username');
  console.log(tab.id);
  tab.style.backgroundColor = "rgb(124, 124, 124)";
  tab.style.color = "white";
  tab.style.zIndex = 1;
  if (element.id == "teachertab") {
    blurit("studenttab");
    unameplaceholder.placeholder = "Teacher ID";
    currentId = "Teacher ID"
  }
  else {
    blurit("teachertab");
    unameplaceholder.placeholder = "Student ID";
    currentId = "Student ID"
  }
}

function blurit(elementId) {
  var tab = document.getElementById(elementId);
  tab.style.backgroundColor = "rgb(233, 233, 233)";
  tab.style.color = "rgb(124, 124, 124)";
  tab.style.zIndex = 0;
}

// $('input:text, textarea').each(function(){
//     var $this = $(this);
//     $this.data('placeholder', $this.attr('placeholder'))
//          .focus(function(){$this.removeAttr('placeholder');})
//          .blur(function(){$this.attr('placeholder', $this.data('placeholder'));});
// });
