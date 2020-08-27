import {date} from "./data";
// переключение меню


let menu_ul=document.getElementsByClassName("nav")[0].children[0];
menu_ul.addEventListener("click",function(e)
{
    createCard(+e.target.classList.value[e.target.classList.value.length-1],date);
});
createCard(0,date);
function createCard(num,date)
{
    if (num==0)
    {
        document.getElementsByClassName("block_menu")[0].style.display="block";
        document.getElementsByClassName("block_cards")[0].style.display="none";
        let block=document.getElementsByClassName("block_menu")[0].children[0].children;
        for(let count=0;count<block.length;count++)
        {
            block[count].addEventListener("click",function(e)
            {
                createCard(count+1,date);
            });
        }
        // document.getElementsByClassName("block_menu")[0].style.display="block";
    //     for(let count=0;count<block.length;count++)
    //     {
    //         let sp=block[count].children[1]
    //         sp.innerHTML=date[num][count].word;
    //         let img=block[count].children[0];
    //         img.src=date[num][count].image;
    //         img.style.borderRadius="50%";
    //         let span_desc=block[count].children[2];
    //         span_desc.style.display="none";
    //         let img_rotate=block[count].children[3];
    //         img_rotate.style.display="none";
    //         // block[count].addEventListener("click",function(e)
    //         // {
    //         //     createCard(count+1,date);
    //         // })
    //     }   
    }
    else
    {
        document.getElementsByClassName("block_menu")[0].style.display="none";
        document.getElementsByClassName("block_cards")[0].style.display="flex";
        let block=document.getElementsByClassName("block_cards")[0].children[0].children;
        for(let count=0;count<block.length;count++)
        {
            let sp=block[count].children[1];
            sp.innerHTML=date[num-1][count].word;
            let spande=block[count].children[2]
            spande.innerHTML=date[num-1][count].translation;
            spande.style.opacity="0";
            let img=block[count].children[0]
            img.src=date[num-1][count].image;
            let audio=block[count].children[4];
            audio.src=date[num-1][count].audioSrc;
            block[count].addEventListener("click",function(e)
            {
                if(e.target.classList[0]!="imgrotate")
                {
                    this.children[4].play();
                }
            });
        }
    }
}


// переключение цветов и режимов


var buttonClickAudio=0;
var audioRandomSrc=[];
var hiddenArray=[];
var lid=0;
var not_point_n=0;
var numArray=0;
document.getElementsByClassName("nav-toggle")[0].addEventListener("click",function() 
{
    var checkBox = document.getElementById("nav-toggle");
    var spanColor = document.getElementById("hamburger");
    if (checkBox.checked == true) {
      document.getElementsByClassName("nav")[0].style["z-index"]="3";
      spanColor.style.display = "none";
      document.getElementsByClassName("nav_image")[0].style.display="block";
    } else {  
      spanColor.style.display = "block";
      document.getElementsByClassName("nav_image")[0].style.display="none";
    }
});
var countMode=0;    
document.getElementsByClassName("toggle-checkbox")[0].addEventListener("click",function()
{
    countMode++;
    if(countMode%2==0)
    {
      document.getElementsByClassName("nav")[0].style.backgroundColor="#52DEFF";
      changeBlockStyle("train");
    }
    else
    {
      changeBlockStyle("play");
      document.getElementsByClassName("nav")[0].style.backgroundColor="#FF9801";
    }
});
function changeBlockStyle(mode)
{
    if(getComputedStyle(document.getElementsByClassName("block_menu")[0]).display!="block")
    {   
            if(mode=="train")
            {
                let block=document.getElementsByClassName("block_cards")[0].children[0].children;
                for(let count=0;count<block.length;count++)
                {
                    block[count].addEventListener("click",function(e)
                    {
                        let audio =this.children[4];
                        audio.volume=1
                    });
                }
                let img_rotate=document.getElementsByClassName("imgrotate");
                for(let count=0;count<img_rotate.length;count++)
                {
                    img_rotate[count].style.opacity="1";
                    img_rotate[count].style.transition="opacity 0.3s ease 0.3s";
                }
                let sp=document.getElementsByClassName("span");
                for(let count=0;count<sp.length;count++)
                {
                    sp[count].style.opacity="1";
                    sp[count].style.transition="opacity 0.3s ease 0.3s";
                }
                let im=document.getElementsByClassName("image"); 
                for(let count=0;count<im.length;count++)
                {
                    im[count].style.height="192px";
                    im[count].style.transition="height 0.3s ease 0.3s";
                }
                document.getElementsByClassName("playgame")[0].style.display="none";
            }
            else
            {
                let block=document.getElementsByClassName("block_cards")[0].children[0].children;
                for(let count=0;count<block.length;count++)
                {
                    block[count].addEventListener("click",event);
                }
                let img_rotate=document.getElementsByClassName("imgrotate");
                for(let count=0;count<img_rotate.length;count++)
                {
                    img_rotate[count].style.opacity="0";
                    img_rotate[count].style.transition="opacity 0.3s ease 0.3s";
                }
                let sp=document.getElementsByClassName("span");
                for(let count=0;count<sp.length;count++)
                {
                    sp[count].style.opacity="0";
                    sp[count].style.transition="opacity 0.3s ease 0.3s";
                }
                let im=document.getElementsByClassName("image");
                for(let count=0;count<im.length;count++)
                {
                    im[count].style.height="232px";
                    im[count].style.transition="height 0.3s ease 0.3s";
                }        
                document.getElementsByClassName("playgame")[0].style.display="block";
            }
        }
}
let event=function(e)
{
    let block=document.getElementsByClassName("block_cards")[0].children[0].children;
    let audio =this.children[4];
    audio.volume=0;
    if(buttonClickAudio!=0)
    {
        if(lid!=15)
        {
            playGame(e,block,audioRandomSrc);
        }
        else
        {
            // document.getElementsByClassName("game_level")[0].style.display="none";
            // document.getElementsByClassName("block_cards")[0].style.display="none";
            document.getElementsByClassName("main-block")[0].style.display="none";
            document.getElementsByClassName("picture_enter")[0].style.display="flex";
            document.getElementsByClassName("error_picture")[0].style.display="block";
            lid=0;
            hiddenArray=[];
            document.getElementsByClassName("error_maintext")[0].innerHTML=not_point_n;
            not_point_n=0;
        }    
    }
}
function playGame(e,block,audioRandomSrc)
{
    let numImage=0;
    for(let i=0;i<block.length;i++)
    {
        if(e.target.src==block[i].children[0].src)
        {
            numImage=i;
            break;
        }
    }
    let audi=document.createElement("audio");
    audi.classList.add("audio_button");
    if(audioRandomSrc[numArray].num==numImage && hiddenArray.findIndex((item)=>item==numImage)==-1)
    {
        // audi.src="audio/success.mp3";
        numArray++;   
        let point=document.createElement("img");
        point.classList.add("point");
        lid++;
        point.src="img/point.png";
        document.getElementsByClassName("game_level")[0].appendChild(point);
        hiddenArray.push(numImage);
        if(hiddenArray.length!=8)
        {
            let audio=document.createElement("audio");
            audio.src=audioRandomSrc[numArray].src;
            document.getElementsByClassName("playgame")[0].appendChild(audio);
            audio.play();
        }
        else
        {
            document.getElementsByClassName("main-block")[0].style.display="none";
            document.getElementsByClassName("picture_enter")[0].style.display="flex";
            lid=0;
            if(not_point_n==0)
            {
                document.getElementsByClassName("suc_picture")[0].style.display="block";    
            }
            else
            {
                document.getElementsByClassName("error_picture")[0].style.display="block";
            }
            let block=document.getElementsByClassName("block_cards")[0].children[0].children;
                for(let count=0;count<block.length;count++)
                {
                    block[count].removeEventListener("click",event);
                }
            hiddenArray=[];
            document.getElementsByClassName("error_maintext")[0].innerHTML=not_point_n;
            not_point_n=0;
        }
        hiddenBlockItem(block,numImage);
    }
    else
    {
        if(hiddenArray.findIndex((item)=>item==numImage)==-1)
        {
            audi.src="audio/error.mp3";
            let pointImage=document.createElement("img");
            not_point_n++;
            lid++;
            pointImage.classList.add("not_point");
            pointImage.src="img/not.png";
            document.getElementsByClassName("game_level")[0].appendChild(pointImage);
        }
    }
    document.body.appendChild(audi);
    audi.play();
    // audi.remove();
}
function hiddenBlockItem(block,num)
{
    block[num].style.opacity="0.5";
}

// игра


document.getElementsByClassName("playgame")[0].addEventListener("click",function(event)
{
    console.log(lid)
    document .getElementsByClassName("play_button")[0].style.display="block";
    this.style["border-radius"]="100%";
    this.style.width="47px";
    this.style.transition="borderRadius,width 1s ease";
    document.getElementsByClassName("play_text")[0].style.display="none";
    let block=document.getElementsByClassName("block_cards")[0].children[0].children;
    let audioSrc=[];
    let audioEx=[];
    for(let i=0;i<block.length;i++)
    {
        audioSrc.push(block[i].children[4].src);
    }
    for(let n=0;n<audioSrc.length;n++)
    {
        let audiopage={};
        let i=audioSrc[Math.floor(Math.random() * audioSrc.length)];
        if(n==0)
        {
            let n=audioSrc.findIndex((item)=>item==i);
            audiopage.num=n;
            audiopage.src=i;
            audioEx.push(i);
            audioRandomSrc.push(audiopage);
        }
        else
        {
            while(audioEx.findIndex((item)=>item==i)!=-1)
            {
                i=audioSrc[Math.floor(Math.random() * audioSrc.length)];
            }
            let n=audioSrc.findIndex((item)=>item==i);
            audioEx.push(i);
            audiopage.num=n;
            audiopage.src=i;
            audioRandomSrc.push(audiopage);
        }
    }
    audioEx=[];
    audioSrc=[];
    if(numArray==0)
    {
        let audi=document.createElement("audio");
        audi.classList.add("audio_playg");
        audi.src=audioRandomSrc[0].src;
        this.appendChild(audi);
        audi.play();
    }
    document.getElementsByClassName("game_level")[0].style.display="flex";
    buttonClickAudio++;
});
document.getElementsByClassName("button_back")[0].addEventListener("click",function(e)
{
    document.getElementsByClassName("main-block")[0].style.display="block";
    document.getElementsByClassName("block_cards")[0].style.display="none";
    document.getElementsByClassName("block_menu")[0].style.display="block";
    numArray=0;
    document.getElementsByClassName("game_level")[0].style.display="none";
    document.getElementsByClassName("picture_enter")[0].style.display="none";
    document.getElementsByClassName("error_picture")[0].style.display="none";
    document.getElementsByClassName("suc_picture")[0].style.display="none";
    let block=document.getElementsByClassName("block_cards")[0].children[0].children;
    for(let i=0;i<block.length;i++)
    {
        block[i].removeAttribute("style");
    }
    let but_game=document.getElementsByClassName("playgame")[0];
    but_game.removeAttribute("style");
    buttonClickAudio=0;
    but_game.style.display="block";
    buttonClickAudio=0;
    let event = new MouseEvent("click", {
        bubbles: true});
    let block_menu=document.getElementsByClassName("block_menu")[0].children[0].children;
    let block_cards=document.getElementsByClassName("block_cards")[0].children[0].children;
    document.getElementsByClassName("playgame")[0].style.display="none"
    for(let n=0;n<block_menu.length;n++)
    {
        block_menu[n].children[1].removeAttribute("style")
        block_menu[n].children[0].removeAttribute("style")
        block_menu[n].removeAttribute("style");
        block_cards[n].children[1].removeAttribute("style")
        block_cards[n].children[0].removeAttribute("style")
        block_cards[n].children[3].removeAttribute("style")
        block_cards[n].removeAttribute("style");
    }
    document.getElementsByClassName("nav")[0].style.backgroundColor="#52DEFF";
    document.getElementsByClassName("toggle-checkbox")[0].dispatchEvent(event);
    document.getElementsByClassName("play_text")[0].style.display="block";
    document.getElementsByClassName("play_button")[0].style.display="none";
    let point_block=document.getElementsByClassName("game_level")[0];
    console.log(point_block)
    audioRandomSrc=[];
    let point_blockChild=document.getElementsByClassName("game_level")[0].children;
    for(let i=0;i<point_blockChild.length;i++)
    {
        point_blockChild[i].style.display="none";
    }
});
document.getElementsByClassName("play_button")[0].addEventListener("click",function(event)
{
    let audio=document.createElement("audio");
    let block=document.getElementsByClassName("playgame")[0];
    audio.src=block.children[block.children.length-1].src;
    block.appendChild(audio);
    audio.play();
});
let block_card = document.getElementsByClassName("block_cards")[0].children[0].children;
for(let i=0;i<block_card.length;i++)
{
    block_card[i].addEventListener("click",function(e)
    {
        if(getComputedStyle(document.getElementsByClassName("nav")[0]).transform=="matrix(1, 0, 0, 1, 0, 0)")
        {
            document.getElementsByClassName("nav")[0].style.transform="scale(0,1)";
            document.getElementsByClassName("nav")[0].removeAttribute("style");
            document.getElementsByClassName("nav")[0].style["z-index"]="3";
            let event = new MouseEvent("click", {
                bubbles: true});
            document.getElementsByClassName("nav-toggle")[0].dispatchEvent(event);    
        }
    });
}
let nav_list=document.getElementsByClassName("nav")[0].children[0].children;
for(let c=0;c<nav_list.length;c++)
{
    nav_list[c].addEventListener("click",function(e)
    {
        let nav_list=document.getElementsByClassName("nav")[0].children[0].children;
        for(let i=0;i<nav_list.length;i++)
        {
            nav_list[i].removeAttribute("style");
        }
        document.getElementsByClassName("nav")[0].style.transform="scale(0,1)";
        document.getElementsByClassName("nav")[0].removeAttribute("style");
        document.getElementsByClassName("nav")[0].style["z-index"]="3";
        let event = new MouseEvent("click", {
            bubbles: true});
        document.getElementsByClassName("nav-toggle")[0].dispatchEvent(event);
        this.style["border-bottom"]="2px solid #ffffff";
        this.style["margin-right"]="30px";
    })
}


// разворот блока

let img_rotate=document.getElementsByClassName("imgrotate");
let ev_block=function(e)
{
    if(count>0)
        {
            this.removeAttribute("style");
            this.style.transition="transform 3s ease";
            this.children[0].style.transform="rotateY(-180deg)";
            this.children[0].removeAttribute("style");
            this.children[0].style.transition="transform 3s ease";
            this.children[1].style.display="block";
            this.children[1].style.transition="display 3s ease";
            this.children[3].style.display="block";
            this.children[3].style.right="6px";
            this.children[3].style.transition="display,right 3s ease";
            this.children[2].style.display="none";
            count=0;            
        }
}
let ev_button=function(e)
{
    let img=e.target.parentElement;
        img.style.transform="rotateY(180deg)";
        img.style.transition="transform 5s ease";
        img.children[0].style.transform="rotateY(180deg)";
        img.children[0].style.transition="transform 3s ease";
        img.children[1].style.display="none";
        img.children[3].style.display="none";
        img.children[2].style.display="block";
        img.children[2].style.opacity="1";
        img.children[2].style.transform="rotateY(-180deg)";
        img.children[2].style.transition="transform,opacity 6s ease";        
        count++;
}
var count=0;
for(let c=0;c<img_rotate.length;c++)
{
    if(countMode%2==0)
    {
        document.getElementsByClassName("imgrotate")[c].addEventListener("click",ev_button);
        document.getElementsByClassName("block_cards")[0].children[0].children[c].addEventListener("mouseleave",ev_block);
    }
    else
    {
        document.getElementsByClassName("imgrotate")[c].removeEventListener("click",ev_button);
        document.getElementsByClassName("block_cards")[0].children[0].children[c].removeEventListener("mouseleave",ev_block);
    }
}

// class App
// {
//     constructor(page,mode)
//     {
//         this.page=0;
//         this.mode=0;
//     }
//     changePage(page)
//     {
//         this.page=page;
//     }
//     changeMode(mode)
//     {
//         this.mode=mode;
//     }
// }
// var count=0;
// document.getElementsByClassName("toggle-checkbox")[0].addEventListener("click",function()
// {
//     count++;
//     if(count%2==0)
//     {
//         document.getElementsByClassName("nav")[0].style.backgroundColor="#52DEFF";
//     }
//     else
//     {
//         document.getElementsByClassName("nav")[0].style.backgroundColor="#FF9801";
//     }
// });