'use strict'; /* 厳格にエラーをチェック */

var mytable1 = document.getElementById("tbl1");
var mytable2 = document.getElementById("tbl2");
var mytable3 = document.getElementById("tbl3");
var mytable4 = document.getElementById("tbl4");

let data1 = [ ['10', '00', '00'] ];
let data2 = [ ['10', '00', '00'] ];
let data3 = [ ['10', '00'] ];
let dataB = [];
let dataW = [];

let dl1=0,dl2=0,dl3=0,Pdl1=0,Pdl2=0,Pdl3=0,Plo1=0,Plo2=0,Plo3=0,maxL=0;
let data1_0=[], data1_1=[], data1_2=[];
let Pdata1=[],Pdata2=[],Pdata3=[];
let tempo=118;

var Piano = [0,1,110,95,0];
var Harpsichord = [6,6,120,110,0];
var Organ = [23,20,120,110,0];
var Violin = [40,41,110,90,1];
var Flute = [73,73,105,90,1];
var Clarinet = [71,71,110,100,0];
var Trumpet = [56,57,110,100,0];
var Celesta = [11,11,110,100,0];

var Bass = [63,90,6];
var Acc = [62,70,7];
var Rhyrhm = [0,100];
var late = 3;
var txtname="";
var num = 0;
var wd = 1;
var bd = 0;
let Rfile1;
let Ofile1 = "";
let MoutOn=0;
let Mout = document.getElementById('Mout');
let binre = document.getElementById('binre');
let Sout = document.getElementById('Sout');
const MoutS = document.getElementById('MoutS');
let selectD = document.getElementById("delaycode");
selectD.options[3].selected = true;
selectD.addEventListener('change', (event) => {
  late = Number(selectD.value);
  jsave();
});
    var $output = $('.output');
    var midi = { output: [] };
{ /* ローカルスコープ */


document.getElementById("p1").style.display ="none";
document.getElementById("p2").style.display ="none";
document.getElementById("p3").style.display ="none";

Seladd(0);
jload();

if(Mout.checked) MidiL();

setTimeout(() => {
  timep(1);
  timep(2);
  timep(3);
},500);  


// DOM取得
const tabMenus = document.querySelectorAll('.tab__menu-item');
console.log(tabMenus);

// イベント付加
tabMenus.forEach((tabMenu) => {
  tabMenu.addEventListener('click', tabSwitch);
})




// イベントの処理
function tabSwitch(e) {
  // クリックされた要素のデータ属性を取得
  const tabTargetData = e.currentTarget.dataset.tab;
  // クリックされた要素の親要素と、その子要素を取得
  const tabList = e.currentTarget.closest('.tab__menu');
 
  console.log(tabList);
  const tabItems = tabList.querySelectorAll('.tab__menu-item');
  console.log(tabItems);
  // クリックされた要素の親要素の兄弟要素の子要素を取得
  const tabPanelItems = tabList.parentNode.
  nextElementSibling.querySelectorAll('.tab__panel-box');
  console.log(tabPanelItems);

  // クリックされたtabの同階層のmenuとpanelのクラスを削除
  tabItems.forEach((tabItem) => {
    tabItem.classList.remove('is-active');
  })
  tabPanelItems.forEach((tabPanelItem) => {
    tabPanelItem.classList.remove('is-show');
  })

  // クリックされたmenu要素にis-activeクラスを付加
  e.currentTarget.classList.add('is-active');
  // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
  tabPanelItems.forEach((tabPanelItem) => {
    if (tabPanelItem.dataset.panel ===  tabTargetData) {
      tabPanelItem.classList.add('is-show');
    }
  })

}
}


function Read1(u,d){
     
    if(u==1){
        mytable1 = document.getElementById('tbl1'); 
        var num1 = mytable1.rows.length;
        for(let g=num1; g>1; g--){
            mytable1.deleteRow(1);
        }
    }
    if(u==2){
        mytable2 = document.getElementById('tbl2');
        var num1 = mytable2.rows.length;
        for(let g=num1; g>1; g--){
            mytable2.deleteRow(1);
        }
    }

    for(let i=0; i<d; i++){
      if(u==1){
        data1_1 = data1[i];
        if(i!=d-1)data1_2 = data1[i+1];
        else data1_2 = ['00','00','00'];
      }
      if(u==2){
        data1_1 = data2[i];
        if(i!=d-1)data1_2 = data2[i+1];
        else data1_2 = ['00','00','00'];
      }

      var mytr = document.createElement("tr");
      var myth = document.createElement("th");
      var btn1 = document.createElement("td");
      var btn2 = document.createElement("td");
      var btn3 = document.createElement("td");
      var btn4 = document.createElement("td");
    
      myth.textContent = i+1;
      mytr.appendChild(myth);
    
      for(let j=0; j<3; j++){
          var mytd = document.createElement("td");
          var inp = document.createElement("input");
          inp.setAttribute("type", "text");
          inp.setAttribute("style", "font-size: 20px; width: 30px; height: 30px;");
          inp.setAttribute("maxlength",  "2");
          inp.setAttribute("pattern", "^[0-9A-Fa-f]+$");
          if(j==0){
            inp.setAttribute("class", "da1");
            inp.setAttribute("id", "listb");
            inp.setAttribute("list", "noS1");
          }
          if(j==1)inp.setAttribute("class", "da2");
          if(j==2)inp.setAttribute("class", "da3");
    
          inp.setAttribute("value", data1_1[j]);
          mytd.appendChild(inp);
          mytr.appendChild(mytd);
      }
      var th1 = document.createElement("th");
            th1.setAttribute("class", "Cnon");
            if(data1_1[0]=="0F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="1F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="8F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="9F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="AF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="BF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="CF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="DF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="EF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="FF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="50")th1.setAttribute("class", "Ceff");
            if(data1_1[0]=="60")th1.setAttribute("class", "Ctim");
            if(data1_1[0]=="20")th1.setAttribute("class", "Cadd");
            if(data1_1[0]=="10")th1.setAttribute("class", "Cres");
            if(data1_1[0]=="0E")th1.setAttribute("class", "Ctag");
            if(data1_1[0]=="1E")th1.setAttribute("class", "Ctag");
            if(data1_1[0]=="2E")th1.setAttribute("class", "Ctag");
            if(data1_1[0]=="F0")th1.setAttribute("class", "Cend");
      mytr.appendChild(th1);
      for(let k=0; k<3; k++){
          var mytd = document.createElement("td");
          var inp = document.createElement("input");
          inp.setAttribute("type", "text");
          inp.setAttribute("style", "font-size: 20px; width: 40px; height: 30px;");
          inp.setAttribute("maxlength",  "4");
          inp.setAttribute("id", "listb");
          var inp2 = document.createElement("input");
          inp2.setAttribute("type", "text");
          inp2.setAttribute("style", "font-size: 20px; width: 15px; height: 30px;");
          inp2.setAttribute("maxlength",  "1");
          inp2.setAttribute("id", "listb");
          if(k==0){
            inp.setAttribute("style", "font-size: 20px; width: 30px; height: 30px;");
            inp.setAttribute("pattern", "^[0-9A-Za-z#]+$");
            inp.setAttribute("class", "no1");
            inp2.setAttribute("pattern", "^[0-9A-Za-z#]+$");
            inp2.setAttribute("class", "no1_2");
            let Aux = parseInt((data1_1[0].substr(0, 1)),16);
            let Aux2 = parseInt(data1_1[0].substr(1, 1),16);
            let a=data1_1[0], b="";
            if(Aux2>=1 && Aux2<=12 && Aux>=2 && Aux<=6) {
                switch (Aux2) {
                    case 1:
                        a="C";
                      break;
                    case 2:
                        a="C#";
                      break;
                    case 3:
                        a="D";
                      break;
                    case 4:
                        a="D#";
                      break;
                    case 5:
                        a="E";
                     break;
                    case 6:
                        a="F";
                     break;
                    case 7:
                        a="F#";
                      break;
                    case 8:
                        a="G";
                      break;
                    case 9:
                        a="G#";
                      break;
                    case 10:
                        a="A";
                      break;
                    case 11:
                        a="A#";
                      break;
                    case 12:
                        a="B";
                      break;
                }
                switch (Aux) {
                    case 2:
                        b="2";
                      break;
                    case 3:
                        b="3";
                      break;
                    case 4:
                        b="4";
                      break;
                    case 5:
                        b="5";
                       break;
                    case 6:
                        b="6";
                      break;
                }
            }
            let c = b + a;
            inp.setAttribute("value", c);

            inp.setAttribute("list", "noS0");
            inp2.setAttribute("list", "noS0");
            if(b!=""){
              inp.setAttribute("list", "noS4");
              inp2.setAttribute("list", "noS2");
              inp.setAttribute("value", a);
              inp2.setAttribute("value", b);
            }else if(Aux2==15){
              inp.setAttribute("list", "noS6");
            }
          }
          if(k==1){
            inp.setAttribute("pattern", "^[0-9A-Fa-f]+$");
            inp.setAttribute("class", "no2");
            switch(data1_1[0]){
                case "10":
                case "20":
                    inp.setAttribute("value", "0");
                    break;
                case "50":
                case "60":
                    inp.setAttribute("value", data1_1[1]);
                    break;
                default:
                    inp.setAttribute("value", parseInt(data1_1[1],16));
                    break;
            }
            if(data1_2[0]=="20" && data1_1[0]!="50" && data1_1[0]!="60"){
                let len2 = data1_2[1]+data1_1[1];
                inp.setAttribute("value", parseInt(len2,16));
            }
            switch(data1_1[0]){
              case "10":
              case "20":
              case "0F":
              case "1F":
              case "8F":
              case "9F":
              case "AF":
              case "BF":
              case "CF":
              case "DF":
              case "EF":
              case "FF":
              case "F0":
              case "0E":
              case "1E":
              case "2E":
              inp.setAttribute("list", "noS0");
              break;
              case "50":
              inp.setAttribute("list", "noS9");
              break;
              case "60":
              inp.setAttribute("list", "noS7");
              break;
              default:
              inp.setAttribute("list", "noS10");
              break;
            }
            
          }
          if(k==2){
            inp.setAttribute("pattern", "^[0-9A-Fa-f]+$");
            inp.setAttribute("class", "no3");
            switch(data1_1[0]){
                case "10":
                    let len1 = data1_1[2]+data1_1[1];
                    inp.setAttribute("value", parseInt(len1,16));
                    break;
                case "20":
                    inp.setAttribute("value", "0");
                    break;
                default:
                    inp.setAttribute("value", parseInt(data1_1[2],16));
                    break;
            }
            if(data1_2[0]=="20"){
                let len2 = data1_2[2]+data1_1[2];
                inp.setAttribute("value", parseInt(len2,16));
            }
            inp.setAttribute("list", "noS10");
          }
        if(k==0)mytd.appendChild(inp2);
        mytd.appendChild(inp);
        if(k==0)mytd.setAttribute("class", "linem");
        mytr.appendChild(mytd);
      }
    
      var myth = document.createElement("th");
      var btn3 = document.createElement("input");
      btn3.setAttribute("type", "button");
      btn3.setAttribute("id", "rowup");
      btn3.setAttribute("class", "flexbox");
      btn3.setAttribute("value", "↑");
      myth.appendChild(btn3);
    
      var btn4 = document.createElement("input");
      btn4.setAttribute("type", "button");
      btn4.setAttribute("id", "rowdown");
      btn4.setAttribute("class", "flexbox");
      btn4.setAttribute("value", "↓");
      myth.appendChild(btn4);
      mytr.appendChild(myth);
    
       var myth = document.createElement("th");
       var btn1 = document.createElement("input");
       btn1.setAttribute("type", "button");
       btn1.setAttribute("id", "rowdel");
       btn1.setAttribute("class", "flexbox");
       btn1.setAttribute("value", "Del");
       myth.appendChild(btn1);
    
       var btn2 = document.createElement("input");
       btn2.setAttribute("type", "button");
       btn2.setAttribute("id", "rowins");
       btn2.setAttribute("class", "flexbox");
       btn2.setAttribute("value", "Add");
       myth.appendChild(btn2);
       mytr.appendChild(myth);
    
    
       var th3 = document.createElement("th");
       if(u==1) th3.setAttribute("class", "timebox");
       if(u==2) th3.setAttribute("class", "timebox");
       mytr.appendChild(th3);
       var th4 = document.createElement("th");
       if(u==1) th4.setAttribute("class", "timebox");
       if(u==2) th4.setAttribute("class", "timebox");
       mytr.appendChild(th4);
       var th5 = document.createElement("th");
       if(u==1) th5.setAttribute("class", "timebox");
       if(u==2) th5.setAttribute("class", "timebox");
       mytr.appendChild(th5);
       var th6 = document.createElement("th");
       if(u==1) th6.setAttribute("class", "timebox");
       if(u==2) th6.setAttribute("class", "timebox");
       mytr.appendChild(th6);
       var th7 = document.createElement("th");
       if(u==1) th7.setAttribute("class", "timebox");
       if(u==2) th7.setAttribute("class", "timebox");
       mytr.appendChild(th7);
       var th8 = document.createElement("th");
       if(u==1) th8.setAttribute("class", "timebox");
       if(u==2) th8.setAttribute("class", "timebox");
       mytr.appendChild(th8);
       var th9 = document.createElement("th");
       if(u==1) th9.setAttribute("class", "timebox");
       if(u==2) th9.setAttribute("class", "timebox");
       mytr.appendChild(th9);
       var th10 = document.createElement("th");
       if(u==1) th10.setAttribute("class", "timebox");
       if(u==2) th10.setAttribute("class", "timebox");
       mytr.appendChild(th10);
       var th11 = document.createElement("th");
       if(u==1) th11.setAttribute("class", "timebox");
       if(u==2) th11.setAttribute("class", "timebox");
       mytr.appendChild(th11);
       var th12 = document.createElement("th");
       if(u==1) th12.setAttribute("class", "timebox");
       if(u==2) th12.setAttribute("class", "timebox");
       mytr.appendChild(th12);
    
      
    if(u==1) mytable1.appendChild(mytr);
    if(u==2) mytable2.appendChild(mytr);
    cangeC();
    Tbyte(u);
    }
    jsave();
}


function Read2(d){

    mytable3 = document.getElementById('tbl3'); 
    var num1 = mytable3.rows.length;
    for(let g=num1; g>1; g--){
        mytable3.deleteRow(1);
    }
    

    for(let i=0; i<d; i++){
      
        data1_1 = data3[i];
        if(i!=d-1)data1_2 = data3[i+1];
        else data1_2 = ['00','00'];

      var mytr = document.createElement("tr");
      var myth = document.createElement("th");
      var btn1 = document.createElement("td");
      var btn2 = document.createElement("td");
      var btn3 = document.createElement("td");
      var btn4 = document.createElement("td");
    
      myth.textContent = i+1;
      mytr.appendChild(myth);
    
      for(let j=0; j<2; j++){
          var mytd = document.createElement("td");
          var inp = document.createElement("input");
          inp.setAttribute("type", "text");
          inp.setAttribute("style", "font-size: 20px; width: 30px; height: 30px;");
          inp.setAttribute("maxlength",  "2");
          inp.setAttribute("pattern", "^[0-9A-Fa-f]+$");
          if(j==0){
            inp.setAttribute("class", "cda1");
            inp.setAttribute("id", "listb");
            inp.setAttribute("list", "noS3");
          }
          if(j==1)inp.setAttribute("class", "cda2");
    
          inp.setAttribute("value", data1_1[j]);
          mytd.appendChild(inp);
          mytr.appendChild(mytd);
      }
      var th1 = document.createElement("th");
            th1.setAttribute("class", "Cnon");
            if(data1_1[0]=="0F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="1F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="8F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="9F")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="AF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="BF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="CF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="DF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="EF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="FF")th1.setAttribute("class", "Crep");
            if(data1_1[0]=="50")th1.setAttribute("class", "Cryc");
            if(data1_1[0]=="60")th1.setAttribute("class", "Cfil");
            if(data1_1[0]=="20")th1.setAttribute("class", "Cadd");
            if(data1_1[0]=="10")th1.setAttribute("class", "Cres");
            if(data1_1[0]=="80")th1.setAttribute("class", "Csry");
            if(data1_1[0]=="90")th1.setAttribute("class", "Ccre");
            if(data1_1[0]=="C0")th1.setAttribute("class", "Ctem");
            if(data1_1[0]=="F0")th1.setAttribute("class", "Cend");
      mytr.appendChild(th1);
      for(let k=0; k<2; k++){
          var mytd = document.createElement("td");
          var inp = document.createElement("input");
          inp.setAttribute("type", "text");
          inp.setAttribute("style", "font-size: 20px; width: 40px; height: 30px;");
          inp.setAttribute("maxlength",  "6");
          inp.setAttribute("id", "listb");
          var inp2 = document.createElement("input");
          inp2.setAttribute("type", "text");
          inp2.setAttribute("style", "font-size: 20px; width: 30px; height: 30px;");
          inp2.setAttribute("maxlength",  "2");
          inp2.setAttribute("id", "listb");
          if(k==0){
            inp.setAttribute("style", "font-size: 20px; width: 50px; height: 30px;");
            inp.setAttribute("pattern", "^[0-9A-Za-z#-]+$");
            inp.setAttribute("class", "cno1");
            inp2.setAttribute("pattern", "^[0-9A-Za-z#-]+$");
            inp2.setAttribute("class", "cno1_2");
            let Aux = parseInt((data1_1[0].substr(0, 1)),16);
            let Aux2 = parseInt(data1_1[0].substr(1, 1),16);
            let ta = data1_1[0].length;
            let a=data1_1[0], b="",pj=0;
            if (Aux2>=1 && Aux2<=12) {
                if (Aux!=15) {
                    //Bass
                    switch (Aux2) {
                        case 1:
                            a="C";
                          break;
                        case 2:
                            a="C#";
                          break;
                        case 3:
                            a="D";
                          break;
                        case 4:
                            a="D#";
                          break;
                        case 5:
                            a="E";
                         break;
                        case 6:
                            a="F";
                         break;
                        case 7:
                            a="F#";
                          break;
                        case 8:
                            a="G";
                          break;
                        case 9:
                            a="G#";
                          break;
                        case 10:
                            a="A";
                          break;
                        case 11:
                            a="A#";
                          break;
                        case 12:
                            a="B";
                          break;
                    }
                    //code
                    switch (Aux) {
                        case 0:
                            b="0";
                            pj=1;
                          break;
                        case 1:
                            b="m";
                          break;
                        case 2:
                            b="7";
                          break;
                        case 3:
                            b="m7";
                          break;
                        case 4:
                            b="M7";
                          break;
                        case 5:
                            b="6";
                           break;
                        case 6:
                            b="m7-5";
                          break;
                        case 7:
                            b="sus4";
                          break;
                        case 8:
                            b="dim";
                           break;
                        case 9:
                            b="aug";
                           break;
                        case 10:
                            b="m6";
                           break;
                        case 11:
                            b="-5";
                           break;
                        case 12:
                            b="-9";
                           break;
                        case 13:
                            b="9";
                           break;
                        case 14:
                            b="-";
                          break;
                    }
                }
            }
            let c = a + b;
            inp.setAttribute("value", c);

            inp.setAttribute("list", "noS0");
            inp2.setAttribute("list", "noS0");
            if(b!=""||pj==1){
              inp.setAttribute("list", "noS5");
              inp2.setAttribute("list", "noS4");
              inp.setAttribute("value", b);
              inp2.setAttribute("value", a);
            }else if(Aux2==15){
              inp.setAttribute("list", "noS6");
            }
            if(ta==1){
              switch (Aux) {
                case 1:
                    a="C";
                  break;
                case 2:
                    a="C#";
                  break;
                case 3:
                    a="D";
                  break;
                case 4:
                    a="D#";
                  break;
                case 5:
                    a="E";
                 break;
                case 6:
                    a="F";
                 break;
                case 7:
                    a="F#";
                  break;
                case 8:
                    a="G";
                  break;
                case 9:
                    a="G#";
                  break;
                case 10:
                    a="A";
                  break;
                case 11:
                    a="A#";
                  break;
                case 12:
                    a="B";
                  break;
            }
              inp.setAttribute("value", "");
              inp2.setAttribute("value", a);
            }
          }
          if(k==1){
            inp.setAttribute("pattern", "^[0-9A-Fa-f]+$");
            inp.setAttribute("class", "cno2");
            switch(data1_1[0]){
                case "20":
                    inp.setAttribute("value", "0");
                    break;
                case "50":
                case "60":
                case "80":
                case "C0":
                    inp.setAttribute("value", data1_1[1]);
                    break;
                default:
                    inp.setAttribute("value", parseInt(data1_1[1],16));
                    break;
            }
            if(data1_2[0]=="20" && data1_1[0]!="50" && data1_1[0]!="60" && data1_1[0]!="80" && data1_1[0]!="C0"){
                let len2 = data1_2[1]+data1_1[1];
                inp.setAttribute("value", parseInt(len2,16));
            }
            switch(data1_1[0]){
              case "20":
              case "90":
              case "0F":
              case "1F":
              case "8F":
              case "9F":
              case "AF":
              case "BF":
              case "CF":
              case "DF":
              case "EF":
              case "FF":
              case "F0":
              inp.setAttribute("list", "noS0");
              break;
              case "50":
              case "60":
              inp.setAttribute("list", "noS8");
              break;
              case "80":
              inp.setAttribute("list", "noS11");
              break;
              case "C0":
              inp.setAttribute("list", "noS12");
              break;
              default:
              inp.setAttribute("list", "noS10");
              break;
            }
            
          }
          if(k==0)mytd.appendChild(inp2);
          mytd.appendChild(inp);
          if(k==0)mytd.setAttribute("class", "linem");
        mytr.appendChild(mytd);
      }
    
      var myth = document.createElement("th");
      var btn3 = document.createElement("input");
      btn3.setAttribute("type", "button");
      btn3.setAttribute("id", "rowup");
      btn3.setAttribute("class", "flexbox");
      btn3.setAttribute("value", "↑");
      myth.appendChild(btn3);
    
      var btn4 = document.createElement("input");
      btn4.setAttribute("type", "button");
      btn4.setAttribute("id", "rowdown");
      btn4.setAttribute("class", "flexbox");
      btn4.setAttribute("value", "↓");
      myth.appendChild(btn4);
      mytr.appendChild(myth);
    
       var myth = document.createElement("th");
       var btn1 = document.createElement("input");
       btn1.setAttribute("type", "button");
       btn1.setAttribute("id", "rowdel");
       btn1.setAttribute("class", "flexbox");
       btn1.setAttribute("value", "Del");
       myth.appendChild(btn1);
    
       var btn2 = document.createElement("input");
       btn2.setAttribute("type", "button");
       btn2.setAttribute("id", "rowins");
       btn2.setAttribute("class", "flexbox");
       btn2.setAttribute("value", "Add");
       myth.appendChild(btn2);
       mytr.appendChild(myth);
    
       var th3 = document.createElement("th");
       th3.setAttribute("class", "timebox");
       mytr.appendChild(th3);
       var th4 = document.createElement("th");
       th4.setAttribute("class", "timebox");
       mytr.appendChild(th4);
       var th5 = document.createElement("th");
       th5.setAttribute("class", "timebox");
       mytr.appendChild(th5);
       var th6 = document.createElement("th");
       th6.setAttribute("class", "timebox");
       mytr.appendChild(th6);
       var th7 = document.createElement("th");
       th7.setAttribute("class", "timebox");
       mytr.appendChild(th7);
       var th8 = document.createElement("th");
       th7.setAttribute("class", "timebox");
       mytr.appendChild(th8);
       var th9 = document.createElement("th");
       th7.setAttribute("class", "timebox");
       mytr.appendChild(th9);
       var th10 = document.createElement("th");
       th10.setAttribute("class", "timebox");
       mytr.appendChild(th10);
       var th11 = document.createElement("th");
       th11.setAttribute("class", "timebox");
       mytr.appendChild(th11);
       var th12 = document.createElement("th");
       th12.setAttribute("class", "timebox");
       mytr.appendChild(th12);
    
    mytable3.appendChild(mytr);
    cangeC();
    Tbyte(3);
    }
    jsave();
}

function Seladd(m){
  var mytr = document.createElement("tr");
  var myth = document.createElement("th");
  
  if(m==1) myth.setAttribute("class", "Cplay");
  mytr.appendChild(myth);
  var mytd1 = document.createElement("td");
  if(m==0) mytd1.textContent = "New Song";
  if(m==1) mytd1.textContent = "txt:"+txtname;
  mytr.appendChild(mytd1);

  var myth = document.createElement("th");
  var btn1 = document.createElement("input");
  btn1.setAttribute("type", "button");
  btn1.setAttribute("id", "rowread");
  btn1.setAttribute("class", "flexbox");
  btn1.setAttribute("value", "Read");
  myth.appendChild(btn1);

  var btn2 = document.createElement("input");
  btn2.setAttribute("type", "button");
  btn2.setAttribute("id", "rowwrite");
  btn2.setAttribute("class", "flexbox");
  btn2.setAttribute("value", "Write");
  myth.appendChild(btn2);
  mytr.appendChild(myth);

  var myth = document.createElement("th");
  var btn3 = document.createElement("input");
  btn3.setAttribute("type", "button");
  btn3.setAttribute("id", "rowup");
  btn3.setAttribute("class", "flexbox");
  btn3.setAttribute("value", "↑");
  myth.appendChild(btn3);

  var btn4 = document.createElement("input");
  btn4.setAttribute("type", "button");
  btn4.setAttribute("id", "rowdown");
  btn4.setAttribute("class", "flexbox");
  btn4.setAttribute("value", "↓");
  myth.appendChild(btn4);
  mytr.appendChild(myth);

  var mytd2 = document.createElement("td");
  if(m==0) mytd2.textContent = "0(0)";
  if(m==1) mytd2.textContent = (dl1*3) + "(" + dl1 + ")"
  mytr.appendChild(mytd2);

  var mytd3 = document.createElement("td");
  if(m==0) mytd3.textContent = "0(0)";
  if(m==1) mytd3.textContent = (dl2*3) + "(" + dl2 + ")";
  mytr.appendChild(mytd3);

  var mytd4 = document.createElement("td");
  if(m==0) mytd4.textContent = "0(0)";
  if(m==1) mytd4.textContent = (dl3*2) + "(" + dl3 + ")";
  mytr.appendChild(mytd4);

  var mytd5 = document.createElement("td");
  if(m==0) mytd5.textContent = "0(0)";
  if(m==1) mytd5.textContent = ((dl1*3)+(dl2*3)+(dl3*2)) + "(" + (dl1+dl2+dl3) + ")";
  mytr.appendChild(mytd5);
  
  var myth = document.createElement("th");
  var btn5 = document.createElement("input");
  btn5.setAttribute("type", "button");
  btn5.setAttribute("id", "rowdel");
  btn5.setAttribute("class", "flexbox");
  btn5.setAttribute("value", "Del");
  myth.appendChild(btn5);
  mytr.appendChild(myth);
  
  
  
  mytr.setAttribute("id", "wri"+wd);
  mytr.setAttribute("class", "wriD");
  
  mytable4.appendChild(mytr);
  
  orgno(4);
  cangeC();
}


let ti1 = document.getElementById('ti1');
ti1.onclick = textIn1;
let ti2 = document.getElementById('ti2');
ti2.onclick = textIn2;
let ti3 = document.getElementById('ti3');
ti3.onclick = textIn3;



function textIn1(){
	const p1 = document.getElementById("p1");
	if(p1.style.display=="block"){
        var text  = document.getElementById('p1').value;
        text = text.replace(/ |\r\n|\n|\r/g, "");
        var lines = text.match(/.{6}/g);
        var len = lines.length;
        let d=0;
        for ( var i = 0; i < len; i++ ) {
            // 空行は無視する
            if ( lines[i] == '' ) continue;
            data1_2[0] = lines[i].substr(0, 2);
            data1_2[1] = lines[i].substr(2, 2);
            data1_2[2] = lines[i].substr(4, 2);
            data1[d] = [data1_2[0],data1_2[1],data1_2[2]];
            d++;
        }
        // noneで非表示
		p1.style.display ="none";
        dl1=d;
        Read1(1,d);
        jsave();
	}else{
        document.getElementById("p1").value = "";
        var e = tbl1.rows.length;
        for(let f=1; f<e; f++){
            for(let g=1; g<4; g++) document.getElementById("p1").value +=  tbl1.rows[f].cells[g].firstElementChild.value;
            document.getElementById("p1").value += "\n";
        }
		// blockで表示
		p1.style.display ="block";
	}
}
function textIn2(){
	const p2 = document.getElementById("p2");
	if(p2.style.display=="block"){
        var text = document.getElementById('p2').value;
        text = text.replace(/ |\r\n|\n|\r/g, "");
        var lines = text.match(/.{6}/g);
        var len = lines.length;
        let d=0;
        for ( var i = 0; i < len; i++ ) {
            // 空行は無視する
            if ( lines[i] == '' ) continue;
            data1_2[0] = lines[i].substr(0, 2);
            data1_2[1] = lines[i].substr(2, 2);
            data1_2[2] = lines[i].substr(4, 2);
            data2[d] = [data1_2[0],data1_2[1],data1_2[2]];
            d++;
        }
        // noneで非表示
		p2.style.display ="none";
        dl2=d;
        Read1(2,d);
        jsave();
	}else{
        document.getElementById("p2").value = "";
        var e = tbl2.rows.length;
        for(let f=1; f<e; f++){
            for(let g=1; g<4; g++) document.getElementById("p2").value +=  tbl2.rows[f].cells[g].firstElementChild.value;
            document.getElementById("p2").value += "\n";
        }
		// blockで表示
		p2.style.display ="block";
	}
}
function textIn3(){
	const p3 = document.getElementById("p3");
	if(p3.style.display=="block"){
        var text  = document.getElementById('p3').value;
        text = text.replace(/ |\r\n|\n|\r/g, "");
        var lines = text.match(/.{4}/g);
        var len = lines.length;
        let d=0;
        for ( var i = 0; i < len; i++ ) {
            // 空行は無視する
            if ( lines[i] == '' ) continue;
            data1_2[0] = lines[i].substr(0, 2);
            data1_2[1] = lines[i].substr(2, 2);
            data3[d] = [data1_2[0],data1_2[1]];
            d++;
        }
        // noneで非表示
		p3.style.display ="none";
        dl3=d;
        Read2(d);
        jsave();
	}else{
        document.getElementById("p3").value = "";
        var e = tbl3.rows.length;
        for(let f=1; f<e; f++){
            for(let g=1; g<3; g++) document.getElementById("p3").value +=  tbl3.rows[f].cells[g].firstElementChild.value;
            document.getElementById("p3").value += "\n";
        }
		// blockで表示
		p3.style.display ="block";
	}
}


function orgno(d){
  var l;
  if(d==1) l = tbl1.rows.length;
  if(d==2) l = tbl2.rows.length;
  if(d==3) l = tbl3.rows.length;
  if(d==4) l = tbl4.rows.length;
  for(let n=1; n<l; n++){
    if(d==1) tbl1.rows[n].cells[0].innerText = n;
    if(d==2) tbl2.rows[n].cells[0].innerText = n;
    if(d==3) tbl3.rows[n].cells[0].innerText = n;
    if(d==4) tbl4.rows[n].cells[0].innerText = n;
  }
}



function cangeC(){
    var Enon = document.getElementsByClassName('Cnon');
    var Erep = document.getElementsByClassName('Crep');
    var Eryc = document.getElementsByClassName('Cryc');
    var Efil = document.getElementsByClassName('Cfil');
    var Eadd = document.getElementsByClassName('Cadd');
    var Eres = document.getElementsByClassName('Cres');
    var Esry = document.getElementsByClassName('Csry');
    var Ecre = document.getElementsByClassName('Ccre');
    var Etem = document.getElementsByClassName('Ctem');
    var Eeff = document.getElementsByClassName('Ceff');
    var Etim = document.getElementsByClassName('Ctim');
    var Etag = document.getElementsByClassName('Ctag');
    var Eend = document.getElementsByClassName('Cend');
    var Eplay = document.getElementsByClassName('Cplay');
    for(let l=0; l<Enon.length; l++) Enon[l].style.backgroundColor = "#eee";
    for(let l=0; l<Erep.length; l++) Erep[l].style.backgroundColor = "palegreen";
    for(let l=0; l<Eryc.length; l++) Eryc[l].style.backgroundColor = "lightcyan";
    for(let l=0; l<Efil.length; l++) Efil[l].style.backgroundColor = "orange";
    for(let l=0; l<Eadd.length; l++) Eadd[l].style.backgroundColor = "turquoise";
    for(let l=0; l<Eres.length; l++) Eres[l].style.backgroundColor = "yellowgreen";
    for(let l=0; l<Esry.length; l++) Esry[l].style.backgroundColor = "yellow";
    for(let l=0; l<Ecre.length; l++) Ecre[l].style.backgroundColor = "lightpink";
    for(let l=0; l<Etem.length; l++) Etem[l].style.backgroundColor = "goldenrod";
    for(let l=0; l<Eeff.length; l++) Eeff[l].style.backgroundColor = "green";
    for(let l=0; l<Etim.length; l++) Etim[l].style.backgroundColor = "lightcyan";
    for(let l=0; l<Etag.length; l++) Etag[l].style.backgroundColor = "yellow";
    for(let l=0; l<Eend.length; l++) Eend[l].style.backgroundColor = "orchid";
    for(let l=0; l<Eplay.length; l++) Eplay[l].style.backgroundColor = "lightpink";
}




function Tbyte(g){
  let by1 = tbl1.rows.length -1;
  let by2 = tbl2.rows.length -1;
  let by3 = tbl3.rows.length -1;
  document.getElementById("byte1").innerText = by1*3+"("+by1*6+")"+by1;
  document.getElementById("byte2").innerText = by2*3+"("+by2*6+")"+by2;
  document.getElementById("byte3").innerText = by3*2+"("+by3*4+")"+by3;
  document.getElementById("byteT").innerText = ((by1*3)+(by2*3)+(by3*2))+"("+((by1*6)+(by2*6)+(by3*4))+")";

}





$(function(){
    $(document).on('click','#rowup',function() {
        let $row = $(this).closest("tr");
        let $row_prev = $row.prev("tr");
        if($row_prev.length) {
            $row.insertBefore($row_prev);
            let b = ($row.parent().attr('id'));
            if(b=='tbl1')orgno(1);
            if(b=='tbl2')orgno(2);
            if(b=='tbl3')orgno(3);
            if(b=='tbl4')orgno(4);
        }
    });
    $(document).on('click','#rowdown',function() {
        let $row = $(this).closest("tr");
        let $row_next = $row.next("tr");
        if($row_next.length) {
            $row.insertAfter($row_next);
            let b = ($row.parent().attr('id'));
            if(b=='tbl1')orgno(1);
            if(b=='tbl2')orgno(2);
            if(b=='tbl3')orgno(3);
            if(b=='tbl4')orgno(4);
        }
    });
    $(document).on('click','#rowdel',function() {
        let row = $(this).closest("tr");
        let b = (row.parent().attr('id'));
        let c;
        if(b=='tbl1') c = tbl1.rows.length;
        if(b=='tbl2') c = tbl2.rows.length;
        if(b=='tbl3') c = tbl3.rows.length;
        if(b=='tbl4') c = tbl4.rows.length;
        if(c>2){
          $(row).remove();
          if(b=='tbl1')orgno(1);
          if(b=='tbl2')orgno(2);
          if(b=='tbl3')orgno(3);
          if(b=='tbl4')orgno(4);
        }
        if(b=='tbl1')Tbyte(1);
        if(b=='tbl2')Tbyte(2);
        if(b=='tbl3')Tbyte(3);
    });
    $(document).on('click','#rowins',function() {
        let $row = $(this).closest("tr");
        let $newRow = $row.clone(true);
        $newRow.insertAfter($row);
        let b = ($row.parent().attr('id'));
        if(b=='tbl1')orgno(1);
        if(b=='tbl2')orgno(2);
        if(b=='tbl3')orgno(3);
        if(b=='tbl1')Tbyte(1);
        if(b=='tbl2')Tbyte(2);
        if(b=='tbl3')Tbyte(3);
    });
    $(document).on('click','#rowread',function() {
      let $row = $(this).closest("tr");
      let row2 = $row.index();
      for(let sa=1; sa<tbl4.rows.length; sa++)tbl4.rows[sa].cells[0].className = "Cnon";

      if($row.attr('class')=="binS"){
        var re = Number(($row.attr('id')).substr(3))-1;
        dl1 = dataB[re][0].length;
        dl2 = dataB[re][1].length;
        dl3 = dataB[re][2].length;
        data1=[], data2=[], data3=[];
        for(let g1=0; g1<dl1; g1++) data1[g1] = [dataB[re][0][g1][0],dataB[re][0][g1][1],dataB[re][0][g1][2]];
        for(let g2=0; g2<dl2; g2++) data2[g2] = [dataB[re][1][g2][0],dataB[re][1][g2][1],dataB[re][1][g2][2]];
        for(let g3=0; g3<dl3; g3++) data3[g3] = [dataB[re][2][g3][0],dataB[re][2][g3][1]];

        
      }
      if($row.attr('class')=="wriD"){
        var re = Number(($row.attr('id')).substr(3))-1;
        if(tbl4.rows[row2].cells[7].innerText=="0(0)"){
          data1=[["10","00","00"],["0E","00","00"],["1E","00","00"],["2E","00","00"],["60","50","60"],["","00","00"]];
          data2=[["10","00","00"],["60","50","60"],["","00","00"]];
          data3=[["10","00"],["90","00"],["80","80"],["C0","26"],["10","5D"],["50","00"],["","00"]];
          Pdl1=0, Pdl2=0, Pdl3=0, Plo1=0, Plo2=0, Plo3=0, dl1=6, dl2=3, dl3=7;
        }else{
          data1=[], data2=[], data3=[];
          dl1 = dataW[re][0].length;
          dl2 = dataW[re][1].length;
          dl3 = dataW[re][2].length;
          for(let g1=0; g1<dl1; g1++) data1[g1] = [dataW[re][0][g1][0],dataW[re][0][g1][1],dataW[re][0][g1][2]];
          for(let g2=0; g2<dl2; g2++) data2[g2] = [dataW[re][1][g2][0],dataW[re][1][g2][1],dataW[re][1][g2][2]];
          for(let g3=0; g3<dl3; g3++) data3[g3] = [dataW[re][2][g3][0],dataW[re][2][g3][1]];
        }
      }
      Read1(1,dl1);
      Read1(2,dl2);
      Read2(dl3);
      tbl4.rows[row2].cells[0].className = "Cplay";

      Sreset();
      cangeC();
      timep(1);
      timep(2);
      timep(3);
  });
  $(document).on('click','#rowwrite',function() {
    let $row = $(this).closest("tr");
    let row2 = $row.index();
    for(let sa=1; sa<tbl4.rows.length; sa++)tbl4.rows[sa].cells[0].className = "Cnon";
    $row.attr('id',"wri"+wd);
    $row.attr('class','wriD');

    dl1 = tbl1.rows.length-1;
    dl2 = tbl2.rows.length-1;
    dl3 = tbl3.rows.length-1;
    data1=[], data2=[], data3=[];
    for(let g1=1; g1<dl1+1; g1++) data1[g1-1] = [tbl1.rows[g1].cells[1].firstElementChild.value,tbl1.rows[g1].cells[2].firstElementChild.value,tbl1.rows[g1].cells[3].firstElementChild.value];
    for(let g2=1; g2<dl2+1; g2++) data2[g2-1] = [tbl2.rows[g2].cells[1].firstElementChild.value,tbl2.rows[g2].cells[2].firstElementChild.value,tbl2.rows[g2].cells[3].firstElementChild.value];
    for(let g3=1; g3<dl3+1; g3++) data3[g3-1] = [tbl3.rows[g3].cells[1].firstElementChild.value,tbl3.rows[g3].cells[2].firstElementChild.value];

    dataW[wd-1] = [data1,data2,data3];
    tbl4.rows[row2].cells[4].innerText = (dl1*3) + "(" + dl1 + ")";
    tbl4.rows[row2].cells[5].innerText = (dl2*3) + "(" + dl2 + ")";
    tbl4.rows[row2].cells[6].innerText = (dl3*2) + "(" + dl3 + ")";
    tbl4.rows[row2].cells[7].innerText = ((dl1*3)+(dl2*3)+(dl3*2)) + "(" + (dl1+dl2+dl3) + ")";

    tbl4.rows[row2].cells[0].className = "Cplay";
    wd++;
    cangeC();
});
    



    $('#tbl1').on('keyup', 'input,textarea', function(e){
        if (e.keyCode==38 || e.keyCode==40) {
            var tr = $(this).closest('tr');
            if (tr[0]) {
                var p = $('input,textarea', tr[0]).index(this);
                if (e.keyCode==38) var _tr = $(tr).prev();
                if (e.keyCode==40) var _tr = $(tr).next();
                if (_tr[0]) {
                    $('input,textarea', _tr[0]).get(p).focus();
                }
            }
        }
        if (e.keyCode==37 || e.keyCode==39) {
            var index = null;
            var selector = 'input,textarea'; 
            var index = $(selector).index(this);
            if (e.keyCode==37 || e.keyCode==39 || e.keyCode==13) {
              var index = null;
              var selector = 'input,textarea'; 
              var index = $(selector).index(this);
              //if ( e.keyCode == 37 ){
              //    if (index > 0) $(selector).eq(index-1).focus();
              //    return false;
              //}
              //if ( e.keyCode == 39 ){
              //    if (index < $(selector).length - 1 ) $(selector).eq(index+1).focus();
              //    return false;
              //}
              if ( e.keyCode == 13 ){
                if (index < $(selector).length - 1 ) $(selector).eq(index+1).focus();
                return false;
              }
            }
        }
    });
    $('#tbl2').on('keyup', 'input,textarea', function(e){
        if (e.keyCode==38 || e.keyCode==40) {
            var tr = $(this).closest('tr');
            if (tr[0]) {
                var p = $('input,textarea', tr[0]).index(this);
                if (e.keyCode==38) var _tr = $(tr).prev();
                if (e.keyCode==40) var _tr = $(tr).next();
                if (_tr[0]) {
                    $('input,textarea', _tr[0]).get(p).focus();
                }
            }
        }
        if (e.keyCode==37 || e.keyCode==39 || e.keyCode==13) {
          var index = null;
          var selector = 'input,textarea'; 
          var index = $(selector).index(this);
          //if ( e.keyCode == 37 ){
          //    if (index > 0) $(selector).eq(index-1).focus();
          //    return false;
          //}
          //if ( e.keyCode == 39 ){
          //    if (index < $(selector).length - 1 ) $(selector).eq(index+1).focus();
          //    return false;
          //}
          if ( e.keyCode == 13 ){
            if (index < $(selector).length - 1 ) $(selector).eq(index+1).focus();
            return false;
          }
        }
    });
    $('#tbl3').on('keyup', 'input,textarea', function(e){
        if (e.keyCode==38 || e.keyCode==40) {
            var tr = $(this).closest('tr');
            if (tr[0]) {
                var p = $('input,textarea', tr[0]).index(this);
                if (e.keyCode==38) var _tr = $(tr).prev();
                if (e.keyCode==40) var _tr = $(tr).next();
                if (_tr[0]) {
                    $('input,textarea', _tr[0]).get(p).focus();
                }
            }
        }
        if (e.keyCode==37 || e.keyCode==39 || e.keyCode==13) {
            var index = null;
            var selector = 'input,textarea'; 
            var index = $(selector).index(this);
            //if ( e.keyCode == 37 ){
            //    if (index > 0) $(selector).eq(index-1).focus();
            //    return false;
            //}
            //if ( e.keyCode == 39 ){
            //    if (index < $(selector).length - 1 ) $(selector).eq(index+1).focus();
            //    return false;
            //}
            if ( e.keyCode == 13 ){
                if (index < $(selector).length - 1 ) $(selector).eq(index+1).focus();
                return false;
            }
        }
    });



    
     $(document).on('change','.da1',function(){
        let row = $('[class=da1]').index(this);
        let b = $(this).parent().parent().parent().attr('id');
        if(b=='tbl2')row = row-tbl1.rows.length+1;
        let val = ($(this).val()).split(':').slice(0, -1).join(':');
        if(val=="") val = $(this).val();
            let Aux = parseInt(val.substr(0, 1),16);
            let Aux2 = parseInt(val.substr(1, 1),16);
            let a=val, c="";
            if(Aux2>=1 && Aux2<=12 && Aux>=2 && Aux<=6) {
                switch (Aux2) {
                    case 1:
                        a="C";
                      break;
                    case 2:
                        a="C#";
                      break;
                    case 3:
                        a="D";
                      break;
                    case 4:
                        a="D#";
                      break;
                    case 5:
                        a="E";
                     break;
                    case 6:
                        a="F";
                     break;
                    case 7:
                        a="F#";
                      break;
                    case 8:
                        a="G";
                      break;
                    case 9:
                        a="G#";
                      break;
                    case 10:
                        a="A";
                      break;
                    case 11:
                        a="A#";
                      break;
                    case 12:
                        a="B";
                      break;
                }
                switch (Aux) {
                    case 2:
                        c="2";
                      break;
                    case 3:
                        c="3";
                      break;
                    case 4:
                        c="4";
                      break;
                    case 5:
                        c="5";
                       break;
                    case 6:
                        c="6";
                      break;
                }
            }
            let d = c + a;
          
        if(b=='tbl1'){
          tbl1.rows[row+1].cells[1].firstElementChild.value = val;

          tbl1.rows[row+1].cells[5].lastElementChild.setAttribute('list','noS0');
          tbl1.rows[row+1].cells[5].firstElementChild.setAttribute('list','noS0');
          tbl1.rows[row+1].cells[5].firstElementChild.value = "";
          tbl1.rows[row+1].cells[5].lastElementChild.value = "";
            if(c!=""||d=="xx"){
              tbl1.rows[row+1].cells[5].lastElementChild.setAttribute('list','noS4');
              tbl1.rows[row+1].cells[5].firstElementChild.setAttribute('list','noS2');
              if(d=="xx"){
                tbl1.rows[row+1].cells[5].firstElementChild.value = "";
                tbl1.rows[row+1].cells[5].lastElementChild.value = "";
              }else{
                tbl1.rows[row+1].cells[5].firstElementChild.value = c;
                tbl1.rows[row+1].cells[5].lastElementChild.value = a;
              }
            }else tbl1.rows[row+1].cells[5].lastElementChild.value = d;
            if(Aux2==15) tbl1.rows[row+1].cells[5].lastElementChild.setAttribute('list','noS6');
            switch(d){
              case "10":
              case "20":
              case "0F":
              case "1F":
              case "8F":
              case "9F":
              case "AF":
              case "BF":
              case "CF":
              case "DF":
              case "EF":
              case "FF":
              case "F0":
              case "0E":
              case "1E":
              case "2E":
                tbl1.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS0");
              break;
              case "50":
                tbl1.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS9");
              break;
              case "60":
                tbl1.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS7");
              break;
              default:
                tbl1.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS10");
              break;
            }
          
            tbl1.rows[row+1].cells[4].className = "Cnon";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="0F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="1F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="8F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="9F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="AF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="BF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="CF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="DF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="EF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="FF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="50")tbl1.rows[row+1].cells[4].className = "Ceff";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="60")tbl1.rows[row+1].cells[4].className = "Ctim";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="20")tbl1.rows[row+1].cells[4].className = "Cadd";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="10")tbl1.rows[row+1].cells[4].className = "Cres";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="0E")tbl1.rows[row+1].cells[4].className = "Ctag";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="1E")tbl1.rows[row+1].cells[4].className = "Ctag";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="2E")tbl1.rows[row+1].cells[4].className = "Ctag";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="F0")tbl1.rows[row+1].cells[4].className = "Cend";
        }
        if(b=='tbl2'){
          tbl2.rows[row+1].cells[1].firstElementChild.value = val;
          tbl2.rows[row+1].cells[5].lastElementChild.setAttribute('list','noS0');
          tbl2.rows[row+1].cells[5].firstElementChild.setAttribute('list','noS0');
          tbl2.rows[row+1].cells[5].firstElementChild.value = "";
          tbl2.rows[row+1].cells[5].lastElementChild.value = "";
          if(c!=""||d=="xx"){
            tbl2.rows[row+1].cells[5].lastElementChild.setAttribute('list','noS4');
            tbl2.rows[row+1].cells[5].firstElementChild.setAttribute('list','noS2');
            if(d=="xx"){
              tbl2.rows[row+1].cells[5].firstElementChild.value = "";
              tbl2.rows[row+1].cells[5].lastElementChild.value = "";
            }else{
              tbl2.rows[row+1].cells[5].firstElementChild.value = c;
              tbl2.rows[row+1].cells[5].lastElementChild.value = a;
            }
          }else tbl2.rows[row+1].cells[5].lastElementChild.value = d;
            if(Aux2==15) tbl2.rows[row+1].cells[5].lastElementChild.setAttribute('list','noS6');
            switch(d){
              case "10":
              case "20":
              case "0F":
              case "1F":
              case "8F":
              case "9F":
              case "AF":
              case "BF":
              case "CF":
              case "DF":
              case "EF":
              case "FF":
              case "F0":
              case "0E":
              case "1E":
              case "2E":
                tbl2.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS0");
              break;
              case "50":
                tbl2.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS9");
              break;
              case "60":
                tbl2.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS7");
              break;
              default:
                tbl2.rows[row+1].cells[6].lastElementChild.setAttribute('list',"noS10");
              break;
            }

            tbl2.rows[row+1].cells[4].className = "Cnon";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="0F")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="1F")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="8F")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="9F")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="AF")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="BF")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="CF")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="DF")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="EF")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="FF")tbl2.rows[row+1].cells[4].className = "Crep";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="50")tbl2.rows[row+1].cells[4].className = "Ceff";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="60")tbl2.rows[row+1].cells[4].className = "Ctim";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="20")tbl2.rows[row+1].cells[4].className = "Cadd";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="10")tbl2.rows[row+1].cells[4].className = "Cres";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="0E")tbl2.rows[row+1].cells[4].className = "Ctag";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="1E")tbl2.rows[row+1].cells[4].className = "Ctag";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="2E")tbl2.rows[row+1].cells[4].className = "Ctag";
            if(tbl2.rows[row+1].cells[1].firstElementChild.value=="F0")tbl2.rows[row+1].cells[4].className = "Cend";
        }
        cangeC();
        jsave();
     });

     $(document).on('change','.da2',function(){
        let row = $('[class=da2]').index(this);
        let b = $(this).parent().parent().parent().attr('id');
        if(b=='tbl2')row = row-tbl1.rows.length+2;
        if(b=='tbl1'){
            switch(tbl1.rows[row+1].cells[1].firstElementChild.value){
              case "10":
              case "20":
                tbl1.rows[row+1].cells[6].firstElementChild.value = "0";
                break;
              case "50":
              case "60":
                tbl1.rows[row+1].cells[6].firstElementChild.value = $(this).val();
                break;
              default:
                tbl1.rows[row+1].cells[6].firstElementChild.value = parseInt($(this).val(),16);
                break;
            }
            if(tbl1.rows[row+2].cells[1].firstElementChild.value == "20" && tbl1.rows[row+1].cells[1].firstElementChild.value != "50" && tbl1.rows[row+1].cells[1].firstElementChild.value != "60"){
              let len2 = tbl1.rows[row+2].cells[2].firstElementChild.value + tbl1.rows[row+1].cells[2].firstElementChild.value;
              tbl1.rows[row+1].cells[6].firstElementChild.value = parseInt(len2,16);
            }
            if(tbl1.rows[row+1].cells[2].firstElementChild.value=="0")tbl1.rows[row+1].cells[2].firstElementChild.value="00";
        }
        if(b=='tbl2'){
            switch(tbl2.rows[row].cells[1].firstElementChild.value){
              case "10":
              case "20":
                tbl2.rows[row].cells[6].firstElementChild.value = "0"; 
                break;
              case "50":
              case "60":
                tbl2.rows[row].cells[6].firstElementChild.value = $(this).val(); 
                break;
              default:
                tbl2.rows[row].cells[6].firstElementChild.value = parseInt($(this).val(),16); 
                break;
            }
            if(tbl2.rows[row+1].cells[1].firstElementChild.value == "20" && tbl2.rows[row].cells[1].firstElementChild.value != "50" && tbl2.rows[row].cells[1].firstElementChild.value != "60"){
              let len2 = tbl2.rows[row+1].cells[2].firstElementChild.value + tbl2.rows[row].cells[2].firstElementChild.value;
              tbl2.rows[row].cells[6].firstElementChild.value = parseInt(len2,16); 
            }
            if(tbl2.rows[row].cells[2].firstElementChild.value=="0")tbl2.rows[row].cells[2].firstElementChild.value="00";
        }
     });

     $(document).on('change','.da3',function(){
        let row = $('[class=da3]').index(this);
        let b = $(this).parent().parent().parent().attr('id');
        if(b=='tbl2')row = row-tbl1.rows.length+2;
        if(b=='tbl1'){
            switch(tbl1.rows[row+1].cells[1].firstElementChild.value){
              case "10":
                let len1 = tbl1.rows[row+1].cells[3].firstElementChild.value + tbl1.rows[row+1].cells[2].firstElementChild.value;
                tbl1.rows[row+1].cells[7].firstElementChild.value = parseInt(len1,16);
                break;
              case "20":
                tbl1.rows[row+1].cells[7].firstElementChild.value = "0";
                break;
              default:
                tbl1.rows[row+1].cells[7].firstElementChild.value = parseInt($(this).val(),16); 
                break;
            }
            if(tbl1.rows[row+1].cells[1].firstElementChild.value == "20"){
              let len2 = tbl1.rows[row+2].cells[3].firstElementChild.value + tbl1.rows[row+1].cells[3].firstElementChild.value;
              tbl1.rows[row+1].cells[7].firstElementChild.value = parseInt(len2,16);
            }
            if(tbl1.rows[row+1].cells[2].firstElementChild.value=="0")tbl1.rows[row+1].cells[2].firstElementChild.value="00";
        }
        if(b=='tbl2'){
            switch(tbl2.rows[row].cells[1].firstElementChild.value){
              case "10":
                let len1 = tbl2.rows[row].cells[3].firstElementChild.value + tbl2.rows[row].cells[2].firstElementChild.value;
                tbl2.rows[row].cells[7].firstElementChild.value = parseInt(len1,16); 
                break;
              case "20":
                tbl2.rows[row].cells[7].firstElementChild.value = "0"; 
                break;
              default:
                tbl2.rows[row].cells[7].firstElementChild.value = parseInt($(this).val(),16); 
                break;
            }
            if(tbl2.rows[row].cells[1].firstElementChild.value == "20"){
              let len2 = tbl2.rows[row+1].cells[3].firstElementChild.value + tbl2.rows[row].cells[3].firstElementChild.value;
              tbl2.rows[row].cells[7].firstElementChild.value = parseInt(len2,16); 
            }
            if(tbl2.rows[row].cells[2].firstElementChild.value=="0")tbl2.rows[row].cells[2].firstElementChild.value="00";
        }
        jsave();
     });

     $(document).on('change','.no1,.no1_2',function(){
        let row = $('[class=no1]').index(this);
        if(row==-1) row = $('[class=no1_2]').index(this);
        let b = $(this).parent().parent().parent().attr('id');
        if(b=='tbl2')row = row-tbl1.rows.length+2;
        let val1,val2;
        if(b=='tbl1'){
          val1 = (tbl1.rows[row+1].cells[5].firstElementChild.value).split('/:|//').slice(0, -1).join(':');
          if(val1=="") val1 = tbl1.rows[row+1].cells[5].firstElementChild.value;
          val2 = (tbl1.rows[row+1].cells[5].lastElementChild.value).split(':').slice(0, -1).join(':');
          if(val2=="") val2 = tbl1.rows[row+1].cells[5].lastElementChild.value;
          tbl1.rows[row+1].cells[5].firstElementChild.value = val1;
          tbl1.rows[row+1].cells[5].lastElementChild.value = val2;
        }
        if(b=='tbl2'){
          val1 = (tbl2.rows[row].cells[5].firstElementChild.value).split('/:|//').slice(0, -1).join(':');
          if(val1=="") val1 = tbl2.rows[row].cells[5].firstElementChild.value;
          val2 = (tbl2.rows[row].cells[5].lastElementChild.value).split(':').slice(0, -1).join(':');
          if(val2=="") val2 = tbl2.rows[row].cells[5].lastElementChild.value;
          tbl2.rows[row].cells[5].firstElementChild.value = val1;
          tbl2.rows[row].cells[5].lastElementChild.value = val2;
        }
        let val = val1 + val2;
            let Aux0, Aux, Aux2, a=val, c="";
            Aux = val.substr(0, 1);
            Aux2 = val.substr(1);
            Aux0 = val.substr(1, 1);
          if(val1!=""){
            if (Aux0=='A'||Aux0=='B'||Aux0=='C'||Aux0=='D'||Aux0=='E'||Aux0=='F'||Aux0=='G') {
                switch (Aux2) {
                    case "C":
                        a="1";
                      break;
                    case "C#":
                    case "Db":
                        a="2";
                      break;
                    case "D":
                        a="3";
                      break;
                    case "D#":
                    case "Eb":
                        a="4";
                      break;
                    case "E":
                        a="5";
                     break;
                    case "F":
                        a="6";
                     break;
                    case "F#":
                    case "Gb":
                        a="7";
                      break;
                    case "G":
                        a="8";
                      break;
                    case "G#":
                    case "Ab":
                        a="9";
                      break;
                    case "A":
                        a="A";
                      break;
                    case "A#":
                    case "Bb":
                        a="B";
                      break;
                    case "B":
                        a="C";
                      break;
                }
                switch (Aux) {
                    case "2":
                        c="2";
                      break;
                    case "3":
                        c="3";
                      break;
                    case "4":
                        c="4";
                      break;
                    case "5":
                        c="5";
                       break;
                    case "6":
                        c="6";
                      break;
                }
              }
            }
            let d = c + a;
        if(b=='tbl1'){
            tbl1.rows[row+1].cells[1].firstElementChild.value = d;
            tbl1.rows[row+1].cells[4].className = "Cnon";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="0F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="1F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="8F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="9F")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="AF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="BF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="CF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="DF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="EF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="FF")tbl1.rows[row+1].cells[4].className = "Crep";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="50")tbl1.rows[row+1].cells[4].className = "Ceff";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="60")tbl1.rows[row+1].cells[4].className = "Ctim";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="20")tbl1.rows[row+1].cells[4].className = "Cadd";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="10")tbl1.rows[row+1].cells[4].className = "Cres";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="0E")tbl1.rows[row+1].cells[4].className = "Ctag";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="1E")tbl1.rows[row+1].cells[4].className = "Ctag";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="2E")tbl1.rows[row+1].cells[4].className = "Ctag";
            if(tbl1.rows[row+1].cells[1].firstElementChild.value=="F0")tbl1.rows[row+1].cells[4].className = "Cend";
        }
        if(b=='tbl2'){
            tbl2.rows[row].cells[1].firstElementChild.value = d;
            tbl2.rows[row].cells[4].className = "Cnon";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="0F")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="1F")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="8F")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="9F")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="AF")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="BF")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="CF")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="DF")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="EF")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="FF")tbl2.rows[row].cells[4].className = "Crep";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="50")tbl2.rows[row].cells[4].className = "Ceff";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="60")tbl2.rows[row].cells[4].className = "Ctim";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="20")tbl2.rows[row].cells[4].className = "Cadd";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="10")tbl2.rows[row].cells[4].className = "Cres";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="0E")tbl2.rows[row].cells[4].className = "Ctag";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="1E")tbl2.rows[row].cells[4].className = "Ctag";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="2E")tbl2.rows[row].cells[4].className = "Ctag";
            if(tbl2.rows[row].cells[1].firstElementChild.value=="F0")tbl2.rows[row].cells[4].className = "Cend";
        }
        cangeC();
        jsave();
     });

     $(document).on('change','.no2',function(){
        let row = $('[class=no2]').index(this);
        let b = $(this).parent().parent().parent().attr('id');
        if(b=='tbl2')row = row-tbl1.rows.length+2;
        let val = ($(this).val()).split(':').slice(0, -1).join(':');
        if(val=="") val = $(this).val();
        let c,d;
        if(b=='tbl1'){
          tbl1.rows[row+1].cells[6].firstElementChild.value = val;
            switch(tbl1.rows[row+1].cells[1].firstElementChild.value){
              case "10":
              case "20":
                break;
              case "50":
              case "60":
                tbl1.rows[row+1].cells[2].firstElementChild.value = val;
                break;
              default:
                c = ('00' + Number(val).toString(16).toUpperCase()).substr(-2);
                d = ('0000' + Number(val).toString(16).toUpperCase()).substr(-4);
                tbl1.rows[row+1].cells[2].firstElementChild.value = ('00' + Number(val).toString(16).toUpperCase()).substr(-2); 
                if(tbl1.rows[row+2].cells[1].firstElementChild.value == "20"){
                    tbl1.rows[row+2].cells[2].firstElementChild.value = "00";
                }
                break;
            }
            if(c.length>=3){
              let u = tbl1.rows.length;
              if(u<=row+2 || tbl1.rows[row+2].cells[1].firstElementChild.value != "20"){
                let $row = $(this).parent().parent().closest("tr");
                let $newRow = $row.clone(true);
                $newRow.insertAfter($row);
                tbl1.rows[row+2].cells[1].firstElementChild.value = "20";
                tbl1.rows[row+2].cells[3].firstElementChild.value = "00";
                tbl1.rows[row+2].cells[6].firstElementChild.value = "0";
                tbl1.rows[row+2].cells[7].firstElementChild.value = "0";
                orgno(1);
              }
              let len3 = d.substr(0, 2);
              let len4 = d.substr(2, 2);
              tbl1.rows[row+1].cells[2].firstElementChild.value = len4;
              tbl1.rows[row+2].cells[2].firstElementChild.value = len3;
            }
        }
        if(b=='tbl2'){
          tbl2.rows[row].cells[6].firstElementChild.value = val;
            switch(tbl2.rows[row].cells[1].firstElementChild.value){
              case "10":
              case "20":
                break;
              case "50":
              case "60":
                tbl2.rows[row].cells[2].firstElementChild.value = val; 
                break;
              default:
                c = ('00' + Number(val).toString(16).toUpperCase()).substr(-2);
                d = ('0000' + Number(val).toString(16).toUpperCase()).substr(-4); 
                tbl2.rows[row].cells[2].firstElementChild.value = ('00' + Number(val).toString(16).toUpperCase()).substr(-2);
                if(tbl2.rows[row+1].cells[1].firstElementChild.value == "20"){
                    tbl2.rows[row+1].cells[2].firstElementChild.value = "00";
                }
                break;
            }
            if(c.length>=3){
              let u = tbl2.rows.length;
              if(u<=row+2 || tbl2.rows[row+1].cells[1].firstElementChild.value != "20"){
                let $row = $(this).parent().parent().closest("tr");
                let $newRow = $row.clone(true);
                $newRow.insertAfter($row);
                tbl2.rows[row+1].cells[1].firstElementChild.value = "20";
                tbl2.rows[row+1].cells[3].firstElementChild.value = "00";
                tbl2.rows[row+1].cells[6].firstElementChild.value = "0";
                tbl2.rows[row+1].cells[7].firstElementChild.value = "0";
                orgno(2);
              }
              let len3 = d.substr(0, 2);
              let len4 = d.substr(2, 2);
              tbl2.rows[row].cells[2].firstElementChild.value = len4; 
              tbl2.rows[row+1].cells[2].firstElementChild.value = len3; 
            }
        }
        jsave();
     });
     $(document).on('change','.no3',function(){
        let row = $('[class=no3]').index(this);
        let b = $(this).parent().parent().parent().attr('id');
        if(b=='tbl2')row = row-tbl1.rows.length+2;
        let val = ($(this).val()).split(':').slice(0, -1).join(':');
        if(val=="") val = $(this).val();
        let c,d;
        if(b=='tbl1'){
          tbl1.rows[row+1].cells[7].firstElementChild.value = val;
            switch(tbl1.rows[row+1].cells[1].firstElementChild.value){
              case "10":
                let len1 = ('0000' + Number(tbl1.rows[row+1].cells[7].firstElementChild.value).toString(16).toUpperCase()).substr(-4);
                let len5 = len1.substr(0, 2);
                let len6 = len1.substr(2, 2);
                tbl1.rows[row+1].cells[2].firstElementChild.value = len6;
                tbl1.rows[row+1].cells[3].firstElementChild.value = len5;
                break;
              case "20":
                break;
              default:
                c = Number(val).toString(16).toUpperCase();
                d = ('0000' + Number(val).toString(16).toUpperCase()).substr(-4);
                tbl1.rows[row+1].cells[3].firstElementChild.value = ('00' + Number(val).toString(16).toUpperCase()).substr(-2); 
                if(tbl1.rows[row+2].cells[1].firstElementChild.value == "20"){
                    tbl1.rows[row+2].cells[3].firstElementChild.value = "00";
                }
                break;
            }
            if(c.length>=3){
              let u = tbl1.rows.length;
              if(u<=row+2 || tbl1.rows[row+2].cells[1].firstElementChild.value != "20"){
                let $row = $(this).parent().parent().closest("tr");
                let $newRow = $row.clone(true);
                $newRow.insertAfter($row);
                tbl1.rows[row+2].cells[1].firstElementChild.value = "20";
                tbl1.rows[row+2].cells[2].firstElementChild.value = "00";
                tbl1.rows[row+2].cells[6].firstElementChild.value = "0";
                tbl1.rows[row+2].cells[7].firstElementChild.value = "0";
                orgno(1);
              }
              let len3 = d.substr(0, 2);
              let len4 = d.substr(2, 2);
              tbl1.rows[row+1].cells[3].firstElementChild.value = len4;
              tbl1.rows[row+2].cells[3].firstElementChild.value = len3;
            }
        }
        if(b=='tbl2'){
          tbl2.rows[row].cells[7].firstElementChild.value = val;
            switch(tbl2.rows[row].cells[1].firstElementChild.value){
              case "10":
                let len1 = ('0000' + Number(tbl2.rows[row].cells[7].firstElementChild.value).toString(16).toUpperCase()).substr(-4);
                let len5 = len1.substr(0, 2);
                let len6 = len1.substr(2, 2);
                tbl2.rows[row].cells[2].firstElementChild.value = len6; 
                tbl2.rows[row].cells[3].firstElementChild.value = len5; 
                break;
              case "20":
                break;
              default:
                c = Number(val).toString(16).toUpperCase();
                d = ('0000' + Number(val).toString(16).toUpperCase()).substr(-4);
                tbl2.rows[row].cells[3].firstElementChild.value = ('00' + Number(val).toString(16).toUpperCase()).substr(-2);
                if(tbl2.rows[row+1].cells[1].firstElementChild.value == "20"){
                    tbl2.rows[row+1].cells[3].firstElementChild.value = "00";
                }
                break;
            }
            if(c.length>=3){
              let u = tbl2.rows.length;
              if(u<=row+2 || tbl2.rows[row+1].cells[1].firstElementChild.value != "20"){
                let $row = $(this).parent().parent().closest("tr");
                let $newRow = $row.clone(true);
                $newRow.insertAfter($row);
                tbl2.rows[row+1].cells[1].firstElementChild.value = "20";
                tbl2.rows[row+1].cells[2].firstElementChild.value = "00";
                tbl2.rows[row+1].cells[6].firstElementChild.value = "0";
                tbl2.rows[row+1].cells[7].firstElementChild.value = "0";
                orgno(2);
              }
              let len3 = d.substr(0, 2);
              let len4 = d.substr(2, 2);
              tbl2.rows[row].cells[3].firstElementChild.value = len4; 
              tbl2.rows[row+1].cells[3].firstElementChild.value = len3; 
            }
        }
        jsave();
     });



     $(document).on('change','.cda1',function(){
        let row = $('[class=cda1]').index(this);
        let val = ($(this).val()).split(':').slice(0, -1).join(':');
        if(val=="") val = $(this).val();
        let Aux = parseInt(val.substr(0, 1),16);
        let Aux2 = parseInt(val.substr(1, 1),16);
        let a=val, b="";
        if (Aux2>=1 && Aux2<=12) {
            if (Aux!=15) {
                //Bass
                switch (Aux2) {
                    case 1:
                        a="C";
                      break;
                    case 2:
                        a="C#";
                      break;
                    case 3:
                        a="D";
                      break;
                    case 4:
                        a="D#";
                      break;
                    case 5:
                        a="E";
                     break;
                    case 6:
                        a="F";
                     break;
                    case 7:
                        a="F#";
                      break;
                    case 8:
                        a="G";
                      break;
                    case 9:
                        a="G#";
                      break;
                    case 10:
                        a="A";
                      break;
                    case 11:
                        a="A#";
                      break;
                    case 12:
                        a="B";
                      break;
                }
                //code
                switch (Aux) {
                    case 0:
                        b="0";
                      break;
                    case 1:
                        b="m";
                      break;
                    case 2:
                        b="7";
                      break;
                    case 3:
                        b="m7";
                      break;
                    case 4:
                        b="M7";
                      break;
                    case 5:
                        b="6";
                       break;
                    case 6:
                        b="m7-5";
                      break;
                    case 7:
                        b="sus4";
                      break;
                    case 8:
                        b="dim";
                       break;
                    case 9:
                        b="aug";
                       break;
                    case 10:
                        b="m6";
                       break;
                    case 11:
                        b="-5";
                       break;
                    case 12:
                        b="-9";
                       break;
                    case 13:
                        b="9";
                       break;
                    case 14:
                        b="-";
                      break;
                }
            }
        }
        let c = a + b;
        tbl3.rows[row+1].cells[1].firstElementChild.value = val;
        tbl3.rows[row+1].cells[4].lastElementChild.setAttribute('list',"noS0");
        tbl3.rows[row+1].cells[4].firstElementChild.setAttribute('list',"noS0");
        tbl3.rows[row+1].cells[4].firstElementChild.value = "";
        tbl3.rows[row+1].cells[4].lastElementChild.value = "";
            if(b!=""||c=="xx"){
              tbl3.rows[row+1].cells[4].lastElementChild.setAttribute('list',"noS5");
              tbl3.rows[row+1].cells[4].firstElementChild.setAttribute('list',"noS4");
              if(c=="xx"){
                tbl3.rows[row+1].cells[4].firstElementChild.value = "";
                tbl3.rows[row+1].cells[4].lastElementChild.value = "";
              }else{
                tbl3.rows[row+1].cells[4].firstElementChild.value = a;
                tbl3.rows[row+1].cells[4].lastElementChild.value = b;
              }
            }else tbl3.rows[row+1].cells[4].lastElementChild.value = c;
            if(Aux2==15) tbl3.rows[row+1].cells[4].lastElementChild.setAttribute('list',"noS6");

            switch(c){
              case "20":
              case "90":
              case "0F":
              case "1F":
              case "8F":
              case "9F":
              case "AF":
              case "BF":
              case "CF":
              case "DF":
              case "EF":
              case "FF":
              case "F0":
                tbl3.rows[row+1].cells[5].lastElementChild.setAttribute('list',"noS0");
              break;
              case "50":
              case "60":
                tbl3.rows[row+1].cells[5].lastElementChild.setAttribute('list',"noS8");
              break;
              case "80":
                tbl3.rows[row+1].cells[5].lastElementChild.setAttribute('list',"noS11");
              break;
              case "C0":
                tbl3.rows[row+1].cells[5].lastElementChild.setAttribute('list',"noS12");
              break;
              default:
                tbl3.rows[row+1].cells[5].lastElementChild.setAttribute('list',"noS10");
              break;
            }
        
            tbl3.rows[row+1].cells[3].className = "Cnon";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="0F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="1F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="8F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="9F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="AF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="BF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="CF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="DF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="EF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="FF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="50")tbl3.rows[row+1].cells[3].className = "Cryc";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="60")tbl3.rows[row+1].cells[3].className = "Cfil";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="20")tbl3.rows[row+1].cells[3].className = "Cadd";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="10")tbl3.rows[row+1].cells[3].className = "Cres";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="80")tbl3.rows[row+1].cells[3].className = "Csry";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="C0")tbl3.rows[row+1].cells[3].className = "Ctem";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="90")tbl3.rows[row+1].cells[3].className = "Ccre";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="F0")tbl3.rows[row+1].cells[3].className = "Cend";
            cangeC();
            jsave();
    });
    $(document).on('change','.cda2',function(){
        let row = $('[class=cda2]').index(this);
        switch(tbl3.rows[row+1].cells[1].firstElementChild.value){
            case "20":
              tbl3.rows[row+1].cells[5].firstElementChild.value = "0";
              break;
            case "50":
            case "60":
            case "80":
            case "C0":
              tbl3.rows[row+1].cells[5].firstElementChild.value = $(this).val(); 
              break;
            default:
              tbl3.rows[row+1].cells[5].firstElementChild.value = parseInt($(this).val(),16); 
              break;
          }
          if(tbl3.rows[row+1].cells[1].firstElementChild.value == "20"){
            let len2 = tbl3.rows[row+2].cells[2].firstElementChild.value + tbl3.rows[row+1].cells[2].firstElementChild.value;
            tbl3.rows[row+1].cells[5].firstElementChild.value = parseInt(len2,16);
          }
          if(tbl3.rows[row+1].cells[2].firstElementChild.value=="0")tbl3.rows[row+1].cells[2].firstElementChild.value="00";
          jsave();
     });
     $(document).on('change','.cno1,.cno1_2',function(){
      let row = $('[class=cno1]').index(this);
      if(row==-1) row = $('[class=cno1_2]').index(this);
      let val1 = (tbl3.rows[row+1].cells[4].firstElementChild.value).split('/:|//').slice(0, -1).join(':');
      if(val1=="") val1 = tbl3.rows[row+1].cells[4].firstElementChild.value;
      let val2 = (tbl3.rows[row+1].cells[4].lastElementChild.value).split(':').slice(0, -1).join(':');
      if(val2=="") val2 = tbl3.rows[row+1].cells[4].lastElementChild.value;
      tbl3.rows[row+1].cells[4].firstElementChild.value = val1;
      tbl3.rows[row+1].cells[4].lastElementChild.value = val2;
      let val = val1 + val2;
            let Aux, Aux2, Aux0, a=val, b="";
            if(val.indexOf('#')==-1){
                Aux0 = val.substr(0, 1);
                Aux = val.substr(0, 1);
                Aux2 = val.substr(1);
            }else{
                Aux0 = val.substr(0, 1);
                Aux = val.substr(0, 2);
                Aux2 = val.substr(2);
            }
            if (Aux0=='A'||Aux0=='B'||Aux0=='C'||Aux0=='D'||Aux0=='E'||Aux0=='F'||Aux0=='G') {
                if (Aux2!="F") {
                    //Bass
                    switch (Aux) {
                        case "C":
                            a="1";
                          break;
                        case "C#":
                        case "Db":
                            a="2";
                          break;
                        case "D":
                            a="3";
                          break;
                        case "D#":
                        case "Eb":
                            a="4";
                          break;
                        case "E":
                            a="5";
                         break;
                        case "F":
                            a="6";
                         break;
                        case "F#":
                        case "Gb":
                            a="7";
                          break;
                        case "G":
                            a="8";
                          break;
                        case "G#":
                        case "Ab":
                            a="9";
                          break;
                        case "A":
                            a="A";
                          break;
                        case "A#":
                        case "Bb":
                            a="B";
                          break;
                        case "B":
                            a="C";
                          break;
                    }
                    //code
                    switch (Aux2) {
                        case "0":
                            b="0";
                          break;
                        case "m":
                            b="1";
                          break;
                        case "7":
                            b="2";
                          break;
                        case "m7":
                            b="3";
                          break;
                        case "M7":
                            b="4";
                          break;
                        case "6":
                            b="5";
                           break;
                        case "m7-5":
                            b="6";
                          break;
                        case "sus4":
                        case "Sus4":
                            b="7";
                          break;
                        case "dim":
                        case "Dim":
                            b="8";
                           break;
                        case "aug":
                        case "Aug":
                            b="9";
                           break;
                        case "m6":
                            b="A";
                           break;
                        case "-5":
                            b="B";
                           break;
                        case "-9":
                            b="C";
                           break;
                        case "9":
                            b="D";
                           break;
                        case "-":
                            b="E";
                          break;
                    }
                }
            }
            let c = b + a;
            tbl3.rows[row+1].cells[1].firstElementChild.value = c;
            tbl3.rows[row+1].cells[3].className = "Cnon";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="0F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="1F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="8F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="9F")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="AF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="BF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="CF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="DF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="EF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="FF")tbl3.rows[row+1].cells[3].className = "Crep";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="50")tbl3.rows[row+1].cells[3].className = "Cryc";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="60")tbl3.rows[row+1].cells[3].className = "Cfil";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="20")tbl3.rows[row+1].cells[3].className = "Cadd";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="10")tbl3.rows[row+1].cells[3].className = "Cres";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="80")tbl3.rows[row+1].cells[3].className = "Cstr";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="C0")tbl3.rows[row+1].cells[3].className = "Ctem";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="90")tbl3.rows[row+1].cells[3].className = "Ccre";
            if(tbl3.rows[row+1].cells[1].firstElementChild.value=="F0")tbl3.rows[row+1].cells[3].className = "Cend";
            cangeC();
            jsave();
     });
     $(document).on('change','.cno2',function(){
        let row = $('[class=cno2]').index(this);
        let val = ($(this).val()).split(':').slice(0, -1).join(':');
        if(val=="") val = $(this).val();
        tbl3.rows[row+1].cells[5].firstElementChild.value = val
        let c,d;
        switch(tbl3.rows[row+1].cells[1].firstElementChild.value){
            case "20":
              break;
            case "50":
            case "60":
            case "80":
            case "C0":
                tbl3.rows[row+1].cells[2].firstElementChild.value = val; 
                break;
            default:
              c = Number(val).toString(16).toUpperCase();
              d = ('0000' + Number(val).toString(16).toUpperCase()).substr(-4);
              tbl3.rows[row+1].cells[2].firstElementChild.value = ('00' + Number(val).toString(16).toUpperCase()).substr(-2); 
              if(tbl3.rows[row+2].cells[1].firstElementChild.value == "20"){
                  tbl3.rows[row+2].cells[2].firstElementChild.value = "00";
              }
              break;
          }
          if(c.length>=3){
            let u = tbl3.rows.length;
            if(u<=row+2 || tbl3.rows[row+2].cells[1].firstElementChild.value != "20"){
              let $row = $(this).parent().parent().closest("tr");
              let $newRow = $row.clone(true);
              $newRow.insertAfter($row);
              tbl3.rows[row+2].cells[1].firstElementChild.value = "20";
              tbl3.rows[row+2].cells[4].firstElementChild.value = "0";
              orgno(1);
            }
            let len3 = d.substr(0, 2);
            let len4 = d.substr(2, 2);
            tbl3.rows[row+1].cells[2].firstElementChild.value = len4;
            tbl3.rows[row+2].cells[2].firstElementChild.value = len3;
          }
          jsave();
     });

    
});

function MidiL() {
  let vv = MoutS.length;
  for(let ss=0; ss<vv; ss++){
   MoutS.remove(0);
  }
  navigator.requestMIDIAccess({
    sysex: false
  }).then(function (access) {
    var outputs = access.outputs;
    MoutOn=1;
    for (outputs of outputs.values()) {
        midi.output.push(outputs);
        $output.append(new Option(outputs.name, outputs.id));
    }
  }, function (err) {
    console.dir(err);
    MoutOn=0;
  });
}

const filein = document.getElementById("filein");
const ddarea = document.getElementById("ddarea");
const tarea = document.getElementById("txtarea");
        // ドラッグされたデータが有効かどうかチェック
const isValid = e => e.dataTransfer.types.indexOf("Files") >= 0;

var file;

const ddEvent = {
    "dragover" : e=>{
        e.preventDefault(); // 既定の処理をさせない
        if( !e.currentTarget.isEqualNode( ddarea ) ) {
            // ドロップエリア外ならドロップを無効にする
            e.dataTransfer.dropEffect = "none";return;
        }
        e.stopPropagation(); // イベント伝播を止める

        if( !isValid(e) ){
            // 無効なデータがドラッグされたらドロップを無効にする
            e.dataTransfer.dropEffect = "none";return;
        }
            // ドロップのタイプを変更
        e.dataTransfer.dropEffect = "copy";
        ddarea.classList.add("ddefect");
    },
    "dragleave" : e=>{
        if( !e.currentTarget.isEqualNode( ddarea ) ) {
            return;
        }
        e.stopPropagation(); // イベント伝播を止める
        ddarea.classList.remove("ddefect");
    },
    "drop":e=>{
        e.preventDefault(); // 既定の処理をさせない
        e.stopPropagation(); // イベント伝播を止める
        const [file] = e.dataTransfer.files;
        readFile(file);
    }
};

Object.keys( ddEvent ).forEach( e=>{
    ddarea.addEventListener(e,ddEvent[e]);
        document.body.addEventListener(e,ddEvent[e]);
});


filein.addEventListener("change", function (event) {
    const file = event.target.files[0];
    readFile(file);
});

function readFile(file) {
    const reader = new FileReader();
    // 読み込みが完了したら、結果を表示
    document.getElementById("pp").innerText = file.name;
    txtname = file.name.split('.').slice(0, -1).join('.');
    let ty = file.name.split('.').pop();
    reader.onload = (theFile) =>{
        Rfile1 = reader.result;
        Rconfile(ty);
    };
    // ファイルをテキストとして読み込む
    if(ty=="bin"||ty=="BIN"||ty=="drp"||ty=="DRP"||ty=="mid"||ty=="MID"||ty=="midi"||ty=="MIDI") reader.readAsBinaryString(file);
    else reader.readAsText(file);
  }























function timep(h){
  data1_0=[], data1_1=[], data1_2=[]
    let lent, no, up=0, di=0, t=0, p=0, t2=0, t3=0;
    let reS=0, reE=0, re0=0, re1=0, re2=0, re3=0, re4=0, re5=0, re6=0, re7=0, re8=0, reN=0, reP=0, reF=0, reG=0, reH=0;

    if(h<=2){
        if(h==1)lent = tbl1.rows.length;
        if(h==2)lent = tbl2.rows.length;

        for(let v=1; v<lent; v++){
            if(t>100000)break;
            if(h==1){
                if(v>=2)data1_0 = [tbl1.rows[v-1].cells[1].firstElementChild.value,tbl1.rows[v-1].cells[2].firstElementChild.value,tbl1.rows[v-1].cells[3].firstElementChild.value];
                data1_1 = [tbl1.rows[v].cells[1].firstElementChild.value,tbl1.rows[v].cells[2].firstElementChild.value,tbl1.rows[v].cells[3].firstElementChild.value];
                if(v!=lent-1)data1_2 = [tbl1.rows[v+1].cells[1].firstElementChild.value,tbl1.rows[v+1].cells[2].firstElementChild.value,tbl1.rows[v+1].cells[3].firstElementChild.value];
                else data1_2 = ['00','00','00'];
                data1[v-1] = data1_1;
            }
            if(h==2){
                if(v>=2)data1_0 = [tbl2.rows[v-1].cells[1].firstElementChild.value,tbl2.rows[v-1].cells[2].firstElementChild.value,tbl2.rows[v-1].cells[3].firstElementChild.value];
                data1_1 = [tbl2.rows[v].cells[1].firstElementChild.value,tbl2.rows[v].cells[2].firstElementChild.value,tbl2.rows[v].cells[3].firstElementChild.value];
                if(v!=lent-1)data1_2 = [tbl2.rows[v+1].cells[1].firstElementChild.value,tbl2.rows[v+1].cells[2].firstElementChild.value,tbl2.rows[v+1].cells[3].firstElementChild.value];
                else data1_2 = ['00','00','00'];
                data2[v-1] = data1_1;
            }

            let Aux = parseInt((data1_1[0].substr(0, 1)),16);
            let Aux2 = parseInt(data1_1[0].substr(1, 1),16);
            if(h==1){
              tbl1.rows[v].cells[10+t2].innerText = "\t"+t+"\t";  
              tbl1.rows[v].cells[10+t2].onclick = timecl;
            }
            if(h==2){
              tbl2.rows[v].cells[10+t2].innerText = "\t"+t+"\t";  
              tbl2.rows[v].cells[10+t2].onclick = timecl;
            }

            //Timbre
            if(data1_1[0] == "60") {
                switch (data1_1[1]) {
                    case "00":
                        if (h == 1) { Pdata1[di] = [1,t,Piano[0],Piano[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Piano[1],Piano[3]];  di++; }
                        if (Piano[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "10":
                        if (h == 1) { Pdata1[di] = [1,t,Harpsichord[0],Harpsichord[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Harpsichord[1],Harpsichord[3]];  di++; }
                        if (Harpsichord[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "20":
                        if (h == 1) { Pdata1[di] = [1,t,Organ[0],Organ[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Organ[1],Organ[3]];  di++; }
                        if (Organ[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "30":
                        if (h == 1) { Pdata1[di] = [1,t,Violin[0],Violin[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Violin[1],Violin[3]];  di++; }
                        if (Violin[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "40":
                        if (h == 1) { Pdata1[di] = [1,t,Flute[0],Flute[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Flute[1],Flute[3]];  di++; }
                        if (Flute[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "50":
                        if (h == 1) { Pdata1[di] = [1,t,Clarinet[0],Clarinet[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Clarinet[1],Clarinet[3]];  di++; }
                        if (Clarinet[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "60":
                        if (h == 1) { Pdata1[di] = [1,t,Trumpet[0],Trumpet[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Trumpet[1],Trumpet[3]];  di++; }
                        if (Trumpet[4] == 1) up = 1;
                        else up = 0;
                        break;
                    case "70":
                        if (h == 1) { Pdata1[di] = [1,t,Celesta[0],Celesta[2]];  di++; }
                        if (h == 2) { Pdata2[di] = [1,t,Celesta[1],Celesta[3]];  di++; }
                        if (Celesta[4] == 1) up = 1;
                        else up = 0;
                        break;
                }
                //Add
                if (data1_2[0] == "20") {
                    let hex0 = data1_2[2] + data1_1[2];
                    let hex1 = parseInt(hex0,16);
                    t += hex1;
                }
                else {
                    let hex1 = parseInt( data1_1[2],16);
                    t += hex1;
                    
                }
                p = 0;
            }
    
            //Effect
            if(data1_1[0] == "50") {
                if (data1_2[0] == "20") {
                    let hex0 = data1_2[2] + data1_1[2];
                    let hex1 = parseInt(hex0,16);
                    t += hex1;
                }
                else {
                    let hex1 = parseInt( data1_1[2],16);
                    t += hex1;
                }
            }
    
            //Rest
            if (data1_1[0] == "10")
            {
                let hex0 = data1_1[2] + data1_1[1];
                let hex1 = parseInt(hex0,16);
                t += hex1;
            }
    
            //note
            if(Aux2>=1 && Aux2<=12 && Aux>=2 && Aux<=6) {
                switch (data1_1[0]) {
                    case "31":
                        if (up == 0) no = 48;
                        if (up == 1) no = 60;
                        break;
                    case "32":
                        if (up == 0) no = 49;
                        if (up == 1) no = 61;
                        break;
                    case "33":
                        if (up == 0) no = 50;
                        if (up == 1) no = 62;
                        break;
                    case "34":
                        if (up == 0) no = 51;
                        if (up == 1) no = 63;
                        break;
                    case "35":
                        if (up == 0) no = 52;
                        if (up == 1) no = 64;
                        break;
                    case "36":
                        if (up == 0) no = 53;
                        if (up == 1) no = 65;
                        break;
                    case "37":
                        if (up == 0) no = 54;
                        if (up == 1) no = 66;
                        break;
                    case "38":
                        if (up == 0) no = 55;
                        if (up == 1) no = 67;
                        break;
                    case "39":
                        if (up == 0) no = 56;
                        if (up == 1) no = 68;
                        break;
                    case "3A":
                        if (up == 0) no = 57;
                        if (up == 1) no = 69;
                        break;
                    case "3B":
                        if (up == 0) no = 58;
                        if (up == 1) no = 70;
                        break;
                    case "3C":
                        if (up == 0) no = 59;
                        if (up == 1) no = 71;
                        break;
                    case "41":
                        if (up == 0) no = 60;
                        if (up == 1) no = 72;
                        break;
                    case "42":
                        if (up == 0) no = 61;
                        if (up == 1) no = 73;
                        break;
                    case "43":
                        if (up == 0) no = 62;
                        if (up == 1) no = 74;
                        break;
                    case "44":
                        if (up == 0) no = 63;
                        if (up == 1) no = 75;
                        break;
                    case "45":
                        if (up == 0) no = 64;
                        if (up == 1) no = 76;
                        break;
                    case "46":
                        if (up == 0) no = 65;
                        if (up == 1) no = 77;
                        break;
                    case "47":
                        if (up == 0) no = 66;
                        if (up == 1) no = 78;
                        break;
                    case "48":
                        if (up == 0) no = 67;
                        if (up == 1) no = 79;
                        break;
                    case "49":
                        if (up == 0) no = 68;
                        if (up == 1) no = 80;
                        break;
                    case "4A":
                        if (up == 0) no = 69;
                        if (up == 1) no = 81;
                        break;
                    case "4B":
                        if (up == 0) no = 70;
                        if (up == 1) no = 82;
                        break;
                    case "4C":
                        if (up == 0) no = 71;
                        if (up == 1) no = 83;
                        break;
                    case "51":
                        if (up == 0) no = 72;
                        if (up == 1) no = 84;
                        break;
                    case "52":
                        if (up == 0) no = 73;
                        if (up == 1) no = 85;
                        break;
                    case "53":
                        if (up == 0) no = 74;
                        if (up == 1) no = 86;
                        break;
                    case "54":
                        if (up == 0) no = 75;
                        if (up == 1) no = 87;
                        break;
                    case "55":
                        if (up == 0) no = 76;
                        if (up == 1) no = 88;
                        break;
                    case "56":
                        if (up == 0) no = 77;
                        if (up == 1) no = 89;
                        break;
                    case "57":
                        if (up == 0) no = 78;
                        if (up == 1) no = 90;
                        break;
                    case "58":
                        if (up == 0) no = 79;
                        if (up == 1) no = 91;
                        break;
                    case "59":
                        if (up == 0) no = 80;
                        if (up == 1) no = 92;
                        break;
                    case "5A":
                        if (up == 0) no = 81;
                        if (up == 1) no = 93;
                        break;
                    case "5B":
                        if (up == 0) no = 82;
                        if (up == 1) no = 94;
                        break;
                    case "5C":
                        if (up == 0) no = 83;
                        if (up == 1) no = 95;
                        break;
                    case "61":
                        if (up == 0) no = 84;
                        if (up == 1) no = 96;
                        break;
                    case "62":
                        if (up == 0) no = 85;
                        if (up == 1) no = 85;
                        break;
                    case "63":
                        if (up == 0) no = 86;
                        if (up == 1) no = 86;
                        break;
                    case "64":
                        if (up == 0) no = 87;
                        if (up == 1) no = 87;
                        break;
                    case "65":
                        if (up == 0) no = 88;
                        if (up == 1) no = 88;
                        break;
                    case "66":
                        if (up == 0) no = 89;
                        if (up == 1) no = 89;
                        break;
                    case "67":
                        if (up == 0) no = 90;
                        if (up == 1) no = 90;
                        break;
                    case "68":
                        if (up == 0) no = 91;
                        if (up == 1) no = 91;
                        break;
                    case "69":
                        if (up == 0) no = 92;
                        if (up == 1) no = 92;
                        break;
                    case "6A":
                        if (up == 0) no = 93;
                        if (up == 1) no = 93;
                        break;
                    case "6B":
                        if (up == 0) no = 94;
                        if (up == 1) no = 94;
                        break;
                    case "6C":
                        if (up == 0) no = 95;
                        if (up == 1) no = 95;
                        break;
                }
    
                if (data1_2[0] == "20") {
                    let hex0 = data1_2[1] + data1_1[1];
                    let hex1 = data1_2[2] + data1_1[2];
                    let hex2 = parseInt(hex0,16);
                    let hex3 = parseInt(hex1,16);
                    if (h == 1) { Pdata1[di] = [3,t,no,hex2];  di++; }
                    if (h == 2) { Pdata2[di] = [3,t,no,hex2];  di++; }
                    t += (hex2 + hex3);
                }
                else {
                    let hex0 = parseInt( data1_1[1],16);
                    let hex1 = parseInt( data1_1[2],16);
                    if (h == 1) { Pdata1[di] = [3,t,no,hex0];  di++; }
                    if (h == 2) { Pdata2[di] = [3,t,no,hex0];  di++; }
                    t += (hex0 + hex1);
                }
            }
    
            //repeat
            if (Aux2==15 && data1_1[1]=="00" && data1_1[2]=="00") {
                switch (Aux) {
                    case 0:
                        re0 = v;
                        reS = 0;
                        reN = 0;
                        reP = 0;
                        reF = 0;
                        reH = 0;
                        break;
                    case 1:
                        reE = 1;
                        t2=0;
                        if (reS==1 && data1_2[0]!="1F") reN++;
                        if (reS==0 && reP==0) {
                            v = re0;
                            reN++;
                            reP = reN;
                            t2 = reN;
                        }
                        else { reP--; }
                        break;
                    case 8:
                        re1 = v;
                        reS = 1;
                        if (reN==1) v = re2;
                        if (reN==2) v = re3;
                        if (reN==3) v = re4;
                        if (reN==4) v = re5;
                        if (reN==5) v = re6;
                        if (reN==6) v = re7;
                        if (reN==7) v = re8;
                        if(data1_2[0]!="9F") t2=0;
                        else if(reH==0)reH = 1;
                        break;
                    case 9:
                        re2 = v;
                        if (reE == 1 && data1_0[0]!="8F" && reS==1 && reG==0){
                             v = re0;
                             t2=1;
                        }
                        if (reG == 1)
                        {
                            re3 = v;
                            if (reE==1 && data1_0[0]!="8F" && reS==1){
                                 v = re0;
                                 t2=1;
                            }
                            reG = 0;
                        }
                        reE = 0;
                        reF = 1;
                        reG++;
                        break;
                    case 10:
                        if(reF==0)re2 = v;
                        re3 = v;
                        if (reE==1 && reS==1){
                             v = re0;
                             if(reH==1){
                              t2=1;
                              reH++;
                             }
                             else t2=2;
                        }
                        reE = 0;
                        break;
                    case 11:
                        re4 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=3;
                       }
                        reE = 0;
                        break;
                    case 12:
                        re5 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=4;
                       }
                        reE = 0;
                        break;
                    case 13:
                        re6 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=5;
                       }
                        reE = 0;
                        break;
                    case 14:
                        re7 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=6;
                       }
                        reE = 0;
                        break;
                    case 15:
                        re8 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=7;
                       }
                        reE = 0;
                        break;
                }
            }
    
            //End
            if (data1_2[0]=="F0" && p==0) {
                if (t>maxL) maxL = t;
                p = 1;
                
            }
        }
        if(h==1) Pdl1 = t;
        if(h==2) Pdl2 = t;
        if(h==1) Plo1 = di;
        if(h==2) Plo2 = di;
        if(t>maxL) maxL=t;
    }

    if(h==3){
        let rhF=1,co=0, co0=0, co1=0, co2=0, co3=0, temp=120, tm=0;
        lent = tbl3.rows.length;

        for(let v=1; v<lent; v++){
          if(t>100000)break;
            if(v>=2)data1_0 = [tbl3.rows[v-1].cells[1].firstElementChild.value,tbl3.rows[v-1].cells[2].firstElementChild.value];
            data1_1 = [tbl3.rows[v].cells[1].firstElementChild.value,tbl3.rows[v].cells[2].firstElementChild.value];
            if(v!=lent-1)data1_2 = [tbl3.rows[v+1].cells[1].firstElementChild.value,tbl3.rows[v+1].cells[2].firstElementChild.value];
            else data1_2 = ['00','00'];
            data3[v-1] = data1_1;
            let Aux, Aux2;
            if(data1_1[0].length==1){
              Aux2 = parseInt((data1_1[0].substr(0, 1)),16);
              Aux = 14;
            } else {
              Aux = parseInt((data1_1[0].substr(0, 1)),16);
              Aux2 = parseInt(data1_1[0].substr(1, 1),16);
            }
            tbl3.rows[v].cells[8+t2].innerText = "\t"+t+"\t";
            tbl3.rows[v].cells[8+t2].onclick = timecl;
       
            //Rest
            if (data1_1[0] == "10") {
                if (data1_2[0] == "20") {
                    let hex0 = data1_2[1] + data1_1[1];
                    let hex1 = parseInt(hex0,16);
                        if(rhF==0){
                          if (co != 0) { Pdata3[di] = [3,t+late,co,hex1,0]; di++; }
                          if (co0 != 0) { Pdata3[di] = [3,t+late,co0,hex1,1]; di++; }
                          else { Pdata3[di] = [3,t+late,co+12,hex1,3]; di++; }
                          if (co1 != 0) { Pdata3[di] = [3,t+late,co1,hex1,2]; di++; }
                          if (co2 != 0) { Pdata3[di] = [3,t+late,co2,hex1,2]; di++; }
                          if (co3 != 0) { Pdata3[di] = [3,t+late,co3,hex1,2]; di++; }
                        }
                    t += hex1;
                } else {
                    let hex1 = parseInt( data1_1[1],16);
                    if(rhF==0&&data1_1[1]!="00"){
                        if (co != 0) { Pdata3[di] = [3,t+late,co,hex1,0]; di++; }
                        if (co0 != 0) { Pdata3[di] = [3,t+late,co0,hex1,1]; di++; }
                        else { Pdata3[di] = [3,t+late,co+12,hex1,3]; di++; }
                        if (co1 != 0) { Pdata3[di] = [3,t+late,co1,hex1,2]; di++; }
                        if (co2 != 0) { Pdata3[di] = [3,t+late,co2,hex1,2]; di++; }
                        if (co3 != 0) { Pdata3[di] = [3,t+late,co3,hex1,2]; di++; }
                    }
                    t += hex1;
                }
            }
            //Rhythm
            if (data1_1[0] == "50") {
                switch (data1_1[1]) {
                    case "00":
                    case "01":
                    case "10":
                    case "11":
                    case "20":
                    case "21":
                    case "30":
                    case "31":
                    case "40":
                    case "41":
                    case "42":
                    case "50":
                    case "51":
                    case "52":
                    case "60":
                    case "61":
                    case "70":
                    case "71":
                      rhF = 0;
                      break;
                   default:
                      rhF = 1;
                      break;
                }
            }
            //Code
            if (Aux2>=1 && Aux2<=12) {
                if (Aux!=15) {
                    //Bass
                    switch (Aux2) {
                        case 1:
                          co = 36;
                          co0 = 60;
                          break;
                        case 2:
                          co = 37;
                          co0 = 61;
                          break;
                        case 3:
                          co = 38;
                          co0 = 62;
                          break;
                       case 4:
                         co = 39;
                         co0 = 63;
                         break;
                       case 5:
                         co = 40;
                         co0 = 64;
                         break;
                       case 6:
                         co = 41;
                         co0 = 65;
                         break;
                       case 7:
                         co = 42;
                         co0 = 54;
                         break;
                       case 8:
                         co = 43;
                         co0 = 55;
                         break;
                       case 9:
                         co = 44;
                         co0 = 56;
                         break;
                       case 10:
                         co = 45;
                         co0 = 57;
                         break;
                       case 11:
                         co = 46;
                         co0 = 58;
                         break;
                       case 12:
                         co = 47;
                         co0 = 59;
                         break;
                    }
                    //code
                    switch (Aux) {
                        case 0:
                          co1 = co0 + 4;
                          co2 = co0 + 7;
                          co3 = 0;
                          break;
                        case 1:
                          co1 = co0 + 3;
                          co2 = co0 + 7;
                          co3 = 0;
                          break;
                        case 2:
                          co1 = co0 + 4;
                          co2 = co0 + 7;
                          co3 = co0 + 10;
                          break;
                        case 3:
                          co1 = co0 + 3;
                          co2 = co0 + 7;
                          co3 = co0 + 10;
                          break;
                        case 4:
                          co1 = co0 + 4;
                          co2 = co0 + 7;
                          co3 = co0 + 11;
                          break;
                       case 5:
                          co1 = co0 + 4;
                          co2 = co0 + 7;
                          co3 = co0 + 9;
                          break;
                       case 6:
                          co1 = co0 + 3;
                          co2 = co0 + 6;
                          co3 = co0 + 10;
                          break;
                       case 7:
                          co1 = co0 + 5;
                          co2 = co0 + 7;
                          co3 = 0;
                          break;
                       case 8:
                          co1 = co0 + 3;
                          co2 = co0 + 6;
                          co3 = 0;
                          break;
                       case 9:
                          co1 = co0 + 4;
                          co2 = co0 + 8;
                          co3 = 0;
                          break;
                       case 10:
                          co1 = co0 + 3;
                          co2 = co0 + 7;
                          co3 = co0 + 9;
                          break;
                      case 11:
                          co1 = co0 + 4;
                          co2 = co0 + 6;
                          co3 = 0;
                          break;
                      case 12:
                          co1 = co0 + 2;
                          co2 = co0 + 4;
                          co3 = co0 + 7;
                          break;
                      case 13:
                          co1 = co0 + 2;
                          co2 = co0 + 7;
                          co3 = co0 + 10;
                          break;
                      case 14:
                          co0 = 0;
                          co1 = 0;
                          co2 = 0;
                          co3 = 0;
                          break;
                    }
                    if (co0 >= 66) co0 -= 12;
                    if (co1 >= 66) co1 -= 12;
                    if (co2 >= 66) co2 -= 12;
                    if (co3 >= 66) co3 -= 12;

                    if (data1_2[0] == "20") {
                        let hex0 = data1_2[1] + data1_1[1];
                        let hex1 = parseInt(hex0,16);
                            if(rhF==0){
                              if (co != 0) { Pdata3[di] = [3,t+late,co,hex1,0]; di++; }
                              if (co0 != 0) { Pdata3[di] = [3,t+late,co0,hex1,1]; di++; }
                              else { Pdata3[di] = [3,t+late,co+12,hex1,3]; di++; }
                              if (co1 != 0) { Pdata3[di] = [3,t+late,co1,hex1,2]; di++; }
                              if (co2 != 0) { Pdata3[di] = [3,t+late,co2,hex1,2]; di++; }
                              if (co3 != 0) { Pdata3[di] = [3,t+late,co3,hex1,2]; di++; }
                            }
                            if(rhF==1){
                                if (co != 0) { Pdata3[di] = [3,t,co,hex1,0]; di++; }
                                if (co0 != 0) { Pdata3[di] = [3,t,co0,hex1,1]; di++; }
                                else { Pdata3[di] = [3,t,co+12,hex1,3]; di++; }
                                if (co1 != 0) { Pdata3[di] = [3,t,co1,hex1,2]; di++; }
                                if (co2 != 0) { Pdata3[di] = [3,t,co2,hex1,2]; di++; }
                                if (co3 != 0) { Pdata3[di] = [3,t,co3,hex1,2]; di++; }
                            }
                        t += hex1;
                    } else {
                        let hex1 = parseInt( data1_1[1],16);
                        if(rhF==0){
                            if (co != 0) { Pdata3[di] = [3,t+late,co,hex1,0]; di++; }
                            if (co0 != 0) { Pdata3[di] = [3,t+late,co0,hex1,1]; di++; }
                            else { Pdata3[di] = [3,t+late,co+12,hex1,3]; di++; }
                            if (co1 != 0) { Pdata3[di] = [3,t+late,co1,hex1,2]; di++; }
                            if (co2 != 0) { Pdata3[di] = [3,t+late,co2,hex1,2]; di++; }
                            if (co3 != 0) { Pdata3[di] = [3,t+late,co3,hex1,2]; di++; }
                        }
                        if(rhF==1){
                            if (co != 0) { Pdata3[di] = [3,t,co,hex1,0]; di++; }
                            if (co0 != 0) { Pdata3[di] = [3,t,co0,hex1,1]; di++; }
                            else { Pdata3[di] = [3,t,co+12,hex1,3]; di++; }
                            if (co1 != 0) { Pdata3[di] = [3,t,co1,hex1,2]; di++; }
                            if (co2 != 0) { Pdata3[di] = [3,t,co2,hex1,2]; di++; }
                            if (co3 != 0) { Pdata3[di] = [3,t,co3,hex1,2]; di++; }
                        }
                        t += hex1;
                    }
                } else {
                    co = 0;
                    co0 = 0;
                    co1 = 0;
                    co2 = 0;
                    co3 = 0;
                    if (data1_2[0] == "20") {
                        let hex0 = data1_2[1] + data1_1[1];
                        let hex1 = parseInt(hex0,16);
                        if(rhF==0) Pdata3[di] = [0,t+late,co,hex1,0];
                        if(rhF==1) Pdata3[di] = [0,t,co,hex1,0];
                        di++;
                        t += hex1;
                    } else {
                        let hex1 = parseInt( data1_1[1],16);
                        if(rhF==0) Pdata3[di] = [0,t+late,co,hex1,0];
                        if(rhF==1) Pdata3[di] = [0,t,co,hex1,0];
                        di++;
                        t += hex1;
                    }
                }
            }
            //Repeat
            if (Aux2==15) {
                switch (Aux) {
                    case 0:
                        re0 = v;
                        reS = 0;
                        reN = 0;
                        reP = 0;
                        reF = 0;
                        reH = 0;
                        break;
                    case 1:
                        reE = 1;
                        t2=0;
                        if (reS==1 && data1_2[0]!="1F") reN++;
                        if (reS==0 && reP==0) {
                            v = re0;
                            reN++;
                            reP = reN;
                            t2 = reN;
                        }
                        else { reP--; }
                        break;
                    case 8:
                        re1 = v;
                        reS = 1;
                        if (reN==1) v = re2;
                        if (reN==2) v = re3;
                        if (reN==3) v = re4;
                        if (reN==4) v = re5;
                        if (reN==5) v = re6;
                        if (reN==6) v = re7;
                        if (reN==7) v = re8;
                        if(data1_2[0]!="9F") t2=0;
                        else if(reH==0) reH = 1;
                        break;
                    case 9:
                        re2 = v;
                        if (reE == 1 && data1_0[0]!="8F" && reS==1 && reG==0){
                             v = re0;
                             t2=1;
                        }
                        if (reG == 1)
                        {
                            re3 = v;
                            if (reE==1 && data1_0[0]!="8F" && reS==1){
                                 v = re0;
                                 t2=1;
                            }
                            reG = 0;
                        }
                        reE = 0;
                        reF = 1;
                        reG++;
                        break;
                    case 10:
                        if(reF==0)re2 = v;
                        re3 = v;
                        if (reE==1 && reS==1){
                             v = re0;
                             if(reH==1){ 
                              t2=1;
                              reH++;
                             }
                             else t2=2;
                        }
                        reE = 0;
                        break;
                    case 11:
                        re4 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=3;
                       }
                        reE = 0;
                        break;
                    case 12:
                        re5 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=4;
                       }
                        reE = 0;
                        break;
                    case 13:
                        re6 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=5;
                       }
                        reE = 0;
                        break;
                    case 14:
                        re7 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=6;
                       }
                        reE = 0;
                        break;
                    case 15:
                        re8 = v;
                        if (reE==1 && reS==1){
                            v = re0;
                            t2=7;
                       }
                        reE = 0;
                        break;
                }
            }
            //Tempo
            if (data1_1[0] == "C0") {
                switch (data1_1[1]) {
                    case "06":
                    case "07":
                      temp=52;
                      break;
                    case "08":
                    case "09":
                        temp=54;
                      break;
                    case "0A":
                    case "0B":
                        temp=56;
                      break;
                    case "0C":
                    case "0D":
                        temp=58;
                      break;
                    case "0E":
                    case "0F":
                        temp=60;
                      break;
                    case "10":
                    case "11":
                        temp=62;
                      break;
                    case "12":
                    case "13":
                        temp=66;
                      break;
                    case "14":
                    case "15":
                        temp=70;
                      break;
                    case "16":
                    case "17":
                        temp=74;
                      break;
                    case "18":
                    case "19":
                        temp=78;
                      break;
                    case "1A":
                    case "1B":
                        temp=82;
                      break;
                    case "1C":
                    case "1D":
                        temp=86;
                      break;
                    case "1E":
                    case "1F":
                        temp=90;
                      break;
                    case "20":
                    case "21":
                        temp=98;
                      break;
                    case "22":
                    case "23":
                        temp=106;
                      break;
                    case "24":
                    case "25":
                        temp=118;
                      break;
                    case "26":
                    case "27":
                        temp=126;
                      break;
                    case "28":
                    case "29":
                        temp=136;
                      break;
                    case "2A":
                    case "2B":
                        temp=148;
                      break;
                    case "2C":
                    case "2D":
                        temp=162;
                      break;
                    case "2E":
                    case "2F":
                        temp=176;
                      break;
                    case "30":
                    case "31":
                    case "32":
                    case "33":
                    case "34":
                    case "35":
                    case "36":
                    case "37":
                    case "38":
                    case "39":
                    case "3A":
                    case "3B":
                    case "3C":
                    case "3D":
                    case "3E":
                    case "3F":
                    case "40":
                    case "41":
                    case "42":
                    case "43":
                    case "44":
                        temp=188;
                      break;
                }
                Pdata3[di] = [2,t,temp]; di++;
                if(tm==0){
                  tempo=temp;
                  tm=1;
                }
            }

            if (data1_1[0] == "80")
            {
                switch (data1_1[1])
                {
                    case "80":
                      Pdata3[di] = [4,t,1]; di++;
                        break;
                    case "81":
                      Pdata3[di] = [4,t,2]; di++;
                        break;
                    case "90":
                      Pdata3[di] = [4,t,3]; di++;
                        break;
                    case "91":
                      Pdata3[di] = [4,t,4]; di++;;
                        break;
                    case "A0":
                      Pdata3[di] = [4,t,5]; di++;
                        break;
                    case "A1":
                      Pdata3[di] = [4,t,6]; di++;
                        break;
                    case "B0":
                      Pdata3[di] = [4,t,7]; di++;
                        break;
                    case "B1":
                      Pdata3[di] = [4,t,8]; di++;
                        break;
                    case "C0":
                      Pdata3[di] = [4,t,9]; di++;
                        break;
                    case "C1":
                      Pdata3[di] = [4,t,10]; di++;
                        break;
                    case "D0":
                      Pdata3[di] = [4,t,11]; di++;
                        break;
                    case "D1":
                      Pdata3[di] = [4,t,12]; di++;
                        break;
                    case "E0":
                      Pdata3[di] = [4,t,13]; di++;
                        break;
                    case "E1":
                      Pdata3[di] = [4,t,14]; di++;
                        break;
                    case "F0":
                      Pdata3[di] = [4,t,15]; di++;
                        break;
                    case "F1":
                      Pdata3[di] = [4,t,16]; di++;
                        break;
                    default:
                      Pdata3[di] = [4,t,1]; di++;
                        break;
                }
            }

            if (data1_1[0] == "50")
            {
                switch (data1_1[1])
                {
                    case "00":
                      Pdata3[di] = [6,t,1]; di++;
                        break;
                    case "01":
                      Pdata3[di] = [6,t,2]; di++;
                        break;
                    case "10":
                      Pdata3[di] = [6,t,3]; di++;
                        break;
                    case "11":
                      Pdata3[di] = [6,t,4]; di++;
                        break;
                    case "20":
                      Pdata3[di] = [6,t,5]; di++;
                        break;
                    case "21":
                      Pdata3[di] = [6,t,6]; di++;
                        break;
                    case "30":
                    case "52":
                      Pdata3[di] = [6,t,7]; di++;
                        break;
                    case "31":
                      Pdata3[di] = [6,t,8]; di++;
                        break;
                    case "40":
                    case "42":
                      Pdata3[di] = [6,t,9]; di++;
                        break;
                    case "41":
                      Pdata3[di] = [6,t,10]; di++;
                        break;
                    case "50":
                      Pdata3[di] = [6,t,11]; di++;
                        break;
                    case "51":
                      Pdata3[di] = [6,t,12]; di++;
                        break;
                    case "60":
                      Pdata3[di] = [6,t,13]; di++;
                        break;
                    case "61":
                      Pdata3[di] = [6,t,14]; di++;
                        break;
                    case "70":
                      Pdata3[di] = [6,t,15]; di++;
                        break;
                    case "71":
                      Pdata3[di] = [6,t,16]; di++;
                        break;
                    case "F0":
                    case "F1":
                      Pdata3[di] = [6,t,17]; di++;
                        break;
                    default:
                      Pdata3[di] = [6,t,0]; di++;
                        break;
                }
            }

            //Count Reset
            if (data1_1[0] == "90") {
              Pdata3[di] = [8,t]; di++;
            }
            //Fill in
            if (data1_1[0] == "60") {
              let Aux3 = parseInt((data1_1[1].substr(0, 1)),16);
              if (Aux3 >= 0 && Aux3 <= 7) {
                Pdata3[di] = [7,t,1]; di++;
              } else {
                  Pdata3[di] = [7,t,0]; di++;
              }
            }

            //End
            if (data1_1[0] == "F0") {
                 if (t > maxL) maxL = t;
                 Pdata3[di] = [5,maxL]; di++;
                 Pdl3 = t;
            }
        }
        Pdl3 = t;
        Plo3 = di;
        if(t>maxL) maxL=t;

      }
      jsave();
    }
    
function contime(h){
  let lent, p=0, f=0;
  data1_0=[], data1_1=[], data1_2=[]
      if(h==1)lent = tbl1.rows.length;
      if(h==2)lent = tbl2.rows.length;
      for(let v=1; v<lent; v++){
          if(h==1){
              data1_1 = [tbl1.rows[v].cells[1].firstElementChild.value,tbl1.rows[v].cells[2].firstElementChild.value,tbl1.rows[v].cells[3].firstElementChild.value];
              if(v!=lent-1)data1_2 = [tbl1.rows[v+1].cells[1].firstElementChild.value,tbl1.rows[v+1].cells[2].firstElementChild.value,tbl1.rows[v+1].cells[3].firstElementChild.value];
              else data1_2 = ['00','00','00'];
              if(v!=lent-1&&v!=lent-2)data1_0 = [tbl1.rows[v+2].cells[1].firstElementChild.value,tbl1.rows[v+2].cells[2].firstElementChild.value,tbl1.rows[v+2].cells[3].firstElementChild.value];
              else data1_0 = ['00','00','00'];
          }
          if(h==2){
              data1_1 = [tbl2.rows[v].cells[1].firstElementChild.value,tbl2.rows[v].cells[2].firstElementChild.value,tbl2.rows[v].cells[3].firstElementChild.value];
              if(v!=lent-1)data1_2 = [tbl2.rows[v+1].cells[1].firstElementChild.value,tbl2.rows[v+1].cells[2].firstElementChild.value,tbl2.rows[v+1].cells[3].firstElementChild.value];
              else data1_2 = ['00','00','00'];
              if(v!=lent-1&&v!=lent-2)data1_0 = [tbl2.rows[v+2].cells[1].firstElementChild.value,tbl2.rows[v+2].cells[2].firstElementChild.value,tbl2.rows[v+2].cells[3].firstElementChild.value];
              else data1_0 = ['00','00','00'];
          }
          switch (data1_1[0]) {
            case "31":
            case "32":
            case "33":
            case "34":
            case "35":
            case "36":
            case "37":
            case "38":
            case "39":
            case "3A":
            case "3B":
            case "3C":
            case "41":
            case "42":
            case "43":
            case "44":
            case "45":
            case "46":
            case "47":
            case "48":
            case "49":
            case "4A":
            case "4B":
            case "4C":
            case "51":
            case "52":
            case "53":
            case "54":
            case "55":
            case "56":
            case "57":
            case "58":
            case "59":
            case "5A":
            case "5B":
            case "5C":
            case "61":
              p=1;
              break;
            default:
              p=0;
              break;
           }
      if(p==1){
        if (data1_2[0] == "20") {
          if(data1_1[0]==data1_0[0]&&data1_1[2]=="00"){
            let hex0 = data1_2[1] + data1_1[1];
            let hex2 = parseInt(hex0,16);
            let hex3 = ('0000' + (hex0-6).toString(16).toUpperCase()).substr(-4);
            let hex4 = hex3.substr(0, 2);
            let hex5 = hex3.substr(2, 2);
            
            tbl2.rows[v].cells[2].firstElementChild.value = hex5;
            tbl2.rows[v+1].cells[2].firstElementChild.value = hex4;
            tbl2.rows[v].cells[2].firstElementChild.value = "06";
            tbl2.rows[v].cells[6].firstElementChild.value = hex2-6;
            tbl2.rows[v].cells[7].firstElementChild.value = "6";
          }
        } else {
          if((data1_1[0]==data1_2[0]&&data1_1[2]=="00")||(data1_1[0]==data1_0[0]&&data1_2[1]=="8F"&&data1_1[2]=="00")){
            let hex0 = parseInt( data1_1[1],16);
            f++;
            if(h==1){
              if(data1_1[1]=="04"){
                tbl1.rows[v].cells[2].firstElementChild.value = "02";
                tbl1.rows[v].cells[3].firstElementChild.value = "02";
                tbl1.rows[v].cells[6].firstElementChild.value = "2";
                tbl1.rows[v].cells[7].firstElementChild.value = "2";
              }
              else if(data1_1[1]=="06"){
                tbl1.rows[v].cells[2].firstElementChild.value = "03";
                tbl1.rows[v].cells[3].firstElementChild.value = "03";
                tbl1.rows[v].cells[6].firstElementChild.value = "3";
                tbl1.rows[v].cells[7].firstElementChild.value = "3";
              }
              else if(data1_1[1]=="08"){
                tbl1.rows[v].cells[2].firstElementChild.value = "04";
                tbl1.rows[v].cells[3].firstElementChild.value = "04";
                tbl1.rows[v].cells[6].firstElementChild.value = "4";
                tbl1.rows[v].cells[7].firstElementChild.value = "4";
              }
              else if(data1_1[1]=="09"){
                tbl1.rows[v].cells[2].firstElementChild.value = "05";
                tbl1.rows[v].cells[3].firstElementChild.value = "04";
                tbl1.rows[v].cells[6].firstElementChild.value = "5";
                tbl1.rows[v].cells[7].firstElementChild.value = "4";
              }
              else if(data1_1[1]=="0C"){
                tbl1.rows[v].cells[2].firstElementChild.value = "08";
                tbl1.rows[v].cells[3].firstElementChild.value = "04";
                tbl1.rows[v].cells[6].firstElementChild.value = "8";
                tbl1.rows[v].cells[7].firstElementChild.value = "4";
              }
              else {
                tbl1.rows[v].cells[2].firstElementChild.value = ('00' + (hex0-4).toString(16).toUpperCase()).substr(-2);
                tbl1.rows[v].cells[3].firstElementChild.value = "04";
                tbl1.rows[v].cells[6].firstElementChild.value = hex0-4;
                tbl1.rows[v].cells[7].firstElementChild.value = "4";
              }
            }
            if(h==2){
              if(data1_1[1]=="04"){
                tbl2.rows[v].cells[2].firstElementChild.value = "02";
                tbl2.rows[v].cells[3].firstElementChild.value = "02";
                tbl2.rows[v].cells[6].firstElementChild.value = "2";
                tbl2.rows[v].cells[7].firstElementChild.value = "2";
              }
             else if(data1_1[1]=="06"){
                tbl2.rows[v].cells[2].firstElementChild.value = "03";
                tbl2.rows[v].cells[3].firstElementChild.value = "03";
                tbl2.rows[v].cells[6].firstElementChild.value = "3";
                tbl2.rows[v].cells[7].firstElementChild.value = "3";
              }
            else if(data1_1[1]=="08"){
                tbl2.rows[v].cells[2].firstElementChild.value = "04";
                tbl2.rows[v].cells[3].firstElementChild.value = "04";
                tbl2.rows[v].cells[6].firstElementChild.value = "4";
                tbl2.rows[v].cells[7].firstElementChild.value = "4";
              }
              else if(data1_1[1]=="09"){
                tbl2.rows[v].cells[2].firstElementChild.value = "05";
                tbl2.rows[v].cells[3].firstElementChild.value = "04";
                tbl2.rows[v].cells[6].firstElementChild.value = "5";
                tbl2.rows[v].cells[7].firstElementChild.value = "4";
              }
              else if(data1_1[1]=="0C"){
                tbl2.rows[v].cells[2].firstElementChild.value = "08";
                tbl2.rows[v].cells[3].firstElementChild.value = "04";
                tbl2.rows[v].cells[6].firstElementChild.value = "8";
                tbl2.rows[v].cells[7].firstElementChild.value = "4";
              }
              else {
                tbl2.rows[v].cells[2].firstElementChild.value = ('00' + (hex0-4).toString(16).toUpperCase()).substr(-2);
                tbl2.rows[v].cells[3].firstElementChild.value = "04";
                tbl2.rows[v].cells[6].firstElementChild.value = hex0-4;
                tbl2.rows[v].cells[7].firstElementChild.value = "4";
              }
            }
          }
        }
      }
    }
  alert(f+" replaced");
  jsave();
}

function pitch(h,i) {
  let lent, p=0, f=0, r=0;
  var notev = [["21","2","C"],["22","2","C#"],["23","2","D"],["24","2","D#"],["25","2","E"],["26","2","F"],["27","2","F#"],["28","2","G"],["29","2","G#"],["2A","2","A"],["2B","2","A#"],["2C","2","B"],
                ["31","3","C"],["32","3","C#"],["33","3","D"],["34","3","D#"],["35","3","E"],["36","3","F"],["37","3","F#"],["38","3","G"],["39","3","G#"],["3A","3","A"],["3B","3","A#"],["3C","3","B"],
                ["41","4","C"],["42","4","C#"],["43","4","D"],["44","4","D#"],["45","4","E"],["46","4","F"],["47","4","F#"],["48","4","G"],["49","4","G#"],["4A","4","A"],["4B","4","A#"],["4C","4","B"],
                ["51","5","C"],["52","5","C#"],["53","5","D"],["54","5","D#"],["55","5","E"],["56","5","F"],["57","5","F#"],["58","5","G"],["59","5","G#"],["5A","5","A"],["5B","5","A#"],["5C","5","B"],
                ["61","6","C"],["62","6","C#"],["63","6","D"],["64","6","D#"],["65","6","E"],["66","6","F"],["67","6","F#"],["68","6","G"],["69","6","G#"],["6A","6","A"],["6B","6","A#"],["6C","6","B"]];
  var codev = [["1","C"],["2","C#"],["3","D"],["4","D#"],["5","E"],["6","F"],["7","F#"],["8","G"],["9","G#"],["A","A"],["B","A#"],["C","B"]];
  data1_0=[], data1_1=[], data1_2=[];
    if(h==1)lent = tbl1.rows.length;
    if(h==2)lent = tbl2.rows.length;
    if(h==3)lent = tbl3.rows.length;
    for(let v=1; v<lent; v++){
      if(h==1){
        data1_1 = [tbl1.rows[v].cells[1].firstElementChild.value,tbl1.rows[v].cells[2].firstElementChild.value,tbl1.rows[v].cells[3].firstElementChild.value];
        if(v!=lent-1)data1_2 = [tbl1.rows[v+1].cells[1].firstElementChild.value,tbl1.rows[v+1].cells[2].firstElementChild.value,tbl1.rows[v+1].cells[3].firstElementChild.value];
        else data1_2 = ['00','00','00'];
        if(v!=lent-1&&v!=lent-2)data1_0 = [tbl1.rows[v+2].cells[1].firstElementChild.value,tbl1.rows[v+2].cells[2].firstElementChild.value,tbl1.rows[v+2].cells[3].firstElementChild.value];
        else data1_0 = ['00','00','00'];
      }
      if(h==2){
        data1_1 = [tbl2.rows[v].cells[1].firstElementChild.value,tbl2.rows[v].cells[2].firstElementChild.value,tbl2.rows[v].cells[3].firstElementChild.value];
        if(v!=lent-1)data1_2 = [tbl2.rows[v+1].cells[1].firstElementChild.value,tbl2.rows[v+1].cells[2].firstElementChild.value,tbl2.rows[v+1].cells[3].firstElementChild.value];
        else data1_2 = ['00','00','00'];
        if(v!=lent-1&&v!=lent-2)data1_0 = [tbl2.rows[v+2].cells[1].firstElementChild.value,tbl2.rows[v+2].cells[2].firstElementChild.value,tbl2.rows[v+2].cells[3].firstElementChild.value];
        else data1_0 = ['00','00','00'];
      }
      if(h==3){
        data1_1 = [tbl3.rows[v].cells[1].firstElementChild.value,tbl3.rows[v].cells[2].firstElementChild.value];
        if(v!=lent-1)data1_2 = [tbl3.rows[v+1].cells[1].firstElementChild.value,tbl3.rows[v+1].cells[2].firstElementChild.value];
        else data1_2 = ['00','00'];
        if(v!=lent-1&&v!=lent-2)data1_0 = [tbl3.rows[v+2].cells[1].firstElementChild.value,tbl3.rows[v+2].cells[2].firstElementChild.value];
        else data1_0 = ['00','00'];
      }
      if(h==1||h==2) switch (data1_1[0]) {
        case "21": p=1; r=0; break;
        case "22": p=1; r=1; break;
        case "23": p=1; r=2; break;
        case "24": p=1; r=3; break;
        case "25": p=1; r=4; break;
        case "26": p=1; r=5; break;
        case "27": p=1; r=6; break;
        case "28": p=1; r=7; break;
        case "29": p=1; r=8; break;
        case "2A": p=1; r=9; break;
        case "2B": p=1; r=10; break;
        case "2C": p=1; r=11; break;
        case "31": p=1; r=12; break;
        case "32": p=1; r=13; break;
        case "33": p=1; r=14; break;
        case "34": p=1; r=15; break;
        case "35": p=1; r=16; break;
        case "36": p=1; r=17; break;
        case "37": p=1; r=18; break;
        case "38": p=1; r=19; break;
        case "39": p=1; r=20; break;
        case "3A": p=1; r=21; break;
        case "3B": p=1; r=22; break;
        case "3C": p=1; r=23; break;
        case "41": p=1; r=24; break;
        case "42": p=1; r=25; break;
        case "43": p=1; r=26; break;
        case "44": p=1; r=27; break;
        case "45": p=1; r=28; break;
        case "46": p=1; r=29; break;
        case "47": p=1; r=30; break;
        case "48": p=1; r=31; break;
        case "49": p=1; r=32; break;
        case "4A": p=1; r=33; break;
        case "4B": p=1; r=34; break;
        case "4C": p=1; r=35; break;
        case "51": p=1; r=36; break;
        case "52": p=1; r=37; break;
        case "53": p=1; r=38; break;
        case "54": p=1; r=39; break;
        case "55": p=1; r=40; break;
        case "56": p=1; r=41; break;
        case "57": p=1; r=42; break;
        case "58": p=1; r=43; break;
        case "59": p=1; r=44; break;
        case "5A": p=1; r=45; break;
        case "5B": p=1; r=46; break;
        case "5C": p=1; r=47; break;
        case "61": p=1; r=48; break;
        case "62": p=1; r=49; break;
        case "63": p=1; r=50; break;
        case "64": p=1; r=51; break;
        case "65": p=1; r=52; break;
        case "66": p=1; r=53; break;
        case "67": p=1; r=54; break;
        case "68": p=1; r=55; break;
        case "69": p=1; r=56; break;
        case "6A": p=1; r=57; break;
        case "6B": p=1; r=58; break;
        case "6C": p=1; r=59; break;
        default: p=0; break;
       }
       if(h==3) switch (data1_1[0].substr(1,1)) {
        case "1": p=1; r=0; break;
        case "2": p=1; r=1; break;
        case "3": p=1; r=2; break;
        case "4": p=1; r=3; break;
        case "5": p=1; r=4; break;
        case "6": p=1; r=5; break;
        case "7": p=1; r=6; break;
        case "8": p=1; r=7; break;
        case "9": p=1; r=8; break;
        case "A": p=1; r=9; break;
        case "B": p=1; r=10; break;
        case "C": p=1; r=11; break;
        default: p=0; break;
       }
  if(p==1){
    if(i==0){
      if(h==1){
        tbl1.rows[v].cells[1].firstElementChild.value = notev[r-1][0];
        tbl1.rows[v].cells[5].firstElementChild.value = notev[r-1][1];
        tbl1.rows[v].cells[5].lastElementChild.value = notev[r-1][2];
      }
      if(h==2){
        tbl2.rows[v].cells[1].firstElementChild.value = notev[r-1][0];
        tbl2.rows[v].cells[5].firstElementChild.value = notev[r-1][1];
        tbl2.rows[v].cells[5].lastElementChild.value = notev[r-1][2];
      }
      if(h==3){
        if(r-1<=-1) r=12;
        tbl3.rows[v].cells[1].firstElementChild.value = data1_1[0].substr(0,1)+codev[r-1][0];
        tbl3.rows[v].cells[4].firstElementChild.value = codev[r-1][1];
      }
    }else{
      if(h==1){
        tbl1.rows[v].cells[1].firstElementChild.value = notev[r+1][0];
        tbl1.rows[v].cells[5].firstElementChild.value = notev[r+1][1];
        tbl1.rows[v].cells[5].lastElementChild.value = notev[r+1][2];
      }
      if(h==2){
        tbl2.rows[v].cells[1].firstElementChild.value = notev[r+1][0];
        tbl2.rows[v].cells[5].firstElementChild.value = notev[r+1][1];
        tbl2.rows[v].cells[5].lastElementChild.value = notev[r+1][2];
      }
      if(h==3){
        if(r+1>=12) r=-1;
        tbl3.rows[v].cells[1].firstElementChild.value = data1_1[0].substr(0,1)+codev[r+1][0];
        tbl3.rows[v].cells[4].firstElementChild.value = codev[r+1][1];
      }
    }  
  }
}
//alert(f+" replaced");
jsave();
}






















function jsave() {
  const jdata1=[], jdata2=[], jdata3=[];
  for(var mn=1; mn<tbl1.rows.length; mn++){
    const val1 = tbl1.rows[mn].cells[1].firstElementChild.value;
    const val2 = tbl1.rows[mn].cells[2].firstElementChild.value;
    const val3 = tbl1.rows[mn].cells[3].firstElementChild.value;
    jdata1[mn-1] = { key1:val1, key2:val2, key3:val3 };
  }
  for(var mn=1; mn<tbl2.rows.length; mn++){
    const val1 = tbl2.rows[mn].cells[1].firstElementChild.value;
    const val2 = tbl2.rows[mn].cells[2].firstElementChild.value;
    const val3 = tbl2.rows[mn].cells[3].firstElementChild.value;
    jdata2[mn-1] = { key1:val1, key2:val2, key3:val3 };
  }
  for(var mn=1; mn<tbl3.rows.length; mn++){
    const val1 = tbl3.rows[mn].cells[1].firstElementChild.value;
    const val2 = tbl3.rows[mn].cells[2].firstElementChild.value;
    jdata3[mn-1] = { key1:val1, key2:val2 };
  }
  
  var set1=false, set2=false, set3=3;
    if(Mout.checked)set1=true;
    else set1=false;
    if(Sout.checked)set2=true;
    else set2=false;
    set3 = selectD.selectedIndex;
  const jdata4 = { key1:set1, key2:set2, key3:set3};
  // 配列をJSON形式に変換してからlocalstorageに保存
  localStorage.setItem("NoteToRomP_backup", JSON.stringify({J1:jdata1,J2:jdata2,J3:jdata3,S1:jdata4}));
}   

function jload() {
  const jdata = JSON.parse(localStorage.getItem("NoteToRomP_backup"));
  if(jdata){
    var ga=0, gb=0, gc=0;
    data1=[],data2=[],data3=[];
    for(ga=0; ga<Object.keys(jdata.J1).length; ga++)
      data1[ga] = [jdata.J1[ga].key1,jdata.J1[ga].key2,jdata.J1[ga].key3];
    for(gb=0; gb<Object.keys(jdata.J2).length; gb++)
      data2[gb] = [jdata.J2[gb].key1,jdata.J2[gb].key2,jdata.J2[gb].key3];
    for(gc=0; gc<Object.keys(jdata.J3).length; gc++)
      data3[gc] = [jdata.J3[gc].key1,jdata.J3[gc].key2];
      Mout.checked = jdata.S1.key1;
      Sout.checked = jdata.S1.key2;
      selectD.options[jdata.S1.key3].selected = true;
      late = Number(selectD.value);
      Read1(1,ga);
      Read1(2,gb);
      Read2(gc);
  }else{
    Read1(1,1);
    Read1(2,1);
    Read2(1);
  }
}