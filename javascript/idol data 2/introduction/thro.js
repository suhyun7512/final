document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll("#thro-list li");
    const contentDivs = document.querySelectorAll(".thro-content");
  
    listItems.forEach(function(item) {
      item.addEventListener("click", function() {
        const targetId = item.getAttribute("data-target");
  
        contentDivs.forEach(function(div) {
          div.classList.remove("active");
        });

        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
          targetDiv.classList.add("active");
        }
      });
    });
  });



  document.addEventListener("DOMContentLoaded", function() {
    const listItems1 = document.querySelectorAll("#thro-list li");
    const contentDivs1 = document.querySelectorAll(".thro-content1");
  
    listItems1.forEach(function(item) {
      item.addEventListener("click", function() {
        const targetId1 = item.getAttribute("data-target");
  
        contentDivs1.forEach(function(div) {
          div.classList.remove("active");
        });

        const targetDiv = document.getElementById(targetId1);
        if (targetDiv) {
          targetDiv.classList.add("active");
        }
      });
    });
  });