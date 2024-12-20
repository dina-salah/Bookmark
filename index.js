var siteName = document.getElementById("siteName");
var websiteURL = document.getElementById("websiteURL");
var submitBtn = document.getElementById("submitBtn");
var VisitBtn = document.getElementById("VisitBtn");
var DeleteBtn = document.getElementById("DeleteBtn");
var modalpopbox = new bootstrap.Modal(document.getElementById("popBox"));

var websiteslist = [];
const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
 

if (localStorage.getItem('webhis') !== null) {
  websiteslist = JSON.parse(localStorage.getItem('webhis'));
  display();

} else {
  websiteslist = [];
}

submitBtn.onclick = insert;

function insert() {
  var web = {
    name: (siteName.value),
    url: websiteURL.value
  };


  if(regex.test(web.url) && (web.name).length >= 3){
  websiteslist.push(web);
    clearForm();
    localStorage.setItem('webhis', JSON.stringify(websiteslist));
    display();

  }
  else {
    clearForm();
    console.log('popbox should be fixed')
    modalpopbox.show()

  }


}


function display() {
  var table_rec = ``;


  for (i = 0; i < websiteslist.length; i++) {

    table_rec += `<tr>
            <th scope="row" class="fw-normal" >${i + 1}</th>
            <td >${capitalize(websiteslist[i].name)}</td>
            <td><a id="VisitBtn" target="_blank" href="${websiteslist[i].url}"><button class="btn btn-success" ><i class="pe-1 fa-solid fa-eye"></i> Visit</button></a></td>
            <td><button id="DeleteBtn" class="btn btn-danger" onclick="deleterec(${i})" ><i class="pe-1 fa-solid fa-trash-can"></i> Delete</button></td>
          </tr>`;



  };
  document.getElementById("table-body").innerHTML = table_rec;
  // document.getElementById("popBox").innerHTML = modal;

}
function clearForm() {
  siteName.value = null;
  websiteURL.value = null;
}

function deleterec(i) {
  websiteslist.splice(i, 1);
  localStorage.setItem('webhis', JSON.stringify(websiteslist))
  display();
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


