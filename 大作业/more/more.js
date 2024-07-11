document.addEventListener('DOMContentLoaded', function() {
   var hoverAreas = document.querySelectorAll('.hover-area');
   // 鼠标进入区域时
   hoverAreas.forEach(function(area) {
       area.addEventListener('mouseenter', function() {
           // 仅显示当前悬停的区域
           this.style.opacity = '1';
       });
   });
   // 鼠标离开区域时
   hoverAreas.forEach(function(area) {
       area.addEventListener('mouseleave', function() {
           // 隐藏当前区域
           this.style.opacity = '0';
       });
   });
});


window.addEventListener('resize', function() {
   var someDiv = document.getElementById('turtle_type');
   var maximizePrompt = document.getElementById('maximizePrompt');
   
   if (window.innerWidth < 1200) {
       // 如果窗口宽度小于1200px，隐藏div并显示提示信息
       someDiv.style.display = 'none';
       maximizePrompt.style.display = 'block';
   } else {
       // 如果窗口宽度大于等于1200px，显示div并隐藏提示信息
       someDiv.style.display = 'block';
       maximizePrompt.style.display = 'none';
   }
});

// 初次加载页面时执行一次检查
window.addEventListener('DOMContentLoaded', function() {
   var someDiv = document.getElementById('turtle_type');
   var maximizePrompt = document.getElementById('maximizePrompt');
   
   if (window.innerWidth < 1200) {
       someDiv.style.display = 'none';
       maximizePrompt.style.display = 'block';
   }
   else {
      // 如果窗口宽度大于等于960px，显示div并隐藏提示信息
      someDiv.style.display = 'block';
      maximizePrompt.style.display = 'none';
   }
});