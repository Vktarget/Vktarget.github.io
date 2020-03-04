function on(n) {   
  jQuery('#text'+n).css('display' ,'block'); 
  jQuery('#ontext'+n).css('display' ,'none');  
  jQuery('#offtext'+n).css('display' ,'inline'); 
} 

function off(n) {  
  jQuery('#text'+n).css('display' ,'none'); 
  jQuery('#ontext'+n).css('display' ,'inline'); 
  jQuery('#offtext'+n).css('display' ,'none'); 
}

// проверка задани€
function assignmentCheck(id) {
  $("#assignmentCheck" + id).html("<span class='check_processing'>»дет проверка... <img src='../../design/images/loading.gif' alt=''/></span>");
  $.ajax({
      type: "GET",
      url: "../../data/assignments.php?i=check",
      data: {id: id},
      cache: false,
      success: function(html){
      $("#assignmentCheck" + id).html(html);
    }
  });
  
  // загрузка баланса
  $.ajax({  
      url: "../../data/user.php?i=points",  
      cache: false,
      success: function(html){  
          $("#content_points").html(html);
      }  
  });
}

// проверка нарушенного задани€
function assignmentReCheck(id, log_id) {
  $("#assignmentReCheck" + id).html("<p style='color: #265f9b;'>»дет проверка... <img style='margin: 5px 0 0 5px;' src='../../design/images/loading.gif' alt=''/></p>");
  $.ajax({
      type: "GET",
      url: "../../data/assignments.php?i=recheck",
      data: {id: id, log_id: log_id},
      success: function(html){
      $("#assignmentReCheck" + id).html(html);
    }
  });
  
  // загрузка баланса
  $.ajax({  
      url: "../../data/user.php?i=points",  
      cache: false,
      success: function(html){  
          $("#content_points").html(html);
      }  
  });
}

// переход по ссылке
function goLink(id) {
  w = window.open();
  w.document.write('<meta http-equiv="refresh" content="0;url=../../data/assignments.php?i=golink&id='+id+'">');
  w.document.close();
  return false;
}

// скрытие задани€
$(document).ready(function(){
  $(".job a[id=hidden]").bind("click", function(){
    var p = confirm("¬ы уверены, что хотите скрыть это задание?");
    var id = $(this).parent().parent().attr("id");
    if(p){
      $.ajax({
        type: "GET",
        url: "../../data/assignments.php?i=hidden",
        data: {object_id: id},
        success: function(html_response){
            $("#"+id).hide();
        },
        error: function(data) {
            alert('ќшибка загрузки');
        },
        beforeSend:function(){}
      });
    }
    return false;
  });
  
   (function () {
        var $input = $('.js-project-name-input');
        $('[name=project_id]').change(function() {
            if (this.value == '-1')
                $input.show();
            else
                $input.hide();
        })
    })();
});