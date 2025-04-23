

function Rconfile(u){
  tarea.value = "";
  if(u=="mdsq"){
      let te = Rfile1.replace(/ \/>|<\/create_date><\/meta><data><mstr>/g, "\n");
      te = te.replace(/<\?xml version='1.0' encoding='UTF-8' standalone='yes' \?><midsequer_project><editstate><filename>|<\/filename><edited>false<\/edited><\/editstate><sng><meta><title><\/title><create|<\/mstr><trk |<\/tempo><tim_sig|<\/evts><\/trk><trk |><ini><inst|pc=|<nt | v="110"|"|t=|d=|<volume>100<\/volume><\/ini><evts|<\/trk><trk |>|<\/trk><\/data><\/sng><\/midsequer_project>|</g, "");
      te = te.replace(/n=36/g, "1");
      te = te.replace(/n=37/g, "2");
      te = te.replace(/n=38/g, "3");
      te = te.replace(/n=39/g, "4");
      te = te.replace(/n=40/g, "5");
      te = te.replace(/n=41/g, "6");
      te = te.replace(/n=42/g, "7");
      te = te.replace(/n=43/g, "8");
      te = te.replace(/n=44/g, "9");
      te = te.replace(/n=45/g, "A");
      te = te.replace(/n=46/g, "B");
      te = te.replace(/n=47/g, "C");
      te = te.replace(/n=48/g, "31");
      te = te.replace(/n=49/g, "32");
      te = te.replace(/n=50/g, "33");
      te = te.replace(/n=51/g, "34");
      te = te.replace(/n=52/g, "35");
      te = te.replace(/n=53/g, "36");
      te = te.replace(/n=54/g, "37");
      te = te.replace(/n=55/g, "38");
      te = te.replace(/n=56/g, "39");
      te = te.replace(/n=57/g, "3A");
      te = te.replace(/n=58/g, "3B");
      te = te.replace(/n=59/g, "3C");
      te = te.replace(/n=60/g, "41");
      te = te.replace(/n=61/g, "42");
      te = te.replace(/n=62/g, "43");
      te = te.replace(/n=63/g, "44");
      te = te.replace(/n=64/g, "45");
      te = te.replace(/n=65/g, "46");
      te = te.replace(/n=66/g, "47");
      te = te.replace(/n=67/g, "48");
      te = te.replace(/n=68/g, "49");
      te = te.replace(/n=69/g, "4A");
      te = te.replace(/n=70/g, "4B");
      te = te.replace(/n=71/g, "4C");
      te = te.replace(/n=72/g, "51");
      te = te.replace(/n=73/g, "52");
      te = te.replace(/n=74/g, "53");
      te = te.replace(/n=75/g, "54");
      te = te.replace(/n=76/g, "55");
      te = te.replace(/n=77/g, "56");
      te = te.replace(/n=78/g, "57");
      te = te.replace(/n=79/g, "58");
      te = te.replace(/n=80/g, "59");
      te = te.replace(/n=81/g, "5A");
      te = te.replace(/n=82/g, "5B");
      te = te.replace(/n=83/g, "5C");
      te = te.replace(/n=84/g, "61");
      //
      var lines = te.split('\n');
      let k=0, z=0, s1, s2, ad=0;
      data1_1=[], data1_2=[];
      s1 = lines[k].split(' ');
      while(s1[0]!="i0") {
           k++; 
           s1 = lines[k].split(' ');
      }
      
      s1 = lines[k+1].split(' ');
      let m = ('00' + Number(s1[2]).toString(16).toUpperCase()).substr(-2);
      let n = ('0000' + Number(s1[2]).toString(16).toUpperCase()).substr(-4); 
      let j = Number(s1[2]).toString(16);
      if(j.length>=3){
          let len7 = n.substr(0, 2);
          let len8 = n.substr(2, 2);
          data1_1[2] = len8; 
          data1_2[2] = len7; 
          ad=1;
      }else{
          data1_1[2] = m;
      }
      data1=[["10","00","00"],["0E","00","00"],["1E","00","00"],["2E","00","00"]];
      z+=4;
      data1[z] = ["60","00",data1_1[2]];
      z++;
      if(ad>=1) { 
          data1[z] = ["20","00",data1_2[2]];
          z++;
      }

      while(s1[0]!="i1") {
          k++; 
          ad=0;
          s1 = lines[k].split(' ');
          s2 = lines[k+1].split(' ');
          data1_1[0] = s1[0];

          let p = ('00' + Number(s1[1]).toString(16).toUpperCase()).substr(-2);
          let q = ('0000' + Number(s1[1]).toString(16).toUpperCase()).substr(-4); 
          let a = Number(s1[1]).toString(16);
          if(a.length>=3){
              let len5 = q.substr(0, 2);
              let len6 = q.substr(2, 2);
              data1_1[1] = len6; 
              data1_2[1] = len5; 
              data1_2[0] = "20";
              data1_2[2] = "00";
              ad=1;
          }else{
              data1_1[1] = p;
          }

          let r = Number(s2[2]) - Number(s1[1]) - Number(s1[2]);
          let m = ('00' + r.toString(16).toUpperCase()).substr(-2);
          let n = ('0000' + r.toString(16).toUpperCase()).substr(-4); 
          let c = r.toString(16);
          if(c.length>=3){
              let len7 = n.substr(0, 2);
              let len8 = n.substr(2, 2);
              data1_1[2] = len8; 
              data1_2[2] = len7; 
              data1_2[0] = "20";
              if(ad!=1) data1_2[1] = "00";
              ad=1;
          }else{
              data1_1[2] = m;
          }

          if(s1[0]!="i1")data1[z] = [data1_1[0],data1_1[1],data1_1[2]];
          if(s1[0]!="i1")tarea.value += data1[z] + "\n";
          else tarea.value += "\n\n\n";
          z++;
          if(ad>=1&&s1[0]!="i1") { 
              data1[z] = [data1_2[0],data1_2[1],data1_2[2]];
              tarea.value += data1[z] + "\n";
              z++;
              ad=0;
          }
      }
      dl1=z-1;
      z=0,ad=0;
      s1 = lines[k+1].split(' ');
      m = ('00' + Number(s1[2]).toString(16).toUpperCase()).substr(-2);
      n = ('0000' + Number(s1[2]).toString(16).toUpperCase()).substr(-4); 
      j = Number(s1[2]).toString(16);
      if(j.length>=3){
          let len7 = n.substr(0, 2);
          let len8 = n.substr(2, 2);
          data1_1[2] = len8; 
          data1_2[2] = len7; 
          ad=1;
      }else{
          data1_1[2] = m;
      }
      data2=[["10","00","00"]];
      z++;
      data2[z] = ["60","00",data1_1[2]];
      z++;
      if(ad>=1) { 
          data2[z] = ["20","00",data1_2[2]];
          z++;
      }
      while(s1[0]!="i2") {
          k++; 
          ad=0;
          s1 = lines[k].split(' ');
          s2 = lines[k+1].split(' ');
          data1_1[0] = s1[0];

          let p = ('00' + Number(s1[1]).toString(16).toUpperCase()).substr(-2);
          let q = ('0000' + Number(s1[1]).toString(16).toUpperCase()).substr(-4);
          let a = Number(s1[1]).toString(16); 
          if(a.length>=3){
              let len5 = q.substr(0, 2);
              let len6 = q.substr(2, 2);
              data1_1[1] = len6; 
              data1_2[1] = len5; 
              data1_2[0] = "20";
              data1_2[2] = "00";
              ad=1;
          }else{
              data1_1[1] = p;
          }

          let r = Number(s2[2]) - Number(s1[1]) - Number(s1[2]);
          let m = ('00' + r.toString(16).toUpperCase()).substr(-2);
          let n = ('0000' + r.toString(16).toUpperCase()).substr(-4); 
          let c = r.toString(16);
          if(c.length>=3){
              let len7 = n.substr(0, 2);
              let len8 = n.substr(2, 2);
              data1_1[2] = len8; 
              data1_2[2] = len7; 
              data1_2[0] = "20";
              if(ad!=1) data1_2[1] = "00";
              ad=1;
          }else{
              data1_1[2] = m;
          }

          if(s1[0]!="i2")data2[z] = [data1_1[0],data1_1[1],data1_1[2]];
          if(s1[0]!="i2")tarea.value += data2[z] + "\n";
          else tarea.value += "\n\n\n";
          z++;
          if(ad>=1&&s1[0]!="i2") { 
              data2[z] = [data1_2[0],data1_2[1],data1_2[2]];
              tarea.value += data2[z] + "\n";
              z++;
              ad=0;
          }
      }
      dl2=z-1;
      z=0,ad=0;
      s1 = lines[k+1].split(' ');
      m = ('00' + Number(s1[2]).toString(16).toUpperCase()).substr(-2);
      n = ('0000' + Number(s1[2]).toString(16).toUpperCase()).substr(-4); 
      j = Number(s1[2]).toString(16);
      if(j.length>=3){
          let len7 = n.substr(0, 2);
          let len8 = n.substr(2, 2);
          data1_1[1] = len8; 
          data1_2[1] = len7; 
          ad=1;
      }else{
          data1_1[1] = m;
      }
      data3=[["10","00"],["90","00"],["80","80"],["C0","26"],["50","80"]];
      z+=5;
      data3[z] = ["10",data1_1[1]];
      z++;
      if(ad>=1) { 
          data3[z] = ["20",data1_2[1]];
          z++;
      }
      while(s1[0]!="i3") {
          k++; 
          ad=0;
          s1 = lines[k].split(' ');
          s2 = lines[k+1].split(' ');
          data1_1[0] = s1[0];

          let r = ('00' + Number(s1[1]).toString(16).toUpperCase()).substr(-2);
          let t = ('0000' + Number(s1[1]).toString(16).toUpperCase()).substr(-4); 
          let a = Number(s1[1]).toString(16);
          if(a.length>=3){
              let len5 = t.substr(0, 2);
              let len6 = t.substr(2, 2);
              data1_1[1] = len6; 
              data1_2[1] = len5; 
              data1_2[0] = "20";
              ad=1;
          }else{
              data1_1[1] = r;
          }

          if(s1[0]!="i3")data3[z] = [data1_1[0],data1_1[1]];
          if(s1[0]!="i3")tarea.value += data3[z] + "\n";
          else tarea.value += "\n\n\n";
          z++;
          if(ad>=1&&s1[0]!="i3") { 
              data3[z] = [data1_2[0],data1_2[1]];
              tarea.value += data3[z] + "\n";
              z++;
              ad=0;
          }
      }
      dl3=z-1; 
      Read1(1,dl1);
      Read1(2,dl2);
      Read2(dl3);


  } else if(u=="txt"||u=="TXT") {
      let te = Rfile1.replace(/\r\n|\r/g, "\n");
      var lines = te.split('\n');
      let k=0, z=0, s1;
      data1=[],data2=[],data3=[];
      s1 = lines[k].split(' ');
      while(s1[0]!="NoteM") {
           k++; 
           s1 = lines[k].split(' ');
      }
      while(s1[0]!="NoteS") {
          k++; 
          if (lines[k]=='') continue;
          s1 = lines[k].split(' ');;
          if(s1[0]!="NoteS")data1[z] = [s1[0],s1[1],s1[2]];
          if(s1[0]!="NoteS")tarea.value += data1[z] + "\n";
          else tarea.value += "\n\n\n";
          z++;
      }
      dl1=z-1;
      z=0;
      while(s1[0]!="CodeR") {
          k++; 
          if (lines[k]=='') continue;
          s1 = lines[k].split(' ');
          
          if(s1[0]!="CodeR")data2[z] = [s1[0],s1[1],s1[2]];
          if(s1[0]!="CodeR")tarea.value += data2[z] + "\n";
          else tarea.value += "\n\n\n";
          z++;
      }
      dl2=z-1;
      
      z=0;
      while(s1[0]!="End") {
          k++; 
          if (lines[k]=='') continue;
          s1 = lines[k].split(' ');
          
          if(s1[0]!="End")data3[z] = [s1[0],s1[1]];
          if(s1[0]!="End")tarea.value += data3[z] + "\n";
          else tarea.value += "\n\n\n";
          z++;
      }
      dl3=z-1;
      Read1(1,dl1);
      Read1(2,dl2);
      Read2(dl3);
      dataW[wd-1] = [data1,data2,data3];
      Seladd(1);
      wd++;
      timep(1);
      timep(2);
      timep(3);

  }else if(u=="bin"||u=="BIN"||u=="drp"||u=="DRP"){
    var bs=[], num1,num2=0, nu=0;
      for (num1=0; num1<Rfile1.length; num1++){
        bs[num2] = ('00' + (Rfile1.charCodeAt(num1) & 0xff).toString(16).toUpperCase()).substr(-2);
        if(bs[num2]=="A5"||bs[num2]=="5A"||nu==1){ 
          nu=1;
          tarea.value += bs[num2]+" ";
        if((num2+1)%16==0) tarea.value += "\n";
        num2++;
        } else num2=0;
        
        
      }




    if (!((bs[0]=="A5" || bs[0]=="5A") && bs[1]=="00")) {
        tarea.value = "Not Rom File.";
        return;
    }
    if(bs[0]=="5A" && bs[1]=="00") for(var ba=0; ba<num2; ba++) bs[ba] = bs[ba].split('').reverse().join('');

    num = parseInt(bs[6],16);
    var k = 2,b2=bd;
    var q = 0, num2 = 0;
    
    var target;

    target: for (var i=0; i<num; i++) switch(target){
      case 'LOOPEND':
        if(num != num2) {
              alert("The actual number of songs recorded was less than the number of songs.\r\n実際の収録曲数は曲数よりも少ないです。\r\n" + num + " → " + num2);
              num = num2;
        }
        break target;
      default:
        var dataB1=[], dataB2=[], dataB3=[];
        q=0;
        while (!(bs[k-2]=="10" && bs[k-1]=="00" && bs[k]=="00")) {
          if(k>=num1){ target='LOOPEND'; continue target; }
            k++; 
        }
        dataB1[q] = [bs[k-2], bs[k-1], bs[k]];
        q++; k += 3;
        while(!(bs[k-2]=="F0")) {
            if(k>=num1){ target='LOOPEND'; continue target; }
            dataB1[q] = [bs[k-2], bs[k-1], bs[k]];
            q++; k += 3;
        }
        dataB1[q] = [bs[k-2], bs[k-1], bs[k]];
        while (!(bs[k-2]=="10" && bs[k-1]=="00" && bs[k]=="00")) {
          if(k>=num1){ target='LOOPEND'; continue target; }
            k++; 
        }
        q=0;
        dataB2[q] = [bs[k-2], bs[k-1], bs[k]];
        q++; k += 3;
        while(!(bs[k-2]=="F0")) {
          if(k>=num1){ target='LOOPEND'; continue target; }
          dataB2[q] = [bs[k-2], bs[k-1], bs[k]];
          q++; k += 3;
        }
        dataB2[q] = [bs[k-2], bs[k-1], bs[k]];
        while (!(bs[k-1]=="10" && bs[k]=="00")) {
          if(k>=num1){ target='LOOPEND'; continue target; }
            k++; 
        }
        q=0;
        dataB3[q] = [bs[k-1], bs[k]];
        q++; k += 2;
        while(!(bs[k-1]=="F0")) {
          if(k>=num1){ target='LOOPEND'; continue target; }
          dataB3[q] = [bs[k-1], bs[k]];
          q++; k += 2;
        }
        dataB3[q] = [bs[k-1], bs[k]];

        dataB[i+bd] = [dataB1, dataB2, dataB3];
        b2 = i;
        num2 = i + 1;
        break;
    }

    var numi = mytable4.rows.length;
    if(mytable4.rows[1].cells[7].innerText=="0(0)")
      for(let g=numi; g>1; g--){
          mytable4.deleteRow(1);
      }
    for(var f=0; f<num; f++){
      var mytr = document.createElement("tr");
      var myth = document.createElement("th");
      
      //myth.textContent = f+1;
      mytr.appendChild(myth);
      var mytd1 = document.createElement("td");
      mytd1.textContent = "bin:"+txtname+" song"+ (f+1);
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
      mytd2.textContent = dataB[f+bd][0].length*3 + "(" + dataB[f+bd][0].length + ")";
      mytr.appendChild(mytd2);

      var mytd3 = document.createElement("td");
      mytd3.textContent = dataB[f+bd][1].length*3 + "(" + dataB[f+bd][1].length + ")";
      mytr.appendChild(mytd3);

      var mytd4 = document.createElement("td");
      mytd4.textContent = dataB[f+bd][2].length*2 + "(" + dataB[f+bd][2].length + ")";
      mytr.appendChild(mytd4);

      var mytd5 = document.createElement("td");
      mytd5.textContent = (dataB[f+bd][0].length*3)+(dataB[f+bd][1].length*3)+(dataB[f+bd][2].length*2) + "(" + ((dataB[f+bd][0].length)+(dataB[f+bd][1].length)+(dataB[f+bd][2].length)) + ")";
      mytr.appendChild(mytd5);
      
      var myth = document.createElement("th");
      var btn5 = document.createElement("input");
      btn5.setAttribute("type", "button");
      btn5.setAttribute("id", "rowdel");
      btn5.setAttribute("class", "flexbox");
      btn5.setAttribute("value", "Del");
      myth.appendChild(btn5);
      mytr.appendChild(myth);

      mytr.setAttribute("id", "bin"+(f+bd+1));
      mytr.setAttribute("class", "binS");
      mytable4.appendChild(mytr);
    }
    bd=b2;
    Seladd(0);
    orgno(4);
  }else if(u=="mid"||u=="MID"||u=="midi"||u=="MIDI"){

    var bs=[], num1, k=0, z=0, tl=0, lb=0, lo=0, kuri=false, tm=0;
      for (num1=0; num1<Rfile1.length; num1++){
        bs[num1] = Rfile1.charCodeAt(num1);
        //tarea.value += ('00' + (Rfile1.charCodeAt(num1) & 0xff).toString(16).toUpperCase()).substr(-2)+" ";
        //if((num1+1)%16==0) tarea.value += "\n";
      }

      if (!(bs[0]==0x4D && bs[1]==0x54 && bs[2]==0x68 && bs[3]==0x64)) {
        tarea.value = "Not smf File.";
        return;
      }
      if (!(bs[9]==0x01)) {
        tarea.value = "Not format 1.";
        return;
      }
      var bpqn = (bs[12]<<8)+bs[13];
      if (bpqn!=48) {
        tarea.value += "\n bpqn is "+ bpqn +".";
      }
      var bp = bpqn/24;
      data1_1=[], data1_2=["20",,];
      //NoteM

      while(!(bs[k]==0xFF&&bs[k+1]==0x51)) k++;
      while(!(bs[k-1]==0xFF && bs[k]==0x2F)) k++;
      k++;

      data1=[["10","00","00"],["0E","00","00"],["1E","00","00"],["2E","00","00"]];
      z+=4;
      data1_1[0]="60";
      data1_1[1]="00";

      while(!(bs[k]==0x90&&bs[k-1]<=0x80)) {
        var be=0;
        lo=0;
        if(bs[k]==0xC0) do{
          kuri=false;
          var lo=0;
          if(bs[k+2]<0x80){
            if(bs[k+3]<0x80) kuri=true;
            be = bs[k+2]/bp;
            if(be>=1) tm += be;
            k+=2;
          }else if(bs[k+3]<0x80&&bs[k+2]>=0x80){
            if(bs[k+4]<0x80) kuri=true;
            be = ((bs[k+2] ^ (1<<7))<<7 | bs[k+3])/bp;
            if(be>=1) tm += be;
            k+=3;
          }else{
            alert("long");
          }
        }while(kuri);
         
        else if(bs[k]==0xB0||bs[k]==0xE0) do{
          kuri=false;
          var be=0, lo=0;
          if(bs[k+3]<0x80){
            if(bs[k+4]<0x80) kuri=true;
            be = bs[k+3]/bp;
            if(be>=1) tm += be;
            k+=3;
          }else if(bs[k+4]<0x80&&bs[k+3]>=0x80){
            if(bs[k+5]<0x80) kuri=true;
            be = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            if(be>=1) tm += be;
            k+=4;
          }else{
            alert("long");
          }
        }while(kuri);
        k++;
      }

      if(tm>=1){
        var c = tm.toString(16).toUpperCase();
        var d = ('0000' + tm.toString(16).toUpperCase()).substr(-4);
        var le1 = d.substr(0, 2);
        var le2 = d.substr(2, 2);    
        if(c.length>=3){
          data1_1[2]=le2;
          data1_2[1]="00";
          data1_2[2]=le1;
          data1[z]=[data1_1[0],data1_1[1],data1_1[2]];
          data1[z+1]=[data1_2[0],data1_2[1],data1_2[2]];
          z+=2;
        }else{
          data1_1[2]=le2;
          data1[z]=[data1_1[0],data1_1[1],data1_1[2]];
          z++;
        }
      }
      
      while(!(bs[k-1]==0xFF && bs[k]==0x2F)) {
        if(bs[k]==0x90){
          var nn=0, lo=0, kk=0, be1=0;
          switch(bs[k+1]){
            case 0x24: nn="21"; break;
            case 0x25: nn="22"; break;
            case 0x26: nn="23"; break;
            case 0x27: nn="24"; break;
            case 0x28: nn="25"; break;
            case 0x29: nn="26"; break;
            case 0x2A: nn="27"; break;
            case 0x2B: nn="28"; break;
            case 0x2C: nn="29"; break;
            case 0x2D: nn="2A"; break;
            case 0x2E: nn="2B"; break;
            case 0x2F: nn="2C"; break;
            case 0x30: nn="31"; break;
            case 0x31: nn="32"; break;
            case 0x32: nn="33"; break;
            case 0x33: nn="34"; break;
            case 0x34: nn="35"; break;
            case 0x35: nn="36"; break;
            case 0x36: nn="37"; break;
            case 0x37: nn="38"; break;
            case 0x38: nn="39"; break;
            case 0x39: nn="3A"; break;
            case 0x3A: nn="3B"; break;
            case 0x3B: nn="3C"; break;
            case 0x3C: nn="41"; break;
            case 0x3D: nn="42"; break;
            case 0x3E: nn="43"; break;
            case 0x3F: nn="44"; break;
            case 0x40: nn="45"; break;
            case 0x41: nn="46"; break;
            case 0x42: nn="47"; break;
            case 0x43: nn="48"; break;
            case 0x44: nn="49"; break;
            case 0x45: nn="4A"; break;
            case 0x46: nn="4B"; break;
            case 0x47: nn="4C"; break;
            case 0x48: nn="51"; break;
            case 0x49: nn="52"; break;
            case 0x4A: nn="53"; break;
            case 0x4B: nn="54"; break;
            case 0x4C: nn="55"; break;
            case 0x4D: nn="56"; break;
            case 0x4E: nn="57"; break;
            case 0x4F: nn="58"; break;
            case 0x50: nn="59"; break;
            case 0x51: nn="5A"; break;
            case 0x52: nn="5B"; break;
            case 0x53: nn="5C"; break;
            case 0x54: nn="61"; break;
            case 0x55: nn="62"; break;
            case 0x56: nn="63"; break;
            case 0x57: nn="64"; break;
            case 0x58: nn="65"; break;
            case 0x59: nn="66"; break;
            case 0x5A: nn="67"; break;
            case 0x5B: nn="68"; break;
            case 0x5C: nn="69"; break;
            case 0x5D: nn="6A"; break;
            case 0x5E: nn="6B"; break;
            case 0x5F: nn="6C"; break;
          }
          data1_1[0]=nn;

          if(bs[k+4]==0x80&&bs[k+3]<0x80){
            be1 = bs[k+3]/bp;
            tm += be1;
          }else if(bs[k+5]==0x80&&bs[k+4]<0x80){
            be1 = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            kk=1;
            tm += be1;
          }else if(bs[k+4]==bs[k+1]&&bs[k+5]==0&&bs[k+3]<0x80){
            be1 = bs[k+3]/bp;
            tm += be1;
          }else if(bs[k+5]==bs[k+1]&&bs[k+6]==0&&bs[k+4]<0x80){
            be1 = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            kk=1;
            tm += be1;
          }else{
            alert("The note or event of NoteM in the "+tm+"th tick may be overlapping.");
          }
          if(be1>=1){
            var c = be1.toString(16).toUpperCase();
            var d = ('0000' + be1.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[1]=le2;
              data1_2[1]=le1;
              data1_2[2]="00";
              lo=1;
            }else{
              data1_1[1]=le2;
              lo=0;
            }
          }

          if(bs[k+kk+8]>=0x80&&bs[k+kk+7]<0x80){
            var be = bs[k+kk+7]/bp;
            data1_1[2]=('00' + be.toString(16).toUpperCase()).substr(-2);
            k=k+7+kk;
          }else if(bs[k+kk+9]>=0x80&&bs[k+kk+8]<0x80&&bs[k+kk+7]>=0x80){
            var be = ((bs[k+kk+7] ^ (1<<7))<<7 | bs[k+kk+8])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[2]=le2;
              data1_2[2]=le1;
              if(lo==0)data1_2[1]="00";
              lo=2;
            }else{
              data1_1[2]=le2;
            }
            k=k+8+kk;
          }else if(bs[k+kk+10]>=0x80&&bs[k+kk+9]<0x80&&bs[k+kk+8]>=0x80&&bs[k+kk+7]>=0x80){
            var be = ((bs[k+kk+7] ^ (1<<7))<<14 | (bs[k+kk+8] ^ (1<<7))<<7 | bs[k+kk+9])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[2]=le2;
              data1_2[2]=le1;
              if(lo==0)data1_2[1]="00";
              lo=2;
            }else{
              data1_1[2]=le2;
            }
            k=k+9+kk;
          }else{
            alert("long");
          }
          
          data1[z]=[data1_1[0],data1_1[1],data1_1[2]];
          if(lo>=1)data1[z+1]=[data1_2[0],data1_2[1],data1_2[2]];
          if(lo>=1)z+=2;
          else z++;
        }

        if(bs[k]==0xC0) do{
          kuri=false;
          data1_1[0]="60";
          data1_1[1]="00";
          if(bs[k+2]<0x80){
            if(bs[k+3]<0x80) kuri=true;
            var be = bs[k+2]/bp;
            data1_1[2]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data1[z]=[data1_1[0],data1_1[1],data1_1[2]];
            z++;
          }else if(bs[k+3]<0x80&&bs[k+2]>=0x80){
            if(bs[k+4]<0x80) kuri=true;
            var be = ((bs[k+2] ^ (1<<7))<<7 | bs[k+3])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[2]=le2;
              data1_2[1]="00";
              data1_2[2]=le1;
              data1[z]=[data1_1[0],data1_1[1],data1_1[2]];
              data1[z+1]=[data1_2[0],data1_2[1],data1_2[2]];
              z+=2;
            }else{
              data1_1[2]=le2;
              data1[z]=[data1_1[0],data1_1[1],data1_1[2]];
              z++;
            }
          }else{
            alert("long");
          }
        }while(kuri);

        if(bs[k]==0xB0&&bs[k-1]<0x80&&bs[k+1]<0x80) do{
          kuri=false;
          data1_1[0]="10";
          if(bs[k+3]<0x80){
            if(bs[k+4]<0x80) kuri=true;
            var be = bs[k+3]/bp;
            data1_1[1]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data1[z]=[data1_1[0],data1_1[1],"00"];
            z++;
          }else if(bs[k+4]<0x80&&bs[k+3]>=0x80){
            if(bs[k+5]<0x80) kuri=true;
            var be = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
              data1[z]=[data1_1[0],le2,le1];
              z++;
          }else{
            alert("long");
          }
        }while(kuri);
        
        if(bs[k]==0xFF && bs[k+1]==0x2F){
          data1[z]=["F0","00","00"];
          z++;
        }
        k++;
      }
      dl1=z;
      z=0,tm=0;
      
      //NoteS

      data2=[["10","00","00"]];
      z+=1;
      data1_1[0]="60";
      data1_1[1]="00";

      while(!(bs[k]==0x91&&bs[k-1]<=0x81)) {
        var be=0;
        lo=0;
        if(bs[k]==0xC1) do{
          kuri=false;
          var lo=0;
          if(bs[k+2]<0x80){
            if(bs[k+3]<0x80) kuri=true;
            be = bs[k+2]/bp;
            if(be>=1) tm += be;
            k+=2;
          }else if(bs[k+3]<0x80&&bs[k+2]>=0x80){
            if(bs[k+4]<0x80) kuri=true;
            be = ((bs[k+2] ^ (1<<7))<<7 | bs[k+3])/bp;
            if(be>=1) tm += be;
            k+=3;
          }else{
            alert("long");
          }
        }while(kuri);
         
        else if(bs[k]==0xB1||bs[k]==0xE1) do{
          kuri=false;
          var be=0, lo=0;
          if(bs[k+3]<0x80){
            if(bs[k+4]<0x80) kuri=true;
            be = bs[k+3]/bp;
            if(be>=1) tm += be;
            k+=3;
          }else if(bs[k+4]<0x80&&bs[k+3]>=0x80){
            if(bs[k+5]<0x80) kuri=true;
            be = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            if(be>=1) tm += be;
            k+=4;
          }else{
            alert("long");
          }
        }while(kuri);
        k++;
      }

      if(tm>=1){
        var c = tm.toString(16).toUpperCase();
        var d = ('0000' + tm.toString(16).toUpperCase()).substr(-4);
        var le1 = d.substr(0, 2);
        var le2 = d.substr(2, 2);    
        if(c.length>=3){
          data1_1[2]=le2;
          data1_2[1]="00";
          data1_2[2]=le1;
          data2[z]=[data1_1[0],data1_1[1],data1_1[2]];
          data2[z+1]=[data1_2[0],data1_2[1],data1_2[2]];
          z+=2;
        }else{
          data1_1[2]=le2;
          data2[z]=[data1_1[0],data1_1[1],data1_1[2]];
          z++;
        }
      }
      
      while(!(bs[k-1]==0xFF && bs[k]==0x2F)) {
        if(bs[k]==0x91){
          var nn=0, lo=0, kk=0, be1=0;
          switch(bs[k+1]){
            case 0x24: nn="21"; break;
            case 0x25: nn="22"; break;
            case 0x26: nn="23"; break;
            case 0x27: nn="24"; break;
            case 0x28: nn="25"; break;
            case 0x29: nn="26"; break;
            case 0x2A: nn="27"; break;
            case 0x2B: nn="28"; break;
            case 0x2C: nn="29"; break;
            case 0x2D: nn="2A"; break;
            case 0x2E: nn="2B"; break;
            case 0x2F: nn="2C"; break;
            case 0x30: nn="31"; break;
            case 0x31: nn="32"; break;
            case 0x32: nn="33"; break;
            case 0x33: nn="34"; break;
            case 0x34: nn="35"; break;
            case 0x35: nn="36"; break;
            case 0x36: nn="37"; break;
            case 0x37: nn="38"; break;
            case 0x38: nn="39"; break;
            case 0x39: nn="3A"; break;
            case 0x3A: nn="3B"; break;
            case 0x3B: nn="3C"; break;
            case 0x3C: nn="41"; break;
            case 0x3D: nn="42"; break;
            case 0x3E: nn="43"; break;
            case 0x3F: nn="44"; break;
            case 0x40: nn="45"; break;
            case 0x41: nn="46"; break;
            case 0x42: nn="47"; break;
            case 0x43: nn="48"; break;
            case 0x44: nn="49"; break;
            case 0x45: nn="4A"; break;
            case 0x46: nn="4B"; break;
            case 0x47: nn="4C"; break;
            case 0x48: nn="51"; break;
            case 0x49: nn="52"; break;
            case 0x4A: nn="53"; break;
            case 0x4B: nn="54"; break;
            case 0x4C: nn="55"; break;
            case 0x4D: nn="56"; break;
            case 0x4E: nn="57"; break;
            case 0x4F: nn="58"; break;
            case 0x50: nn="59"; break;
            case 0x51: nn="5A"; break;
            case 0x52: nn="5B"; break;
            case 0x53: nn="5C"; break;
            case 0x54: nn="61"; break;
            case 0x55: nn="62"; break;
            case 0x56: nn="63"; break;
            case 0x57: nn="64"; break;
            case 0x58: nn="65"; break;
            case 0x59: nn="66"; break;
            case 0x5A: nn="67"; break;
            case 0x5B: nn="68"; break;
            case 0x5C: nn="69"; break;
            case 0x5D: nn="6A"; break;
            case 0x5E: nn="6B"; break;
            case 0x5F: nn="6C"; break;
          }
          data1_1[0]=nn;

          if(bs[k+4]==0x81&&bs[k+3]<0x80){
            be1 = bs[k+3]/bp;
            tm += be1;
          }else if(bs[k+5]==0x81&&bs[k+4]<0x80){
            be1 = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            kk=1;
            tm += be1;
          }else if(bs[k+4]==bs[k+1]&&bs[k+5]==0&&bs[k+3]<0x80){
            be1 = bs[k+3]/bp;
            tm += be1;
          }else if(bs[k+5]==bs[k+1]&&bs[k+6]==0&&bs[k+4]<0x80){
            be1 = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            kk=1;
            tm += be1;
          }else{
            alert("The note or event of NoteS in the "+tm+"th tick may be overlapping.");
          }
          if(be1>=1){
            var c = be1.toString(16).toUpperCase();
            var d = ('0000' + be1.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[1]=le2;
              data1_2[1]=le1;
              data1_2[2]="00";
              lo=1;
            }else{
              data1_1[1]=le2;
              lo=0;
            }
          }

          if(bs[k+kk+8]>=0x80&&bs[k+kk+7]<0x80){
            var be = bs[k+kk+7]/bp;
            data1_1[2]=('00' + be.toString(16).toUpperCase()).substr(-2);
            k=k+7+kk;
          }else if(bs[k+kk+9]>=0x80&&bs[k+kk+8]<0x80&&bs[k+kk+7]>=0x80){
            var be = ((bs[k+kk+7] ^ (1<<7))<<7 | bs[k+kk+8])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[2]=le2;
              data1_2[2]=le1;
              if(lo==0)data1_2[1]="00";
              lo=2;
            }else{
              data1_1[2]=le2;
            }
            k=k+8+kk;
          }else if(bs[k+kk+10]>=0x80&&bs[k+kk+9]<0x80&&bs[k+kk+8]>=0x80&&bs[k+kk+7]>=0x80){
            var be = ((bs[k+kk+7] ^ (1<<7))<<14 | (bs[k+kk+8] ^ (1<<7))<<7 | bs[k+kk+9])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[2]=le2;
              data1_2[2]=le1;
              if(lo==0)data1_2[1]="00";
              lo=2;
            }else{
              data1_1[2]=le2;
            }
            k=k+9+kk;
          }else{
            alert("long");
          }
          data2[z]=[data1_1[0],data1_1[1],data1_1[2]];
          if(lo>=1)data2[z+1]=[data1_2[0],data1_2[1],data1_2[2]];
          if(lo>=1)z+=2;
          else z++;
        }

        if(bs[k]==0xC1) do{
          kuri=false;
          data1_1[0]="60";
          data1_1[1]="00";
          if(bs[k+2]<0x80){
            if(bs[k+3]<0x80) kuri=true;
            var be = bs[k+2]/bp;
            data1_1[2]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data2[z]=[data1_1[0],data1_1[1],data1_1[2]];
            z++;
          }else if(bs[k+3]<0x80&&bs[k+2]>=0x80){
            if(bs[k+4]<0x80) kuri=true;
            var be = ((bs[k+2] ^ (1<<7))<<7 | bs[k+3])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[2]=le2;
              data1_2[1]="00";
              data1_2[2]=le1;
              data2[z]=[data1_1[0],data1_1[1],data1_1[2]];
              data2[z+1]=[data1_2[0],data1_2[1],data1_2[2]];
              z+=2;
            }else{
              data1_1[2]=le2;
              data2[z]=[data1_1[0],data1_1[1],data1_1[2]];
              z++;
            }
          }else{
            alert("long");
          }
        }while(kuri);

        if(bs[k]==0xB1&&bs[k-1]<0x80&&bs[k+1]<0x80) do{
          kuri=false;
          data1_1[0]="10";
          if(bs[k+3]<0x80){
            if(bs[k+4]<0x80) kuri=true;
            var be = bs[k+3]/bp;
            data1_1[1]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data2[z]=[data1_1[0],data1_1[1],"00"];
            z++;
          }else if(bs[k+4]<0x80&&bs[k+3]>=0x80){
            if(bs[k+5]<0x80) kuri=true;
            var be = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
              data2[z]=[data1_1[0],le2,le1];
              z++;
          }
        }while(kuri);
        
        if(bs[k]==0xFF && bs[k+1]==0x2F){
          data2[z]=["F0","00","00"];
          z++;
        }
        k++;
      }
      dl2=z;
      z=0,tm=0;
      
      //CodeR

      data3=[["10","00"],["90","00"],["80","80"],["C0","26"],["50","80"]];
      z+=5;
      data1_1[0]="10";

      while(!(bs[k]==0x92&&bs[k-1]<=0x82)) {
        var be=0;
        lo=0;
        if(bs[k]==0xC2) do{
          kuri=false;
          var lo=0;
          if(bs[k+2]<0x80){
            if(bs[k+3]<0x80) kuri=true;
            be = bs[k+2]/bp;
            if(be>=1) tm += be;
            k+=2;
          }else if(bs[k+3]<0x80&&bs[k+2]>=0x80){
            if(bs[k+4]<0x80) kuri=true;
            be = ((bs[k+2] ^ (1<<7))<<7 | bs[k+3])/bp;
            if(be>=1) tm += be;
            k+=3;
          }else{
            alert("long");
          }
        }while(kuri);
         
        else if(bs[k]==0xB2||bs[k]==0xE2) do{
          kuri=false;
          var be=0, lo=0;
          if(bs[k+3]<0x80){
            if(bs[k+4]<0x80) kuri=true;
            be = bs[k+3]/bp;
            if(be>=1) tm += be;
            k+=3;
          }else if(bs[k+4]<0x80&&bs[k+3]>=0x80){
            if(bs[k+5]<0x80) kuri=true;
            be = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            if(be>=1) tm += be;
            k+=4;
          }else{
            alert("long");
          }
        }while(kuri);
        k++;
      }

      if(tm>=1){
        var c = tm.toString(16).toUpperCase();
        var d = ('0000' + tm.toString(16).toUpperCase()).substr(-4);
        var le1 = d.substr(0, 2);
        var le2 = d.substr(2, 2);    
        if(c.length>=3){
          data1_1[1]=le2;
          data1_2[1]=le1;
          data3[z]=[data1_1[0],data1_1[1]];
          data3[z+1]=[data1_2[0],data1_2[1]];
          z+=2;
        }else{
          data1_1[1]=le2;
          data3[z]=[data1_1[0],data1_1[1]];
          z++;
        }
      }
      
      

      while(!(bs[k-1]==0xFF && bs[k]==0x2F)) {
        if(bs[k]==0x92){
          var nn=0, lo=0, k2=1, k3=0, code=[], kk=0;
          while(!(bs[k+k2+1]==0x82||bs[k+k2]==0x82)){
            nn = bs[k+k2]%12+1;
            code[k3]=nn;
            if(bs[k+k2+3]==0x92)k2+=4;
            else k2+=3;
            k3++;
          }
          const aA = code.sort((a,b) => (a < b ? -1 : 1))
          const aB = aA.filter((val, i, arr) => {
            return arr.indexOf(val) != i; });
          const code2 = aA.filter((element, index) => {
            return aA.indexOf(element) == index; });
          let jb0=Number(aB);
        
          for(var ma=0; ma<code2.length; ma++){
            let jn1=0, jn2=0, jn3=0, jn4=0, jb=0;
            if(code2.length==4){
              if(ma==0){
                jn1 = Number(code2[0]);
                jn2 = Number(code2[1]);
                jn3 = Number(code2[2]);
                jn4 = Number(code2[3]);
              }
              if(ma==1){
                jn1 = Number(code2[1]);
                jn2 = Number(code2[2]);
                jn3 = Number(code2[3]);
                jn4 = Number(code2[0])+12;
              }
              if(ma==2){
                jn1 = Number(code2[2]);
                jn2 = Number(code2[3]);
                jn3 = Number(code2[0])+12;
                jn4 = Number(code2[1])+12;
              }
              if(ma==3){
                jn1 = Number(code2[3]);
                jn2 = Number(code2[0])+12;
                jn3 = Number(code2[1])+12;
                jn4 = Number(code2[2])+12;
              }
            }else if(code2.length==3){
              if(ma==0){
                jn1 = Number(code2[0]);
                jn2 = Number(code2[1]);
                jn3 = Number(code2[2]);
                jn4 = jn1;
              }
              if(ma==1){
                jn1 = Number(code2[1]);
                jn2 = Number(code2[2]);
                jn3 = Number(code2[0])+12;
                jn4 = jn1;
              }
              if(ma==2){
                jn1 = Number(code2[2]);
                jn2 = Number(code2[0])+12;
                jn3 = Number(code2[1])+12;
                jn4 = jn1;
              }
            }else if(code2.length==1){
              jn1 = Number(code2[0]);
            }
            if(jb0>=1)jn1=jb0;
            if(jn1>=13) jb=jn1-12;
            else jb=jn1;
            var aux="", aux2 = jb.toString(16).toUpperCase();
            if(code2.length==1){
              aux = "E";
              break;
            }
            if(code2.length==3&&jn2-jn1==4&&jn3-jn1==7){
              aux = "0";
              break;
            }
            if(code2.length==3&&jn2-jn1==3&&jn3-jn1==7){
              aux = "1";
              break;
            }
            if((jn2-jn1==4&&jn3-jn1==7&&jn4-jn1==10)||(jn2-jn1==4&&jn3-jn1==10)){
              aux = "2";
              break;
            }
            if((jn2-jn1==3&&jn3-jn1==7&&jn4-jn1==10)||(jn2-jn1==3&&jn3-jn1==10)){
              aux = "3";
              break;
            }
            if((jn2-jn1==4&&jn3-jn1==7&&jn4-jn1==11)||(jn2-jn1==4&&jn3-jn1==11)){
              aux = "4";
              break;
            }
            if(jn2-jn1==4&&jn3-jn1==7&&jn4-jn1==9){
              aux = "5";
              break;
            }
            if(jn2-jn1==3&&jn3-jn1==6&&jn4-jn1==10){
              aux = "6";
              break;
            }
            if(jn2-jn1==5&&jn3-jn1==7){
              aux = "7";
              break;
            }
            if(jn2-jn1==3&&jn3-jn1==6){
              aux = "8";
              break;
            } 
            if(jn2-jn1==4&&jn3-jn1==8){
              aux = "9";
              break;
            }
            if(jn2-jn1==3&&jn3-jn1==7&&jn4-jn1==9){
              aux = "A";
              break;
            }
            if(jn2-jn1==4&&jn3-jn1==6){
              aux = "B";
              break;
            }
            if((jn2-jn1==2&&jn3-jn1==4&&jn4-jn1==7)||(jn2-jn1==2&&jn3-jn1==7&&jn4-jn1==10)||(jn2-jn1==2&&jn3-jn1==4&&jn4-jn1==10)){
              aux = "C";
              break;
            }
            if((jn2-jn1==1&&jn3-jn1==4&&jn4-jn1==7)||(jn2-jn1==1&&jn3-jn1==7&&jn4-jn1==10)||(jn2-jn1==1&&jn3-jn1==4&&jn4-jn1==10)){
              aux = "D";
              break;
            }
          }
          data1_1[0]=aux+aux2;
          let data1_3=["F1",],data1_4=["20",];
          if(bs[k+k2]==0x82){
            var be = bs[k+k2-1]/bp;
            data1_1[1]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data3[z]=[data1_1[0],data1_1[1]];
            z++;
          }else{
            var be = ((bs[k+k2-1] ^ (1<<7))<<7 | bs[k+k2])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[1]=le2;
              data1_2[1]=le1;
              data3[z]=[data1_1[0],data1_1[1]];
              data3[z+1]=[data1_2[0],data1_2[1]];
              z+=2;
            }else{
              data1_1[1]=le2;
              data3[z]=[data1_1[0],data1_1[1]];
              z++;
            }
            kk=1;
          }
          if(bs[k+kk+k2+k2]>=0x92&&bs[k+kk+k2+k2-1]<0x80){
            var be = bs[k+kk+k2+k2-1]/bp;
            data1_3[1]=('00' + be.toString(16).toUpperCase()).substr(-2);
            if(data1_3[1]!="00"){
              data3[z]=[data1_3[0],data1_3[1]];
              z++;
            }
          }else{
            var be = ((bs[k+kk+k2+k2-1] ^ (1<<7))<<7 | bs[k+kk+k2+k2])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_3[1]=le2;
              data1_4[1]=le1;
              data3[z]=[data1_3[0],data1_3[1]];
              data3[z+1]=[data1_4[0],data1_4[1]];
              z+=2;
            }else{
              data1_3[1]=le2;
              data3[z]=[data1_3[0],data1_3[1]];
              z++;
            }
          }
          k+=k2+kk;
        }
        
        if(bs[k]==0xC2) do{
          kuri=false;
          data1_1[0]="60";
          data1_1[1]="00";
          if(bs[k+2]<0x80){
            if(bs[k+3]<0x80) kuri=true;
            var be = bs[k+2]/bp;
            data1_1[1]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data3[z]=[data1_1[0],data1_1[1]];
            z++;
          }else if(bs[k+3]<0x80&&bs[k+2]>=0x80){
            if(bs[k+4]<0x80) kuri=true;
            var be = ((bs[k+2] ^ (1<<7))<<7 | bs[k+3])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
            if(c.length>=3){
              data1_1[1]=le2;
              data1_2[1]=le1;
              data3[z]=[data1_1[0],data1_1[1]];
              data3[z+1]=[data1_2[0],data1_2[1]];
              z+=2;
            }else{
              data1_1[1]=le2;
              data3[z]=[data1_1[0],data1_1[1]];
              z++;
            }
          }else{
            alert("long");
          }
        }while(kuri);

        if(bs[k]==0xB2&&bs[k-1]<0x80&&bs[k+1]<0x80) do{
          kuri=false;
          data1_1[0]="10";
          if(bs[k+3]<0x80){
            if(bs[k+4]<0x80) kuri=true;
            var be = bs[k+3]/bp;
            data1_1[1]=('00' + be.toString(16).toUpperCase()).substr(-2);
            data3[z]=[data1_1[0],data1_1[1]];
            z++;
          }else if(bs[k+4]<0x80&&bs[k+3]>=0x80){
            if(bs[k+5]<0x80) kuri=true;
            var be = ((bs[k+3] ^ (1<<7))<<7 | bs[k+4])/bp;
            var c = be.toString(16).toUpperCase();
            var d = ('0000' + be.toString(16).toUpperCase()).substr(-4);
            var le1 = d.substr(0, 2);
            var le2 = d.substr(2, 2);
              data3[z]=[data1_1[0],le2];
              data3[z+1]=[data1_2[0],le1];
              z+=2;
          }
        }while(kuri);
        
        if(bs[k]==0xFF && bs[k+1]==0x2F){
          data3[z]=["F0","00"];
          z++;
        }
        k++;
      }
      dl3=z; 

      Read1(1,dl1);
      Read1(2,dl2);
      Read2(dl3);
      timep(1);
      timep(2);
      timep(3);
  }
}

function decode(ar){
  var value=0;
  //最上位ビットが1ならループ
  while(ar[i]>=0x80){
       //1.最上位ビットのみ反転(例：1000 0001 => 0000 0001にする)
      var a = ar[i] ^ (1<<7);
       //2.前回の値と連結
       value = value<<7 | a;
       i++;
  }
  //最後の値を連結
  value = value <<7 | ar[i]
  return value;
}

document.getElementById("binout").addEventListener("click", function() {

    var dlen = tbl4.rows.length;
    var rowe = tbl4.rows;
    var size = [];
    var dataG=[];
    var daW1=[],daW2=[],daW3=[];
  
    for(let nn=0; nn<dlen-1; nn++){
      var re = Number((rowe[nn+1].id).substr(3));
      daW1=[],daW2=[],daW3=[];
      switch(rowe[nn+1].className){
        case 'binS':
          size[nn] = [dataB[re-1][0].length*3,dataB[re-1][1].length*3,dataB[re-1][2].length*2];
          for(var g1=0; g1<dataB[re-1][0].length; g1++) daW1[g1] = [dataB[re-1][0][g1][0],dataB[re-1][0][g1][1],dataB[re-1][0][g1][2]]; 
          for(var g2=0; g2<dataB[re-1][1].length; g2++) daW2[g2] = [dataB[re-1][1][g2][0],dataB[re-1][1][g2][1],dataB[re-1][1][g2][2]];
          for(var g3=0; g3<dataB[re-1][2].length; g3++) daW3[g3] = [dataB[re-1][2][g3][0],dataB[re-1][2][g3][1]];
          dataG[nn] = [daW1,daW2,daW3];
          
          break;
        case 'wriD':
          
          if(tbl4.rows[nn+1].cells[7].innerText=="0(0)"){
            dlen--;
          }else{
            size[nn] = [dataW[re-1][0].length*3,dataW[re-1][1].length*3,dataW[re-1][2].length*2];
            for(var g1=0; g1<dataW[re-1][0].length; g1++) daW1[g1] = [dataW[re-1][0][g1][0],dataW[re-1][0][g1][1],dataW[re-1][0][g1][2]];
            for(var g2=0; g2<dataW[re-1][1].length; g2++) daW2[g2] = [dataW[re-1][1][g2][0],dataW[re-1][1][g2][1],dataW[re-1][1][g2][2]];
            for(var g3=0; g3<dataW[re-1][2].length; g3++) daW3[g3] = [dataW[re-1][2][g3][0],dataW[re-1][2][g3][1]];
            dataG[nn] = [daW1,daW2,daW3];
          }
          break;
      }
    }
    dlen--;
    var bytes=["A5","00","00","D0","2F","00"];
    bytes.push(('00' + (dlen).toString(16).toUpperCase()).substr(-2),"00");
    
    var sizr = 22 + 6*(dlen+1);
    var daT=[];
    
    for(var gf=0; gf<dlen; gf++){
      var dn, dnm, dns, dnc, dnn;
      dn = ('0000' + sizr.toString(16).toUpperCase()).substr(-4);
      dnm = ('0000' + (sizr+32).toString(16).toUpperCase()).substr(-4);
      dns = ('0000' + (sizr+32+(size[gf][0]*2)).toString(16).toUpperCase()).substr(-4);
      dnc = ('0000' + (sizr+32+(size[gf][0]*2)+(size[gf][1]*2)).toString(16).toUpperCase()).substr(-4);
      dnn = ('0000' + (sizr+32+(size[gf][0]*2)+(size[gf][1]*2)+(size[gf][2]*2)).toString(16).toUpperCase()).substr(-4);
      sizr = sizr+32+(size[gf][0]*2)+(size[gf][1]*2)+(size[gf][2]*2);
      daT[gf] = [dn, dnm, dns, dnc, dnn];
    }
    var dne = ('0000' + sizr.toString(16).toUpperCase()).substr(-4);
    let dn1 = dne.substr(0, 2);
    let dn2 = dne.substr(2, 2);
    bytes.push(dn2,dn1,"00");
  
    for(var gf=0; gf<dlen; gf++){
      let dnp1 = daT[gf][0].substr(0, 2);
      let dnp2 = daT[gf][0].substr(2, 2);
      bytes.push(dnp2,dnp1,"00");
    }
  
    var dne2 = ('0000' + (sizr+6).toString(16).toUpperCase()).substr(-4);
    dn1 = dne2.substr(0, 2);
    dn2 = dne2.substr(2, 2);
    bytes.push(dn2,dn1,"00");
  
    for(var gf=0; gf<dlen; gf++){
      let dn1_1 = daT[gf][1].substr(0, 2);
      let dn1_2 = daT[gf][1].substr(2, 2);
      bytes.push("00",dn1_2,dn1_1,"00");
      let dn2_1 = daT[gf][2].substr(0, 2);
      let dn2_2 = daT[gf][2].substr(2, 2);
      bytes.push("10",dn2_2,dn2_1,"00");
      let dn3_1 = daT[gf][3].substr(0, 2);
      let dn3_2 = daT[gf][3].substr(2, 2);
      bytes.push("02",dn3_2,dn3_1,"00");
      let dn4_1 = daT[gf][4].substr(0, 2);
      let dn4_2 = daT[gf][4].substr(2, 2);
      bytes.push("FF",dn4_2,dn4_1,"00");
  
      for(var df=0; df<size[gf][0]/3; df++) bytes.push(dataG[gf][0][df][0],dataG[gf][0][df][1],dataG[gf][0][df][2]);
      for(var df=0; df<size[gf][1]/3; df++) bytes.push(dataG[gf][1][df][0],dataG[gf][1][df][1],dataG[gf][1][df][2]);
      for(var df=0; df<size[gf][2]/2; df++) bytes.push(dataG[gf][2][df][0],dataG[gf][2][df][1]);
    }
    bytes.push("00","00","00");
    let buffer = new ArrayBuffer(bytes.length);
    let dv = new DataView(buffer);
    tarea.value = "";
    for(var bu=0; bu<bytes.length; bu++){
      tarea.value += "0x";
      if(!binre.checked) { 
        dv.setUint8(bu,parseInt(bytes[bu],16));
        tarea.value += bytes[bu]+", ";
      }
      else {
        dv.setUint8(bu,parseInt(bytes[bu].split('').reverse().join(''),16));
        tarea.value += bytes[bu].split('').reverse().join('')+", ";
      }
      if((bu+1)%16==0) tarea.value += "\n";
    }
    
  
    
  
   
    const blob = new Blob([buffer], {type: "octet/stream"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ROM.bin";
    a.click();
    URL.revokeObjectURL(url);
  
  });
  
  
  document.getElementById("download").addEventListener("click", function() {
      Ofile1 = "NoteM\n";
      var e = tbl1.rows.length;
      for(let f=1; f<e; f++){
          for(let g=1; g<4; g++) Ofile1 +=  tbl1.rows[f].cells[g].firstElementChild.value + " ";
          Ofile1 += "\n";
      }
      Ofile1 += "\n\n\nNoteS\n";
      e = tbl2.rows.length;
      for(let f=1; f<e; f++){
          for(let g=1; g<4; g++) Ofile1 +=  tbl2.rows[f].cells[g].firstElementChild.value + " ";
          Ofile1 += "\n";
      }
      Ofile1 += "\n\n\nCodeR\n";
      e = tbl3.rows.length;
      for(let f=1; f<e; f++){
          for(let g=1; g<3; g++) Ofile1 +=  tbl3.rows[f].cells[g].firstElementChild.value + " ";
          Ofile1 += "\n";
      }
      Ofile1 += "\n\nEnd\n";
     
      const blob = new Blob([Ofile1], {type: "text/plain"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "NoteRom.txt";
      a.click();
      URL.revokeObjectURL(url);
  });
  