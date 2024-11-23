var alph = true;
var wishList = null;

function UpdateBackground() {
  console.log("test");
  var x = document.body;
  console.log("result" + new Date().getDay());
  if (new Date().getDay() == 0) {
    x.style.backgroundImage = //good
      "Url('https://img.freepik.com/premium-vector/christmas-seamless-pattern-with-snowflakes_115464-32.jpg')";
  } else if (new Date().getDay() == 1) {
    x.style.backgroundImage = //good
      "Url('https://static.vecteezy.com/system/resources/previews/019/188/037/non_2x/seamless-pattern-of-christmas-candy-cane-and-stars-on-green-background-festive-background-for-wrapping-paper-invitation-greeting-card-textile-vector.jpg')";
  } else if (new Date().getDay() == 2) {
    x.style.backgroundImage = //GOOD
      "Url('https://st2.depositphotos.com/4040545/5952/v/450/depositphotos_59524471-stock-illustration-christmas-seamless-pattern.jpg')";
  } else if (new Date().getDay() == 3) {
    x.style.backgroundImage = //OK
      "Url('https://media.istockphoto.com/id/1279947955/vector/seamless-christmas-pattern.jpg?s=612x612&w=0&k=20&c=gpZ0UJ3qRFZe-gHPykDCEyOunr8GCwihnAXPXezA3N8=')";
  } else if (new Date().getDay() == 4) {
    x.style.backgroundImage = //good
      "Url('https://img.freepik.com/premium-vector/cute-kawaii-christmas-pattern-seamless-gingerbread-hand-drawing-isolated-pink-background_44161-2287.jpg')";
  } else if (new Date().getDay() == 5) {
    x.style.backgroundImage = //good
      "Url('https://img.freepik.com/free-vector/christmas-background-flat-design_23-2148325036.jpg')";
  } else if (new Date().getDay() == 6) {
    x.style.backgroundImage = //good
      "Url('https://img.freepik.com/premium-photo/christmas-seamless-pattern-infinite-digital-paper-generative-ai_836477-28995.jpg')";
  }
}

filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

async function loadItems() {
  UpdateBackground();
  await generateList();
  // Add active class to the current control button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  //console.log(btnContainer);
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
  let checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("change", () => {
    if (alph == true) {
      alph = false;
    } else {
      alph = true;
    }
    filterSelection("all");
  });
  await generateList();
  await filterSelection("all");
}

function OrganizeList(wishList, method) {
  if (method == "Alphabetical") {
    wishList.sort(function (a, b) {
      return a.c[2].v.localeCompare(b.c[2].v);
    });
  } else if (method == "Numerical") {
    wishList.sort(function (a, b) {
      console.log(a.c[3].v);
      return a.c[3].v - b.c[3].v;
    });
  }
}

const spreadsheetId = "1vKmj_Z7NxkYnKkdaCFm3jdLKwNhvJuWe7IGW6iiDtlE";

// Construct the URL for Google Sheets API v4
const base = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?`;

const sheetName = encodeURIComponent("Sheet1");
const query = encodeURIComponent("select * ");
const url = `${base}&sheet=${sheetName}&tq=${query}`;

async function generateList() {
  var wishList;
  var resp = "";
  const res = await fetch(url);
  resp = await res.text();
  wishList = await JSON.parse(resp.substring(47).slice(0, -2)).table.rows;

  console.log(document.getElementById("container").outerHTML == null);
  if (alph == true) {
    console.log(wishList);
    OrganizeList(wishList, "Alphabetical");
    console.log("organized!");
  } else {
    OrganizeList(wishList, "Numerical");
    console.log("numerized!");
    console.log(wishList);
  }
  var ReturnHTML = "";
  for (let x = 0; x < wishList.length; x++) {
    console.log(wishList[x].c);
    if (wishList[x].c[1].v == null) {
      ReturnHTML +=
        "<div class = 'filterDiv " +
        wishList[x].c[4].v +
        "'> <img src='" +
        wishList[x].c[0].v +
        "' class = 'hoverImage'></image><button class = 'filterButton' onclick = window.open('" +
        wishList[x].c[1].v +
        "','_blank') >" +
        wishList[x].c[2].v +
        "<br>" +
        wishList[x].c[3].v +
        "</button></div>";
    } else {
      ReturnHTML +=
        "<div class = 'filterDiv " +
        wishList[x].c[4].v +
        "'> <img src='" +
        wishList[x].c[0].v +
        "' class = 'hoverImage'></img><button class = 'filterButton' onclick = window.open('" +
        wishList[x].c[1].v +
        "','_blank') >" +
        wishList[x].c[2].v +
        "<br>" +
        wishList[x].c[3].v +
        "</button></div>";
    }
  }
  document.getElementById("container").innerHTML = ReturnHTML;
}

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (mybutton == null) {
    mybutton = document.getElementById("myBtn");
    console.log(mybutton);
  }
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
