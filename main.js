class Fl
{
 constructor(name,date,text)
 {
  this.name = name;
  this.date = date;
  this.text = text;
 }
};

let file_data = {};

window.onload = () =>
{
 function refresh()
 {
  const node = document.getElementById('filelist');
  while(node.firstChild){node.removeChild(node.firstChild);}
  for(let key in file_data)
  {
   const div = document.createElement('div');
   div.classList.add('file');
   div.innerHTML = key;
   div.onclick = () =>
   {
    let fl = file_data[div.innerHTML];
    document.getElementById('m-title').value = fl.name;
    document.getElementById('m-date').value = fl.date;
    document.getElementById('m-message').value = fl.text;
   };
   document.getElementById('filelist').appendChild(div);
  }
 };

 document.getElementById('new').onclick = () =>
 {
  const filename = document.getElementById('m-title').value;
  const filedate = document.getElementById('m-date').value;
  const filedata = document.getElementById('m-message').value;
  file_data[filename] = new Fl(filename,filedate,filedata);
  refresh();
 };

 let ctrl = false;
 document.getElementById('file_upload').onchange = event =>
 {
  var fr = new FileReader();
  fr.onload = e =>
  {
   var dataURL = fr.result;
   file_data = {};
   let new_file = JSON.parse(dataURL);
   for(let key in new_file)
   {
    file_data[key] = new Fl(key,new_file[key].date,new_file[key].text);
   }
   refresh();
   console.log(file_data);
  };
  fr.readAsText(event.target.files[0]);
 };
 window.onkeydown = e =>
 {
  if(e.keyCode === 17){ctrl = true;}
  else if(e.keyCode === 79 && ctrl) // o key
  {
   document.getElementById('file_upload').click();
   ctrl = false;
  }
  else if(e.keyCode === 83 && ctrl) // s key
  {
   e.preventDefault();
   const a = document.createElement('a');
   a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(file_data)));
   a.setAttribute('download','test.txt');
   a.style.display = 'none';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
  }
 }
};