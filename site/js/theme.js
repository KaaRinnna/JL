var icon = document.getElementById("icon");

icon.onclick = function () {
   document.body.classList.toggle("light-theme");
   if (document.body.classList.contains("light-theme")) {
      icon.src = "https://cdn-icons-png.flaticon.com/512/10253/10253065.png";
   } else {
      icon.src = "https://cdn-icons-png.flaticon.com/512/2402/2402823.png";
   }
}